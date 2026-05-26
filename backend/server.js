const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');

// Configure mail transporter if SMTP env vars are provided
let mailTransporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}
const supabase = require('./supabase');
const SRSAlgorithm = require('./srs');

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../public')));

const JWT_SECRET = process.env.JWT_SECRET || 'english_master_super_secret_key_2024';

// Middleware de Autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Acesso negado' });
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Token inválido' });
        req.user = user;
        next();
    });
};

// ==========================================
// ROTAS DE AUTENTICAÇÃO
// ==========================================
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, level, goal } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, password: hashedPassword, level: level || 'A1', career_goal: goal }])
            .select()
            .single();

        if (error) throw error;

        const token = jwt.sign({ id: data.id, email: data.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, user: data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: user, error } = await supabase.from('users').select('*').eq('email', email).single();
        if (error || !user) return res.status(400).json({ success: false, message: 'Usuário não encontrado' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ success: false, message: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/auth/verify', authenticateToken, async (req, res) => {
    try {
        const { data: user, error } = await supabase.from('users').select('*').eq('id', req.user.id).single();
        if (error) throw error;
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// ROTAS DO USUÁRIO E PROGRESSO
// ==========================================
app.get('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const { data: user, error } = await supabase.from('users').select('*').eq('id', req.user.id).single();
        if (error) throw error;
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.put('/api/user/progress', authenticateToken, async (req, res) => {
    const { points, learnedWord, personality, avatarName } = req.body;
    try {
        const { data: user } = await supabase.from('users').select('*').eq('id', req.user.id).single();
        
        let updates = {};
        if (points) updates.points = (user.points || 0) + points;
        if (personality) updates.personality = personality;
        if (avatarName) updates.avatar_name = avatarName;
        
        if (learnedWord) {
            let words = user.learned_words || [];
            if (!words.includes(learnedWord)) {
                words.push(learnedWord);
                updates.learned_words = words;
            }
        }

        const { data, error } = await supabase.from('users').update(updates).eq('id', req.user.id).select().single();
        if (error) throw error;

        res.json({ success: true, user: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// ROTAS DO DICIONÁRIO
// ==========================================
app.get('/api/dictionary/words', async (req, res) => {
    const { page = 1, letter, level, search } = req.query;
    const limit = 50;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    try {
        let query = supabase.from('words').select('*', { count: 'exact' });
        
        if (letter && letter !== 'all') query = query.ilike('word', `${letter}%`);
        if (level && level !== 'all') query = query.eq('level', level);
        if (search) query = query.ilike('word', `%${search}%`);

        const { data, count, error } = await query.range(start, end).order('word');
        if (error) throw error;

        res.json({ success: true, words: data, total: count, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/dictionary/word-of-day', async (req, res) => {
    try {
        const { data, error } = await supabase.from('words').select('*').limit(100);
        if (error) throw error;
        
        // Simplesmente pegamos uma palavra aleatória entre as primeiras 100
        const randomWord = data[Math.floor(Math.random() * data.length)];
        res.json({ success: true, word: randomWord });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// RECUPERAÇÃO DE SENHA
// ==========================================
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const { data: user } = await supabase.from('users').select('*').eq('email', email).single();
        if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });

        // Gera um token válido por 15 minutos contendo o ID do usuário
        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        
        // If SMTP is configured, send a real email; otherwise return the reset link for testing.
        const resetLink = `http://${req.headers.host}/reset-password.html?token=${resetToken}`;
        if (mailTransporter) {
            const mailOptions = {
                from: process.env.FROM_EMAIL || 'no-reply@example.com',
                to: email,
                subject: 'Recuperação de Senha - English Master',
                html: `<p>Olá,</p><p>Clique no link abaixo para redefinir sua senha:</p><p><a href="${resetLink}">${resetLink}</a></p><p>Este link expira em 15 minutos.</p>`
            };
            try {
                await mailTransporter.sendMail(mailOptions);
                res.json({ success: true, message: 'Email de recuperação enviado.' });
            } catch (e) {
                console.error('Erro ao enviar email de recuperação:', e);
                // Fallback to returning the link for testing purposes
                res.json({ success: true, message: 'Email de teste (envio falhou).', resetLink });
            }
        } else {
            // Development mode: return reset link directly
            res.json({
                success: true,
                message: 'Email enviado (Simulação)',
                resetLink // APENAS PARA TESTES. REMOVER EM PRODUÇÃO.
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Faz o hash da nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Atualiza no banco
        const { error } = await supabase.from('users').update({ password: hashedPassword }).eq('id', decoded.id);
        if (error) throw error;
        
        res.json({ success: true, message: 'Senha atualizada com sucesso' });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'O link expirou. Solicite novamente.' });
        }
        res.status(500).json({ success: false, message: 'Token inválido ou erro no servidor.' });
    }
});

// ==========================================
// ROTAS DO CHAT (IA SIMULADA)
// ==========================================
app.get('/api/chat/history', authenticateToken, async (req, res) => {
    try {
        const { data: history, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })
            .limit(50);
        if (error) throw error;
        res.json({ success: true, history });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/chat/send', authenticateToken, async (req, res) => {
    const { message } = req.body;
    try {
        const { data: user } = await supabase.from('users').select('personality, name').eq('id', req.user.id).single();
        const p = user.personality || 'paciente';
        const scenario = req.body.scenario || '';
        
        // Configurando o prompt de sistema do Gemini
        let systemInstruction = `You are an English language tutor for a Brazilian student named ${user.name}. You must reply in English. Use simple, natural language (A2-B1 level). Be ${p}.
        If the student asks a question or asks for help in Portuguese, you can answer and explain things clearly, but try to keep the main conversation and examples in English.
        IMPORTANT: You MUST respond in pure JSON format without markdown blocks. The JSON must have two keys:
        "reply": Your conversational response to the user.
        "correction": If the user made a grammar or vocabulary mistake in their message, put a brief friendly correction here in Portuguese (e.g. 'Dica: O correto é "I go" em vez de "I goes"'). If no mistake, set it to null.`;
        
        if (scenario === 'aeroporto') {
            systemInstruction += `\nScenario: You are a ticket agent at an international airport in the USA. Talk to them in English about their flight, bags, and passport. Ask one question at a time.`;
        } else if (scenario === 'entrevista') {
            systemInstruction += `\nScenario: You are an HR manager interviewing ${user.name} for a job in the USA. Conduct a realistic job interview in English. Ask one question at a time.`;
        } else if (scenario) {
            systemInstruction += `\nScenario: ${scenario}.`;
        }

        if (req.body.challenge) {
            systemInstruction += `\n[CHALLENGE MODE ACTIVE]: In your "reply", you MUST introduce one new, slightly advanced English word. Ask the user if they can guess what it means.`;
        }

        // Call Gemini API
        const geminiApiKey = process.env.GEMINI_API_KEY || 'AIzaSyATnoXw4kG4JbMc38d72HgHSJSw85NeEyo';
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
        
        const geminiResponse = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const geminiData = await geminiResponse.json();
        
        let reply = "NOVO ERRO DO SISTEMA: Código não atualizou.";
        let correction = null;

        if (geminiData.candidates && geminiData.candidates.length > 0) {
            try {
                let rawText = geminiData.candidates[0].content.parts[0].text;
                rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(rawText);
                reply = parsed.reply || "Hello!";
                correction = parsed.correction || null;
            } catch(e) {
                reply = geminiData.candidates[0].content.parts[0].text;
            }
        } else if (geminiData.error) {
            // Se o Google retornar um erro, envia pro usuário pra gente ver o motivo real
            let extraInfo = "";
            try {
                const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`);
                const listData = await listRes.json();
                if (listData.error) {
                    extraInfo = ` | STATUS DA CHAVE: ${listData.error.message}`;
                } else if (listData.models) {
                    const available = listData.models.map(m => m.name.replace('models/', '')).filter(n => n.includes('gemini')).join(', ');
                    extraInfo = ` | MODELOS DISPONÍVEIS NA SUA CONTA: ${available}`;
                }
            } catch(e) {}
            
            reply = `ERRO DO GOOGLE: ${geminiData.error.message || 'Erro desconhecido da API'}${extraInfo}`;
            console.error("Gemini API Error:", geminiData.error);
        } else {
            reply = "ERRO: O Google não retornou nenhuma resposta e nenhum erro específico.";
            console.error("Gemini API Unexpected Response:", geminiData);
        }

        // Save conversation
        await supabase.from('conversations').insert([{
            user_id: req.user.id,
            user_message: message,
            ai_response: reply,
            personality_used: p
        }]);

        res.json({ success: true, reply, correction });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// ROTAS DE AVATAR
// ==========================================
app.get('/api/avatar/config', authenticateToken, async (req, res) => {
    try {
        const { data: user, error } = await supabase.from('users').select('avatar_name, avatar_voice, personality, avatar_image, avatar_hat, avatar_cape, avatar_acc').eq('id', req.user.id).single();
        if (error) throw error;
        res.json({ success: true, config: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/avatar/configure', authenticateToken, async (req, res) => {
    const { name, voice, personality, imageBase64, hat, cape, acc } = req.body;
    try {
        let updates = {};
        if (name) updates.avatar_name = name;
        if (voice) updates.avatar_voice = voice;
        if (personality) updates.personality = personality;
        if (imageBase64) updates.avatar_image = imageBase64;
        if (hat !== undefined) updates.avatar_hat = hat;
        if (cape !== undefined) updates.avatar_cape = cape;
        if (acc !== undefined) updates.avatar_acc = acc;

        const { data, error } = await supabase.from('users').update(updates).eq('id', req.user.id).select().single();
        if (error) throw error;
        
        res.json({ success: true, user: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// ROTAS DE SRS (Sistema de Revisão Espaçada)
// ==========================================
app.post('/api/srs/add', authenticateToken, async (req, res) => {
    const { wordId } = req.body;
    try {
        const { data, error } = await supabase.from('spaced_repetition').insert([{
            user_id: req.user.id,
            word_id: wordId,
            ease_factor: 2.5,
            interval: 0,
            repetitions: 0,
            next_review_date: new Date().toISOString()
        }]).select().single();

        if (error) throw error;
        res.json({ success: true, card: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/srs/due', authenticateToken, async (req, res) => {
    try {
        const { data: cards, error } = await supabase
            .from('spaced_repetition')
            .select(`
                *,
                words (word, meaning, pronunciation_ipa, pronunciation_pt, example_sentence, example_translation, example_pronunciation_pt)
            `)
            .eq('user_id', req.user.id)
            .lte('next_review_date', new Date().toISOString())
            .order('next_review_date', { ascending: true })
            .limit(20);

        if (error) throw error;

        const dueCards = SRSAlgorithm.getDueCards(cards || [], 20);
        res.json({ success: true, cards: dueCards, total: dueCards.length });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/api/srs/review', authenticateToken, async (req, res) => {
    const { cardId, quality, responseTime } = req.body;
    try {
        // Obter cartão atual
        const { data: card, error: fetchError } = await supabase
            .from('spaced_repetition')
            .select('*')
            .eq('id', cardId)
            .eq('user_id', req.user.id)
            .single();

        if (fetchError) throw fetchError;

        // Calcular próximo intervalo usando SM-2
        const nextReview = SRSAlgorithm.calculateNextReview(card, quality);

        // Atualizar cartão
        const { data: updatedCard, error: updateError } = await supabase
            .from('spaced_repetition')
            .update({
                ease_factor: nextReview.ease_factor,
                interval: nextReview.interval,
                repetitions: nextReview.repetitions,
                next_review_date: nextReview.next_review_date,
                last_review_date: new Date().toISOString(),
                quality: quality,
                updated_at: new Date().toISOString()
            })
            .eq('id', cardId)
            .select()
            .single();

        if (updateError) throw updateError;

        // Adicionar pontos baseado na qualidade
        const points = quality >= 3 ? quality * 5 : 0;
        if (points > 0) {
            await supabase.from('users').update({
                points: (card.points || 0) + points
            }).eq('id', req.user.id);
        }

        res.json({ success: true, card: updatedCard, pointsEarned: points });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/api/srs/stats', authenticateToken, async (req, res) => {
    try {
        const { data: reviews, error } = await supabase
            .from('spaced_repetition')
            .select('*')
            .eq('user_id', req.user.id)
            .order('updated_at', { ascending: false })
            .limit(100);

        if (error) throw error;

        const stats = SRSAlgorithm.calculateRetentionStats(reviews || []);
        res.json({ success: true, stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Route to serve travel phrases JSON
app.get('/api/travel', (req, res) => {
  const dataPath = path.join(__dirname, '..', 'public', 'data', 'travel_phrases.json');
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    res.type('application/json').send(raw);
  } catch (err) {
    console.error('Error loading travel phrases:', err);
    res.status(500).json({ error: 'Unable to load travel data' });
  }
});
// Tratamento para React Router / HTML5 History API (Fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
