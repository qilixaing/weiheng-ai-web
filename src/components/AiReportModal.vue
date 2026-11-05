<script setup>
import { computed } from 'vue';
import ModalShell from './ModalShell.vue';
import NutrientSummary from './NutrientSummary.vue';
import { calculateNutrition } from '../lib/nutrition.js';
import { formatNutrient, MACROS } from '../lib/foodNutrition.js';
import { FOOD_BY_ID } from '../data/catalogue.js';

const props = defineProps({ report: Object, record: Object, stale: Boolean, error: String });
defineEmits(['close', 'retry']);

const targets = computed(() => props.report?.calculation?.targets || calculateNutrition(props.report?.snapshot?.profile));
const sections = [
  ['overview', '摄入概况'],
  ['targetComparison', '与目标的关系'],
  ['foodMix', '食物搭配'],
  ['attention', '值得关注'],
  ['suggestions', '下一餐可以这样调整'],
];
const time = (value) => value ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '';
const missingFoodItems = computed(() => (props.report?.snapshot?.entries || []).flatMap((entry) => {
  const food = entry.referenceConfirmed === false ? null : FOOD_BY_ID[entry.foodId];
  const missing = MACROS.filter((metric) => typeof food?.nutrients?.[metric.id] !== 'number').map((metric) => metric.id);
  return missing.length ? [{ name: entry.name, grams: entry.grams, missing }] : [];
}));
const missingFoodCount = computed(() => props.report?.calculation?.estimation?.missingFoodCount ?? missingFoodItems.value.length);
const estimates = computed(() => props.report?.calculation?.estimation?.foods || []);
const signed = (value) => (value > 0 ? '+' : value < 0 ? '−' : '') + formatNutrient(Math.abs(value));
</script>

