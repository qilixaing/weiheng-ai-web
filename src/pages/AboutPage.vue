<script setup lang="ts">
import { ref } from 'vue';
import ModalShell from '../components/ModalShell.vue';
import { resetLocalAppData } from '../lib/appDataReset.js';
import SafetyPage from './SafetyPage.vue';
import SubmissionGuidePage from './SubmissionGuidePage.vue';
import ReferencePanel from '../components/ReferencePanel.vue';
import {appStorage, accountUser} from '../lib/storageScope.js';

type WorkspacePage = 'food' | 'mealplan' | 'diary' | 'assessment' | 'about';

defineProps<{ flags: string[] }>();
defineEmits<{ navigate: [page: WorkspacePage] }>();
const confirmReset = ref(false), resetting = ref(false), resetError = ref('');
function exportRecords(){
 try{const stored=JSON.parse(appStorage.getItem('weiheng.local.v2')||'{}');const snapshot={format:'weiheng-profile-food-records-v1',exportedAt:new Date().toISOString(),profile:stored.profile||null,records:(Array.isArray(stored.records)?stored.records:[]).map((record:{date:string;entries:unknown[]})=>({date:record.date,entries:record.entries})),scope:'仅当前使用空间的档案及食物记录；不含备注、照片、附件和聊天'};const url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='维衡-当前档案与食物记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 catch{resetError.value='导出失败，请检查当前浏览器存储权限。';}
}
async function resetData() {
  if (resetting.value) return;
  resetting.value = true;
  resetError.value = '';
  try {
    await resetLocalAppData();
    window.location.reload();
  } catch {
    resetError.value = '清理未完成，部分数据可能已清除。请检查浏览器存储权限，关闭其他旧页面后重试。';
    resetting.value = false;
  }
}
</script>

<template>
  <div class="vb-page-title">
    <div>
      <p class="vb-eyebrow">项目介绍 · 使用边界 · 隐私说明</p>
      <h1>关于维衡 AI</h1>
      <p>维衡 AI：面向全年龄段的饮食记录与营养分析工具，帮助用户计算能量、宏量营养素、维生素和矿物质摄入，了解饮食结构，并安排下一餐。</p>
    </div>
    <span class="vb-local-chip"><span class="vb-status-dot" />{{ accountUser ? '账号保存 · AI 按需联网' : '游客本地保存 · AI 按需联网' }}</span>
  </div>

  <section aria-labelledby="about-project-heading">
    <div class="vb-submission-section-heading vb-about-section-heading">
      <div><p class="vb-eyebrow">作品说明</p><h2 id="about-project-heading">从食物证据到日常建议</h2></div>
      <span>功能流程与实现依据</span>
    </div>
    <SubmissionGuidePage embedded @navigate="$emit('navigate', $event)" />
  </section>

  <ReferencePanel />
  <section class="vb-about-safety" aria-labelledby="about-safety-heading">
    <div class="vb-submission-section-heading vb-about-section-heading">
      <div><p class="vb-eyebrow">安全中心</p><h2 id="about-safety-heading">使用边界与隐私</h2></div>
      <span>把营养信息作为参考</span>
    </div>
    <SafetyPage :flags="flags" embedded />
  </section>

  <section class="vb-glass vb-reset-section" aria-labelledby="about-reset-heading">
    <div><p class="vb-eyebrow">当前使用空间的数据管理</p><h2 id="about-reset-heading">导出、清除缓存与数据</h2><p>{{ accountUser ? '导出当前账号空间的档案与食物记录，不包含备注、照片、附件和聊天。档案、食物记录、草稿与膳食方案同步到本地网站服务端；文字聊天也按账号同步；照片附件文件和分析报告仍保存在当前浏览器。' : '导出当前游客空间的档案与食物记录，不包含备注、照片、附件和聊天。游客数据保存在当前浏览器，不会自动同步到其他设备。' }}</p><button class="vb-text-button" @click="exportRecords">导出档案与食物记录（JSON）</button><p class="vb-section-note">重置会删除当前使用空间的档案、记录、草稿、聊天、照片、报告及设置。已登录时同时清除当前账号服务端数据；共用同一游客空间的使用者都会受影响，其他账号空间不清除。</p><p v-if="resetError" role="alert">{{ resetError }}</p></div>
    <button class="vb-button vb-button-quiet vb-reset-button" @click="confirmReset=true">清空数据并重置</button>
  </section>
  <ModalShell v-if="confirmReset" :title="accountUser ? '确认清空当前账号数据？' : '确认清空当前游客数据？'" @close="!resetting && (confirmReset=false)">
    <p>身体档案、饮食记录、草稿、聊天、照片与附件、AI 报告及偏好设置都会被删除，无法撤销。{{ accountUser ? '同时会删除此账号保存在本地网站服务端的档案、饮食记录、草稿与膳食方案。' : '' }}重置后需要重新建立档案。</p>
    <p>仅清理当前浏览器当前使用空间；共用同一访客空间的使用者都会受影响。其他账号空间不清除，同一空间的其他页面也会刷新。</p>
    <p v-if="resetError" class="vb-field-error" role="alert">{{ resetError }}</p>
    <div class="vb-reset-actions"><button class="vb-button vb-button-quiet" :disabled="resetting" @click="confirmReset=false">取消</button><button class="vb-button vb-button-primary" :disabled="resetting" @click="resetData">{{ resetting ? '正在清理…' : '确认清空并重置' }}</button></div>
  </ModalShell>
</template>
