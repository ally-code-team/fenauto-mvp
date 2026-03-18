// Preços da OpenAI para os modelos utilizados (em USD)
export const OPENAI_PRICING = {
  'gpt-4o-mini-realtime-preview-2025-06-03': {
    inputText: 0.00015,  // por 1K tokens - mesmo preço do mini
    outputText: 0.0006,  // por 1K tokens - mesmo preço do mini
    inputAudio: 0.05,    // por minuto - estimativa mais baixa
    outputAudio: 0.10,   // por minuto - estimativa mais baixa
  },
  'gpt-4o-realtime-preview-2025-06-03': {
    inputText: 0.005,    // por 1K tokens
    outputText: 0.02,    // por 1K tokens
    inputAudio: 0.10,    // por minuto
    outputAudio: 0.20,   // por minuto
  },
  'gpt-4o-mini': {
    inputText: 0.00015,  // por 1K tokens
    outputText: 0.0006,  // por 1K tokens
  },
  'gpt-4o-mini-transcribe': {
    inputAudio: 0.01,    // por minuto
  },
} as const;

export interface CostData {
  totalCost: number;
  currentSessionCost: number; // Novo: custo da sessão atual
  inputTokens: number;
  outputTokens: number;
  audioInputMinutes: number;
  audioOutputMinutes: number;
  sessions: number;
  // Dados da sessão atual
  currentSession: {
    inputTokens: number;
    outputTokens: number;
    audioInputMinutes: number;
    audioOutputMinutes: number;
    startTime: number;
    isActive: boolean;
  };
  breakdown: {
    textCost: number;
    audioCost: number;
    sessionCost: number;
  };
  currentSessionBreakdown: {
    textCost: number;
    audioCost: number;
  };
}

export class CostTracker {
  private static instance: CostTracker;
  private costData: CostData;
  private listeners: Array<(costs: CostData) => void> = [];

  private constructor() {
    this.costData = this.loadCostsFromStorage();
  }

  static getInstance(): CostTracker {
    if (!CostTracker.instance) {
      CostTracker.instance = new CostTracker();
    }
    return CostTracker.instance;
  }

