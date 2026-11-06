<script setup lang="ts">
import { appStorage, accountUser, chatSyncStatus, clearSyncedChat, syncChat } from '../lib/storageScope.js';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import AppIcon from '../components/AppIcon.vue';
import ChatMessageExport from '../components/ChatMessageExport.vue';
import {useChatScroll} from '../composables/useChatScroll';
import ModalShell from '../components/ModalShell.vue';
import { aiStream } from '../lib/aiClient.js';
import { aiDisplayName } from '../lib/aiBranding.js';
import { appendPendingAssistantMessage } from '../lib/aiChatState.js';
import {requestedDocumentFormat} from '../lib/chatDocumentIntent.js';
import {selectChatThreads} from '../lib/chatSelection.js';
import { buildConversationMemory } from '../lib/chatMemory.js';
import { snapshotChatProfile } from '../lib/chatProfile.js';
import { isAppResetting } from '../lib/appDataReset.js';
import { prepareChatAttachment, saveChatAttachment, loadChatAttachment, deleteChatAttachment } from '../lib/chatAttachments';
import { CHAT_ATTACHMENT_ACCEPT, MAX_CHAT_ATTACHMENTS, MAX_HISTORY_ATTACHMENT_TEXT, MAX_HISTORY_IMAGES, chatFileKind } from '../lib/chatAttachmentRules.js';
import { todayDate, validDate } from '../lib/foodNutrition.js';
import type {
  AiDietChatMessage,
  AiDietChatRequestMessage,
  AiDietChatStreamEvent,
  AiDietChatTargets,
  ChatAttachment,
  ChatAttachmentMeta,
  DailyRecord,
  NutritionTargets,
  NutritionProfile,
} from '../types/nutrition';

interface ChatThread {
  id: string;
  date: string;
  createdAt: string;
  messages: AiDietChatMessage[];
}

const props = withDefaults(defineProps<{
  active?: boolean;
  records: DailyRecord[];
  targets: NutritionTargets | null;
  profile: NutritionProfile | null;
}>(), {
  active: true,
  records: () => [],
  targets: null,
  profile: null,
});

const STORAGE_KEY = 'weiheng.ai-diet-chat.v1';
const QUICK_QUESTIONS = [
  '分析今天已记录的营养摄入，并说明数据完整性。',
  '查看已记录食物的维生素和矿物质摄入情况，缺失数据请说明。',
  '解释我的营养参考值及其适用范围。',
  '根据饮食记录安排下一餐，先询问必要的就餐条件。',
];

function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadStoredState(): { threads: ChatThread[]; activeByDate: Record<string, string>; memoryEnabled: boolean } {
  try {
    const parsed: unknown = JSON.parse(appStorage.getItem(STORAGE_KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return { threads: [], activeByDate: {}, memoryEnabled: true };
    const stored = parsed as { threads?: unknown; activeByDate?: unknown; memoryEnabled?: unknown };
    const threads = Array.isArray(stored.threads) ? stored.threads.flatMap((item): ChatThread[] => {
      if (!item || typeof item !== 'object') return [];
      const thread = item as Partial<ChatThread>;
      if (typeof thread.id !== 'string' || !validDate(thread.date) || !Array.isArray(thread.messages)) return [];
      return [{
        id: thread.id,
        date: thread.date,
        createdAt: typeof thread.createdAt === 'string' ? thread.createdAt : new Date().toISOString(),
        messages: thread.messages.filter((message): message is AiDietChatMessage => Boolean(
          message && typeof message === 'object'
          && ['user', 'assistant'].includes((message as AiDietChatMessage).role)
          && typeof (message as AiDietChatMessage).content === 'string',
        )).map((message) => message.status === 'sending'
          ? { ...message, status: 'failed', error: '页面刷新时请求中断。点击重试可继续这条问题。' }
          : message),
      }];
    }) : [];
    const activeByDate = stored.activeByDate && typeof stored.activeByDate === 'object'
      ? Object.fromEntries(Object.entries(stored.activeByDate as Record<string, unknown>).filter(([date, id]) => validDate(date) && typeof id === 'string'))
      : {};
    return { threads: threads.slice(-60), activeByDate: activeByDate as Record<string, string>, memoryEnabled: stored.memoryEnabled !== false };
  } catch {
    return { threads: [], activeByDate: {}, memoryEnabled: true };
  }
}

const stored = loadStoredState();
const threads = ref<ChatThread[]>(stored.threads);
const activeByDate = ref<Record<string, string>>(selectChatThreads(stored,stored.activeByDate));
const explicitEmptyThreads=new Set<string>();
const memoryEnabled = ref(stored.memoryEnabled);
const date = ref(todayDate());
const draft = ref('');
interface DraftAttachment extends ChatAttachmentMeta {
  status: 'reading' | 'ready' | 'failed';
  value?: ChatAttachment;
  error?: string;
}
const fileInput = ref<HTMLInputElement | null>(null);
const draftAttachments = ref<DraftAttachment[]>([]);
const attachmentCache = ref<Record<string, ChatAttachment>>({});
const previewAttachment = ref<ChatAttachment | null>(null);
const hasReadyAttachment = computed(() => draftAttachments.value.some((item) => item.status === 'ready'));
let attachmentBatchVersion = 0;
const storageError = ref('');
const notice = ref('');
const conversation = ref<HTMLElement | null>(null);
const conversationContent = ref<HTMLElement | null>(null);
const sending = computed(() => threads.value.some((thread) => thread.messages.some((message) => message.status === 'sending')));
const record = computed(() => props.records.find((item) => item.date === date.value));
const entries = computed(() => record.value?.entries || []);
const dailyTargets = computed<AiDietChatTargets>(() => ({
  energy: typeof props.targets?.tdee === 'number' ? props.targets.tdee : null,
  protein: props.targets?.macros?.find((item) => item.id === 'protein')?.grams ?? null,
  carbs: props.targets?.macros?.find((item) => item.id === 'carbs')?.grams ?? null,
  fat: props.targets?.macros?.find((item) => item.id === 'fat')?.grams ?? null,
}));
const currentThread = computed(() => threads.value.find((thread) => thread.id === activeByDate.value[date.value]));
const currentMessages = computed(() => currentThread.value?.messages || []);
const {showJump,onScroll,onContentLoad,jumpToLatest}=useChatScroll({viewport:conversation,content:conversationContent,active:computed(()=>props.active),thread:computed(()=>currentThread.value?.id),messages:currentMessages});
const dateThreads = computed(() => threads.value
  .filter((thread) => thread.date === date.value)
  .sort((left, right) => right.createdAt.localeCompare(left.createdAt)));

const historyThreads=computed(()=>threads.value.filter(t=>t.messages.length).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)));
function openHistory(event:Event){const id=(event.target as HTMLSelectElement).value,thread=threads.value.find(t=>t.id===id);if(thread){date.value=thread.date;activeByDate.value[thread.date]=thread.id;}}
function exportQuestion(messageId:string){const list=currentMessages.value,index=list.findIndex(m=>m.id===messageId);return list.slice(0,index).reverse().find(m=>m.role==='user')?.content||'';}
function attachmentMeta(value: ChatAttachment): ChatAttachmentMeta {
  const { id, kind, name, size, mimeType } = value;
  return { id, kind, name, size, mimeType };
}

