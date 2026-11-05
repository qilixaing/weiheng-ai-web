import { scopedKey } from './storageScope.js';
import type { ChatAttachment } from '../types/nutrition';
import { isAppResetting } from './appDataReset.js';
import { chatFileKind, MAX_CHAT_IMAGE_LENGTH, validateAttachmentText } from './chatAttachmentRules.js';

let connection: Promise<IDBDatabase> | undefined;
function database(): Promise<IDBDatabase> {
  if (!connection) {
    connection = new Promise<IDBDatabase>((resolve, reject) => {
      if (!globalThis.indexedDB) { reject(new Error('浏览器无法保存聊天附件，请检查隐私设置。')); return; }
      const request = indexedDB.open(scopedKey('weiheng.chat-attachments.v1'), 1);
      request.onupgradeneeded = () => request.result.createObjectStore('attachments', { keyPath: 'id' });
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => { db.close(); connection = undefined; };
        resolve(db);
      };
      request.onerror = request.onblocked = () => reject(new Error('无法打开聊天附件存储，请检查浏览器隐私设置。'));
    }).catch((error) => { connection = undefined; throw error; });
  }
  return connection;
}

async function transaction<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await database();
  if (mode === 'readwrite' && isAppResetting()) throw new Error('正在重置本地数据，已停止保存附件。');
  return new Promise((resolve, reject) => {
    const tx = db.transaction('attachments', mode);
    const request = action(tx.objectStore('attachments'));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = tx.onabort = () => reject(new Error('聊天附件保存失败，可能本地存储空间不足。'));
  });
}

export const saveChatAttachment = (attachment: ChatAttachment) => transaction('readwrite', (store) => store.put(attachment));
export const loadChatAttachment = (id: string): Promise<ChatAttachment | undefined> => transaction('readonly', (store) => store.get(id));
export const deleteChatAttachment = (id: string) => transaction('readwrite', (store) => store.delete(id));

function blobDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('照片读取失败，请重新选择。'));
    reader.readAsDataURL(blob);
  });
}

async function imageDataUrl(file: File): Promise<string> {
  const image = await createImageBitmap(file).catch(() => { throw new Error('照片无法读取，请换用 JPG、PNG 或 WebP。'); });
  try {
    if (image.width * image.height > 40_000_000) throw new Error('照片分辨率过大，请缩小后上传。');
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1600 / Math.max(image.width, image.height));
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('浏览器暂不支持照片处理。');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.85, 0.68, 0.5]) {
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error('照片压缩失败。')), 'image/jpeg', quality));
      const dataUrl = await blobDataUrl(blob);
      if (dataUrl.length <= MAX_CHAT_IMAGE_LENGTH) return dataUrl;
    }
    throw new Error('照片压缩后仍然过大，请裁剪后重试。');
  } finally { image.close(); }
}

async function pdfText(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  // The worker is packaged locally; no document contents go to a CDN.
  pdfjs.GlobalWorkerOptions.workerSrc = '/content-dist/pdf.worker.min.js';
  const task = pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()), useSystemFonts: true,
    cMapUrl: '/content-dist/pdf-resources/cmaps/', cMapPacked: true,
    standardFontDataUrl: '/content-dist/pdf-resources/standard_fonts/',
  });
  try {
    const document = await task.promise;
    if (document.numPages > 40) throw new Error('PDF 超过 40 页，请截取需要讨论的页面后上传。');
    const pages: string[] = [];
    for (let index = 1; index <= document.numPages; index++) {
      const page = await document.getPage(index);
      const text = await page.getTextContent();
      pages.push(text.items.map((item) => 'str' in item ? item.str + (item.hasEOL ? '\n' : ' ') : '').join(''));
      if (pages.join('\n').length > 24000) throw new Error('文件文字超过 24,000 字，请截取需要讨论的部分后上传。');
      page.cleanup();
    }
    return pages.join('\n\n');
  } catch (error) {
    if (error instanceof Error && error.name === 'PasswordException') throw new Error('PDF 已加密，请解锁后再上传。');
    throw error;
  } finally { await task.destroy(); }
}

async function docxText(file: File): Promise<string> {
  const { unzipSync, strFromU8 } = await import('fflate');
  const files = unzipSync(new Uint8Array(await file.arrayBuffer()), {
    filter: (entry) => entry.name === 'word/document.xml' && entry.originalSize <= 4 * 1024 * 1024,
  });
  if (!files['word/document.xml']) throw new Error('Word 文件无效或内容过大，请另存为 DOCX 或 TXT 后重试。');
  const xml = new DOMParser().parseFromString(strFromU8(files['word/document.xml']), 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error('Word 文件内容无法读取。');
  return Array.from(xml.getElementsByTagNameNS('*', 'p')).map((paragraph) => {
    return Array.from(paragraph.getElementsByTagNameNS('*', '*')).map((node) => {
      if (node.localName === 't') return node.textContent || '';
      if (node.localName === 'tab') return '\t';
      if (node.localName === 'br') return '\n';
      return '';
    }).join('');
  }).join('\n');
}

export async function prepareChatAttachment(file: File, id: string): Promise<ChatAttachment> {
  const kind = chatFileKind(file);
  const attachment: ChatAttachment = { id, kind, name: file.name.slice(0, 180), size: file.size, mimeType: file.type };
  if (kind === 'image') return { ...attachment, mimeType: 'image/jpeg', dataUrl: await imageDataUrl(file) };
  const extension = file.name.split('.').pop()?.toLowerCase();
  let text: string;
  try {
    if (extension === 'pdf') text = await pdfText(file);
    else if (extension === 'docx') text = await docxText(file);
    else {
      const bytes = new Uint8Array(await file.arrayBuffer());
      text = new TextDecoder().decode(bytes);
      if (text.includes('\uFFFD')) text = new TextDecoder('gb18030').decode(bytes);
    }
  } catch (error) {
    throw new Error(error instanceof Error && /[\u4e00-\u9fff]/.test(error.message) ? error.message : '文件无法读取，请确认文件完整，或另存为 TXT 后重试。');
  }
  return { ...attachment, text: validateAttachmentText(text) };
}
