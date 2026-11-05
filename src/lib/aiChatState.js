/**
 * Add a pending assistant message and return it through the reactive array.
 * Reading it back matters: the raw object passed to Array.push is not a Vue
 * proxy, so mutating that reference after an await won't notify computed state.
 * @param {import('../types/nutrition').AiDietChatMessage[]} messages
 * @param {string} id
 * @param {string} createdAt
 * @returns {import('../types/nutrition').AiDietChatMessage}
 */
export function appendPendingAssistantMessage(messages, id, createdAt) {
  messages.push({ id, role: 'assistant', content: '', status: 'sending', createdAt });
  return messages[messages.length - 1];
}