  private loadCostsFromStorage(): CostData {
    if (typeof window === 'undefined') {
      return this.getInitialCostData();
    }

    const saved = localStorage.getItem('realtimeAgentsCosts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Garantir compatibilidade com dados antigos
        if (!parsed.currentSession) {
          parsed.currentSession = {
            inputTokens: 0,
            outputTokens: 0,
            audioInputMinutes: 0,
            audioOutputMinutes: 0,
            startTime: Date.now(),
            isActive: false,
          };
        }
        if (!parsed.currentSessionCost) {
          parsed.currentSessionCost = 0;
        }
        if (!parsed.currentSessionBreakdown) {
          parsed.currentSessionBreakdown = {
            textCost: 0,
            audioCost: 0,
          };
        }
        return parsed;
      } catch (e) {
        console.error('Erro ao carregar custos salvos:', e);
      }
    }
    return this.getInitialCostData();
  }

  private getInitialCostData(): CostData {
    return {
      totalCost: 0,
      currentSessionCost: 0,
      inputTokens: 0,
      outputTokens: 0,
      audioInputMinutes: 0,
      audioOutputMinutes: 0,
      sessions: 0,
      currentSession: {
        inputTokens: 0,
        outputTokens: 0,
        audioInputMinutes: 0,
        audioOutputMinutes: 0,
        startTime: Date.now(),
        isActive: false,
      },
      breakdown: {
        textCost: 0,
        audioCost: 0,
        sessionCost: 0,
      },
      currentSessionBreakdown: {
        textCost: 0,
        audioCost: 0,
      },
    };
  }

  private saveCostsToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('realtimeAgentsCosts', JSON.stringify(this.costData));
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.costData));
  }

  private calculateCosts(): void {
    const pricing = OPENAI_PRICING['gpt-4o-realtime-preview-2025-06-03'];
    
    // Calcular custos de texto
    const textCost = (this.costData.inputTokens / 1000) * pricing.inputText + 
                     (this.costData.outputTokens / 1000) * pricing.outputText;
    
    // Calcular custos de áudio
    const audioCost = this.costData.audioInputMinutes * pricing.inputAudio + 
                      this.costData.audioOutputMinutes * pricing.outputAudio;
    
    // Custo por sessão (estimativa)
    const sessionCost = this.costData.sessions * 0.01; // $0.01 por sessão

    this.costData.breakdown = {
      textCost,
      audioCost,
      sessionCost,
    };

    this.costData.totalCost = textCost + audioCost + sessionCost;
  }

  private calculateCurrentSessionCosts(): void {
    const pricing = OPENAI_PRICING['gpt-4o-realtime-preview-2025-06-03'];
    
    // Calcular custos de texto da sessão atual
    const textCost = (this.costData.currentSession.inputTokens / 1000) * pricing.inputText + 
                     (this.costData.currentSession.outputTokens / 1000) * pricing.outputText;
    
    // Calcular custos de áudio da sessão atual
    const audioCost = this.costData.currentSession.audioInputMinutes * pricing.inputAudio + 
                      this.costData.currentSession.audioOutputMinutes * pricing.outputAudio;

    this.costData.currentSessionBreakdown = {
      textCost,
      audioCost,
    };

    this.costData.currentSessionCost = textCost + audioCost;
  }

  addSession(): void {
    this.costData.sessions += 1;
    this.calculateCosts();
    this.saveCostsToStorage();
    this.notifyListeners();
  }

  startSession() {
    this.costData.currentSession = {
      inputTokens: 0,
      outputTokens: 0,
      audioInputMinutes: 0,
      audioOutputMinutes: 0,
      startTime: Date.now(),
      isActive: true,
    };
    this.costData.currentSessionCost = 0;
    this.costData.currentSessionBreakdown = {
      textCost: 0,
      audioCost: 0,
    };
    this.saveCostsToStorage();
    this.notifyListeners();
  }

  endSession() {
    if (this.costData.currentSession.isActive) {
      this.costData.sessions += 1;
      this.costData.currentSession.isActive = false;
      this.saveCostsToStorage();
      this.notifyListeners();
    }
  }

  resetSession() {
    this.costData.currentSession = {
      inputTokens: 0,
      outputTokens: 0,
      audioInputMinutes: 0,
      audioOutputMinutes: 0,
      startTime: Date.now(),
      isActive: false,
    };
    this.costData.currentSessionCost = 0;
    this.costData.currentSessionBreakdown = {
      textCost: 0,
      audioCost: 0,
    };
    this.saveCostsToStorage();
    this.notifyListeners();
  }

  updateTokenUsage(inputTokens: number, outputTokens: number) {
    // Atualizar totais
    this.costData.inputTokens += inputTokens;
    this.costData.outputTokens += outputTokens;
    
    // Atualizar sessão atual se estiver ativa
    if (this.costData.currentSession.isActive) {
      this.costData.currentSession.inputTokens += inputTokens;
      this.costData.currentSession.outputTokens += outputTokens;
      this.calculateCurrentSessionCosts();
    }
    
    this.calculateCosts();
    this.saveCostsToStorage();
    this.notifyListeners();
  }

  addAudioUsage(inputMinutes: number, outputMinutes: number): void {
    // Atualizar totais
    this.costData.audioInputMinutes += inputMinutes;
    this.costData.audioOutputMinutes += outputMinutes;
    
    // Atualizar sessão atual se estiver ativa
    if (this.costData.currentSession.isActive) {
      this.costData.currentSession.audioInputMinutes += inputMinutes;
      this.costData.currentSession.audioOutputMinutes += outputMinutes;
      this.calculateCurrentSessionCosts();
    }
    
    this.calculateCosts();
    this.saveCostsToStorage();
    this.notifyListeners();
  }

  getCosts(): CostData {
    return { ...this.costData };
  }

  resetCosts(): void {
    this.costData = this.getInitialCostData();
    this.saveCostsToStorage();
    this.notifyListeners();
  }

  subscribe(listener: (costs: CostData) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Método para estimar custos baseado em eventos do WebRTC
  estimateFromEvent(event: any): void {
    switch (event.type) {
      case 'response.audio_transcript.done':
        // Estimar tokens baseado no comprimento do texto
        if (event.transcript) {
          const estimatedTokens = Math.ceil(event.transcript.length / 4); // Estimativa: 4 chars = 1 token
          this.updateTokenUsage(0, estimatedTokens);
        }
        break;
      
      case 'conversation.item.input_audio_transcription.completed':
        // Estimar tokens de entrada baseado na transcrição
        if (event.transcript) {
          const estimatedTokens = Math.ceil(event.transcript.length / 4);
          this.updateTokenUsage(estimatedTokens, 0);
        }
        break;
      
      case 'response.audio.delta':
        // Estimar tempo de áudio de saída (muito aproximado)
        const outputSeconds = 0.1; // Cada delta é aproximadamente 100ms
        this.addAudioUsage(0, outputSeconds / 60);
        break;
      
      case 'input_audio_buffer.committed':
        // Estimar tempo de áudio de entrada
        const inputSeconds = 1; // Estimativa conservadora
        this.addAudioUsage(inputSeconds / 60, 0);
        break;
    }
  }
}
