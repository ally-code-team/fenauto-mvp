import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obter dados de uso da OpenAI (últimos 30 dias)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    // Nota: A API de usage da OpenAI requer permissões especiais
    // Por ora, retornamos dados mock para demonstração
    const mockUsage = {
      data: [
        {
          aggregation_timestamp: Math.floor(Date.now() / 1000),
          n_requests: 0,
          operation: 'chat.completions',
          n_context_tokens_total: 0,
          n_generated_tokens_total: 0,
        },
        {
          aggregation_timestamp: Math.floor(Date.now() / 1000),
          n_requests: 0,
          operation: 'realtime',
          n_audio_seconds_total: 0,
        }
      ],
      object: 'list',
      has_more: false,
    };

    return NextResponse.json({
      usage: mockUsage,
      note: 'Para dados reais de uso, é necessário configurar acesso à API de Usage da OpenAI',
    });
    
  } catch (error) {
    console.error('Erro ao obter dados de uso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
