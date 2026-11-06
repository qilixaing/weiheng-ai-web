<script setup>
import {ref,watch,onBeforeUnmount} from 'vue';
import {aiRequest} from '../lib/aiClient.js';
import {MACROS} from '../lib/foodNutrition.js';
import {appStorage} from '../lib/storageScope.js';
import {estimatePoint} from '../lib/nutritionEstimate.js';
import storedEstimates from '../data/foodEstimates.js';
import { aiDisplayName } from '../lib/aiBranding.js';
const props=defineProps({food:Object});const emit=defineEmits(['resolved']);
const loading=ref(false),error=ref(''),result=ref(null),recipe=ref('');let sequence=0;
function loadStored(food){try{const cached=JSON.parse(appStorage.getItem('weiheng.food-estimate.'+food?.key)||'null');if(cached?.estimate){result.value={...cached,cached:true};recipe.value=cached.recipe||'';emit('resolved',result.value);return true;}}catch{}const row=storedEstimates.estimates?.[food?.key];if(!row)return false;result.value={foodId:food.key,status:'complete',basisGrams:100,valueType:'ai-estimate',cached:true,model:row.model,generatedAt:row.generatedAt,estimate:{entryId:food.key,name:food.name,grams:100,values:row.values,assumption:row.assumption}};emit('resolved',result.value);return true;}
async function estimate(){const id=++sequence,foodId=props.food?.key;loading.value=true;error.value='';result.value=null;emit('resolved',null);
 try{const value=await aiRequest('food-estimate',{foodId,recipe:recipe.value.trim()});if(id!==sequence)return;result.value=value;try{appStorage.setItem('weiheng.food-estimate.'+foodId,JSON.stringify({...value,recipe:recipe.value}));}catch{error.value='估算已返回，但本机缓存保存失败。';}emit('resolved',value);}
 catch(e){if(id===sequence)error.value=e.message;}finally{if(id===sequence)loading.value=false;}}
watch(()=>props.food?.key,()=>{sequence++;recipe.value='';error.value='';loading.value=false;result.value=null;if(props.food)loadStored(props.food);},{immediate:true});
onBeforeUnmount(()=>{sequence++;});
const singleEstimate=(value,unit)=>estimatePoint(value,unit);
const legacyRange=()=>Object.values(result.value?.estimate?.values||{}).some(value=>value&&typeof value.value!=='number'&&typeof value.low==='number'&&typeof value.high==='number');
</script>
<template><section class="vb-food-estimate vb-glass" aria-live="polite"><h3>{{ result?'AI 估算参考':'AI 营养估算' }}</h3><p v-if="result?.estimate"><strong>每100克可食部 · AI单值参考，不是数据库值</strong></p><p v-else>只估算缺失的热量、蛋白质、碳水和脂肪；数据库已有的营养数值保持原样。</p><p v-if="loading" role="status">正在估算…</p><div v-if="result?.estimate"><div class="vb-portion-macros"><div v-for="metric in MACROS.filter(m=>singleEstimate(result.estimate.values[m.id],m.unit)!==null)" :key="metric.id"><span>{{ metric.name }}</span><strong>{{ singleEstimate(result.estimate.values[metric.id],metric.unit) }} <small>{{ metric.unit }}</small></strong></div></div><p>{{ legacyRange()?'旧估算范围按上下限中点换为单值参考；':'' }}{{ result.estimate.assumption }}</p><small v-if="result.cached">已保存的预估 · {{ aiDisplayName(result.model||result.requestedModel) }} · {{ result.generatedAt }} · 基准100克；不在查询时重新调用AI。</small><small>按常见品种与做法给出单一参考值。实际配方、用油和份量会造成误差；维生素和矿物质仍显示未知。</small></div><p v-if="error" class="vb-feature-error" role="alert">{{ error }}</p><details class="vb-estimate-adjust"><summary>{{ result?'按实际做法调整估算':'补充实际做法（可选）' }}</summary><label class="vb-field">原料与做法<textarea v-model="recipe" maxlength="800" rows="2" placeholder="例如：番茄、鸡蛋，用少量油炒；或注明酱料、糖、奶油等" /></label><button type="button" class="vb-button vb-button-soft" :disabled="loading" @click="estimate">{{ loading?'估算中…':error?'重试估算':result?'按补充内容重新估算':'生成估算' }}</button></details></section></template>
