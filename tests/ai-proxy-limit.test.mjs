import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createAiHandler } from '../server/ai-api.mjs';

test('AI limits each visitor behind a trusted reverse proxy and ignores forwarded headers otherwise', async (t) => {
  for (const trustProxy of [true, false]) {
    const handler = createAiHandler({
      env: { DEEPSEEK_API_KEY: 'synthetic-rate-test', TRUST_PROXY: trustProxy ? '1' : '0' },
      fetchImpl: async () => new Response(JSON.stringify({ choices: [{ message: { content: '模拟回复' } }] })),
    });
    const server = createServer(async (req, res) => { await handler(req, res, new URL(req.url, 'http://localhost')); });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    t.after(() => server.close());
    const request = async (ip, turn) => {
      const response = await fetch(`http://127.0.0.1:${server.address().port}/api/ai/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip },
        body: JSON.stringify({ date: '2026-10-30', entries: [], messages: [{ role: 'user', content: `问题 ${turn}` }] }),
      });
      await response.text();
      return response.status;
    };
    for (let turn = 0; turn < 16; turn++) assert.equal(await request('198.51.100.1', turn), 200);
    assert.equal(await request('198.51.100.1', 16), 429);
    assert.equal(await request('198.51.100.2', 17), trustProxy ? 200 : 429);
  }
});
