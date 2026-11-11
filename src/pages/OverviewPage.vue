<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';
import { ACTIVITIES, getAgeBand } from '../lib/nutrition.js';
import { overviewNutrition, lifeStageMicronutrients } from '../lib/lifeStageNutrition.js';
import { formatNutrient, todayDate } from '../lib/foodNutrition.js';
import { intakeTrend } from '../lib/intakeAnalysis.js';
import { estimateMidpoint } from '../lib/nutritionEstimate.js';
import AppIcon from '../components/AppIcon.vue';
const IntakeAnalysis = defineAsyncComponent(() => import('../components/IntakeAnalysis.vue'));
import SourcesNote from '../components/SourcesNote.vue';
const props = defineProps({ profile: Object, nutrition: Object, recordCount: Number, records: Array, reports: Array, deferIntake: Boolean });
const nutrition = computed(() => overviewNutrition(props.profile));
const micro = computed(() => lifeStageMicronutrients(props.profile));
const hasMicro = computed(() => micro.value.vitamins.length > 0);
const activity = computed(() => ACTIVITIES.find(item => item.key === props.profile.activity));
const missingProfileFields = computed(() => [
  !props.profile.sex && '性别',
  (props.profile.age == null || props.profile.age === '') && '年龄',
  (props.profile.height == null || props.profile.height === '') && '身高',
  (props.profile.weight == null || props.profile.weight === '') && '体重',
  !activity.value && '活动水平'
].filter(Boolean).join('、'));
const calculationNotice = computed(() => props.profile?.physiologicalStage && props.profile.physiologicalStage !== 'general' ? '孕期、哺乳期或其他特殊情况需匹配专门参考，暂不套用通用目标。' : Number(props.profile?.age)===0 && (props.profile?.ageMonths==null||props.profile.ageMonths==='') ? '请补充0–11个月月龄后匹配参考；婴儿不使用成人目标。' : `补充${missingProfileFields.value || '有效的身体档案'}后显示能量估算。未填写的数据保持未知，不按 0 计算。`);
const macroLabels = [
  { id:'protein', name:'蛋白质', color:'sage' },
  { id:'fat', name:'脂肪', color:'sand' },
  { id:'carbohydrate', name:'碳水化合物', color:'lilac' }
];
const microLabels = [['vitamins','维生素','leaf'],['minerals','矿物质','drop']];
defineEmits(['edit', 'navigate']);
const round = value => new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const grams = value => typeof value === 'string' ? value : new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const profileValue = (value, unit) => value === undefined || value === null || value === '' ? '未填写' : `${unit === 'kg' ? round(value) : value} ${unit}`;
const energyReferenceKind = computed(() => nutrition.value?.referenceOnly ? '年龄组参考估算' : nutrition.value ? '基于个人档案估算' : '待补充适用档案');
const macroChartRows = computed(() => nutrition.value?.macros || macroLabels.map(macro => ({ ...macro, percent: null, grams: null, foods: '补充适用档案后显示搭配参考' })));
const macroPercentTotal = computed(() => macroChartRows.value.reduce((sum, macro) => sum + (Number.isFinite(Number(macro.percent)) ? Number(macro.percent) : 0), 0));
const macroChartReady = computed(() => macroChartRows.value.length === 3 && macroChartRows.value.every(macro => macro.percent !== null && macro.percent !== undefined && Number.isFinite(Number(macro.percent)) && Number(macro.percent) >= 0) && macroPercentTotal.value > 0);
const showingEnergyDemo = ref(false);
const activeEnergyTooltip = ref(null);
const macroChartGradient = computed(() => {
  if (!macroChartReady.value) return '';
  const sliceColors = { sage: '--vb-macro-protein', sand: '--vb-macro-fat', lilac: '--vb-macro-carbs' };
  let start = 0;
  const stops = macroChartRows.value.map(macro => {
    const end = start + Number(macro.percent) / macroPercentTotal.value * 100;
    const stop = `var(${sliceColors[macro.color] || '--vb-track'}) ${start}% ${end}%`;
    start = end;
    return stop;
  });
  return `conic-gradient(from -90deg, ${stops.join(', ')})`;
});
const macroChartDescription = computed(() => macroChartRows.value.map(macro => `${macro.name} ${macro.percent == null ? '占比暂无数据' : `${macro.percent}%`}，${macro.grams == null ? '克数暂无数据' : `${grams(macro.grams)}克`}，${macro.foods}`).join('；'));
const macroStructureNote = computed(() => {
  if (!macroChartReady.value) return '补充适用档案后显示供能配比参考。';
  return activity.value
    ? `按${activity.value.label}活动水平换算供能比例；蛋白质摄入请结合已记录数据核对。`
    : '按适用档案换算供能比例；蛋白质摄入请结合已记录数据核对。';
});
const energyTrend = computed(() => intakeTrend(props.records || [], todayDate(), 7, props.reports || []).map(day => {
  const total = day.totals?.energy;
  const value = !day.recorded || !total ? null : total.range ? estimateMidpoint(total.range) : typeof total.value === 'number' && Number.isFinite(total.value) ? total.value : null;
  const status = !day.recorded ? '未记录' : !total || value === null ? '数据未知' : total.range ? '含 AI 估算' : total.complete ? '数据库完整' : '已知小计';
  const label = value === null ? status : total.range ? `${formatNutrient(total.range[0])}–${formatNutrient(total.range[1])} kcal（按中点绘制）` : `${formatNutrient(value)} kcal`;
  return { date: day.date, value, status, label, kind: total?.range ? 'estimated' : value !== null && !total?.complete ? 'partial' : 'known' };
}));
const energyTarget = computed(() => typeof nutrition.value?.tdee === 'number' && Number.isFinite(nutrition.value.tdee) ? nutrition.value.tdee : null);
const energyTargetRange = computed(() => Array.isArray(nutrition.value?.energyRange) ? nutrition.value.energyRange.map(Number).filter(Number.isFinite) : null);
const energyDemoBaseline = computed(() => energyTarget.value ?? (energyTargetRange.value?.length === 2 ? (energyTargetRange.value[0] + energyTargetRange.value[1]) / 2 : null));
const energyDemoActive = computed(() => showingEnergyDemo.value && energyDemoBaseline.value !== null);
const energyTargetLabel = computed(() => energyTargetRange.value?.length === 2
  ? `每日能量需求范围 ${formatNutrient(energyTargetRange.value[0])}–${formatNutrient(energyTargetRange.value[1])} kcal`
  : energyTarget.value !== null ? `每日能量需求 ${formatNutrient(energyTarget.value)} kcal` : '每日能量需求暂无适用参考');
