<script setup>
import { computed,watch } from 'vue';
import {foodTitle,foodState} from '../lib/foodPresentation.js';
import { MACROS,formatNutrient } from '../lib/foodNutrition.js';
import { useFoodPhoto } from '../composables/useFoodPhoto.js';
import storedEstimates from '../data/foodEstimates.js';
import AppIcon from './AppIcon.vue';
import FoodImage from './FoodImage.vue';
import {ensureFoodDetails} from '../data/catalogue.js';
const props=defineProps({food:Object,compared:Boolean});defineEmits(['detail','compare']);
watch(()=>props.food.key,id=>{void ensureFoodDetails(id).catch(()=>{});},{immediate:true});
const {photo,loading,failed}=useFoodPhoto(()=>props.food);
const photoNote=computed(()=>photo.value?.imageNote||(loading.value?'正在按食材名称查找开放许可照片。':failed.value?'暂时未找到图片，可打开详情重新检索。':'图片来源将在详情中显示。'));
</script>
<template><article class="vb-food-card vb-glass"><button type="button" class="vb-food-card-open" :aria-label="'查看'+food.name+'详情'" @click="$emit('detail',food.key)"><FoodImage :food="food" :photo="photo" :loading="loading" :failed="failed" class="vb-food-card-image" :label="false" /><div class="vb-food-card-copy"><span class="vb-small-label">{{ food.categoryName }}</span><h3>{{ foodTitle(food) }}</h3><p>{{ foodState(food) }}</p><dl v-if="food.source"><div v-for="metric in MACROS" :key="metric.id"><dt>{{ metric.id==='carbs'?'碳水':metric.name }}</dt><dd>{{ formatNutrient(food.nutrients[metric.id]) }}<small v-if="food.nutrients[metric.id]!=null"> {{ metric.unit }}</small></dd></div></dl><p v-else class="vb-food-composition-note">按实际配方记录份量<br />{{ storedEstimates.estimates?.[food.key]?'已保存AI估算 · 查看范围与假设':'营养数据暂缺 · 可记录份量' }}</p></div></button><div class="vb-food-card-bottom"><span>{{ food.source?'每 100 克可食部':'按实际食用份量记录' }}</span><button v-if="!food.source" type="button" @click="$emit('detail',food.key)">查看与记录 →</button><button v-else type="button" :aria-pressed="compared" :class="{selected:compared}" @click="$emit('compare',food.key)"><AppIcon :name="compared?'check':'plus'" :size="13" />{{ compared?'已选对比':'加入对比' }}</button></div></article></template>

