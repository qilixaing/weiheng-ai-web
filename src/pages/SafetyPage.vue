<script setup>
import AppIcon from '../components/AppIcon.vue';
import SourcesNote from '../components/SourcesNote.vue';
import { accountUser } from '../lib/storageScope.js';
defineProps({ flags:Array, embedded:Boolean });
const storageNote = accountUser.value
  ? '登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话也按账号同步；照片附件文件和分析报告仍保存在原浏览器。游客模式下，数据只保存在当前浏览器。'
  : '游客模式下，档案、饮食记录、照片与报告保存在当前浏览器。邮箱登录后，档案、饮食记录、草稿与膳食方案会按账号保存到当前网站服务端；文字对话按账号同步；附件文件和分析报告留在原浏览器。';
const notes=[['leaf','先从食物搭配开始','营养参考值用于规划日常饮食。单日没有记录某类食物，不能推断长期摄入不足。'],['shield','补充剂需单独核对','膳食 RNI / AI 不等于补充剂剂量；多种产品可能含有重复成分。用药或特殊健康情况，请咨询医生或药师。'],['activity','估算不是身体检测','BMR 与 TDEE 由公式估算，会受活动、体成分与个体差异影响。主页按0—120岁年龄阶段展示公式估算或参考范围；婴幼儿需要月龄，高龄值为分组外推。儿童参考值不作为成人减重或自动配餐目标。它们不能替代个体化营养评估。'],['lock','账号保存与隐私','档案、记录、草稿与膳食方案仅同步至当前登录账号；不包含聊天、照片附件或分析报告。AI 功能只会在你主动使用时发送对应任务所需的信息。'+storageNote+' 新账号注册需邮箱验证码；既有账号仍可登录，暂未提供密码找回。清理站点数据或换设备时，未同步的游客数据及浏览器内聊天、附件、报告可能无法恢复。']];
</script>
<template><div v-if="!embedded" class="vb-page-title"><div><p class="vb-eyebrow">了解边界，安心使用</p><h1>安全中心</h1><p>把营养信息作为参考，把自己的实际情况放在前面。</p></div><span class="vb-local-chip"><AppIcon name="lock" :size="15" />本地隐私模式</span></div><section v-if="flags.length" class="vb-glass vb-safety-highlight"><AppIcon name="shield" :size="25" /><div><h2>请让专业人员核对个体需求</h2><p>你已标记：{{ flags.join('、') }}。当前通用目标不覆盖这些特殊情况。</p></div></section><div class="vb-safety-grid"><article v-for="[icon,title,detail] in notes" :key="title" class="vb-glass"><span class="vb-icon-badge"><AppIcon :name="icon" :size="23" /></span><h2>{{ title }}</h2><p>{{ detail }}</p></article></div><SourcesNote /></template>
