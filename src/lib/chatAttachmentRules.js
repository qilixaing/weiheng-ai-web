export const MAX_CHAT_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_TEXT = 24000;
export const MAX_HISTORY_ATTACHMENT_TEXT = 60000;
export const MAX_CHAT_IMAGE_LENGTH = 800000;
export const MAX_HISTORY_IMAGES = 6;
export const CHAT_ATTACHMENT_ACCEPT = '.jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,.md,.csv,.json,.log';

/** Reject unsupported files before reading or decoding their contents. */
export function chatFileKind(file) {
  const extension = String(file.name || '').split('.').pop().toLowerCase();
  const kind = ['jpg', 'jpeg', 'png', 'webp'].includes(extension) ? 'image'
    : ['pdf', 'docx', 'txt', 'md', 'csv', 'json', 'log'].includes(extension) ? 'document' : null;
  if (!kind) throw new Error('支持 JPG、PNG、WebP、PDF、DOCX、TXT、MD、CSV 和 JSON 文件。');
  if (!file.size) throw new Error('这个文件是空的，请重新选择。');
  if (file.size > (kind === 'image' ? 8 : 10) * 1024 * 1024) {
    throw new Error(kind === 'image' ? '单张照片不能超过 8 MB。' : '单个文件不能超过 10 MB。');
  }
  return kind;
}

export function validateAttachmentText(text) {
  const normalized = String(text).replace(/\u0000/g, '').trim();
  if (!normalized) throw new Error('没有读取到文字。扫描版 PDF 请改为上传页面截图。');
  if (normalized.length > MAX_ATTACHMENT_TEXT) throw new Error('文件文字超过 24,000 字，请截取需要讨论的部分后上传。');
  return normalized;
}
