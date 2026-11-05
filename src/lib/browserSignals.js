// Android/WebView versions without the newer AbortSignal static helpers.
export function timeoutSignal(milliseconds) {
  if (typeof AbortSignal.timeout === 'function') return AbortSignal.timeout(milliseconds);
  const controller = new AbortController();
  const timer = setTimeout(() => { const error = new Error('Request timed out'); error.name = 'TimeoutError'; controller.abort(error); }, milliseconds);
  timer.unref?.();
  return controller.signal;
}
export function anySignal(signals) {
  if (typeof AbortSignal.any === 'function') return AbortSignal.any(signals);
  const controller = new AbortController();
  const cancel = event => { controller.abort(event.target.reason); cleanup(); };
  const cleanup = () => signals.forEach(signal => signal.removeEventListener('abort', cancel));
  for (const signal of signals) {
    if (signal.aborted) { controller.abort(signal.reason); cleanup(); break; }
    signal.addEventListener('abort', cancel, { once: true });
  }
  return controller.signal;
}