const energyTrendDisplay = computed(() => {
  if (!energyDemoActive.value) return energyTrend.value;
  // Sunday-to-Saturday ratios: weekdays stay 5–12% below the profile target,
  // while weekend examples sit 12–15% above it. Values are always recalculated
  // from the current profile-derived target; these are demo data, not intake.
  const weekdayRatios = [1.12, 0.88, 0.92, 0.95, 0.90, 0.93, 1.15];
  return energyTrend.value.map(row => {
    const weekday = new Date(`${row.date}T12:00:00`).getDay();
    const value = energyDemoBaseline.value * weekdayRatios[weekday];
    return { ...row, value, status: '演示数据', label: `${formatNutrient(value)} kcal（演示数据）`, kind: 'demo' };
  });
});
const energyTrendSummary = computed(() => {
  if (energyDemoActive.value) return '演示值按当前每日能量需求比例生成，仅用于展示，不代表真实摄入。';
  const recorded = energyTrend.value.filter(row => Number.isFinite(row.value));
  if (!recorded.length) return '近 7 天暂无可比较的已保存热量数据；未记录日期不按 0 处理。';
  const average = recorded.reduce((sum, row) => sum + row.value, 0) / recorded.length;
  const estimates = recorded.some(row => row.kind === 'estimated') ? '（含 AI 区间中点）' : '';
  const weekend = recorded.filter(row => [0, 6].includes(new Date(`${row.date}T00:00:00`).getDay()));
  const weekendAverage = weekend.length ? weekend.reduce((sum, row) => sum + row.value, 0) / weekend.length : null;
  const weekendSummary = weekendAverage === null
    ? ''
    : `；周末已记录日均 ${formatNutrient(weekendAverage)} kcal${energyTarget.value === null ? '' : `，每日需求参考 ${formatNutrient(energyTarget.value)} kcal`}`;
  return `近 7 天可绘制数据覆盖 ${recorded.length}/7 天，记录日均小计 ${formatNutrient(average)} kcal${estimates}${weekendSummary}；未记录日期不按 0 处理。`;
});
const energyTrendScaleMax = computed(() => {
  const values = [...energyTrendDisplay.value.map(row => row.value), energyTarget.value, ...(energyTargetRange.value || [])].filter(value => Number.isFinite(value) && value > 0);
  const maximum = Math.max(0, ...values);
  if (!maximum) return 1;
  const power = 10 ** Math.floor(Math.log10(maximum));
  const step = power / 2;
  const rounded = Math.ceil(maximum / step) * step;
  return rounded > maximum ? rounded : rounded + step;
});
const energyTrendTicks = computed(() => [
  { value: energyTrendScaleMax.value, position: 6 },
  { value: 0, position: 90 }
]);
const energyTrendY = value => 90 - Number(value) / energyTrendScaleMax.value * 84;
const energyTrendPoints = computed(() => energyTrendDisplay.value.map((row, index) => ({ ...row, x: index / Math.max(1, energyTrendDisplay.value.length - 1) * 100, y: row.value === null ? null : energyTrendY(row.value) })));
const energyTrendKeyIndices = computed(() => energyDemoActive.value
  ? energyTrendPoints.value.map((_, index) => index)
  : [0, Math.floor((energyTrendPoints.value.length - 1) / 2), energyTrendPoints.value.length - 1]);
