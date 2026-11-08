<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { accountUser, accountSyncStatus, signInOrRegister, signOut, retryAccountSync, lastAccountSync, lastChatSync, chatSyncStatus, accountConflict, exportSyncBackup } from '../lib/storageScope.js';
import { PRIVACY_POLICY_ITEMS, PRIVACY_POLICY_VERSION } from '../lib/privacyPolicy.js';

const emit = defineEmits(['close']);
const mode = ref('login');
const email = ref('');
const password = ref('');
const verificationCode = ref('');
const localDebugCode = ref('');
const captchaImage=ref(''),captchaId=ref(''),captchaAnswer=ref('');
async function refreshCaptcha(){try{const r=await fetch('/api/auth/captcha',{cache:'no-store'});const v=await r.json();if(!r.ok)throw Error(v.error);captchaImage.value=v.image;captchaId.value=v.captchaId;captchaAnswer.value='';}catch(e){error.value=e.message||'图形验证码加载失败';}}
const cooldown = ref(0);
const sendingCode = ref(false);
let cooldownTimer = 0;
const acceptTerms = ref(false);
const privacyPolicyOpen = ref(false);
const error = ref('');
const busy = ref(false);
const isLocalTest = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
const syncLabel = computed(() => ({ guest: '游客数据只保存在本机', syncing: '正在读取账号数据…', pending: '正在同步账号数据…', synced: '账号数据已同步', error: '同步暂时失败，本机副本仍保留' }[accountSyncStatus.value] || '账号数据'));

