import test from 'node:test';
import assert from 'node:assert/strict';
import { buildConversationMemory } from '../src/lib/chatMemory.js';

const message = (role, content, createdAt, extra = {}) => ({ role, content, createdAt, status: 'complete', ...extra });
const thread = (id, date, messages) => ({ id, date, createdAt: `${date}T00:00:00.000Z`, messages });

test('cross-chat memory includes up to the latest 50 completed text exchanges from other chats', () => {
  const exchanges = Array.from({ length: 55 }, (_, index) => {
    const timestamp = new Date(Date.UTC(2026, 10, 1, index));
    const iso = timestamp.toISOString();
    return thread(`thread-${index}`, iso.slice(0, 10), [
      message('user', `问题${index + 1}`, iso),
      message('assistant', `回答${index + 1}`, new Date(timestamp.getTime() + 60_000).toISOString()),
    ]);
  });
  const edgeCases = thread('edge-cases', '2026-11-03', [
    message('user', '正在生成的问题', '2026-11-03T23:01:00Z'), { ...message('assistant', '', '2026-11-03T23:02:00Z'), status: 'failed' },
    message('user', '请排除带附件的对话', '2026-11-03T23:03:00Z'), message('assistant', '好的', '2026-11-03T23:04:00Z', { attachments: [{ id: 'a' }] }),
  ]);
  const active = thread('active', '2026-11-03', [message('user', '当前对话已会带入', '2026-11-03T23:05:00Z'), message('assistant', '当前回复', '2026-11-03T23:06:00Z')]);
  const memory = buildConversationMemory([...exchanges, edgeCases, active], 'active');
  assert.match(memory, /问题6/);
  assert.match(memory, /回答55/);
  assert.doesNotMatch(memory, /用户：问题1\n|助手：回答5\n|当前对话已会带入|正在生成的问题|请排除带附件的对话/);
});

test('memory can be disabled and bounds each remembered message', () => {
  const long = '饮食偏好'.repeat(200);
  const chats = [thread('older', '2026-11-02', [message('user', long, '2026-11-02T10:00:00Z'), message('assistant', long, '2026-11-02T10:01:00Z')])];
  assert.equal(buildConversationMemory(chats, 'active', false), '');
  const memory = buildConversationMemory(chats, 'active');
  assert.ok(memory.length <= 500);
  assert.match(memory, /…/);
});

test('memory is capped at 24,000 characters while keeping the most recent exchange', () => {
  const chats = Array.from({ length: 50 }, (_, index) => {
    const timestamp = new Date(Date.UTC(2026, 10, 1, index));
    return thread(`long-${index}`, '2026-11-03', [
      message('user', `用户${index} ${'偏好'.repeat(300)}`, timestamp.toISOString()),
      message('assistant', `助手${index} ${'建议'.repeat(300)}`, new Date(timestamp.getTime() + 60_000).toISOString()),
    ]);
  });
  const memory = buildConversationMemory(chats, 'active');
  assert.ok(memory.length <= 24000);
  assert.match(memory, /用户0 /);
  assert.match(memory, /助手0 /);
  assert.match(memory, /用户49/);
  assert.match(memory, /助手49/);
});
