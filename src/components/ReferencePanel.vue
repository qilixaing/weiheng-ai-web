<script setup>
import { REFERENCES, DIET_PRINCIPLES, REFERENCE_TERMS } from '../data/referenceRegistry.js';
</script>
<template>
 <section class="vb-glass vb-evidence-panel" aria-labelledby="reference-title">
  <p class="vb-eyebrow">数据依据与适用范围</p><h2 id="reference-title">每一种依据，都有明确用途</h2>
  <p>食物成分数据、个人目标和膳食建议分别注明来源。列出参考书目不代表已经接入整本书。</p>
  <div class="vb-reference-list"><details v-for="item in REFERENCES" :key="item.id"><summary><strong>{{ item.title }}</strong><span>{{ item.status }}</span></summary><dl><div><dt>用途与版本</dt><dd>{{ item.kind }} · {{ item.version }} · {{ item.volume }}</dd></div><div><dt>条目定位</dt><dd>{{ item.locator }}</dd></div><div><dt>适用范围</dt><dd>{{ item.scope }}</dd></div><div><dt>原始单位</dt><dd>{{ item.units }}</dd></div></dl><a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">核对公开来源 ↗</a><p v-else class="vb-data-note">等待明确书名、作者、出版社和版本后再核验。</p></details></div>
  <details class="vb-reference-terms"><summary>理解 EAR、RNI、AI 和 UL</summary><p v-for="[short,name,note] in REFERENCE_TERMS" :key="short"><strong>{{ short }} · {{ name }}</strong>：{{ note }}</p><p>这些概念用于膳食评价和计划，单日、不完整的记录不能诊断营养缺乏。每天、每周和每100克的口径应分别核对。</p></details>
  <details><summary>膳食指南2022公开原则摘要</summary><ul><li v-for="item in DIET_PRINCIPLES" :key="item">{{ item }}</li></ul><p class="vb-data-note">文字为原则摘要，不复制官方膳食宝塔或餐盘图示；不同人群应采用对应指南。</p></details>
 </section>
</template>
