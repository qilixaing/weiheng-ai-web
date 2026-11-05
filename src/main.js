import { createApp } from 'vue';
import { initializeStorageScope } from './lib/storageScope.js';
import './styles/content.css';
import './styles/campus.css';

const root = document.querySelector('#app');
function showStartup(message, retry = false) {
  if (!root) return;
  root.replaceChildren();
  const panel = document.createElement('section');
  panel.className = 'vb-startup';
  panel.setAttribute('role', retry ? 'alert' : 'status');
  const title = document.createElement('h1'); title.textContent = '维衡 AI';
  const text = document.createElement('p'); text.textContent = message;
  panel.append(title, text);
  if (retry) {
    const button = document.createElement('button'); button.textContent = '重新打开';
    button.onclick = () => location.reload(); panel.append(button);
  }
  root.append(panel);
}
async function boot() {
  showStartup('正在打开，请稍候…');
  // Fetch the page code while checking identity, without reading another user's data.
  const page = import('./App.vue');
  void page.catch(() => {});
  try { await initializeStorageScope(); }
  catch { showStartup('暂时无法连接账号服务，请检查网络后重试。已有数据会保留。', true); return; }
  try { const {default: App} = await page; createApp(App).mount('#app'); }
  catch { showStartup('页面加载未完成，请检查网络后重新打开。已有数据会保留。', true); }
}
void boot();