<template>
  <ModalShell title="AI 营养分析" wide @close="$emit('close')">
    <div class="vb-report-heading">
      <div><span class="vb-small-label">{{ report?.date || record?.date }}</span><h3>读懂这一天的饮食</h3></div>
      <span class="vb-pill">{{ report?.status === 'complete' ? '分析完成' : report?.status === 'pending' ? '分析中' : '待完成' }}</span>
    </div>
    <p class="vb-data-note">饮食记录已独立保存在本地。关闭窗口不会取消正在进行的分析。</p>
    <p v-if="stale && report?.status !== 'pending'" class="vb-inline-warning">饮食记录或营养目标已修改，这份报告需要更新。</p>
    <p v-if="!record" class="vb-inline-warning">对应的饮食记录已删除，仍可查看报告快照；恢复记录后可重新分析。</p>

    <div v-if="report?.status === 'pending'" class="vb-ai-progress vb-report-progress" role="status">
      <span class="vb-loading-ring" />
      <div>
        <strong>正在分析饮食搭配与营养目标…</strong>
        <small>{{ missingFoodCount ? '同时自动估算 ' + missingFoodCount + ' 项食物的缺失指标。' : '程序已计算营养汇总，DeepSeek 正在生成解释与建议。' }}</small>
      </div>
    </div>
    <div v-if="error || ['failed', 'interrupted'].includes(report?.status)" class="vb-report-error" role="alert">
      <h3>记录已保存，AI 分析尚未完成</h3>
      <p>{{ error || report.error }}</p>
      <button type="button" class="vb-button vb-button-primary" :disabled="!record" @click="$emit('retry')">重新分析</button>
    </div>
    <p v-if="report?.persistenceFailed" class="vb-feature-error">报告暂时未写入浏览器数据库，请保留此页并检查存储权限。</p>

    <template v-if="report?.snapshot">
      <h3 class="vb-report-section-title">程序计算的营养汇总</h3>
      <NutrientSummary :summary="report.snapshot.intake" :targets="targets" details />

      <section v-if="missingFoodCount" class="vb-report-estimation" aria-live="polite">
        <div class="vb-report-estimation-heading">
          <div>
            <h3>{{ missingFoodCount === 1 ? '有 1 项食物缺少部分营养数据' : `有多项食物缺少部分营养数据（${missingFoodCount} 项）` }}</h3>
            <p>缺失指标已自动交由 AI 估算范围，并用于下方参考差值；不需要额外点击。</p>
          </div>
          <span class="vb-pill">{{ report?.status === 'pending' ? '正在估算' : 'AI 参考估算' }}</span>
        </div>
        <p class="vb-data-note">{{ report?.calculation?.estimation?.disclaimer || '估算结果基于食物名称和可食部克数，只用于本报告参考，不会写入食物库或原始饮食记录。' }}</p>
        <ul v-if="estimates.length" class="vb-report-estimation-list">
          <li v-for="food in estimates" :key="food.entryId">
            <div><strong>{{ food.name }} · {{ formatNutrient(food.grams) }} 克</strong><small>{{ food.assumption }}</small></div>
            <div class="vb-report-estimation-values">
              <span v-for="metric in MACROS.filter((item) => food.values[item.id])" :key="metric.id">
                {{ metric.id === 'carbs' ? '碳水' : metric.name }} {{ formatNutrient(food.values[metric.id].low) }}–{{ formatNutrient(food.values[metric.id].high) }} {{ metric.unit }}
              </span>
            </div>
          </li>
        </ul>
      </section>

      <div v-if="report.calculation?.comparison" class="vb-report-comparison">
        <div v-for="metric in report.calculation.comparison" :key="metric.id">
          <span>{{ metric.id === 'carbs' ? '碳水' : metric.name }}</span>
          <strong v-if="metric.estimatedRange?.delta">
            AI 估算差值：{{ signed(metric.estimatedRange.delta.low) }} 至 {{ signed(metric.estimatedRange.delta.high) }} {{ metric.unit }}
          </strong>
          <strong v-else-if="metric.delta !== null">
            {{ metric.delta > 0 ? '+' : '' }}{{ formatNutrient(metric.delta) }} {{ metric.unit }}
          </strong>
          <strong v-else>{{ metric.estimatedRange || metric.complete && metric.target === null ? '缺少个人目标，无法计算差值' : 'AI 估算尚未完成' }}</strong>
          <small v-if="metric.estimatedRange?.delta">根据数据库已知小计与 AI 估算范围计算；记录未必覆盖全天，不代表达标或不足。</small>
          <small v-else-if="metric.estimatedRange && !metric.estimatedRange.delta">已自动估算食物摄入范围；请先完善个人营养档案中的目标。</small>
          <small v-else-if="metric.delta !== null">记录合计减去全天目标，记录未必覆盖全天。</small>
          <small v-else-if="metric.complete && metric.target === null">请完善个人营养档案后再查看与目标的差值。</small>
          <small v-else>缺失数据的 AI 估算尚未完成；请稍后重试分析。</small>
        </div>
      </div>
    </template>

    <div v-if="report?.result" class="vb-report-content">
      <span class="vb-small-label">AI 解释与建议</span>
      <p class="vb-report-summary">{{ report.result.summary }}</p>
      <section v-for="[key, title] in sections" :key="key">
        <template v-if="report.result[key]?.length">
          <h3>{{ title }}</h3>
          <ul><li v-for="(line, index) in report.result[key]" :key="index">{{ line }}</li></ul>
        </template>
      </section>
      <p class="vb-inline-warning">分析范围：{{ report.result.scope || '仅针对已记录的食物，不能代替身体检测或专业诊疗。' }}</p>
    </div>
    <div v-if="report" class="vb-report-meta">
      <span>生成时间：{{ time(report.generatedAt) || '尚未生成' }}</span>
      <span v-if="report.model">模型：{{ report.model }}</span>
      <span>数据版本：{{ report.dataVersion }}</span>
      <span>食物库：{{ report.snapshot?.intake?.dataVersion }}</span>
      <small>报告、照片保存在本机浏览器。清理站点数据后无法恢复。</small>
    </div>
    <button v-if="report?.status === 'complete' && record" type="button" class="vb-button vb-button-quiet" @click="$emit('retry')">
      {{ stale ? '用最新记录重新分析' : '重新分析这一天' }}
    </button>
  </ModalShell>
</template>
