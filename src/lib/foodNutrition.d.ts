import type {
  DailyRecord,
  DailyRecordDraft,
  FoodEntry,
  FoodReference,
  IntakeSummary,
  NutritionProfile,
} from '../types/nutrition';

export const FOOD_DATA_VERSION: string;
export const MEALS: ReadonlyArray<readonly [string, string]>;
export const NUTRIENTS: ReadonlyArray<{ id: string; name: string; unit: string; section: string }>;
export const MACROS: typeof NUTRIENTS;
export function todayDate(): string;
export function formatNutrient(value: number | null | undefined): string;
export function validDate(value: unknown): value is string;
export function portion(food: Pick<FoodReference, 'nutrients'>, grams: number): Record<string, number | null>;
export function normalizeEntries(entries: unknown): FoodEntry[];
export function recordEntries(record: Partial<DailyRecord> | null | undefined): FoodEntry[];
export function calculateIntake(entries: unknown): IntakeSummary;
export function fingerprint(value: unknown): string;
export function recordVersion(record: DailyRecord): string;
export function analysisVersion(record: DailyRecord, profile?: NutritionProfile | null): string;
export function makeRecord(draft: DailyRecordDraft, previous?: DailyRecord | null): DailyRecord;
