<script setup>
import {computed,ref,reactive,watch} from 'vue';
import AppIcon from './AppIcon.vue';
import NutrientSummary from './NutrientSummary.vue';
import FoodImage from './FoodImage.vue';
import {foodTitle,foodState} from '../lib/foodPresentation.js';
import SourcesNote from './SourcesNote.vue';
import {useMealAgent} from '../composables/useMealAgent';
import {calculateIntake,portion,recordEntries,todayDate} from '../lib/foodNutrition.js';
import {FOOD_BY_ID,searchFoods,ALL_FOODS,ensureFoodDetails} from '../data/catalogue.js';
import {normalizeMealConditions,calculateMealCost,foodConflicts,allowedMealFood} from '../lib/mealConditions.js';
import { aiDisplayName } from '../lib/aiBranding.js';
const props=defineProps({profile:Object,nutrition:Object,preferences:String,flags:Array,records:Array});
const emit=defineEmits(['confirm']);
const {goal,date,meal,response,error,busy,progress,run,clear}=useMealAgent();
goal.value='结合我的就餐条件，安排一份食物多样、方便选择的下一餐';
const conditions=reactive({budget:'',avoids:'',preferences:props.preferences||'',exercise:'',availableFoods:[],onlyAvailable:true});
const replacing=ref(-1),replacementId=ref('');
const confirmed=ref(false),shareHistory=ref(true),shareSafety=ref(false),inputError=ref(''),candidateQuery=ref(''),candidateId=ref('');
const mealOptions=[['breakfast','早餐'],['lunch','午餐'],['dinner','晚餐'],['snack','加餐']];
const candidates=computed(()=>candidateQuery.value.trim()?searchFoods(candidateQuery.value,8):[]);
const history=computed(()=>recordEntries((props.records||[]).find(x=>x.date===date.value)));
const ready=computed(()=>response.value?.status==='ready'?response.value:null);
const entries=computed(()=>(ready.value?.plan.items||[]).map((item,index)=>({id:'agent-'+index,foodId:item.foodId,name:item.name,grams:item.grams,meal:item.meal,group:FOOD_BY_ID[item.foodId]?.group||'snacks',source:'catalogue',estimated:true,referenceConfirmed:true})));
const cost=computed(()=>ready.value?calculateMealCost(ready.value.plan.items,ready.value.conditions):null);
const invalidPlan=computed(()=>!ready.value||!ready.value.plan.items.length||cost.value?.status==='over_budget'||ready.value.plan.items.some(x=>!Number.isFinite(x.grams)||x.grams<0.1||x.grams>5000));
watch([goal,date,meal,conditions,shareHistory,shareSafety,()=>props.profile,()=>props.records],()=>{if(!busy.value&&response.value)clear();confirmed.value=false;},{deep:true});
watch(()=>props.preferences,value=>conditions.preferences=value||'');
function addCandidate(){const food=FOOD_BY_ID[candidateId.value];inputError.value='';if(!food)return;if(conditions.availableFoods.some(x=>x.foodId===food.key)){inputError.value='该食物已在备选中，请直接修改份量。';return;}if(conditions.availableFoods.length>=12){inputError.value='最多加入12项备选食物。';return;}conditions.availableFoods.push({foodId:food.key,name:food.name,grams:100,price:''});candidateId.value='';candidateQuery.value='';}
async function generate(){inputError.value='';confirmed.value=false;let normalized;
 try{await ensureFoodDetails(conditions.availableFoods.map(x=>x.foodId));normalized=normalizeMealConditions(conditions);const conflict=normalized.availableFoods.find(x=>foodConflicts(FOOD_BY_ID[x.foodId],normalized.avoids).length);if(conflict)throw Error('备选食物“'+conflict.name+'”命中回避项，请先移除或修改条件。');}
 catch(e){inputError.value=e.message;return;}
 await run(props.profile,shareSafety.value?{safetyFlags:(props.flags||[]).filter(x=>['正在使用药物','孕期或哺乳期','有需要管理的健康状况','正在使用营养补充剂'].includes(x))}:undefined,{conditions:normalized,...(shareHistory.value?{recordContext:{date:date.value,entries:history.value.map(x=>({foodId:x.foodId,name:x.name,grams:x.grams,meal:x.meal,referenceConfirmed:x.referenceConfirmed}))}}:{})});
}
function confirmPlan(){if(invalidPlan.value||confirmed.value)return;confirmed.value=true;emit('confirm',{confirmationId:ready.value.confirmationId,date:ready.value.date,meal:ready.value.meal,items:ready.value.plan.items,onResult:result=>{confirmed.value=result.ok;if(!result.ok)inputError.value=result.error||'加入草稿失败，请重试。';}});}
function updateGrams(index,value){if(!ready.value)return;ready.value.plan.items[index].grams=Number(value);ready.value.plan.items[index].portion=portion(FOOD_BY_ID[ready.value.plan.items[index].foodId],Number(value));confirmed.value=false;}
const replacements=computed(()=>{
 let c;try{c=normalizeMealConditions(conditions);}catch{return [];}
 const options=c.availableFoods.length&&c.onlyAvailable?c.availableFoods.map(x=>FOOD_BY_ID[x.foodId]):ALL_FOODS;
 return options.filter(f=>f&&!f.__summary&&f.source&&allowedMealFood(f,c)&&!ready.value?.plan.items.some(i=>i.foodId===f.key)).slice(0,60);
});
function replaceFood(index){const food=FOOD_BY_ID[replacementId.value];if(!food||!replacements.value.some(f=>f.key===food.key))return;
 const old=ready.value.plan.items[index];ready.value.plan.items[index]={...old,foodId:food.key,name:food.name,portion:portion(food,old.grams),reason:'用户从符合当前回避条件的目录中替换；份量沿用，请核对。',sourceName:food.source?.name||'',source:food.source?.id||'',missing:[]};confirmed.value=false;replacing.value=-1;replacementId.value='';
}
const display=value=>typeof value==='number'&&Number.isFinite(value)?value.toLocaleString('zh-CN',{maximumFractionDigits:1}):'暂无数据';
</script>
<template>
 <section class="vb-glass vb-agent-card" aria-labelledby="meal-agent-title">
  <header class="vb-agent-heading"><span class="vb-icon-badge"><AppIcon name="sparkles" :size="21" /></span><div><p class="vb-eyebrow">家庭、外食与食堂 · 有依据的营养决策</p><h2 id="meal-agent-title">安排我的下一餐</h2><p>说清预算和回避项，结合你的备选食物检索与计算。方案先核对，实际吃过后再记录。</p></div></header>
  <form class="vb-agent-form" @submit.prevent="generate">   <div class="vb-campus-fields"><label>日期<input v-model="date" type="date" :max="todayDate()" :disabled="busy" /></label><label>餐次<select v-model="meal" :disabled="busy"><option v-for="[id,label] in mealOptions" :key="id" :value="id">{{ label }}</option></select></label><label>预算（元，可选）<input v-model="conditions.budget" type="number" min="0.01" max="1000" step="0.01" placeholder="例如20" :disabled="busy" /></label><label>不吃的食物<input v-model="conditions.avoids" maxlength="300" placeholder="例如花生、香菜，用逗号分开" :disabled="busy" /></label></div><div class="vb-analysis-tabs"><button type="button" class="vb-button vb-button-quiet" :disabled="busy" @click="conditions.budget='15'">预算15元</button><button v-for="p in ['清淡','素食偏好']" :key="p" type="button" class="vb-button vb-button-quiet" :disabled="busy" @click="conditions.preferences=p">{{ p }}</button><span>已选偏好：{{ conditions.preferences||'未设置' }}</span></div>
   <details class="vb-more-conditions"><summary>更多条件 · 目标、口味、运动与备选食物</summary>
   <label class="vb-agent-goal"><span>这餐想怎么安排？</span><textarea v-model="goal" rows="2" maxlength="500" :disabled="busy" placeholder="例如：这餐想吃清淡一些，选一份有主食、蔬菜和蛋白质食物的晚餐" /></label>
