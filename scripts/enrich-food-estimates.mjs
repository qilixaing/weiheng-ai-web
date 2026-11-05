import { readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_FOODS } from '../src/data/catalogue.js';
import { MACROS } from '../src/lib/foodNutrition.js';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(project, 'src/data/aiFoodEstimates.json');
const baseUrl = process.env.WEIHENG_LOCAL_URL || 'http://127.0.0.1:4173';
const limit = Math.min(20, Math.max(1, Number(process.env.FOOD_ESTIMATE_BATCH_SIZE) || 20));
const delay = Math.max(4000, Number(process.env.FOOD_ESTIMATE_DELAY_MS) || 4000);
const pause = ms => new Promise(resolvePause => setTimeout(resolvePause, ms));
const catalogueMissing = ALL_FOODS.filter(food => MACROS.some(metric => typeof food.nutrients[metric.id] !== 'number'));
let document;
try { document = JSON.parse(await readFile(output, 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; document = { schemaVersion: 1, basis: '每100克可食部', valueType: 'AI估算范围，仅补充原数据缺失的热量、蛋白质、碳水与脂肪', estimates: {} }; }
document.estimates ||= {};
document.failed ||= {};
const pending = catalogueMissing.filter(food => !document.estimates[food.key]?.values || MACROS.some(metric => typeof food.nutrients[metric.id] !== 'number' && !document.estimates[food.key].values[metric.id]));
console.log(`食物总数 ${ALL_FOODS.length}；需要AI补充 ${catalogueMissing.length}；已有结果 ${catalogueMissing.length - pending.length}；本次待算 ${pending.length}。`);
if (!pending.length) process.exit(0);
const status = await fetch(`${baseUrl}/api/ai/status`).then(response => response.json());
if (!status.configured) throw new Error('本地 AI 服务未配置 DeepSeek。');
for (let offset = 0; offset < pending.length; offset += limit) {
  const queue = [pending.slice(offset, offset + limit)];
  while (queue.length) {
    const batch = queue.shift();
    let response, payload, failure;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await fetch(`${baseUrl}/api/ai/food-estimates-batch`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ foodIds: batch.map(food => food.key) }), signal: AbortSignal.timeout(85000) });
        payload = await response.json();
        if (!response.ok) throw new Error(`${payload.code || response.status}: ${payload.error || 'AI估算失败'}`);
        const returned = new Map((payload.estimates || []).map(item => [item.foodId, item]));
        if (batch.some(food => !returned.has(food.key))) throw new Error('AI 返回条目不完整。');
        for (const food of batch) {
          const item = returned.get(food.key);
          document.estimates[food.key] = { name: food.name, category: food.categoryName, state: food.state || null, values: item.values, assumption: item.assumption, model: item.model, generatedAt: item.generatedAt, valueType: item.valueType };
          delete document.failed[food.key];
        }
        document.updatedAt = new Date().toISOString();
        document.catalogueVersion = 'photo-catalogue-local-20261104-v4';
        const temporary = `${output}.tmp`;
        await writeFile(temporary, JSON.stringify(document, null, 2) + '\n', 'utf8');
        await rename(temporary, output);
        console.log(`已写入累计 ${Object.keys(document.estimates).length} 条；本轮新增 ${batch.length} 条。`);
        failure = null;
        break;
      } catch (error) {
        failure = error;
        if (attempt < 2) await pause(delay * (attempt + 1));
      }
    }
    if (failure) {
      if (batch.length > 1) {
        const midpoint = Math.ceil(batch.length / 2);
        console.log(`这批 ${batch.length} 项需要缩小范围重试：${failure.message}`);
        queue.unshift(batch.slice(midpoint), batch.slice(0, midpoint));
      } else {
        document.failed[batch[0].key] = { name: batch[0].name, reason: failure.message, retryable: true, checkedAt: new Date().toISOString() };
        const temporary = `${output}.tmp`;
        await writeFile(temporary, JSON.stringify(document, null, 2) + '\n', 'utf8');
        await rename(temporary, output);
        console.log(`单项暂未通过合理性校验，保留未知值并记录待重试：${batch[0].name}（${batch[0].key}）`);
      }
    }
  }
  if (offset + limit < pending.length) await pause(delay);
}
const finalMissing = catalogueMissing.filter(food => !document.estimates[food.key]);
console.log(`批量完成：${Object.keys(document.estimates).length} 条AI营养估算已写入 ${output}；${finalMissing.length} 条未通过合理性校验，维持未知并可重试。`);
