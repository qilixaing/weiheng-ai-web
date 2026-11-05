export const FEEDBACK_KEY='weiheng.feedback.real.v1';
export function validateFeedback(input) {
 if(!input||typeof input!=='object')throw new Error('反馈格式不正确。');
 if(input.consent!==true)throw new Error('请确认自愿保存这次反馈。');
 if(input.isSynthetic===true||input.isDemo===true||input.origin==='synthetic-demo')throw new Error('模拟反馈不能保存为真实反馈。');
 const task=String(input.task||'').trim().slice(0,80),content=String(input.content||'').trim().slice(0,1200);
 if(!task||!content)throw new Error('请填写体验任务和反馈内容。');
 if(![true,false].includes(input.completed))throw new Error('请选择是否完成任务。');
 for(const key of ['rating','explanationRating'])if(!Number.isInteger(Number(input[key]))||Number(input[key])<1||Number(input[key])>5)throw new Error('评价需为1—5分。');
 const durationSeconds=input.durationSeconds==null||input.durationSeconds===''?null:Number(input.durationSeconds);
 if(durationSeconds!==null&&(!Number.isFinite(durationSeconds)||durationSeconds<0||durationSeconds>86400))throw new Error('实际用时需为0—86400秒，未测量可以留空。');
 return{task,content,completed:input.completed,rating:Number(input.rating),explanationRating:Number(input.explanationRating),durationSeconds,isSynthetic:false,isDemo:false,origin:'voluntary-local',actor:'匿名体验者'};
}
export function loadFeedback(storage,key=FEEDBACK_KEY) {
 try{const rows=JSON.parse(storage.getItem(key)||'[]');return Array.isArray(rows)?rows.filter(x=>x&&x.isSynthetic===false&&x.isDemo===false&&x.origin==='voluntary-local'):[];}catch{return[];}
}
export function saveFeedback(storage,input,key=FEEDBACK_KEY) {
 const value=validateFeedback(input),rows=loadFeedback(storage,key);
 const last=rows.at(-1);if(last&&Date.now()-Date.parse(last.createdAt)<10000&&last.task===value.task&&last.content===value.content)throw new Error('这条反馈刚刚已保存，请勿重复提交。');
 const row={...value,id:crypto.randomUUID(),createdAt:new Date().toISOString()};
 storage.setItem(key,JSON.stringify([...rows,row]));return row;
}
export function feedbackStats(rows,{demo=false}={}) {
 const valid=rows.filter(x=>demo?x.isSynthetic===true&&x.isDemo===true:x.isSynthetic===false&&x.isDemo===false&&x.origin==='voluntary-local');
 const measured=valid.filter(x=>typeof x.durationSeconds==='number'&&Number.isFinite(x.durationSeconds));
 return{count:valid.length,completionRate:valid.length?valid.filter(x=>x.completed).length/valid.length:null,averageRating:valid.length?valid.reduce((n,x)=>n+x.rating,0)/valid.length:null,averageSeconds:measured.length?measured.reduce((n,x)=>n+x.durationSeconds,0)/measured.length:null,measuredCount:measured.length,isSynthetic:demo};
}
export function feedbackCsv(rows,{demo=false}={}) {
 const selected=rows.filter(x=>demo?x.isSynthetic===true&&x.isDemo===true:x.isSynthetic===false&&x.isDemo===false&&x.origin==='voluntary-local');
 const escape=v=>'"'+String(v??'').replace(/^(?=[=+@\-\t\r])/,"'").replaceAll('"','""')+'"';
 return '\ufeff'+[['数据类型','任务','完成情况','操作评分','解释评分','用时秒','反馈','时间'],...selected.map(x=>[demo?'模拟用户反馈，非真实试用结果':'当前浏览器自愿提交，未经独立研究核验',x.task,x.completed?'完成':'未完成',x.rating,x.explanationRating,x.durationSeconds,x.content,x.createdAt])].map(row=>row.map(escape).join(',')).join('\r\n');
}