<div class="vb-campus-fields"><label>口味与饮食偏好<input v-model="conditions.preferences" maxlength="200" placeholder="例如清淡、喜欢家常菜" :disabled="busy" /></label><label>运动情况（可选）<input v-model="conditions.exercise" maxlength="200" placeholder="例如今天散步；仅作背景，不自动开运动营养处方" :disabled="busy" /></label></div>
   <details class="vb-campus-candidates"><summary>我能买到的食物与价格（可选）</summary><p>从目录选具体食物并核对生熟。复杂菜式的配料、份量和是否有售仍需自行确认；没有准确样本可在饮食记录中手动记账。</p><div class="vb-candidate-search"><input v-model="candidateQuery" aria-label="搜索备选食物" placeholder="搜索米饭、鸡肉、豆腐…" :disabled="busy" @input="candidateId=''" /><select v-model="candidateId" aria-label="选择具体食物" :disabled="busy||!candidates.length"><option value="" disabled>选择具体品种与状态</option><option v-for="food in candidates" :key="food.key" :value="food.key">{{ food.name }}</option></select><button type="button" class="vb-button vb-button-soft" :disabled="busy||!candidateId" @click="addCandidate">加入备选</button></div><div class="vb-candidate-list"><article v-for="(item,index) in conditions.availableFoods" :key="item.foodId"><strong>{{ item.name }}</strong><label>这份可食部（克）<input v-model.number="item.grams" type="number" min="0.1" max="5000" step="0.1" :disabled="busy" /></label><label>这份已知价格（元）<input v-model="item.price" type="number" min="0" max="1000" step="0.01" placeholder="未知则留空" :disabled="busy" /></label><button type="button" class="vb-text-button" :disabled="busy" @click="conditions.availableFoods.splice(index,1)">移除</button></article></div><label v-if="conditions.availableFoods.length" class="vb-agent-context-optin"><input v-model="conditions.onlyAvailable" type="checkbox" :disabled="busy" /><span>仅从这些备选食物中规划</span></label></details>
   </details>
   <label class="vb-agent-context-optin"><input v-model="shareHistory" type="checkbox" :disabled="busy" /><span>使用所选日期的 {{ history.length }} 项已记录食物<small>只发送食物、克数和餐次；备注、照片与聊天不随本次请求发送。</small></span></label>
   <label class="vb-agent-context-optin"><input v-model="shareSafety" type="checkbox" :disabled="busy" /><span>本次附带我已选择的安全提醒<small>用于提示核对，不生成疾病或特殊生理人群的营养处方。</small></span></label>
   <p class="vb-data-note">点击生成会把本次条件、基础身体档案和勾选的相关记录发送给维衡 AI。显式回避项会过滤目录，但本地库没有完整配料与交叉污染资料，不能保证过敏安全。</p>
   <p v-if="inputError" class="vb-field-error" role="alert">{{ inputError }}</p><button class="vb-button vb-button-primary" :disabled="busy||!goal.trim()"><span v-if="busy" class="vb-loading-ring" /><AppIcon v-else name="sparkles" :size="16" />{{ busy?'正在等待真实检索与计算…':ready?'按当前条件重新规划':'生成待确认方案' }}</button>
  </form>
  <div v-if="busy||progress.length" class="vb-agent-progress" role="status" aria-live="polite"><div><strong>{{ busy?'正在执行；仅展示已完成步骤':'本次实际执行记录' }}</strong><p v-if="busy">模型响应需要一些时间，完成的工具步骤会陆续显示。</p><ol><li v-for="(step,index) in progress" :key="index"><strong>{{ step.label }}</strong> · {{ step.resultSummary }}</li></ol></div></div>
  <div v-if="error" class="vb-agent-error" role="alert"><strong>没有生成可确认方案</strong><p>{{ error }}</p><button class="vb-button vb-button-quiet" :disabled="busy" @click="generate">保留条件并重试</button></div>
  <p v-if="response?.status==='needs_evidence'" class="vb-agent-error" role="status">{{ response.message }} 请修改备选食物或检索描述。</p>
  <section v-if="ready" class="vb-agent-plan">
   <div class="vb-agent-plan-heading"><div><p class="vb-eyebrow">待确认 · {{ ready.date }} · {{ mealOptions.find(x=>x[0]===ready.meal)?.[1] }}</p><h3>{{ ready.plan.title }}</h3></div><span class="vb-pill">确认后只加入草稿</span></div><p>{{ ready.plan.summary }}</p>
   <p class="vb-data-note">本次使用 {{ ready.contextSummary.itemCount }} 项已记录食物；{{ ready.contextSummary.targetsAvailable?'已结合档案估算目标':'档案不完整或不适用成人目标，本次不比较成人配额' }}。记录不保证涵盖全天。</p>
   <div v-if="cost" class="vb-campus-cost" :class="{'is-caution':cost.status==='over_budget'}"><h4>{{ cost.complete?'按录入价格估算：约 ¥'+display(cost.total):'价格待确认' }}</h4><p v-if="cost.budget!==null">本餐预算 ¥{{ cost.budget }} · {{ cost.status==='within_budget'?'按已录入价格估算在预算内':cost.status==='over_budget'?'当前份量估算超预算，请调整后再确认':'价格不完整，暂不能判断是否符合预算' }}</p><p v-if="!cost.complete">已知价格小计约 ¥{{ display(cost.knownSubtotal) }}，其余食物未计价。</p><small>{{ cost.basis }}。{{ cost.availability }}。</small></div>
   <div class="vb-agent-items"><article v-for="(item,index) in ready.plan.items" :key="item.foodId" class="vb-agent-item"><div class="vb-agent-item-title"><div><FoodImage :food="FOOD_BY_ID[item.foodId]" class="vb-plan-photo" :label="false" /><h4>{{ foodTitle(FOOD_BY_ID[item.foodId]) }}</h4><small>{{ foodState(FOOD_BY_ID[item.foodId]) }}</small><p>{{ item.reason }}</p></div><button type="button" class="vb-text-button" @click="ready.plan.items.splice(index,1);confirmed=false">移除</button></div><button type="button" class="vb-button vb-button-quiet" @click="replacing=index;replacementId=''">换一道</button><div v-if="replacing===index" class="vb-candidate-search"><select v-model="replacementId" aria-label="替换食物"><option value="">选择符合当前回避条件的食物</option><option v-for="f in replacements" :key="f.key" :value="f.key">{{ f.name }}</option></select><button type="button" class="vb-button vb-button-soft" :disabled="!replacementId" @click="replaceFood(index)">确认替换</button><p v-if="!replacements.length">暂无符合条件的替换项，请修改备选食物后重新规划。</p></div><label class="vb-agent-grams">可食部估算克数<input :value="item.grams" type="number" min="0.1" max="5000" step="0.1" @input="updateGrams(index,$event.target.value)" />克</label><div class="vb-agent-evidence"><small v-for="metric in [{id:'energy',name:'热量',unit:'kcal'},{id:'protein',name:'蛋白质',unit:'g'},{id:'carbs',name:'碳水',unit:'g'},{id:'fat',name:'脂肪',unit:'g'}]" :key="metric.id">{{ metric.name }} {{ display(item.portion[metric.id]) }}{{ item.portion[metric.id]!==null?' '+metric.unit:'' }}</small></div><details class="vb-agent-source"><summary>查看这份食物的依据</summary><p>状态：{{ FOOD_BY_ID[item.foodId]?.state }}</p><p>来源：<a v-if="FOOD_BY_ID[item.foodId]?.source" :href="FOOD_BY_ID[item.foodId].source.url" target="_blank" rel="noopener">{{ item.sourceName }} · {{ item.source }}</a><span v-else>暂无可核验成分数据</span></p><p>{{ FOOD_BY_ID[item.foodId]?.source?.description }}</p><p>每100克可食部 × 当前克数 ÷ 100。克数是规划估算，营养数据不是身体检测结果。</p><p v-if="item.missing.length">缺失指标：{{ item.missing.join('、') }}</p></details></article></div>
   <NutrientSummary :entries="entries" :targets="nutrition||{}" compact details />
   <p class="vb-data-note">上方小计按当前编辑的份量重新计算。原始工具记录对应生成时的方案；本餐占每日目标的比例不能证明全天达标。</p>
   <div class="vb-agent-notes" v-if="ready.plan.suggestions.length"><h4>执行建议</h4><ul><li v-for="item in ready.plan.suggestions" :key="item">{{ item }}</li></ul></div><div class="vb-agent-notes is-caution" v-if="ready.plan.cautions.length"><h4>需要核对</h4><ul><li v-for="item in ready.plan.cautions" :key="item">{{ item }}</li></ul></div>
   <details class="vb-agent-trace"><summary>原始工具调用与版本</summary><ol><li v-for="(step,index) in ready.trace" :key="index"><strong>{{ step.label }}</strong> · {{ step.inputSummary }} · {{ step.resultSummary }}</li></ol><small>{{ aiDisplayName(ready.model) }} · {{ ready.dataVersion }} · {{ new Date(ready.generatedAt).toLocaleString('zh-CN') }}</small></details>
   <SourcesNote /><div class="vb-agent-confirm"><p>仅在确认后加入“本次选择”。实际吃过后，在饮食记录中核对并保存当天记录。</p><button class="vb-button vb-button-primary" :disabled="confirmed||invalidPlan" @click="confirmPlan">{{ confirmed?'已加入草稿':'确认并加入饮食草稿' }}</button></div>
  </section>
 </section>
</template>
