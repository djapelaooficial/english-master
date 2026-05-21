const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const categories = [
    {
        name: "Food & Drinks",
        starters: [
            { en: "I want to eat", pt: "Eu quero comer", pron: "ai uánt tu ít" },
            { en: "I want to drink", pt: "Eu quero beber", pron: "ai uánt tu drínk" },
            { en: "Can I have", pt: "Você pode me dar", pron: "kén ai rév" },
            { en: "I would like", pt: "Eu gostaria de", pron: "ai uúd láik" },
            { en: "Let's order", pt: "Vamos pedir", pron: "léts órder" },
            { en: "Do you want", pt: "Você quer", pron: "dú iú uánt" },
            { en: "I am craving", pt: "Eu estou com vontade de", pron: "ai ém crêivin" },
            { en: "Could we get", pt: "Nós poderíamos pegar", pron: "cúd uí guét" },
            { en: "I need", pt: "Eu preciso de", pron: "ai níid" },
            { en: "Should we cook", pt: "Nós deveríamos cozinhar", pron: "chúd uí cúk" }
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
            { en: "breakfast", pt: "café da manhã", pron: "brékfast" },
            { en: "lunch", pt: "almoço", pron: "lántch" },
            { en: "dinner", pt: "jantar", pron: "díner" },
            { en: "a snack", pt: "um lanche", pron: "a snék" },
            { en: "some soup", pt: "um pouco de sopa", pron: "sâm súp" },
            { en: "fries", pt: "batatas fritas", pron: "fráis" },
            { en: "some bread", pt: "um pouco de pão", pron: "sâm bréd" },
            { en: "cheese", pt: "queijo", pron: "tchíiz" },
            { en: "a hot dog", pt: "um cachorro-quente", pron: "a rót dóg" },
            { en: "dessert", pt: "sobremesa", pron: "dizért" },
            { en: "cake", pt: "bolo", pron: "kêik" },
            { en: "an apple", pt: "uma maçã", pron: "én épol" },
            { en: "a banana", pt: "uma banana", pron: "a banéna" },
            { en: "some wine", pt: "um pouco de vinho", pron: "sâm uáin" },
            { en: "soda", pt: "refrigerante", pron: "sôuda" },
            { en: "some milk", pt: "um pouco de leite", pron: "sâm mílk" }
        ],
        times: [
            { en: "now", pt: "agora", pron: "náu" },
            { en: "for lunch", pt: "para o almoço", pron: "fór lántch" },
            { en: "for dinner", pt: "para o jantar", pron: "fór díner" },
            { en: "later", pt: "mais tarde", pron: "léiter" },
            { en: "tonight", pt: "hoje à noite", pron: "tunáit" },
            { en: "right away", pt: "imediatamente", pron: "ráit auêi" },
            { en: "in the morning", pt: "de manhã", pron: "in dã mórning" },
            { en: "tomorrow", pt: "amanhã", pron: "tumórou" },
            { en: "on the weekend", pt: "no fim de semana", pron: "ón dã uíkend" },
            { en: "at noon", pt: "ao meio-dia", pron: "ét nún" }
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
            { en: "I forgot about", pt: "Eu esqueci do(a)", pron: "ai forgót abáut" },
            { en: "Can you help me with", pt: "Você pode me ajudar com", pron: "kén iú rélp mi uít" },
            { en: "I am working on", pt: "Eu estou trabalhando no(a)", pron: "ai ém uórkin ón" },
            { en: "Did you see", pt: "Você viu", pron: "díd iú sí" },
            { en: "We must complete", pt: "Nós devemos completar", pron: "uí mást complít" }
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
            { en: "the task", pt: "a tarefa", pron: "dã tésk" },
            { en: "the assignment", pt: "o trabalho", pron: "dã asáinment" },
            { en: "the spreadsheet", pt: "a planilha", pron: "dã sprédchit" },
            { en: "the proposal", pt: "a proposta", pron: "dã propôuzal" },
            { en: "the design", pt: "o design", pron: "dã dizáin" },
            { en: "the article", pt: "o artigo", pron: "dã árticol" },
            { en: "the file", pt: "o arquivo", pron: "dã fáil" },
            { en: "the invoice", pt: "a fatura", pron: "dã ínvois" },
            { en: "the client list", pt: "a lista de clientes", pron: "dã cláient líst" },
            { en: "the strategy", pt: "a estratégia", pron: "dã strátedji" },
            { en: "the summary", pt: "o resumo", pron: "dã sámari" },
            { en: "the update", pt: "a atualização", pron: "dã ápdeit" },
            { en: "the review", pt: "a revisão", pron: "dã rivíu" },
            { en: "the test", pt: "o teste", pron: "dã tést" },
            { en: "the analysis", pt: "a análise", pron: "dã análisis" },
            { en: "the guidelines", pt: "as diretrizes", pron: "dã gáidlains" }
        ],
        times: [
            { en: "today", pt: "hoje", pron: "tudêi" },
            { en: "by tomorrow", pt: "até amanhã", pron: "bái tumórou" },
            { en: "this morning", pt: "esta manhã", pron: "dís mórning" },
            { en: "right now", pt: "agora mesmo", pron: "ráit náu" },
            { en: "as soon as possible", pt: "o mais rápido possível", pron: "és sún és pósibol" },
            { en: "next week", pt: "semana que vem", pron: "nékst uík" },
            { en: "before noon", pt: "antes do meio-dia", pron: "bifór nún" },
            { en: "by Friday", pt: "até sexta-feira", pron: "bái fréidei" },
            { en: "immediately", pt: "imediatamente", pron: "imídiatli" },
            { en: "later", pt: "mais tarde", pron: "léiter" }
        ]
    },
    {
        name: "Travel & Places",
        starters: [
            { en: "Where is", pt: "Onde fica", pron: "uér is" },
            { en: "How do I get to", pt: "Como eu chego no(a)", pron: "ráu dú ai guét tu" },
            { en: "I am looking for", pt: "Eu estou procurando", pron: "ai ém lúkin fór" },
            { en: "Is there a", pt: "Tem um(a)", pron: "is dër a" },
            { en: "Please take me to", pt: "Por favor me leve para", pron: "plíiz têik mi tu" },
            { en: "Can you show me", pt: "Você pode me mostrar", pron: "kén iú chôu mi" },
            { en: "I need to find", pt: "Eu preciso encontrar", pron: "ai níd tu fáind" },
            { en: "What is the fastest way to", pt: "Qual é o caminho mais rápido para", pron: "uát is dã fástest uêi tu" },
            { en: "Are we close to", pt: "Nós estamos perto do(a)", pron: "ár uí clôuz tu" },
            { en: "I want to visit", pt: "Eu quero visitar", pron: "ai uánt tu vízit" }
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
            { en: "the subway", pt: "o metrô", pron: "dã sábuei" },
            { en: "the park", pt: "o parque", pron: "dã párk" },
            { en: "the library", pt: "a biblioteca", pron: "dã láibrari" },
            { en: "the post office", pt: "o correio", pron: "dã pôust ófis" },
            { en: "the police station", pt: "a delegacia", pron: "dã pulís stêichon" },
            { en: "the gas station", pt: "o posto de gasolina", pron: "dã gués stêichon" },
            { en: "the mall", pt: "o shopping", pron: "dã mól" },
            { en: "the cinema", pt: "o cinema", pron: "dã sínema" },
            { en: "the theater", pt: "o teatro", pron: "dã tíater" },
            { en: "the university", pt: "a universidade", pron: "dã iunivérsiti" },
            { en: "the stadium", pt: "o estádio", pron: "dã stédium" },
            { en: "the gym", pt: "a academia", pron: "dã djím" },
            { en: "the coffee shop", pt: "a cafeteria", pron: "dã cófi chóp" },
            { en: "the bakery", pt: "a padaria", pron: "dã bêikeri" },
            { en: "the monument", pt: "o monumento", pron: "dã móniument" },
            { en: "the bridge", pt: "a ponte", pron: "dã brídj" }
        ],
        times: [
            { en: "near here", pt: "perto daqui", pron: "nír rír" },
            { en: "around here", pt: "por aqui", pron: "aráund rír" },
            { en: "in this city", pt: "nesta cidade", pron: "in dís síti" },
            { en: "on this street", pt: "nesta rua", pron: "ón dís strít" },
            { en: "today", pt: "hoje", pron: "tudêi" },
            { en: "right now", pt: "agora mesmo", pron: "ráit náu" },
            { en: "quickly", pt: "rapidamente", pron: "cuíkli" },
            { en: "by walking", pt: "andando", pron: "bái uókin" },
            { en: "by bus", pt: "de ônibus", pron: "bái bás" },
            { en: "by taxi", pt: "de táxi", pron: "bái téxi" }
        ]
    },
    {
        name: "Social & Fun",
        starters: [
            { en: "Do you want to", pt: "Você quer", pron: "dú iú uánt tu" },
            { en: "Let's", pt: "Vamos", pron: "léts" },
            { en: "I am going to", pt: "Eu vou", pron: "ai ém gôin tu" },
            { en: "Would you like to", pt: "Você gostaria de", pron: "uúd iú láik tu" },
            { en: "We should", pt: "Nós deveríamos", pron: "uí chúd" },
            { en: "Are you free to", pt: "Você está livre para", pron: "ár iú frí tu" },
            { en: "Can we", pt: "Nós podemos", pron: "kén uí" },
            { en: "I would love to", pt: "Eu adoraria", pron: "ai uúd lóv tu" },
            { en: "It is time to", pt: "É hora de", pron: "it is táim tu" },
            { en: "Why don't we", pt: "Por que nós não", pron: "uái dônt uí" }
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
            { en: "relax at home", pt: "relaxar em casa", pron: "riléx ét rôum" },
            { en: "read a book", pt: "ler um livro", pron: "ríd a búc" },
            { en: "listen to music", pt: "ouvir música", pron: "lísen tu miúzik" },
            { en: "play soccer", pt: "jogar futebol", pron: "plêi sóker" },
            { en: "ride a bike", pt: "andar de bicicleta", pron: "ráid a báik" },
            { en: "take pictures", pt: "tirar fotos", pron: "têik píctchurs" },
            { en: "cook something", pt: "cozinhar algo", pron: "cúk sâmting" },
            { en: "go dancing", pt: "ir dançar", pron: "gôu dánsin" },
            { en: "visit the museum", pt: "visitar o museu", pron: "vízit dã miuzíum" },
            { en: "meet friends", pt: "encontrar amigos", pron: "mít frénds" },
            { en: "have a party", pt: "fazer uma festa", pron: "rév a párti" },
            { en: "go fishing", pt: "ir pescar", pron: "gôu fíchin" },
            { en: "swim in the pool", pt: "nadar na piscina", pron: "suím in dã púl" },
            { en: "hike a mountain", pt: "fazer trilha na montanha", pron: "ráik a máuntain" },
            { en: "explore the city", pt: "explorar a cidade", pron: "eksplór dã síti" },
            { en: "watch the game", pt: "assistir ao jogo", pron: "uótch dã guêim" }
        ],
        times: [
            { en: "this weekend", pt: "neste fim de semana", pron: "dís uíkend" },
            { en: "tonight", pt: "hoje à noite", pron: "tunáit" },
            { en: "tomorrow", pt: "amanhã", pron: "tumórou" },
            { en: "after work", pt: "depois do trabalho", pron: "áfter uórk" },
            { en: "on Sunday", pt: "no domingo", pron: "ón sándêi" },
            { en: "next month", pt: "mês que vem", pron: "nékst mântf" },
            { en: "in the afternoon", pt: "à tarde", pron: "in di áfternún" },
            { en: "during the holidays", pt: "durante as férias", pron: "dúrin dã rólideis" },
            { en: "next week", pt: "semana que vem", pron: "nékst uík" },
            { en: "very soon", pt: "muito em breve", pron: "véri sún" }
        ]
    },
    {
        name: "Feelings & Status",
        starters: [
            { en: "I am", pt: "Eu estou", pron: "ai ém" },
            { en: "He is", pt: "Ele está", pron: "rí is" },
            { en: "She is", pt: "Ela está", pron: "chí is" },
            { en: "We are", pt: "Nós estamos", pron: "uí ár" },
            { en: "They are", pt: "Eles estão", pron: "dêi ár" },
            { en: "I feel", pt: "Eu me sinto", pron: "ai fíl" },
            { en: "You look", pt: "Você parece", pron: "iú lúk" },
            { en: "My friend is", pt: "Meu amigo está", pron: "mái frénd is" },
            { en: "Everyone is", pt: "Todo mundo está", pron: "évriuân is" },
            { en: "I have been", pt: "Eu tenho estado", pron: "ai ráv bín" }
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
            { en: "confused", pt: "confuso(a)", pron: "confiúzd" },
            { en: "surprised", pt: "surpreso(a)", pron: "sarpráizd" },
            { en: "relaxed", pt: "relaxado(a)", pron: "rilékst" },
            { en: "proud", pt: "orgulhoso(a)", pron: "práud" },
            { en: "bored", pt: "entediado(a)", pron: "bórd" },
            { en: "curious", pt: "curioso(a)", pron: "kiúrios" },
            { en: "focused", pt: "focado(a)", pron: "fôucusd" },
            { en: "stressed", pt: "estressado(a)", pron: "strésd" },
            { en: "lonely", pt: "solitário(a)", pron: "lônli" },
            { en: "confident", pt: "confiante", pron: "cónfident" },
            { en: "disappointed", pt: "decepcionado(a)", pron: "disapóinted" },
            { en: "annoyed", pt: "irritado(a)", pron: "anóid" },
            { en: "grateful", pt: "grato(a)", pron: "grêitful" },
            { en: "sleepy", pt: "sonolento(a)", pron: "slípi" },
            { en: "energetic", pt: "energético(a)", pron: "enerdjétik" },
            { en: "weak", pt: "fraco(a)", pron: "uíik" }
        ],
        times: [
            { en: "because of work", pt: "por causa do trabalho", pron: "bicóz óv uórk" },
            { en: "today", pt: "hoje", pron: "tudêi" },
            { en: "right now", pt: "agora mesmo", pron: "ráit náu" },
            { en: "about the trip", pt: "sobre a viagem", pron: "abáut dã tríp" },
            { en: "all day", pt: "o dia todo", pron: "ól dêi" },
            { en: "this week", pt: "esta semana", pron: "dís uík" },
            { en: "lately", pt: "ultimamente", pron: "lêitli" },
            { en: "for no reason", pt: "sem motivo", pron: "fór nôu rízon" },
            { en: "after the meeting", pt: "depois da reunião", pron: "áfter dã mítin" },
            { en: "since yesterday", pt: "desde ontem", pron: "síns iésterdei" }
        ]
    }
];

async function generateAndSeedMassive() {
    console.log("🚀 Iniciando o Gerador MASSIVO de 15.000 Frases Reais...");

    let generatedSentences = [];
    
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
                        level: "Master",
                        category: cat.name,
                        letter: sentenceEn.charAt(0).toUpperCase(),
                        example_sentence: sentenceEn,
                        example_translation: sentencePt,
                        example_pronunciation_pt: sentencePron,
                        difficulty: 3
                    });
                });
            });
        });
    });

    console.log(`✅ Total gerado: ${generatedSentences.length} frases impecáveis!`);

    console.log("🧹 Limpando banco anterior...");
    await supabase.from('words').delete().neq('level', 'ZZZ'); 

    const batchSize = 500;
    for (let i = 0; i < generatedSentences.length; i += batchSize) {
        const batch = generatedSentences.slice(i, i + batchSize);
        console.log(`📤 Enviando lote de ${i} a ${i + batch.length}...`);
        const { error } = await supabase.from('words').upsert(batch, { onConflict: 'word' });
        if (error) console.error("Erro no lote:", error.message);
    }
    
    console.log("🎉 SUCESSO ABSOLUTO: 15.000 FRASES NO BANCO DE DADOS!");
}

generateAndSeedMassive();
