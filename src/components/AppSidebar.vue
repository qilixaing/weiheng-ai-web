<script setup>
import { accountUser } from '../lib/storageScope.js';
import AppIcon from './AppIcon.vue';
defineProps({ active: String });
defineEmits(['navigate']);
const menu = [
  ['overview', '概览', 'grid'], ['dietAssistant', 'AI 饮食助手', 'sparkles'], ['diary', '饮食记录', 'list'],
  ['mealplan', '膳食方案', 'bowl'], ['assessment', '营养分析', 'chart'],
  ['food', '食物浏览', 'apple'],
  ['profile', '个人档案', 'person'], ['about', '关于', 'info']
];
</script>
<template>
  <aside class="vb-sidebar">
    <button class="vb-brand" aria-label="维衡 AI 概览" @click="$emit('navigate','overview')">
      <span class="vb-brand-logo"><img src="/assets/brand-icon-64.png?v=2" alt="" /></span>
      <span><strong>维衡 AI</strong><small>让每一餐，更有把握</small></span>
    </button>
    <p class="vb-nav-caption">我的营养工作台</p>
    <nav aria-label="主导航">
      <button v-for="[key,label,icon] in menu" :key="key" :class="['vb-nav-button',{ 'is-active': active === key }]" :aria-current="active === key ? 'page' : undefined" @click="$emit('navigate',key)"><AppIcon :name="icon" /><span>{{ label }}</span><span v-if="active === key" class="vb-nav-marker" /></button>
    </nav>
    <div class="vb-sidebar-bottom"><AppIcon name="lock" :size="17" /><span>{{ accountUser ? '账号数据同步' : '游客本地保存' }}<small>{{ accountUser ? '文字聊天、档案与记录按账号保存' : '登录可同步文字聊天、档案与记录' }}</small></span><i /></div>
  </aside>
</template>
