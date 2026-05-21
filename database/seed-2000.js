const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Dicionários Base para Combinações (Gerador de 2000+ Frases)
const categories = [
    {
        name: "Food & Drinks",
        starters: [
            { en: "I want to eat", pt: "Eu quero comer", pron: "ai uánt tu ít" },
            { en: "I want to drink", pt: "Eu quero beber", pron: "ai uánt tu drínk" },
            { en: "Can I have", pt: "Você pode me dar", pron: "kén ai rév" },
            { en: "I would like", pt: "Eu gostaria de", pron: "ai uúd láik" },
            { en: "Let's order", pt: "Vamos pedir", pron: "léts órder" }
        ],
        items: [
            { en: "pizza", pt: "pizza", pron: "pítsa" },
            { en: "water", pt: "água", pron: "uóter" },
            { en: "coffee", pt: "café", pron: "cófi" },
            { en: "a burger", pt: "um hambúrguer", pron: "a búrguer" },
            { en: "some pasta", pt: "um pouco de macarrão", pron: "sâm pásta" },
            { en: "a salad", pt: "uma salada", pron: "a sálad" },
            { en: "sushi", pt: "sushi", pron: "súchi" },
            { en: "chicken", pt: "frango", pron: "tchíken" },
            { en: "a sandwich", pt: "um sanduíche", pron: "a sánduitch" },
            { en: "tea", pt: "chá", pron: "tí" },
            { en: "juice", pt: "suco", pron: "djús" },
            { en: "a beer", pt: "uma cerveja", pron: "a bír" },
            { en: "a steak", pt: "um bife", pron: "a stêik" },
            { en: "some fruit", pt: "algumas frutas", pron: "sâm frút" },
            { en: "breakfast", pt: "café da manhã", pron: "brékfast" }
        ],
        times: [
            { en: "now", pt: "agora", pron: "náu" },
            { en: "for lunch", pt: "para o almoço", pron: "fór lántch" },
            { en: "for dinner", pt: "para o jantar", pron: "fór díner" },
            { en: "later", pt: "mais tarde", pron: "léiter" },
            { en: "tonight", pt: "hoje à noite", pron: "tunáit" },
            { en: "right away", pt: "imediatamente", pron: "ráit auêi" }
        ]
    },
    {
        name: "Work & Study",
        starters: [
            { en: "I need to finish", pt: "Eu preciso terminar", pron: "ai níd tu fínich" },
            { en: "I have to start", pt: "Eu tenho que começar", pron: "ai rév tu stárt" },
            { en: "Let's work on", pt: "Vamos trabalhar no(a)", pron: "léts uórk ón" },
            { en: "I am studying", pt: "Eu estou estudando", pron: "ai ém stúdiing" },
            { en: "Please review", pt: "Por favor revise", pron: "plíiz rivíu" },
            { en: "I forgot about", pt: "Eu esqueci do(a)", pron: "ai forgót abáut" }
        ],
        items: [
            { en: "the report", pt: "o relatório", pron: "dã ripórt" },
            { en: "the project", pt: "o projeto", pron: "dã pródject" },
            { en: "English", pt: "inglês", pron: "ínglich" },
            { en: "the presentation", pt: "a apresentação", pron: "dã prizentêichon" },
            { en: "my homework", pt: "minha lição de casa", pron: "mái rôumuork" },
            { en: "the email", pt: "o e-mail", pron: "dã imêil" },
            { en: "the document", pt: "o documento", pron: "dã dókiument" },
            { en: "the contract", pt: "o contrato", pron: "dã cóntract" },
            { en: "the code", pt: "o código", pron: "dã côud" },
            { en: "the meeting notes", pt: "as anotações da reunião", pron: "dã mítin nôuts" },
            { en: "the schedule", pt: "o cronograma", pron: "dã skédiul" },
            { en: "the budget", pt: "o orçamento", pron: "dã bádjet" },
            { en: "the plan", pt: "o plano", pron: "dã plén" },
            { en: "the research", pt: "a pesquisa", pron: "dã risértch" },
            { en: "the task", pt: "a tarefa", pron: "dã tésk" }
        ],
        times: [
            { en: "today", pt: "hoje", pron: "tudêi" },
            { en: "by tomorrow", pt: "até amanhã", pron: "bái tumórou" },
            { en: "this morning", pt: "esta manhã", pron: "dís mórning" },
            { en: "right now", pt: "agora mesmo", pron: "ráit náu" },
            { en: "as soon as possible", pt: "o mais rápido possível", pron: "és sún és pósibol" },
            { en: "next week", pt: "semana que vem", pron: "nékst uík" }
        ]
    },
    {
        name: "Travel & Places",
        starters: [
            { en: "Where is", pt: "Onde fica", pron: "uér is" },
            { en: "How do I get to", pt: "Como eu chego no(a)", pron: "ráu dú ai guét tu" },
            { en: "I am looking for", pt: "Eu estou procurando", pron: "ai ém lúkin fór" },
            { en: "Is there a", pt: "Tem um(a)", pron: "is dër a" },
            { en: "Please take me to", pt: "Por favor me leve para", pron: "plíiz têik mi tu" }
        ],
        items: [
            { en: "the hotel", pt: "o hotel", pron: "dã rotél" },
            { en: "the airport", pt: "o aeroporto", pron: "dã érport" },
            { en: "the train station", pt: "a estação de trem", pron: "dã trêin stêichon" },
            { en: "the bathroom", pt: "o banheiro", pron: "dã bétrum" },
            { en: "a good restaurant", pt: "um bom restaurante", pron: "a gúd réstorant" },
            { en: "the hospital", pt: "o hospital", pron: "dã róspital" },
            { en: "the pharmacy", pt: "a farmácia", pron: "dã fármasi" },
            { en: "the bus stop", pt: "o ponto de ônibus", pron: "dã bás stóp" },
            { en: "the museum", pt: "o museu", pron: "dã miuzíum" },
            { en: "the beach", pt: "a praia", pron: "dã bítch" },
            { en: "the city center", pt: "o centro da cidade", pron: "dã síti sénter" },
            { en: "the nearest bank", pt: "o banco mais próximo", pron: "dã nírest bénk" },
            { en: "an ATM", pt: "um caixa eletrônico", pron: "én ei-ti-ém" },
            { en: "the supermarket", pt: "o supermercado", pron: "dã súpermárket" },
            { en: "the subway", pt: "o metrô", pron: "dã sábuei" }
        ],
        times: [
            { en: "near here", pt: "perto daqui", pron: "nír rír" },
            { en: "around here", pt: "por aqui", pron: "aráund rír" },
            { en: "in this city", pt: "nesta cidade", pron: "in dís síti" },
            { en: "on this street", pt: "nesta rua", pron: "ón dís strít" },
            { en: "today", pt: "hoje", pron: "tudêi" }
        ]
    },
    {
        name: "Social & Fun",
        starters: [
            { en: "Do you want to", pt: "Você quer", pron: "dú iú uánt tu" },
            { en: "Let's", pt: "Vamos", pron: "léts" },
            { en: "I am going to", pt: "Eu vou", pron: "ai ém gôin tu" },
            { en: "Would you like to", pt: "Você gostaria de", pron: "uúd iú láik tu" },
            { en: "We should", pt: "Nós deveríamos", pron: "uí chúd" }
        ],
        items: [
            { en: "watch a movie", pt: "assistir um filme", pron: "uótch a múvi" },
            { en: "hang out", pt: "dar um rolê", pron: "réng áut" },
            { en: "go to the park", pt: "ir ao parque", pron: "gôu tu dã párk" },
            { en: "visit my family", pt: "visitar minha família", pron: "vízit mái fámili" },
            { en: "play a game", pt: "jogar um jogo", pron: "plêi a guêim" },
            { en: "grab a coffee", pt: "tomar um café", pron: "gréb a cófi" },
            { en: "have dinner", pt: "jantar", pron: "rév díner" },
            { en: "go shopping", pt: "fazer compras", pron: "gôu chópin" },
            { en: "take a walk", pt: "dar uma caminhada", pron: "têik a uók" },
            { en: "see a play", pt: "ver uma peça", pron: "sí a plêi" },
            { en: "go to a concert", pt: "ir a um show", pron: "gôu tu a cónsert" },
            { en: "travel together", pt: "viajar juntos", pron: "trével tuguéder" },
            { en: "take a break", pt: "fazer uma pausa", pron: "têik a brêik" },
            { en: "go to the gym", pt: "ir para a academia", pron: "gôu tu dã djím" },
            { en: "relax at home", pt: "relaxar em casa", pron: "riléx ét rôum" }
        ],
        times: [
            { en: "this weekend", pt: "neste fim de semana", pron: "dís uíkend" },
            { en: "tonight", pt: "hoje à noite", pron: "tunáit" },
            { en: "tomorrow", pt: "amanhã", pron: "tumórou" },
            { en: "after work", pt: "depois do trabalho", pron: "áfter uórk" },
            { en: "on Sunday", pt: "no domingo", pron: "ón sándêi" },
            { en: "next month", pt: "mês que vem", pron: "nékst mântf" }
        ]
    },
    {
        name: "Feelings & Status",
        starters: [
            { en: "I am", pt: "Eu estou", pron: "ai ém" },
            { en: "He is", pt: "Ele está", pron: "rí is" },
            { en: "She is", pt: "Ela está", pron: "chí is" },
            { en: "We are", pt: "Nós estamos", pron: "uí ár" },
            { en: "They are", pt: "Eles estão", pron: "dêi ár" }
        ],
        items: [
            { en: "very happy", pt: "muito feliz", pron: "véri répi" },
            { en: "so tired", pt: "tão cansado(a)", pron: "sôu táired" },
            { en: "really busy", pt: "muito ocupado(a)", pron: "ríili bízi" },
            { en: "a bit sad", pt: "um pouco triste", pron: "a bít séd" },
            { en: "excited", pt: "animado(a)", pron: "ecsáited" },
            { en: "ready", pt: "pronto(a)", pron: "rédi" },
            { en: "hungry", pt: "com fome", pron: "rângri" },
            { en: "thirsty", pt: "com sede", pron: "térsti" },
            { en: "angry", pt: "bravo(a)", pron: "éngri" },
            { en: "worried", pt: "preocupado(a)", pron: "uórid" },
            { en: "nervous", pt: "nervoso(a)", pron: "nérvos" },
            { en: "calm", pt: "calmo(a)", pron: "kám" },
            { en: "sick", pt: "doente", pron: "sík" },
            { en: "lost", pt: "perdido(a)", pron: "lóst" },
            { en: "confused", pt: "confuso(a)", pron: "confiúzd" }
        ],
        times: [
            { en: "because of work", pt: "por causa do trabalho", pron: "bicóz óv uórk" },
            { en: "today", pt: "hoje", pron: "tudêi" },
            { en: "right now", pt: "agora mesmo", pron: "ráit náu" },
            { en: "about the trip", pt: "sobre a viagem", pron: "abáut dã tríp" },
            { en: "all day", pt: "o dia todo", pron: "ól dêi" },
            { en: "this week", pt: "esta semana", pron: "dís uík" }
        ]
    }
];

