<script setup>
import {ref,computed,watch} from 'vue';
import {foodTitle,foodState} from '../lib/foodPresentation.js';
import {sampleChoices,sampleLabel} from '../lib/foodSamples.js';
import {FOOD_BY_ID} from '../data/catalogue.js';
import {calculateIntake,formatTotal,MACROS,NUTRIENTS,MEALS,formatNutrient,todayDate} from '../lib/foodNutrition.js';
import {createNutritionSnapshot} from '../lib/nutritionSnapshot.js';
import {useFoodPhoto} from '../composables/useFoodPhoto.js';
import FoodNutritionEstimate from './FoodNutritionEstimate.vue';
import PortionPicker from './PortionPicker.vue';
import FoodImage from './FoodImage.vue';
import ModalShell from './ModalShell.vue';
import AppIcon from './AppIcon.vue';
const props=defineProps({foodId:String});const emit=defineEmits(['close','add']);
const selectedId=ref(props.foodId),grams=ref(100),date=ref(todayDate()),meal=ref('unspecified'),aiEstimate=ref(null);
watch(()=>props.foodId,id=>{selectedId.value=id;});watch(selectedId,()=>{aiEstimate.value=null;});
const food=computed(()=>FOOD_BY_ID[selectedId.value]);
const choices=computed(()=>sampleChoices(FOOD_BY_ID[props.foodId]));
const needsEstimate=computed(()=>MACROS.some(m=>typeof food.value?.nutrients?.[m.id]!=='number'));
const snapshot=computed(()=>createNutritionSnapshot(food.value,needsEstimate.value?aiEstimate.value:null));
const totals=computed(()=>calculateIntake([{foodId:food.value.key,grams:Number(grams.value),nutritionSnapshot:snapshot.value}]).totals);
const valid=computed(()=>Number(grams.value)>=0.1&&Number(grams.value)<=5000&&date.value&&date.value<=todayDate());
const {photo,loading:photoLoading,failed:photoFailed}=useFoodPhoto(()=>food.value);
const credit=computed(()=>photo.value?.imageCredit||photo.value);
function add(){if(valid.value)emit('add',{foodId:food.value.key,grams:Number(grams.value),date:date.value,meal:meal.value,nutritionSnapshot:snapshot.value});}
</script>
<template><ModalShell v-if="food" title="食物详情" wide @close="$emit('close')">
 <div class="vb-food-detail-top"><figure><FoodImage :food="food" :photo="photo" :loading="photoLoading" :failed="photoFailed" :label="false" :lazy="false" class="vb-food-detail-image" /></figure><div><p class="vb-eyebrow">{{ food.categoryName }}</p><h1>{{ sampleLabel(food.key)||foodTitle(food) }}</h1><p class="vb-food-state">{{ foodState(food) }}</p><span class="vb-pill">{{ food.source?'数据库':aiEstimate?'AI估算':'数据不完整' }}</span>
 <label v-if="choices.length" class="vb-field">选择营养样本<select v-model="selectedId" aria-label="选择营养样本"><option v-if="!choices.some(c=>c.id===props.foodId)" :value="props.foodId">当前食物 · {{ FOOD_BY_ID[props.foodId]?.source?'数据库':'通用估算' }}</option><option v-for="c in choices" :key="c.id" :value="c.id">{{ c.label }}</option></select><small>按实际品种和做法选择，不同样本分别计算。</small></label>
 </div></div>
 <details v-if="needsEstimate" class="vb-intake-more"><summary>查看估算依据与调整</summary><FoodNutritionEstimate :food="food" @resolved="aiEstimate=$event" /></details>
 <form class="vb-food-portion-form" @submit.prevent="add"><PortionPicker :food="food" @choose="grams=$event" /><div class="vb-portion-controls"><label>可食部重量<input v-model="grams" type="number" min="0.1" max="5000" step="0.1" aria-label="实际食用克数" /><small>克</small></label><label>记录日期<input v-model="date" type="date" :max="todayDate()" required /></label><label>餐次<select v-model="meal"><option v-for="[key,label] in MEALS" :key="key" :value="key">{{ label }}</option></select></label></div>
 <div class="vb-portion-macros"><div v-for="metric in MACROS" :key="metric.id"><span>{{ metric.id==='carbs'?'碳水':metric.name }}</span><strong>{{ formatTotal(totals[metric.id]) }} <small v-if="totals[metric.id].value!=null||totals[metric.id].range">{{ metric.unit }}</small></strong><small v-if="totals[metric.id].range">AI估算</small></div></div>
 <button class="vb-button vb-button-primary" type="submit" :disabled="!valid"><AppIcon name="plus" :size="16" />添加记录</button><small class="vb-data-note">加入本次选择，实际吃过后保存当天记录。</small></form>
 <details class="vb-food-all-nutrients"><summary>查看完整营养与依据</summary><p>每100克可食部；未知值不按0计算。范围为AI估算，非实测值。</p><div class="vb-nutrient-table"><div class="vb-nutrient-table-head"><span>营养指标</span><span>每100克数据库值</span><span>本份 {{ grams }} 克</span></div><div v-for="metric in NUTRIENTS" :key="metric.id"><span>{{ metric.name }}</span><span>{{ formatNutrient(food.nutrients[metric.id]) }} {{ food.nutrients[metric.id]!=null?metric.unit:'' }}</span><span>{{ formatTotal(totals[metric.id]) }} {{ totals[metric.id].value!=null||totals[metric.id].range?metric.unit:'' }}{{ totals[metric.id].range?' · AI估算':'' }}</span></div></div>
 <p>完整样本：{{ food.name }}</p><p v-if="food.source"><a :href="food.source.url" target="_blank" rel="noopener">{{ food.source.name }}</a> · {{ food.source.id }} · {{ food.source.license }}<br />{{ food.source.description }}</p><p v-else>当前食物无可靠配方成分表；仅显示已保存的AI宏量营养估算，其余未知。</p><p>碳水为差减法，维A采用RAE，叶酸采用DFE；不同口径不直接换算。</p><p v-if="credit">图片：<a :href="credit.sourceUrl" target="_blank" rel="noopener">{{ credit.title }}</a> / {{ credit.author }} · <a :href="credit.licenseUrl" target="_blank" rel="noopener">{{ credit.license }}</a> · {{ credit.modifications }}</p>
 </details>
 </ModalShell></template>
