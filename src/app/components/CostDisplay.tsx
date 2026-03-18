"use client";

import React, { useEffect, useState } from 'react';
import { CostTracker, CostData } from '@/app/lib/costTracker';
import { useTranslation } from '@/app/i18n';

interface CostDisplayProps {
  isExpanded: boolean;
}

export default function CostDisplay({ isExpanded }: CostDisplayProps) {
  const { t } = useTranslation();
  const [costs, setCosts] = useState<CostData>({
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
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tracker = CostTracker.getInstance();
    setCosts(tracker.getCosts()); // Carregar os dados reais após montar
    const unsubscribe = tracker.subscribe(setCosts);
    return unsubscribe;
  }, []);

  const handleResetCosts = () => {
    if (confirm('Tem certeza que deseja resetar todos os custos?')) {
      CostTracker.getInstance().resetCosts();
    }
  };

  const formatCurrency = (value: number) => {
    if (!mounted) return 'US$ 0,0000'; // Valor padrão durante SSR
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
    }).format(value);
  };

  const formatNumber = (value: number, decimals = 0) => {
    if (!mounted) return '0'; // Valor padrão durante SSR
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-xl min-w-80 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{t('costs')}</h3>
          <div className="text-lg font-bold text-green-600">
            {formatCurrency(costs.totalCost)}
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-1">
          {mounted ? costs.sessions : 0} sessões • {mounted ? formatNumber(costs.inputTokens + costs.outputTokens) : '0'} tokens
        </div>
        {costs.currentSession?.isActive && (
          <div className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Sessão atual: {formatCurrency(costs.currentSessionCost)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl min-w-80 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{t('costs')}</h3>
          <button
            onClick={handleResetCosts}
            className="text-sm px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 text-red-700"
          >
            {t('resetCosts')}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(costs.totalCost)}
            </div>
            <div className="text-sm text-gray-600">
              {t('totalCost')}
            </div>
          </div>
          {costs.currentSession?.isActive && (
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(costs.currentSessionCost)}
              </div>
              <div className="text-sm text-gray-600">
                Sessão Atual
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        {/* Sessão Atual */}
        {costs.currentSession?.isActive && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-800">Sessão Atual</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Custo atual:</span>
                <span className="font-mono text-blue-700">{formatCurrency(costs.currentSessionCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tokens entrada:</span>
                <span className="font-mono">{formatNumber(costs.currentSession.inputTokens)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tokens saída:</span>
                <span className="font-mono">{formatNumber(costs.currentSession.outputTokens)}</span>
              </div>
              <div className="flex justify-between">
                <span>Áudio entrada:</span>
                <span className="font-mono">{formatNumber(costs.currentSession.audioInputMinutes, 2)}min</span>
              </div>
              <div className="flex justify-between">
                <span>Áudio saída:</span>
                <span className="font-mono">{formatNumber(costs.currentSession.audioOutputMinutes, 2)}min</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span>Texto:</span>
                  <span className="font-mono">{formatCurrency(costs.currentSessionBreakdown.textCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Áudio:</span>
                  <span className="font-mono">{formatCurrency(costs.currentSessionBreakdown.audioCost)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Breakdown por tipo */}
        <div>
          <h4 className="font-medium mb-2">Detalhamento Total</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Texto:</span>
              <span className="font-mono">{formatCurrency(costs.breakdown.textCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Áudio:</span>
              <span className="font-mono">{formatCurrency(costs.breakdown.audioCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sessões:</span>
              <span className="font-mono">{formatCurrency(costs.breakdown.sessionCost)}</span>
            </div>
          </div>
        </div>

        {/* Estatísticas de uso */}
        <div>
          <h4 className="font-medium mb-2">Estatísticas Totais</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t('inputTokens')}:</span>
              <span className="font-mono">{formatNumber(costs.inputTokens)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('outputTokens')}:</span>
              <span className="font-mono">{formatNumber(costs.outputTokens)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('audioInputMinutes')}:</span>
              <span className="font-mono">{formatNumber(costs.audioInputMinutes, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('audioOutputMinutes')}:</span>
              <span className="font-mono">{formatNumber(costs.audioOutputMinutes, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sessões:</span>
              <span className="font-mono">{formatNumber(costs.sessions)}</span>
            </div>
          </div>
        </div>

        {/* Preços por unidade */}
        <div>
          <h4 className="font-medium mb-2">Preços Unitários (GPT-4o Realtime)</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div>Texto entrada: $0.005/1K tokens</div>
            <div>Texto saída: $0.02/1K tokens</div>
            <div>Áudio entrada: $0.10/minuto</div>
            <div>Áudio saída: $0.20/minuto</div>
            <div>Sessão: $0.01/sessão</div>
          </div>
        </div>
      </div>
    </div>
  );
}
