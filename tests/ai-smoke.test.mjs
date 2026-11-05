import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/ai-smoke.mjs', import.meta.url));
const tools = ['search_foods', 'get_food_detail', 'calculate_nutrition', 'compare_with_targets'];

async function fakeService(t, { failing = false } = {}) {
  const seen = [];
  const server = createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : null;
    seen.push({ method: req.method, url: req.url, body });
    const route = req.url.split('/').at(-1);
    let status = 200;
    let payload;
    if (route === 'status') payload = { provider: 'DeepSeek', configured: true, textModel: 'fixture-text', visionModel: 'fixture-vision', dataVersion: 'fixture-food-v1' };
    else if (failing) {
      status = 401;
      payload = { code: 'AUTH_FAILED', error: '鉴权失败，测试密钥 sk-abcdefghijklmnopqrstuvwxyz012345 已隐藏。' };
    } else if (route === 'ask') payload = { answer: { summary: '合成接口测试回答。' }, database: [{ id: 'banana', basis: '每 100 克可食部' }], model: 'fixture-text', generatedAt: new Date().toISOString() };
    else if (route === 'meal-plan') payload = { status: 'ready', plan: { items: [{ foodId: 'banana', grams: 100 }] }, trace: tools.map(tool => ({ tool, status: 'complete' })), model: 'fixture-text', dataVersion: 'fixture-food-v1' };
    else if (route === 'analyze-day') payload = { analysis: { summary: '合成日报分析。' }, calculation: { comparison: [], intake: { itemCount: 1 }, sourceVersion: 'fixture-food-v1' }, model: 'fixture-text', generatedAt: new Date().toISOString() };
    else if (route === 'recognize') payload = { items: [], note: '无可识别食物', model: 'fixture-vision', generatedAt: new Date().toISOString() };
    else { status = 404; payload = { error: 'not found' }; }
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify(payload));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  return { baseUrl: `http://127.0.0.1:${server.address().port}`, seen };
}

function runSmoke(args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], {
      env: { ...process.env, AI_SMOKE_BASE_URL: '', DEEPSEEK_API_KEY: 'test-secret-must-never-print', ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', chunk => { stdout += chunk; });
    child.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk; });
    child.once('error', reject);
    child.once('close', code => resolve({ code, stdout, stderr }));
  });
}

test('smoke runner calls only local AI routes and reports omitted photo recognition as skipped', async t => {
  const service = await fakeService(t);
  const result = await runSmoke(['--base-url', service.baseUrl]);
  assert.equal(result.code, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.deepEqual(report.summary, { passed: 4, failed: 0, skipped: 1 });
  assert.equal(report.checks.find(item => item.name === '照片识别').status, 'SKIPPED');
  assert.ok(report.checks.every(item => item.elapsedMs >= 0 && item.validation));
  assert.ok(report.checks.every(item => item.dataVersion === 'fixture-food-v1'));
  assert.ok(service.seen.every(item => item.url.startsWith('/api/ai/')));
  assert.equal(service.seen.filter(item => item.method === 'POST').length, 3);
  assert.equal(JSON.stringify(report).includes('test-secret-must-never-print'), false);
});

test('smoke runner accepts an explicitly supplied image and preserves truthful upstream errors without secrets', async t => {
  const service = await fakeService(t, { failing: true });
  const folder = await mkdtemp(join(tmpdir(), 'vitabalance-smoke-'));
  const imagePath = join(folder, 'synthetic.png');
  await writeFile(imagePath, Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const result = await runSmoke(['--base-url', service.baseUrl, '--image', imagePath]);
  assert.equal(result.code, 1);
  const report = JSON.parse(result.stdout);
  assert.equal(report.summary.failed, 4);
  assert.equal(report.checks.find(item => item.name === '照片识别').status, 'FAIL');
  assert.match(report.checks.find(item => item.name === '食物问答').validation.reason, /AUTH_FAILED/);
  assert.equal(JSON.stringify(report).includes('sk-abcdefghijklmnopqrstuvwxyz012345'), false);
  assert.equal(JSON.stringify(report).includes('test-secret-must-never-print'), false);
  const recognition = service.seen.find(item => item.url.endsWith('/recognize'));
  assert.equal(recognition.body.image.startsWith('data:image/png;base64,'), true);
  assert.ok(service.seen.every(item => item.url.startsWith('/api/ai/')));
});

test('smoke runner refuses a non-local API base URL', async () => {
  const result = await runSmoke(['--base-url', 'https://example.com']);
  assert.equal(result.code, 2);
  assert.match(result.stderr, /仅允许本机服务/);
  assert.equal(result.stdout, '');
});
