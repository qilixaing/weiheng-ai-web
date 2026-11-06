import type { FoodReference } from '../types/nutrition';

export interface CatalogueFood extends FoodReference {
  __summary?: boolean;
  key: string;
  name: string;
  aliases: string[];
  group: string;
  groupName: string;
  category: string;
  categoryName: string;
  subcategory: string;
  state: string;
  image: string | null;
  imageAlt: string;
  imageLabel: string;
  imageNote: string;
  basis: '每 100 克可食部';
  source: FoodReference['source'];
}

export interface FoodGroup {
  key: string;
  name: string;
  unit: string;
  hint: string;
  items: Array<[string, string, number, string[]]>;
}

export const FOOD_DATA_VERSION: string;
export const ALL_FOODS: CatalogueFood[];
export const REFERENCE_FOODS: CatalogueFood[];
export const PHOTO_FOODS: CatalogueFood[];
export const FOOD_BY_ID: Record<string, CatalogueFood>;
export const FOOD_GROUPS: FoodGroup[];
export const CORE_GROUPS: FoodGroup[];
export const GROUP_ICONS: Record<string, string>;
export function ensureFoodDetails(ids: string | string[]): Promise<CatalogueFood[]>;
export function normalizeSearch(value: unknown): string;
export function rankFoods(query: string, limit?: number): Array<{ food: CatalogueFood; score: number; match: string }>;
export function searchFoods(query: string, limit?: number): CatalogueFood[];
export function findMentionedFoods(question: string, limit?: number): CatalogueFood[];
