import {timeoutSignal, anySignal} from './browserSignals.js';
export async function aiRequest(path,body){
 let response;try{response=await fetch('/api/ai/'+path,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:timeoutSignal(90000)});}catch(cause){throw new Error(cause?.name==='TimeoutError'?'AI 请求等待超时，可以重试；已保存的记录不受影响。':'无法连接 AI 服务，请检查后端是否启动及网络连接。');}
 let payload;try{payload=await response.json();}catch{throw new Error('后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。');}
 if(!response.ok){const error=new Error(payload.error||'AI 服务暂时不可用。');error.code=payload.code;throw error;}return payload;
}

/**
 * POST an AI request and deliver each server-sent event as soon as it arrives.
 * @param {string} path
 * @param {unknown} body
 * @param {(event: import('../types/nutrition').AiDietChatStreamEvent) => void} onEvent
 * @param {AbortSignal} [abortSignal]
 */
export async function aiStream(path,body,onEvent,abortSignal){
 const timedSignal=timeoutSignal(90000),signal=abortSignal?anySignal([abortSignal,timedSignal]):timedSignal;
 let response;try{response=await fetch('/api/ai/'+path,{method:'POST',headers:{'Content-Type':'application/json','Accept':'text/event-stream'},body:JSON.stringify({.../** @type {Record<string, unknown>} */ (body),stream:true}),signal});}catch(cause){throw new Error(cause?.name==='TimeoutError'?'AI 请求等待超时，可以重试；已保存的记录不受影响。':'无法连接 AI 服务，请检查后端是否启动及网络连接。');}
 if(!response.ok){let payload;try{payload=await response.json();}catch{throw new Error('后端没有返回有效数据，请使用 npm start 或启动带代理的开发服务。');}const error=new Error(payload.error||'AI 服务暂时不可用。');error.code=payload.code;throw error;}
 if(!response.body)throw new Error('浏览器没有提供流式读取能力，请更新浏览器后重试。');
 const reader=response.body.getReader(),decoder=new TextDecoder();let pending='',completed=false,result=null;
 const consume=(block)=>{
  const data=block.split(/\r?\n/).filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trimStart()).join('\n');if(!data)return;
  let event;try{event=JSON.parse(data);}catch{throw new Error('AI 流式响应格式异常，请重试。');}
  if(event?.type==='error'){const error=new Error(event.message||'AI 暂时无法回复，请重试。');error.code=event.code;throw error;}
  if(event?.type==='progress'&&event.step){onEvent(event);return;}
  if(event?.type==='status'&&typeof event.message==='string'){onEvent(event);return;}
  if(event?.type==='delta'&&typeof event.text==='string'){onEvent(event);return;}
  if(event?.type==='done'&&typeof event.model==='string'){result=event;completed=true;onEvent(event);}
 };
 try{
  while(!completed){const{value,done}=await reader.read();if(done)break;pending+=decoder.decode(value,{stream:true});let boundary;while((boundary=pending.search(/\r?\n\r?\n/))>=0){const separator=pending.slice(boundary).match(/^\r?\n\r?\n/)[0];consume(pending.slice(0,boundary));pending=pending.slice(boundary+separator.length);if(completed)break;}}
  pending+=decoder.decode();if(pending.trim()&&!completed)consume(pending);
  if(!completed||!result)throw new Error('AI 流式连接提前结束，请重试。');
  return result;
 }finally{reader.releaseLock();}
}

export async function mealPlanStream(body,onProgress){
 const event=await aiStream('meal-plan',body,event=>{if(event.type==='progress')onProgress(event.step);});
 if(!event.result||!['ready','needs_evidence'].includes(event.result.status))throw new Error('方案响应不完整，请保留输入并重试。');
 return event.result;
}
