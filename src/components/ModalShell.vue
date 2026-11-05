<script setup>
import { ref,onMounted,onBeforeUnmount,nextTick } from 'vue';
import AppIcon from './AppIcon.vue';
defineProps({title:String,wide:Boolean});const emit=defineEmits(['close']);const panel=ref(null);const previous=document.activeElement;
onMounted(()=>nextTick(()=>panel.value?.focus()));
onBeforeUnmount(()=>queueMicrotask(()=>previous?.isConnected&&previous?.focus({preventScroll:true})));
function keys(event){if(event.key==='Escape'){event.preventDefault();emit('close');}if(event.key!=='Tab')return;const nodes=[...panel.value.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,select,a[href],[tabindex="0"]')].filter(el=>el.getClientRects().length);if(!nodes.length){event.preventDefault();return;}const first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&(document.activeElement===first||document.activeElement===panel.value)){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
</script>
<template><div class="vb-feature-overlay" @click.self="$emit('close')"><section ref="panel" class="vb-feature-dialog" :class="{'is-wide':wide}" role="dialog" aria-modal="true" :aria-label="title" tabindex="-1" @keydown="keys"><header><h2>{{ title }}</h2><button type="button" class="vb-icon-button" :aria-label="'关闭'+title" @click="$emit('close')"><AppIcon name="close" /></button></header><div class="vb-feature-dialog-body"><slot /></div></section></div></template>
