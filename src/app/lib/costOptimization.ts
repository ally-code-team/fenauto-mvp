// Configurações otimizadas para reduzir custos de IA

export const COST_OPTIMIZATION_CONFIG = {
  // Configurações de áudio para economizar
  audio: {
    // Usar formato de áudio mais eficiente
    inputFormat: 'pcm16', // 16kHz em vez de 48kHz quando possível
    outputFormat: 'pcm16',
    // Configurações de VAD (Voice Activity Detection) mais agressivas
    vad: {
      threshold: 0.7, // Mais restritivo (padrão é 0.5)
      prefix_padding_ms: 200, // Menos padding (padrão é 300ms)
      silence_duration_ms: 800, // Mais tempo de silêncio antes de parar (padrão é 500ms)
    }
  },
  
  // Configurações de sessão
  session: {
    // Limitar tokens de resposta para respostas mais concisas
    max_response_output_tokens: 150, // Limitado para respostas mais curtas
    temperature: 0.7, // Respostas mais determinísticas e focadas
  },
  
  // Configurações de transcrição
  transcription: {
    // Usar modelo mais barato para transcrição quando disponível
    model: 'whisper-1', // Mais barato que gpt-4o-mini-transcribe
  }
};

export const COST_REDUCTION_INSTRUCTIONS = `
Para reduzir custos de operação:
- Seja conciso e direto nas respostas
- Evite respostas muito longas desnecessariamente
- Use linguagem simples e clara
- Não repita informações já fornecidas
- Finalize conversas quando apropriado
- Evite gerar áudio desnecessário durante pausas
`;

// Função para calcular economia estimada
export const calculateSavings = (standardCost: number, optimizedCost: number) => {
  const savings = standardCost - optimizedCost;
  const percentage = (savings / standardCost) * 100;
  return {
    absoluteSavings: savings,
    percentageSavings: percentage,
    optimizedCost
  };
};

// Configurações específicas por cenário para otimizar custos
export const SCENARIO_COST_CONFIGS = {
  grupoABL: {
    maxTokens: 120, // Respostas técnicas mais diretas
    temperature: 0.6,
    instructions: COST_REDUCTION_INSTRUCTIONS + `
    - Foque em informações técnicas específicas
    - Direcione rapidamente para contato comercial quando apropriado
    - Evite explicações muito detalhadas de produtos complexos
    `
  },
  uniSantaCruz: {
    maxTokens: 150, // Respostas educacionais podem ser um pouco mais longas
    temperature: 0.7,
    instructions: COST_REDUCTION_INSTRUCTIONS + `
    - Seja informativo mas conciso sobre cursos
    - Direcione para informações específicas rapidamente
    - Use linguagem acessível para estudantes
    `
  }
};
