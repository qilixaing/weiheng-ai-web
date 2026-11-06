/** Return the public product name instead of exposing the upstream model ID. */
export function aiDisplayName(model) {
  const label = typeof model === 'string' ? model.trim() : '';
  return !label || /deepseek/i.test(label) ? '维衡 AI' : label;
}
