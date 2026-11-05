<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: { type: [Number, String], default: '' },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  step: { type: Number, default: 0.1 },
  fallback: { type: Number, required: true },
  label: { type: String, required: true },
  unit: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue']);
const ruler = ref(null);
const dragging = ref(false);
const visibleRange = computed(() => (props.max - props.min) * 0.16);
const value = computed(() => {
  const number = Number(props.modelValue);
  return String(props.modelValue).trim() && Number.isFinite(number)
    ? Math.min(props.max, Math.max(props.min, number))
    : props.fallback;
});
const ticks = computed(() => {
  const offset = (value.value - props.min) / visibleRange.value;
  const fraction = offset - Math.round(offset);
  return Array.from({ length: 31 }, (_, index) => ({
    key: index,
    major: index % 5 === 0,
    left: `${50 + ((index - 15 - fraction) / 30) * 100}%`
  }));
});
let dragStart = null;

function snap(next) {
  const units = Math.round((next - props.min) / props.step);
  const decimals = props.step < 1 ? 1 : 0;
  return Number(Math.min(props.max, Math.max(props.min, props.min + units * props.step)).toFixed(decimals));
}
function setValue(next) { emit('update:modelValue', snap(next)); }
function onPointerDown(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  event.preventDefault();
  ruler.value.setPointerCapture(event.pointerId);
  dragging.value = true;
  dragStart = { x: event.clientX, value: value.value };
}
function onPointerMove(event) {
  if (!dragStart || !dragging.value) return;
  const width = ruler.value.getBoundingClientRect().width || 1;
  setValue(dragStart.value + ((event.clientX - dragStart.x) / width) * visibleRange.value);
}
function finishDrag() { dragging.value = false; dragStart = null; }
function onKeydown(event) {
  const increments = {
    ArrowRight: props.step, ArrowUp: props.step,
    ArrowLeft: -props.step, ArrowDown: -props.step,
    PageUp: props.step * 10, PageDown: -props.step * 10
  };
  if (event.key === 'Home') { event.preventDefault(); setValue(props.min); }
  else if (event.key === 'End') { event.preventDefault(); setValue(props.max); }
  else if (increments[event.key]) { event.preventDefault(); setValue(value.value + increments[event.key]); }
}
</script>

<template>
  <div
    ref="ruler"
    class="vb-ruler"
    :class="{ 'is-dragging': dragging }"
    role="slider"
    tabindex="0"
    :aria-label="`${label}刻度`"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="value"
    :aria-valuetext="`${value} ${unit}`"
    aria-orientation="horizontal"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="finishDrag"
    @pointercancel="finishDrag"
    @lostpointercapture="finishDrag"
    @keydown="onKeydown"
  >
    <span class="vb-ruler-line" />
    <i v-for="tick in ticks" :key="tick.key" :class="{ major: tick.major }" :style="{ left: tick.left }" />
    <span class="vb-ruler-indicator" />
  </div>
</template>
