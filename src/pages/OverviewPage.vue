<script setup>
import { computed } from 'vue';
import { ACTIVITIES, getAgeBand } from '../lib/nutrition.js';
import { overviewNutrition, lifeStageMicronutrients } from '../lib/lifeStageNutrition.js';
import AppIcon from '../components/AppIcon.vue';
import IntakeAnalysis from '../components/IntakeAnalysis.vue';
import SourcesNote from '../components/SourcesNote.vue';
const props = defineProps({ profile: Object, nutrition: Object, recordCount: Number, records: Array });
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
const round = value => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(value);
const grams = value => typeof value === 'string' ? value : new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 }).format(value);
const profileValue = (value, unit) => value === undefined || value === null || value === '' ? '未填写' : `${value} ${unit}`;
const date = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date());
</script>
<template>
  <div class="vb-page-title"><div><p class="vb-eyebrow">{{ date }}</p><h1>你的营养工作台</h1><p>记录饮食，计算能量与营养素摄入，理解依据，再安排下一餐。面向全年龄段，按适用条件分析。</p></div><div class="vb-page-actions"><button class="vb-button vb-button-primary" @click="$emit('navigate','diary')"><AppIcon name="plus" :size="17" />记录饮食</button><button class="vb-button vb-button-soft" @click="$emit('navigate','assessment')">查看营养分析</button><button class="vb-button vb-button-quiet" @click="$emit('navigate','mealplan')">安排下一餐</button></div></div>
  <IntakeAnalysis :records="records" :profile="profile" compact />
  <section class="vb-glass vb-profile-strip" aria-label="基础档案"><span class="vb-profile-symbol">{{ profile.sex === 'male' ? '♂' : profile.sex === 'female' ? '♀' : '○' }}</span><div class="vb-profile-title"><strong>你的身体档案</strong><small>{{ profile.sex === 'male' ? '男性' : profile.sex === 'female' ? '女性' : '性别未填写' }} · {{ getAgeBand(profile.age) }}</small></div><dl><div><dt>年龄</dt><dd>{{ profileValue(profile.age, '岁') }}</dd></div><div><dt>身高</dt><dd>{{ profileValue(profile.height, 'cm') }}</dd></div><div><dt>体重</dt><dd>{{ profileValue(profile.weight, 'kg') }}</dd></div><div><dt>活动水平</dt><dd>{{ activity?.label || '未填写' }}</dd></div></dl><button class="vb-icon-button" aria-label="修改基础档案" @click="$emit('edit')"><AppIcon name="edit" :size="18" /></button></section>
  <div class="vb-energy-grid">
    <section class="vb-glass vb-energy-card"><div class="vb-card-label"><span>基础代谢 <small>BMR</small></span><span class="vb-icon-badge"><AppIcon name="flame" /></span></div><div class="vb-energy-number">{{ nutrition ? round(nutrition.bmr) : '—' }}<span>kcal / 天</span></div><p>{{ nutrition ? '身体静息时维持基本功能的能量估算' : calculationNotice }}</p><div class="vb-card-bottom"><template v-if="nutrition"><span class="vb-status-dot" />{{ nutrition.bmrLabel }}</template><span v-else>身体信息保留；不以 0 代替未知值</span></div></section>
    <section class="vb-glass vb-energy-card vb-energy-featured"><div class="vb-card-label"><span>每日能量需求 <small>{{ nutrition?(nutrition.referenceOnly?'年龄组参考':'个人估算'):'TDEE / EER' }}</small></span><span class="vb-icon-badge"><AppIcon name="activity" /></span></div><div class="vb-energy-number">{{ nutrition?.energyRange ? nutrition.energyRange.map(round).join('–') : nutrition ? round(nutrition.tdee) : '—' }}<span>kcal / 天</span></div><p>{{ nutrition ? (nutrition.referenceOnly ? '按生长阶段或年龄分组的参考估算' : '维持当前体重的每日总能量消耗估算') : calculationNotice }}</p><div class="vb-card-bottom"><template v-if="nutrition"><span>{{ nutrition.energyBasis || `基础代谢 × ${nutrition.activity.factor}` }}</span><span class="vb-pill">{{ nutrition.activity?.label || '按月龄分组' }}</span></template><span v-else>活动水平：{{ activity?.label || '未填写' }}</span></div></section>
  </div>
  <p v-if="nutrition?.notice" class="vb-inline-note" role="note"><AppIcon name="info" :size="16" />{{ nutrition.notice }}</p>
  <p v-if="nutrition && nutrition.formulaOutsideStudy" class="vb-inline-note"><AppIcon name="info" :size="16" />你的年龄超出原公式研究的 19–78 岁范围，能量数值仅作粗略参考。</p>
  <section class="vb-glass vb-macro-section"><div class="vb-section-heading"><div><h2>三大营养素，合理分配</h2><p>{{ nutrition ? '按每日能量需求换算的一种膳食搭配参考' : '完成适用档案后显示计算值；未知数据不当作 0。' }}</p></div><span class="vb-subtle-label">每日参考</span></div><div class="vb-macro-grid"><template v-if="nutrition"><article v-for="macro in nutrition.macros" :key="macro.id" :class="['vb-macro-card',macro.color]"><div class="vb-macro-top"><span class="vb-macro-dot" />{{ macro.name }}<span class="vb-macro-percent">{{ macro.percent == null ? 'AI / RDA' : macro.percent + '%' }}</span></div><strong>{{ grams(macro.grams) }}<small> 克</small></strong><p>{{ macro.foods }}</p></article></template><article v-else v-for="macro in macroLabels" :key="macro.id" :class="['vb-macro-card',macro.color]"><div class="vb-macro-top"><span class="vb-macro-dot" />{{ macro.name }}<span class="vb-macro-percent">待计算</span></div><strong>—<small> 克</small></strong><p>待身体档案达到适用条件后计算</p></article></div><div v-if="nutrition && !nutrition.macros.some(m => m.percent == null)" class="vb-macro-strip" aria-hidden="true"><span v-for="macro in nutrition.macros" :key="macro.id" :class="macro.color" :style="{flex:macro.percent}" /></div><p class="vb-section-note">{{ nutrition ? nutrition.macroNote : calculationNotice }}</p></section>
  <div class="vb-section-heading vb-micro-heading"><div><h2>微量营养素参考</h2><p>{{ getAgeBand(profile.age) }} · {{ profile.sex === 'male' ? '男性' : profile.sex === 'female' ? '女性' : '性别未填写' }} · {{ nutrition?.microSource || (Number(profile.age) < 18 ? 'Health Canada / NASEM' : '中国 DRIs 2023') }}</p></div><span class="vb-subtle-label">膳食参考量，非补充剂剂量</span></div>
  <div v-if="hasMicro" class="vb-micro-grid"><section v-for="[key,title,icon] in microLabels" :key="key" class="vb-glass vb-micro-card"><div class="vb-section-heading"><h3><AppIcon :name="icon" :size="18" />{{ title }}</h3><span class="vb-pill">{{ micro[key].length }} 项</span></div><table><caption class="vb-sr-only">{{ title }}每日膳食参考摄入量</caption><thead><tr><th scope="col">营养素</th><th scope="col">类型</th><th scope="col">每日参考</th></tr></thead><tbody><tr v-for="item in micro[key]" :key="item.id"><th scope="row">{{ item.name }}<small v-if="item.note">{{ item.note }}</small></th><td><span class="vb-reference-kind">{{ item.kind }}</span></td><td><strong>{{ item.value }}</strong> <small>{{ item.unit }}</small></td></tr></tbody></table></section></div>
  <div v-else class="vb-micro-grid"><section v-for="[,title,icon] in microLabels" :key="title" class="vb-glass vb-micro-card vb-micro-placeholder"><div class="vb-section-heading"><h3><AppIcon :name="icon" :size="18" />{{ title }}</h3><span class="vb-pill">待匹配年龄与性别</span></div><p>适用的参考值会在档案条件满足后显示。填写年龄和性别后匹配对应年龄段，未填写的数据不以 0 填充。</p></section></div>
  <section v-if="!nutrition" class="vb-glass vb-plan-context"><div><h2>计算状态</h2><p>{{ calculationNotice }} 你仍可记录饮食、浏览食物和安排下一餐。</p></div><button class="vb-button vb-button-quiet" @click="$emit('edit')">补充身体档案</button></section>
  <section class="vb-glass vb-record-prompt"><span class="vb-icon-badge"><AppIcon name="list" /></span><div><h3>把记录，放进今天的生活</h3><p>{{ recordCount ? `已记录 ${recordCount} 天饮食，继续发现适合自己的搭配。` : '从记下一顿饭开始，回顾食物的多样性。' }}</p></div><button class="vb-text-button" @click="$emit('navigate','assessment')">查看饮食回顾<AppIcon name="arrow" :size="17" /></button></section>
  <SourcesNote v-if="nutrition" />
</template>
