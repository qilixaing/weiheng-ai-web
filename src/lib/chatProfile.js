import { validateProfile } from './nutrition.js';

/**
 * Take a fresh, minimal snapshot of this visitor's saved body profile.
 * @param {import('../types/nutrition').NutritionProfile | null | undefined} input
 * @returns {import('../types/nutrition').NutritionProfile | null}
 */
export function snapshotChatProfile(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || validateProfile(input)) return null;
  const numeric = value => value === undefined || value === null || value === '' ? undefined : Number(value);
  const age = numeric(input.age), height = numeric(input.height), weight = numeric(input.weight);
  return {
    sex: input.sex || '',
    ...(age !== undefined ? { age } : {}),
    ...(height !== undefined ? { height } : {}),
    ...(weight !== undefined ? { weight } : {}),
    activity: input.activity,
    ...(numeric(input.ageMonths)!==undefined?{ageMonths:numeric(input.ageMonths)}:{}),
    ...(input.physiologicalStage?{physiologicalStage:input.physiologicalStage}:{}),
  };
}
