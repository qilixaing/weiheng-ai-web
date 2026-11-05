<script setup>
import {ref,watch} from 'vue';
import {sampleLabel} from '../lib/foodSamples.js';
import AppIcon from './AppIcon.vue';
defineOptions({inheritAttrs:true});
const props=defineProps({food:Object,photo:Object,loading:Boolean,failed:Boolean,label:{type:Boolean,default:true},lazy:{type:Boolean,default:true}});
const emit=defineEmits(['image-error']);const broken=ref(false);watch(()=>props.photo?.image,()=>broken.value=false);
</script>
<template><div class="vb-food-visual" :class="{'is-unavailable':!photo?.image||broken,'is-loading':loading}"><img v-if="photo?.image&&!broken" :src="photo.image" :alt="food?.imageAlt||food?.name" :loading="lazy?'lazy':'eager'" decoding="async" @error="broken=true;emit('image-error')" /><div v-else class="vb-food-photo-placeholder"><AppIcon name="bowl" :size="35" /><strong>{{ sampleLabel(food?.key)||String(food?.name||'').split(' · ')[0] }}</strong><small>{{ loading?'正在加载照片…':'该营养样本暂无单独照片' }}</small></div><span v-if="label&&photo?.image&&!broken" :class="{'is-generated':photo.imageCredit?.generated,'is-online':photo.onlineCandidate}">{{ photo.imageLabel||'食物照片' }}</span></div></template>
