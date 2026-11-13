<script setup>
import {ref,computed,watch,onMounted,onBeforeUnmount} from 'vue';
import {requestedDocumentFormat,documentReplyBody,isFileRefusalOnly} from '../lib/chatDocumentIntent.js';
import SafeMarkdown from './SafeMarkdown.js';
const props=defineProps({content:{type:String,required:true},question:{type:String,default:''},auto:Boolean});
const emit=defineEmits(['retry']);
const files=ref({}),selected=ref(''),busy=ref(''),error=ref('');let revision=0,mounted=false,queued=false;
const requested=computed(()=>requestedDocumentFormat(props.question));
const format=computed(()=>selected.value||requested.value||'pdf');
const label=computed(()=>({pdf:'PDF',docx:'Word',png:'图片'})[format.value]);
const file=computed(()=>files.value[format.value]);
const body=computed(()=>documentReplyBody(props.content));
function discard(){for(const value of Object.values(files.value))setTimeout(()=>URL.revokeObjectURL(value.url),30000);files.value={};}
async function prepare(kind=format.value){
 if(busy.value||files.value[kind]){if(files.value[kind])selected.value=kind;return;}
 const current=revision,content=body.value,question=props.question;selected.value=kind;busy.value=kind;error.value='';
 try{
  if(requested.value&&isFileRefusalOnly(content))throw new Error('尚未生成文档正文，请重新生成。');
  const {createChatExport,preparedChatDownload}=await import('../lib/chatExport.js');
  if(current!==revision)return;
  const generated=await createChatExport(kind,content,{question});if(current!==revision)return;
  files.value={...files.value,[kind]:preparedChatDownload(generated)};
 }catch(e){if(current===revision)error.value=e instanceof Error?e.message:'文件生成失败，请重试。';}
 finally{if(current===revision)busy.value='';}
}
function automatic(){if(!mounted||!props.auto||!requested.value||queued||busy.value||files.value[requested.value]||error.value)return;queued=true;requestAnimationFrame(()=>setTimeout(()=>{queued=false;if(mounted&&props.auto&&requested.value)void prepare(requested.value);},0));}
watch(()=>[props.content,props.question],()=>{revision++;discard();selected.value='';busy.value='';error.value='';automatic();});
watch(()=>props.auto,automatic);
onMounted(()=>{mounted=true;automatic();});
onBeforeUnmount(()=>{mounted=false;revision++;discard();});
</script>
<template>
 <div v-if="requested" class="vb-chat-document" aria-label="计划正文与下载" :aria-busy="!!busy">
  <SafeMarkdown class="vb-chat-document-body" :content="body" />
  <div class="vb-chat-export-options" aria-label="下载计划">
   <template v-for="[kind,name] in [['pdf','PDF'],['docx','Word'],['png','长图']]" :key="kind">
    <a v-if="files[kind]" :href="files[kind].url" :download="files[kind].filename" :title="files[kind].filename">{{kind==='png'?'保存长图':'下载 '+name}}</a>
    <button v-else type="button" :disabled="!!busy" @click="prepare(kind)">{{busy===kind?'正在生成…':'生成 '+name}}</button>
   </template>
  </div>
  <small v-if="file" role="status">{{label}} 文件已生成</small>
  <div v-if="error" role="alert"><p>{{error}}</p><button type="button" class="vb-text-button" @click="isFileRefusalOnly(body)?emit('retry'):prepare()">{{isFileRefusalOnly(body)?'重新生成正文':'重试生成文件'}}</button></div>
  <small v-if="file?.pageCount">内容较长，{{file.pageCount}} 张图片已打包为 ZIP。</small>
 </div>

</template>
<style scoped>
.vb-chat-export{margin-top:10px;font-size:13px;color:var(--vb-muted,#6b8174)}summary{cursor:pointer;width:max-content}.vb-chat-export-options{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.vb-chat-export-options button,.vb-chat-export-options a{display:inline-flex;align-items:center;justify-content:center;min-height:40px;box-sizing:border-box;border:1px solid #71968066;background:transparent;color:inherit;border-radius:8px;padding:8px 14px;font:inherit;text-decoration:none;cursor:pointer}.vb-chat-export-options button:focus-visible,summary:focus-visible,a:focus-visible{outline:2px solid #5c9b7a;outline-offset:3px}button:disabled{opacity:.6;cursor:wait}small{display:block;margin-top:7px;color:var(--vb-muted,#6b8174);font-size:12px}.vb-chat-document{color:inherit;min-width:0}.vb-chat-document-body{overflow-wrap:anywhere;font-size:inherit;line-height:1.9;margin:0 0 16px}
:deep(.vb-chat-document-body :is(p,ul,ol,pre,.vb-markdown-table-wrap)){margin:0 0 .7em}
:deep(.vb-chat-document-body :last-child){margin-bottom:0}
:deep(.vb-chat-document-body :is(h1,h2,h3,h4,h5,h6)){margin:.7em 0 .25em;font-size:1.08em;line-height:1.5}
:deep(.vb-chat-document-body :is(ul,ol)){padding-left:1.6em}
:deep(.vb-chat-document-body pre){overflow-x:auto;padding:.7em;border-radius:8px;background:#eef5f1;white-space:pre}
:deep(.vb-chat-document-body code){padding:.08em .25em;border-radius:4px;background:#eef5f1}
:deep(.vb-chat-document-body pre code){padding:0}
:deep(.vb-chat-document-body .vb-markdown-table-wrap){max-width:100%;overflow-x:auto}
:deep(.vb-chat-document-body table){border-collapse:collapse;width:max-content;min-width:100%}
:deep(.vb-chat-document-body :is(th,td)){border:1px solid #dce9e2;padding:.35em .6em;text-align:left}
:deep(.vb-chat-document-body th){background:#e9f4ed}
</style>
