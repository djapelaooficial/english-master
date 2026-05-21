const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const fluencyDictionary = [
    // A
    { word: "Airport", pt: "Aeroporto", pron: "ér-port", ex: "How do I get to the airport?", trans: "Como eu chego no aeroporto?", expron: "ráu dú ai guét tu dã ér-port?" },
    { word: "Always", pt: "Sempre", pron: "ól-ueiz", ex: "I always drink coffee in the morning.", trans: "Eu sempre bebo café de manhã.", expron: "ai ól-ueiz drínk cófi in dã mórning." },
    { word: "Anyone", pt: "Qualquer um / Alguém", pron: "é-ni-uân", ex: "Is anyone here?", trans: "Tem alguém aqui?", expron: "iz é-ni-uân rír?" },
    { word: "Answer", pt: "Resposta / Responder", pron: "én-ser", ex: "Please answer my question.", trans: "Por favor, responda minha pergunta.", expron: "plíiz én-ser mái cués-tchion." },
    { word: "Around", pt: "Ao redor / Por aí", pron: "a-ráund", ex: "I will be around if you need me.", trans: "Estarei por aqui se precisar de mim.", expron: "ai uíl bí a-ráund if iú níd mí." },
    
    // B
    { word: "Bathroom", pt: "Banheiro", pron: "béth-rum", ex: "Where is the bathroom?", trans: "Onde fica o banheiro?", expron: "uér is dã béth-rum?" },
    { word: "Beautiful", pt: "Bonito(a)", pron: "biú-ti-ful", ex: "This city is beautiful.", trans: "Esta cidade é bonita.", expron: "dís síti is biú-ti-ful." },
    { word: "Before", pt: "Antes", pron: "bi-fór", ex: "Call me before you leave.", trans: "Me ligue antes de você sair.", expron: "cól mí bi-fór iú lív." },
    { word: "Better", pt: "Melhor", pron: "bé-ter", ex: "I feel much better today.", trans: "Me sinto muito melhor hoje.", expron: "ai fíl mâtch bé-ter tu-dêi." },
    { word: "Business", pt: "Negócios / Empresa", pron: "bíz-nes", ex: "We are doing business together.", trans: "Estamos fazendo negócios juntos.", expron: "uí ár dú-in bíz-nes tu-gué-der." },

    // C
    { word: "Call", pt: "Ligar / Chamada", pron: "cól", ex: "I need to call my boss.", trans: "Eu preciso ligar para o meu chefe.", expron: "ai níd tu cól mái bós." },
    { word: "Change", pt: "Mudar / Troco", pron: "tchêindj", ex: "Keep the change.", trans: "Fique com o troco.", expron: "kíip dã tchêindj." },
    { word: "Coffee", pt: "Café", pron: "có-fi", ex: "Can I get a cup of coffee?", trans: "Me vê um copo de café?", expron: "kén ai guét a câp óv có-fi?" },
    { word: "Company", pt: "Empresa", pron: "câm-pa-ni", ex: "She works for a great company.", trans: "Ela trabalha para uma ótima empresa.", expron: "chí uórks fór a grêit câm-pa-ni." },
    { word: "Country", pt: "País", pron: "cân-tri", ex: "Which country are you from?", trans: "De qual país você é?", expron: "uítch cân-tri ár iú fróm?" },

    // D
    { word: "Dinner", pt: "Jantar", pron: "dí-ner", ex: "What is for dinner tonight?", trans: "O que tem para o jantar hoje?", expron: "uát iz fór dí-ner tu-náit?" },
    { word: "Different", pt: "Diferente", pron: "dí-frent", ex: "This is completely different.", trans: "Isso é completamente diferente.", expron: "dís iz com-plíit-li dí-frent." },
    { word: "Difficult", pt: "Difícil", pron: "dí-fi-cult", ex: "English is not difficult.", trans: "Inglês não é difícil.", expron: "ín-glich iz nót dí-fi-cult." },
    { word: "Door", pt: "Porta", pron: "dór", ex: "Please close the door.", trans: "Por favor, feche a porta.", expron: "plíiz clôuz dã dór." },
    { word: "Down", pt: "Para baixo / Triste", pron: "dáun", ex: "I am feeling a little down.", trans: "Estou me sentindo um pouco pra baixo.", expron: "ai ém fíl-in a lí-tou dáun." },

    // E
    { word: "Early", pt: "Cedo", pron: "êr-li", ex: "I have to wake up early.", trans: "Eu tenho que acordar cedo.", expron: "ai rév tu uêic âp êr-li." },
    { word: "Easy", pt: "Fácil", pron: "í-zi", ex: "That is an easy question.", trans: "Essa é uma pergunta fácil.", expron: "dét iz én í-zi cués-tchion." },
    { word: "Enough", pt: "Suficiente", pron: "i-nâf", ex: "That is enough for me.", trans: "Isso é suficiente para mim.", expron: "dét iz i-nâf fór mí." },
    { word: "Everyone", pt: "Todo mundo", pron: "é-vri-uân", ex: "Everyone is here today.", trans: "Todo mundo está aqui hoje.", expron: "é-vri-uân iz rír tu-dêi." },
    { word: "Example", pt: "Exemplo", pron: "eg-zém-pol", ex: "Can you give me an example?", trans: "Você pode me dar um exemplo?", expron: "kén iú gív mí én eg-zém-pol?" },

    // F
    { word: "Family", pt: "Família", pron: "fé-mi-li", ex: "My family lives in Brazil.", trans: "Minha família mora no Brasil.", expron: "mái fé-mi-li lívs in bra-zíl." },
    { word: "Feel", pt: "Sentir", pron: "fíl", ex: "How do you feel today?", trans: "Como você se sente hoje?", expron: "ráu dú iú fíl tu-dêi?" },
    { word: "First", pt: "Primeiro", pron: "fêrst", ex: "This is my first time here.", trans: "Esta é a minha primeira vez aqui.", expron: "dís iz mái fêrst táim rír." },
    { word: "Friend", pt: "Amigo", pron: "frénd", ex: "She is my best friend.", trans: "Ela é minha melhor amiga.", expron: "chí is mái bést frénd." },
    { word: "Future", pt: "Futuro", pron: "fiú-tcher", ex: "We need to plan for the future.", trans: "Nós precisamos planejar para o futuro.", expron: "uí níd tu plén fór dã fiú-tcher." },

    // G
    { word: "Game", pt: "Jogo", pron: "guêim", ex: "Do you want to play a game?", trans: "Você quer jogar um jogo?", expron: "dú iú uánt tu plêi a guêim?" },
    { word: "Get", pt: "Obter / Chegar", pron: "guét", ex: "I need to get a new phone.", trans: "Eu preciso comprar/pegar um celular novo.", expron: "ai níd tu guét a niú fôun." },
    { word: "Go", pt: "Ir", pron: "gôu", ex: "Let's go to the beach.", trans: "Vamos para a praia.", expron: "léts gôu tu dã bítch." },
    { word: "Good", pt: "Bom / Boa", pron: "gúd", ex: "That is a very good idea.", trans: "Essa é uma ideia muito boa.", expron: "dét iz a véri gúd ai-dí-a." },
    { word: "Great", pt: "Ótimo", pron: "grêit", ex: "We had a great time.", trans: "Nós tivemos um ótimo momento.", expron: "uí réd a grêit táim." },

    // H
    { word: "Happen", pt: "Acontecer", pron: "ré-pen", ex: "What happened here?", trans: "O que aconteceu aqui?", expron: "uát ré-pend rír?" },
    { word: "Happy", pt: "Feliz", pron: "ré-pi", ex: "I am so happy for you.", trans: "Estou tão feliz por você.", expron: "ai ém sôu ré-pi fór iú." },
    { word: "Have", pt: "Ter", pron: "rév", ex: "I have two brothers.", trans: "Eu tenho dois irmãos.", expron: "ai rév tú bró-ders." },
    { word: "Help", pt: "Ajuda / Ajudar", pron: "réup", ex: "Can you help me with this?", trans: "Você pode me ajudar com isso?", expron: "kén iú réup mi uíth dís?" },
    { word: "Home", pt: "Casa / Lar", pron: "rôum", ex: "I am going home now.", trans: "Estou indo para casa agora.", expron: "ai ém gôin rôum náu." },

    // I
    { word: "Idea", pt: "Ideia", pron: "ai-dí-a", ex: "I have no idea.", trans: "Eu não faço ideia.", expron: "ai rév nôu ai-dí-a." },
    { word: "Important", pt: "Importante", pron: "im-pór-tant", ex: "This meeting is very important.", trans: "Esta reunião é muito importante.", expron: "dís mí-tin iz véri im-pór-tant." },
    { word: "Include", pt: "Incluir", pron: "in-clúd", ex: "Does the price include breakfast?", trans: "O preço inclui café da manhã?", expron: "dâz dã práis in-clúd bréc-fast?" },
    { word: "Information", pt: "Informação", pron: "in-for-mêi-xãn", ex: "I need more information.", trans: "Eu preciso de mais informações.", expron: "ai níd mór in-for-mêi-xãn." },
    { word: "Issue", pt: "Problema / Questão", pron: "í-chu", ex: "We have a big issue here.", trans: "Temos um grande problema aqui.", expron: "uí rév a bíg í-chu rír." },

    // J
    { word: "Job", pt: "Emprego / Trabalho", pron: "djób", ex: "I love my new job.", trans: "Eu amo meu novo emprego.", expron: "ai lóv mái niú djób." },
    { word: "Join", pt: "Juntar-se / Participar", pron: "djóin", ex: "Do you want to join us?", trans: "Você quer se juntar a nós?", expron: "dú iú uánt tu djóin âs?" },
    { word: "Joke", pt: "Piada", pron: "djôuc", ex: "I am just telling a joke.", trans: "Estou apenas contando uma piada.", expron: "ai ém djâst té-lin a djôuc." },
    { word: "Journey", pt: "Jornada / Viagem", pron: "djêr-ni", ex: "Life is a journey.", trans: "A vida é uma jornada.", expron: "láif is a djêr-ni." },
    { word: "Just", pt: "Apenas / Acabar de", pron: "djâst", ex: "I just got here.", trans: "Eu acabei de chegar aqui.", expron: "ai djâst gót rír." },

    // K
    { word: "Keep", pt: "Manter / Continuar", pron: "kíip", ex: "Keep up the good work.", trans: "Continue com o bom trabalho.", expron: "kíip âp dã gúd uórk." },
    { word: "Key", pt: "Chave", pron: "kí", ex: "Where is my car key?", trans: "Onde está a chave do meu carro?", expron: "uér is mái cár kí?" },
    { word: "Kid", pt: "Criança / Brincar", pron: "kíd", ex: "Are you kidding me?", trans: "Você está brincando comigo?", expron: "ár iú kí-din mí?" },
    { word: "Kind", pt: "Tipo / Gentil", pron: "cáind", ex: "That is very kind of you.", trans: "Isso é muito gentil da sua parte.", expron: "dét iz véri cáind óv iú." },
    { word: "Know", pt: "Saber / Conhecer", pron: "nôu", ex: "I don't know what to do.", trans: "Eu não sei o que fazer.", expron: "ai dônt nôu uát tu dú." },

    // L
    { word: "Late", pt: "Tarde / Atrasado", pron: "lêit", ex: "Sorry I am late.", trans: "Desculpe o atraso.", expron: "só-ri ai ém lêit." },
    { word: "Learn", pt: "Aprender", pron: "lêrn", ex: "I want to learn English.", trans: "Eu quero aprender inglês.", expron: "ai uánt tu lêrn ín-glich." },
    { word: "Leave", pt: "Sair / Deixar", pron: "líiv", ex: "What time do you leave work?", trans: "Que horas você sai do trabalho?", expron: "uát táim dú iú líiv uórk?" },
    { word: "Life", pt: "Vida", pron: "láif", ex: "Life is full of surprises.", trans: "A vida é cheia de surpresas.", expron: "láif is fúl óv sãr-prái-zes." },
    { word: "Look", pt: "Olhar / Parecer", pron: "lúk", ex: "You look great today.", trans: "Você está ótimo hoje.", expron: "iú lúk grêit tu-dêi." },

    // M
    { word: "Make", pt: "Fazer / Criar", pron: "mêic", ex: "Can you make a decision?", trans: "Você pode tomar uma decisão?", expron: "kén iú mêic a de-sí-zhôn?" },
    { word: "Man", pt: "Homem", pron: "mén", ex: "He is a good man.", trans: "Ele é um bom homem.", expron: "rí is a gúd mén." },
    { word: "Many", pt: "Muitos(as)", pron: "mé-ni", ex: "I have many things to do.", trans: "Eu tenho muitas coisas para fazer.", expron: "ai rév mé-ni thíngs tu dú." },
    { word: "Meet", pt: "Encontrar / Conhecer", pron: "míit", ex: "Nice to meet you.", trans: "Prazer em conhecer você.", expron: "náis tu míit iú." },
    { word: "Money", pt: "Dinheiro", pron: "mâ-ni", ex: "I need to save money.", trans: "Eu preciso economizar dinheiro.", expron: "ai níd tu sêiv mâ-ni." },

    // N
    { word: "Name", pt: "Nome", pron: "nêim", ex: "What is your name?", trans: "Qual é o seu nome?", expron: "uát iz iór nêim?" },
    { word: "Need", pt: "Precisar", pron: "níid", ex: "I need some help.", trans: "Eu preciso de ajuda.", expron: "ai níd sâm réup." },
    { word: "Never", pt: "Nunca", pron: "né-ver", ex: "I will never forget this.", trans: "Eu nunca vou esquecer isso.", expron: "ai uíl né-ver for-guét dís." },
    { word: "New", pt: "Novo(a)", pron: "niú", ex: "I bought a new car.", trans: "Eu comprei um carro novo.", expron: "ai bót a niú cár." },
    { word: "Night", pt: "Noite", pron: "náit", ex: "Are you free tonight?", trans: "Você está livre hoje à noite?", expron: "ár iú frí tu-náit?" },

    // O
    { word: "Office", pt: "Escritório", pron: "ó-fis", ex: "I am going to the office.", trans: "Estou indo para o escritório.", expron: "ai ém gôin tu dã ó-fis." },
    { word: "Often", pt: "Frequentemente", pron: "óf-en", ex: "How often do you travel?", trans: "Com que frequência você viaja?", expron: "ráu óf-en dú iú tré-vel?" },
    { word: "Only", pt: "Apenas / Único", pron: "ôn-li", ex: "I only have one dollar.", trans: "Eu só tenho um dólar.", expron: "ai ôn-li rév uân dó-lar." },
    { word: "Open", pt: "Abrir / Aberto", pron: "ôu-pen", ex: "Can you open the window?", trans: "Você pode abrir a janela?", expron: "kén iú ôu-pen dã uín-dou?" },
    { word: "Other", pt: "Outro(a)", pron: "â-der", ex: "I have no other option.", trans: "Eu não tenho outra opção.", expron: "ai rév nôu â-der óp-chôn." },

    // P
    { word: "Parent", pt: "Pai/Mãe", pron: "pé-rent", ex: "My parents live in Brazil.", trans: "Meus pais moram no Brasil.", expron: "mái pé-rents lívs in bra-zíl." },
    { word: "Part", pt: "Parte", pron: "párt", ex: "This is part of the process.", trans: "Isso é parte do processo.", expron: "dís iz párt óv dã pró-ses." },
    { word: "People", pt: "Pessoas", pron: "pí-pol", ex: "Many people think so.", trans: "Muitas pessoas acham isso.", expron: "mé-ni pí-pol thínk sôu." },
    { word: "Place", pt: "Lugar", pron: "plêis", ex: "This is a beautiful place.", trans: "Este é um lugar bonito.", expron: "dís iz a biú-ti-ful plêis." },
    { word: "Play", pt: "Jogar / Brincar / Tocar", pron: "plêi", ex: "Let's play some music.", trans: "Vamos tocar uma música.", expron: "léts plêi sâm miú-zik." },

    // Q
    { word: "Quality", pt: "Qualidade", pron: "cuá-li-ti", ex: "We focus on quality.", trans: "Nós focamos em qualidade.", expron: "uí fôu-câs ón cuá-li-ti." },
    { word: "Question", pt: "Pergunta", pron: "cués-tchion", ex: "Can I ask a question?", trans: "Posso fazer uma pergunta?", expron: "kén ai ésk a cués-tchion?" },
    { word: "Quick", pt: "Rápido", pron: "cuíc", ex: "I need a quick answer.", trans: "Preciso de uma resposta rápida.", expron: "ai níd a cuíc én-ser." },
    { word: "Quiet", pt: "Quieto / Silencioso", pron: "cuái-et", ex: "Please be quiet.", trans: "Por favor, faça silêncio.", expron: "plíiz bí cuái-et." },
    { word: "Quite", pt: "Bastante / Muito", pron: "cuáit", ex: "That is quite impressive.", trans: "Isso é bastante impressionante.", expron: "dét iz cuáit im-pré-siv." },

    // R
    { word: "Read", pt: "Ler", pron: "ríid", ex: "I love to read books.", trans: "Eu amo ler livros.", expron: "ai lóv tu ríid búks." },
    { word: "Real", pt: "Real / Verdadeiro", pron: "rí-al", ex: "Is this a real diamond?", trans: "Isso é um diamante verdadeiro?", expron: "iz dís a rí-al dái-a-mond?" },
    { word: "Reason", pt: "Razão / Motivo", pron: "rí-zôn", ex: "What is the reason for this?", trans: "Qual é o motivo disso?", expron: "uát is dã rí-zôn fór dís?" },
    { word: "Remember", pt: "Lembrar", pron: "ri-mém-ber", ex: "Do you remember me?", trans: "Você se lembra de mim?", expron: "dú iú ri-mém-ber mí?" },
    { word: "Room", pt: "Quarto / Sala", pron: "rúm", ex: "Please clean your room.", trans: "Por favor, limpe o seu quarto.", expron: "plíiz clíin iór rúm." },

    // S
    { word: "Same", pt: "Mesmo / Igual", pron: "sêim", ex: "We have the same car.", trans: "Nós temos o mesmo carro.", expron: "uí rév dã sêim cár." },
    { word: "School", pt: "Escola", pron: "is-cúl", ex: "I have to go to school.", trans: "Eu tenho que ir para a escola.", expron: "ai rév tu gôu tu is-cúl." },
    { word: "See", pt: "Ver", pron: "síi", ex: "I will see you tomorrow.", trans: "Eu vejo você amanhã.", expron: "ai uíl síi iú tu-mó-rou." },
    { word: "Show", pt: "Mostrar / Apresentação", pron: "chôu", ex: "Can you show me the way?", trans: "Você pode me mostrar o caminho?", expron: "kén iú chôu mí dã uêi?" },
    { word: "System", pt: "Sistema", pron: "sís-tem", ex: "The system is working fine.", trans: "O sistema está funcionando bem.", expron: "dã sís-tem iz uór-kin fáin." },

    // T
    { word: "Take", pt: "Tomar / Pegar / Levar", pron: "têic", ex: "Take your time.", trans: "Não tenha pressa (Tome seu tempo).", expron: "têic iór táim." },
    { word: "Tell", pt: "Contar / Dizer", pron: "téu", ex: "Tell me the truth.", trans: "Me diga a verdade.", expron: "téu mí dã trút." },
    { word: "Think", pt: "Pensar / Achar", pron: "thínk", ex: "I think you are right.", trans: "Eu acho que você está certo.", expron: "ai thínk iú ár ráit." },
    { word: "Time", pt: "Tempo / Hora", pron: "táim", ex: "What time is it?", trans: "Que horas são?", expron: "uát táim iz ít?" },
    { word: "Today", pt: "Hoje", pron: "tu-dêi", ex: "I have a lot to do today.", trans: "Eu tenho muito a fazer hoje.", expron: "ai rév a lót tu dú tu-dêi." },

    // U
    { word: "Under", pt: "Embaixo / Sob", pron: "ân-der", ex: "The cat is under the table.", trans: "O gato está debaixo da mesa.", expron: "dã két iz ân-der dã têi-bol." },
    { word: "Understand", pt: "Entender", pron: "ân-der-sténd", ex: "Do you understand me?", trans: "Você me entende?", expron: "dú iú ân-der-sténd mí?" },
    { word: "Until", pt: "Até", pron: "ân-tíu", ex: "I will wait until tomorrow.", trans: "Vou esperar até amanhã.", expron: "ai uíl uêit ân-tíu tu-mó-rou." },
    { word: "Up", pt: "Para cima", pron: "âp", ex: "Stand up, please.", trans: "Levante-se, por favor.", expron: "sténd âp, plíiz." },
    { word: "Use", pt: "Usar / Uso", pron: "iúz", ex: "Can I use your phone?", trans: "Posso usar o seu telefone?", expron: "kén ai iúz iór fôun?" },

    // V
    { word: "Vacation", pt: "Férias", pron: "vei-kêi-xãn", ex: "I need a vacation.", trans: "Eu preciso de férias.", expron: "ai níd a vei-kêi-xãn." },
    { word: "Value", pt: "Valor", pron: "vé-liu", ex: "This is of great value.", trans: "Isso é de grande valor.", expron: "dís iz óv grêit vé-liu." },
    { word: "Very", pt: "Muito", pron: "vé-ri", ex: "I am very tired.", trans: "Eu estou muito cansado.", expron: "ai ém vé-ri tái-red." },
    { word: "View", pt: "Vista / Visão", pron: "víu", ex: "The view is amazing.", trans: "A vista é incrível.", expron: "dã víu iz a-mêi-zin." },
    { word: "Visit", pt: "Visitar / Visita", pron: "ví-zit", ex: "I want to visit London.", trans: "Eu quero visitar Londres.", expron: "ai uánt tu ví-zit lôn-dôn." },

    // W
    { word: "Wait", pt: "Esperar", pron: "uêit", ex: "Please wait for me.", trans: "Por favor, espere por mim.", expron: "plíiz uêit fór mí." },
    { word: "Walk", pt: "Caminhar / Andar", pron: "uók", ex: "Let's take a walk.", trans: "Vamos dar uma caminhada.", expron: "léts têic a uók." },
    { word: "Want", pt: "Querer", pron: "uánt", ex: "I want to learn more.", trans: "Eu quero aprender mais.", expron: "ai uánt tu lêrn mór." },
    { word: "Water", pt: "Água", pron: "uó-ter", ex: "Can I have some water?", trans: "Me vê um pouco de água?", expron: "kén ai rév sâm uó-ter?" },
    { word: "Way", pt: "Caminho / Jeito", pron: "uêi", ex: "This is the best way.", trans: "Este é o melhor caminho/jeito.", expron: "dís iz dã bést uêi." },

    // X, Y, Z
    { word: "X-ray", pt: "Raio-X", pron: "éx-rei", ex: "I need to get an X-ray.", trans: "Eu preciso fazer um Raio-X.", expron: "ai níd tu guét én éx-rei." },
    { word: "Year", pt: "Ano", pron: "íer", ex: "Happy New Year!", trans: "Feliz Ano Novo!", expron: "ré-pi niú íer!" },
    { word: "Yes", pt: "Sim", pron: "iés", ex: "Yes, I agree with you.", trans: "Sim, eu concordo com você.", expron: "iés, ai a-gríi uíth iú." },
    { word: "Yesterday", pt: "Ontem", pron: "iés-ter-dei", ex: "I saw him yesterday.", trans: "Eu o vi ontem.", expron: "ai só rím iés-ter-dei." },
    { word: "You", pt: "Você / Vocês", pron: "iú", ex: "How are you today?", trans: "Como você está hoje?", expron: "ráu ár iú tu-dêi?" },
    { word: "Zero", pt: "Zero", pron: "zí-rou", ex: "It is zero degrees outside.", trans: "Está zero graus lá fora.", expron: "it iz zí-rou di-gríiz áut-sáid." },
    { word: "Zone", pt: "Zona / Área", pron: "zôun", ex: "This is a safety zone.", trans: "Esta é uma zona de segurança.", expron: "dís iz a sêif-ti zôun." }
];

async function seedAZDictionary() {
    console.log("Iniciando injeção do Dicionário A-Z Essencial...");

    let payload = fluencyDictionary.map(item => ({
        word: item.word,
        meaning: item.pt,
        pronunciation_pt: item.pron,
        level: "Master",
        category: "A-Z Fluency",
        letter: item.word.charAt(0).toUpperCase(),
        example_sentence: item.ex,
        example_translation: item.trans,
        example_pronunciation_pt: item.expron,
        difficulty: 2
    }));

    // Limpa o banco anterior
    console.log("Limpando banco...");
    await supabase.from('words').delete().neq('level', 'ZZZ');

    // Inserindo
    console.log(`Inserindo ${payload.length} palavras de A a Z...`);
    const { error } = await supabase.from('words').upsert(payload, { onConflict: 'word' });
    
    if (error) {
        console.error("Erro:", error);
    } else {
        console.log("Dicionário A-Z inserido com sucesso!");
    }
}

// seedAZDictionary();

module.exports = { fluencyDictionary };
