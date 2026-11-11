<script setup lang="ts">
import { computed } from 'vue';
import { calculateIntake,MACROS,NUTRIENTS,formatNutrient,formatTotal } from '../lib/foodNutrition.js';
import { estimateMidpoint } from '../lib/nutritionEstimate.js';
import type { IntakeSummary, NutritionTargets } from '../types/nutrition';

const props = withDefaults(defineProps<{
  entries?: unknown[];
  summary?: IntakeSummary;
  targets?: NutritionTargets | null;
  compact?: boolean;
  chart?: boolean;
  details?: boolean;
  estimating?: boolean;
}>(), {
  entries: () => [],
  summary: undefined,
  targets: null,
  compact: false,
  chart: false,
  details: false,
  estimating: false,
});

const intake = computed<IntakeSummary>(() => props.summary || calculateIntake(props.entries));
const rawValue = (total: IntakeSummary['totals'][string]): number | null => {
  const value = total?.range ? estimateMidpoint(total.range) : total?.value;
  return value === null || value === undefined || !Number.isFinite(Number(value)) ? null : Number(value);
};
const formatChartValue = (value: number | null): string => value === null
  ? '暂无数据'
  : value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const niceScaleMax = (value: number): number => {
  if (!Number.isFinite(value) || value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const step = power / 2;
  const rounded = Math.ceil(value / step) * step;
  return rounded > value ? rounded : rounded + step;
};
const chartRows = computed(() => {
  const rows = MACROS.map((metric) => {
  const total = intake.value.totals[metric.id];
  const value = rawValue(total);
  return {
    id: metric.id,
    name: metric.id === 'carbs' ? '碳水' : metric.name,
    unit: metric.unit,
    value,
    total,
    axis: metric.id === 'energy' ? 'energy' : 'grams',
    tone: metric.id === 'energy' ? 'energy' : metric.id,
  };
  });
  return [...rows.filter(row => row.axis === 'grams'), ...rows.filter(row => row.axis === 'energy')];
});
const chartScales = computed(() => {
  const energy = chartRows.value.find(row => row.axis === 'energy')?.value || 0;
  const grams = Math.max(0, ...chartRows.value.filter(row => row.axis === 'grams').map(row => row.value || 0));
  return { energy: niceScaleMax(energy), grams: niceScaleMax(grams) };
});
const chartBarPercent = (value: number | null, max: number): number =>
  value === null ? 0 : Math.min(82, value / max * 82);
const chartDescription = computed(() => chartRows.value.map(row => `${row.name} ${formatChartValue(row.value)} ${row.unit}`).join('；'));
const estimateNote = computed(() => {
  if (props.estimating) return 'AI 正在分析';
  const hasEstimate = chartRows.value.some(row => row.total.range);
  const incomplete = chartRows.value.some(row => !row.total.complete);
  return [hasEstimate && '含 AI 估算', incomplete && '数据不完整'].filter(Boolean).join(' · ') || '记录内合计';
});
const targetFor = (id: string): number | undefined => id === 'energy'
  ? props.targets?.tdee
  : props.targets?.macros?.find((item) => item.id === id)?.grams;
</script>
<template><div class="vb-nutrition-summary" :class="{'is-compact':compact}">
  <div v-if="chart" class="vb-intake-chart-shell" role="img" :aria-label="`已记录营养摄入柱状图：${chartDescription}。热量使用 kcal 刻度，三大营养素使用 g 刻度。`">
    <div class="vb-intake-chart-axis vb-intake-chart-axis-left" aria-hidden="true"><span>{{ formatNutrient(chartScales.grams) }} g</span><span>{{ formatNutrient(chartScales.grams / 2) }} g</span><span>0 g</span></div>
    <div class="vb-intake-chart-plot">
      <div v-for="row in chartRows" :key="row.id" class="vb-intake-chart-item">
        <div class="vb-intake-chart-stage">
          <span v-if="row.value !== null" class="vb-intake-chart-value" :style="{'--bar-height': `${chartBarPercent(row.value, chartScales[row.axis])}%`}">{{ formatChartValue(row.value) }}<small> {{ row.unit }}</small></span>
          <span v-else class="vb-intake-chart-value vb-intake-chart-empty">{{ estimating ? '估算中' : '暂无数据' }}</span>
          <span v-if="row.value !== null" class="vb-intake-chart-bar" :class="row.tone" :style="{'--bar-height': `${chartBarPercent(row.value, chartScales[row.axis])}%`}" />
        </div>
        <span class="vb-intake-chart-label">{{ row.name }}</span>
      </div>
    </div>
    <div class="vb-intake-chart-axis vb-intake-chart-axis-right" aria-hidden="true"><span>{{ formatNutrient(chartScales.energy) }} kcal</span><span>{{ formatNutrient(chartScales.energy / 2) }} kcal</span><span>0 kcal</span></div>
    <p class="vb-intake-chart-note">{{ estimateNote }}</p>
  </div>
  <div v-else class="vb-intake-grid"><div v-for="metric in MACROS" :key="metric.id"><span>{{ metric.id==='carbs'?'碳水':metric.name }}</span><strong>{{ estimating&&intake.totals[metric.id].value===null&&!intake.totals[metric.id].range?'正在估算…':formatTotal(intake.totals[metric.id]) }}<small v-if="(intake.totals[metric.id].value!=null||intake.totals[metric.id].range)"> {{ metric.unit }}</small></strong><small>{{ estimating&&intake.totals[metric.id].value===null&&!intake.totals[metric.id].range?'AI正在分析已识别食物':intake.totals[metric.id].range?(intake.totals[metric.id].complete?'含AI估算':'含AI估算 · 数据不完整'):intake.totals[metric.id].value===null?'数据不完整':intake.totals[metric.id].complete?'记录内合计':'数据不完整' }}</small><small v-if="targetFor(metric.id)">目标 {{ formatNutrient(targetFor(metric.id)) }} {{ metric.unit }}</small></div></div>
  <details class="vb-intake-more"><summary>查看计算依据</summary><p class="vb-data-note">按可食部重量计算 · {{ estimating?'AI正在估算缺失的能量与三大营养素。':`${intake.knownEnergyCount}/${intake.itemCount} 项有热量数值（含AI估算）。记录可能未覆盖全天。` }}</p><p v-for="metric in MACROS" :key="metric.id">{{ metric.name }}：数据库小计 {{ intake.totals[metric.id].value===null?'—':formatNutrient(intake.totals[metric.id].value) }} {{ metric.unit }}<span v-if="intake.totals[metric.id].range">；另含 {{ intake.totals[metric.id].estimatedCount }} 项AI单值估算，计入后为 {{ formatTotal(intake.totals[metric.id]) }} {{ metric.unit }}。旧范围按上下限中点换算。</span><span v-if="!intake.totals[metric.id].complete">；数据不完整</span></p></details><details v-if="details" class="vb-intake-more"><summary>查看其他营养指标</summary><dl><template v-for="metric in NUTRIENTS.slice(4)" :key="metric.id"><dt>{{ metric.name }}</dt><dd>{{ formatTotal(intake.totals[metric.id]) }} <small v-if="intake.totals[metric.id].value!==null">{{ metric.unit }}{{ intake.totals[metric.id].complete?'':' · 已知小计' }}</small></dd></template></dl></details></div></template>
