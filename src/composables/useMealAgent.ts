import { ref } from 'vue';
import { mealPlanStream } from '../lib/aiClient.js';
import type { MealAgentPersonalization, MealAgentRequest, MealAgentResponse } from '../types/agent';
import type { NutritionProfile } from '../types/nutrition';

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : 'Agent 暂时无法完成，请稍后重试。';
}

export function useMealAgent() {
  const goal = ref('');
  const date = ref(new Date().toLocaleDateString('sv-SE'));
  const meal = ref<MealAgentRequest['meal']>('lunch');
  const response = ref<MealAgentResponse | null>(null);
  const error = ref('');
  const busy = ref(false);
  const progress = ref<import('../types/agent').AgentToolTrace[]>([]);

  async function run(profile: NutritionProfile | null, personalization?: MealAgentPersonalization, context: Partial<MealAgentRequest> = {}): Promise<void> {
    if (busy.value) return;
    error.value = '';
    response.value = null;
    busy.value = true;
    progress.value = [];
    const safeProfile: NutritionProfile | null = profile ? {
      sex: profile.sex,
      age: profile.age,
      height: profile.height,
      weight: profile.weight,
      activity: profile.activity,
      ageMonths: profile.ageMonths,
      physiologicalStage: profile.physiologicalStage,
    } : null;
    try {
      response.value = await mealPlanStream({
        goal: goal.value.slice(0, 500),
        date: date.value,
        meal: meal.value,
        profile: safeProfile,
        conditions: context.conditions,
        recordContext: context.recordContext,
        ...(personalization ? {
          personalization: {
            preferences: personalization.preferences?.slice(0, 200),
            safetyFlags: personalization.safetyFlags?.slice(0, 4),
          },
        } : {}),
      }, step => progress.value.push(step));
    } catch (cause: unknown) {
      error.value = messageFrom(cause);
    } finally {
      busy.value = false;
    }
  }

  function clear(): void {
    response.value = null;
    error.value = '';
    progress.value = [];
  }

  return { goal, date, meal, response, error, busy, progress, run, clear };
}
