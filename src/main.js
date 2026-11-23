import {createApp} from 'vue';
import {initializeStorageScope} from './lib/storageScope.js';
import './styles/content.css';
import './styles/campus.css';
// Mount the real workspace once. The HTML preloads its code without evaluating
// account storage; identity must be confirmed before App reads that storage.
function mountReady(component){
 createApp(component).mount('#app');
 requestAnimationFrame(()=>requestAnimationFrame(()=>window.dispatchEvent(new Event('app-ready'))));
}
async function start(){
 try{
  await initializeStorageScope();
  const {default:App}=await import('./App.vue');
  mountReady(App);
 }catch{
  const {default:HomeEntry}=await import('./HomeEntry.vue');
  mountReady(HomeEntry);
 }
}
void start();
