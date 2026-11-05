const MAX_MEMORY_PAIRS = 50;
const MAX_MEMORY_CHARS = 24000;
const MAX_MESSAGE_CHARS = 220;

function timeValue(value, fallback) {
  const parsed = Date.parse(value || fallback || '');
  return Number.isFinite(parsed) ? parsed : 0;
}

function clip(value) {
  const text = String(value || '').trim();
  return text.length > MAX_MESSAGE_CHARS ? `${text.slice(0, MAX_MESSAGE_CHARS)}…` : text;
}

/** Build an attachment-free memory from up to 50 recent completed turns in other chats. */
export function buildConversationMemory(threads, activeThreadId, enabled = true) {
  if (!enabled || !Array.isArray(threads)) return '';

  const pairs = [];
  for (const thread of threads) {
    if (!thread || thread.id === activeThreadId || !Array.isArray(thread.messages)) continue;
    const messages = thread.messages;
    for (let index = 0; index < messages.length - 1; index++) {
      const user = messages[index], assistant = messages[index + 1];
      if (user?.role !== 'user' || assistant?.role !== 'assistant'
        || user.status !== 'complete' || assistant.status !== 'complete'
        || user.attachments?.length || assistant.attachments?.length) continue;
      const userText = clip(user.content), assistantText = clip(assistant.content);
      if (!userText || !assistantText) continue;
      pairs.push({
        date: typeof thread.date === 'string' ? thread.date : '',
        time: timeValue(user.createdAt, thread.createdAt),
        user: userText,
        assistant: assistantText,
      });
      index++;
    }
  }

  const recent = pairs.sort((left, right) => left.time - right.time).slice(-MAX_MEMORY_PAIRS);
  let memory = recent.map((pair) => `${pair.date ? `日期 ${pair.date}：` : ''}用户：${pair.user}\n助手：${pair.assistant}`).join('\n\n');
  while (memory.length > MAX_MEMORY_CHARS && recent.length) {
    recent.shift();
    memory = recent.map((pair) => `${pair.date ? `日期 ${pair.date}：` : ''}用户：${pair.user}\n助手：${pair.assistant}`).join('\n\n');
  }
  return memory;
}
