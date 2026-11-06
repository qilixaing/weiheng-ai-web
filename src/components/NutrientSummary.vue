<script setup lang="ts">
import { computed } from 'vue';
import { calculateIntake,MACROS,NUTRIENTS,formatNutrient,formatTotal } from '../lib/foodNutrition.js';
import type { IntakeSummary, NutritionTargets } from '../types/nutrition';

const props = withDefaults(defineProps<{
  entries?: unknown[];
  summary?: IntakeSummary;
  targets?: NutritionTargets | null;
  compact?: boolean;
  details?: boolean;
  estimating?: boolean;
}>(), {
  entries: () => [],
  summary: undefined,
  targets: null,
  compact: false,
  details: false,
  estimating: false,
});

const intake = computed<IntakeSummary>(() => props.summary || calculateIntake(props.entries));
const targetFor = (id: string): number | undefined => id === 'energy'
  ? props.targets?.tdee
  : props.targets?.macros?.find((item) => item.id === id)?.grams;
</script>
<template><div class="vb-nutrition-summary" :class="{'is-compact':compact}"><div class="vb-intake-grid"><div v-for="metric in MACROS" :key="metric.id"><span>{{ metric.id==='carbs'?'碳水':metric.name }}</span><strong>{{ estimating&&intake.totals[metric.id].value===null&&!intake.totals[metric.id].range?'正在估算…':formatTotal(intake.totals[metric.id]) }}<small v-if="(intake.totals[metric.id].value!=null||intake.totals[metric.id].range)"> {{ metric.unit }}</small></strong><small>{{ estimating&&intake.totals[metric.id].value===null&&!intake.totals[metric.id].range?'AI正在分析已识别食物':intake.totals[metric.id].range?(intake.totals[metric.id].complete?'含AI估算':'含AI估算 · 数据不完整'):intake.totals[metric.id].value===null?'数据不完整':intake.totals[metric.id].complete?'记录内合计':'数据不完整' }}</small><small v-if="targetFor(metric.id)">目标 {{ formatNutrient(targetFor(metric.id)) }} {{ metric.unit }}</small></div></div><details class="vb-intake-more"><summary>查看计算依据</summary><p class="vb-data-note">按可食部重量计算 · {{ estimating?'AI正在估算缺失的能量与三大营养素。':`${intake.knownEnergyCount}/${intake.itemCount} 项有热量数值（含AI估算）。记录可能未覆盖全天。` }}</p><p v-for="metric in MACROS" :key="metric.id">{{ metric.name }}：数据库小计 {{ intake.totals[metric.id].value===null?'—':formatNutrient(intake.totals[metric.id].value) }} {{ metric.unit }}<span v-if="intake.totals[metric.id].range">；另含 {{ intake.totals[metric.id].estimatedCount }} 项AI单值估算，计入后为 {{ formatTotal(intake.totals[metric.id]) }} {{ metric.unit }}。旧范围按上下限中点换算。</span><span v-if="!intake.totals[metric.id].complete">；数据不完整</span></p></details><details v-if="details" class="vb-intake-more"><summary>查看其他营养指标</summary><dl><template v-for="metric in NUTRIENTS.slice(4)" :key="metric.id"><dt>{{ metric.name }}</dt><dd>{{ formatTotal(intake.totals[metric.id]) }} <small v-if="intake.totals[metric.id].value!==null">{{ metric.unit }}{{ intake.totals[metric.id].complete?'':' · 已知小计' }}</small></dd></template></dl></details></div></template>
