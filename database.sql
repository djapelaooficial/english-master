-- HABILITAR EXTENSÃO PARA UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABELA users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    level TEXT DEFAULT 'A1',
    points INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    learned_words TEXT[] DEFAULT '{}',
    certificates TEXT[] DEFAULT '{"A1"}',
    avatar_name TEXT DEFAULT 'Professor',
    avatar_voice TEXT DEFAULT 'male',
    personality TEXT DEFAULT 'paciente',
    avatar_image TEXT,
    avatar_hat TEXT DEFAULT '',
    avatar_cape TEXT DEFAULT '',
    avatar_acc TEXT DEFAULT '',
    career_goal TEXT DEFAULT 'Geral',
    daily_conversations INTEGER DEFAULT 0,
    daily_goal INTEGER DEFAULT 5,
    daily_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TABELA words
CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word TEXT UNIQUE NOT NULL,
    meaning TEXT NOT NULL,
    pronunciation_ipa TEXT,
    pronunciation_pt TEXT,
    level TEXT DEFAULT 'A1',
    category TEXT,
    letter CHAR(1),
    example_sentence TEXT,
    example_translation TEXT,
    example_pronunciation_pt TEXT,
    difficulty INTEGER DEFAULT 1
);

-- TABELA points_history
CREATE TABLE points_history (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    points_earned INTEGER NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA conversations
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    user_message TEXT,
    ai_response TEXT,
    personality_used TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA spaced_repetition (SRS - Sistema de Revisão Espaçada)
CREATE TABLE spaced_repetition (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    word_id INTEGER REFERENCES words(id) ON DELETE CASCADE,
    ease_factor FLOAT DEFAULT 2.5,
    interval INTEGER DEFAULT 0,
    repetitions INTEGER DEFAULT 0,
    next_review_date TIMESTAMP DEFAULT NOW(),
    last_review_date TIMESTAMP,
    quality INTEGER, -- 0-5: 0=complete blackout, 5=perfect response
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, word_id)
);

-- TABELA achievements (Conquistas/Gamificação)
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL, -- 'first_word', 'streak_7', 'words_100', etc.
    achievement_name TEXT NOT NULL,
    achievement_description TEXT,
    icon TEXT,
    points_reward INTEGER DEFAULT 0,
    unlocked_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, achievement_type)
);

-- TABELA daily_stats (Estatísticas diárias)
CREATE TABLE daily_stats (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    words_learned INTEGER DEFAULT 0,
    words_reviewed INTEGER DEFAULT 0,
    conversations_completed INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    accuracy_rate FLOAT,
    UNIQUE(user_id, date)
);

