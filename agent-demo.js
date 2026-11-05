const DEMO_STORE='vitabalance.agent-demo.v1';
const SEED={stage:'ready',round:0,feedback:'',result:null,outcome:null,history:[],error:''};
let state;
try{state={...SEED,...JSON.parse(localStorage.getItem(DEMO_STORE)||'{}')}}catch{state={...SEED}}
const save=()=>localStorage.setItem(DEMO_STORE,JSON.stringify(state));
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={profile:{goal:'均衡饮食',budgetPerMeal:20,cooking:'快手'},records:[{meal:'早餐',foods:[{name:'燕麦',grams:40},{name:'牛奶',grams:200},{name:'香蕉',grams:90}]},{meal:'午餐',foods:[{name:'米饭',grams:150},{name:'西兰花',grams:100},{name:'鸡蛋',grams:50}]}],preferences:['不吃香菜','希望准备简单']};

function fallback(feedback){
  const tofu=String(feedback||'').includes('豆腐');
  return {source:'local',title:tofu?'家常豆腐与米饭':'家常蔬菜蛋白搭配',menu:tofu?[
    {meal:'晚餐',food:'米饭 150 克 + 香菇豆腐 150 克 + 清炒青菜',reason:'按反馈把主要蛋白质食物换成豆腐。'},
    {meal:'准备',food:'约 15 分钟可完成',reason:'选择常见食材和简单烹饪。'}
  ]:[
    {meal:'晚餐',food:'米饭 150 克 + 鸡蛋 1 个 + 西兰花或当季青菜',reason:'搭配不同食物类别，采用容易准备的家常食材。'},
    {meal:'替换',food:'不吃香菜；可按口味换成其他熟蔬菜',reason:'尊重演示偏好，不强制指定单一食物。'}
  ],reasoning:tofu?'已纳入你提出的豆腐偏好，给出可替换的家常组合。':'参考演示记录中出现的谷物、奶类、水果和蔬菜，提供另一顿简单搭配。',limitation:'这是示范性的普通饮食搭配参考，不能判断营养是否充足或替代专业评估。'};
}
function render(){
  const result=state.result;
  return '<div class="page-title-row"><div><h1>菜单建议示例</h1><p class="subhead">挑一份搭配，不合口味再换。</p></div><button class="button button-soft" data-agent-back>← 返回首页</button></div>'+
  '<div class="demo-notice"><span>ⓘ</span><p>使用固定样例，不读取你的饮食记录。</p></div>'+
  '<div class="agent-layout '+(result&&!state.outcome?'has-decision':'')+'"><div class="agent-main-column"><section class="panel agent-context"><div class="agent-section-title"><div><h2>示例饮食</h2><p>均衡饮食 · 快手家常 · 预算约 ¥20/餐</p></div></div><div class="demo-meal-snapshot"><div><small>早餐</small><b>燕麦 · 牛奶 · 香蕉</b></div><div><small>午餐</small><b>米饭 · 西兰花 · 鸡蛋</b></div><div><small>偏好</small><b>不吃香菜</b></div></div></section>'+
  '<section class="panel agent-output"><div class="agent-section-title"><div><h2>一餐搭配</h2></div><span class="agent-run-badge '+(state.stage==='running'?'is-running':result?'is-ready':'')+'">'+(state.stage==='running'?'生成中':result?(result.source==='ai'?'已生成':'示例建议'):'待生成')+'</span></div>'+
  (state.stage==='running'?'<div class="agent-loading"><span class="loader"></span><div><b>正在生成建议</b><small>稍等片刻…</small></div></div>':'')+
  (result?'<div class="agent-plan-card"><div class="agent-plan-heading"><div><small>第 '+state.round+' 轮</small><h3>'+esc(result.title||'一餐搭配建议')+'</h3></div><span class="agent-source-pill">'+(result.source==='ai'?'AI 建议':'示例建议')+'</span></div><div class="agent-menu-list">'+(result.menu||[]).map(m=>'<div><span>'+esc(m.meal||'搭配')+'</span><b>'+esc(m.food||'')+'</b></div>').join('')+'</div><details class="agent-more"><summary>为什么这样搭</summary><div class="agent-rationale"><b>推荐理由</b><p>'+esc(result.reasoning)+'</p></div><div class="agent-rationale agent-limit"><b>使用说明</b><p>'+esc(result.limitation)+'</p></div></details></div>':'')+
  (state.error?'<p class="agent-error">'+esc(state.error)+'</p>':'')+
  (!result&&state.stage!=='running'?'<label class="demo-consent"><input id="agent-demo-consent" type="checkbox"><span>同意将示例及本页填写的偏好发送给 DeepSeek</span></label><button class="button button-primary agent-primary-action" id="agent-start" type="button">生成菜单 →</button>':'')+
  (result&&!state.outcome?'<div class="agent-feedback"><label class="field">想换点什么？<span class="optional">只填写口味、时间或预算偏好</span><textarea id="agent-feedback" rows="2" maxlength="160" placeholder="例如：晚餐想换成豆腐，预算控制在 15 元以内">'+esc(state.feedback)+'</textarea></label><button class="button button-soft" id="agent-adjust" type="button">换个搭配 →</button></div>':'')+
  (state.outcome?'<div class="agent-outcome"><span>✓</span><div><b>已记录你的选择</b><p>'+({adopted:'已采纳建议',modified:'调整后执行',skipped:'暂未执行'}[state.outcome]||'已记录')+(state.outcomeNote?' · '+esc(state.outcomeNote):'')+'</p></div></div>':'')+'</section></div>'+
  '<aside class="agent-side-column">'+
  (result&&!state.outcome?'<section class="panel agent-decision-card"><div class="eyebrow">下一步</div><h2>这份建议适合你吗？</h2><div class="agent-decision-buttons"><button class="button button-primary" data-agent-outcome="adopted">保存这份菜单</button><button class="button button-soft" data-agent-outcome="modified">自行调整</button><button class="button button-quiet" data-agent-outcome="skipped">暂不采纳</button></div></section>':'')+
  (state.outcome?'<section class="panel agent-next-card"><h2>菜单选好了</h2><button class="button button-primary" id="agent-next-round">再选一份 →</button><button class="text-button" id="agent-reset">重新开始</button></section>':'')+'</aside></div>';
}
async function run(action,rerender,toast){
  state.stage='running';state.error='';save();rerender();
  try{const res=await fetch('/api/agent/meal-plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,context,feedback:state.feedback,outcome:state.history.length?state.history[state.history.length-1].outcome:''})});const body=await res.json();if(!res.ok)throw new Error(body.error||'AI 暂不可用');state.result={...body.result,source:'ai'};}
  catch{state.result={...fallback(state.feedback),source:'local'};state.error='AI 暂不可用，以下为本地示例搭配。';}
  state.round=Math.max(1,state.round);state.stage='ready';save();rerender();
}
export function bindAgentDemo(rerender,toast,onAdopt){
  document.querySelector('[data-agent-back]')?.addEventListener('click',()=>{document.querySelector('[data-nav="overview"]')?.click();});
  document.querySelector('#agent-start')?.addEventListener('click',()=>{if(!document.querySelector('#agent-demo-consent')?.checked){toast('请先确认演示数据说明');return;}run('plan',rerender,toast);});
  document.querySelector('#agent-adjust')?.addEventListener('click',()=>{state.feedback=String(document.querySelector('#agent-feedback')?.value||'').trim();if(!state.feedback){toast('写一句你希望调整的偏好');return;}run('adjust',rerender,toast);});
  document.querySelectorAll('[data-agent-outcome]').forEach(b=>b.addEventListener('click',()=>{state.outcome=b.dataset.agentOutcome;state.outcomeNote=state.feedback;state.stage='complete';state.history.push({round:state.round,outcome:state.outcome,note:state.outcomeNote,at:new Date().toISOString()});save();if(state.outcome==='adopted'&&state.result&&onAdopt){onAdopt({...state.result,round:state.round});return;}rerender();}));
  document.querySelector('#agent-next-round')?.addEventListener('click',()=>{state.result=null;state.outcome=null;state.stage='ready';state.round++;state.feedback=state.outcomeNote||state.feedback;save();rerender();});
  document.querySelector('#agent-reset')?.addEventListener('click',()=>{state={...SEED,history:[]};save();rerender();});
}
export function agentDemoPage(){return render();}
