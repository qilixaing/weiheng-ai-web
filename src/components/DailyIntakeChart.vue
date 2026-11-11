<script setup>
import { computed } from 'vue';
import { formatNutrient, formatTotal, NUTRIENTS } from '../lib/foodNutrition.js';
import { estimateMidpoint } from '../lib/nutritionEstimate.js';

const props = defineProps({
  trend: { type: Array, default: () => [] },
  metric: { type: String, default: 'energy' },
  endDate: { type: String, default: '' },
  days: { type: Number, default: 0 },
  completeDays: { type: Number, default: 0 },
  mean: { type: Number, default: null },
});
const emit = defineEmits(['update:metric']);

const info = computed(() => NUTRIENTS.find(item => item.id === props.metric) || NUTRIENTS[0]);
const chartRows = computed(() => {
  const values = props.trend.map(day => {
    const total = day.totals?.[props.metric];
    if (!day.recorded || !total) return null;
    if (total.range) return estimateMidpoint(total.range);
    return typeof total.value === 'number' && Number.isFinite(total.value) ? total.value : null;
  });
  const scale = Math.max(1, ...values.filter(value => value !== null));

  return props.trend.map((day, index) => {
    const total = day.totals?.[props.metric];
    const value = values[index];
    let status = '未记录';
    if (day.recorded && total) {
      if (total.range) status = total.complete ? '含 AI 估算' : '含估算 · 仍有缺失';
      else if (value === null) status = '该指标未知';
      else if (total.complete) status = '数据库完整';
      else status = '已知小计 · 仍有缺失';
    }
    return {
      date: day.date,
      recorded: !!day.recorded,
      value,
      label: !day.recorded ? '—' : value === null ? '未知' : formatTotal(total),
      status,
      kind: total?.range ? 'estimated' : value !== null && !total?.complete ? 'partial' : 'known',
      percent: value === null ? 0 : Math.max(0, Math.min(100, value / scale * 100)),
      accessible: `${day.date}，${info.value.name}：${!day.recorded ? '未记录' : value === null ? '未知' : `${formatTotal(total)} ${info.value.unit}`}，${status}`,
    };
  });
});

const hasValues = computed(() => chartRows.value.some(row => row.value !== null));
const changeMetric = event => emit('update:metric', event.target.value);
</script>

<template>
  <section class="vb-daily-chart" aria-labelledby="vb-daily-chart-title">
    <div class="vb-daily-chart__heading">
      <div>
        <p class="vb-eyebrow">按日查看 · 仅汇总已有记录</p>
        <h3 id="vb-daily-chart-title">近 7 日每日营养摄入</h3>
        <p class="vb-daily-chart__summary">
          {{ days }}/7 天有食物记录；{{ completeDays }} 天该指标数据完整<span v-if="mean !== null">，完整记录日均 {{ formatNutrient(mean) }} {{ info.unit }}</span>。
        </p>
      </div>
      <label class="vb-daily-chart__select">查看指标
        <select :value="metric" aria-label="每日图表营养指标" @change="changeMetric">
          <option v-for="item in NUTRIENTS" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </label>
    </div>

    <div v-if="hasValues" class="vb-daily-chart__plot" role="list" :aria-label="`截至 ${endDate} 的近七日${info.name}记录图表`">
      <div v-for="row in chartRows" :key="row.date" class="vb-daily-chart__row" role="listitem" :aria-label="row.accessible">
        <div class="vb-daily-chart__date">
          <time :datetime="row.date">{{ row.date.slice(5) }}</time>
          <small>{{ row.status }}</small>
        </div>
        <div class="vb-daily-chart__track" aria-hidden="true">
          <span v-if="row.value !== null" class="vb-daily-chart__bar" :class="`is-${row.kind}`" :style="{ width: `${row.percent}%` }"></span>
        </div>
        <strong class="vb-daily-chart__value">{{ row.label }}<small v-if="row.value !== null">{{ info.unit }}</small></strong>
      </div>
    </div>
    <p v-else class="vb-daily-chart__empty">这 7 天没有可展示的 {{ info.name }}数值；未记录或未知的数据不会按 0 绘制。</p>

    <div class="vb-daily-chart__legend" aria-label="图表数据标记">
      <span><i class="is-known"></i>数据库完整</span>
      <span><i class="is-estimated"></i>含 AI 估算</span>
      <span><i class="is-partial"></i>已知小计</span>
    </div>
    <p class="vb-daily-chart__note">条形长度按这 7 天内的最高显示值缩放，不代表达标率；“含 AI 估算”按估算值展示，未知项仍保留未知。单日记录不代表全天或长期摄入。</p>
  </section>
</template>

