<script setup>
import {ref,computed,nextTick,onBeforeUnmount} from 'vue';
import {useLocalNutrition} from './composables/useLocalNutrition.js';
import {useAiReports} from './composables/useAiReports';
import {FOOD_BY_ID} from './data/catalogue.js';
import {todayDate,validDate,MACROS} from './lib/foodNutrition.js';
import AppIcon from './components/AppIcon.vue';
import AppSidebar from './components/AppSidebar.vue';
import ProfileWizard from './components/ProfileWizard.vue';
import FoodDetailModal from './components/FoodDetailModal.vue';
import AiReportModal from './components/AiReportModal.vue';
import OverviewPage from './pages/OverviewPage.vue';
import AiDietAssistantPage from './pages/AiDietAssistantPage.vue';
import AiNutritionAssessmentPage from './pages/AiNutritionAssessmentPage.vue';
import DiaryPage from './pages/DiaryPage.vue';
import FoodBrowserPage from './pages/FoodBrowserPage.vue';
import MealplanPage from './pages/MealplanPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import AboutPage from './pages/AboutPage.vue';
import AccountDialog from './components/AccountDialog.vue';
import { accountUser, accountSyncStatus } from './lib/storageScope.js';

const {state,theme,nutrition,records,storageError,updateProfile,saveRecord,addToDraft,addPlanToDraft,toggleHabit}=useLocalNutrition();
const {reports,reportStorageError,loadReports,latestReport,isStale,generateReport}=useAiReports();loadReports();
const effectiveProfile=computed(()=>state.flags.includes('孕期或哺乳期')?{...state.profile,physiologicalStage:'special'}:state.profile);
const active=ref('overview'),wizardOpen=ref(!state.profile),accountOpen=ref(false),toast=ref(null),content=ref(null),detailFood=ref(null),diaryDate=ref(todayDate()),saving=ref(false);
const reportDate=ref(''),reportId=ref(''),analysisError=ref('');
const report=computed(()=>reports.value.find(item=>item.id===reportId.value)||latestReport(reportDate.value));
const reportRecord=computed(()=>state.records.find(item=>item.date===reportDate.value));
const titles={overview:'概览',dietAssistant:'AI 饮食助手',assessment:'营养分析',mealplan:'膳食方案',diary:'饮食记录',food:'食物浏览',profile:'个人档案',about:'关于'};
const storageLabel=computed(()=>!accountUser.value?'游客本地保存 · AI 按需联网':accountSyncStatus.value==='error'?'账号同步暂不可用 · 本机副本保留':accountSyncStatus.value==='syncing'||accountSyncStatus.value==='pending'?'账号数据同步中…':'邮箱账号 · 服务器保存');
let toastTimer;
function notify(message,undo=null){clearTimeout(toastTimer);toast.value={message,undo};toastTimer=setTimeout(()=>toast.value=null,7000);}
function navigate(page){active.value=page;window.scrollTo({top:0,behavior:'auto'});nextTick(()=>content.value?.focus({preventScroll:true}));}
function openAccount(){wizardOpen.value=false;accountOpen.value=true;}
function closeAccount(){accountOpen.value=false;if(!state.profile)wizardOpen.value=true;}
function finishProfile(profile){const error=updateProfile(profile);if(error){notify(error);return;}wizardOpen.value=false;navigate('overview');notify('身体档案已更新，并保存到当前浏览器');}
async function analyze(record,force=false){analysisError.value='';reportDate.value=record.date;reportId.value='';try{const task=generateReport(record,state.profile,{force});await nextTick();const result=await task;if(reportDate.value===record.date)reportId.value=result?.id||'';}catch(error){analysisError.value=error.message||'报告暂时无法保存，请检查浏览器存储权限。';}}
async function saved(draft){if(saving.value)return;saving.value=true;try{const result=saveRecord(draft);if(!result.ok){notify(result.error);return;}notify('这一天的饮食记录已保存');await analyze(result.record);}finally{saving.value=false;}}
function openAnalysis(date,id){const existing=id?reports.value.find(item=>item.id===id):latestReport(date);reportDate.value=date;reportId.value=id||'';analysisError.value='';const record=state.records.find(item=>item.date===date);if(!record)return;if(!existing){analyze(record);return;}const needsEstimate=existing.status==='complete'&&!existing.calculation?.estimation&&(existing.snapshot?.entries||[]).some(entry=>{const food=entry.referenceConfirmed===false?null:FOOD_BY_ID[entry.foodId];return MACROS.some(metric=>typeof food?.nutrients?.[metric.id]!=='number');});if(needsEstimate)analyze(record,true);}
function retryAnalysis(date=reportDate.value){const record=state.records.find(item=>item.date===date);if(record)analyze(record,true);}
function addFood(input){if(!validDate(input.date)||input.date>todayDate()||Number(input.grams)<0.1||Number(input.grams)>5000){notify('请核对日期与食用克数。');return;}const ok=addToDraft(input);diaryDate.value=input.date;detailFood.value=null;navigate('diary');notify(ok?'已加入“本次选择”，核对后保存这一天。':'已加入当前页面，但本地存储失败，请保留此页。');}
function addAgentPlan(payload){const result=addPlanToDraft(payload);payload.onResult?.(result);if(!result.ok){notify(result.error);return;}diaryDate.value=payload.date;navigate('diary');notify(result.duplicate?'该方案已加入草稿，不会重复添加。':'已加入本次选择；实际吃过后核对份量并保存当天记录。');}
function removeRecord(date){const record=state.records.find(item=>item.date===date);if(!record)return;state.records=state.records.filter(item=>item.date!==date);notify('这条饮食记录已删除，报告快照仍保留。',()=>{saveRecord(record);toast.value=null;});}
onBeforeUnmount(()=>clearTimeout(toastTimer));
</script>
<template>
 <!-- Content-only application; the existing background canvas is outside this root. -->
 <div class="vb-app" :class="{'is-diary':active==='diary','is-chat':active==='dietAssistant'}" :data-theme="theme">
  <div :inert="wizardOpen||detailFood||reportDate||undefined">
   <AppSidebar :active="active" @navigate="navigate" />
   <div class="vb-main"><header class="vb-topbar"><span class="vb-breadcrumb"><span>营养工作台</span><i>/</i>{{ titles[active] }}</span><div class="vb-topbar-actions"><span class="vb-local-chip"><i class="vb-status-dot" />{{ storageLabel }}</span><button class="vb-account-trigger" @click="openAccount">{{ accountUser ? '账号' : '登录' }}</button><button class="vb-theme-button" :aria-label="theme==='light'?'切换至深色模式':'切换至浅色模式'" @click="theme=theme==='light'?'dark':'light'"><AppIcon :name="theme==='light'?'moon':'sun'" :size="19" /></button><button class="vb-avatar" aria-label="查看个人档案" @click="navigate('profile')"><AppIcon name="person" :size="18" /></button></div></header>
    <main ref="content" class="vb-content" tabindex="-1"><p v-if="storageError||reportStorageError" class="vb-storage-error" role="alert">{{ storageError||reportStorageError }}</p><template v-if="state.profile">
     <!-- Keep the chat page mounted while navigating so an in-flight SSE request survives route changes. -->
     <AiDietAssistantPage v-show="active==='dietAssistant'" :records="state.records" :targets="nutrition" :profile="effectiveProfile" />
     <OverviewPage v-if="active==='overview'" :profile="effectiveProfile" :nutrition="nutrition" :record-count="records.length" :records="records" @edit="wizardOpen=true" @navigate="navigate" />
     <AiNutritionAssessmentPage v-if="active==='assessment'" :records="records" :habits="state.habits" :flags="state.flags" :reports="reports" :profile="effectiveProfile" @navigate="navigate" @toggle-habit="toggleHabit" @open-report="openAnalysis" @retry-report="retryAnalysis" />
     <DiaryPage v-else-if="active==='diary'" :records="records" :reports="reports" :profile="effectiveProfile" :nutrition="nutrition" :initial-date="diaryDate" :saving="saving" @save="saved" @remove="removeRecord" @analysis="openAnalysis" @browse="navigate('food')" @detail="detailFood=FOOD_BY_ID[$event]" />
     <FoodBrowserPage v-else-if="active==='food'" @detail="detailFood=FOOD_BY_ID[$event]" />
     <MealplanPage v-else-if="active==='mealplan'" :nutrition="nutrition" :preferences="state.preferences" :flags="state.flags" :profile="effectiveProfile" :records="state.records" @navigate="navigate" @add-plan="addAgentPlan" />
     <ProfilePage v-else-if="active==='profile'" :profile="effectiveProfile" :nutrition="nutrition" v-model:flags="state.flags" v-model:preferences="state.preferences" @edit="wizardOpen=true" />
     <AboutPage v-else-if="active==='about'" :flags="state.flags" @navigate="navigate" />
    </template><section v-else class="vb-onboarding-placeholder"><p class="vb-eyebrow">从自己开始，找到饮食的平衡</p><h1>欢迎来到维衡</h1><p>一份简单的身体档案，开启你的营养日常。</p></section><footer class="vb-footer"><AppIcon name="leaf" :size="14" />维衡 AI · 把健康，放进每一餐<span>营养信息仅供一般参考</span></footer></main>
   </div>
  </div>
  <ProfileWizard v-if="wizardOpen" :profile="state.profile" @complete="finishProfile" @close="wizardOpen=false" @login="openAccount" />
  <AccountDialog v-if="accountOpen" @close="closeAccount" />
  <FoodDetailModal v-if="detailFood" :food-id="detailFood.key" @close="detailFood=null" @add="addFood" />
  <AiReportModal v-if="reportDate" :report="report" :record="reportRecord" :stale="report?isStale(report,reportRecord,state.profile):false" :error="analysisError" @close="reportDate='';reportId=''" @retry="retryAnalysis()" />
  <div v-if="toast" class="vb-toast" role="status"><AppIcon name="check" :size="17" /><span>{{ toast.message }}</span><button v-if="toast.undo" @click="toast.undo">撤销</button><button class="vb-toast-close" aria-label="关闭通知" @click="toast=null"><AppIcon name="close" :size="15" /></button></div>
 </div>
</template>
