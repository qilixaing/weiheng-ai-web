<script setup>
import { ref } from 'vue';
import AppIcon from './AppIcon.vue';
import ModalShell from './ModalShell.vue';

const props = defineProps({ modelValue: { type: Object, default: null } });
const emit = defineEmits(['update:modelValue','selected']);
const large=ref(false);
const cameraInput = ref(null), localInput = ref(null), error = ref(''), busy = ref(false);

function decodeImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ image, url });
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('这张图片无法预览，请尝试 JPG、PNG 或 WebP 图片。')); };
    image.src = url;
  });
}
function toJpeg(canvas, quality) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('图片处理失败，请重新选择。')), 'image/jpeg', quality));
}
function asDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('图片读取失败，请重新选择。'));
    reader.readAsDataURL(blob);
  });
}
async function preparePhoto(file) {
  let decoded;
  try {
    const bitmap = await createImageBitmap(file);
    decoded = { image: bitmap, width: bitmap.width, height: bitmap.height, cleanup: () => bitmap.close() };
  } catch {
    const result = await decodeImage(file);
    decoded = { image: result.image, width: result.image.naturalWidth, height: result.image.naturalHeight, cleanup: () => URL.revokeObjectURL(result.url) };
  }
  try {
    const scale = Math.min(1, 1200 / Math.max(decoded.width, decoded.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(decoded.width * scale));
    canvas.height = Math.max(1, Math.round(decoded.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('浏览器暂不支持图片预览。');
    context.drawImage(decoded.image, 0, 0, canvas.width, canvas.height);
    let blob = await toJpeg(canvas, 0.76);
    if (blob.size > 320_000) blob = await toJpeg(canvas, 0.58);
    if (blob.size > 320_000) {
      const smaller = document.createElement('canvas');
      smaller.width = Math.round(canvas.width * 0.75);
      smaller.height = Math.round(canvas.height * 0.75);
      smaller.getContext('2d')?.drawImage(canvas, 0, 0, smaller.width, smaller.height);
      blob = await toJpeg(smaller, 0.58);
    }
    return await asDataUrl(blob);
  } finally { decoded.cleanup(); }
}
async function chooseFile(event, source) {
  const input = event.target;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  error.value = '';
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') { error.value = '请选择 JPG、PNG 或其他常见照片格式。'; return; }
  if (file.size > 12 * 1024 * 1024) { error.value = '图片需小于 12 MB，请先选择较小的图片。'; return; }
  busy.value = true;
  try {
    const dataUrl = await preparePhoto(file);
    const photo={name:file.name.slice(0,100),dataUrl,source,mime:'image/jpeg'};
    emit('update:modelValue',photo);emit('selected',photo);
  } catch (cause) { error.value = cause instanceof Error ? cause.message : '无法处理这张图片，请重新选择。'; }
  finally { busy.value = false; }
}
function removePhoto() { error.value = ''; emit('update:modelValue', null); }
</script>

<template>
  <div class="vb-photo-picker">
    <input ref="cameraInput" class="vb-sr-only" type="file" accept="image/*" capture="environment" aria-hidden="true" tabindex="-1" @change="chooseFile($event, '拍照')" />
    <input ref="localInput" class="vb-sr-only" type="file" accept="image/*" aria-hidden="true" tabindex="-1" @change="chooseFile($event, '本地图片')" />
    <div v-if="modelValue" class="vb-photo-preview">
      <button type="button" class="vb-photo-zoom" aria-label="查看照片大图" @click="large=true"><img :src="modelValue.dataUrl" alt="本次饮食照片预览" /></button>
      <span><strong>{{ modelValue.name }}</strong><small>{{ modelValue.source }} · 点击图片查看大图</small></span>
      <button type="button" class="vb-icon-button" aria-label="移除照片" @click="removePhoto"><AppIcon name="close" :size="15" /></button>
    </div>
    <div class="vb-photo-actions">
      <button type="button" class="vb-photo-button" :disabled="busy" @click="cameraInput?.click()"><AppIcon name="camera" :size="17" />拍照</button>
      <button type="button" class="vb-photo-button" :disabled="busy" @click="localInput?.click()"><AppIcon name="upload" :size="17" />{{ modelValue?'更换照片':'本地选择' }}</button>
    </div>
    <p v-if="busy" class="vb-photo-hint" role="status">正在准备图片…</p>
    <p v-else-if="error" class="vb-photo-error" role="alert">{{ error }}</p>
    <ModalShell v-if="large&&modelValue" title="饮食照片预览" wide @close="large=false"><img class="vb-photo-large" :src="modelValue.dataUrl" alt="饮食照片大图" /></ModalShell>
  </div>
</template>
