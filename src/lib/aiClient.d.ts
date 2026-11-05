export interface AiApiError extends Error {
  code?: string;
}

/** Sends a typed request to the same-origin server-side AI proxy. */
export function aiRequest<TResponse = unknown>(path: string, body?: unknown): Promise<TResponse>;
export function mealPlanStream(body: unknown, onProgress: (step: import('../types/agent').AgentToolTrace) => void): Promise<import('../types/agent').MealAgentResponse>;
export function aiStream(
  path: string,
  body: unknown,
  onEvent: (event: import('../types/nutrition').AiDietChatStreamEvent) => void,
  signal?: AbortSignal,
): Promise<Extract<import('../types/nutrition').AiDietChatStreamEvent, { type: 'done' }>>;