function switchMode(next) {
  mode.value = next;
  acceptTerms.value = false;
  privacyPolicyOpen.value = false;
  if(next!=='login')void refreshCaptcha();
  error.value = '';
  verificationCode.value = '';
  localDebugCode.value = '';
  cooldown.value = 0;
  clearInterval(cooldownTimer);
}
function startCooldown(seconds = 60) {
  clearInterval(cooldownTimer);
  cooldown.value = seconds;
  cooldownTimer = setInterval(() => {
    cooldown.value = Math.max(0, cooldown.value - 1);
    if (!cooldown.value) clearInterval(cooldownTimer);
  }, 1000);
}
async function requestCode() {
  if (sendingCode.value || cooldown.value) return;
  const normalizedEmail = email.value.trim();
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    error.value = '请先填写有效邮箱地址。';
    return;
  }
  error.value = '';
  localDebugCode.value = '';
  if(!/^[23456789A-H]{4}$/i.test(captchaAnswer.value.trim())){error.value='请输入图片中的4位验证码。';return;}
  sendingCode.value = true;
  try {
    const response = await fetch('/api/auth/request-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ email: normalizedEmail, purpose:mode.value==='reset'?'reset':'register', captchaId:captchaId.value, captchaAnswer:captchaAnswer.value }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || '验证码发送失败，请稍后重试。');
    if (typeof result.localDebugCode === 'string') localDebugCode.value = result.localDebugCode;
    startCooldown(Number(result.resendAfterSeconds) || 60);
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '验证码发送失败，请稍后重试。';
  } finally {
    sendingCode.value = false;
    void refreshCaptcha();
  }
}
async function submit() {
  if (busy.value) return;
  error.value = '';
  if ((mode.value === 'login' || mode.value === 'register') && !acceptTerms.value) {
    error.value = '请先阅读并勾选同意隐私政策。';
    return;
  }
  busy.value = true;
  try {
    if(mode.value==='reset'){
      const r=await fetch('/api/auth/reset-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.value.trim(),password:password.value,verificationCode:verificationCode.value.trim()})});
      const result=await r.json();if(!r.ok)throw Error(result.error);switchMode('login');password.value='';error.value='密码已重置，请重新登录。';return;
    }
    await signInOrRegister({ mode: mode.value, email: email.value.trim(), password: password.value, acceptTerms: acceptTerms.value, privacyPolicyVersion: PRIVACY_POLICY_VERSION, verificationCode: verificationCode.value.trim() });
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '操作失败，请重试。';
  } finally {
    busy.value = false;
  }
}
function downloadBackup(){const raw=exportSyncBackup();if(!raw)return;const url=URL.createObjectURL(new Blob([raw],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='维衡-同步冲突恢复副本.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
onUnmounted(() => clearInterval(cooldownTimer));
async function logout() {
  if (busy.value) return;
  busy.value = true;
  error.value = '';
  try { await signOut(); }
  catch (cause) { error.value = cause instanceof Error ? cause.message : '退出登录失败。'; busy.value = false; }
}
</script>

<template>
  <div class="vb-dialog-overlay vb-account-overlay" @click.self="emit('close')">
    <section class="vb-account-dialog" role="dialog" aria-modal="true" aria-labelledby="vb-account-title">
      <header class="vb-account-heading"><div><p class="vb-eyebrow">游客可继续直接使用</p><h2 id="vb-account-title">{{ accountUser ? '账号与数据' : mode==='reset'?'找回密码':'登录' }}</h2></div><button class="vb-icon-button" aria-label="关闭账号面板" @click="emit('close')">×</button></header>

      <template v-if="accountUser">
        <p class="vb-account-email">当前登录：{{ accountUser.email.endsWith('@demo.local') ? '评委测试账号' : accountUser.email }}</p>
        <p v-if="accountUser.email.endsWith('@demo.local')" class="vb-account-note">这是多人共用的演示账号。请只输入虚构演示资料，不要填写真实身体、健康或饮食数据。</p>
        <div class="vb-account-status"><strong>{{ syncLabel }}</strong><p>档案、饮食记录、草稿与膳食方案会同步到当前网站服务器账号。文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。</p></div>
        <p>档案记录上次成功同步：{{ lastAccountSync ? new Date(lastAccountSync).toLocaleString('zh-CN') : '暂无' }}<br />文字对话：{{ ({guest:'游客',syncing:'同步中',pending:'待同步',synced:'已同步',error:'同步失败，可重试'})[chatSyncStatus] }} · {{ lastChatSync ? new Date(lastChatSync).toLocaleString('zh-CN') : '暂无' }}</p>
        <button class="vb-button vb-button-soft" :disabled="accountSyncStatus==='syncing'" @click="retryAccountSync()">重新同步</button>
        <div v-if="accountConflict.length" class="vb-agent-error"><p>多设备修改有冲突：{{ accountConflict.join('、') }}。双方原始副本已保留，非冲突内容自动合并。</p><button class="vb-button vb-button-quiet" @click="retryAccountSync('local')">冲突项采用本机</button><button class="vb-button vb-button-quiet" @click="retryAccountSync('remote')">冲突项采用服务器</button><button class="vb-button vb-button-quiet" @click="downloadBackup">下载双方恢复副本</button></div>
        <p v-if="error" class="vb-field-error" role="alert">{{ error }}</p>
        <button class="vb-button vb-button-quiet vb-account-submit" :disabled="busy" @click="logout">{{ busy ? '正在退出…' : '退出登录，保留游客空间' }}</button>
      </template>

      <template v-else>
        <div class="vb-account-tabs"><button :class="{ active: mode === 'login' }" @click="switchMode('login')">登录</button><button :class="{ active: mode === 'register' }" @click="switchMode('register')">注册</button></div>
        <form class="vb-account-form" @submit.prevent="submit">
          <label>{{ mode === 'login' ? '邮箱或测试账号' : '邮箱' }}<input v-model="email" :type="mode === 'login' ? 'text' : 'email'" :autocomplete="mode === 'login' ? 'username' : 'email'" :placeholder="mode === 'login' ? 'name@example.com' : 'name@example.com'" required /></label>
          <label>密码<input v-model="password" type="password" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" :minlength="mode !== 'login' ? 10 : undefined" maxlength="128" :placeholder="mode !== 'login' ? '至少 10 位' : '请输入密码'" required /></label>
          <label v-if="mode !== 'login'">图形验证码<div class="vb-code-row"><input v-model="captchaAnswer" autocomplete="off" maxlength="4" placeholder="4位图形验证码" /><button type="button" class="vb-button vb-button-quiet" @click="refreshCaptcha" aria-label="刷新图形验证码"><img v-if="captchaImage" :src="captchaImage" alt="图形验证码，点击刷新" style="width:150px;height:49px;max-width:none" /><span v-else>点击加载图片</span></button></div><small>看不清可点击图片刷新。验证通过后才能发送邮箱验证码。</small></label>
          <label v-if="mode !== 'login'">邮箱验证码<div class="vb-code-row"><input v-model="verificationCode" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="6 位验证码" required /><button class="vb-button vb-button-quiet" type="button" :disabled="sendingCode || cooldown > 0" @click="requestCode">{{ sendingCode ? '发送中…' : cooldown ? `${cooldown} 秒后重发` : '获取验证码' }}</button></div></label>
          <p v-if="localDebugCode" class="vb-local-code" role="status">本地调试验证码：<strong>{{ localDebugCode }}</strong>（仅 localhost 调试使用，线上不会显示）</p>
          <label v-if="mode === 'login' || mode === 'register'" class="vb-account-consent"><input v-model="acceptTerms" type="checkbox" required /><span>我已阅读并同意 <button type="button" class="vb-account-policy-toggle" :aria-expanded="privacyPolicyOpen" aria-controls="vb-account-privacy-content" @click.stop.prevent="privacyPolicyOpen = !privacyPolicyOpen">隐私政策</button></span></label>
          <div v-if="(mode === 'login' || mode === 'register') && privacyPolicyOpen" id="vb-account-privacy-content" class="vb-account-privacy-content">
            <p>隐私政策版本：{{ PRIVACY_POLICY_VERSION }}</p>
            <ol><li v-for="item in PRIVACY_POLICY_ITEMS" :key="item">{{ item }}</li></ol>
          </div>
          <p v-if="mode === 'register'" class="vb-account-note">注册需要有效邮箱、邮箱验证码和至少 10 位密码。验证码 10 分钟有效。游客仍可直接使用，无需注册。</p>
          <p v-if="error" class="vb-field-error" role="alert">{{ error }}</p>
          <button class="vb-button vb-button-primary vb-account-submit" :disabled="busy">{{ busy ? '请稍候…' : mode === 'login' ? '登录并打开账号空间' : mode==='reset'?'验证并重置密码':'创建邮箱账号' }}</button>
        </form><button v-if="mode==='login'" class="vb-text-button" @click="switchMode('reset')">忘记密码？</button><p v-if="mode==='reset'" class="vb-account-note">若邮箱可用于重置，将收到验证码。成功后旧登录会话失效，请重新登录。</p>
        <div v-if="isLocalTest" class="vb-account-test"><strong>本地测试账号</strong><span>账号：12345678w　密码：12345678w</span><small>仅 localhost 可用；游客数据和账号数据相互独立。</small></div>
        <p class="vb-account-note">选择关闭即可继续以游客身份使用。首次登录发现游客档案时，可选择复制到账号；原游客数据会保留。</p>
      </template>
    </section>
  </div>
</template>
