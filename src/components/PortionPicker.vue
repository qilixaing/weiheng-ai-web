<script setup>
import {computed} from 'vue';
import {portionPresets} from '../lib/portionPresets.js';
const props=defineProps({food:Object});const emit=defineEmits(['choose']);
const options=computed(()=>portionPresets(props.food));
</script>
<template><div v-if="options.length" class="vb-portion-presets"><span>份量参考</span><button v-for="p in options" :key="p.label" class="vb-button vb-button-quiet" type="button" @click="emit('choose',p.grams)">{{ p.label }}</button><small>界面估重示例，非标准量具；请按实际大小修改克数。杯按重量估计，不将毫升直接换算为克。</small></div></template>
