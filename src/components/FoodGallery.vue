<script setup>
import {ref,computed,watch} from 'vue';
import photos from '../data/foodGallerySources.json' with {type:'json'};
import {FOOD_CATEGORIES} from '../data/foodCategories.js';
const emit=defineEmits(['search']);
const query=ref(''),category=ref(''),page=ref(1);
const filtered=computed(()=>photos.filter(x=>(!category.value||x.category===category.value)&&(!query.value.trim()||(x.subject+' '+x.title).toLowerCase().includes(query.value.trim().toLowerCase()))));
const visible=computed(()=>filtered.value.slice((page.value-1)*24,page.value*24));
watch([query,category],()=>page.value=1);
</script>
<template>
 <div class="vb-food-gallery-header"><h2>食材与菜式参考图库</h2><p>{{ photos.length }} 张本地参考照片，逐图保留开放许可与作者。照片不证明某条营养样本的具体品种、份量、品牌或食堂是否有售；查营养数据时请另行核对条目。</p><div class="vb-gallery-filters"><input v-model="query" aria-label="搜索食物照片" placeholder="搜索食材、菜式或原图标题" /><select v-model="category" aria-label="照片分类"><option value="">全部分类</option><option v-for="item in FOOD_CATEGORIES" :key="item.id" :value="item.id">{{ item.name }}</option></select></div><p>找到 {{ filtered.length }} 张 · 每页最多24张，按需加载</p></div>
 <div class="vb-food-gallery-grid"><article v-for="photo in visible" :key="photo.sourceUrl" class="vb-gallery-card"><img :src="photo.image" :alt="photo.subject+'参考照片：'+photo.title" width="640" height="480" loading="lazy" decoding="async" /><h3>{{ photo.subject }}</h3><small>{{ photo.imageNote }}</small><details><summary>图片来源与授权</summary><p><a :href="photo.sourceUrl" target="_blank" rel="noopener">{{ photo.title }}</a></p><p>{{ photo.author }}</p><a :href="photo.licenseUrl" target="_blank" rel="noopener">{{ photo.license }}</a><p>{{ photo.modifications }}</p></details><button class="vb-text-button" @click="emit('search',photo.subject)">查找相关食物数据 →</button></article></div><p v-if="!filtered.length" class="vb-data-note">暂无匹配的已核对照片，尝试其他名称。</p><nav v-if="filtered.length>24" class="vb-food-pagination" aria-label="素材图库分页"><button :disabled="page===1" @click="page--">上一页</button><span>{{ page }}/{{ Math.ceil(filtered.length/24) }}</span><button :disabled="page*24>=filtered.length" @click="page++">下一页</button></nav>
</template>