function formatFileSize(size: number): string {
  return size >= 1024 * 1024 ? `${(size / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(size / 1024))} KB`;
}

async function addAttachments(files: File[]): Promise<void> {
  const batchVersion = attachmentBatchVersion;
  notice.value = '';
  for (const file of files) {
    if (batchVersion !== attachmentBatchVersion) break;
    if (draftAttachments.value.length >= MAX_CHAT_ATTACHMENTS) { notice.value = '每条消息最多添加 3 个附件。'; break; }
    let kind: 'image' | 'document';
    try { kind = chatFileKind(file); }
    catch (error) { notice.value = error instanceof Error ? error.message : '这个文件暂不支持。'; continue; }
    const id = makeId();
    draftAttachments.value.push({ id, kind, name: file.name.slice(0, 180), size: file.size, mimeType: file.type, status: 'reading' });
    try {
      const value = await prepareChatAttachment(file, id);
      if (!draftAttachments.value.some((item) => item.id === id)) continue;
      const textLength = draftAttachments.value.reduce((sum, item) => sum + (item.value?.text?.length || 0), value.text?.length || 0);
      if (textLength > MAX_HISTORY_ATTACHMENT_TEXT) throw new Error('本条消息的附件文字总量不能超过 60,000 字。');
      await saveChatAttachment(value);
      const item = draftAttachments.value.find((entry) => entry.id === id);
      if (!item) { await deleteChatAttachment(id); continue; }
      attachmentCache.value[id] = value;
      item.value = value;
      item.status = 'ready';
    } catch (error) {
      const item = draftAttachments.value.find((entry) => entry.id === id);
      if (item) { item.status = 'failed'; item.error = error instanceof Error ? error.message : '附件读取失败，请重新选择。'; }
    }
  }
}

function chooseAttachments(event: Event): void {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  input.value = '';
  void addAttachments(files);
}

function pasteAttachments(event: ClipboardEvent): void {
  const files = Array.from(event.clipboardData?.files || []).filter((file) => file.type.startsWith('image/'));
  if (!files.length) return;
  event.preventDefault();
  void addAttachments(files);
}

function dragAttachments(event: DragEvent): void {
  if (event.dataTransfer?.types.includes('Files')) event.preventDefault();
}

function dropAttachments(event: DragEvent): void {
  const files = Array.from(event.dataTransfer?.files || []);
  if (!files.length) return;
  event.preventDefault();
  void addAttachments(files);
}

function removeAttachment(id: string): void {
  draftAttachments.value = draftAttachments.value.filter((item) => item.id !== id);
  delete attachmentCache.value[id];
  void deleteChatAttachment(id).catch(() => { notice.value = '本地附件未能移除，请检查存储设置。'; });
}

function takeReadyAttachments(): ChatAttachment[] {
  const attachments = draftAttachments.value.flatMap((item) => item.status === 'ready' && item.value ? [item.value] : []);
  const ids = new Set(attachments.map((item) => item.id));
  draftAttachments.value = draftAttachments.value.filter((item) => !ids.has(item.id));
  return attachments;
}

async function previewFile(meta: ChatAttachmentMeta): Promise<void> {
  try {
    const value = attachmentCache.value[meta.id] || await loadChatAttachment(meta.id);
    if (!value) throw new Error('附件已不在本地存储中，请重新添加。');
    previewAttachment.value = value;
  } catch (error) { notice.value = error instanceof Error ? error.message : '无法预览附件。'; }
}

watch(() => currentMessages.value.flatMap((message) => message.attachments || []).map((item) => item.id).join(','), async () => {
  for (const meta of currentMessages.value.flatMap((message) => message.attachments || [])) {
    if (attachmentCache.value[meta.id]) continue;
    try {
      const value = await loadChatAttachment(meta.id);
      if (value) attachmentCache.value[meta.id] = value;
    } catch { /* Retry reports a missing attachment without losing the conversation. */ }
  }
}, { immediate: true });

function createThread(forDate: string): ChatThread {
  const thread: ChatThread = { id: makeId(), date: forDate, createdAt: new Date().toISOString(), messages: [] };
  threads.value.push(thread);
  if (threads.value.length > 60) {
    const removed = threads.value.splice(0, threads.value.length - 60);
    discardAttachments(removed.flatMap((item) => item.messages));
  }
  activeByDate.value[forDate] = thread.id;
  return thread;
}

function discardAttachments(messages: AiDietChatMessage[]): void {
  for (const item of messages.flatMap((message) => message.attachments || [])) {
    delete attachmentCache.value[item.id];
    void deleteChatAttachment(item.id).catch(() => { storageError.value = '部分旧附件未能清理，请检查浏览器存储设置。'; });
  }
}

function ensureThread(forDate: string): void {
  const activeId = activeByDate.value[forDate];
  if (activeId && threads.value.some((thread) => thread.id === activeId)) return;
  const latest = threads.value.filter((thread) => thread.date === forDate)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))[0];
  if (latest) activeByDate.value[forDate] = latest.id;
  else createThread(forDate);
}

ensureThread(date.value);
watch(date, (value) => {
  if (!validDate(value) || value > todayDate()) {
    date.value = todayDate();
    return;
  }
  ensureThread(value);
  notice.value = '';
});

