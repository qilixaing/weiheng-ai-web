<script setup lang="ts">
import { computed } from 'vue';
import { calculateIntake,MACROS,NUTRIENTS,formatNutrient } from '../lib/foodNutrition.js';
import type { IntakeSummary, NutritionTargets } from '../types/nutrition';

const props = withDefaults(defineProps<{
  entries?: unknown[];
  summary?: IntakeSummary;
  targets?: NutritionTargets | null;
  compact?: boolean;
  details?: boolean;
}>(), {
  entries: () => [],
  summary: undefined,
  targets: null,
  compact: false,
  details: false,
});

const intake = computed<IntakeSummary>(() => props.summary || calculateIntake(props.entries));
const targetFor = (id: string): number | undefined => id === 'energy'
  ? props.targets?.tdee
  : props.targets?.macros?.find((item) => item.id === id)?.grams;
</script>
<template><div class="vb-nutrition-summary" :class="{'is-compact':compact}"><div class="vb-intake-grid"><div v-for="metric in MACROS" :key="metric.id"><span>{{ metric.id==='carbs'?'碳水':metric.name }}</span><strong>{{ formatNutrient(intake.totals[metric.id].value) }}<small v-if="intake.totals[metric.id].value!==null"> {{ metric.unit }}</small></strong><small>{{ intake.totals[metric.id].value===null?'当前条目无可计算数据':intake.totals[metric.id].complete?'记录内合计':'已知小计，存在缺失' }}</small><small v-if="targetFor(metric.id)">目标 {{ formatNutrient(targetFor(metric.id)) }} {{ metric.unit }}</small></div></div><p class="vb-data-note">按可食部重量计算 · {{ intake.knownEnergyCount }}/{{ intake.itemCount }} 项有已确认热量数据。记录可能未覆盖全天。</p><details v-if="details" class="vb-intake-more"><summary>查看其他营养指标</summary><dl><template v-for="metric in NUTRIENTS.slice(4)" :key="metric.id"><dt>{{ metric.name }}</dt><dd>{{ formatNutrient(intake.totals[metric.id].value) }} <small v-if="intake.totals[metric.id].value!==null">{{ metric.unit }}{{ intake.totals[metric.id].complete?'':' · 已知小计' }}</small></dd></template></dl></details></div></template>
