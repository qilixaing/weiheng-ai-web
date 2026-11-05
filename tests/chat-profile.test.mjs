import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { reactive } from 'vue';
import { createAiHandler } from '../server/ai-api.mjs';
import { snapshotChatProfile } from '../src/lib/chatProfile.js';
import { calculateNutrition } from '../src/lib/nutrition.js';

const env = { DEEPSEEK_API_KEY: 'synthetic-profile-test', DEEPSEEK_TEXT_MODEL: 'existing-text' };
const visitorA = { sex: 'male', age: 21, height: 172, weight: 62, activity: 'heavy' };
const visitorB = { sex: 'female', age: 35, height: 160, weight: 55, activity: 'light' };
const round = (value) => Math.round(value * 100) / 100;
const contextFrom = (sent) => JSON.parse(sent.messages[1].content.replace(/^所选日期的程序计算上下文（JSON，仅供事实依据）：/, ''));

async function endpoint(t, fetchImpl) {
  const handler = createAiHandler({ env, fetchImpl });
  const server = createServer(async (req, res) => { await handler(req, res, new URL(req.url, 'http://localhost')); });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());
  return (profile, extra = {}) => fetch(`http://127.0.0.1:${server.address().port}/api/ai/chat`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: '2026-10-30', entries: [], messages: [{ role: 'user', content: '我的身体数据' }], profile, ...extra }),
  });
}
const reply = (context) => new Response(JSON.stringify({ model: 'synthetic-profile-model', choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(context) } }] }), { status: 200 });

test('chat snapshots the current visitor profile after edits without retaining extra private fields', () => {
  const profile = reactive({ ...visitorA, updatedAt: 'not-shared', notes: 'not-shared', email: 'not-shared' });
  const first = snapshotChatProfile(profile);
  assert.deepEqual(first, visitorA);
  profile.weight = 65;
  assert.equal(snapshotChatProfile(profile).weight, 65);
  assert.equal(first.weight, 62, 'an in-flight request keeps its own snapshot');
  assert.deepEqual(snapshotChatProfile(visitorB), visitorB);
  assert.equal(snapshotChatProfile(null), null);
  assert.equal(snapshotChatProfile({ ...visitorA, age: -1 }), null);
  assert.deepEqual(snapshotChatProfile({ sex: '', activity: 'light' }), { sex: '', activity: 'light' });
});

test('concurrent chat visitors receive only their own profile and formula targets; edits and absent profiles do not reuse earlier data', async (t) => {
  const sentRequests = [];
  const post = await endpoint(t, async (url, options) => {
    const sent = JSON.parse(options.body);
    sentRequests.push(sent);
    const context = contextFrom(sent);
    // Let another request use the same handler before this reply completes.
    await new Promise((resolve) => setTimeout(resolve, context.profile?.sex === 'male' ? 30 : 1));
    return reply(context);
  });
  const responses = await Promise.all([post({ ...visitorA, notes: 'PRIVATE_A', email: 'PRIVATE_EMAIL' }), post({ ...visitorB, preferences: 'PRIVATE_B' })]);
  const results = await Promise.all(responses.map(async (response) => {
    assert.equal(response.status, 200);
    return response.json();
  }));
  for (const [index, profile] of [visitorA, visitorB].entries()) {
    const context = JSON.parse(results[index].answer), nutrition = calculateNutrition(profile);
    assert.deepEqual(context.profile, profile);
    assert.equal(context.bodyMetrics.bmr, round(nutrition.bmr));
    assert.equal(context.bodyMetrics.tdee, round(nutrition.tdee));
    assert.equal(context.bodyMetrics.activityLabel, nutrition.activity.label);
    assert.equal(context.dailyTargets.energy, round(nutrition.tdee));
    assert.equal(context.dailyTargets.protein, round(nutrition.macros.find((item) => item.id === 'protein').grams));
    assert.equal(results[index].contextSummary.profileAvailable, true);
  }
  assert.ok(!JSON.stringify(sentRequests).includes('PRIVATE_'));
  assert.match(sentRequests[0].messages[0].content, /本次最新上下文为准/);

  const updatedProfile = { ...visitorA, weight: 65 };
  const updated = await post(updatedProfile, {
    // Stale history and targets must not override a newly saved profile.
    messages: [{ role: 'user', content: '我的身体数据' }, { role: 'assistant', content: '我没有你的身体数据。' }, { role: 'user', content: '我刚更新了体重，再看看。' }],
    targets: { energy: 2000, protein: 80, carbs: 250, fat: 65 },
  });
  const updatedContext = JSON.parse((await updated.json()).answer);
  assert.deepEqual(updatedContext.profile, updatedProfile);
  assert.equal(updatedContext.dailyTargets.energy, round(calculateNutrition(updatedProfile).tdee));

  for (const profile of [undefined, { ...visitorA, height: 'invalid' }]) {
    const response = await post(profile), result = await response.json(), context = JSON.parse(result.answer);
    assert.equal(response.status, 200);
    assert.equal(context.profile, null);
    assert.equal(context.bodyMetrics, null);
    assert.equal(context.dailyTargets, null);
    assert.equal(result.contextSummary.profileAvailable, false);
  }
  const missingActivity=await post({weight:62}), missingContext=JSON.parse((await missingActivity.json()).answer);assert.deepEqual(missingContext.profile,{sex:'',weight:62});assert.equal(missingContext.dailyTargets,null);
  const partial = await post({ sex: '', activity: 'light' }), partialResult = await partial.json(), partialContext = JSON.parse(partialResult.answer);
  assert.equal(partial.status, 200);
  assert.deepEqual(partialContext.profile, { sex: '', activity: 'light' });
  assert.equal(partialContext.bodyMetrics, null);
  assert.equal(partialContext.dailyTargets, null);
  assert.equal(partialResult.contextSummary.profileAvailable, true);
});

test('streaming chat carries a normalized profile through the same configured model', async (t) => {
  let sent;
  const post = await endpoint(t, async (url, options) => {
    sent = JSON.parse(options.body);
    const context = contextFrom(sent);
    return new Response(`data: ${JSON.stringify({ model: 'synthetic-profile-model', choices: [{ delta: { content: `已读取：${context.profile.height} cm，${context.profile.weight} kg。` }, finish_reason: 'stop' }] })}\n\n`, { headers: { 'Content-Type': 'text/event-stream' } });
  });
  const response = await post({ ...visitorB, age: '35', height: '160', weight: '55', private: 'PRIVATE_EXTRA' }, { stream: true });
  assert.equal(response.status, 200);
  const output = await response.text();
  assert.match(output, /160 cm，55 kg/);
  assert.match(output, /"profileAvailable":true/);
  assert.deepEqual(contextFrom(sent).profile, visitorB);
  assert.equal(sent.model, env.DEEPSEEK_TEXT_MODEL);
  assert.equal(sent.stream, true);
  assert.ok(!JSON.stringify(sent).includes('PRIVATE_EXTRA'));
});

test('minor profiles remain available to chat without reusing client adult targets', async (t) => {
  const post = await endpoint(t, async (_url, options) => reply(contextFrom(JSON.parse(options.body))));
  const profile = { sex: 'female', age: 0, height: 50, weight: 3.5, activity: 'sedentary' };
  const response = await post(profile, { targets: { energy: 2000, protein: 80, carbs: 250, fat: 65 } });
  assert.equal(response.status, 200);
  const result = await response.json(), context = JSON.parse(result.answer);
  assert.deepEqual(context.profile, profile);
  assert.equal(context.dailyTargets, null);
  assert.equal(context.bodyMetrics, null);
  assert.equal(result.contextSummary.profileAvailable, true);
});
