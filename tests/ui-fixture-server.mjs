// Local UI integration fixture ONLY. Not used by npm start or any production route.
// Responses are explicitly simulated to verify confirmation, persistence and report history.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createAiHandler} from '../server/ai-api.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));let upstreamCalls=0;
const handler=createAiHandler({env:{DEEPSEEK_API_KEY:'test-only-synthetic-token'},fetchImpl:async(_url,options)=>{
 upstreamCalls++;const body=JSON.parse(options.body);const vision=Array.isArray(body.messages[1].content);
 const result=vision?{items:[{name:'香蕉（生）',foodId:'banana',grams:120,uncertainty:'模拟识别：此数据仅用于界面验收。'},{name:'未知配菜',foodId:null,grams:50,uncertainty:'模拟未匹配项目，可删除或修改。'}],note:'模拟接口，仅验证确认及去重流程。'}:body.messages[0].content.includes('解释助手')?{summary:'模拟问答：数值由数据库展示。',explanation:'仅用于 UI 验收。',limitations:'不是真实 AI 回答。'}:{summary:'模拟报告：已保存的记录包含水果和主食。',overview:['界面验收模拟，数据由程序汇总。'],targetComparison:['不能从不完整记录判断全天摄入。'],foodMix:['测试食物搭配展示。'],attention:['未匹配项目保留未知营养值。'],suggestions:['实际建议应以有效服务返回为准。'],scope:'此报告为本地自动化验收模拟，不能作为营养建议。'};
 await new Promise(resolve=>setTimeout(resolve,700));return new Response(JSON.stringify({model:'SIMULATED-UI-TEST',choices:[{message:{content:JSON.stringify(result)}}]}));
}});
createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname==='/fixture-status'){res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({simulated:true,upstreamCalls}));return;}if(await handler(req,res,url))return;const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!path.startsWith(root)||path.includes('.env')){res.writeHead(403);res.end();return;}try{let content=await readFile(path);if(url.pathname==='/')content=Buffer.from(content.toString().replace('<title>','<title>[模拟验收] ').replace('<body>','<body><div style="position:fixed;top:0;right:0;z-index:9999;background:#733;color:white;font:11px sans-serif;padding:3px">模拟接口验收 · 非真实 AI</div>'));const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.json':'application/json'};res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(content);}catch{res.writeHead(404);res.end();}}).listen(4181,'127.0.0.1',()=>console.log('Simulated UI fixture at http://127.0.0.1:4181 (not real AI)'));