<style scoped>
.vb-daily-chart{margin:22px 0;padding:20px 22px;border:1px solid var(--vb-line);border-radius:16px;background:linear-gradient(145deg,rgba(237,246,240,.72),rgba(248,251,249,.92));}
.vb-daily-chart__heading{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:20px}
.vb-daily-chart__heading h3{margin:4px 0 6px;color:var(--vb-ink);font-size:18px}
.vb-daily-chart__summary,.vb-daily-chart__note{margin:0;color:var(--vb-muted);font-size:12px;line-height:1.8}
.vb-daily-chart__select{display:grid;gap:6px;min-width:150px;color:var(--vb-muted);font-size:12px}
.vb-daily-chart__select select{width:100%;padding:9px 30px 9px 11px;border:1px solid var(--vb-line);border-radius:10px;background:var(--vb-input);color:var(--vb-ink);font:inherit}
.vb-daily-chart__plot{display:grid;gap:13px}
.vb-daily-chart__row{display:grid;grid-template-columns:70px minmax(80px,1fr) minmax(72px,auto);align-items:center;gap:13px;min-height:36px}
.vb-daily-chart__date{display:grid;gap:3px}
.vb-daily-chart__date time{color:var(--vb-ink);font-size:12px;font-weight:650;font-variant-numeric:tabular-nums}
.vb-daily-chart__date small{color:var(--vb-muted);font-size:10px;line-height:1.35}
.vb-daily-chart__track{height:13px;overflow:hidden;border-radius:999px;background-color:rgba(113,151,128,.10);background-image:linear-gradient(to right,transparent calc(25% - 1px),rgba(106,142,120,.11) calc(25% - 1px),rgba(106,142,120,.11) 25%,transparent 25%,transparent calc(50% - 1px),rgba(106,142,120,.11) calc(50% - 1px),rgba(106,142,120,.11) 50%,transparent 50%,transparent calc(75% - 1px),rgba(106,142,120,.11) calc(75% - 1px),rgba(106,142,120,.11) 75%,transparent 75%)}
.vb-daily-chart__bar{display:block;height:100%;min-width:2px;border-radius:inherit;transition:width .48s cubic-bezier(.2,.7,.2,1),background-color .25s ease}
.vb-daily-chart__bar.is-known{background:linear-gradient(90deg,rgba(132,174,149,.62),rgba(91,139,108,.70))}
.vb-daily-chart__bar.is-estimated{background:repeating-linear-gradient(135deg,rgba(107,151,122,.58) 0 8px,rgba(165,197,174,.64) 8px 16px)}
.vb-daily-chart__bar.is-partial{background:linear-gradient(90deg,rgba(153,177,160,.46),rgba(121,154,133,.50))}
.vb-daily-chart__value{justify-self:end;color:var(--vb-ink);font-size:13px;font-weight:650;font-variant-numeric:tabular-nums;white-space:nowrap}
.vb-daily-chart__value small{margin-left:4px;color:var(--vb-muted);font-size:10px;font-weight:500}
.vb-daily-chart__legend{display:flex;flex-wrap:wrap;gap:15px;margin:18px 0 8px;color:var(--vb-muted);font-size:11px}
.vb-daily-chart__legend span{display:inline-flex;align-items:center;gap:6px}
.vb-daily-chart__legend i{display:inline-block;width:15px;height:9px;border-radius:5px;background:linear-gradient(90deg,rgba(132,174,149,.62),rgba(91,139,108,.70))}
.vb-daily-chart__legend i.is-estimated{background:repeating-linear-gradient(135deg,rgba(107,151,122,.58) 0 5px,rgba(165,197,174,.64) 5px 10px)}
.vb-daily-chart__legend i.is-partial{background:linear-gradient(90deg,rgba(153,177,160,.46),rgba(121,154,133,.50))}
.vb-daily-chart__empty{margin:0;padding:22px 14px;border:1px dashed var(--vb-line);border-radius:12px;color:var(--vb-muted);font-size:13px;text-align:center;line-height:1.7}
@media(max-width:620px){.vb-daily-chart{padding:16px 14px}.vb-daily-chart__heading{align-items:stretch;flex-direction:column;gap:12px}.vb-daily-chart__select{min-width:0}.vb-daily-chart__row{grid-template-columns:52px minmax(55px,1fr) minmax(62px,auto);gap:8px}.vb-daily-chart__date time{font-size:11px}.vb-daily-chart__date small{font-size:9px}.vb-daily-chart__value{font-size:12px}.vb-daily-chart__legend{gap:9px;font-size:10px}}
@media(prefers-reduced-motion:reduce){.vb-daily-chart__bar{transition:none}}
</style>
