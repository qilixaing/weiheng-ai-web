<script setup>
import {ref,shallowRef,computed,onMounted,onBeforeUnmount,markRaw,watch} from 'vue';
import AppSidebar from './components/AppSidebar.vue';
import AppIcon from './components/AppIcon.vue';
import OverviewPage from './pages/OverviewPage.vue';
import AccountDialog from './components/AccountDialog.vue';
import {initializeStorageScope,appStorage,accountUser} from './lib/storageScope.js';
import {useThemeTransition} from './composables/useThemeTransition.js';
import {preloadAppAssets} from './lib/preloadApp.js';

const fullApp=shallowRef(null),identityReady=ref(false),preview=ref({}),recordCount=ref(0);
const initialPage=ref('overview'),initialEditor=ref(false),accountOpen=ref(false),theme=ref('light');
const titles={overview:'概览',dietAssistant:'维衡AI助手',diary:'饮食记录',mealplan:'膳食方案',assessment:'营养分析',food:'食物浏览',profile:'个人档案',about:'关于'};
const error=ref(''),busy=ref(false),pendingAction=ref(false),pendingLogin=ref(false);
const {toggleTheme}=useThemeTransition(theme);
watch(theme,value=>{if(identityReady.value){try{appStorage.setItem('weiheng.theme.v1',value);}catch{}}});
const status=computed(()=>!identityReady.value?'正在连接账号':accountUser.value?'账号数据同步':'游客本地保存 · AI 按需联网');
let disposed=false,attempt=0;
function readPreview(){
  try{
    const state=JSON.parse(appStorage.getItem('weiheng.local.v2')||appStorage.getItem('vitabalance.v1')||appStorage.getItem('vitabalance.guest.v1')||'{}');
    const p=state.profile||{},sex=p.sex||p.gender;
    preview.value={...p,sex:['male','男','男性'].includes(sex)?'male':['female','女','女性'].includes(sex)?'female':'',activity:({low:'sedentary',high:'heavy',active:'heavy'})[p.activity]||p.activity,
      ...((state.flags||[]).includes('孕期或哺乳期')?{physiologicalStage:'special'}:{})};
    recordCount.value=Array.isArray(state.records)?state.records.length:0;
    theme.value=appStorage.getItem('weiheng.theme.v1')==='dark'?'dark':'light';
  }catch{error.value='本机档案暂时无法读取，已有数据会保留。';}
}
async function bounded(promise,milliseconds){
  let timer;
  try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('timeout')),milliseconds);})]);}
  finally{clearTimeout(timer);}
}
async function loadFeatures(){
  if(busy.value||fullApp.value)return;
  busy.value=true;error.value='';const current=++attempt;
  try{
    if(!identityReady.value){await initializeStorageScope();if(disposed)return;identityReady.value=true;readPreview();if(pendingLogin.value)accountOpen.value=true;}
    // Confirm identity before App evaluates account-scoped storage.
    const module=await bounded(import('./App.vue'),30000);
    if(!disposed&&current===attempt)fullApp.value=markRaw(module.default);
  }catch{
    if(!disposed&&current===attempt)error.value=identityReady.value?'部分功能暂未载入，首页仍可查看。':'账号连接暂未完成，首页仍可查看，已有数据会保留。';
  }finally{if(current===attempt)busy.value=false;}
}
function navigate(page){if(!Object.hasOwn(titles,page))return;initialPage.value=page;pendingAction.value=page!=='overview';void loadFeatures();window.scrollTo({top:0,behavior:'auto'});}
function edit(){initialEditor.value=true;pendingAction.value=true;void loadFeatures();}
function login(){if(identityReady.value)accountOpen.value=true;else{pendingLogin.value=true;pendingAction.value=true;void loadFeatures();}}
onMounted(()=>{void preloadAppAssets();void loadFeatures();});
onBeforeUnmount(()=>{disposed=true;attempt++;});
</script>
<template>
 <component :is="fullApp" v-if="fullApp&&!accountOpen" :initial-page="initialPage" :initial-editor="initialEditor" />
 <div v-else class="vb-app" :data-theme="theme">
  <AppSidebar :active="initialPage" @navigate="navigate" />
  <div class="vb-main">
   <header class="vb-topbar"><span class="vb-breadcrumb"><span>营养工作台</span><i>/</i>{{titles[initialPage]}}</span><div class="vb-topbar-actions"><span class="vb-local-chip"><i class="vb-status-dot" />{{status}}</span><button class="vb-account-trigger" @click="login">{{accountUser?'账号':'登录'}}</button><button class="vb-theme-button" :aria-label="theme==='light'?'切换至深色模式':'切换至浅色模式'" @click="toggleTheme"><AppIcon :name="theme==='light'?'moon':'sun'" :size="19" /></button><button class="vb-avatar" aria-label="查看个人档案" @click="navigate('profile')"><AppIcon name="person" :size="18" /></button></div></header>
   <main class="vb-content">
    <p v-if="error" class="vb-inline-note" role="status">{{error}}<button class="vb-text-button" @click="loadFeatures">重试</button></p>
    <OverviewPage v-if="initialPage==='overview'" :profile="preview" :records="[]" :record-count="recordCount" defer-intake @navigate="navigate" @edit="edit" />
    <section v-else class="vb-glass vb-plan-context" aria-busy="true"><div><h1>{{titles[initialPage]}}</h1><p role="status">{{error?'请重试加载此页面。':'正在载入…'}}</p></div></section>
    <footer class="vb-footer"><AppIcon name="leaf" :size="14" />维衡 AI · 把健康，放进每一餐<span>营养信息仅供一般参考 · © 2026 维衡 AI 版权所有</span></footer>
   </main>
  </div>
  <AccountDialog v-if="accountOpen" @close="accountOpen=false" />
 </div>
</template>
