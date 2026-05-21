const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fluencyChunks = [
    { word: "It's up to you", meaning: "Você quem sabe / Depende de você", pt: "its áp tu iú", level: "B1", cat: "Everyday Phrases", ex: "Where do you want to eat? It's up to you.", trans: "Onde você quer comer? Você quem sabe.", ex_pt: "uér dú iú uánt tu ít? its áp tu iú." },
    { word: "How long does it take?", meaning: "Quanto tempo demora?", pt: "ráu lóng dâs it têik", level: "A2", cat: "Travel & Time", ex: "How long does it take to get to the airport?", trans: "Quanto tempo demora para chegar ao aeroporto?", ex_pt: "ráu lóng dâs it têik tu guét tu dã érport?" },
    { word: "I am looking forward to", meaning: "Estou ansioso para", pt: "ai ém lúkin fóruard tu", level: "B1", cat: "Emotions", ex: "I am looking forward to seeing you again.", trans: "Estou ansioso para ver você de novo.", ex_pt: "ai ém lúkin fóruard tu síin iú aguén." },
    { word: "Never mind", meaning: "Deixa pra lá / Não importa", pt: "néver máind", level: "A2", cat: "Everyday Phrases", ex: "I couldn't find the book, but never mind.", trans: "Eu não consegui achar o livro, mas deixa pra lá.", ex_pt: "ai cúdent fáind dã búc, bát néver máind." },
    { word: "By the way", meaning: "Por falar nisso / A propósito", pt: "bái dã uêi", level: "B1", cat: "Conversational Connectors", ex: "By the way, what time is the meeting?", trans: "A propósito, que horas é a reunião?", ex_pt: "bái dã uêi, uát táim is dã mítin?" },
    { word: "Make sense", meaning: "Fazer sentido", pt: "mêik séns", level: "B1", cat: "Understanding", ex: "Does that make sense to you?", trans: "Isso faz sentido para você?", ex_pt: "dâs dét mêik séns tu iú?" },
    { word: "I'm used to", meaning: "Estou acostumado a", pt: "aim iúzd tu", level: "B2", cat: "Habits", ex: "I am used to waking up early.", trans: "Estou acostumado a acordar cedo.", ex_pt: "ai ém iúzd tu uêikin áp érli." },
    { word: "Figure out", meaning: "Descobrir / Entender / Resolver", pt: "fíguiur áut", level: "B2", cat: "Phrasal Verbs", ex: "We need to figure out how to fix this.", trans: "Precisamos descobrir como consertar isso.", ex_pt: "uí níd tu fíguiur áut ráu tu fiks dês." },
    { word: "Take for granted", meaning: "Dar como garantido / Não dar valor", pt: "têik fór grénted", level: "C1", cat: "Advanced Phrases", ex: "Don't take your health for granted.", trans: "Não dê sua saúde como garantida.", ex_pt: "dônt têik iór rélt fór grénted." },
    { word: "As soon as possible", meaning: "O mais rápido possível", pt: "és sún és pósibol", level: "A2", cat: "Work & Time", ex: "Please send me the report as soon as possible.", trans: "Por favor, me envie o relatório o mais rápido possível.", ex_pt: "plíiz sénd mí dã ripórt és sún és pósibol." },
    { word: "Hang out", meaning: "Passar um tempo junto / Sair", pt: "réng áut", level: "A2", cat: "Social", ex: "Do you want to hang out this weekend?", trans: "Você quer sair neste fim de semana?", ex_pt: "dú iú uánt tu réng áut dis uíkend?" },
    { word: "Catch up", meaning: "Colocar o papo em dia", pt: "kétch áp", level: "B1", cat: "Social", ex: "We haven't seen each other in years! Let's catch up.", trans: "Nós não nos vemos há anos! Vamos colocar o papo em dia.", ex_pt: "uí rávnt sín ítch óder in iíars! léts kétch áp." },
    { word: "Keep in touch", meaning: "Manter contato", pt: "kíip in tátch", level: "B1", cat: "Social", ex: "It was nice meeting you. Let's keep in touch!", trans: "Foi bom conhecer você. Vamos manter contato!", ex_pt: "it uás náis mítin iú. léts kíip in tátch!" },
    { word: "I can't afford it", meaning: "Não tenho dinheiro para isso", pt: "ai ként afórd it", level: "B1", cat: "Money", ex: "I'd love to buy that car, but I can't afford it right now.", trans: "Eu adoraria comprar aquele carro, mas não tenho dinheiro para isso agora.", ex_pt: "aid lóv tu bái dét kár, bát ai ként afórd it ráit náu." },
    { word: "It's a piece of cake", meaning: "É muito fácil / Moleza", pt: "its a píis óv kêik", level: "B2", cat: "Idioms", ex: "Don't worry about the exam, it's a piece of cake.", trans: "Não se preocupe com a prova, é moleza.", ex_pt: "dônt uóri abáut dã egzém, its a píis óv kêik." },
    { word: "So far so good", meaning: "Até agora tudo bem", pt: "sôu fár sôu gúd", level: "A2", cat: "Everyday Phrases", ex: "How is the new project going? So far so good.", trans: "Como está indo o novo projeto? Até agora tudo bem.", ex_pt: "ráu is dã niú pródject gôin? sôu fár sôu gúd." },
    { word: "To be honest", meaning: "Para ser sincero", pt: "tu bí ónest", level: "B1", cat: "Conversational Connectors", ex: "To be honest, I didn't like the movie.", trans: "Para ser sincero, eu não gostei do filme.", ex_pt: "tu bí ónest, ai dídnt láik dã múvi." },
    { word: "Out of the blue", meaning: "Do nada / Repentinamente", pt: "áut óv dã blú", level: "C1", cat: "Idioms", ex: "She called me out of the blue after five years.", trans: "Ela me ligou do nada depois de cinco anos.", ex_pt: "chí cóld mí áut óv dã blú áfter fáiv iíars." },
    { word: "Look forward to", meaning: "Aguardar ansiosamente", pt: "lúk fóruard tu", level: "B1", cat: "Phrasal Verbs", ex: "I look forward to hearing from you.", trans: "Aguardo ansiosamente o seu retorno.", ex_pt: "ai lúk fóruard tu rírin fróm iú." },
    { word: "Make up your mind", meaning: "Decida-se", pt: "mêik áp iór máind", level: "B2", cat: "Idioms", ex: "You need to make up your mind before tomorrow.", trans: "Você precisa se decidir antes de amanhã.", ex_pt: "iú níid tu mêik áp iór máind bifór tumórou." }
];

