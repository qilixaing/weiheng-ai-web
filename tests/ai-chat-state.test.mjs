import test from 'node:test';
import assert from 'node:assert/strict';
import { computed, reactive } from 'vue';
import { appendPendingAssistantMessage } from '../src/lib/aiChatState.js';

test('assistant completion reactively unlocks chat input and quick prompts', () => {
  const thread = reactive({ messages: [] });
  const sending = computed(() => thread.messages.some((message) => message.status === 'sending'));
  const assistant = appendPendingAssistantMessage(thread.messages, 'assistant-1', '2026-11-02T00:00:00.000Z');

  assert.equal(sending.value, true);
  assistant.content = '回复完成';
  assert.equal(sending.value, true);
  assistant.status = 'complete';
  assert.equal(sending.value, false);
});
