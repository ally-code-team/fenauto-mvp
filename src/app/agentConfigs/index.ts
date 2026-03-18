import { grupoABLScenario } from './grupoABL/index';
import { uniSantaCruzScenario } from './uniSantaCruz/index';
import { paranaPrevidenciaScenario } from './paranaPrevidencia/index';
import { kabumScenario } from './kabum/index';
import { sapScenario } from './sap/index';
import { chevroletScenario } from './chevrolet/index';
import { bellinatiperezScenario } from './bellinatiperez/index';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  grupoABL: grupoABLScenario,
  uniSantaCruz: uniSantaCruzScenario,
  paranaPrevidencia: paranaPrevidenciaScenario,
  kabum: kabumScenario,
  sap: sapScenario,
  chevrolet: chevroletScenario,
  bellinatiperez: bellinatiperezScenario,
};

export const defaultAgentSetKey = 'sap';
