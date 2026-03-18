import { ptBR, TranslationKey, getScenarioName } from './pt-BR';

export const useTranslation = () => {
  const t = (key: TranslationKey): string => {
    return ptBR[key] || key;
  };

  return { t };
};

export { ptBR, getScenarioName };
export type { TranslationKey };