const energyTrendHasValues = computed(() => energyTrendPoints.value.some(point => point.value !== null));
const energyTrendPaths = computed(() => {
  const groups = [];
  let current = [];
  for (const point of energyTrendPoints.value) {
    if (point.value === null) {
      if (current.length > 1) groups.push(current);
      current = [];
    } else current.push(point);
  }
  if (current.length > 1) groups.push(current);
  return groups.map(group => group.map((point, index) => `${index ? 'L' : 'M'} ${point.x * 10} ${point.y}`).join(' '));
});
const energyTrendAreaPaths = computed(() => {
  const groups = [];
  let current = [];
  for (const point of energyTrendPoints.value) {
    if (point.value === null) {
      if (current.length > 1) groups.push(current);
      current = [];
    } else current.push(point);
  }
  if (current.length > 1) groups.push(current);
  return groups.map(group => {
    const line = group.map((point, index) => `${index ? 'L' : 'M'} ${point.x * 10} ${point.y}`).join(' ');
    return `${line} L ${group[group.length - 1].x * 10} 90 L ${group[0].x * 10} 90 Z`;
  });
});
const energyTargetY = computed(() => energyDemoBaseline.value === null ? null : energyTrendY(energyDemoBaseline.value));
const energyTargetBand = computed(() => energyTargetRange.value?.length === 2 ? {
  top: energyTrendY(Math.max(...energyTargetRange.value)),
  bottom: energyTrendY(Math.min(...energyTargetRange.value))
} : null);
const energyTrendDescription = computed(() => `${energyDemoActive.value ? '近 7 日热量演示数据' : '近 7 日热量摄入趋势'}：${energyTrendDisplay.value.map(row => `${row.date} ${row.value === null ? row.status : `${formatNutrient(row.value)} kcal，${row.status}`}`).join('；')}。${energyTargetLabel.value}。`);
function showEnergyTooltip(event, point) {
  const plot = event.currentTarget.closest('.vb-energy-trend__plot');
  if (!plot) return;
  const rect = plot.getBoundingClientRect();
  const pointer = event.type !== 'focus' && Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
  const x = pointer ? (event.clientX - rect.left) / rect.width * 100 : point.x;
  const y = pointer ? (event.clientY - rect.top) / rect.height * 100 : point.y;
  const safeInset = Math.min(50, (Math.min(220, rect.width - 16) / 2 + 8) / rect.width * 100);
  const requirement = energyDemoBaseline.value;
  let comparison = '';
  if (Number.isFinite(point.value) && requirement !== null) {
    const difference = point.value - requirement;
    const qualifier = energyTargetRange.value?.length === 2 && energyTarget.value === null ? '较需求范围中点' : '较每日能量需求';
    comparison = Math.abs(difference) < 0.5
      ? `与${qualifier.replace('较', '')}持平`
      : `${qualifier}${difference > 0 ? '高' : '低'} ${formatNutrient(Math.abs(difference))} kcal`;
  }
  activeEnergyTooltip.value = {
    date: point.date,
    label: point.label,
    status: point.status,
    comparison,
    left: Math.min(100 - safeInset, Math.max(safeInset, x)),
    top: Math.min(88, Math.max(12, y)),
    below: y < 30
  };
}
function clearEnergyTooltip() { activeEnergyTooltip.value = null; }
function toggleEnergyDemo() {
  showingEnergyDemo.value = !showingEnergyDemo.value;
  clearEnergyTooltip();
}
const date = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date());
</script>
<template>
  <div class="vb-page-title"><div><p class="vb-eyebrow">{{ date }}</p><h1>你的营养工作台</h1><p>记录饮食，计算能量与营养素摄入，理解依据，再安排下一餐。面向全年龄段，按适用条件分析。</p></div><div class="vb-page-actions"><button class="vb-button vb-button-primary" @click="$emit('navigate','diary')"><AppIcon name="plus" :size="17" />记录饮食</button><button class="vb-button vb-button-soft" @click="$emit('navigate','assessment')">查看营养分析</button><button class="vb-button vb-button-quiet" @click="$emit('navigate','mealplan')">安排下一餐</button></div></div>
  <section class="vb-glass vb-profile-strip vb-overview-profile-strip" aria-label="你的身体档案">
    <span class="vb-profile-symbol" aria-hidden="true">{{ profile.sex === 'male' ? '♂' : profile.sex === 'female' ? '♀' : '·' }}</span>
    <div class="vb-profile-title"><strong>你的身体档案</strong><small>{{ profile.sex === 'male' ? '男性' : profile.sex === 'female' ? '女性' : '性别未填写' }} · {{ getAgeBand(profile.age) }}</small></div>
    <dl>
      <div><dt>年龄</dt><dd>{{ profileValue(profile.age, '岁') }}</dd></div>
      <div><dt>身高</dt><dd>{{ profileValue(profile.height, 'cm') }}</dd></div>
      <div><dt>体重</dt><dd>{{ profileValue(profile.weight, 'kg') }}</dd></div>
      <div><dt>活动水平</dt><dd>{{ activity?.label || '未填写' }}</dd></div>
    </dl>
    <button class="vb-icon-button" aria-label="修改基础档案" @click="$emit('edit')"><AppIcon name="edit" :size="18" /></button>
  </section>
  <IntakeAnalysis v-if="!deferIntake" :records="records" :reports="reports" :profile="profile" compact />
  <section v-else class="vb-glass vb-plan-context"><div><h2>已记录的营养摄入</h2><p>摄入明细按需载入；你的档案和饮食记录会保留。</p></div></section>
  <section class="vb-glass vb-body-energy-table" aria-labelledby="vb-body-energy-title">
    <div class="vb-section-heading vb-energy-reference-heading"><div><h2 id="vb-body-energy-title">能量参考</h2><p>{{ energyReferenceKind }} · 基础代谢与每日能量需求为估算值</p></div><button class="vb-demo-toggle" type="button" :disabled="energyDemoBaseline === null" :aria-pressed="energyDemoActive" :title="energyDemoBaseline === null ? '请先补充适用档案' : ''" @click="toggleEnergyDemo">{{ energyDemoActive ? '切换真实记录' : '加载演示数据' }}</button></div>
    <div class="vb-reference-table-section vb-energy-reference-section">
      <div class="vb-energy-trend" role="group" :aria-label="energyTrendDescription">
        <div class="vb-energy-trend__legend" aria-label="图表图例">
          <span><i class="is-intake" />{{ energyDemoActive ? '近 7 日演示热量' : '近 7 日已记录热量' }}</span>
          <span><i class="is-reference" />{{ energyTargetLabel }}</span>
          <span><i class="is-estimated" />{{ energyDemoActive ? '演示数据，不代表真实摄入' : '含 AI 估算 / 已知小计' }}</span>
        </div>
        <div class="vb-energy-trend__layout">
        <div class="vb-energy-trend__y-axis" aria-hidden="true">
            <span v-for="tick in energyTrendTicks" :key="tick.position" :style="{top:`${tick.position}%`}">{{ formatNutrient(tick.value) }}</span>
            <small>kcal</small>
          </div>
          <div class="vb-energy-trend__plot">
            <span v-for="tick in energyTrendTicks" :key="`grid-${tick.position}`" class="vb-energy-trend__gridline" :style="{top:`${tick.position}%`}" aria-hidden="true" />
            <span v-if="energyTargetBand" class="vb-energy-trend__target-band" :style="{top:`${energyTargetBand.top}%`,height:`${energyTargetBand.bottom-energyTargetBand.top}%`}" aria-hidden="true" />
            <span v-if="energyTargetY !== null" class="vb-energy-trend__target-line" :style="{top:`${energyTargetY}%`}" aria-hidden="true" />
          <svg class="vb-energy-trend__areas" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path v-for="(path,index) in energyTrendAreaPaths" :key="index" :d="path" /></svg>
            <svg class="vb-energy-trend__paths" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path v-for="(path,index) in energyTrendPaths" :key="index" :d="path" /></svg>
            <template v-for="point in energyTrendPoints" :key="point.date"><span v-if="point.value !== null" class="vb-energy-trend__point" :class="`is-${point.kind}`" :style="{left:`${point.x}%`,top:`${point.y}%`}" :aria-label="`${point.date}：${point.label}`" :aria-describedby="activeEnergyTooltip?.date === point.date ? 'vb-energy-tooltip' : undefined" tabindex="0" @pointermove="showEnergyTooltip($event,point)" @pointerleave="clearEnergyTooltip" @focus="showEnergyTooltip($event,point)" @blur="clearEnergyTooltip" /></template>
            <div v-if="activeEnergyTooltip" id="vb-energy-tooltip" class="vb-energy-tooltip" :class="{'is-below':activeEnergyTooltip.below}" role="tooltip" :style="{left:`${activeEnergyTooltip.left}%`,top:`${activeEnergyTooltip.top}%`}"><strong>{{ activeEnergyTooltip.date }}</strong><span>{{ activeEnergyTooltip.label }}</span><small>{{ activeEnergyTooltip.status }}</small><small v-if="activeEnergyTooltip.comparison">{{ activeEnergyTooltip.comparison }}</small></div>
            <p v-if="!energyTrendHasValues" class="vb-energy-trend__empty">近 7 天暂无可绘制的已保存热量数据</p>
          </div>
        </div>
        <div class="vb-energy-trend__x-axis" aria-label="近七日日期">
          <time v-for="(point,index) in energyTrendPoints" :key="point.date" :datetime="point.date" :aria-label="point.date" :class="{'is-key-date':energyTrendKeyIndices.includes(index)}">{{ energyTrendKeyIndices.includes(index) ? point.date.slice(5).replace('-', '/') : '' }}</time>
        </div>
        <p class="vb-energy-trend__note"><AppIcon name="sparkles" :size="13" /><strong>{{ energyDemoActive ? '演示说明' : '趋势摘要' }}</strong><span>{{ energyTrendSummary }}</span></p>
      </div>
    </div>
  </section>
  <p v-if="nutrition?.notice" class="vb-inline-note" role="note"><AppIcon name="info" :size="16" />{{ nutrition.notice }}</p>
  <p v-if="nutrition && nutrition.formulaOutsideStudy" class="vb-inline-note"><AppIcon name="info" :size="16" />你的年龄超出原公式研究的 19–78 岁范围，能量数值仅作粗略参考。</p>
  <section class="vb-glass vb-macro-section"><div class="vb-section-heading"><div><h2>三大营养素，合理分配</h2><p>{{ nutrition ? '按每日能量需求换算的一种膳食搭配参考' : '完成适用档案后显示计算值；未知数据不当作 0。' }}</p></div><span class="vb-subtle-label">每日参考</span></div>
    <div class="vb-macro-visual">
      <div class="vb-macro-visual__chart">
        <div class="vb-macro-donut" :class="{'is-empty':!macroChartReady}" :style="macroChartReady ? {'--vb-macro-donut':macroChartGradient} : {}" role="img" :aria-label="macroChartDescription">
          <div class="vb-macro-donut__center"><strong>{{ macroChartReady ? `${Math.round(macroPercentTotal)}%` : '—' }}</strong><span>{{ macroChartReady ? '供能占比' : '占比待匹配' }}</span></div>
        </div>
      </div>
      <ul class="vb-macro-legend" aria-label="三大营养素参考">
        <li v-for="macro in macroChartRows" :key="macro.id" :class="macro.color">
          <span class="vb-macro-legend__swatch" aria-hidden="true" />
          <div class="vb-macro-legend__content">
            <div class="vb-macro-legend__values">
              <div class="vb-macro-legend__name"><strong>{{ macro.name }}</strong><span>{{ macro.percent == null ? '占比待匹配' : `${macro.percent}%` }}</span></div>
              <span class="vb-macro-legend__progress" role="img" :aria-label="`${macro.name}供能占比 ${macro.percent == null ? '暂无数据' : `${macro.percent}%`}`"><i :style="macro.percent == null ? {} : {width:`${Math.min(100,Math.max(0,Number(macro.percent)))}%`}" /></span>
              <strong class="vb-macro-legend__grams">{{ macro.grams == null ? '—' : grams(macro.grams) }}<small> g</small></strong>
            </div>
            <p>{{ macro.foods }}</p>
          </div>
        </li>
      </ul>
    </div>
    <p class="vb-macro-structure-note"><AppIcon name="sparkles" :size="13" /><strong>配比说明</strong><span>{{ macroStructureNote }}</span></p>
    <p class="vb-section-note">{{ nutrition ? nutrition.macroNote : calculationNotice }}</p>
  </section>
  <div class="vb-section-heading vb-micro-heading"><div><h2>微量营养素参考</h2><p>{{ getAgeBand(profile.age) }} · {{ profile.sex === 'male' ? '男性' : profile.sex === 'female' ? '女性' : '性别未填写' }} · {{ nutrition?.microSource || (Number(profile.age) < 18 ? 'Health Canada / NASEM' : '中国 DRIs 2023') }}</p></div><span class="vb-subtle-label">膳食参考量，非补充剂剂量</span></div>
  <div v-if="hasMicro" class="vb-micro-grid"><section v-for="[key,title,icon] in microLabels" :key="key" class="vb-glass vb-micro-card"><div class="vb-section-heading"><h3><AppIcon :name="icon" :size="18" />{{ title }}</h3><span class="vb-pill">{{ micro[key].length }} 项</span></div><table><caption class="vb-sr-only">{{ title }}每日膳食参考摄入量</caption><thead><tr><th scope="col">营养素</th><th scope="col">类型</th><th scope="col">每日参考</th></tr></thead><tbody><tr v-for="item in micro[key]" :key="item.id"><th scope="row">{{ item.name }}<small v-if="item.note">{{ item.note }}</small></th><td><span class="vb-reference-kind">{{ item.kind }}</span></td><td><strong>{{ item.value }}</strong> <small>{{ item.unit }}</small></td></tr></tbody></table></section></div>
  <div v-else class="vb-micro-grid"><section v-for="[,title,icon] in microLabels" :key="title" class="vb-glass vb-micro-card vb-micro-placeholder"><div class="vb-section-heading"><h3><AppIcon :name="icon" :size="18" />{{ title }}</h3><span class="vb-pill">待匹配年龄与性别</span></div><p>适用的参考值会在档案条件满足后显示。填写年龄和性别后匹配对应年龄段，未填写的数据不以 0 填充。</p></section></div>
  <section v-if="!nutrition" class="vb-glass vb-plan-context"><div><h2>计算状态</h2><p>{{ calculationNotice }} 你仍可记录饮食、浏览食物和安排下一餐。</p></div><button class="vb-button vb-button-quiet" @click="$emit('edit')">补充身体档案</button></section>
  <section class="vb-glass vb-record-prompt"><span class="vb-icon-badge"><AppIcon name="list" /></span><div><h3>把记录，放进今天的生活</h3><p>{{ recordCount ? `已记录 ${recordCount} 天饮食，继续发现适合自己的搭配。` : '从记下一顿饭开始，回顾食物的多样性。' }}</p></div><button class="vb-text-button" @click="$emit('navigate','assessment')">查看饮食回顾<AppIcon name="arrow" :size="17" /></button></section>
  <SourcesNote v-if="nutrition" />
</template>
