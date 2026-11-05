<script setup lang="ts">
import { computed, ref } from 'vue';
import AppIcon from '../components/AppIcon.vue';
import { useAiReports } from '../composables/useAiReports';
import type { AiNutritionReport, DailyRecord, NutritionProfile } from '../types/nutrition';

type WorkspacePage = 'diary' | 'food' | 'mealplan' | 'overview' | 'assessment' | 'profile' | 'about';

const props = defineProps<{
  reports: AiNutritionReport[];
  records: DailyRecord[];
  profile: NutritionProfile | null;
  embedded?: boolean;
}>();

const emit = defineEmits<{
  open: [date: string, id: string];
  retry: [date: string];
  navigate: [page: WorkspacePage];
}>();

const date = ref('');
const { isStale } = useAiReports();
const filtered = computed(() => props.reports.filter((report) => !date.value || report.date === date.value));

function recordFor(report: AiNutritionReport): DailyRecord | undefined {
  return props.records.find((record) => record.date === report.date);
}

function label(report: AiNutritionReport): string {
  if (isStale(report, recordFor(report), props.profile)) return '需更新';
  const labels: Record<AiNutritionReport['status'], string> = {
    pending: '正在分析',
    complete: '已完成',
    failed: '分析失败',
    interrupted: '已中断',
  };
  return labels[report.status];
}
</script>

<template>
  <div v-if="!embedded" class="vb-page-title">
    <div><p class="vb-eyebrow">让每一次记录都有回顾</p><h1>AI 营养报告</h1><p>按日期查看饮食分析，记录改变后可随时更新。</p></div>
    <label class="vb-date-input"><AppIcon name="calendar" :size="18" /><input v-model="date" type="date" aria-label="筛选报告日期" /></label>
  </div>
  <div v-else class="vb-report-toolbar"><p>按日期筛选已生成的分析报告</p><label class="vb-date-input"><AppIcon name="calendar" :size="18" /><input v-model="date" type="date" aria-label="筛选报告日期" /></label></div>
  <p class="vb-data-note vb-report-privacy">报告保存在当前浏览器。生成分析时，已确认的食物、克数与基础营养档案会经本地后端发送给 DeepSeek；照片和备注不随每日分析发送。</p>
  <div v-if="date" class="vb-report-filter"><span>{{ filtered.length }} 份报告</span><button type="button" class="vb-text-button" @click="date = ''">清除日期筛选</button></div>
  <div v-if="filtered.length" class="vb-report-list">
    <article v-for="report in filtered" :key="report.id" class="vb-glass vb-report-card">
      <div class="vb-report-card-top"><span class="vb-icon-badge"><AppIcon name="report" /></span><div><h2>{{ report.date }}</h2><small>{{ new Date(report.requestedAt).toLocaleString('zh-CN', { hour12: false }) }}</small></div><span class="vb-pill" :class="{ 'needs-update': label(report) === '需更新' }">{{ label(report) }}</span></div>
      <p>{{ report.result?.summary || report.error || 'AI 正在根据记录生成分析，可以稍后回来查看。' }}</p>
      <small v-if="!recordFor(report)" class="vb-feature-error">对应记录已删除，保留报告快照。</small>
      <small v-else-if="isStale(report, recordFor(report), profile)" class="vb-inline-warning">记录或个人目标已变化，此报告使用的是旧版本。</small>
      <div class="vb-report-card-actions"><button type="button" class="vb-button vb-button-quiet" @click="emit('open', report.date, report.id)">打开报告<AppIcon name="arrow" :size="15" /></button><button type="button" class="vb-text-button" :disabled="report.status === 'pending' || !recordFor(report)" @click="emit('retry', report.date)">重新分析</button></div>
    </article>
  </div>
  <section v-else class="vb-glass vb-report-empty"><span class="vb-icon-badge"><AppIcon name="report" :size="25" /></span><h2>{{ date ? '这一天还没有报告' : '从记录第一餐开始' }}</h2><p>保存每日饮食后，AI 分析会自动开始，完成的报告会留在这里。</p><button class="vb-button vb-button-primary" @click="emit('navigate', 'diary')">去记录饮食<AppIcon name="arrow" :size="17" /></button></section>
</template>
