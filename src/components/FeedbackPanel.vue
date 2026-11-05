<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { loadFeedback, feedbackStats, feedbackCsv } from '../lib/feedback.js';
import { appStorage } from '../lib/storageScope.js';

const rows = ref(loadFeedback(appStorage));
const taskFilter = ref('');
const completionFilter = ref('all');
const page = ref(1);
const stats = computed(() => feedbackStats(rows.value));
const filtered = computed(() => [...rows.value]
  .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  .filter(row => (!taskFilter.value || row.task.includes(taskFilter.value))
    && (completionFilter.value === 'all' || row.completed === (completionFilter.value === 'complete'))));
const visible = computed(() => filtered.value.slice((page.value - 1) * 6, page.value * 6));

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '时间未记录' : new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
function exportRows() {
  const blob = new Blob([feedbackCsv(filtered.value)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = '真实自愿反馈-当前浏览器记录.csv';
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const refresh = () => { rows.value = loadFeedback(appStorage); };
window.addEventListener('storage', refresh);
onBeforeUnmount(() => window.removeEventListener('storage', refresh));
</script>

<template>
  <section class="vb-glass vb-evidence-panel vb-real-feedback" aria-labelledby="feedback-title">
    <p class="vb-eyebrow">仅展示实际提交的记录</p>
    <h2 id="feedback-title">试用反馈记录</h2>
    <p>这里不会预置或代写反馈。自愿提交内容只保存在提交者的当前浏览器；本页面没有后台汇总，记录也未经独立核验。</p>

    <div class="vb-feedback-notice" role="note">
      <strong>记录范围：当前浏览器</strong>
      <span>下方条数代表提交记录数，不代表独立参与者人数。页面不展示身体档案或聊天内容。</span>
    </div>

    <div v-if="!stats.count" class="vb-feedback-empty-banner" role="status">
      <strong>暂无实际反馈记录</strong>
      <span>当前浏览器还没有可展示的自愿提交记录。</span>
    </div>

    <section class="vb-feedback-records" aria-labelledby="feedback-records-title">
      <div class="vb-feedback-records-heading">
        <div><h3 id="feedback-records-title">反馈统计</h3><p>仅根据当前浏览器中实际保存的自愿提交计算。</p></div>
        <button class="vb-button vb-button-quiet" :disabled="!filtered.length" @click="exportRows">导出筛选结果</button>
      </div>
      <div class="vb-feedback-stats" aria-label="实际提交的自报统计">
        <div><strong>{{ stats.count }}</strong><small>提交记录数</small></div>
        <div><strong>{{ stats.completionRate === null ? '—' : (stats.completionRate * 100).toFixed(0) + '%' }}</strong><small>自报任务完成率</small></div>
        <div><strong>{{ stats.averageRating === null ? '—' : stats.averageRating.toFixed(1) + '/5' }}</strong><small>操作自评均分</small></div>
        <div><strong>{{ stats.averageSeconds === null ? '—' : stats.averageSeconds.toFixed(0) + '秒' }}</strong><small>已计时 {{ stats.measuredCount }} 条的平均用时</small></div>
      </div>
      <div class="vb-feedback-filters">
        <label>按任务筛选<input v-model="taskFilter" maxlength="40" placeholder="例如：预算" @input="page = 1" /></label>
        <label>完成情况<select v-model="completionFilter" @change="page = 1"><option value="all">全部</option><option value="complete">已完成</option><option value="incomplete">未完成</option></select></label>
      </div>
      <p v-if="!filtered.length" class="vb-feedback-empty">{{ rows.length ? '没有符合筛选条件的提交。' : '暂无可显示的实际提交。' }}</p>
      <div v-else class="vb-feedback-list">
        <article v-for="row in visible" :key="row.id">
          <div class="vb-feedback-row-heading"><strong>匿名提交记录</strong><span class="vb-pill">本人自愿提交</span></div>
          <small>{{ formatDate(row.createdAt) }} · {{ row.task }} · {{ row.completed ? '已完成' : '未完成' }}</small>
          <small>操作自评 {{ row.rating }}/5 · 解释清晰度 {{ row.explanationRating }}/5<span v-if="row.durationSeconds !== null"> · 自报用时 {{ row.durationSeconds }} 秒</span></small>
          <p>{{ row.content }}</p>
          <small>匿名自报内容，未经独立核验</small>
        </article>
      </div>
      <nav v-if="filtered.length > 6" class="vb-food-pagination" aria-label="反馈分页">
        <button :disabled="page <= 1" @click="page--">上一页</button><span>{{ page }}/{{ Math.ceil(filtered.length / 6) }}</span><button :disabled="page * 6 >= filtered.length" @click="page++">下一页</button>
      </nav>
    </section>
  </section>
</template>
