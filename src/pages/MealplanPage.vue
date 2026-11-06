<script setup lang="ts">
import MealPlanningAgent from '../components/MealPlanningAgent.vue';
import type { MealAgentConfirmation } from '../types/agent';
import type { NutritionProfile, DailyRecord } from '../types/nutrition';
defineProps<{nutrition:{tdee:number}|null;preferences:string;flags:string[];profile:NutritionProfile|null;records:DailyRecord[]}>();
defineEmits<{navigate:[page:'profile'|'diary'|'about'];'add-plan':[payload:MealAgentConfirmation]}>();
</script>
<template>
 <div class="vb-page-title"><div><h1>膳食方案</h1><p>结合身体档案、饮食记录与就餐条件，安排更适合自己的下一餐。</p></div><button class="vb-button vb-button-soft" @click="$emit('navigate','profile')">调整档案与饮食偏好</button></div>
 <section v-if="!nutrition" class="vb-glass vb-plan-context"><div><h2>可以先选餐，再逐步完善档案</h2><p>身体档案缺失、未满18岁或不适用成人公式时，本次不生成成人营养配额。仍可检索食物、核对营养成分和记录饮食。</p></div></section>
 <MealPlanningAgent :profile="profile||undefined" :nutrition="nutrition||undefined" :preferences="preferences" :flags="flags" :records="records" @confirm="$emit('add-plan',$event)" />
 <section class="vb-glass vb-record-prompt"><div><h3>从下一餐，回到真实记录</h3><p>方案不代表已经吃过；食物、配料、价格与实际份量需要你核对。</p></div><button class="vb-text-button" @click="$emit('navigate','diary')">去记录实际饮食 →</button><button class="vb-text-button" @click="$emit('navigate','about')">查看参考资料 →</button></section>
</template>
