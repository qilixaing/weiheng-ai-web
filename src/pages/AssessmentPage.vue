<script setup>
import { ref, computed, watch } from 'vue';
import { FOOD_GROUPS, CORE_GROUPS, GROUP_ICONS } from '../data/catalogue.js';
import AppIcon from '../components/AppIcon.vue';
const props = defineProps({ records: Array, habits: Object, flags: Array, embedded: Boolean });
defineEmits(['navigate', 'toggle-habit']);
const selectedDate = ref(props.records[0]?.date || '');
watch(() => props.records, records => { if (!records.some(record => record.date === selectedDate.value)) selectedDate.value = records[0]?.date || ''; });
const record = computed(() => props.records.find(item => item.date === selectedDate.value));
const amount = key => Number(record.value?.foods?.[key]) || 0;
const missing = computed(() => CORE_GROUPS.filter(group => amount(group.key) <= 0));
const covered = computed(() => CORE_GROUPS.length - missing.value.length);
const maximum = computed(() => Math.max(1, ...FOOD_GROUPS.map(group => amount(group.key))));
const ideas = {
  vegetables: ['下一餐，多一种蔬菜', '按季节与口味，换一种颜色或种类。'],
  fruit: ['给日常留一份水果', '方便的时候，选择一种完整水果。'],
  staples: ['把主食也记下来', '完整记录，才能更清楚地回顾一天。'],
  wholegrains: ['让主食多一点变化', '试着用全谷物或杂豆替换部分精制主食。'],
  dairy: ['补充适合自己的奶类选择', '可选择奶类，或核对强化配方的替代品。'],
  protein: ['正餐配一种蛋白质食物', '肉、蛋、奶或豆制品可以按偏好轮换。'],
  fish: ['在后续餐次换一种搭配', '条件允许时，将鱼或水产加入食物轮换。']
};
const suggestions = computed(() => (missing.value.length ? missing.value.slice(0, 3) : [{ key: 'variety' }, { key: 'record' }]).map(group => ({ key: group.key, title: ideas[group.key]?.[0] || (group.key === 'variety' ? '继续保持食物多样性' : '记下今天的新搭配'), detail: ideas[group.key]?.[1] || '按自己的作息与口味，维持可持续的小习惯。' })));
const done = key => (props.habits[selectedDate.value] || []).includes(key);
</script>
<template>
  <div v-if="!embedded" class="vb-page-title"><div><p class="vb-eyebrow">从记录中，了解自己的日常</p><h1>AI 营养评估</h1><p>看见食物搭配，找到下一餐可以尝试的小调整。</p></div><button class="vb-button vb-button-primary" @click="$emit('navigate','diary')"><AppIcon name="plus" :size="17" />添加饮食记录</button></div>
  <div v-if="records.length > 1" class="vb-date-tabs" aria-label="选择评估日期"><button v-for="item in records.slice(0,7)" :key="item.date" :class="{selected:selectedDate === item.date}" :aria-pressed="selectedDate === item.date" @click="selectedDate=item.date">{{ item.date }}</button></div>
  <template v-if="record">
    <section class="vb-glass vb-review-hero"><span class="vb-icon-badge vb-large-badge"><AppIcon name="leaf" :size="25" /></span><div><span class="vb-small-label">{{ record.date }} · 饮食回顾</span><h2>{{ missing.length ? '这些类别，这次还没有记到' : '这次记录覆盖了多类食物' }}</h2><p>{{ missing.length ? missing.map(group => group.name).join('、') : '保持多样性，也继续留意食物的份量与搭配。' }}</p></div><div class="vb-coverage-score"><strong>{{ covered }}<small> / {{ CORE_GROUPS.length }}</small></strong><span>主要类别已记录</span></div></section>
    <div class="vb-assessment-grid">
      <section class="vb-glass vb-coverage-card"><div class="vb-section-heading"><div><h2>食物类别覆盖</h2><p>按这一日保存的食用克数汇总</p></div><AppIcon name="chart" /></div><div class="vb-coverage-list"><div v-for="group in FOOD_GROUPS" :key="group.key" class="vb-coverage-row"><span class="vb-food-category-icon"><AppIcon :name="GROUP_ICONS[group.key]" :size="17" /></span><span class="vb-coverage-name">{{ group.name }}<small v-if="group.key === 'snacks'">可选记录</small></span><span class="vb-coverage-track" aria-hidden="true"><i :style="{width:(amount(group.key)/maximum*100)+'%'}" /></span><span :class="['vb-coverage-value',{'is-missing':!amount(group.key)}]">{{ amount(group.key) ? `${Math.round(amount(group.key)*10)/10} g` : '未记录' }}</span></div></div><p class="vb-inline-note"><AppIcon name="info" :size="15" />未记录不等于没吃，也不能据此判断营养缺乏。</p></section>
      <section class="vb-glass vb-suggestion-card"><div class="vb-section-heading"><div><h2>下一餐，做一点小调整</h2><p>选一件适合自己的事就好</p></div><span class="vb-pill">可选建议</span></div><label v-for="idea in suggestions" :key="idea.key" :class="['vb-check-row',{done:done(idea.key)}]"><input type="checkbox" :checked="done(idea.key)" @change="$emit('toggle-habit',selectedDate,idea.key)" /><span><strong>{{ idea.title }}</strong><small>{{ idea.detail }}</small></span></label><p class="vb-section-note">勾选仅记录行动，不会改变上面的食物统计。</p></section>
    </div>
  </template>
  <section v-else class="vb-glass vb-empty-review"><span class="vb-empty-icon"><AppIcon name="bowl" :size="36" /></span><h2>先从记录一天饮食开始</h2><p>保存后，这里会回顾食物类别，并提供简洁的搭配建议。</p><button class="vb-button vb-button-primary" @click="$emit('navigate','diary')">记录今天的饮食<AppIcon name="arrow" :size="17" /></button></section>
  <section class="vb-glass vb-supplement-card"><span class="vb-icon-badge"><AppIcon name="shield" :size="23" /></span><div><span class="vb-small-label">补充剂安全提示</span><h2>{{ flags.length ? '你标记了需要谨慎核对的情况' : '先看饮食，再考虑补充剂' }}</h2><p>{{ flags.length ? '用药、特殊生理阶段或健康状况可能影响适用性，请让医生或药师核对。' : '饮食记录不能判断身体是否缺乏营养素，也不会自动生成补充剂剂量。' }}</p></div><button class="vb-text-button" @click="$emit('navigate','about')">查看注意事项<AppIcon name="arrow" :size="17" /></button></section>
</template>
