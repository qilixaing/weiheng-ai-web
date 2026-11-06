import {createApp} from 'vue';
import {initializeStorageScope} from './lib/storageScope.js';
import './styles/content.css';
import './styles/campus.css';
// Mount the real workspace once. The HTML preloads its code without evaluating
// account storage; identity must be confirmed before App reads that storage.
async function start(){
 try{
  await initializeStorageScope();
  const {default:App}=await import('./App.vue');
  createApp(App).mount('#app');
 }catch{
  const {default:HomeEntry}=await import('./HomeEntry.vue');
  createApp(HomeEntry).mount('#app');
 }
}
void start();
