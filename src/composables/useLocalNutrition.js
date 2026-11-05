import {appendPlanToDraft} from '../lib/planDraft.js';
import { appStorage } from '../lib/storageScope.js';
// @ts-check
import { reactive, computed, watch, ref } from 'vue';
import { calculateNutrition, validateProfile, ACTIVITIES } from '../lib/nutrition.js';
import { makeRecord, recordEntries, recordVersion, validDate } from '../lib/foodNutrition.js';
import { FOOD_BY_ID } from '../data/catalogue.js';
import {createNutritionSnapshot,normalizeSnapshot} from '../lib/nutritionSnapshot.js';
import { isAppResetting } from '../lib/appDataReset.js';

/** @typedef {import('../types/nutrition').NutritionProfile} NutritionProfile */
/** @typedef {import('../types/nutrition').DailyRecord} DailyRecord */
/** @typedef {import('../types/nutrition').DailyRecordDraft} DailyRecordDraft */
/** @typedef {import('../types/nutrition').FoodEntryInput} FoodEntryInput */
/** @typedef {DailyRecordDraft & {recognition?: unknown, appliedBatches?: string[]}} StoredDraft */
/** @typedef {{profile: NutritionProfile|null, records: DailyRecord[], drafts: Record<string, StoredDraft>, plans: unknown[], habits: Record<string, string[]>, flags: string[], preferences: string, calculated?: unknown}} LocalNutritionState */

const STORAGE_KEY = 'weiheng.local.v2';
const THEME_KEY = 'weiheng.theme.v1';
/** @param {unknown} value */
const optionalNumber = value => value === undefined || value === null || (typeof value === 'string' && value.trim() === '') ? undefined : Number.isFinite(Number(value)) ? Number(value) : undefined;
/** @param {(Partial<NutritionProfile> & Record<string, any>)|null|undefined} profile */
function migrateProfile(profile) {
  if (!profile) return null;
  /** @type {'male'|'female'|''} */
  const sex = ['male', '男', '男性'].includes(profile.sex || profile.gender) ? 'male' : ['female', '女', '女性'].includes(profile.sex || profile.gender) ? 'female' : '';
  const aliases = /** @type {Record<string,string>} */ ({ low: 'sedentary', high: 'heavy', active: 'heavy' });
  const activity = ACTIVITIES.some(item => item.key === profile.activity) ? profile.activity : (aliases[String(profile.activity)] || '');
  if (validateProfile({ ...profile, sex, activity })) return null;
  const result = { ...profile, sex, age: optionalNumber(profile.age), height: optionalNumber(profile.height), weight: optionalNumber(profile.weight), activity };
  return validateProfile(result) ? null : { ...result, sex: /** @type {'male'|'female'} */ (sex), activity: String(activity) };
}
/** @returns {LocalNutritionState} */
function load() {
  const empty = { profile: null, records: [], drafts: {}, plans: [], habits: {}, flags: [], preferences: '' };
  try {
    /** @type {any} */
    const current = JSON.parse(appStorage.getItem(STORAGE_KEY) || 'null');
    if (current && typeof current === 'object') {
      // Earlier generic 白菜 entries had no source or preparation state. Ask for
      // confirmation before treating those saved weights as the new raw Napa sample.
      for(const record of [...(Array.isArray(current.records)?current.records:[]),...Object.values(current.drafts||{})])for(const entry of Array.isArray(record?.entries)?record.entries:[])if(entry.foodId==='cabbage'&&entry.name==='白菜')entry.referenceConfirmed=false;
      return { ...empty, ...current, drafts:current.drafts&&typeof current.drafts==='object'?current.drafts:{}, profile: migrateProfile(current.profile), records: Array.isArray(current.records) ? current.records : [] };
    }
    // Read legacy data once; keep the original keys untouched as a recovery copy.
    const legacy = JSON.parse(appStorage.getItem('vitabalance.v1') || appStorage.getItem('vitabalance.guest.v1') || 'null');
    const flagMap = [['medication','正在使用药物'],['condition','有需要管理的健康状况'],['special','孕期或哺乳期'],['supplements','正在使用营养补充剂']];
    return legacy ? { ...empty, profile: migrateProfile(legacy.profile), records: Array.isArray(legacy.records) ? legacy.records : [], plans: Array.isArray(legacy.plans) ? legacy.plans : [], flags: flagMap.filter(([key])=>legacy.profile?.[key]).map(([,label])=>label), preferences: [legacy.profile?.avoid,legacy.profile?.allergies ? '需要核对的过敏或不耐受项：'+legacy.profile.allergies : ''].filter(Boolean).join('；') } : empty;
  } catch { return empty; }
}
const state = reactive(load());
const storageError = ref('');
let applyingRemote=false;
if(typeof window!=='undefined')window.addEventListener('weiheng-account-synced',()=>{applyingRemote=true;try{Object.assign(state,load());}finally{applyingRemote=false;}});
const initialTheme = (() => { try { return appStorage.getItem(THEME_KEY); } catch { return null; } })();
const theme = ref(initialTheme === 'dark' ? 'dark' : 'light');
const nutrition = computed(() => calculateNutrition(state.flags.includes('孕期或哺乳期')?null:state.profile));
watch(state, () => {
  if (isAppResetting()||applyingRemote) return;
  try {
    // Store both inputs and derived values; recompute on load/profile changes.
    appStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, calculated: nutrition.value }));
    storageError.value = '';
  } catch { storageError.value = '浏览器未能保存，请检查本地存储空间或隐私设置。'; }
}, { deep: true, flush: 'sync' });
watch(theme, value => { if(isAppResetting())return;try { appStorage.setItem(THEME_KEY, value); } catch { storageError.value = '主题偏好暂时无法保存。'; } });

