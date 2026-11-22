import test from 'node:test';
import assert from 'node:assert/strict';
import {retrieveNutritionKnowledge} from '../src/lib/nutritionKnowledge.js';

test('local guidance retrieval returns relevant, versioned public sources',()=>{
 const guidelines=retrieveNutritionKnowledge('如何搭配下一餐，让饮食均衡？');
 assert.equal(guidelines[0].id,'diet-principles');
 assert.match(guidelines[0].summary,/食物多样/);
 assert.match(guidelines[0].version,/2022/);
 assert.match(guidelines[0].url,/^https:\/\//);
 const reference=retrieveNutritionKnowledge('RNI 和 AI 参考摄入量是什么意思？');
 assert.equal(reference[0].id,'reference-terms');
 assert.match(reference[0].summary,/不能凭单日记录判断个体缺乏/);
 assert.deepEqual(retrieveNutritionKnowledge('帮我写一个 JavaScript 排序函数'),[]);
});

test('local summaries cannot replace exact food sample measurements',()=>{
 const sources=retrieveNutritionKnowledge('大白菜每100克热量是多少？');
 assert.deepEqual(sources,[]);
 assert.ok(retrieveNutritionKnowledge('基础代谢怎么估算？').some(source=>source.id==='resting-energy'));
});
