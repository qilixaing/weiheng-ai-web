<script setup>
import {ref,computed} from 'vue';
import {todayDate,recordEntriesWithAiEstimates,calculateIntake,formatNutrient,formatTotal,MEALS,NUTRIENTS,recordVersion} from '../lib/foodNutrition.js';
import {nutrientRows,intakeTrend,interpretation} from '../lib/intakeAnalysis.js';
import NutrientSummary from './NutrientSummary.vue';
const props=defineProps({records:{type:Array,default:()=>[]},reports:{type:Array,default:()=>[]},profile:Object,compact:Boolean});
const date=ref(todayDate()),section=ref('主要营养'),trendMetric=ref('energy');
const selectedRecord=computed(()=>props.records.find(r=>r.date===date.value));
const report=computed(()=>selectedRecord.value?props.reports.find(item=>item.date===date.value&&item.status==='complete'&&item.recordVersion===recordVersion(selectedRecord.value)):null);
const pendingReport=computed(()=>selectedRecord.value&&props.reports.some(item=>item.date===date.value&&item.status==='pending'&&item.recordVersion===recordVersion(selectedRecord.value)));
const entries=computed(()=>recordEntriesWithAiEstimates(selectedRecord.value,props.reports));
const intake=computed(()=>calculateIntake(entries.value));
const meals=computed(()=>[...new Set(entries.value.map(e=>e.meal))].map(id=>MEALS.find(m=>m[0]===id)?.[1]).join('、'));
const rows=computed(()=>nutrientRows(entries.value,props.profile).filter(r=>r.section===section.value));
const trend=computed(()=>intakeTrend(props.records,date.value,7,props.reports));
const days=computed(()=>trend.value.filter(d=>d.recorded));
const trendInfo=computed(()=>NUTRIENTS.find(n=>n.id===trendMetric.value));
const completeDays=computed(()=>days.value.filter(d=>d.totals[trendMetric.value].complete&&!d.totals[trendMetric.value].range));
const mean=computed(()=>completeDays.value.length?completeDays.value.reduce((s,d)=>s+d.totals[trendMetric.value].value,0)/completeDays.value.length:null);
</script>
<template>
 <section class="vb-glass vb-intake-analysis">
  <div class="vb-section-heading"><div><p class="vb-eyebrow">实际摄入 · 与身体需求分别展示</p><h2>{{ compact?'已记录的营养摄入':'当日营养摄入' }}</h2></div><label class="vb-date-input">日期<input v-model="date" type="date" :max="todayDate()" aria-label="营养摄入日期" /></label></div>
  <p class="vb-data-note">{{ entries.length?`${entries.length}项食物 · ${meals} · ${intake.knownEnergyCount}/${entries.length}项有热量数据${report?'（已合并AI估算）':''}`:'尚未记录；未记录不按摄入为0处理。' }}</p>
  <NutrientSummary v-if="entries.length&&compact" :entries="entries" :estimating="pendingReport" compact />
  <template v-if="!compact">
   <div class="vb-analysis-tabs" aria-label="营养指标分组"><button v-for="s in ['主要营养','维生素','矿物质','其他']" :key="s" class="vb-button vb-button-quiet" :aria-pressed="section===s" @click="section=s">{{ s }}</button></div>
   <div class="vb-analysis-table-wrap"><table class="vb-analysis-table"><caption>已记录摄入与每日参考</caption><thead><tr><th>指标</th><th>已记录摄入</th><th>每日参考</th><th>依据</th></tr></thead><tbody><tr v-for="r in rows" :key="r.id"><th>{{ r.name }}</th><td>{{ formatTotal(r) }} {{ r.value==null&&!r.range?'':r.unit }}<small v-if="r.range">含AI估算</small><small v-if="!r.complete">数据不完整</small></td><td>{{ r.reference?`${formatNutrient(r.reference.value)} ${r.reference.unit} · ${r.reference.kind}`:'暂无适用参考' }}<small v-if="r.ratio!=null">参考量的 {{ Math.round(r.ratio*100) }}%（非健康评分）</small></td><td><details><summary>查看依据</summary><p>{{ r.known }}项数据库值，{{ r.estimatedCount||0 }}项AI估算。</p><p>{{ interpretation(r) }}</p><p v-if="r.missing.length">缺失：{{ r.missing.join('、') }}</p><p v-if="r.reference">{{ r.reference.source||r.reference.note||r.reference.kind }}；{{ r.reference.kind }}</p></details></td></tr></tbody></table></div>
   <details class="vb-intake-more"><summary>查看参考依据与适用范围</summary><p>成年人使用已登记的中国DRIs 2023公开表；未成年人使用Health Canada / NASEM参考表，不冒充中国DRIs。能量需求是公式估算，宏量比例是搭配示例；特殊生理阶段暂停通用目标。每100克食物成分先按确认的可食部克数换算；缺失宏量营养可显示AI单值估算，并与数据库值区分。</p><p>EAR为平均需要量，RNI/RDA用于规划膳食，AI为适宜摄入量，UL为最高可耐受摄入量，不能当作推荐目标。低于RNI不等于缺乏，低于AI无法据此判断不足。维生素E的α-生育酚与α-TE不直接比较。</p><a href="https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/assessment-summary.html" target="_blank" rel="noopener">膳食评估原则</a> · <a href="https://www.cnsoc.org/drpostand/" target="_blank" rel="noopener">中国DRIs公开参考表</a></details>
   <details class="vb-intake-more"><summary>查看近7日趋势</summary><div class="vb-section-heading"><div><h3>近7日已记录{{ trendInfo.name }}趋势</h3><p>{{ days.length }}/7天有食物记录；{{ completeDays.length }}天记录内该指标完整，平均 {{ formatNutrient(mean) }}{{ mean==null?'':` ${trendInfo.unit}/已记录日` }}。不代表完整全天或平时摄入。</p></div></div>
   <label class="vb-field">趋势指标<select v-model="trendMetric" aria-label="趋势营养指标"><option v-for="n in NUTRIENTS" :key="n.id" :value="n.id">{{ n.name }}</option></select></label><div class="vb-trend-grid"><article v-for="d in trend" :key="d.date"><small>{{ d.date.slice(5) }}</small><strong>{{ d.recorded?formatTotal(d.totals[trendMetric]):'—' }}</strong><small>{{ !d.recorded?'未记录':d.totals[trendMetric].range?(d.totals[trendMetric].complete?'含AI估算':'估算 · 数据不完整'):d.totals[trendMetric].value==null?'该指标未知':d.totals[trendMetric].complete?trendInfo.unit+' · 记录内合计':trendInfo.unit+' · 已知小计' }}</small></article></div></details>
  </template>
  <p v-if="!compact" class="vb-data-note">仅分析已记录食物，不作营养缺乏诊断。</p>
 </section>
</template>
