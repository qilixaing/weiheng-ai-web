<script setup>
import {ref,computed,watch} from 'vue';
import {FOOD_BY_ID,searchFoods} from '../data/catalogue.js';
import {localGet,localPut,localDelete} from '../lib/localDatabase.js';
import {aiRequest} from '../lib/aiClient.js';
import {useLocalNutrition} from '../composables/useLocalNutrition.js';
import DiaryPhotoPicker from './DiaryPhotoPicker.vue';
import AppIcon from './AppIcon.vue';
import { aiDisplayName } from '../lib/aiBranding.js';
const props=defineProps({draft:Object,legacyPhoto:Object});const emit=defineEmits(['confirm']);
const {state}=useLocalNutrition();const photo=ref(null),localError=ref('');
// Keep an in-flight request alive across Vue workbench switches. The component
// is recreated when the user returns to the diary, but this module remains.
const recognitionJobs=new Map();
const recognition=computed(()=>props.draft.recognition);
const recognitionTime=computed(()=>{const value=recognition.value?.generatedAt;if(!value)return'';const date=new Date(value);return Number.isNaN(date.getTime())?'':new Intl.DateTimeFormat('zh-CN',{dateStyle:'short',timeStyle:'short'}).format(date);});
const canConfirm=computed(()=>recognition.value?.items?.length&&!recognition.value.confirmed&&recognition.value.items.every(item=>item.name?.trim()&&Number.isFinite(Number(item.grams))&&Number(item.grams)>=0.1&&Number(item.grams)<=5000));
watch(()=>[props.draft.date,props.draft.photoId],async([date,id])=>{localError.value='';photo.value=null;try{if(id){const stored=await localGet('photos',id);if(props.draft.date!==date||props.draft.photoId!==id)return;photo.value=stored||null;if(stored?.dataUrl&&props.draft.recognition?.status==='pending'&&props.draft.recognition.photoId===id)void recognize(stored,{resume:true});else if(!stored&&props.draft.recognition?.status==='pending')props.draft.recognition={...props.draft.recognition,status:'failed',error:'照片文件已不可用，请重新选择照片。'};}else if(props.legacyPhoto?.dataUrl){const value={...props.legacyPhoto,id:crypto.randomUUID(),date};await localPut('photos',value);if(props.draft.date===date){props.draft.photoId=value.id;photo.value=value;}}}catch(error){localError.value=error.message;photo.value=props.legacyPhoto||null;}},{immediate:true});
function updatePhoto(value){photo.value=value;if(!value)clearPhoto();}
async function clearPhoto(){const old=props.draft.photoId;props.draft.photoId=null;props.draft.recognition=null;if(old&&!state.records.some(record=>record.photoId===old)&&!Object.values(state.drafts).some(draft=>draft.photoId===old))try{await localDelete('photos',old);}catch(error){localError.value=error.message;}}
async function selected(value){const date=props.draft.date,id=crypto.randomUUID();localError.value='';try{const saved={...value,id,date,createdAt:new Date().toISOString()};await localPut('photos',saved);if(props.draft.date!==date)return;photo.value=saved;props.draft.photoId=id;props.draft.recognition=null;await recognize(saved);}catch(error){localError.value=error.message;}}
async function runRecognitionJob(image,key){
 try{return await aiRequest('recognize',{image,requestId:key});}
 catch(error){
  if(['NOT_CONFIGURED','INVALID_CONFIG','INVALID_IMAGE','AUTH_FAILED','INSUFFICIENT_BALANCE','RATE_LIMITED','MODEL_REQUEST'].includes(error?.code)||error?.message?.includes('超时'))throw error;
  await new Promise(resolve=>setTimeout(resolve,700));
  return aiRequest('recognize',{image,requestId:key});
 }
}
async function recognize(value=photo.value,{resume=false}={}){
 if(!value?.dataUrl)return;
 const draft=props.draft,photoId=draft.photoId,pending=draft.recognition?.status==='pending'&&draft.recognition.photoId===photoId?draft.recognition:null;
 if(pending&&!resume)return;
 const requestId=resume&&pending?.requestId?pending.requestId:crypto.randomUUID();
 if(!resume||!pending)draft.recognition={requestId,photoId,status:'pending',startedAt:new Date().toISOString(),items:[],error:'',confirmed:false};
 try{
  const key=photoId||requestId;let job=recognitionJobs.get(key);
  if(!job){job=runRecognitionJob(value.dataUrl,key);recognitionJobs.set(key,job);job.finally(()=>{if(recognitionJobs.get(key)===job)recognitionJobs.delete(key);}).catch(()=>{});}
  const result=await job;
  if(draft.photoId!==photoId||draft.recognition?.requestId!==requestId)return;
  draft.recognition={...result,requestId,photoId,status:'complete',error:'',confirmed:false};
 }catch(error){
  if(draft.photoId===photoId&&draft.recognition?.requestId===requestId)draft.recognition={...draft.recognition,status:'failed',error:error.message};
 }
}
function rename(item,event){item.name=event.target.value;item.foodId=null;}
function match(item,food){item.foodId=food.key;item.name=food.name;}
function addOmitted(){props.draft.recognition={...props.draft.recognition,status:'complete',recognitionId:props.draft.recognition?.recognitionId||crypto.randomUUID(),items:props.draft.recognition?.items||[],confirmed:false,error:'',note:props.draft.recognition?.note||'手动补充，请核对名称与份量。'};props.draft.recognition.items.push({id:crypto.randomUUID(),name:'',foodId:null,grams:null,uncertainty:'手动补充，请填写实际可食部重量。'});}
function confirm(){if(!canConfirm.value)return;emit('confirm',{batchId:recognition.value.recognitionId,items:recognition.value.items.map(item=>({...item,estimated:true,source:'photo'}))});}
</script>
<template><section class="vb-glass vb-photo-card"><div class="vb-aside-heading"><div><h2>这一餐的照片</h2><p>拍一餐，核对后再记入。</p></div><span class="vb-photo-badge"><AppIcon name="camera" :size="16" /></span></div><p class="vb-photo-disclosure">选择照片后自动识别：压缩照片会经本地后端发送给维衡 AI。照片与识别结果保存在当前浏览器。</p><DiaryPhotoPicker :model-value="photo" @update:model-value="updatePhoto" @selected="selected" /><p v-if="localError" class="vb-feature-error" role="alert">{{ localError }}</p><div v-if="recognition?.status==='pending'" class="vb-ai-progress" role="status"><span class="vb-loading-ring" /><div><strong>正在识别这一餐…</strong><small>识别食物与份量，结果需要你核对。</small></div></div><div v-if="recognition?.status==='failed'" class="vb-recognition-failed"><p class="vb-feature-error" role="alert">{{ recognition.error }}</p><div><button type="button" class="vb-text-button" @click="recognize()">重新识别</button><button type="button" class="vb-text-button" @click="addOmitted">手动录入</button></div></div><button v-if="photo&&!recognition" type="button" class="vb-button vb-button-quiet" @click="recognize()">开始 AI 识别</button><div v-if="recognition?.status==='complete'" class="vb-recognition-results"><p class="vb-data-note">{{ recognition.note||'请核对食物名称与份量。' }} 照片克数为 AI 估重，需你核对；营养分析会汇总数据库值与明确标注的 AI 宏量营养估算，其他缺失项仍保持未知。</p><small v-if="recognition.model" class="vb-recognition-meta">由 {{ aiDisplayName(recognition.model) }} 识别<span v-if="recognitionTime"> · {{ recognitionTime }}</span></small><div class="vb-recognized-list"><div v-for="(item,index) in recognition.items" :key="item.id" class="vb-recognized-item"><div><input :value="item.name" :disabled="recognition.confirmed" :aria-label="'识别食物'+(index+1)+'名称'" placeholder="输入食物名称" @input="rename(item,$event)" /><button v-if="!recognition.confirmed" type="button" class="vb-icon-button" :aria-label="'删除识别项'+(index+1)" @click="recognition.items.splice(index,1)"><AppIcon name="close" :size="14" /></button></div><div class="vb-recognition-matches" v-if="!item.foodId&&!recognition.confirmed"><button v-for="food in searchFoods(item.name,3)" :key="food.key" type="button" @click="match(item,food)">{{ food.name }}</button></div><label class="vb-recognition-weight">估算可食部<input v-model="item.grams" type="number" min="0.1" max="5000" step="0.1" :disabled="recognition.confirmed" :aria-label="'识别食物'+(index+1)+'克数'" placeholder="克数" />克</label><small :class="{'vb-unmatched':!item.foodId}">{{ item.foodId?('数据库：'+FOOD_BY_ID[item.foodId]?.state):'未匹配数据库，营养指标暂无数据' }}</small><small>{{ item.uncertainty }}</small></div></div><p v-if="!recognition.items.length" class="vb-data-note">没有识别到可靠的食物项目。可更换照片、重试或手动添加。</p><div class="vb-recognition-actions"><button v-if="!recognition.confirmed" type="button" class="vb-text-button" @click="addOmitted">＋补充遗漏食物</button><button type="button" class="vb-button vb-button-primary" :disabled="!canConfirm" @click="confirm">{{ recognition.confirmed?'已加入本次选择':'确认并加入记录' }}</button></div></div></section></template>