async function generateAndSeed2000() {
    console.log("Iniciando o Super Gerador de 2000+ Frases de Fluência...");

    let generatedSentences = [];
    
    // Gerar combinações matemáticas perfeitas
    categories.forEach(cat => {
        cat.starters.forEach(start => {
            cat.items.forEach(item => {
                cat.times.forEach(time => {
                    const sentenceEn = `${start.en} ${item.en} ${time.en}`;
                    const sentencePt = `${start.pt} ${item.pt} ${time.pt}`;
                    const sentencePron = `${start.pron} ${item.pron} ${time.pron}`;
                    
                    generatedSentences.push({
                        word: sentenceEn,
                        meaning: sentencePt,
                        pronunciation_pt: sentencePron,
                        level: "Fluency",
                        category: cat.name,
                        letter: sentenceEn.charAt(0).toUpperCase(),
                        example_sentence: sentenceEn,
                        example_translation: sentencePt,
                        example_pronunciation_pt: sentencePron,
                        difficulty: 2
                    });
                });
            });
        });
    });

    console.log(`Total de combinações geradas: ${generatedSentences.length} frases!`);

    console.log("Limpando banco para inserir o deck oficial de fluência...");
    await supabase.from('words').delete().neq('level', 'ZZZ'); // Limpa tudo

    // Inserir no Supabase em lotes
    const batchSize = 1000;
    for (let i = 0; i < generatedSentences.length; i += batchSize) {
        const batch = generatedSentences.slice(i, i + batchSize);
        console.log(`Enviando lote ${i} a ${i + batch.length}...`);
        
        const { error } = await supabase.from('words').upsert(batch, { onConflict: 'word' });
        
        if (error) {
            console.error("Erro ao inserir lote:", error);
        } else {
            console.log("Lote inserido com sucesso!");
        }
    }
    
    console.log("Parabéns! 2000+ Frases de Fluência inseridas com sucesso!");
}

generateAndSeed2000();