let applyingRemote=false,pendingRemoteChat=false;
function applyRemoteChat(){
 if(sending.value){pendingRemoteChat=true;return;}
 pendingRemoteChat=false;applyingRemote=true;const next=loadStoredState();threads.value=next.threads;activeByDate.value=selectChatThreads(next,activeByDate.value,[...explicitEmptyThreads]);memoryEnabled.value=next.memoryEnabled;
 ensureThread(date.value);
 void nextTick(()=>{applyingRemote=false;});
}
window.addEventListener('weiheng-chat-synced',applyRemoteChat);
onBeforeUnmount(()=>window.removeEventListener('weiheng-chat-synced',applyRemoteChat));
let persistTimer: ReturnType<typeof setTimeout> | undefined;

function persistState(): void {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = undefined;
  if (isAppResetting()) return;
  try {
    appStorage.setItem(STORAGE_KEY, JSON.stringify({ threads: threads.value, activeByDate: activeByDate.value, memoryEnabled: memoryEnabled.value }));
    storageError.value = '';
  } catch {
    storageError.value = '浏览器未能保存对话记录；请检查本地存储空间或隐私设置。';
  }
}

function schedulePersist(): void {
  if(applyingRemote)return;
  if (persistTimer) clearTimeout(persistTimer);
  // Streaming can produce many tiny deltas. Batch local writes so storage work
  // does not compete with rendering each incoming chunk.
  persistTimer = setTimeout(persistState, 160);
}

watch([threads, activeByDate, memoryEnabled], schedulePersist, { deep: true });

function handlePageHide(): void {
  // Save the latest partial response before a real tab close or reload.
  persistState();
}

if (typeof window !== 'undefined') {window.addEventListener('pagehide', handlePageHide);window.addEventListener('weiheng-chat-flush',handlePageHide);}
onBeforeUnmount(() => {
  persistState();
  if (typeof window !== 'undefined') {window.removeEventListener('pagehide', handlePageHide);window.removeEventListener('weiheng-chat-flush',handlePageHide);}
});



let activeRequest: { controller: AbortController; assistantMessage: AiDietChatMessage } | undefined;

function interruptActiveRequest(): void {
  const request = activeRequest;
  if (!request) return;
  activeRequest = undefined;
  request.controller.abort();
  if (request.assistantMessage.status === 'sending') {
    request.assistantMessage.status = 'failed';
    request.assistantMessage.error = '这条回复已被新消息打断。你可以继续聊天，也可以重试这条问题。';
  }
  persistState();
}

