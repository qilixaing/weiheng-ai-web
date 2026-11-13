<script setup>
import {ref,computed,nextTick,onBeforeUnmount} from 'vue';
import {useLocalNutrition} from './composables/useLocalNutrition.js';
import {useAiReports} from './composables/useAiReports';
import {FOOD_BY_ID,ensureFoodDetails} from './data/catalogue.js';
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
import { accountUser, accountSyncStatus, currentActor } from './lib/storageScope.js';
import {useThemeTransition} from './composables/useThemeTransition.js';

const {state,theme,nutrition,records,storageError,updateProfile,saveRecord,clearDraftAfterSave,addToDraft,addPlanToDraft,toggleHabit}=useLocalNutrition();
const {toggleTheme}=useThemeTransition(theme);
const {reports,reportStorageError,loadReports,latestReport,isStale,generateReport}=useAiReports();loadReports();
const launch=defineProps({initialPage:{type:String,default:'overview'},initialEditor:Boolean});
const effectiveProfile=computed(()=>state.flags.includes('孕期或哺乳期')?{...state.profile,physiologicalStage:'special'}:(state.profile||{}));
const active=ref(launch.initialPage),wizardOpen=ref(launch.initialEditor),accountOpen=ref(false),toast=ref(null),content=ref(null),detailFood=ref(null),diaryDate=ref(todayDate()),saving=ref(false);
const reportDate=ref(''),reportId=ref(''),analysisError=ref('');
const report=computed(()=>reports.value.find(item=>item.id===reportId.value)||latestReport(reportDate.value));
const reportRecord=computed(()=>state.records.find(item=>item.date===reportDate.value));
const titles={overview:'概览',dietAssistant:'维衡AI助手',assessment:'营养分析',mealplan:'膳食方案',diary:'饮食记录',food:'食物浏览',profile:'个人档案',about:'关于'};
const storageLabel=computed(()=>!accountUser.value?'游客本地保存 · AI 按需联网':accountSyncStatus.value==='error'?'账号同步暂不可用 · 本机副本保留':accountSyncStatus.value==='syncing'||accountSyncStatus.value==='pending'?'账号数据同步中…':'邮箱账号 · 服务器保存');
let toastTimer;let analysisSequence=0;
function notify(message,undo=null){clearTimeout(toastTimer);toast.value={message,undo};toastTimer=setTimeout(()=>toast.value=null,7000);}
function navigate(page){active.value=page;window.scrollTo({top:0,behavior:'auto'});nextTick(()=>content.value?.focus({preventScroll:true}));}
function openAccount(){wizardOpen.value=false;accountOpen.value=true;}
function closeAccount(){accountOpen.value=false;}
function finishProfile(profile){const error=updateProfile(profile);if(error){notify(error);return;}wizardOpen.value=false;navigate('overview');notify(accountUser.value?'身体档案已保存，账号同步状态可在账号面板查看':'身体档案已保存到当前浏览器');}
async function analyze(record,force=false){const request=++analysisSequence;analysisError.value='';reportDate.value=record.date;reportId.value='';try{const task=generateReport(record,effectiveProfile.value,{force});await nextTick();const result=await task;if(request===analysisSequence&&reportDate.value===record.date)reportId.value=result?.id||'';}catch(error){if(request===analysisSequence)analysisError.value=error.message||'分析暂时不可用，请重试。';}}
function saved(draft){if(saving.value)return;saving.value=true;try{const result=saveRecord(draft);if(!result.ok){notify(result.error);return;}diaryDate.value=result.record.date;clearDraftAfterSave(result.record.date,result.record);notify('饮食记录已保存，正在分析');void analyze(result.record);}finally{saving.value=false;}}
function openAnalysis(date,id){const existing=id?reports.value.find(item=>item.id===id):latestReport(date);reportDate.value=date;reportId.value=id||'';analysisError.value='';const record=state.records.find(item=>item.date===date);if(!record)return;}
function retryAnalysis(date=reportDate.value){const record=state.records.find(item=>item.date===date);if(record)analyze(record,true);}
function addFood(input){if(!validDate(input.date)||input.date>todayDate()||Number(input.grams)<0.1||Number(input.grams)>5000){notify('请核对日期与食用克数。');return;}const ok=addToDraft(input);diaryDate.value=input.date;detailFood.value=null;navigate('diary');notify(ok?'已加入“本次选择”，核对后保存这一天。':'已加入当前页面，但本地存储失败，请保留此页。');}
async function addAgentPlan(payload){const actor=currentActor();try{await ensureFoodDetails(payload.items.map(item=>item.foodId));if(actor!==currentActor())return;}catch(e){payload.onResult?.({ok:false,error:e.message});notify(e.message);return;}const result=addPlanToDraft(payload);payload.onResult?.(result);if(!result.ok){notify(result.error);return;}diaryDate.value=payload.date;navigate('diary');notify(result.duplicate?'该方案已加入草稿，不会重复添加。':'已加入本次选择；实际吃过后核对份量并保存当天记录。');}
function removeRecord(date){const record=state.records.find(item=>item.date===date);if(!record)return;state.records=state.records.filter(item=>item.date!==date);notify('这条饮食记录已删除，报告快照仍保留。',()=>{saveRecord(record);toast.value=null;});}
onBeforeUnmount(()=>clearTimeout(toastTimer));
</script>
<template>
 <!-- Content-only application; the existing background canvas is outside this root. -->
 <div class="vb-app" :class="{'is-diary':active==='diary','is-chat':active==='dietAssistant'}" :data-theme="theme">
  <div :inert="wizardOpen||detailFood||reportDate||undefined">
   <AppSidebar :active="active" @navigate="navigate" />
   <div class="vb-main"><header class="vb-topbar"><span class="vb-breadcrumb"><span>营养工作台</span><i>/</i>{{ titles[active] }}</span><div class="vb-topbar-actions"><span class="vb-local-chip"><i class="vb-status-dot" />{{ storageLabel }}</span><button class="vb-account-trigger" @click="openAccount">{{ accountUser ? '账号' : '登录' }}</button><button class="vb-theme-button" :aria-label="theme==='light'?'切换至深色模式':'切换至浅色模式'" @click="toggleTheme"><AppIcon :name="theme==='light'?'moon':'sun'" :size="19" /></button><button class="vb-avatar" aria-label="查看个人档案" @click="navigate('profile')"><AppIcon name="person" :size="18" /></button></div></header>
    <main ref="content" class="vb-content" tabindex="-1"><p v-if="storageError||reportStorageError" class="vb-storage-error" role="alert">{{ storageError||reportStorageError }}</p><template v-if="true">
     <!-- Keep the chat page mounted while navigating so an in-flight SSE request survives route changes. -->
     <AiDietAssistantPage v-show="active==='dietAssistant'" :active="active==='dietAssistant'" :records="state.records" :targets="nutrition" :profile="effectiveProfile" :initial-date="diaryDate" />
     <OverviewPage v-if="active==='overview'" :profile="effectiveProfile" :nutrition="nutrition" :record-count="records.length" :records="records" :reports="reports" @edit="wizardOpen=true" @navigate="navigate" />
     <AiNutritionAssessmentPage v-if="active==='assessment'" :records="records" :habits="state.habits" :flags="state.flags" :reports="reports" :profile="effectiveProfile" @navigate="navigate" @toggle-habit="toggleHabit" @open-report="openAnalysis" @retry-report="retryAnalysis" />
     <DiaryPage v-else-if="active==='diary'" :records="records" :reports="reports" :profile="effectiveProfile" :nutrition="nutrition" :initial-date="diaryDate" :saving="saving" @save="saved" @remove="removeRecord" @analysis="openAnalysis" @browse="navigate('food')" @detail="detailFood=FOOD_BY_ID[$event]" />
     <FoodBrowserPage v-else-if="active==='food'" @detail="detailFood=FOOD_BY_ID[$event]" />
     <MealplanPage v-else-if="active==='mealplan'" :nutrition="nutrition" :preferences="state.preferences" :flags="state.flags" :profile="effectiveProfile" :records="state.records" @navigate="navigate" @add-plan="addAgentPlan" />
     <ProfilePage v-else-if="active==='profile'" :profile="effectiveProfile" :nutrition="nutrition" v-model:flags="state.flags" v-model:preferences="state.preferences" @edit="wizardOpen=true" />
     <AboutPage v-else-if="active==='about'" :flags="state.flags" @navigate="navigate" />
    </template><footer class="vb-footer"><AppIcon name="leaf" :size="14" />维衡 AI · 把健康，放进每一餐<span>营养信息仅供一般参考 · © 2026 维衡 AI 版权所有</span></footer></main>
   </div>
  </div>
  <ProfileWizard v-if="wizardOpen" :profile="state.profile" @complete="finishProfile" @close="wizardOpen=false" @login="openAccount" />
  <AccountDialog v-if="accountOpen" @close="closeAccount" />
  <FoodDetailModal v-if="detailFood" :food-id="detailFood.key" @close="detailFood=null" @add="addFood" />
  <AiReportModal v-if="reportDate" :report="report" :record="reportRecord" :stale="report?isStale(report,reportRecord,effectiveProfile):false" :error="analysisError" @close="reportDate='';reportId=''" @retry="retryAnalysis()" />
  <div v-if="toast" class="vb-toast" role="status"><AppIcon name="check" :size="17" /><span>{{ toast.message }}</span><button v-if="toast.undo" @click="toast.undo">撤销</button><button class="vb-toast-close" aria-label="关闭通知" @click="toast=null"><AppIcon name="close" :size="15" /></button></div>
 </div>
</template>
