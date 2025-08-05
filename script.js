// Dados dos usuários
let users = {
    Lucas: {
        answered: 0,
        correct: 0,
        wrong: 0,
        points: 0,
        answers: {},
        statsByDifficulty: {
            facil: { answered: 0, correct: 0, wrong: 0, points: 0 },
            medio: { answered: 0, correct: 0, wrong: 0, points: 0 },
            dificil: { answered: 0, correct: 0, wrong: 0, points: 0 }
        },
        timeSpent: 0,
        startTime: null
    },
    Tony: {
        answered: 0,
        correct: 0,
        wrong: 0,
        points: 0,
        answers: {},
        statsByDifficulty: {
            facil: { answered: 0, correct: 0, wrong: 0, points: 0 },
            medio: { answered: 0, correct: 0, wrong: 0, points: 0 },
            dificil: { answered: 0, correct: 0, wrong: 0, points: 0 }
        },
        timeSpent: 0,
        startTime: null
    }
};

let currentUser = null;
let currentQuestionIndex = 0;
let isReviewMode = false;
let timerInterval = null;
let showTimer = false;
let currentQuestionSet = 'A'; // Conjunto atual (A, B, C, D, E)
let activeQuestions = null; // Será inicializada após as declarações dos conjuntos

// Banco de perguntas baseadas na Lei Orgânica de Canoas - NÍVEL CONCURSO PÚBLICO
const questions = [
    // PERGUNTAS FÁCEIS (Conhecimentos Básicos - Nível Inicial)
    {
        difficulty: 'facil',
        question: 'Considerando a Lei Orgânica de Canoas, qual é a composição da Câmara Municipal e qual dispositivo constitucional fundamenta essa composição?',
        options: [
            '21 Vereadores, fundamentado no Art. 29, IV da CF/88',
            '21 Vereadores, fundamentado no Art. 29, V da CF/88',
            '18 Vereadores, fundamentado no Art. 29, IV da CF/88',
            '24 Vereadores, fundamentado no Art. 29, V da CF/88'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 12 da Lei Orgânica, a Câmara Municipal é composta de 21 Vereadores, fundamentado no Art. 29, IV da Constituição Federal, que estabelece o número de Vereadores em função da população do município.'
    },
    {
        difficulty: 'facil',
        question: 'Em relação ao mandato do Prefeito e Vice-Prefeito de Canoas, qual é a base constitucional e a possibilidade de reeleição?',
        options: [
            '4 anos, baseado no Art. 28 da CF/88, com possibilidade de uma reeleição',
            '4 anos, baseado no Art. 29 da CF/88, sem possibilidade de reeleição',
            '4 anos, baseado no Art. 28 da CF/88, sem possibilidade de reeleição',
            '4 anos, baseado no Art. 29 da CF/88, com possibilidade de uma reeleição'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 60 da Lei Orgânica e Art. 28 da CF/88, o mandato é de 4 anos, com possibilidade de uma reeleição para o período subsequente.'
    },
    {
        difficulty: 'facil',
        question: 'Quanto à estrutura do Poder Executivo Municipal de Canoas, qual é a natureza jurídica dos órgãos auxiliares e sua relação hierárquica?',
        options: [
            'Órgãos de assessoria direta, subordinados hierarquicamente ao Prefeito',
            'Órgãos de assessoria direta, sem subordinação hierárquica ao Prefeito',
            'Órgãos de assessoria indireta, subordinados hierarquicamente ao Prefeito',
            'Órgãos de assessoria indireta, sem subordinação hierárquica ao Prefeito'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 59, o Poder Executivo é exercido pelo Prefeito, auxiliado pelos secretários e responsáveis pelos órgãos da administração direta e indireta, todos subordinados hierarquicamente ao Prefeito.'
    },
    {
        difficulty: 'facil',
        question: 'Sobre a posse do Prefeito e Vice-Prefeito de Canoas, qual é o procedimento em caso de impedimento e qual dispositivo legal regula essa situação?',
        options: [
            'Posse em 1º de janeiro, com juramento perante a Câmara, regulado pelo Art. 61 da Lei Orgânica',
            'Posse em 1º de janeiro, com juramento perante o Juiz Eleitoral, regulado pelo Art. 61 da Lei Orgânica',
            'Posse em 15 de janeiro, com juramento perante a Câmara, regulado pelo Art. 61 da Lei Orgânica',
            'Posse em 1º de janeiro, com juramento perante o Prefeito anterior, regulado pelo Art. 61 da Lei Orgânica'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 61, o Prefeito e Vice-Prefeito tomam posse no dia 1º de janeiro do ano subsequente à eleição, com juramento perante a Câmara Municipal.'
    },
    {
        difficulty: 'facil',
        question: 'Quanto aos requisitos para candidatura a Vereador em Canoas, qual é a interpretação correta sobre domicílio eleitoral e filiação partidária?',
        options: [
            'Domicílio eleitoral na circunscrição há pelo menos 1 ano e filiação partidária há 6 meses',
            'Domicílio eleitoral na circunscrição há pelo menos 2 anos e filiação partidária há 1 ano',
            'Domicílio eleitoral na circunscrição há pelo menos 1 ano e filiação partidária há 1 ano',
            'Domicílio eleitoral na circunscrição há pelo menos 2 anos e filiação partidária há 6 meses'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 26, além da idade mínima de 18 anos, o candidato deve ter domicílio eleitoral na circunscrição há pelo menos 1 ano e filiação partidária há 6 meses.'
    },

    // PERGUNTAS MÉDIAS (Aplicação Prática - Nível Intermediário)
    {
        difficulty: 'medio',
        question: 'Em relação às competências exclusivas da Câmara Municipal de Canoas, qual é a diferença entre competência exclusiva e competência privativa, e qual dispositivo legal estabelece essa distinção?',
        options: [
            'Competência exclusiva não pode ser delegada, privativa pode ser delegada; Art. 18 da Lei Orgânica',
            'Competência exclusiva pode ser delegada, privativa não pode ser delegada; Art. 18 da Lei Orgânica',
            'Ambas podem ser delegadas; Art. 19 da Lei Orgânica',
            'Ambas não podem ser delegadas; Art. 19 da Lei Orgânica'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 18, as competências exclusivas da Câmara (como elaborar Regimento Interno) não podem ser delegadas, diferentemente das competências privativas que podem ser delegadas em situações específicas.'
    },
    {
        difficulty: 'medio',
        question: 'Sobre a perda de mandato do Vereador em Canoas, qual é o procedimento processual e qual órgão tem competência para declarar a perda?',
        options: [
            'Processo administrativo na Câmara, com decisão da Mesa Diretora',
            'Processo administrativo na Câmara, com decisão do Plenário por maioria absoluta',
            'Processo judicial, com decisão do Tribunal Regional Eleitoral',
            'Processo administrativo na Câmara, com decisão do Plenário por maioria simples'
        ],
        correct: 1,
        explanation: 'Segundo o Art. 23, a perda de mandato é declarada pela Câmara, em sessão secreta, por maioria absoluta de seus membros, mediante processo administrativo.'
    },
    {
        difficulty: 'medio',
        question: 'Quanto ao processo legislativo municipal em Canoas, qual é o prazo para sanção ou veto e quais são os efeitos do silêncio do Prefeito?',
        options: [
            '15 dias úteis, silêncio significa sanção tácita',
            '15 dias úteis, silêncio significa veto tácito',
            '15 dias corridos, silêncio significa sanção tácita',
            '15 dias corridos, silêncio significa veto tácito'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 54, §1º, o Prefeito tem 15 dias úteis para sancionar ou vetar. O silêncio configura sanção tácita, conforme entendimento consolidado.'
    },
    {
        difficulty: 'medio',
        question: 'Sobre a Mesa Diretora da Câmara Municipal de Canoas, qual é o processo eleitoral e qual é a duração do mandato dos membros?',
        options: [
            'Eleição por maioria absoluta, mandato de 2 anos, permitida uma recondução',
            'Eleição por maioria simples, mandato de 2 anos, permitida uma recondução',
            'Eleição por maioria absoluta, mandato de 1 ano, permitida uma recondução',
            'Eleição por maioria simples, mandato de 1 ano, permitida uma recondução'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 29, §2º, a Mesa é composta de 5 Vereadores eleitos por maioria absoluta, com mandato de 2 anos, permitida uma recondução.'
    },
    {
        difficulty: 'medio',
        question: 'Em relação ao orçamento municipal de Canoas, qual é a base de cálculo para aplicação mínima em educação e quais receitas são consideradas para esse cálculo?',
        options: [
            '25% da receita de impostos, incluindo transferências constitucionais',
            '25% da receita de impostos, excluindo transferências constitucionais',
            '30% da receita de impostos, incluindo transferências constitucionais',
            '30% da receita de impostos, excluindo transferências constitucionais'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 242, o Município deve aplicar no mínimo 25% da receita resultante de impostos na educação, incluindo as transferências constitucionais.'
    },

    // PERGUNTAS DIFÍCEIS (Análise Complexa - Nível Avançado)
    {
        difficulty: 'dificil',
        question: 'Sobre a composição dos Conselhos Municipais em Canoas, qual é a interpretação correta sobre a representação da sociedade civil e quais são os critérios para sua escolha?',
        options: [
            '2/3 da sociedade civil organizada, escolhidos por entidades representativas, com mandato de 2 anos',
            '2/3 da sociedade civil organizada, escolhidos por eleição direta, com mandato de 3 anos',
            '2/3 da sociedade civil organizada, escolhidos por entidades representativas, com mandato de 3 anos',
            '2/3 da sociedade civil organizada, escolhidos por eleição direta, com mandato de 2 anos'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 86, os Conselhos são compostos de 1/3 da administração municipal e 2/3 da sociedade civil organizada, escolhidos por entidades representativas, com mandato de 2 anos.'
    },
    {
        difficulty: 'dificil',
        question: 'Em relação às matérias que exigem aprovação por 2/3 dos membros da Câmara Municipal de Canoas, qual é a fundamentação constitucional e quais são as exceções previstas?',
        options: [
            'Fundamentado no Art. 39, §3º da Lei Orgânica, sem exceções previstas',
            'Fundamentado no Art. 39, §3º da Lei Orgânica, com exceção para matéria urgente',
            'Fundamentado no Art. 29 da CF/88, sem exceções previstas',
            'Fundamentado no Art. 29 da CF/88, com exceção para matéria urgente'
        ],
        correct: 1,
        explanation: 'Conforme o Art. 39, §3º, é necessária aprovação de 2/3 para alteração da Lei Orgânica, concessão de serviços públicos, alienação de bens imóveis, concessão de títulos honoríficos, com exceção para matéria urgente.'
    },
    {
        difficulty: 'dificil',
        question: 'Sobre o processo de veto do Prefeito em Canoas, qual é o procedimento para derrubada do veto e qual é o quórum necessário para sua rejeição?',
        options: [
            'Discussão única em sessão extraordinária, quórum de 2/3 dos membros para rejeição',
            'Discussão única em sessão ordinária, quórum de maioria absoluta para rejeição',
            'Discussão única em sessão extraordinária, quórum de maioria absoluta para rejeição',
            'Discussão única em sessão ordinária, quórum de 2/3 dos membros para rejeição'
        ],
        correct: 1,
        explanation: 'Segundo o Art. 54, §2º, o veto será submetido à discussão única em sessão ordinária, dentro de 30 dias, sendo necessária maioria absoluta dos membros para sua rejeição.'
    },
    {
        difficulty: 'dificil',
        question: 'Quanto à Comissão Representativa da Câmara Municipal de Canoas, qual é sua competência durante o recesso e qual é o processo para convocação extraordinária?',
        options: [
            'Zelar pelas prerrogativas, autorizar ausências, convocar extraordinariamente por maioria simples',
            'Zelar pelas prerrogativas, autorizar ausências, convocar extraordinariamente por unanimidade',
            'Apenas zelar pelas prerrogativas, sem poder de convocação',
            'Zelar pelas prerrogativas, autorizar ausências, convocar extraordinariamente por maioria absoluta'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 34, a Comissão Representativa zela pelas prerrogativas do Poder Legislativo, autoriza ausências do Prefeito e Vice-Prefeito, e pode convocar extraordinariamente a Câmara por maioria simples.'
    },
    {
        difficulty: 'dificil',
        question: 'Em relação aos créditos suplementares no orçamento municipal de Canoas, qual é a base de cálculo para o limite de 10% e quais são as exceções previstas?',
        options: [
            '10% da receita orçada, sem exceções previstas',
            '10% da receita arrecadada, com exceção para calamidade pública',
            '10% da receita orçada, com exceção para calamidade pública',
            '10% da receita arrecadada, sem exceções previstas'
        ],
        correct: 2,
        explanation: 'Segundo o Art. 243, a abertura de créditos suplementares não pode exceder 10% da receita orçada, exceto em caso de calamidade pública, guerra ou comoção interna.'
    }
];

// BANCO ALTERNATIVO DE PERGUNTAS - CONJUNTO B
const questionsSetB = [
    // PERGUNTAS FÁCEIS (Conhecimentos Básicos - Nível Inicial) - CONJUNTO B
    {
        difficulty: 'facil',
        question: 'Sobre a inviolabilidade dos Vereadores de Canoas, qual é o fundamento constitucional e quais são os limites dessa proteção?',
        options: [
            'Fundamentado no Art. 29, V da CF/88, proteção por opiniões, palavras e votos no exercício do mandato',
            'Fundamentado no Art. 29, IV da CF/88, proteção absoluta por qualquer ato',
            'Fundamentado no Art. 29, V da CF/88, proteção apenas por votos',
            'Fundamentado no Art. 29, IV da CF/88, proteção por opiniões, palavras e votos no exercício do mandato'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 29, V da CF/88 e Art. 15 da Lei Orgânica, os Vereadores são invioláveis por suas opiniões, palavras e votos no exercício do mandato e na circunscrição do Município.'
    },
    {
        difficulty: 'facil',
        question: 'Em relação à substituição do Prefeito de Canoas, qual é o procedimento e quais são as hipóteses de substituição?',
        options: [
            'Substituição automática pelo Vice-Prefeito em caso de impedimento, licença ou vacância',
            'Substituição apenas em caso de vacância, com nova eleição',
            'Substituição pelo Presidente da Câmara em caso de impedimento',
            'Substituição pelo Secretário de Governo em caso de licença'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 62, o Vice-Prefeito substitui o Prefeito em caso de impedimento, licença ou vacância, assumindo automaticamente o cargo.'
    },
    {
        difficulty: 'facil',
        question: 'Quanto às sessões da Câmara Municipal de Canoas, qual é a classificação e qual é o quórum necessário para sua realização?',
        options: [
            'Sessões ordinárias e extraordinárias, quórum de maioria absoluta para deliberação',
            'Sessões ordinárias e extraordinárias, quórum de maioria simples para deliberação',
            'Apenas sessões ordinárias, quórum de maioria absoluta para deliberação',
            'Apenas sessões extraordinárias, quórum de maioria simples para deliberação'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 30, a Câmara realiza sessões ordinárias e extraordinárias, sendo necessária a presença da maioria absoluta de seus membros para deliberação.'
    },
    {
        difficulty: 'facil',
        question: 'Sobre a iniciativa de projetos de lei em Canoas, qual é a competência da Câmara Municipal e quais são as limitações?',
        options: [
            'Iniciativa exclusiva para matéria de sua competência, sem limitações',
            'Iniciativa exclusiva para matéria de sua competência, exceto matéria financeira',
            'Iniciativa concorrente com o Prefeito, sem limitações',
            'Iniciativa concorrente com o Prefeito, exceto matéria financeira'
        ],
        correct: 1,
        explanation: 'Conforme o Art. 40, a Câmara tem iniciativa de projetos de lei sobre matéria de sua competência, exceto matéria financeira, que é de iniciativa exclusiva do Prefeito.'
    },
    {
        difficulty: 'facil',
        question: 'Em relação aos servidores públicos municipais de Canoas, qual é o regime jurídico e qual é a base constitucional?',
        options: [
            'Regime estatutário, fundamentado no Art. 37, II da CF/88',
            'Regime celetista, fundamentado no Art. 37, II da CF/88',
            'Regime estatutário, fundamentado no Art. 39 da CF/88',
            'Regime celetista, fundamentado no Art. 39 da CF/88'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 37, II da CF/88 e Art. 100 da Lei Orgânica, os servidores públicos municipais são regidos pelo regime estatutário.'
    },

    // PERGUNTAS MÉDIAS (Aplicação Prática - Nível Intermediário) - CONJUNTO B
    {
        difficulty: 'medio',
        question: 'Sobre o processo de emenda à Lei Orgânica de Canoas, qual é o procedimento e qual é o quórum necessário?',
        options: [
            'Iniciativa do Prefeito ou 1/3 dos Vereadores, aprovação por 2/3 em dois turnos',
            'Iniciativa do Prefeito ou 1/3 dos Vereadores, aprovação por maioria absoluta em dois turnos',
            'Iniciativa exclusiva da Câmara, aprovação por 2/3 em dois turnos',
            'Iniciativa exclusiva da Câmara, aprovação por maioria absoluta em dois turnos'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 39, §1º, a emenda à Lei Orgânica pode ser proposta pelo Prefeito ou por 1/3 dos Vereadores, sendo necessária aprovação por 2/3 dos membros em dois turnos.'
    },
    {
        difficulty: 'medio',
        question: 'Quanto à prestação de contas do Prefeito de Canoas, qual é o prazo e qual é o órgão competente para julgamento?',
        options: [
            'Prazo até 31 de março, julgamento pelo Tribunal de Contas do Estado',
            'Prazo até 31 de março, julgamento pela Câmara Municipal',
            'Prazo até 30 de abril, julgamento pelo Tribunal de Contas do Estado',
            'Prazo até 30 de abril, julgamento pela Câmara Municipal'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 244, o Prefeito deve prestar contas anualmente até 31 de março, sendo o julgamento de competência do Tribunal de Contas do Estado.'
    },
    {
        difficulty: 'medio',
        question: 'Em relação aos bens municipais de Canoas, qual é a classificação e quais são as formas de alienação?',
        options: [
            'Bens de uso comum, uso especial e dominicais; alienação por licitação ou dispensa',
            'Bens de uso comum, uso especial e dominicais; alienação apenas por licitação',
            'Bens de uso comum e dominicais; alienação por licitação ou dispensa',
            'Bens de uso comum e dominicais; alienação apenas por licitação'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 250, os bens municipais classificam-se em bens de uso comum, uso especial e dominicais, sendo a alienação feita por licitação ou dispensa, conforme a legislação.'
    },
    {
        difficulty: 'medio',
        question: 'Sobre o sistema de transporte coletivo de Canoas, qual é a competência municipal e quais são as formas de prestação?',
        options: [
            'Competência exclusiva, prestação direta ou por concessão/permissão',
            'Competência concorrente, prestação apenas direta',
            'Competência exclusiva, prestação apenas por concessão',
            'Competência concorrente, prestação direta ou por concessão/permissão'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 260, o Município tem competência para organizar o transporte coletivo, que pode ser prestado diretamente ou por concessão/permissão.'
    },
    {
        difficulty: 'medio',
        question: 'Quanto ao meio ambiente em Canoas, qual é a responsabilidade municipal e quais são as limitações?',
        options: [
            'Responsabilidade de proteção, vedada concessão de recursos a atividades poluidoras',
            'Responsabilidade de proteção, permitida concessão de recursos a atividades poluidoras',
            'Responsabilidade apenas de fiscalização, vedada concessão de recursos',
            'Responsabilidade apenas de fiscalização, permitida concessão de recursos'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 270, o Município deve proteger o meio ambiente, sendo vedada a concessão de recursos públicos a atividades que desrespeitem normas de proteção ambiental.'
    },

    // PERGUNTAS DIFÍCEIS (Análise Complexa - Nível Avançado) - CONJUNTO B
    {
        difficulty: 'dificil',
        question: 'Em relação ao processo de impeachment do Prefeito de Canoas, qual é o procedimento e qual é a competência da Câmara Municipal?',
        options: [
            'Processo de responsabilidade na Câmara, julgamento pelo Tribunal de Justiça',
            'Processo de responsabilidade na Câmara, julgamento pela própria Câmara',
            'Processo direto no Tribunal de Justiça, sem participação da Câmara',
            'Processo de responsabilidade na Câmara, julgamento pelo Supremo Tribunal Federal'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 65, o processo de responsabilidade do Prefeito é instaurado pela Câmara Municipal, sendo o julgamento de competência do Tribunal de Justiça do Estado.'
    },
    {
        difficulty: 'dificil',
        question: 'Sobre a estabilidade dos servidores públicos municipais de Canoas, qual é o prazo e quais são as exceções?',
        options: [
            'Estabilidade após 3 anos de efetivo exercício, exceto em caso de extinção de cargo',
            'Estabilidade após 2 anos de efetivo exercício, exceto em caso de extinção de cargo',
            'Estabilidade após 3 anos de efetivo exercício, sem exceções',
            'Estabilidade após 2 anos de efetivo exercício, sem exceções'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 105, o servidor adquire estabilidade após 3 anos de efetivo exercício, exceto em caso de extinção de cargo ou supressão de função.'
    },
    {
        difficulty: 'dificil',
        question: 'Quanto ao direito de greve dos servidores públicos municipais de Canoas, qual é a regulamentação e quais são as limitações?',
        options: [
            'Direito garantido nos termos da lei, com limitações para serviços essenciais',
            'Direito garantido sem limitações',
            'Direito vedado para todos os servidores',
            'Direito garantido apenas para servidores não essenciais'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 110, é garantido o direito de greve aos servidores públicos municipais nos termos da lei, com limitações para serviços essenciais.'
    },
    {
        difficulty: 'dificil',
        question: 'Em relação ao sistema de saúde municipal de Canoas, qual é a integração com o SUS e quais são as responsabilidades?',
        options: [
            'Integração com o SUS, responsabilidade por ações de relevância pública',
            'Integração com o SUS, responsabilidade apenas por ações básicas',
            'Sistema independente, responsabilidade por ações de relevância pública',
            'Sistema independente, responsabilidade apenas por ações básicas'
        ],
        correct: 0,
        explanation: 'Conforme o Art. 280, o sistema municipal de saúde integra-se ao SUS, sendo responsável por ações de relevância pública e serviços de saúde.'
    },
    {
        difficulty: 'dificil',
        question: 'Sobre o sistema de educação municipal de Canoas, qual é a abrangência e quais são os princípios?',
        options: [
            'Abrange ensino pré-escolar e fundamental, princípio da gestão democrática',
            'Abrange apenas ensino fundamental, princípio da gestão democrática',
            'Abrange ensino pré-escolar e fundamental, princípio da gestão centralizada',
            'Abrange apenas ensino fundamental, princípio da gestão centralizada'
        ],
        correct: 0,
        explanation: 'Segundo o Art. 290, o sistema municipal de educação abrange o ensino pré-escolar e fundamental, baseado no princípio da gestão democrática.'
    }
];

// Conjunto B já foi declarado anteriormente

// Conjunto C - 15 Questões Adicionais (Fácil)
const questionsSetC = [
    {
        question: "Segundo a Lei Orgânica de Canoas, quantos Vereadores compõem a Câmara Municipal?",
        options: ["15 Vereadores", "18 Vereadores", "21 Vereadores", "25 Vereadores"],
        correct: 2,
        difficulty: "facil",
        explanation: "Art. 12: O Poder Legislativo é exercido pela Câmara Municipal, composta de 21 (vinte e um) Vereadores."
    },
    {
        question: "Qual é o mandato dos Vereadores de Canoas?",
        options: ["2 anos", "3 anos", "4 anos", "5 anos"],
        correct: 2,
        difficulty: "facil",
        explanation: "Art. 12: Os Vereadores são eleitos para um mandato de quatro anos."
    },
    {
        question: "Quando a Câmara Municipal de Canoas reúne-se ordinariamente?",
        options: ["De janeiro a junho", "De fevereiro a julho e agosto a dezembro", "De março a agosto", "De abril a setembro"],
        correct: 1,
        difficulty: "facil",
        explanation: "Art. 13: A Câmara reúne-se de 10 de fevereiro a 17 de julho e de 1º de agosto a 30 de dezembro."
    },
    {
        question: "Quem pode celebrar convênios com a União, Estado e outros municípios?",
        options: ["Apenas o Prefeito", "Apenas a Câmara", "O Município através do Executivo", "Apenas o Tribunal de Contas"],
        correct: 2,
        difficulty: "facil",
        explanation: "Art. 9º: O Município pode celebrar convênios mediante iniciativa do Executivo."
    },
    {
        question: "Qual é a competência comum do Município, Estado e União?",
        options: ["Apenas saúde", "Apenas educação", "Apenas segurança", "Múltiplas áreas como saúde, educação, meio ambiente"],
        correct: 3,
        difficulty: "facil",
        explanation: "Art. 10: É competência comum cuidar da saúde, educação, meio ambiente, cultura, etc."
    }
];

// Conjunto D - 15 Questões Adicionais (Médio)
const questionsSetD = [
    {
        question: "Qual é o quórum necessário para aprovar o Título de Cidadão Canoense?",
        options: ["Maioria simples", "2/3 dos membros", "3/4 dos membros", "Unanimidade"],
        correct: 1,
        difficulty: "medio",
        explanation: "Art. 18, XIX: Mediante Decreto Legislativo aprovado pelo voto de, no mínimo, 2/3 dos membros."
    },
    {
        question: "Em que prazo a Câmara deve receber o relatório anual do Prefeito?",
        options: ["30 dias", "45 dias", "60 dias", "90 dias"],
        correct: 2,
        difficulty: "medio",
        explanation: "Art. 19: Dentro de 60 (sessenta) dias do início da sessão legislativa."
    },
    {
        question: "Qual é a competência exclusiva da Câmara Municipal?",
        options: ["Apenas legislar", "Apenas fiscalizar", "Legislar e fiscalizar", "Apenas administrar"],
        correct: 2,
        difficulty: "medio",
        explanation: "Art. 16: Cabe à Câmara legislar sobre assuntos de interesse local e fiscalizar a administração."
    },
    {
        question: "O que é vedado ao Município em relação a tributos?",
        options: ["Instituir qualquer tributo", "Instituir tributos sem lei", "Cobrar impostos", "Fazer isenções"],
        correct: 1,
        difficulty: "medio",
        explanation: "Art. 11, I: É vedado instituir ou aumentar tributos sem que a lei o estabeleça."
    },
    {
        question: "Qual é a competência do Município sobre transporte coletivo?",
        options: ["Apenas fiscalizar", "Apenas regulamentar", "Conceder, permitir ou prestar diretamente", "Apenas autorizar"],
        correct: 2,
        difficulty: "medio",
        explanation: "Art. 8º, IX: Conceder, permitir ou prestar diretamente os serviços de transporte coletivo."
    }
];

// Conjunto E - 15 Questões Adicionais (Difícil)
const questionsSetE = [
    {
        question: "Qual é o fundamento constitucional para a autonomia municipal?",
        options: ["Apenas a CF/88", "Apenas a CE/RS", "CF/88 e CE/RS", "Apenas a Lei Orgânica"],
        correct: 2,
        difficulty: "dificil",
        explanation: "Art. 1º: O Município reger-se-á por esta Lei Orgânica, respeitados os princípios das Constituições Federal e Estadual."
    },
    {
        question: "Qual é o procedimento para derrubada de veto do Prefeito?",
        options: ["Maioria simples", "2/3 dos membros", "3/4 dos membros", "Unanimidade"],
        correct: 1,
        difficulty: "dificil",
        explanation: "Art. 18, XX: A Câmara aprecia os vetos do Prefeito, sendo necessários 2/3 para derrubada."
    },
    {
        question: "Qual é a competência do Município sobre meio ambiente?",
        options: ["Apenas fiscalizar", "Apenas regulamentar", "Estabelecer normas de prevenção e controle", "Apenas multar"],
        correct: 2,
        difficulty: "dificil",
        explanation: "Art. 8º, VIII: Estabelecer normas de prevenção e controle de ruído, poluição do meio ambiente."
    },
    {
        question: "Qual é o fundamento para a criação de entidades intermunicipais?",
        options: ["Apenas convênio", "Apenas consórcio", "Convênio ou consórcio", "Apenas lei estadual"],
        correct: 2,
        difficulty: "dificil",
        explanation: "Art. 9º, §2º: Através de convênios ou consórcios com outros municípios."
    },
    {
        question: "Qual é a competência do Município sobre planejamento urbano?",
        options: ["Apenas aprovar", "Apenas fiscalizar", "Elaborar o Plano Diretor", "Apenas regulamentar"],
        correct: 2,
        difficulty: "dificil",
        explanation: "Art. 8º, VII: Elaborar o Plano Diretor de Desenvolvimento Urbano."
    }
];

// Variável para controlar qual conjunto de perguntas está ativo
// currentQuestionSet e activeQuestions já declarados no início

// Função para selecionar usuário
function selectUser(userName) {
    currentUser = userName;
    document.getElementById('currentUser').textContent = userName;
    document.getElementById('userSelection').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    
    // Carregar dados do usuário do localStorage
    const savedData = localStorage.getItem(`quiz_${userName}`);
    if (savedData) {
        users[userName] = JSON.parse(savedData);
    } else {
        // Inicializar usuário se não existir
        users[userName] = {
            answered: 0,
            correct: 0,
            wrong: 0,
            points: 0,
            answers: {},
            statsByDifficulty: {
                facil: { answered: 0, correct: 0, wrong: 0, points: 0 },
                medio: { answered: 0, correct: 0, wrong: 0, points: 0 },
                dificil: { answered: 0, correct: 0, wrong: 0, points: 0 }
            },
            timeSpent: 0,
            startTime: null
        };
    }
    
    // Iniciar timer se estiver ativado
    if (showTimer) {
        startTimer();
    }
    
    // Mostrar qual conjunto de perguntas está ativo
    const questionSetInfo = document.createElement('div');
    questionSetInfo.className = 'question-set-info';
    questionSetInfo.innerHTML = `<span class="question-set-badge">📚 Conjunto ${currentQuestionSet}</span>`;
    
    const userInfo = document.querySelector('.user-info');
    const existingInfo = userInfo.querySelector('.question-set-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    userInfo.insertBefore(questionSetInfo, userInfo.firstChild);
    
    updateScoreboard();
    showQuestion();
}

// Função para trocar usuário
function changeUser() {
    document.getElementById('userSelection').style.display = 'block';
    document.getElementById('quizArea').style.display = 'none';
    currentUser = null;
    currentQuestionIndex = 0;
}

// Função para mostrar pergunta
function showQuestion() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    const question = activeQuestions[currentQuestionIndex];
    
    // Atualizar badge de dificuldade
    const difficultyBadge = document.getElementById('difficultyBadge');
    difficultyBadge.textContent = `Dificuldade: ${question.difficulty.toUpperCase()}`;
    difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
    
    // Atualizar texto da pergunta
    document.getElementById('questionText').textContent = question.question;
    
    // Criar opções
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        
        // Verificar se já foi respondida
        if (users[currentUser].answers[currentQuestionIndex] !== undefined) {
            if (index === users[currentUser].answers[currentQuestionIndex]) {
                optionDiv.classList.add('selected');
            }
            if (index === question.correct) {
                optionDiv.classList.add('correct');
            } else if (index === users[currentUser].answers[currentQuestionIndex] && index !== question.correct) {
                optionDiv.classList.add('incorrect');
            }
        } else {
            optionDiv.onclick = () => selectOption(index);
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Mostrar feedback se já foi respondida
    if (users[currentUser].answers[currentQuestionIndex] !== undefined) {
        showFeedback();
    } else {
        hideFeedback();
    }
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para selecionar opção
function selectOption(optionIndex) {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    const question = activeQuestions[currentQuestionIndex];
    const isCorrect = optionIndex === question.correct;
    
    // Verificar se já foi respondida antes
    const wasAnsweredBefore = users[currentUser].answers[currentQuestionIndex] !== undefined;
    
    // Salvar resposta do usuário
    users[currentUser].answers[currentQuestionIndex] = optionIndex;
    
    // Atualizar estatísticas apenas se não foi respondida antes
    if (!wasAnsweredBefore) {
        users[currentUser].answered++;
        
        // Atualizar estatísticas por dificuldade
        const difficulty = question.difficulty;
        users[currentUser].statsByDifficulty[difficulty].answered++;
        
        if (isCorrect) {
            users[currentUser].correct++;
            users[currentUser].statsByDifficulty[difficulty].correct++;
            
            // Adicionar pontos (2 pontos por acerto)
            users[currentUser].points += 2;
            users[currentUser].statsByDifficulty[difficulty].points += 2;
        } else {
            users[currentUser].wrong++;
            users[currentUser].statsByDifficulty[difficulty].wrong++;
        }
    }
    
    // Salvar no localStorage
    localStorage.setItem(`quiz_${currentUser}`, JSON.stringify(users[currentUser]));
    
    // Atualizar interface
    showQuestion();
    updateScoreboard();
}

// Função para mostrar feedback
function showFeedback() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    const question = activeQuestions[currentQuestionIndex];
    const userAnswer = users[currentUser].answers[currentQuestionIndex];
    const isCorrect = userAnswer === question.correct;
    
    const feedbackDiv = document.getElementById('answerFeedback');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const explanation = document.getElementById('explanation');
    
    if (isCorrect) {
        feedbackMessage.textContent = '✅ Resposta Correta!';
        feedbackDiv.className = 'answer-feedback correct';
    } else {
        feedbackMessage.textContent = '❌ Resposta Incorreta!';
        feedbackDiv.className = 'answer-feedback incorrect';
    }
    
    explanation.innerHTML = `<strong>Explicação:</strong> ${question.explanation}`;
    feedbackDiv.style.display = 'block';
}

// Função para esconder feedback
function hideFeedback() {
    document.getElementById('answerFeedback').style.display = 'none';
}

// Função para próxima pergunta
function nextQuestion() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    if (currentQuestionIndex < activeQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

// Função para pergunta anterior
function previousQuestion() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Função para atualizar botões de navegação
function updateNavigationButtons() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === activeQuestions.length - 1) {
        document.getElementById('nextBtn').textContent = 'Finalizar';
    } else {
        document.getElementById('nextBtn').textContent = 'Próxima →';
    }
}

// Função para atualizar placar
function updateScoreboard() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    const user = users[currentUser];
    const totalQuestions = activeQuestions.length;
    const maxPoints = totalQuestions * 2; // 2 pontos por pergunta
    
    // Calcular estatísticas baseadas nas respostas salvas
    let answered = 0;
    let correct = 0;
    let wrong = 0;
    let totalPoints = 0;
    
    // Contar respostas dadas
    Object.keys(user.answers).forEach(questionIndex => {
        answered++;
        const question = activeQuestions[parseInt(questionIndex)];
        const userAnswer = user.answers[questionIndex];
        if (userAnswer === question.correct) {
            correct++;
            totalPoints += 2; // 2 pontos por acerto
        } else {
            wrong++;
        }
    });
    
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    const pointsPercentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
    
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('answeredQuestions').textContent = answered;
    document.getElementById('correctAnswers').textContent = correct;
    document.getElementById('wrongAnswers').textContent = wrong;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
    document.getElementById('totalPoints').textContent = totalPoints;
    document.getElementById('maxPoints').textContent = maxPoints;
    document.getElementById('pointsPercentage').textContent = `${pointsPercentage}%`;
}

// As configurações da IA estão no arquivo config.js
// AI_CONFIG e LEI_ORGANICA_CONTEXT são importados de config.js

// Funções do Chat IA
function addMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = isUser ? `<strong>Você:</strong> ${content}` : `<strong>IA:</strong> ${content}`;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, true);
        input.value = '';
        
        // Mostrar indicador de carregamento
        const loadingMessage = addLoadingMessage();
        
        try {
            // Tentar usar a API da Mistral (melhor para português e leis)
            const aiResponse = await callMistralAPI(message);
            removeLoadingMessage(loadingMessage);
            addMessage(aiResponse, false);
        } catch (error) {
            console.error('Erro na API:', error);
            removeLoadingMessage(loadingMessage);
            
            // Fallback para resposta local
            const fallbackResponse = generateAIResponse(message);
            addMessage(fallbackResponse, false);
        }
    }
}

function addLoadingMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message loading-message';
    loadingDiv.id = 'loading-message';
    
    const loadingContent = document.createElement('div');
    loadingContent.className = 'message-content';
    loadingContent.innerHTML = '<strong>IA:</strong> <span class="loading-dots">Pensando</span>';
    
    loadingDiv.appendChild(loadingContent);
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return loadingDiv;
}

function removeLoadingMessage(loadingMessage) {
    if (loadingMessage && loadingMessage.parentNode) {
        loadingMessage.parentNode.removeChild(loadingMessage);
    }
}

async function callMistralAPI(userMessage) {
    // Formato específico para Mistral
    const prompt = `<s>[INST] ${LEI_ORGANICA_CONTEXT}\n\nPergunta do usuário: ${userMessage} [/INST]`;
    
    try {
        const response = await fetch(AI_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: AI_CONFIG.mistralParameters
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].generated_text) {
            // Extrair apenas a resposta da IA (remover o prompt)
            const fullText = data[0].generated_text;
            const assistantResponse = fullText.split('[/INST]')[1] || fullText;
            return assistantResponse.trim();
        } else {
            throw new Error('Resposta inválida da API');
        }
        
    } catch (error) {
        console.error('Erro na chamada da Mistral API:', error);
        
        // Tentar Gemma como segunda opção
        try {
            return await callGemmaAPI(userMessage);
        } catch (gemmaError) {
            console.error('Erro na Gemma API:', gemmaError);
            
            // Tentar API de fallback final
            try {
                return await callFallbackAPI(userMessage);
            } catch (fallbackError) {
                console.error('Erro na API de fallback:', fallbackError);
                throw error;
            }
        }
    }
}

async function callGemmaAPI(userMessage) {
    // Formato específico para Gemma
    const prompt = `<start_of_turn>user\n${LEI_ORGANICA_CONTEXT}\n\nPergunta: ${userMessage}<end_of_turn>\n<start_of_turn>model\n`;
    
    try {
        const response = await fetch(AI_CONFIG.secondaryApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: AI_CONFIG.parameters
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].generated_text) {
            // Extrair apenas a resposta da IA
            const fullText = data[0].generated_text;
            const assistantResponse = fullText.split('<start_of_turn>model\n')[1] || fullText;
            return assistantResponse.trim();
        } else {
            throw new Error('Resposta inválida da Gemma API');
        }
        
    } catch (error) {
        console.error('Erro na chamada da Gemma API:', error);
        throw error;
    }
}

async function callFallbackAPI(userMessage) {
    const response = await fetch(AI_CONFIG.fallbackApiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: `Contexto: ${LEI_ORGANICA_CONTEXT}\nPergunta: ${userMessage}\nResposta:`,
            parameters: {
                max_new_tokens: 200,
                temperature: 0.8
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`Fallback API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data[0] && data[0].generated_text) {
        return data[0].generated_text.trim();
    } else {
        throw new Error('Resposta inválida da API de fallback');
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detectar solicitações genéricas para "explicar mais"
    if (lowerMessage.includes('explique mais') || lowerMessage.includes('mais detalhes') || 
        lowerMessage.includes('mais informações') || lowerMessage.includes('detalhe mais') ||
        lowerMessage.includes('fale mais') || lowerMessage.includes('conte mais')) {
        
        // Verificar se há contexto da última pergunta
        const chatMessages = document.getElementById('chatMessages');
        const messages = chatMessages.querySelectorAll('.message');
        
        if (messages.length >= 2) {
            // Procurar pela última pergunta do usuário
            for (let i = messages.length - 1; i >= 0; i--) {
                const message = messages[i];
                if (message.classList.contains('user-message')) {
                    const userText = message.textContent.toLowerCase();
                    
                    // Fornecer explicação detalhada baseada no contexto
                    if (userText.includes('título de cidadão') || userText.includes('cidadão canoense')) {
                        return `📋 **Título de Cidadão Canoense - Explicação Detalhada:**

**O que é:** O Título de Cidadão Canoense é uma honraria concedida pelo Município de Canoas a pessoas que tenham prestado relevantes serviços à cidade.

**Como é concedido:** 
• Através de Decreto Legislativo aprovado pela Câmara Municipal
• Requer o voto de, no mínimo, 2/3 dos membros da Câmara (Art. 18, XIX)
• É uma forma de reconhecimento público

**Critérios para concessão:**
• Serviços relevantes prestados ao município
• Contribuições significativas para o desenvolvimento da cidade
• Méritos especiais reconhecidos pela comunidade

**Processo:**
1. Proposta apresentada na Câmara Municipal
2. Análise e discussão pelos vereadores
3. Votação com quórum qualificado (2/3)
4. Aprovação por Decreto Legislativo
5. Cerimônia de entrega do título

**Importância:** É uma das formas de reconhecimento público mais importantes do município, demonstrando o agradecimento da cidade pelos serviços prestados.`;
                    }
                    
                    if (userText.includes('vereador') || userText.includes('câmara')) {
                        return `🏛️ **Câmara Municipal e Vereadores - Explicação Detalhada:**

**Composição:** 21 Vereadores eleitos para mandato de 4 anos

**Principais Atribuições:**
• Legislar sobre assuntos de interesse local
• Fiscalizar a administração municipal
• Aprovar o orçamento anual
• Criar, alterar ou extinguir tributos
• Autorizar despesas extraordinárias

**Inviolabilidade:** Os vereadores têm proteção por suas opiniões, palavras e votos no exercício do mandato

**Perda do Mandato pode ocorrer por:**
• Infringir disposições da Lei Orgânica
• Utilizar o mandato para corrupção
• Faltar sem justificativa
• Condenação criminal transitada em julgado

**Sessões:** A Câmara funciona em sessões ordinárias e extraordinárias, conforme regimento interno.`;
                    }
                    
                    if (userText.includes('prefeito') || userText.includes('executivo')) {
                        return `👨‍💼 **Poder Executivo Municipal - Explicação Detalhada:**

**Chefe do Executivo:** Prefeito Municipal
**Auxiliares:** Secretários Municipais

**Mandato:** 4 anos, com possibilidade de uma reeleição

**Posse:** 1º de janeiro do ano subsequente à eleição, com juramento perante a Câmara

**Principais Competências:**
• Executar as leis municipais
• Administrar os serviços públicos
• Elaborar e executar o orçamento
• Nomear e exonerar secretários
• Representar o município

**Veto:** Tem 15 dias úteis para sancionar ou vetar projetos de lei

**Responsabilidades:**
• Prestar contas anualmente
• Manter a ordem pública
• Promover o desenvolvimento municipal
• Coordenar a administração direta e indireta`;
                    }
                }
            }
        }
        
        // Se não encontrou contexto específico, fornecer explicação geral
        return `📚 **Lei Orgânica de Canoas - Explicação Geral:**

A Lei Orgânica é a "Constituição" do município, estabelecendo sua organização política e administrativa. Aqui estão os principais tópicos que posso explicar detalhadamente:

**🏛️ Poder Legislativo (Câmara Municipal):**
• Composição e atribuições dos vereadores
• Processo legislativo
• Fiscalização da administração

**👨‍💼 Poder Executivo:**
• Atribuições do prefeito
• Secretarias municipais
• Administração direta e indireta

**💰 Finanças e Orçamento:**
• Receitas e despesas municipais
• Aplicação mínima em educação (25%)
• Prestação de contas

**👥 Serviços Públicos:**
• Saúde, educação, transporte
• Meio ambiente e urbanismo
• Segurança pública

**📋 Processos Administrativos:**
• Licitações e contratos
• Servidores públicos
• Conselhos municipais

**Qual desses temas você gostaria que eu detalhe mais?**`;
    }
    
    // Respostas específicas para termos técnicos
    if (lowerMessage.includes('vereador') || lowerMessage.includes('câmara')) {
        return `🏛️ **Câmara Municipal de Canoas:**

**Composição:** 21 Vereadores eleitos para mandato de 4 anos

**Principais Atribuições:**
• Legislar sobre assuntos de interesse local
• Fiscalizar a administração municipal
• Aprovar o orçamento anual
• Criar, alterar ou extinguir tributos

**Inviolabilidade:** Os vereadores têm proteção por suas opiniões, palavras e votos no exercício do mandato.

**Perda do Mandato:** Pode ocorrer por infringir disposições da Lei Orgânica, utilizar o mandato para corrupção, ou faltar sem justificativa.`;
    }
    
    if (lowerMessage.includes('prefeito') || lowerMessage.includes('executivo')) {
        return `👨‍💼 **Poder Executivo Municipal:**

**Chefe:** Prefeito Municipal, auxiliado pelos secretários

**Mandato:** 4 anos, com possibilidade de uma reeleição

**Posse:** 1º de janeiro do ano subsequente à eleição

**Principais Competências:**
• Executar as leis municipais
• Administrar os serviços públicos
• Elaborar e executar o orçamento
• Nomear e exonerar secretários

**Veto:** Tem 15 dias úteis para sancionar ou vetar projetos de lei.`;
    }
    
    if (lowerMessage.includes('competência') || lowerMessage.includes('atribuição')) {
        return `📋 **Competências Municipais:**

**Principais Atribuições:**
• Organizar-se administrativamente
• Legislar sobre assuntos de interesse local
• Administrar bens municipais
• Conceder serviços públicos
• Elaborar o Plano Diretor
• Estabelecer normas de edificação
• Organizar transporte coletivo
• Proteger o meio ambiente

**Limitações:** As competências devem respeitar a Constituição Federal e as leis estaduais.`;
    }
    
    if (lowerMessage.includes('orçamento') || lowerMessage.includes('finanças')) {
        return `💰 **Finanças Municipais:**

**Aplicação Mínima em Educação:** 25% da receita resultante de impostos

**Créditos Suplementares:** Não podem exceder 10% da receita orçada

**Prestação de Contas:** O Prefeito deve prestar contas anualmente até 31 de março

**Principais Receitas:**
• Impostos municipais (IPTU, ISSQN)
• Transferências da União e Estado
• Taxas e contribuições

**Controle:** A Câmara Municipal fiscaliza a execução orçamentária.`;
    }
    
    if (lowerMessage.includes('servidor') || lowerMessage.includes('funcionário')) {
        return `👥 **Servidores Públicos Municipais:**

**Estabilidade:** Após 3 anos de efetivo exercício

**Remuneração:** Não pode exceder o subsídio do Prefeito

**Direitos Garantidos:**
• Livre associação sindical
• Direito de greve nos termos da lei
• Progressão funcional
• Capacitação profissional

**Deveres:**
• Dedicação exclusiva ao serviço público
• Observância das normas de ética
• Zelar pelo patrimônio público`;
    }
    
    if (lowerMessage.includes('conselho') || lowerMessage.includes('participação')) {
        return `🤝 **Conselhos Municipais:**

**Composição:** 1/3 de representantes da administração municipal e 2/3 da sociedade civil organizada

**Funções:**
• Auxiliar na orientação e planejamento
• Julgar matérias de sua competência
• Fiscalizar a execução de políticas públicas
• Promover a participação popular

**Principais Conselhos:**
• Conselho Municipal de Saúde
• Conselho Municipal de Educação
• Conselho Municipal de Meio Ambiente
• Conselho Municipal de Assistência Social`;
    }
    
    if (lowerMessage.includes('meio ambiente') || lowerMessage.includes('ambiental')) {
        return `🌱 **Meio Ambiente Municipal:**

**Obrigações do Município:**
• Proteger o meio ambiente
• Combater a poluição
• Preservar florestas, fauna e flora
• Promover o desenvolvimento sustentável

**Vedação:** É vedada a concessão de recursos públicos a atividades que desrespeitem normas de proteção ambiental

**Instrumentos:**
• Plano Diretor
• Zoneamento ambiental
• Licenciamento ambiental
• Educação ambiental`;
    }
    
    if (lowerMessage.includes('educação') || lowerMessage.includes('ensino')) {
        return `📚 **Educação Municipal:**

**Direito Universal:** A educação é direito de todos e dever do Estado

**Aplicação Mínima:** 25% da receita de impostos na manutenção e desenvolvimento do ensino

**Sistema Municipal:**
• Ensino pré-escolar
• Ensino fundamental
• Educação de jovens e adultos
• Educação especial

**Responsabilidades:**
• Garantir acesso universal
• Manter qualidade do ensino
• Capacitar professores
• Modernizar infraestrutura`;
    }
    
    if (lowerMessage.includes('saúde') || lowerMessage.includes('sistema único')) {
        return `🏥 **Sistema Único de Saúde Municipal:**

**Princípios:**
• Acesso universal e igualitário
• Relevância pública das ações
• Execução preferencial através de serviços oficiais

**Atribuições:**
• Atenção básica à saúde
• Vigilância sanitária
• Vigilância epidemiológica
• Assistência farmacêutica

**Participação:** Controle social através dos Conselhos de Saúde

**Financiamento:** Recursos próprios e transferências da União e Estado`;
    }
    
    // Resposta padrão melhorada
    return `🤖 **Assistente IA - Lei Orgânica de Canoas**

Olá! Sou seu assistente especializado na Lei Orgânica de Canoas. Posso ajudar com:

**📋 Tópicos Principais:**
• 🏛️ Vereadores e Câmara Municipal
• 👨‍💼 Prefeito e Poder Executivo  
• 📋 Competências municipais
• 💰 Orçamento e finanças
• 👥 Servidores públicos
• 🤝 Conselhos municipais
• 🌱 Meio ambiente
• 📚 Educação
• 🏥 Saúde

**💡 Como usar:**
• Digite sua pergunta específica
• Use "explique mais" para detalhes adicionais
• Clique nos botões de ações rápidas

**Qual tema você gostaria de saber mais?**`;
}

// Funções de ações rápidas
async function askAboutCurrentQuestion() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    if (currentQuestionIndex < activeQuestions.length) {
        const question = activeQuestions[currentQuestionIndex];
        const message = `Estou na questão ${currentQuestionIndex + 1}: "${question.question}". Pode me explicar mais sobre este tema?`;
        addMessage(message, true);
        
        const loadingMessage = addLoadingMessage();
        
        try {
            const aiResponse = await callMistralAPI(message);
            removeLoadingMessage(loadingMessage);
            addMessage(aiResponse, false);
        } catch (error) {
            console.error('Erro na API:', error);
            removeLoadingMessage(loadingMessage);
            
            const response = `Claro! Esta questão aborda ${getQuestionTopic(question)}. ${question.explanation} Se precisar de mais detalhes sobre algum aspecto específico, é só perguntar!`;
            addMessage(response, false);
        }
    } else {
        addMessage("Não há questão atual selecionada.", true);
        addMessage("Selecione uma questão no quiz para que eu possa ajudar com dúvidas específicas sobre ela.", false);
    }
}

async function askAboutArticle() {
    const articleNumber = prompt("Digite o número do artigo da Lei Orgânica (ex: 12, 59, 242):");
    if (articleNumber) {
        const message = `Pode me explicar o que diz o Art. ${articleNumber} da Lei Orgânica de Canoas?`;
        addMessage(message, true);
        
        const loadingMessage = addLoadingMessage();
        
        try {
            const aiResponse = await callMistralAPI(message);
            removeLoadingMessage(loadingMessage);
            addMessage(aiResponse, false);
        } catch (error) {
            console.error('Erro na API:', error);
            removeLoadingMessage(loadingMessage);
            
            const response = getArticleExplanation(articleNumber);
            addMessage(response, false);
        }
    }
}

async function askAboutConcept() {
    const concept = prompt("Digite o conceito que você quer entender (ex: competência, mandato, veto, orçamento):");
    if (concept) {
        const message = `Pode me explicar o conceito de "${concept}" na Lei Orgânica de Canoas?`;
        addMessage(message, true);
        
        const loadingMessage = addLoadingMessage();
        
        try {
            const aiResponse = await callMistralAPI(message);
            removeLoadingMessage(loadingMessage);
            addMessage(aiResponse, false);
        } catch (error) {
            console.error('Erro na API:', error);
            removeLoadingMessage(loadingMessage);
            
            const response = getConceptExplanation(concept);
            addMessage(response, false);
        }
    }
}

function getQuestionTopic(question) {
    const lowerQuestion = question.question.toLowerCase();
    
    if (lowerQuestion.includes('vereador') || lowerQuestion.includes('câmara')) {
        return 'a composição e funcionamento da Câmara Municipal';
    }
    if (lowerQuestion.includes('prefeito') || lowerQuestion.includes('executivo')) {
        return 'o Poder Executivo Municipal';
    }
    if (lowerQuestion.includes('competência')) {
        return 'as competências exclusivas da Câmara Municipal';
    }
    if (lowerQuestion.includes('mandato')) {
        return 'a perda de mandato dos Vereadores';
    }
    if (lowerQuestion.includes('veto') || lowerQuestion.includes('sanção')) {
        return 'o processo de sanção e veto de projetos de lei';
    }
    if (lowerQuestion.includes('mesa')) {
        return 'a composição da Mesa da Câmara Municipal';
    }
    if (lowerQuestion.includes('educação') || lowerQuestion.includes('percentual')) {
        return 'a aplicação de recursos em educação';
    }
    if (lowerQuestion.includes('conselho')) {
        return 'a composição dos Conselhos Municipais';
    }
    if (lowerQuestion.includes('2/3') || lowerQuestion.includes('aprovação')) {
        return 'os casos que exigem aprovação de 2/3 dos membros da Câmara';
    }
    if (lowerQuestion.includes('comissão representativa')) {
        return 'as competências da Comissão Representativa';
    }
    if (lowerQuestion.includes('crédito') || lowerQuestion.includes('suplementar')) {
        return 'os limites para abertura de créditos suplementares';
    }
    
    return 'este tema da Lei Orgânica';
}

function getArticleExplanation(articleNumber) {
    const explanations = {
        '12': 'O Art. 12 estabelece que a Câmara Municipal é composta de 21 Vereadores, representantes do povo, eleitos no Município em pleito direto pelo sistema proporcional para mandato de 4 anos.',
        '59': 'O Art. 59 define que o Poder Executivo é exercido pelo Prefeito, auxiliado pelos secretários do Município e responsáveis pelos órgãos da administração direta e indireta.',
        '242': 'O Art. 242 determina que o Município deve aplicar, no mínimo, 25% da receita resultante de impostos na manutenção e desenvolvimento do ensino.',
        '18': 'O Art. 18 lista as competências exclusivas da Câmara Municipal, incluindo elaborar seu Regimento Interno, emendar a Lei Orgânica, fiscalizar a administração financeira, entre outras.',
        '23': 'O Art. 23 estabelece os casos em que o Vereador pode perder o mandato, como infringir disposições da Lei Orgânica, utilizar o mandato para corrupção, ou faltar sem justificativa.',
        '54': 'O Art. 54 trata do processo de sanção e veto de projetos de lei, estabelecendo prazos e procedimentos para o Prefeito se manifestar sobre projetos aprovados pela Câmara.',
        '29': 'O Art. 29 define a composição da Mesa da Câmara, que é eleita a cada dois anos e composta de 5 Vereadores: Presidente, 1º e 2º Vice-Presidentes, 1º e 2º Secretários.',
        '86': 'O Art. 86 estabelece que os Conselhos Municipais são compostos de 1/3 de representantes da administração municipal e 2/3 da sociedade civil organizada.',
        '39': 'O Art. 39 define os casos que exigem aprovação de 2/3 dos membros da Câmara, como alteração da Lei Orgânica, concessão de serviços públicos, alienação de bens imóveis, entre outros.',
        '34': 'O Art. 34 define as atribuições da Comissão Representativa durante o recesso da Câmara, incluindo zelar pelas prerrogativas do Poder Legislativo e autorizar ausências do Prefeito.',
        '134': 'O Art. 134 estabelece que a abertura de créditos suplementares não pode exceder 10% da receita orçada.'
    };
    
    return explanations[articleNumber] || `O Art. ${articleNumber} da Lei Orgânica de Canoas trata de aspectos específicos da organização municipal. Para uma explicação detalhada, recomendo consultar o texto completo da Lei Orgânica.`;
}

function getConceptExplanation(concept) {
    const lowerConcept = concept.toLowerCase();
    
    if (lowerConcept.includes('competência')) {
        return 'Competência é a atribuição ou poder conferido a um órgão ou entidade para exercer determinadas funções. Na Lei Orgânica, as competências são divididas entre exclusivas da Câmara, privativas do Prefeito, e comuns entre os Poderes.';
    }
    if (lowerConcept.includes('mandato')) {
        return 'Mandato é o período durante o qual o representante eleito exerce suas funções. Vereadores, Prefeito e Vice-Prefeito têm mandato de 4 anos. O mandato pode ser perdido por infrações previstas na Lei Orgânica.';
    }
    if (lowerConcept.includes('veto')) {
        return 'Veto é o poder do Prefeito de rejeitar total ou parcialmente um projeto de lei aprovado pela Câmara. O veto deve ser fundamentado e pode ser derrubado pela Câmara com 2/3 dos votos.';
    }
    if (lowerConcept.includes('orçamento')) {
        return 'Orçamento é o instrumento de planejamento que prevê receitas e autoriza despesas. O Município elabora Plano Plurianual, Lei de Diretrizes Orçamentárias e Lei Orçamentária Anual.';
    }
    if (lowerConcept.includes('sanção')) {
        return 'Sanção é a aprovação do Prefeito a um projeto de lei aprovado pela Câmara. Pode ser expressa (assinatura) ou tácita (decorrido o prazo sem manifestação).';
    }
    if (lowerConcept.includes('fiscalização')) {
        return 'Fiscalização é o controle exercido pela Câmara sobre os atos do Executivo, incluindo a fiscalização financeira e orçamentária com auxílio do Tribunal de Contas.';
    }
    
    return `O conceito "${concept}" na Lei Orgânica de Canoas se relaciona com aspectos da organização municipal. Para uma explicação mais específica, você pode perguntar sobre artigos relacionados ou usar as ações rápidas disponíveis.`;
}

// Funções para novas funcionalidades

// Função para alternar modo de revisão
function toggleReviewMode() {
    isReviewMode = !isReviewMode;
    const reviewBtn = document.getElementById('reviewBtn');
    if (reviewBtn) {
        reviewBtn.textContent = isReviewMode ? '📝 Modo Normal' : '🔍 Modo Revisão';
        reviewBtn.className = isReviewMode ? 'action-btn review-active' : 'action-btn';
    }
    
    if (isReviewMode) {
        // Mostrar apenas perguntas respondidas
        showAnsweredQuestions();
    } else {
        // Voltar ao modo normal
        showQuestion();
    }
}

// Função para mostrar apenas perguntas respondidas
function showAnsweredQuestions() {
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    const answeredQuestions = [];
    for (let i = 0; i < activeQuestions.length; i++) {
        if (users[currentUser].answers[i] !== undefined) {
            answeredQuestions.push(i);
        }
    }
    
    if (answeredQuestions.length === 0) {
        alert('Nenhuma pergunta respondida ainda!');
        isReviewMode = false;
        return;
    }
    
    // Mostrar primeira pergunta respondida
    currentQuestionIndex = answeredQuestions[0];
    showQuestion();
}

// Função para alternar timer
function toggleTimer() {
    showTimer = !showTimer;
    const timerBtn = document.getElementById('timerBtn');
    const timerContainer = document.getElementById('timerContainer');
    
    if (timerBtn) {
        timerBtn.textContent = showTimer ? '⏰ Timer: ON' : '⏰ Timer: OFF';
        timerBtn.className = showTimer ? 'action-btn timer-active' : 'action-btn';
    }
    
    if (timerContainer) {
        timerContainer.style.display = showTimer ? 'block' : 'none';
    }
    
    if (showTimer && currentUser) {
        startTimer();
    } else {
        stopTimer();
    }
}

// Função para iniciar timer
function startTimer() {
    if (!users[currentUser].startTime) {
        users[currentUser].startTime = Date.now();
    }
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (currentUser && users[currentUser].startTime) {
            const elapsed = Math.floor((Date.now() - users[currentUser].startTime) / 1000);
            users[currentUser].timeSpent = elapsed;
            
            const timerDisplay = document.getElementById('timerDisplay');
            if (timerDisplay) {
                const hours = Math.floor(elapsed / 3600);
                const minutes = Math.floor((elapsed % 3600) / 60);
                const seconds = elapsed % 60;
                timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }, 1000);
}

// Função para parar timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Função para exportar resultados
function exportResults() {
    if (!currentUser) {
        alert('Selecione um usuário primeiro!');
        return;
    }
    
    if (!activeQuestions) {
        activeQuestions = questions; // Fallback para o conjunto padrão
    }
    
    const user = users[currentUser];
    const totalQuestions = activeQuestions.length;
    const accuracy = totalQuestions > 0 ? ((user.correct / totalQuestions) * 100).toFixed(1) : 0;
    
    const timeSpent = user.timeSpent;
    const hours = Math.floor(timeSpent / 3600);
    const minutes = Math.floor((timeSpent % 3600) / 60);
    const seconds = timeSpent % 60;
    const timeString = `${hours}h ${minutes}m ${seconds}s`;
    
    const stats = user.statsByDifficulty;
    
    const report = `
🏛️ RELATÓRIO DE PROGRESSO - LEI ORGÂNICA DE CANOAS
👤 Usuário: ${currentUser}
📅 Data: ${new Date().toLocaleDateString('pt-BR')}
⏰ Tempo total: ${timeString}

📊 ESTATÍSTICAS GERAIS:
• Total de perguntas: ${totalQuestions}
• Respondidas: ${user.answered}
• Acertos: ${user.correct}
• Erros: ${user.wrong}
• Taxa de acerto: ${accuracy}%
• 🎯 Pontos: ${user.points || 0}/30 (${pointsPercentage}%)

📈 ESTATÍSTICAS POR DIFICULDADE:

FÁCIL:
• Respondidas: ${stats.facil.answered}/5
• Acertos: ${stats.facil.correct}
• Pontos: ${stats.facil.points || 0}/10
• Taxa: ${stats.facil.answered > 0 ? ((stats.facil.correct / stats.facil.answered) * 100).toFixed(1) : 0}%

MÉDIO:
• Respondidas: ${stats.medio.answered}/5
• Acertos: ${stats.medio.correct}
• Pontos: ${stats.medio.points || 0}/10
• Taxa: ${stats.medio.answered > 0 ? ((stats.medio.correct / stats.medio.answered) * 100).toFixed(1) : 0}%

DIFÍCIL:
• Respondidas: ${stats.dificil.answered}/5
• Acertos: ${stats.dificil.correct}
• Pontos: ${stats.dificil.points || 0}/10
• Taxa: ${stats.dificil.answered > 0 ? ((stats.dificil.correct / stats.dificil.answered) * 100).toFixed(1) : 0}%

📝 RESPOSTAS DETALHADAS:
${Object.keys(user.answers).map(qIndex => {
    const q = activeQuestions[qIndex];
    const userAnswer = user.answers[qIndex];
    const isCorrect = userAnswer === q.correct;
    const points = isCorrect ? '2 pontos' : '0 pontos';
    return `Questão ${parseInt(qIndex) + 1} (${q.difficulty.toUpperCase()}): ${isCorrect ? '✅' : '❌'} ${points} - ${q.question}`;
}).join('\n')}

🎯 PRÓXIMOS PASSOS:
• Continue estudando as áreas com menor taxa de acerto
• Revise as questões erradas
• Pratique mais as questões difíceis
• Mantenha o foco nos artigos da Lei Orgânica
• Busque atingir 30 pontos (100% de acerto)

Boa sorte no seu concurso! 🚀
    `;
    
    // Criar arquivo para download
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${currentUser}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Relatório exportado com sucesso!');
}

// Função para mostrar estatísticas detalhadas
function showDetailedStats() {
    if (!currentUser) {
        alert('Selecione um usuário primeiro!');
        return;
    }
    
    const user = users[currentUser];
    const stats = user.statsByDifficulty;
    
    const statsHtml = `
        <div class="detailed-stats">
            <h3>📊 Estatísticas Detalhadas - ${currentUser}</h3>
            
            <div class="stats-grid">
                <div class="stats-card facil">
                    <h4>🟢 FÁCIL</h4>
                    <p>Respondidas: ${stats.facil.answered}/5</p>
                    <p>Acertos: ${stats.facil.correct}</p>
                    <p>Pontos: ${stats.facil.points || 0}/10</p>
                    <p>Taxa: ${stats.facil.answered > 0 ? ((stats.facil.correct / stats.facil.answered) * 100).toFixed(1) : 0}%</p>
                </div>
                
                <div class="stats-card medio">
                    <h4>🟡 MÉDIO</h4>
                    <p>Respondidas: ${stats.medio.answered}/5</p>
                    <p>Acertos: ${stats.medio.correct}</p>
                    <p>Pontos: ${stats.medio.points || 0}/10</p>
                    <p>Taxa: ${stats.medio.answered > 0 ? ((stats.medio.correct / stats.medio.answered) * 100).toFixed(1) : 0}%</p>
                </div>
                
                <div class="stats-card dificil">
                    <h4>🔴 DIFÍCIL</h4>
                    <p>Respondidas: ${stats.dificil.answered}/5</p>
                    <p>Acertos: ${stats.dificil.correct}</p>
                    <p>Pontos: ${stats.dificil.points || 0}/10</p>
                    <p>Taxa: ${stats.dificil.answered > 0 ? ((stats.dificil.correct / stats.dificil.answered) * 100).toFixed(1) : 0}%</p>
                </div>
            </div>
            
            <div class="time-info">
                <p>⏰ Tempo total: ${formatTime(user.timeSpent)}</p>
                <p>🎯 Pontos totais: ${user.points || 0}/30</p>
            </div>
            
            <button onclick="closeDetailedStats()" class="close-btn">Fechar</button>
        </div>
    `;
    
    const statsModal = document.createElement('div');
    statsModal.className = 'stats-modal';
    statsModal.innerHTML = statsHtml;
    document.body.appendChild(statsModal);
}

// Função para fechar estatísticas detalhadas
function closeDetailedStats() {
    const modal = document.querySelector('.stats-modal');
    if (modal) {
        modal.remove();
    }
}

// Função para formatar tempo
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Função para reiniciar progresso
function resetProgress() {
    if (!currentUser) {
        alert('Selecione um usuário primeiro!');
        return;
    }
    
    if (confirm(`Tem certeza que deseja fazer um RESET TOTAL? Isso irá:\n\n• Zerar todo o progresso de AMBOS os usuários\n• Trocar para um conjunto COMPLETAMENTE NOVO de perguntas\n• Apagar todas as respostas e estatísticas\n\nEsta ação não pode ser desfeita!`)) {
        
        // Alternar entre conjuntos de perguntas (A, B, C, D, E)
        const questionSets = ['A', 'B', 'C', 'D', 'E'];
        const currentIndex = questionSets.indexOf(currentQuestionSet);
        const nextIndex = (currentIndex + 1) % questionSets.length;
        currentQuestionSet = questionSets[nextIndex];
        
        // Definir conjunto ativo
        switch(currentQuestionSet) {
            case 'A':
                activeQuestions = questions;
                break;
            case 'B':
                activeQuestions = questionsSetB;
                break;
            case 'C':
                activeQuestions = questionsSetC;
                break;
            case 'D':
                activeQuestions = questionsSetD;
                break;
            case 'E':
                activeQuestions = questionsSetE;
                break;
            default:
                activeQuestions = questions;
                currentQuestionSet = 'A';
        }
        
        // Resetar AMBOS os usuários
        users.Lucas = {
            answered: 0,
            correct: 0,
            wrong: 0,
            points: 0,
            answers: {},
            statsByDifficulty: {
                facil: { answered: 0, correct: 0, wrong: 0, points: 0 },
                medio: { answered: 0, correct: 0, wrong: 0, points: 0 },
                dificil: { answered: 0, correct: 0, wrong: 0, points: 0 }
            },
            timeSpent: 0,
            startTime: null
        };
        
        users.Tony = {
            answered: 0,
            correct: 0,
            wrong: 0,
            points: 0,
            answers: {},
            statsByDifficulty: {
                facil: { answered: 0, correct: 0, wrong: 0, points: 0 },
                medio: { answered: 0, correct: 0, wrong: 0, points: 0 },
                dificil: { answered: 0, correct: 0, wrong: 0, points: 0 }
            },
            timeSpent: 0,
            startTime: null
        };
        
        // Salvar dados de ambos os usuários
        localStorage.setItem('quiz_Lucas', JSON.stringify(users.Lucas));
        localStorage.setItem('quiz_Tony', JSON.stringify(users.Tony));
        
        // Salvar qual conjunto está ativo
        localStorage.setItem('currentQuestionSet', currentQuestionSet);
        
        // Voltar para seleção de usuário
        document.getElementById('userSelection').style.display = 'block';
        document.getElementById('quizArea').style.display = 'none';
        currentUser = null;
        currentQuestionIndex = 0;
        
        // Parar timer se estiver ativo
        stopTimer();
        
        alert(`RESET TOTAL CONCLUÍDO!\n\n✅ Progresso de ambos os usuários zerado\n✅ Conjunto de perguntas alterado para: CONJUNTO ${currentQuestionSet}\n✅ 15 perguntas completamente novas\n\nAgora selecione um usuário para começar com as novas perguntas!`);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar activeQuestions com o conjunto padrão
    if (!activeQuestions) {
        activeQuestions = questions;
    }
    
    // Carregar qual conjunto de perguntas está ativo
    const savedQuestionSet = localStorage.getItem('currentQuestionSet');
    if (savedQuestionSet) {
        currentQuestionSet = savedQuestionSet;
        switch(currentQuestionSet) {
            case 'A':
                activeQuestions = questions;
                break;
            case 'B':
                activeQuestions = questionsSetB;
                break;
            case 'C':
                activeQuestions = questionsSetC;
                break;
            case 'D':
                activeQuestions = questionsSetD;
                break;
            case 'E':
                activeQuestions = questionsSetE;
                break;
            default:
                activeQuestions = questions;
                currentQuestionSet = 'A';
        }
    }
    
    // Carregar dados salvos dos usuários
    Object.keys(users).forEach(userName => {
        const savedData = localStorage.getItem(`quiz_${userName}`);
        if (savedData) {
            const userData = JSON.parse(savedData);
            // Garantir compatibilidade com dados antigos
            users[userName] = {
                answered: userData.answered || 0,
                correct: userData.correct || 0,
                wrong: userData.wrong || 0,
                points: userData.points || 0,
                answers: userData.answers || {},
                statsByDifficulty: userData.statsByDifficulty || {
                    facil: { answered: 0, correct: 0, wrong: 0, points: 0 },
                    medio: { answered: 0, correct: 0, wrong: 0, points: 0 },
                    dificil: { answered: 0, correct: 0, wrong: 0, points: 0 }
                },
                timeSpent: userData.timeSpent || 0,
                startTime: userData.startTime || null
            };
        }
    });
}); 