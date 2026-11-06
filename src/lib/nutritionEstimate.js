/** Convert an AI estimate or a legacy interval into one display/calculation point. */
export function estimateMidpoint(input) {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (!input || typeof input !== 'object') return null;
  if (typeof input.value === 'number' && Number.isFinite(input.value)) return input.value;
  if (typeof input.low === 'number' && Number.isFinite(input.low)
    && typeof input.high === 'number' && Number.isFinite(input.high)
    && input.high >= input.low) return (input.low + input.high) / 2;
  return null;
}

export function roundEstimate(value, unit) {
  if (!Number.isFinite(value)) return null;
  const digits = unit === 'kcal' ? 0 : 1;
  const scale = 10 ** digits;
  return Math.round((value + Number.EPSILON) * scale) / scale;
}

export function estimatePoint(input, unit) {
  const midpoint = estimateMidpoint(input);
  return midpoint === null ? null : roundEstimate(midpoint, unit);
}

export function pointRange(input, unit) {
  if (input && typeof input === 'object' && typeof input.low === 'number'
    && Number.isFinite(input.low) && typeof input.high === 'number'
    && Number.isFinite(input.high) && input.low === input.high) {
    return { low: input.low, high: input.high };
  }
  const value = estimatePoint(input, unit);
  return value === null ? null : { low: value, high: value };
}
