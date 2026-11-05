export const MAX_CHAT_ATTACHMENTS: number;
export const MAX_ATTACHMENT_TEXT: number;
export const MAX_HISTORY_ATTACHMENT_TEXT: number;
export const MAX_CHAT_IMAGE_LENGTH: number;
export const MAX_HISTORY_IMAGES: number;
export const CHAT_ATTACHMENT_ACCEPT: string;
export function chatFileKind(file: { name: string; size: number }): 'image' | 'document';
export function validateAttachmentText(text: string): string;
