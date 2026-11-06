<script setup lang="ts">
import AppIcon from '../components/AppIcon.vue';
import { ALL_FOODS } from '../data/catalogue.js';

type WorkspacePage = 'food' | 'mealplan' | 'diary' | 'assessment' | 'about';

defineProps<{ embedded?: boolean }>();
defineEmits<{ navigate: [page: WorkspacePage] }>();

const audit = {
  foodCount: ALL_FOODS.length,
  sourcedCount: ALL_FOODS.filter((food) => Boolean(food.source?.id)).length,
  categories: new Set(ALL_FOODS.map((food) => food.category).filter(Boolean)).size,
};

const path = [
  { number: '01', title: '查证食物', copy: '按名称、别名和分类检索；查看品种、生熟状态、每 100 克可食部数据和来源。', icon: 'search', page: 'food' as const, action: '打开食物浏览' },
  { number: '02', title: '生成待确认方案', copy: 'Agent 从同一食物库找证据，调用白名单工具读取详情、计算营养并比较目标。', icon: 'sparkles', page: 'mealplan' as const, action: '打开膳食方案' },
  { number: '03', title: '用户核对并记录', copy: '用户可调整克数、餐次和食物；方案只有确认后才进入本地饮食草稿。', icon: 'list', page: 'diary' as const, action: '打开饮食记录' },
  { number: '04', title: '回看每日分析', copy: '程序负责汇总营养数值；AI 对当天记录范围、搭配和调整方向作解释。', icon: 'report', page: 'assessment' as const, action: '查看营养评估' },
];

</script>

<template>
  <div v-if="!embedded" class="vb-page-title vb-submission-title">
    <div>
      <p class="vb-eyebrow">在线评审入口 · 维衡 AI</p>
      <h1>把营养建议放回真实的一餐</h1>
      <p>从可核验的食物数据出发，让 AI 协助理解与规划，并把最终决定留给用户。</p>
    </div>
    <button class="vb-button vb-button-primary" @click="$emit('navigate', 'mealplan')">
      <AppIcon name="sparkles" :size="17" />体验餐食规划
    </button>
  </div>

  <section class="vb-glass vb-submission-hero">
    <div class="vb-submission-hero-copy">
      <span class="vb-icon-badge"><AppIcon name="leaf" :size="22" /></span>
      <div>
        <h2>让营养计算有依据，让饮食安排更贴近日常。</h2>
        <p>面向全年龄段，以饮食记录和营养摄入计算为核心。记录食物与份量，查看能量、维生素和矿物质的已知合计与参考依据，再结合预算、忌口和偏好安排下一餐。不同年龄按适用条件分析，缺失值不补0。</p>
      </div>
    </div>
    <div class="vb-submission-stats" aria-label="食物数据审计概况">
      <div><strong>{{ audit.foodCount }}</strong><span>食物目录条目</span></div>
      <div><strong>{{ audit.sourcedCount }}</strong><span>有核验来源</span></div>
      <div><strong>{{ audit.categories }}</strong><span>食物分类</span></div>
    </div>
  </section>

  <div class="vb-submission-section-heading">
    <div><h2>从检索到回顾</h2></div>
  </div>
  <section class="vb-submission-path" aria-label="产品工作流">
    <article v-for="step in path" :key="step.number" class="vb-glass vb-submission-step">
      <div class="vb-submission-step-top"><span>{{ step.number }}</span><span class="vb-icon-badge"><AppIcon :name="step.icon" /></span></div>
      <h3>{{ step.title }}</h3>
      <p>{{ step.copy }}</p>
      <button class="vb-text-button" @click="$emit('navigate', step.page)">{{ step.action }}<AppIcon name="arrow" :size="15" /></button>
    </article>
  </section>

  <div class="vb-submission-columns">
    <section class="vb-glass vb-submission-panel">
      <h2>哪些由程序决定，哪些由 AI 协助</h2>
      <div class="vb-submission-boundary">
        <article><span class="vb-icon-badge"><AppIcon name="chart" /></span><div><h3>程序与食物库</h3><p>食物来源、每 100 克可食部营养值、克数换算和已知小计由目录与程序提供。未知数据保持缺失，并明确标注。</p></div></article>
        <article><span class="vb-icon-badge"><AppIcon name="sparkles" /></span><div><h3>AI 的工作</h3><p>AI 用检索证据解释差异、整理餐食方案和提出可读建议。缺失值估算会单独标明为参考范围，不回写食物库。</p></div></article>
        <article><span class="vb-icon-badge"><AppIcon name="check" /></span><div><h3>用户确认</h3><p>餐食方案不会自行保存。用户确认食物、克数和餐次后，才加入本地饮食草稿并由用户保存。</p></div></article>
      </div>
    </section>

    <section class="vb-glass vb-submission-panel">
      <h2>AI 请求经过服务端，记录保存在当前浏览器</h2>
      <ol class="vb-submission-flow">
        <li><strong>Vue 3 页面</strong><span>食物浏览、Agent、饮食记录与报告共用同一领域数据。</span></li>
        <li><strong>Node.js API</strong><span>集中管理模型配置、白名单工具、结构校验与错误状态。</span></li>
        <li><strong>维衡 AI</strong><span>仅在调用相应 AI 功能时接收该功能所需的请求内容。</span></li>
        <li><strong>本地存储</strong><span>饮食记录、草稿和报告保存在当前浏览器；照片只在用户选图并发起识别时上传。</span></li>
      </ol>
      <p class="vb-inline-note"><AppIcon name="info" :size="16" />AI 建议用于一般饮食管理，不替代医疗诊断或个体化临床建议。</p>
    </section>
  </div>

  <section class="vb-glass vb-submission-evidence">
    <div><h2>数据依据和验证入口</h2><p>覆盖率来自仓库内可重复执行的数据审计；接口模拟检查与真实模型调用分开记录，未执行真实调用时不会记作通过。</p></div>
    <div class="vb-submission-evidence-actions">
      <button class="vb-button vb-button-quiet" @click="$emit('navigate', 'food')"><AppIcon name="apple" :size="16" />核对食物来源</button>
      <button class="vb-button vb-button-quiet" @click="$emit('navigate', 'assessment')"><AppIcon name="report" :size="16" />查看报告样例</button>
    </div>
  </section>

</template>
