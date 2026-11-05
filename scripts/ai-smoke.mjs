#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';

const DEFAULT_BASE_URL = 'http://127.0.0.1:4173';
const REQUEST_TIMEOUT_MS = 110_000;
const MAX_IMAGE_BYTES = 1_500_000;
const SYNTHETIC_PROFILE = Object.freeze({ sex: 'female', age: 32, height: 165, weight: 60, activity: 'light' });

function usage() {
  return '用法：npm run ai:smoke [-- --base-url http://127.0.0.1:4173] [--image <本地图片路径>]';
}

function parseArgs(args) {
  const options = { baseUrl: process.env.AI_SMOKE_BASE_URL || DEFAULT_BASE_URL, imagePath: null };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--help' || arg === '-h') {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    }
    if (arg === '--base-url' && args[index + 1]) options.baseUrl = args[++index];
    else if (arg === '--image' && args[index + 1]) options.imagePath = args[++index];
    else throw new Error(`未知或缺少参数：${arg}\n${usage()}`);
  }
  const base = new URL(options.baseUrl);
  if (!['localhost', '127.0.0.1', '[::1]', '::1'].includes(base.hostname)) {
    throw new Error('--base-url 仅允许本机服务，避免脚本向外部地址发送测试数据。');
  }
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== '/') {
    throw new Error('--base-url 必须是本机服务的根地址，不能包含凭据、路径、查询参数或片段。');
  }
  options.baseUrl = base.origin;
  return options;
}

function safeText(value, maxLength = 240) {
  return String(value || '')
    .replace(/Bearer\s+\S+/gi, 'Bearer [已隐藏]')
    .replace(/sk-[A-Za-z0-9_-]{8,}/g, '[已隐藏的密钥]')
    .replace(/[A-Za-z0-9_-]{40,}/g, '[已隐藏的长令牌]')
    .replace(/[\r\n\t]+/g, ' ')
    .slice(0, maxLength);
}

function validation(ok, reason = '') {
  return { ok, reason: ok ? null : safeText(reason || '响应结构与预期不符。') };
}

function metadata(body, fallbackVersion) {
  return {
    model: typeof body?.model === 'string' ? safeText(body.model, 100) : null,
    dataVersion: body?.dataVersion || body?.calculation?.sourceVersion || body?.calculation?.intake?.dataVersion || fallbackVersion || null,
  };
}

