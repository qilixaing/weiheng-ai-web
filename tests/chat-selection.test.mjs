import test from 'node:test';
import assert from 'node:assert/strict';
import {selectChatThreads} from '../src/lib/chatSelection.js';
const thread=(id,messages,date='2026-11-06')=>({id,date,createdAt:'2026-11-06T09:55:00Z',messages});
const phone=thread('phone',[{id:'message',role:'user',content:'合成手机消息'}]),empty=thread('desktop-empty',[]);
test('startup empty selection yields to the same-account phone conversation',()=>{
 const state={threads:[phone,empty],activeByDate:{'2026-11-06':empty.id}};
 assert.equal(selectChatThreads(state,state.activeByDate)['2026-11-06'],'phone');
});
test('explicit new conversation and chosen nonempty history survive remote updates',()=>{
 const history=thread('history',[{id:'older',content:'合成历史'}]);
 const state={threads:[phone,empty,history],activeByDate:{'2026-11-06':'phone'}};
 assert.equal(selectChatThreads(state,{'2026-11-06':empty.id},[empty.id])['2026-11-06'],empty.id);
 assert.equal(selectChatThreads(state,{'2026-11-06':'history'})['2026-11-06'],'history');
 assert.equal(selectChatThreads(state,{'2026-11-06':'deleted'})['2026-11-06'],'phone');
 const previous=thread('previous',[{id:'past'}],'2026-11-05');
 assert.equal(selectChatThreads({threads:[previous,phone]})['2026-11-05'],'previous');
});