-- INSERIR PALAVRAS INICIAIS
INSERT INTO words (word, meaning, pronunciation_ipa, pronunciation_pt, level, category, letter, example_sentence, example_translation) VALUES
('Hello', 'Olá', '/həˈləʊ/', 're-lou', 'A1', 'Greetings', 'H', 'Hello, how are you?', 'Olá, como você está?'),
('World', 'Mundo', '/wɜːld/', 'uorld', 'A1', 'General', 'W', 'The world is big.', 'O mundo é grande.'),
('Time', 'Tempo', '/taɪm/', 'taim', 'A1', 'General', 'T', 'What time is it?', 'Que horas são?'),
('Year', 'Ano', '/jɪə/', 'iêr', 'A1', 'General', 'Y', 'Happy new year!', 'Feliz ano novo!'),
('People', 'Pessoas', '/ˈpiː.pəl/', 'pí-pol', 'A1', 'General', 'P', 'Many people are here.', 'Muitas pessoas estão aqui.'),
('Way', 'Caminho/Jeito', '/weɪ/', 'uei', 'A1', 'General', 'W', 'This is the way.', 'Este é o caminho.'),
('Day', 'Dia', '/deɪ/', 'dei', 'A1', 'Time', 'D', 'It is a good day.', 'É um bom dia.'),
('Man', 'Homem', '/mæn/', 'mén', 'A1', 'People', 'M', 'He is a good man.', 'Ele é um bom homem.'),
('Thing', 'Coisa', '/θɪŋ/', 'thing', 'A1', 'General', 'T', 'What is this thing?', 'O que é essa coisa?'),
('Woman', 'Mulher', '/ˈwʊm.ən/', 'uú-man', 'A1', 'People', 'W', 'She is a strong woman.', 'Ela é uma mulher forte.'),
('Life', 'Vida', '/laɪf/', 'laif', 'A1', 'General', 'L', 'Life is beautiful.', 'A vida é bela.'),
('Child', 'Criança', '/tʃaɪld/', 'tchaild', 'A1', 'People', 'C', 'The child is playing.', 'A criança está brincando.'),
('School', 'Escola', '/skuːl/', 'is-cul', 'A1', 'Places', 'S', 'I go to school.', 'Eu vou para a escola.'),
('State', 'Estado', '/steɪt/', 'is-teit', 'A1', 'Places', 'S', 'Which state do you live in?', 'Em qual estado você mora?'),
('Family', 'Família', '/ˈfæm.əl.i/', 'fé-mi-li', 'A1', 'People', 'F', 'I love my family.', 'Eu amo minha família.'),
('Student', 'Estudante', '/ˈstjuː.dənt/', 'is-tú-dent', 'A1', 'People', 'S', 'He is a good student.', 'Ele é um bom estudante.'),
('Group', 'Grupo', '/ɡruːp/', 'grup', 'A1', 'People', 'G', 'We are in a group.', 'Nós estamos em um grupo.'),
('Country', 'País', '/ˈkʌn.tri/', 'cân-tri', 'A1', 'Places', 'C', 'Brazil is a country.', 'Brasil é um país.'),
('Problem', 'Problema', '/ˈprɒb.ləm/', 'pró-blêm', 'A1', 'General', 'P', 'No problem.', 'Sem problema.'),
('Hand', 'Mão', '/hænd/', 'rénd', 'A1', 'Body', 'H', 'Raise your hand.', 'Levante sua mão.'),
('Part', 'Parte', '/pɑːt/', 'part', 'A1', 'General', 'P', 'This is part of the plan.', 'Esta é parte do plano.'),
('Place', 'Lugar', '/pleɪs/', 'pleis', 'A1', 'Places', 'P', 'This is a nice place.', 'Este é um lugar legal.'),
('Case', 'Caso', '/keɪs/', 'queis', 'A1', 'General', 'C', 'In this case.', 'Neste caso.'),
('Week', 'Semana', '/wiːk/', 'uic', 'A1', 'Time', 'W', 'See you next week.', 'Vejo você na próxima semana.'),
('Company', 'Empresa', '/ˈkʌm.pə.ni/', 'câm-pa-ni', 'A1', 'Business', 'C', 'He works for a big company.', 'Ele trabalha para uma grande empresa.'),
('System', 'Sistema', '/ˈsɪs.təm/', 'sís-tem', 'A1', 'Technology', 'S', 'The system is down.', 'O sistema está fora do ar.'),
('Program', 'Programa', '/ˈprəʊ.ɡræm/', 'prô-grem', 'A1', 'Technology', 'P', 'This is a new program.', 'Este é um programa novo.'),
('Question', 'Pergunta', '/ˈkwes.tʃən/', 'cués-tchion', 'A1', 'General', 'Q', 'I have a question.', 'Eu tenho uma pergunta.'),
('Work', 'Trabalho', '/wɜːk/', 'uôrc', 'A1', 'Business', 'W', 'I have a lot of work.', 'Eu tenho muito trabalho.'),
('Government', 'Governo', '/ˈɡʌv.ən.mənt/', 'gô-vern-ment', 'B1', 'Politics', 'G', 'The government is changing.', 'O governo está mudando.'),
('Number', 'Número', '/ˈnʌm.bər/', 'nâm-ber', 'A1', 'General', 'N', 'What is your phone number?', 'Qual é o seu número de telefone?'),
('Night', 'Noite', '/naɪt/', 'nait', 'A1', 'Time', 'N', 'Good night!', 'Boa noite!'),
('Point', 'Ponto', '/pɔɪnt/', 'póint', 'A1', 'General', 'P', 'You have a good point.', 'Você tem um bom ponto.'),
('Home', 'Casa', '/həʊm/', 'rôum', 'A1', 'Places', 'H', 'Let us go home.', 'Vamos para casa.'),
('Water', 'Água', '/ˈwɔː.tər/', 'uó-ter', 'A1', 'Food', 'W', 'I need some water.', 'Eu preciso de um pouco de água.'),
('Room', 'Quarto', '/ruːm/', 'rum', 'A1', 'Places', 'R', 'Clean your room.', 'Limpe seu quarto.'),
('Mother', 'Mãe', '/ˈmʌð.ər/', 'mâ-der', 'A1', 'People', 'M', 'My mother is here.', 'Minha mãe está aqui.'),
('Area', 'Área', '/ˈeə.ri.ə/', 'é-ri-a', 'A1', 'Places', 'A', 'This is a dangerous area.', 'Esta é uma área perigosa.'),
('Money', 'Dinheiro', '/ˈmʌn.i/', 'mâ-ni', 'A1', 'Business', 'M', 'I need more money.', 'Eu preciso de mais dinheiro.'),
('Story', 'História', '/ˈstɔː.ri/', 'is-tó-ri', 'A1', 'General', 'S', 'Tell me a story.', 'Conte-me uma história.'),
('Fact', 'Fato', '/fækt/', 'féct', 'A1', 'General', 'F', 'That is a fact.', 'Isso é um fato.'),
('Month', 'Mês', '/mʌnθ/', 'mânth', 'A1', 'Time', 'M', 'See you next month.', 'Vejo você no próximo mês.'),
('Lot', 'Muito', '/lɒt/', 'lot', 'A1', 'General', 'L', 'Thanks a lot.', 'Muito obrigado.'),
('Right', 'Direito/Certo', '/raɪt/', 'rait', 'A1', 'General', 'R', 'You are right.', 'Você está certo.'),
('Study', 'Estudo', '/ˈstʌd.i/', 'is-tâ-di', 'A1', 'Education', 'S', 'I need to study.', 'Eu preciso estudar.'),
('Book', 'Livro', '/bʊk/', 'buc', 'A1', 'Education', 'B', 'Read this book.', 'Leia este livro.'),
('Eye', 'Olho', '/aɪ/', 'ai', 'A1', 'Body', 'E', 'Keep your eye on the ball.', 'Mantenha seu olho na bola.'),
('Job', 'Emprego', '/dʒɒb/', 'djób', 'A1', 'Business', 'J', 'I got a new job.', 'Eu consegui um novo emprego.'),
('Word', 'Palavra', '/wɜːd/', 'uôrd', 'A1', 'Education', 'W', 'What does this word mean?', 'O que essa palavra significa?');