async function postLocal(baseUrl, route, body) {
  const response = await fetch(new URL(`/api/ai/${route}`, baseUrl), {
    method: 'POST',
    redirect: 'error',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  return { response, payload };
}

async function runCheck({ name, method = 'POST', route, body, fallbackVersion, validate, baseUrl }) {
  const startedAt = performance.now();
  try {
    let response;
    let payload;
    if (method === 'GET') {
      response = await fetch(new URL(`/api/ai/${route}`, baseUrl), {
        method: 'GET',
        redirect: 'error',
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });
      try { payload = await response.json(); } catch { payload = null; }
    } else {
      ({ response, payload } = await postLocal(baseUrl, route, body));
    }
    const elapsedMs = Math.round(performance.now() - startedAt);
    const info = metadata(payload, fallbackVersion);
    if (!response.ok) {
      return {
        name,
        status: 'FAIL',
        httpStatus: response.status,
        elapsedMs,
        ...info,
        validation: validation(false, `${payload?.code || `HTTP_${response.status}`}: ${payload?.error || '服务端返回错误。'}`),
      };
    }
    const checked = validate(payload);
    return {
      name,
      status: checked.ok ? 'PASS' : 'FAIL',
      httpStatus: response.status,
      elapsedMs,
      ...info,
      ...(name === '服务状态' ? { configuration: {
        configured: payload.configured,
        textModel: safeText(payload.textModel, 100),
        visionModel: safeText(payload.visionModel, 100),
      } } : {}),
      validation: checked,
    };
  } catch (error) {
    const timeout = error?.name === 'TimeoutError';
    return {
      name,
      status: 'FAIL',
      httpStatus: null,
      elapsedMs: Math.round(performance.now() - startedAt),
      model: null,
      dataVersion: fallbackVersion || null,
      validation: validation(false, timeout ? '本地 AI 接口请求超时。' : `无法访问本地 AI 接口：${safeText(error?.message || error)}`),
    };
  }
}

async function imagePayload(path) {
  const absolutePath = resolve(path);
  const extension = extname(absolutePath).toLowerCase();
  const mime = ({ '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' })[extension];
  if (!mime) throw new Error('--image 只接受 JPG、PNG 或 WEBP 图片。');
  const data = await readFile(absolutePath);
  if (!data.length || data.length > MAX_IMAGE_BYTES) throw new Error('测试图片必须非空且不超过 1.5 MB。');
  return { dataUrl: `data:${mime};base64,${data.toString('base64')}`, label: basename(absolutePath) };
}

function currentLocalDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const fixtureDate = currentLocalDate();
  const report = {
    kind: 'DeepSeek server-side API smoke test',
    baseUrl: options.baseUrl,
    startedAt: new Date().toISOString(),
    dataSourcePolicy: 'Synthetic test prompts, profile, and portions; food evidence comes only from the project catalogue.',
    checks: [],
  };

  const status = await runCheck({
    name: '服务状态', method: 'GET', route: 'status', baseUrl: options.baseUrl,
    validate: payload => validation(payload?.provider === 'DeepSeek' && typeof payload.configured === 'boolean'
      && typeof payload.textModel === 'string' && typeof payload.visionModel === 'string' && typeof payload.dataVersion === 'string', '状态响应缺少 provider、模型配置状态或数据版本。'),
  });
  report.checks.push(status);
  const dataVersion = status.dataVersion || null;
  if (status.configuration) report.configuration = { ...status.configuration, dataVersion };

  report.checks.push(await runCheck({
    name: '食物问答', route: 'ask', baseUrl: options.baseUrl, fallbackVersion: dataVersion,
    body: { question: '100 克香蕉大约有多少热量？请基于目录数据说明。', foodIds: ['banana'] },
    validate: payload => validation(typeof payload?.answer?.summary === 'string' && payload.answer.summary.trim().length > 0
      && Array.isArray(payload.database) && payload.database.some(item => item.id === 'banana' && item.basis === '每 100 克可食部')
      && typeof payload.model === 'string' && typeof payload.generatedAt === 'string', '问答缺少回答文本、香蕉目录依据、模型或生成时间。'),
  }));

  report.checks.push(await runCheck({
    name: '餐食规划 Agent', route: 'meal-plan', baseUrl: options.baseUrl, fallbackVersion: dataVersion,
    body: { goal: '请用目录中的香蕉设计一份简单加餐，只提出待确认方案。', date: fixtureDate, meal: 'snack', profile: SYNTHETIC_PROFILE },
    validate: payload => validation(payload?.status === 'ready' && Array.isArray(payload?.plan?.items) && payload.plan.items.length > 0
      && Array.isArray(payload?.trace) && ['search_foods', 'get_food_detail', 'calculate_nutrition', 'compare_with_targets'].every(name => payload.trace.some(item => item.tool === name && item.status === 'complete'))
      && typeof payload.model === 'string' && typeof payload.dataVersion === 'string', 'Agent 未返回完成的方案、四项白名单工具轨迹、模型或数据版本；不支持 Function Calling 时会如实失败。'),
  }));

  report.checks.push(await runCheck({
    name: '每日营养分析', route: 'analyze-day', baseUrl: options.baseUrl, fallbackVersion: dataVersion,
    body: { date: fixtureDate, entries: [{ foodId: 'banana', grams: 100, meal: 'snack', referenceConfirmed: true }], profile: SYNTHETIC_PROFILE },
    validate: payload => validation(typeof payload?.analysis?.summary === 'string' && payload.analysis.summary.trim().length > 0
      && Array.isArray(payload?.calculation?.comparison) && payload.calculation.intake?.itemCount === 1
      && typeof payload?.calculation?.sourceVersion === 'string' && typeof payload.model === 'string' && typeof payload.generatedAt === 'string', '每日分析缺少摘要、程序计算结果、数据版本、模型或生成时间。'),
  }));

  if (!options.imagePath) {
    report.checks.push({ name: '照片识别', status: 'SKIPPED', httpStatus: null, elapsedMs: 0, model: null, dataVersion, validation: { ok: null, reason: '未提供 --image，本项未执行，不计为通过。' } });
  } else {
    try {
      const image = await imagePayload(options.imagePath);
      const result = await runCheck({
        name: '照片识别', route: 'recognize', baseUrl: options.baseUrl, fallbackVersion: dataVersion,
        body: { image: image.dataUrl },
        validate: payload => validation(Array.isArray(payload?.items) && typeof payload?.note === 'string'
          && typeof payload?.model === 'string' && typeof payload?.generatedAt === 'string'
          && payload.items.every(item => typeof item.name === 'string' && (item.grams === null || typeof item.grams === 'number')),
          '识别响应缺少食物列表、估重说明、模型或生成时间。'),
      });
      report.checks.push({ ...result, input: '由 --image 指定的本地图片（仅文件名用于报告）', image: image.label });
    } catch (error) {
      report.checks.push({ name: '照片识别', status: 'FAIL', httpStatus: null, elapsedMs: 0, model: null, dataVersion, validation: validation(false, safeText(error?.message || error)) });
    }
  }

  report.finishedAt = new Date().toISOString();
  report.summary = {
    passed: report.checks.filter(item => item.status === 'PASS').length,
    failed: report.checks.filter(item => item.status === 'FAIL').length,
    skipped: report.checks.filter(item => item.status === 'SKIPPED').length,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.summary.failed > 0) process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${safeText(error?.message || error, 500)}\n`);
  process.exitCode = 2;
}
