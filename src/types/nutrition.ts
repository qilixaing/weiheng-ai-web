/** Shared domain types for nutrition records, calculations, and AI reports. */

export type MealId = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'unspecified';
export type EntrySource = 'photo' | 'manual' | 'catalogue' | 'legacy';
export type ReportStatus = 'pending' | 'complete' | 'failed' | 'interrupted';

export type NutrientValues = Record<string, number | null | undefined>;

export interface FoodReference {
  key: string;
  name: string;
  aliases?: string[];
  group?: string;
  groupName?: string;
  category?: string;
  categoryName?: string;
  subcategory?: string;
  state?: string;
  grams?: number;
  source?: FoodDataSource | null;
  nutrients: NutrientValues;
}

export interface FoodDataSource {
  id: string;
  name: string;
  url: string;
  description: string;
  license: string;
  version: string;
  licenseUrl?: string;
}

/** Untrusted form/storage input, normalized before it is used in calculations. */
export interface FoodEntryInput {
  id?: string;
  foodId?: string | null;
  name?: string;
  grams: number | string;
  meal?: MealId;
  group?: string;
  source?: EntrySource;
  estimated?: boolean;
  referenceConfirmed?: boolean;
}

export interface FoodEntry {
  id: string;
  foodId: string | null;
  name: string;
  /** Edible portion in grams. */
  grams: number;
  meal: MealId;
  group: string;
  source: EntrySource;
  estimated: boolean;
  referenceConfirmed: boolean;
}

export interface NutritionProfile {
  ageMonths?: number;
  physiologicalStage?: 'general'|'pregnant'|'lactating'|'special';
  sex?: 'male' | 'female' | '';
  age?: number | '';
  height?: number | '';
  weight?: number | '';
  activity?: string;
  updatedAt?: string;
}

export interface DailyRecordDraft {
  date: string;
  entries: FoodEntryInput[];
  notes?: string;
  photoId?: string | null;
}

export interface DailyRecord {
  date: string;
  entries: FoodEntry[];
  grams?: Record<string, number>;
  items?: Record<string, number>;
  foods?: Record<string, number>;
  customFoods?: Partial<FoodEntry>[];
  notes?: string;
  photoId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  schemaVersion?: number;
  version?: string;
}

export interface NutrientTotal {
  value: number | null;
  known: number;
  missing: string[];
  complete: boolean;
}

export interface IntakeSummary {
  totals: Record<string, NutrientTotal>;
  itemCount: number;
  knownEnergyCount: number;
  dataVersion: string;
  basis: string;
}

export interface NutritionTargets {
  tdee?: number;
  macros?: Array<{ id: string; name: string; grams: number; percent: number }>;
}

export interface IntakeRow {
  id: string;
  name: string;
  unit: string;
  value: number | null;
  target: number | null;
  delta: number | null;
  complete: boolean;
  missing: string[];
  estimatedRange?: {
    intake: { low: number; high: number };
    delta: { low: number; high: number } | null;
    missingFoods: string[];
    label: string;
  } | null;
}

export interface AiNutrientRange {
  low: number;
  high: number;
  unit: string;
}

export interface AiFoodEstimate {
  entryId: string;
  name: string;
  grams: number;
  values: Partial<Record<'energy' | 'protein' | 'carbs' | 'fat', AiNutrientRange>>;
  assumption: string;
}

export interface ReportCalculation {
  date: string;
  intake: IntakeSummary;
  comparison: IntakeRow[];
  estimation: {
    status: 'complete' | 'not_needed';
    missingFoodCount: number;
    foods: AiFoodEstimate[];
    disclaimer: string;
  };
  targets: {
    tdee: number;
    macros: Array<{ id: string; name: string; grams: number; percent: number }>;
    vitamins: unknown[];
    minerals: unknown[];
    formulaVersion: string;
  } | null;
  sourceVersion: string;
}

export interface AiAnalysis {
  summary: string;
  overview: string[];
  targetComparison: string[];
  foodMix: string[];
  attention: string[];
  suggestions: string[];
  scope: string;
}

export interface AiReportSnapshot {
  entries: FoodEntry[];
  intake: IntakeSummary;
  profile: NutritionProfile;
}

export interface AiNutritionReport {
  id: string;
  date: string;
  recordVersion: string;
  dataVersion: string;
  requestedAt: string;
  generatedAt: string | null;
  status: ReportStatus;
  snapshot: AiReportSnapshot;
  result: AiAnalysis | null;
  calculation?: ReportCalculation;
  model?: string;
  error: string;
  persistenceFailed?: boolean;
}

export interface AnalyzeDayResponse {
  analysis: AiAnalysis;
  calculation: ReportCalculation;
  model: string;
  generatedAt: string;
}

export type AiDietChatRole = 'user' | 'assistant';

export interface ChatAttachmentMeta {
  id: string;
  kind: 'image' | 'document';
  name: string;
  size: number;
  mimeType: string;
}

export interface ChatAttachment extends ChatAttachmentMeta {
  text?: string;
  dataUrl?: string;
}

export interface AiDietChatMessage {
  id: string;
  role: AiDietChatRole;
  content: string;
  status: 'complete' | 'sending' | 'failed';
  model?: string;
  createdAt: string;
  error?: string;
  context?: AiDietChatResponse['contextSummary'];
  attachments?: ChatAttachmentMeta[];
}

export interface AiDietChatRequestMessage {
  role: AiDietChatRole;
  content: string;
  attachments?: ChatAttachment[];
}

export interface AiDietChatTargets {
  energy: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
}

export interface AiDietChatResponse {
  answer: string;
  model: string;
  generatedAt: string;
  contextSummary: {
    date: string;
    dataVersion: string;
    itemCount: number;
    knownEnergyCount: number;
    missingItemCount: number;
    targetsAvailable: boolean;
    profileAvailable: boolean;
  };
}

export type AiDietChatStreamEvent =
  | { type: 'delta'; text: string }
  | { type: 'error'; code: string; message: string }
  | {
      type: 'done';
      model: string;
      generatedAt: string;
      contextSummary: AiDietChatResponse['contextSummary'];
    };
