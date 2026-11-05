<script setup>
import { reactive, ref, computed, watch, nextTick, onMounted } from 'vue';
import { ACTIVITIES, validateProfile, profileBodyLimits } from '../lib/nutrition.js';
import AppIcon from './AppIcon.vue';
import NumberRuler from './NumberRuler.vue';
const props = defineProps({ profile: { type: Object, default: null } });
const emit = defineEmits(['complete', 'close', 'login']);
const draft = reactive(props.profile ? { ...props.profile } : { sex: '', age: '', height: '', weight: '', activity: '', physiologicalStage: 'general' });
const step = ref(0), error = ref(''), dialog = ref(null);
const steps = [
  { key: 'sex', title: '先认识一下你', question: '你的生理性别是？', hint: '用于选择代谢公式与膳食参考值的分组；不方便填写可以跳过。' },
  { key: 'age', title: '处于哪个人生阶段？', question: '你的年龄', unit: '岁', placeholder: '26', min: 0, max: 120, hint: '支持 0–120 岁，按年龄阶段展示参考数据。0 岁可补充月龄。' },
  { key: 'height', title: '从身体的尺度开始', question: '你的身高', unit: 'cm', placeholder: '170', min: 100, max: 250, hint: '脱鞋后的身高，精确到 0.1 cm 即可。' },
  { key: 'weight', title: '记录现在的自己', question: '你目前的体重', unit: 'kg', placeholder: '65', min: 25, max: 300, hint: '使用近期测量值，不需要填写目标体重。' },
  { key: 'activity', title: '最后，看看日常节奏', question: '你的每日活动水平', hint: '综合工作、走动与运动选择最接近的一项。' }
];
const current = computed(() => {
  const item = steps[step.value], limits = profileBodyLimits(draft.age)[item.key];
  return limits ? { ...item, min: limits[0], max: limits[1] } : item;
});
function validateStep() {
  if (step.value === 0) return '';
  if (step.value === 4) return '';
  if (!String(draft[current.value.key] ?? '').trim()) return '';
  const value = Number(draft[current.value.key]);
  if (!Number.isFinite(value) || value < current.value.min || value > current.value.max || (step.value === 1 && !Number.isInteger(value))) return `请输入 ${current.value.min}–${current.value.max} ${current.value.unit}${step.value === 1 ? '的整数年龄' : '范围内的数值'}`;
  return '';
}
function chooseSex(value) { draft.sex = value; error.value = ''; }
function skipCurrent() { draft[current.value.key] = ''; error.value = ''; if (step.value < 4) step.value++; }
function nextStep() {
  error.value = validateStep();
  if (error.value) return;
  if (step.value < 4) { step.value++; return; }
  error.value = validateProfile(draft);
  if (!error.value) emit('complete', { ...draft });
}
function focusCurrent() { nextTick(() => dialog.value?.querySelector('.vb-step-input, .vb-choice-button, .vb-activity-choice')?.focus()); }
watch(step, () => { error.value = ''; focusCurrent(); });
onMounted(focusCurrent);
function trapFocus(event) {
  if (event.key === 'Escape' && props.profile) { emit('close'); return; }
  if (event.key !== 'Tab') return;
  const nodes = [...dialog.value.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')];
  const first = nodes[0], last = nodes.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
</script>
<template>
  <div class="vb-dialog-overlay">
    <section ref="dialog" class="vb-wizard" role="dialog" aria-modal="true" aria-labelledby="vb-wizard-title" aria-describedby="vb-step-hint" @keydown="trapFocus">
      <div class="vb-wizard-top"><span class="vb-icon-badge"><AppIcon name="leaf" /></span><span>建立你的营养档案</span><button v-if="profile" class="vb-icon-button" aria-label="关闭档案编辑" @click="$emit('close')"><AppIcon name="close" /></button></div>
      <div class="vb-wizard-progress" role="progressbar" :aria-valuenow="step+1" aria-valuemin="1" aria-valuemax="5" :aria-label="`档案设置，第 ${step+1} 步，共 5 步`"><span v-for="n in 5" :key="n" :class="{ filled: n <= step+1 }" /></div>
      <form @submit.prevent="nextStep">
        <div class="vb-wizard-copy"><span class="vb-small-label">第 {{ step+1 }} 步 / 共 5 步</span><h2 id="vb-wizard-title">{{ current.title }}</h2><p id="vb-step-hint">{{ current.hint }}</p></div>
        <fieldset v-if="step === 0" class="vb-sex-field"><legend class="vb-sr-only">{{ current.question }}</legend><button v-for="[value,label] in [['male','男性'],['female','女性']]" :key="value" type="button" :class="['vb-choice-button',{ selected: draft.sex === value }]" :aria-pressed="draft.sex === value" @click="chooseSex(value)"><span class="vb-person-symbol">{{ value === 'male' ? '♂' : '♀' }}</span><strong>{{ label }}</strong><span class="vb-choice-check"><AppIcon v-if="draft.sex === value" name="check" :size="14" /></span></button></fieldset><label v-if="step===4" class="vb-field">生理阶段（可选）<select v-model="draft.physiologicalStage"><option value="general">一般情况</option><option value="pregnant">孕期</option><option value="lactating">哺乳期</option><option value="special">其他需专业评估的情况</option></select><small>特殊阶段暂停通用营养目标；记录和查询仍可使用。</small></label>
        <div v-else-if="step < 4" class="vb-number-step"><label for="vb-step-number">{{ current.question }}</label><div class="vb-number-control"><input id="vb-step-number" :key="current.key" v-model="draft[current.key]" class="vb-step-input" type="number" :inputmode="step === 1 ? 'numeric' : 'decimal'" :min="current.min" :max="current.max" :step="step === 1 ? 1 : 0.1" :placeholder="current.placeholder" :aria-invalid="!!error" :aria-describedby="error ? 'vb-step-error' : 'vb-step-hint'" @input="error = ''" /><span>{{ current.unit }}</span></div><NumberRuler v-model="draft[current.key]" :min="current.min" :max="current.max" :step="step === 1 ? 1 : 0.1" :fallback="Number(current.placeholder)" :label="current.question" :unit="current.unit" @update:model-value="error = ''" /><label v-if="step === 1 && String(draft.age) === '0'" class="vb-field">月龄（可选，0–11个月）<input v-model="draft.ageMonths" type="number" min="0" max="11" step="1" placeholder="未填时暂不匹配婴儿参考值" /></label><p class="vb-input-range">{{ current.min }}–{{ current.max }} {{ current.unit }} · 可拖动刻度调节</p></div>
        <fieldset v-else class="vb-activity-field"><legend class="vb-sr-only">{{ current.question }}</legend><button v-for="item in ACTIVITIES" :key="item.key" type="button" :class="['vb-activity-choice',{ selected: draft.activity === item.key }]" :aria-pressed="draft.activity === item.key" @click="draft.activity=item.key"><span class="vb-activity-icon"><AppIcon :name="item.icon" /></span><span><strong>{{ item.label }}</strong><small>{{ item.detail }}</small></span><span class="vb-radio-mark"><i v-if="draft.activity === item.key" /></span></button></fieldset><label v-if="step===4" class="vb-field">生理阶段（可选）<select v-model="draft.physiologicalStage"><option value="general">一般情况</option><option value="pregnant">孕期</option><option value="lactating">哺乳期</option><option value="special">其他需专业评估的情况</option></select><small>特殊阶段暂停通用营养目标；记录和查询仍可使用。</small></label>
        <div v-if="step < 4" class="vb-skip-row"><button type="button" class="vb-text-button" @click="skipCurrent">跳过此项</button></div>
        <p id="vb-step-error" class="vb-field-error" aria-live="polite">{{ error }}</p>
        <div class="vb-wizard-actions"><button type="button" class="vb-button vb-button-quiet" :disabled="step === 0 && !profile" @click="step > 0 ? step-- : $emit('close')"><AppIcon name="back" :size="17" />{{ step === 0 && profile ? '取消' : '上一步' }}</button><button class="vb-button vb-button-primary" type="submit">{{ step === 4 ? '保存我的身体档案' : '下一步' }}<AppIcon name="arrow" :size="17" /></button></div>
      </form>
      <button type="button" class="vb-button vb-button-quiet vb-skip-all" @click="emit('complete', { sex: '', age: '', height: '', weight: '', activity: '' })">跳过整个档案，先体验网站</button><p class="vb-wizard-account-login">已有邮箱账号？ <button type="button" class="vb-text-button" @click="emit('login')">登录</button></p><p class="vb-wizard-privacy"><AppIcon name="lock" :size="13" />游客档案保存在本机；登录后可同步档案与饮食记录</p>
    </section>
  </div>
</template>

