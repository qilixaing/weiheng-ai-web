import { createApp } from 'vue';
import { initializeStorageScope } from './lib/storageScope.js';
import './styles/content.css';
import './styles/campus.css';

async function boot(){
 try{await initializeStorageScope();const {default:App}=await import('./App.vue');createApp(App).mount('#app');}
 catch{const root=document.querySelector('#app');if(root){const message=document.createElement('p');message.textContent='暂时无法确认当前使用空间，已暂停读取本地档案。请确认本地服务已启动，然后刷新重试。';const retry=document.createElement('button');retry.textContent='刷新重试';retry.onclick=()=>location.reload();root.append(message,retry);}}
}
boot();