function formatThreadTime(value: string): string {
  const dateValue = new Date(value);
  return Number.isNaN(dateValue.getTime()) ? '新对话' : dateValue.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function formatMessageTime(value: string): string {
  const dateValue = new Date(value);
  return Number.isNaN(dateValue.getTime()) ? '' : dateValue.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

function apiEntries() {
  return entries.value.map((entry) => ({
    foodId: entry.foodId,
    name: entry.name,
    grams: entry.grams,
    meal: entry.meal,
    referenceConfirmed: entry.referenceConfirmed,
  }));
}

async function buildRequestHistory(messages: AiDietChatMessage[], endIndex: number): Promise<AiDietChatRequestMessage[]> {
  // A failed assistant turn can be followed by newer successful turns. Keep only
  // the history before the requested turn, and discard unanswered/orphaned
  // messages so one old failure cannot break every later prompt.
  const complete = messages.slice(0, endIndex).filter((message) => message.status === 'complete');
  const balanced: AiDietChatRequestMessage[] = [];
  for (const { role, content, attachments } of complete) {
    const message = { role, content: content.slice(0, 1200), attachments };
    if (role === 'user') {
      if (balanced.at(-1)?.role === 'user') balanced[balanced.length - 1] = message;
      else balanced.push(message);
    } else if (balanced.at(-1)?.role === 'user') {
      balanced.push(message);
    }
  }
  while (balanced[0]?.role !== 'user') balanced.shift();
  const history = balanced.slice(-11);
  while (history.reduce((sum, message) => sum + message.content.length, 0) > 9000) history.splice(0, 2);
  let textLength = 0, imageCount = 0;
  for (let index = history.length - 1; index >= 0; index--) {
    const message = history[index];
    const attachments: ChatAttachment[] = [];
    let omitted = false;
    for (const meta of message.attachments || []) {
      const value = attachmentCache.value[meta.id] || await loadChatAttachment(meta.id);
      if (!value) {
        if (index === history.length - 1) throw new Error('找不到这条问题的本地附件，请重新添加后发送。');
        omitted = true; continue;
      }
      if (textLength + (value.text?.length || 0) > MAX_HISTORY_ATTACHMENT_TEXT || (value.kind === 'image' && imageCount >= MAX_HISTORY_IMAGES)) { omitted = true; continue; }
      textLength += value.text?.length || 0;
      if (value.kind === 'image') imageCount++;
      attachments.push(value);
    }
    message.attachments = attachments.length ? attachments : undefined;
    if (omitted) message.content = message.content.slice(0, 1100) + '\n（这条较早消息的附件未带入本次请求，请勿推测其内容。）';
  }
  return history;
}

async function sendQuestion(rawQuestion: string, retryAssistantId?: string, attachments: ChatAttachment[] = []): Promise<boolean> {
  const question = rawQuestion.trim() || (attachments.length ? '请帮我分析这些附件。' : '');
  if (!question || question.length > 1200) return false;
  interruptActiveRequest();
  ensureThread(date.value);
  const thread = currentThread.value;
  if (!thread) return false;

  let assistantMessage: AiDietChatMessage;
  let assistantIndex: number;
  if (retryAssistantId) {
    assistantIndex = thread.messages.findIndex((message) => message.id === retryAssistantId && message.role === 'assistant');
    const previous = thread.messages[assistantIndex - 1];
    if (assistantIndex < 1 || previous?.role !== 'user') {
      notice.value = '找不到这条问题对应的对话，请开始新对话后重试。';
      return false;
    }
    assistantMessage = thread.messages[assistantIndex];
    assistantMessage.status = 'sending';
    assistantMessage.error = undefined;
    assistantMessage.content = '';
  } else {
    thread.messages.push({ id: makeId(), role: 'user', content: question, attachments: attachments.length ? attachments.map(attachmentMeta) : undefined, status: 'complete', createdAt: new Date().toISOString() });
    assistantMessage = appendPendingAssistantMessage(thread.messages, makeId(), new Date().toISOString());
    if (thread.messages.length > 120) discardAttachments(thread.messages.splice(0, thread.messages.length - 120));
    assistantIndex = thread.messages.length - 1;
  }

  jumpToLatest();
  // Make the pending turn recoverable before the network request starts.
  persistState();
  notice.value = '';
  const controller = new AbortController();
  const request = { controller, assistantMessage };
  activeRequest = request;
  const requestDate = date.value, requestEntries = apiEntries(), requestTargets = dailyTargets.value;
  const requestProfile = snapshotChatProfile(props.profile);
  const conversationMemory = buildConversationMemory(threads.value, thread.id, memoryEnabled.value);
  try {
    const requestMessages = await buildRequestHistory(thread.messages, assistantIndex);
    if (activeRequest !== request) return false;
    if (requestMessages.at(-1)?.role !== 'user') throw new Error('对话状态不完整，请点击重试或开始新对话。');
    const response = await aiStream('chat', {
      date: requestDate,
      messages: requestMessages,
      entries: requestEntries,
      targets: requestTargets,
      profile: requestProfile,
      memory: conversationMemory,
    }, (event: AiDietChatStreamEvent) => {
      if (activeRequest !== request) return;
      if (event.type === 'delta') {
        assistantMessage.content += event.text;
      } else if (event.type === 'done') {
        if(typeof event.content==='string')assistantMessage.content=event.content;
        assistantMessage.model = event.model;
        assistantMessage.context = event.contextSummary;
        assistantMessage.createdAt = event.generatedAt || new Date().toISOString();
      }
    }, controller.signal);
    if (activeRequest !== request) return false;
    if (!assistantMessage.content.trim() || typeof response.model !== 'string') {
      throw new Error('AI 返回的数据格式不正确，请重试。');
    }
    assistantMessage.model = response.model;
    assistantMessage.context = response.contextSummary;
    assistantMessage.createdAt = response.generatedAt || new Date().toISOString();
    assistantMessage.status = 'complete';
    persistState();
    void syncChat();
    return true;
  } catch (error: unknown) {
    if (activeRequest !== request) return false;
    assistantMessage.status = 'failed';
    assistantMessage.error = error instanceof Error ? error.message : 'AI 暂时无法回复，请重试。';
    persistState();
    return false;
  } finally {
    if (activeRequest === request) activeRequest = undefined;
    if(pendingRemoteChat&&!sending.value)applyRemoteChat();
  }
}

function submit(): void {
  const question = draft.value.trim();
  if ((!question && !hasReadyAttachment.value) || question.length > 1200) return;
  const attachments = takeReadyAttachments();
  draft.value = '';
  void sendQuestion(question, undefined, attachments);
}

function sendQuickQuestion(question: string): void {
  draft.value = question;
  nextTick(() => document.getElementById('vb-diet-chat-input')?.focus());
}

function handleInputKey(event: KeyboardEvent): void {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    void submit();
  }
}

function retry(messageId: string): void {
  const index = currentMessages.value.findIndex((item) => item.id === messageId);
  const previous = currentMessages.value[index - 1];
  if (index > 0 && previous?.role === 'user') void sendQuestion(previous.content, messageId);
}

function startNewConversation(): void {
  attachmentBatchVersion++;
  explicitEmptyThreads.add(createThread(date.value).id);
  for (const item of draftAttachments.value) removeAttachment(item.id);
  notice.value = '';
}

function clearLocalHistory(): void {
  if (!window.confirm('清除当前使用空间的全部 AI 对话？登录账号的删除会同步到其他设备，此操作无法撤销。')) return;
  const attachments = threads.value.flatMap((thread) => thread.messages.flatMap((message) => message.attachments || []));
  for (const item of attachments) {
    delete attachmentCache.value[item.id];
    void deleteChatAttachment(item.id).catch(() => { storageError.value = '部分本地附件未能清除，请检查浏览器存储设置。'; });
  }
  clearSyncedChat();
  threads.value = [];
  activeByDate.value = {};
  storageError.value = '';
  ensureThread(date.value);
  notice.value = '当前空间的聊天记录已清除。';
}
</script>

<template>
  <section class="vb-chat-page vb-simple-chat" aria-label="维衡AI助手对话">
    <header class="vb-simple-header">
      <div class="vb-simple-title">
        <h1>维衡AI助手</h1>
        <p>聊聊想法；开启记忆后，也能延续之前的对话。</p>
      </div>
      <div class="vb-simple-actions">
        <label class="vb-simple-date">
          <AppIcon name="calendar" :size="16" />
          <span class="vb-sr-only">选择饮食日期</span>
          <input v-model="date" type="date" :max="todayDate()" :disabled="sending" aria-label="选择饮食日期" />
        </label>
        <button type="button" class="vb-simple-new" @click="startNewConversation"><AppIcon name="plus" :size="16" />新对话</button>
        <details class="vb-simple-options">
          <summary aria-label="对话选项">更多<AppIcon name="chevron" :size="14" /></summary>
          <div class="vb-simple-options-panel">
            <label v-if="historyThreads.length" class="vb-simple-history">
              历史对话
              <select :value="currentThread?.id" :disabled="sending" aria-label="切换历史对话" @change="openHistory">
                <option v-if="!currentMessages.length" :value="currentThread?.id">当前新对话</option>
                <option v-for="thread in historyThreads" :key="thread.id" :value="thread.id">{{ thread.date }} · {{ formatThreadTime(thread.createdAt) }} · {{ thread.messages.length }} 条消息</option>
              </select>
            </label>
            <label class="vb-memory-toggle">
              <input v-model="memoryEnabled" type="checkbox" />
              <span><strong>跨对话记忆</strong><small>开启后，新对话会参考近期完整文字交流（不含附件），并随提问发送给 AI。</small></span>
            </label>
            <p>登录后文字对话按账号同步。测试账号为多人共用，其他使用者也能看到该账号的聊天；个人聊天请使用自己的账号。</p>
            <button type="button" :disabled="sending" @click="clearLocalHistory">清除本地记录</button>
          </div>
        </details>
      </div>
    </header>

    <div ref="conversation" class="vb-simple-scroll" @scroll.passive="onScroll" @load.capture="onContentLoad" :class="{ 'is-empty': !currentMessages.length }" role="log" aria-live="polite" aria-relevant="additions text">
      <div v-if="!currentMessages.length" ref="conversationContent" class="vb-simple-welcome">
        <h2>今天想聊些什么？</h2>
        <p>从一个问题开始，或试试下面的提问。</p>
        <div class="vb-simple-starters">
          <button v-for="question in QUICK_QUESTIONS" :key="question" type="button" @click="sendQuickQuestion(question)">
            <span>{{ question }}</span><AppIcon name="arrow" :size="16" />
          </button>
        </div>
        <small class="vb-simple-context">饮食参考日期：{{ date }}</small>
      </div>
      <div v-else ref="conversationContent" class="vb-simple-thread">
        <article v-for="message in currentMessages" :key="message.id" class="vb-simple-message" :class="[`is-${message.role}`, `is-${message.status}`]">
          <span v-if="message.role === 'assistant'" class="vb-simple-avatar" aria-label="维衡 AI"><AppIcon name="sparkles" :size="18" /></span>
          <div class="vb-simple-message-body">
            <div v-if="message.attachments?.length" class="vb-chat-sent-attachments">
              <button v-for="attachment in message.attachments" :key="attachment.id" type="button" class="vb-chat-file" :aria-label="'查看附件：' + attachment.name" @click="previewFile(attachment)">
                <img v-if="attachment.kind === 'image' && attachmentCache[attachment.id]?.dataUrl" :src="attachmentCache[attachment.id].dataUrl" :alt="attachment.name" />
                <AppIcon v-else :name="attachment.kind === 'image' ? 'image' : 'report'" :size="22" />
                <span><strong>{{ attachment.name }}</strong><small>{{ attachment.kind === 'image' ? '照片' : '文件文字' }} · {{ formatFileSize(attachment.size) }}</small></span>
              </button>
            </div>
            <div v-if="message.status === 'sending' && !message.content" class="vb-simple-loading"><span class="vb-loading-ring" /><span>正在回复…</span></div>
            <p v-else-if="message.status === 'sending'" class="vb-simple-text">{{ message.content }}<span class="vb-chat-stream-cursor" aria-label="正在生成">▍</span></p>
            <template v-else-if="message.status === 'failed'">
              <p v-if="message.content" class="vb-simple-text">{{ message.content }}</p>
              <p class="vb-simple-error" role="alert">{{ message.error || 'AI 回复失败。' }}</p>
              <button class="vb-text-button vb-simple-retry" type="button" @click="retry(message.id)"><AppIcon name="activity" :size="14" />重试这条问题</button>
            </template>
            <p v-else-if="message.role!=='assistant'||!requestedDocumentFormat(exportQuestion(message.id))" class="vb-simple-text">{{ message.content }}</p>
            <ChatMessageExport v-if="message.role==='assistant'&&message.status==='complete'&&message.content.trim()&&requestedDocumentFormat(exportQuestion(message.id))" :content="message.content" :question="exportQuestion(message.id)" :auto="currentMessages.at(-1)?.id===message.id" @retry="retry(message.id)" />
            <small v-if="message.status === 'complete'" class="vb-simple-message-meta">
              {{ formatMessageTime(message.createdAt) }}<template v-if="message.role === 'assistant'"> · {{ aiDisplayName(message.model) }}</template>
            </small>
          </div>
        </article>
      </div>
    </div>

    <footer class="vb-simple-composer">
      <button v-if="showJump" type="button" class="vb-chat-jump-bottom" aria-label="回到最新消息" title="一键到底" @click="jumpToLatest"><AppIcon name="arrow" :size="20" /></button>
      <div class="vb-simple-composer-inner">
        <div v-if="currentMessages.length" class="vb-simple-tools">
          <details class="vb-simple-quick">
            <summary>快捷提问<AppIcon name="chevron" :size="12" /></summary>
            <div class="vb-simple-quick-panel">
              <button v-for="question in QUICK_QUESTIONS" :key="question" type="button" @click="sendQuickQuestion(question)">{{ question }}<AppIcon name="arrow" :size="14" /></button>
            </div>
          </details>
          <span v-if="sending" class="vb-simple-status" role="status">正在回复，发送新消息可打断</span>
        </div>
        <div class="vb-simple-editor" @dragover="dragAttachments" @drop="dropAttachments">
          <input ref="fileInput" class="vb-chat-file-input" type="file" multiple :accept="CHAT_ATTACHMENT_ACCEPT" aria-label="选择照片或文件" @change="chooseAttachments" />
          <div v-if="draftAttachments.length" class="vb-chat-draft-attachments" aria-label="待发送附件">
            <div v-for="attachment in draftAttachments" :key="attachment.id" class="vb-chat-file" :class="{ 'is-failed': attachment.status === 'failed' }">
              <button type="button" class="vb-chat-file-preview" :disabled="attachment.status !== 'ready'" :aria-label="'预览附件：' + attachment.name" @click="previewFile(attachment)">
                <img v-if="attachment.value?.dataUrl" :src="attachment.value.dataUrl" :alt="attachment.name" />
                <AppIcon v-else :name="attachment.kind === 'image' ? 'image' : 'report'" :size="22" />
                <span><strong>{{ attachment.name }}</strong><small v-if="attachment.status === 'reading'" role="status">正在读取…</small><small v-else-if="attachment.status === 'failed'" role="alert">{{ attachment.error }}</small><small v-else>{{ formatFileSize(attachment.size) }} · 待发送</small></span>
              </button>
              <button type="button" class="vb-chat-file-remove" :aria-label="'移除附件：' + attachment.name" @click="removeAttachment(attachment.id)"><AppIcon name="close" :size="13" /></button>
            </div>
          </div>
          <label class="vb-sr-only" for="vb-diet-chat-input">输入你想聊的内容</label>
          <textarea id="vb-diet-chat-input" v-model="draft" rows="2" maxlength="1200" placeholder="问一个问题，或添加照片、文件…" @keydown="handleInputKey" @paste="pasteAttachments" />
          <div class="vb-simple-editor-bottom">
            <div class="vb-chat-input-tools">
              <button type="button" class="vb-chat-attach-button" aria-label="添加照片或文件" title="添加照片或文件：最多 3 个；照片 8 MB，文件 10 MB" @click="fileInput?.click()"><AppIcon name="paperclip" :size="18" /><span>附件</span></button>
              <span>Enter 发送 · Shift+Enter 换行</span>
            </div>
            <button type="button" class="vb-button vb-button-primary vb-simple-send" :disabled="!draft.trim() && !hasReadyAttachment" @click="submit()"><AppIcon name="arrow" :size="16" />{{ sending ? '打断并发送' : '发送' }}</button>
          </div>
        </div>
        <p v-if="accountUser && chatSyncStatus === 'error'" class="vb-simple-notice" role="alert">聊天同步暂时失败，本机记录已保留，将自动重试。</p>
        <p v-if="storageError || notice" class="vb-simple-notice" :role="storageError ? 'alert' : 'status'">{{ storageError || notice }}</p>
        <div class="vb-simple-footnote">
          <details class="vb-simple-privacy">
            <summary><AppIcon name="lock" :size="12" />隐私与使用说明</summary>
            <div class="vb-simple-privacy-panel">
              <p>附件支持 JPG、PNG、WebP、PDF、DOCX 和常见文本文件，每条消息最多 3 个。照片每张最多 8 MB，文件每个最多 10 MB、24,000 字；PDF 最多 40 页，仅提取可读文字，扫描件请改发截图。</p>
              <p>选择附件时仅在本地读取；点击发送后，所选照片的压缩图、文件提取的文字及问题会发送给维衡 AI，并在后续相关对话中作为上下文。PDF、Word 的排版与内嵌图片不发送。登录后的文字对话同步至网站服务器，游客对话和附件文件保存在当前浏览器。</p>
              <p>点击发送时，会携带你当前浏览器中最新保存的身体档案（性别、年龄、身高、体重、活动水平），以及所选日期的食物名称、克数、餐次、程序计算的营养汇总与每日目标，供 维衡 AI 回答相关问题。修改档案后，下次提问会使用新数据；未填写的档案不会被猜测或补全。饮食记录中的照片、备注、健康标记和偏好备注不会自动发送。</p>
              <p>跨对话记忆开启时，发送新问题会额外携带最多最近 50 轮完整的纯文字对话作为背景（不含附件）。为控制请求长度，每条记忆最多保留 220 字。可在“更多”中关闭；多人共用此浏览器时建议关闭。当前问题和最新身体档案优先于旧对话。</p>
              <p>饮食相关回复仅供一般参考；引用营养数据时会区分程序计算值与未知项，不把缺失数据当作 0。</p>
            </div>
          </details>
          <span>{{ draft.length ? `${draft.length}/1200` : 'AI 内容仅供参考' }}</span>
        </div>
      </div>
    </footer>
    <ModalShell v-if="previewAttachment" :title="previewAttachment.name" wide @close="previewAttachment = null">
      <img v-if="previewAttachment.kind === 'image'" class="vb-chat-image-preview" :src="previewAttachment.dataUrl" :alt="previewAttachment.name" />
      <pre v-else class="vb-chat-text-preview">{{ previewAttachment.text }}</pre>
      <p class="vb-data-note">{{ previewAttachment.kind === 'image' ? '照片将压缩后发送。' : '这里只展示提取的文件文字。' }}</p>
    </ModalShell>
  </section>
</template>

<style scoped>
:global(.vb-app.is-chat .vb-main) { display: flex; flex-direction: column; height: 100dvh; min-height: 0; padding-bottom: 0; overflow: hidden; }
:global(.vb-app.is-chat .vb-topbar), :global(.vb-app.is-chat .vb-footer) { display: none; }
:global(.vb-app.is-chat .vb-content) { display: flex; flex: 1; flex-direction: column; min-height: 0; max-width: none; margin: 0; padding: 0; }
.vb-simple-chat { display: flex; flex: 1; flex-direction: column; gap: 0; min-height: 0; min-width: 0; background: var(--vb-surface); }
.vb-simple-header { position: relative; z-index: 4; display: flex; flex: none; align-items: center; justify-content: space-between; gap: 24px; padding: 24px 36px; border-bottom: 1px solid var(--vb-line); }
.vb-simple-title { min-width: 0; }
.vb-simple-title h1 { font-size: 21px; font-weight: 650; letter-spacing: -.025em; }
.vb-simple-title p { margin-top: 5px; font-size: 12px; color: var(--vb-muted); line-height: 1.6; }
.vb-simple-actions { display: flex; flex: none; align-items: center; gap: 10px; }
.vb-simple-date { display: flex; align-items: center; gap: 8px; padding: 8px 11px; border: 1px solid var(--vb-line); border-radius: 9px; color: var(--vb-accent); background: var(--vb-surface-strong); }
.vb-simple-date input { width: 120px; min-width: 0; border: 0; padding: 0; color: var(--vb-ink); background: transparent; font: inherit; font-size: 12px; }
.vb-simple-new { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 37px; padding: 8px 12px; border: 1px solid var(--vb-line); border-radius: 9px; background: var(--vb-accent-soft); color: var(--vb-accent); font-size: 12px; white-space: nowrap; }
.vb-simple-options, .vb-simple-quick, .vb-simple-privacy { position: relative; }
.vb-simple-options summary, .vb-simple-quick summary, .vb-simple-privacy summary { display: flex; align-items: center; gap: 6px; list-style: none; cursor: pointer; color: var(--vb-muted); }
summary::-webkit-details-marker { display: none; }
.vb-simple-options summary { padding: 8px 4px; font-size: 12px; white-space: nowrap; }
.vb-simple-options summary svg, .vb-simple-quick summary svg { transform: rotate(90deg); transition: transform .15s ease; }
.vb-simple-options[open] summary svg, .vb-simple-quick[open] summary svg { transform: rotate(-90deg); }
.vb-simple-options-panel, .vb-simple-quick-panel, .vb-simple-privacy-panel { position: absolute; z-index: 6; border: 1px solid var(--vb-line); border-radius: 12px; background: var(--vb-surface-strong); box-shadow: var(--vb-shadow-hover); }
.vb-simple-options-panel { right: 0; top: calc(100% + 9px); width: 260px; padding: 15px; }
.vb-simple-options-panel p { color: var(--vb-muted); font-size: 12px; }
.vb-memory-toggle { display: flex; align-items: flex-start; gap: 9px; margin-top: 12px; color: var(--vb-ink); cursor: pointer; }
.vb-memory-toggle input { flex: none; margin-top: 2px; accent-color: var(--vb-accent); }
.vb-memory-toggle strong, .vb-memory-toggle small { display: block; }
.vb-memory-toggle strong { font-size: 12px; font-weight: 600; }
.vb-memory-toggle small { margin-top: 4px; color: var(--vb-muted); font-size: 10px; line-height: 1.6; }
.vb-simple-options-panel .vb-memory-toggle + p { margin-top: 10px; font-size: 10px; line-height: 1.6; }
.vb-simple-options-panel button { width: 100%; margin-top: 12px; padding: 9px 11px; border: 1px solid var(--vb-line); border-radius: 8px; background: transparent; color: var(--vb-danger); font-size: 12px; text-align: left; }
.vb-simple-history { display: grid; gap: 7px; color: var(--vb-muted); font-size: 11px; }
.vb-simple-history select { width: 100%; padding: 8px; border: 1px solid var(--vb-line); border-radius: 7px; color: var(--vb-ink); background: var(--vb-input); font: inherit; }
.vb-simple-scroll { display: flex; flex: 1; flex-direction: column; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 30px 36px; scrollbar-width: thin; scrollbar-color: var(--vb-sage) transparent; }
.vb-simple-welcome { width: 100%; max-width: 820px; margin: 0 auto; padding: clamp(35px, 9vh, 110px) 0 48px; }
.vb-simple-welcome h2 { font-size: clamp(24px, 2.3vw, 32px); line-height: 1.4; font-weight: 620; letter-spacing: -.03em; }
.vb-simple-welcome > p { margin-top: 12px; color: var(--vb-muted); font-size: 13px; }
.vb-simple-starters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 28px; }
.vb-simple-starters button { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-width: 0; min-height: 77px; padding: 17px 19px; border: 1px solid var(--vb-line); border-radius: 12px; background: var(--vb-surface-strong); color: var(--vb-ink); font-size: 13px; line-height: 1.7; text-align: left; transition: border-color .15s, background .15s; }
.vb-simple-starters button svg { flex: none; color: var(--vb-sage); }
.vb-simple-starters button:hover { border-color: var(--vb-sage); background: var(--vb-accent-soft); }
.vb-simple-context { display: block; margin-top: 20px; color: var(--vb-faint); font-size: 11px; }
.vb-simple-thread { display: flex; flex-direction: column; gap: 30px; width: 100%; max-width: 820px; margin: 0 auto; padding: 10px 0 30px; }
.vb-simple-message { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
.vb-simple-message.is-user { align-self: flex-end; max-width: 85%; }
.vb-simple-avatar { display: grid; flex: none; place-items: center; width: 26px; height: 28px; color: var(--vb-accent); }
.vb-simple-message-body { min-width: 0; padding-top: 1px; }
.vb-simple-message.is-user .vb-simple-message-body { padding: 12px 17px 10px; border-radius: 14px 4px 14px 14px; background: var(--vb-accent-soft); }
.vb-simple-text { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 14px; line-height: 1.95; }
.vb-simple-message-meta { display: block; margin-top: 7px; color: var(--vb-faint); font-size: 10px; }
.vb-simple-message.is-user .vb-simple-message-meta { text-align: right; }
.vb-simple-loading { display: flex; align-items: center; gap: 9px; min-height: 28px; color: var(--vb-muted); font-size: 13px; }
.vb-simple-loading .vb-loading-ring { width: 16px; height: 16px; }
.vb-simple-error { color: var(--vb-danger); font-size: 12px; line-height: 1.8; }
.vb-simple-retry { margin-top: 8px; font-size: 11px; }
.vb-simple-composer { position: relative; z-index: 3; flex: none; padding: 16px 36px 14px; border-top: 1px solid var(--vb-line); background: var(--vb-surface); }
.vb-chat-jump-bottom { position:absolute; left:50%; top:-54px; transform:translateX(-50%); z-index:5; width:42px; height:42px; display:grid; place-items:center; padding:0; border:1px solid var(--vb-line); border-radius:50%; background:var(--vb-surface-strong); color:var(--vb-accent); box-shadow:var(--vb-shadow-hover); cursor:pointer; }
.vb-chat-jump-bottom svg { transform:rotate(90deg); }
.vb-chat-jump-bottom:hover { background:var(--vb-accent-soft); }
.vb-chat-jump-bottom:focus-visible { outline:2px solid var(--vb-accent); outline-offset:3px; }
.vb-simple-composer-inner { max-width: 820px; margin: 0 auto; }
.vb-simple-tools { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0 3px 10px; }
.vb-simple-quick summary { font-size: 11px; }
.vb-simple-quick-panel { bottom: calc(100% + 12px); left: 0; display: grid; gap: 3px; width: min(420px, calc(100vw - 50px)); padding: 7px; }
.vb-simple-quick-panel button { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 11px; border: 0; border-radius: 7px; background: transparent; color: var(--vb-ink); font-size: 12px; line-height: 1.6; text-align: left; }
.vb-simple-quick-panel button svg { flex: none; color: var(--vb-sage); }
.vb-simple-quick-panel button:hover { background: var(--vb-accent-soft); }
.vb-simple-status { color: var(--vb-muted); font-size: 10px; }
.vb-simple-editor { padding: 13px 15px 10px; border: 1px solid var(--vb-line); border-radius: 15px; background: var(--vb-surface-strong); transition: border-color .15s, box-shadow .15s; }
.vb-simple-editor:focus-within { border-color: var(--vb-sage); box-shadow: 0 0 0 3px color-mix(in srgb, var(--vb-sage) 10%, transparent); }
.vb-simple-editor textarea { display: block; width: 100%; min-height: 54px; max-height: 160px; padding: 0; border: 0; border-radius: 0; outline: none; background: transparent; color: var(--vb-ink); resize: vertical; font: inherit; font-size: 14px; line-height: 1.8; }
.vb-simple-editor textarea:focus-visible { outline: none; }
.vb-simple-editor-bottom { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 7px; }
.vb-simple-editor-bottom > span { color: var(--vb-faint); font-size: 10px; }
.vb-chat-file-input { display: none; }
.vb-chat-input-tools { display: flex; align-items: center; gap: 12px; min-width: 0; }
.vb-chat-input-tools > span { color: var(--vb-faint); font-size: 10px; }
.vb-chat-attach-button { display: inline-flex; align-items: center; gap: 4px; padding: 5px; border: 0; border-radius: 6px; color: var(--vb-accent); background: transparent; font-size: 11px; }
.vb-chat-attach-button:hover { background: var(--vb-accent-soft); }
.vb-chat-draft-attachments, .vb-chat-sent-attachments { display: flex; flex-wrap: wrap; gap: 8px; }
.vb-chat-draft-attachments { max-height: 140px; margin-bottom: 12px; overflow-y: auto; }
.vb-chat-sent-attachments { margin-bottom: 9px; }
.vb-chat-file { display: flex; align-items: center; gap: 8px; max-width: 100%; min-width: 0; padding: 8px 10px; border: 1px solid var(--vb-line); border-radius: 10px; background: var(--vb-surface-strong); color: var(--vb-ink); text-align: left; }
.vb-chat-file > svg, .vb-chat-file-preview > svg { flex: none; color: var(--vb-accent); }
.vb-chat-file img { width: 40px; height: 40px; flex: none; border-radius: 5px; object-fit: cover; }
.vb-chat-file span { min-width: 0; }
.vb-chat-file strong { display: block; max-width: 210px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; font-weight: 500; }
.vb-chat-file small { display: block; max-width: 230px; margin-top: 3px; color: var(--vb-muted); font-size: 10px; line-height: 1.5; overflow-wrap: anywhere; }
.vb-chat-file.is-failed { border-color: var(--vb-danger); }
.vb-chat-file.is-failed small { color: var(--vb-danger); }
.vb-chat-file-preview { display: flex; align-items: center; gap: 8px; min-width: 0; padding: 0; border: 0; background: transparent; color: inherit; text-align: left; }
.vb-chat-file-preview:disabled { opacity: 1; }
.vb-chat-file-remove { display: grid; place-items: center; align-self: flex-start; flex: none; width: 23px; height: 23px; padding: 0; border: 0; border-radius: 5px; background: transparent; color: var(--vb-muted); }
.vb-chat-file-remove:hover { background: var(--vb-accent-soft); color: var(--vb-ink); }
.vb-chat-image-preview { display: block; max-width: 100%; max-height: 65vh; margin: 0 auto; object-fit: contain; }
.vb-chat-text-preview { max-height: 60vh; overflow: auto; white-space: pre-wrap; overflow-wrap: anywhere; color: var(--vb-ink); font: inherit; font-size: 13px; line-height: 1.9; }
.vb-simple-send { flex: none; min-height: 34px; padding: 7px 13px; border-radius: 9px; font-size: 12px; box-shadow: none; }
.vb-simple-footnote { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 9px 3px 0; color: var(--vb-faint); font-size: 10px; }
.vb-simple-privacy summary { color: var(--vb-faint); font-size: 10px; }
.vb-simple-privacy-panel { bottom: calc(100% + 12px); left: 0; width: min(510px, calc(100vw - 45px)); padding: 15px 17px; }
.vb-simple-privacy-panel p { color: var(--vb-muted); font-size: 11px; line-height: 1.85; }
.vb-simple-privacy-panel p + p { margin-top: 8px; }
.vb-simple-notice { margin-top: 9px; color: var(--vb-danger); font-size: 11px; line-height: 1.6; }
@media (max-width: 1000px) {
  .vb-simple-header { gap: 16px; padding: 22px 25px; }
  .vb-simple-title p { max-width: 230px; font-size: 11px; }
  .vb-simple-actions { gap: 7px; }
  .vb-simple-scroll { padding-inline: 25px; }
  .vb-simple-composer { padding-inline: 25px; }
}
@media (max-width: 760px) {
  :global(.vb-app.is-chat .vb-main) { height: calc(100dvh - 112px - env(safe-area-inset-bottom)); }
  .vb-simple-header { gap: 12px; padding: 18px 21px; }
  .vb-simple-title h1 { font-size: 19px; }
  .vb-simple-title p { max-width: none; }
  .vb-simple-scroll { padding: 22px 21px; }
  .vb-simple-welcome { padding-top: 25px; }
  .vb-simple-welcome h2 { font-size: 25px; }
  .vb-simple-welcome > p { font-size: 12px; }
  .vb-simple-starters { gap: 10px; margin-top: 23px; }
  .vb-simple-starters button { min-height: 76px; padding: 13px 15px; font-size: 12px; }
  .vb-simple-composer { padding: 12px 21px 10px; }
  .vb-simple-thread { gap: 24px; padding-top: 2px; }
  .vb-simple-text { font-size: 13px; }
}
@media (max-width: 580px) {
  .vb-chat-input-tools > span { display: none; }
  .vb-chat-draft-attachments { max-height: 100px; }
  .vb-chat-file strong { max-width: 170px; }
  .vb-simple-header { flex-wrap: wrap; gap: 12px; padding: 16px 18px; }
  .vb-simple-title { width: 100%; }
  .vb-simple-title p { margin-top: 3px; font-size: 11px; }
  .vb-simple-actions { width: 100%; }
  .vb-simple-options { margin-left: auto; }
  .vb-simple-date { padding: 7px 9px; }
  .vb-simple-date input { width: 115px; font-size: 11px; }
  .vb-simple-new { min-height: 34px; padding: 7px 10px; font-size: 11px; }
  .vb-simple-scroll { padding: 16px 18px; }
  .vb-simple-welcome { padding-top: 16px; padding-bottom: 24px; }
  .vb-simple-welcome h2 { font-size: 24px; }
  .vb-simple-starters { grid-template-columns: 1fr; gap: 8px; margin-top: 20px; }
  .vb-simple-starters button { min-height: 56px; padding: 12px 14px; }
  .vb-simple-context { margin-top: 15px; font-size: 10px; }
  .vb-simple-composer { padding: 11px 15px 10px; }
  .vb-simple-editor { padding: 11px 12px 9px; border-radius: 13px; }
  .vb-simple-editor textarea { min-height: 48px; font-size: 13px; }
  .vb-simple-editor-bottom > span { font-size: 9px; }
  .vb-simple-send { padding: 6px 10px; font-size: 11px; }
  .vb-simple-status { font-size: 9px; text-align: right; }
  .vb-simple-message { gap: 8px; }
  .vb-simple-message.is-user { max-width: 90%; }
  .vb-simple-message.is-user .vb-simple-message-body { padding: 10px 13px 8px; }
}
</style>
