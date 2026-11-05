<script setup>
import { FORMULA_SOURCE, DRI_SOURCE } from '../lib/nutrition.js';
import { LIFE_STAGE_SOURCE, SCHOFIELD_SOURCE } from '../lib/lifeStageNutrition.js';
</script>
<template>
  <details class="vb-sources"><summary>计算依据与适用范围<span>查看来源与说明</span></summary><div>
    <p>18–78岁采用 <a :href="FORMULA_SOURCE" target="_blank" rel="noopener noreferrer">Mifflin–St Jeor 公式</a>：10 × 体重(kg) + 6.25 × 身高(cm) − 5 × 年龄 + 性别常数（男性 +5，女性 −161）。该公式预测静息能量消耗，页面沿用“BMR”通用称呼；原研究对象为 19–78 岁成人，18岁标注范围外估算。</p>
    <p>未满18岁及79–120岁的基础代谢卡片使用<a :href="SCHOFIELD_SOURCE" target="_blank" rel="noopener noreferrer">FAO表5.2的Schofield年龄分组公式</a>。79岁以上沿用60岁及以上组，属于粗略外推，不能宣称已在百岁人群验证。</p>
    <p>未满18岁的每日能量使用<a :href="LIFE_STAGE_SOURCE" target="_blank" rel="noopener noreferrer">Health Canada公布的2023年EER分组公式</a>，包含生长能量；活动分组为用户选项的近似对应。0岁未填月龄时保持未知，补充0–11个月月龄后再匹配，不选取虚构的默认月龄；这不是配奶或婴幼儿喂养处方。</p>
    <p>TDEE = 未四舍五入的 BMR × 活动系数。系数为常用活动估算模型：久坐 1.2、轻度 1.375、中度 1.55、重度 1.725，不能与 DRIs 能量表中的 PAL 等同。</p>
    <p>宏量营养素采用成年 AMDR 范围内的示例方案：18–64 岁 15% / 25% / 60%，65 岁及以上 20% / 25% / 55%（蛋白质 / 脂肪 / 碳水）。按 4 / 9 / 4 kcal/g 换算；它不是 DRIs 蛋白质固定 RNI，也不代表唯一最佳比例。</p>
    <p>微量营养素核对自<a :href="DRI_SOURCE" target="_blank" rel="noopener noreferrer">中国营养学会 DRIs 2023 成人表</a>（表 9–14、20–23）。RNI 为推荐摄入量，AI 为适宜摄入量；均指膳食参考量，不能直接作为补充剂剂量。未列出的营养素不代表不重要。</p>
    <p>未满18岁的微量营养素另取Health Canada公开的RDA/AI年龄表，来源与中国成人DRIs分开标注。1–3岁采用15/35/50、4–17岁采用15/30/55的AMDR内供能示例。婴儿蛋白质、脂肪、碳水直接显示年龄段AI/RDA表值，不拼成成人100%供能方案；表中的ND不转为0。</p>
    <p>所有值用于一般健康人群的饮食认识，不覆盖孕哺期、疾病治疗、早产儿及竞技训练等特殊需求。儿童和高龄参考卡片不作为自动配餐或AI个体营养诊断目标；微量营养素不按体重线性缩放。</p>
    <p>食物营养数据与人群参考量是两类来源。现有USDA条目保留原始编号，未声称来自《中国食物成分表》。参考书目、已接入范围及待补资料可在“关于”查看。EAR、RNI、AI不代表诊断阈值，UL不能作为推荐目标。</p>
  </div></details>
</template>
