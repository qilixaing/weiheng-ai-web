<script setup lang="ts">
import IntakeAnalysis from '../components/IntakeAnalysis.vue';
import AssessmentPage from './AssessmentPage.vue';
import ReportsPage from './ReportsPage.vue';
import AppIcon from '../components/AppIcon.vue';
import type { AiNutritionReport, DailyRecord, NutritionProfile } from '../types/nutrition';

type WorkspacePage = 'diary' | 'food' | 'mealplan' | 'overview' | 'assessment' | 'profile' | 'about';

defineProps<{
  records: DailyRecord[];
  habits: Record<string, string[]>;
  flags: string[];
  reports: AiNutritionReport[];
  profile: NutritionProfile | null;
}>();

const emit = defineEmits<{
  navigate: [page: WorkspacePage];
  toggleHabit: [date: string, key: string];
  openReport: [date: string, id: string];
  retryReport: [date: string];
}>();

function openReport(date: string, id: string): void {
  emit('openReport', date, id);
}
</script>

<template>
  <div class="vb-page-title">
    <div>
      <p class="vb-eyebrow">从饮食回顾到 AI 分析</p>
      <h1>营养摄入分析与不足风险提示</h1>
      <p>先看程序计算的摄入与完整性，再查看饮食结构和AI解释。缺失与未记录不当作0。</p>
    </div>
    <button class="vb-button vb-button-primary" @click="emit('navigate', 'diary')">
      <AppIcon name="plus" :size="17" />添加饮食记录
    </button>
  </div>

  <IntakeAnalysis :records="records" :profile="profile||undefined" />
  <section class="vb-assessment-block" aria-labelledby="diet-assessment-heading">
    <div class="vb-section-heading vb-integrated-heading">
      <div><p class="vb-eyebrow">饮食结构回顾</p><h2 id="diet-assessment-heading">食物类别评估</h2></div>
      <span class="vb-subtle-label">按已保存记录统计</span>
    </div>
    <AssessmentPage
      :records="records"
      :habits="habits"
      :flags="flags"
      embedded
      @navigate="emit('navigate', $event)"
      @toggle-habit="(date, key) => emit('toggleHabit', date, key)"
    />
  </section>

  <section class="vb-assessment-block vb-assessment-reports" aria-labelledby="ai-report-heading">
    <div class="vb-section-heading vb-integrated-heading">
      <div><p class="vb-eyebrow">每日 AI 分析</p><h2 id="ai-report-heading">AI 营养报告</h2></div>
      <span class="vb-subtle-label">可按日期筛选、查看和重试</span>
    </div>
    <ReportsPage
      :reports="reports"
      :records="records"
      :profile="profile"
      embedded
      @open="openReport"
      @retry="emit('retryReport', $event)"
      @navigate="emit('navigate', $event)"
    />
  </section>
</template>
