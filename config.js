// Configuração da API da IA
// Para obter uma chave gratuita do Hugging Face:
// 1. Acesse: https://huggingface.co/
// 2. Crie uma conta gratuita
// 3. Vá em Settings > Access Tokens
// 4. Crie um novo token
// 5. Substitua 'hf_xxx' pela sua chave

const AI_CONFIG = {
    // Modelo principal: Mistral 7B (melhor para português e leis)
    apiUrl: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    
    // Modelo secundário: Gemma 7B (Google, excelente em português)
    secondaryApiUrl: 'https://api-inference.huggingface.co/models/google/gemma-7b-it',
    
    // Modelo de fallback (também gratuito)
    fallbackApiUrl: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    
    // SUA CHAVE AQUI - Substitua pela sua chave gratuita do Hugging Face
    apiKey: 'hf_xxx',
    
    // Configurações de resposta
    parameters: {
        max_new_tokens: 400,    // Máximo de tokens na resposta
        temperature: 0.6,       // Criatividade (0.0 = muito conservador, 1.0 = muito criativo)
        top_p: 0.9,            // Diversidade da resposta
        do_sample: true,        // Usar amostragem
        return_full_text: false // Retornar apenas a resposta, não o prompt completo
    },
    
    // Configurações específicas para Mistral
    mistralParameters: {
        max_new_tokens: 400,
        temperature: 0.5,       // Mais conservador para leis
        top_p: 0.9,
        do_sample: true,
        return_full_text: false
    }
};

// Contexto específico sobre a Lei Orgânica de Canoas
const LEI_ORGANICA_CONTEXT = `
Você é um assistente especializado na Lei Orgânica Municipal de Canoas, Rio Grande do Sul, Brasil.
Sua função é ajudar estudantes e candidatos a concursos públicos a entenderem a legislação municipal.

INSTRUÇÕES IMPORTANTES:
1. Baseie suas respostas SEMPRE no conteúdo da Lei Orgânica de Canoas
2. Seja preciso e fundamentado nos artigos da lei
3. Use linguagem clara e acessível
4. Quando possível, cite os artigos específicos
5. Foque em aspectos práticos e relevantes para concursos

PRINCIPAIS PONTOS DA LEI ORGÂNICA DE CANOAS:

PODER LEGISLATIVO:
- Câmara Municipal: 21 Vereadores, mandato de 4 anos
- Inviolabilidade dos Vereadores por opiniões, palavras e votos
- Mesa: Presidente, 1º e 2º Vice-Presidentes, 1º e 2º Secretários
- Competências exclusivas: elaborar Regimento Interno, emendar Lei Orgânica, fiscalizar administração

PODER EXECUTIVO:
- Prefeito e Vice-Prefeito: mandato de 4 anos, posse em 1º de janeiro
- Prazo para sanção/veto: 15 dias úteis
- Veto pode ser derrubado pela Câmara com 2/3 dos votos

COMPETÊNCIAS MUNICIPAIS:
- Organizar-se administrativamente
- Legislar sobre assuntos de interesse local
- Administrar bens municipais
- Conceder serviços públicos
- Elaborar Plano Diretor
- Organizar transporte coletivo

ORÇAMENTO E FINANÇAS:
- Mínimo 25% da receita de impostos para educação
- Créditos suplementares: máximo 10% da receita orçada
- Prestação de contas: até 31 de março

SERVIDORES PÚBLICOS:
- Estabilidade após 3 anos de efetivo exercício
- Remuneração não pode exceder subsídio do Prefeito
- Direito à livre associação sindical

CONSELHOS MUNICIPAIS:
- Composição: 1/3 administração municipal, 2/3 sociedade civil
- Função: auxiliar na orientação, planejamento e julgamento

PROCESSO LEGISLATIVO:
- Aprovação de 2/3 necessária para: alteração da Lei Orgânica, concessão de serviços públicos, alienação de bens imóveis
- Comissão Representativa funciona durante recesso da Câmara

MEIO AMBIENTE:
- Proteção ambiental obrigatória
- Vedada concessão de recursos a atividades poluidoras

EDUCAÇÃO:
- Sistema municipal: pré-escolar e fundamental
- Acesso universal e gratuito
- Gestão democrática

SAÚDE:
- Sistema Único de Saúde Municipal
- Acesso universal e igualitário
- Ações de relevância pública

Sempre responda de forma educativa e fundamentada na Lei Orgânica de Canoas.
`;

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AI_CONFIG, LEI_ORGANICA_CONTEXT };
} 