async function seedFluency() {
    console.log("Iniciando geração do Deck de Fluência Real...");
    
    // Deletar palavras genéricas antigas geradas para limpar o banco (apenas uma limpeza básica)
    console.log("Limpando apenas as palavras genéricas geradas (Advanced/Expert)...");
    await supabase.from('words').delete().in('category', ['Advanced', 'Expert']);
    
    let wordsToInsert = fluencyChunks.map(chunk => ({
        word: chunk.word,
        meaning: chunk.meaning,
        pronunciation_pt: chunk.pt,
        level: chunk.level,
        category: chunk.cat,
        letter: chunk.word.charAt(0).toUpperCase(),
        example_sentence: chunk.ex,
        example_translation: chunk.trans,
        example_pronunciation_pt: chunk.ex_pt,
        difficulty: chunk.level === "A1" || chunk.level === "A2" ? 1 : chunk.level === "B1" ? 2 : 3
    }));

    console.log(`Inserindo ${wordsToInsert.length} combos de fluência de alta qualidade...`);
    const { error } = await supabase.from('words').upsert(wordsToInsert, { onConflict: 'word' });
    
    if (error) {
        console.error("Erro ao inserir:", error);
    } else {
        console.log("Combos de Fluência inseridos com sucesso! Seu dicionário agora tem qualidade premium.");
    }
}

// seedFluency();

module.exports = { fluencyChunks };
