import type { IntakeSummary, MealId, NutritionProfile } from './nutrition';

export type AgentToolName =
  | 'search_foods'
  | 'read_context'
  | 'get_food_detail'
  | 'calculate_nutrition'
  | 'compare_with_targets';

export interface MealAgentRequest {
  goal: string;
  date: string;
  meal: MealId;
  profile: NutritionProfile | null;
  /** Optional, user-approved context for this single request. */
  personalization?: MealAgentPersonalization;
  conditions?: MealConditions;
  recordContext?: {date:string; entries:unknown[]};
}

export interface MealConditions { budget:number|null; avoids:string[]; preferences:string; exercise:string; availableFoods:Array<{foodId:string;name?:string;grams:number;price:number|null}>; onlyAvailable:boolean; }
export interface MealCost {currency:string;budget:number|null;complete:boolean;knownSubtotal:number;total:number|null;status:string;basis:string;availability:string;breakdown:Array<{foodId:string;cost:number|null;priceBasis:unknown}>;}

export interface MealAgentPersonalization {
  preferences?: string;
  safetyFlags?: string[];
}

export interface AgentToolTrace {
  tool: AgentToolName;
  label: string;
  status: 'complete';
  inputSummary: string;
  resultSummary: string;
}

export interface AgentSearchFoodsParams {
  query: string;
  group?: string;
  sortBy?: 'default' | 'energy' | 'protein' | 'carbs' | 'fat';
  limit?: number;
}

export interface AgentFoodRecord {
  id: string;
  name: string;
  state: string;
  category: string;
  group: string;
  source: string | null;
  sourceName: string | null;
  per100: Record<string, number | null | undefined>;
}

export interface AgentSearchFoodsResult {
  foods: Array<AgentFoodRecord & { match: string }>;
  query: string;
  group: string | null;
  count: number;
  basis: '每 100 克可食部';
  missingIndicators: Array<{ foodId: string; missing: string[] }>;
}

export interface AgentGetFoodDetailParams {
  foodId: string;
}

export interface AgentGetFoodDetailResult extends AgentFoodRecord {
  aliases: string[];
  basis: '每 100 克可食部';
  missing: string[];
}

export interface AgentPlanToolItem {
  foodId: string;
  grams: number;
}

export interface AgentCalculateNutritionParams {
  items: AgentPlanToolItem[];
}

export interface AgentCalculatedFood {
  foodId: string;
  name: string;
  grams: number;
  source: string | null;
  sourceName: string | null;
  per100: Record<string, number | null | undefined>;
  portion: Record<string, number | null>;
  missing: string[];
}

export interface AgentCalculateNutritionResult {
  basis: string;
  dataVersion: string;
  items: AgentCalculatedFood[];
  totals: IntakeSummary['totals'];
}

export interface AgentCompareWithTargetsParams {
  items: AgentPlanToolItem[];
}

export interface AgentCompareWithTargetsResult {
  basis: string;
  targetsAvailable: boolean;
  comparison: AgentComparison[];
}

export interface AgentToolContractMap {
  read_context: { params: Record<string, never>; result: unknown };
  search_foods: { params: AgentSearchFoodsParams; result: AgentSearchFoodsResult };
  get_food_detail: { params: AgentGetFoodDetailParams; result: AgentGetFoodDetailResult };
  calculate_nutrition: { params: AgentCalculateNutritionParams; result: AgentCalculateNutritionResult };
  compare_with_targets: { params: AgentCompareWithTargetsParams; result: AgentCompareWithTargetsResult };
}

export type AgentToolInvocation = {
  [Name in AgentToolName]: {
    name: Name;
    arguments: AgentToolContractMap[Name]['params'];
    result: AgentToolContractMap[Name]['result'];
  }
}[AgentToolName];

export interface AgentFoodEvidence {
  foodId: string;
  name: string;
  grams: number;
  meal: MealId;
  reason: string;
  estimated: true;
  basis: string;
  source: string | null;
  sourceName: string | null;
  per100: Record<string, number | null | undefined>;
  portion: Record<string, number | null>;
  missing: string[];
}

export interface AgentComparison {
  id: string;
  name: string;
  unit: string;
  mealValue: number | null;
  complete: boolean;
  missing: string[];
  dailyTarget: number | null;
  dailyTargetShare: number | null;
  interpretation: string;
}

export interface MealAgentReadyResponse {
  conditions: MealConditions;
  cost: MealCost;
  confirmationId: string;
  contextSummary: {itemCount:number;profileAvailable:boolean;targetsAvailable:boolean};
  status: 'ready';
  plan: {
    title: string;
    summary: string;
    items: AgentFoodEvidence[];
    suggestions: string[];
    cautions: string[];
  };
  intake: IntakeSummary;
  comparison: AgentComparison[];
  trace: AgentToolTrace[];
  dataVersion: string;
  model: string;
  generatedAt: string;
  date: string;
  meal: MealId;
  goal: string;
}

export interface MealAgentNeedsEvidenceResponse {
  status: 'needs_evidence';
  message: string;
  trace: AgentToolTrace[];
  dataVersion: string;
  model: string;
  generatedAt: string;
}

export type MealAgentResponse = MealAgentReadyResponse | MealAgentNeedsEvidenceResponse;

export interface MealAgentConfirmation {
  onResult?: (result: {ok:boolean;error?:string}) => void;
  confirmationId?: string;
  date: string;
  meal: MealId;
  items: AgentFoodEvidence[];
}
