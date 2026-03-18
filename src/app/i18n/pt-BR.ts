export const ptBR = {
  // Header
  title: "Assistente Virtual",
  scenario: "Cenário",
  agent: "Agente",

  // Bottom Toolbar
  connect: "Conectar",
  disconnect: "Desconectar",
  connecting: "Conectando...",
  pushToTalk: "Pressionar para falar",
  talk: "Falar",
  audioPlayback: "Reprodução de áudio",
  logs: "Logs",
  codec: "Codec:",

  // Transcript
  transcript: "Transcrição",
  copy: "Copiar",
  copied: "Copiado!",
  downloadAudio: "Baixar Áudio",
  typeMessage: "Digite uma mensagem...",

  // Events
  events: "Eventos",
  clientEvent: "Evento do Cliente",
  serverEvent: "Evento do Servidor",

  // Costs
  costs: "Custos",
  totalCost: "Custo Total",
  inputTokens: "Tokens de Entrada",
  outputTokens: "Tokens de Saída",
  audioInputMinutes: "Minutos de Áudio de Entrada",
  audioOutputMinutes: "Minutos de Áudio de Saída",
  resetCosts: "Resetar Custos",
  
  // Status
  status: "Status",
  connected: "Conectado",
  disconnected: "Desconectado",
  
  // Errors
  connectionError: "Erro de conexão",
  
  // Agent configs - scenario names
  grupoABL: "Atendimento Grupo ABL (Voz Masculina)",
  uniSantaCruz: "Atendimento UniSantaCruz (Voz Feminina)",
  paranaPrevidencia: "Atendimento PARANAPREVIDÊNCIA (Voz Feminina)",
  kabum: "Suporte KaBuM! Marketplace (Voz Feminina)",
  sap: "Consultoria SAP ERP (Voz Masculina)",
  chevrolet: "Assistente Chevrolet - Peças e Serviços (Voz Feminina)",
  bellinatiperez: "Bellinati Perez - Recuperação de Crédito (Voz Feminina)",
  
  // Messages
  greeting: "Olá! Como posso ajudá-lo hoje?",
  thinking: "Deixe-me pensar sobre isso...",
  transferring: "Transferindo para outro agente...",
  
  // Function call translations
  functionCall: "Chamada de Função",
  functionResult: "Resultado da Função",
  executingFunction: "Executando função",
  functionCompleted: "Função executada com sucesso",
  error: "Erro",
  success: "Sucesso",
  
  // Common words
  loading: "Carregando...",
  processing: "Processando...",
  completed: "Concluído",
  failed: "Falhou",
};

export type TranslationKey = keyof typeof ptBR;

// Função para obter nome traduzido do cenário
export const getScenarioName = (key: string): string => {
  const scenarioNames: Record<string, string> = {
    grupoABL: ptBR.grupoABL,
    uniSantaCruz: ptBR.uniSantaCruz,
    paranaPrevidencia: ptBR.paranaPrevidencia,
    kabum: ptBR.kabum,
    sap: ptBR.sap,
    chevrolet: ptBR.chevrolet,
    bellinatiperez: ptBR.bellinatiperez,
  };
  return scenarioNames[key] || key;
};