export function useLocalNutrition() {
  const records = computed(() => [...state.records].sort((a, b) => b.date.localeCompare(a.date)));
  /** @param {NutritionProfile} profile */
  function updateProfile(profile) {
    const error = validateProfile(profile);
    if (error) return error;
    state.profile = { ...state.profile, sex: profile.sex || '', ageMonths: optionalNumber(profile.ageMonths), physiologicalStage: profile.physiologicalStage || 'general', age: optionalNumber(profile.age), height: optionalNumber(profile.height), weight: optionalNumber(profile.weight), activity: profile.activity, updatedAt: new Date().toISOString() };
    return '';
  }
  /** @param {DailyRecord|DailyRecordDraft} record */
  function saveRecord(record) {
    if(isAppResetting())return{ok:false,error:'正在重置本地数据，已停止保存。'};
    if(!validDate(record.date))return{ok:false,error:'请选择有效日期。'};
    const previous=state.records.find(item=>item.date===record.date);
    const saved=Array.isArray(record.entries)?makeRecord(record,previous):/** @type {DailyRecord} */ ({...record,updatedAt:new Date().toISOString()});
    if(previous&&recordVersion(previous)===recordVersion(saved))return{ok:true,record:previous,unchanged:true};
    const next=[...state.records.filter(item=>item.date!==saved.date),saved];
    try{appStorage.setItem(STORAGE_KEY,JSON.stringify({...state,records:next,calculated:nutrition.value}));}catch{storageError.value='保存未完成：浏览器本地空间不足或禁止存储。请保留此页，调整后重试。';return{ok:false,error:storageError.value};}
    state.records=next;return{ok:true,record:saved};
  }
  /** @param {string} date @returns {StoredDraft|null} */
  function ensureDraft(date){if(!validDate(date))return null;if(!state.drafts[date]){const record=state.records.find(item=>item.date===date);state.drafts[date]={date,entries:recordEntries(record),notes:record?.notes||'',photoId:record?.photoId||null,recognition:null,appliedBatches:[]};}return state.drafts[date];}
  /** @param {FoodEntryInput & {date: string}} input */
  function addToDraft(input){const draft=ensureDraft(input.date);if(!draft)return false;const food=FOOD_BY_ID[input.foodId||''];draft.entries.push({id:crypto.randomUUID(),foodId:input.foodId||null,name:food?.name||input.name||'',grams:Number(input.grams),meal:input.meal||'unspecified',group:input.group,source:input.source||'catalogue',estimated:!!input.estimated,referenceConfirmed:true,nutritionSnapshot:normalizeSnapshot(input.nutritionSnapshot,food?.key)||createNutritionSnapshot(food)});return !storageError.value;}
  /** @param {string} date @param {string} key */
  function toggleHabit(date, key) {
    const current = new Set(state.habits[date] || []);
    current.has(key) ? current.delete(key) : current.add(key);
    state.habits[date] = [...current];
  }
  function addPlanToDraft(payload){
    if(isAppResetting())return{ok:false,error:'正在重置数据，暂停添加。'};
    try{const current=state.drafts[payload.date]||{date:payload.date,entries:recordEntries(state.records.find(x=>x.date===payload.date)),appliedBatches:[]};
      const result=appendPlanToDraft(current,payload);if(result.duplicate)return{ok:true,duplicate:true};
      const next={...state.drafts,[payload.date]:result.draft};appStorage.setItem(STORAGE_KEY,JSON.stringify({...state,drafts:next,calculated:nutrition.value}));state.drafts=next;return{ok:true,duplicate:false};
    }catch(e){return{ok:false,error:e.message||'方案保存失败，请保留当前页。'};}
  }
  return { state, theme, nutrition, records, storageError, updateProfile, saveRecord, ensureDraft, addToDraft, addPlanToDraft, toggleHabit };
}

