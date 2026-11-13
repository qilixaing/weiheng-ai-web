import test from 'node:test';
import assert from 'node:assert/strict';
import {createSSRApp,h} from 'vue';
import {renderToString} from '@vue/server-renderer';
import SafeMarkdown from '../src/components/SafeMarkdown.js';

const render = content => renderToString(createSSRApp({render:()=>h(SafeMarkdown,{content})}));

test('assistant Markdown renders headings, emphasis, lists, tables, links and fenced code',async()=>{
 const html=await render('# 标题\n\n**重点**\n\n- 一\n- 二\n\n| 食物 | 热量 |\n| --- | --- |\n| 白菜 | 16 |\n\n[来源](https://example.org/a)\n\n```js\nconst n = 1;\n```');
 for(const tag of ['<h1>标题</h1>','<strong>重点</strong>','<li>一</li>','<table>','<th>食物</th>','<td>16</td>','<pre>','language-js'])assert.ok(html.includes(tag),tag);
 assert.match(html,/href="https:\/\/example\.org\/a"/);
});

test('raw HTML is text and unsafe links never become clickable',async()=>{
 const html=await render('<img src=x onerror=alert(1)> [run](javascript:alert(1)) [safe](https://example.org/)');
 assert.ok(html.includes('&lt;img'));
 assert.ok(!html.includes('<img'));
 assert.ok(!html.includes('href="javascript:'));
 assert.ok(html.includes('href="https://example.org/"'));
});

test('partial streaming Markdown stays visible and final text has no duplicate blocks',async()=>{
 const partial=await render('**重');
 const final=await render('**重点**\n\n| A | B |\n| --- | --- |\n| 1 | 2 |');
 assert.ok(partial.includes('重'));
 assert.equal((final.match(/<strong>重点<\/strong>/g)||[]).length,1);
 assert.equal((final.match(/<table>/g)||[]).length,1);
});
