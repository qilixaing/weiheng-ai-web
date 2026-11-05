import test from 'node:test';
import assert from 'node:assert/strict';
import { aiStream } from '../src/lib/aiClient.js';

test('AI chat client incrementally decodes UTF-8 SSE deltas and resolves on done', async () => {
  const originalFetch = globalThis.fetch;
  const encoder = new TextEncoder();
  const contextSummary = {
    date: '2026-10-30', dataVersion: 'test-data', itemCount: 0,
    knownEnergyCount: 0, missingItemCount: 0, targetsAvailable: false,
  };
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/ai/chat');
    assert.equal(options.headers.Accept, 'text/event-stream');
    assert.equal(JSON.parse(options.body).stream, true);
    const connected = encoder.encode(': connected\n\n: keepalive\n\n');
    const first = encoder.encode('data: {"type":"delta","text":"逐字输出"}\n\n');
    const second = encoder.encode(`data: ${JSON.stringify({ type: 'done', model: 'mock-model', generatedAt: '2026-10-30T00:00:00.000Z', contextSummary })}\n\n`);
    return new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(connected);
        controller.enqueue(first.slice(0, 39));
        controller.enqueue(first.slice(39));
        controller.enqueue(second);
        controller.close();
      },
    }), { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  };
  const events = [];
  try {
    const result = await aiStream('chat', { date: '2026-10-30' }, (event) => events.push(event));
    assert.deepEqual(events.map((event) => event.type), ['delta', 'done']);
    assert.equal(events[0].text, '逐字输出');
    assert.equal(result.model, 'mock-model');
    assert.equal(result.contextSummary.date, '2026-10-30');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('AI chat client forwards an abort signal so a new prompt can stop the active stream', async () => {
  const originalFetch = globalThis.fetch;
  const controller = new AbortController();
  let observedAbort = false;
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => {
      observedAbort = true;
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });
  });
  try {
    const pending = aiStream('chat', { date: '2026-11-02' }, () => {}, controller.signal);
    controller.abort();
    await assert.rejects(pending, /无法连接 AI 服务/);
    assert.equal(observedAbort, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
