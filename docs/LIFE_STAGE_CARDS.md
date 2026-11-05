# 0–120岁主页卡片与邮箱注册

本次数据接入核对日期：2026-11-05。只在已有档案上计算，不修改用户档案或饮食记录。

- 18–78岁：保留Mifflin–St Jeor能量估算与中国DRIs 2023成人微量营养素。18岁注明不在原研究19–78岁范围内。
- 0–17岁：BMR使用FAO表5.2 Schofield年龄分组；EER使用Health Canada公布的2023年龄分组方程，含生长能量。1–3岁和4–17岁的供能比例为AMDR范围内的示例，不是处方。
- 0岁：可在年龄步骤补填0–11月龄。缺月龄时，能量取这12个月龄的公式最小和最大值；营养参考分阶段展示。婴儿宏量营养素直接用AI/RDA表值，不从成人比例计算。
- 79–120岁：基础代谢用Schofield的60岁及以上组，配常用活动系数作粗略外推。标注未在百岁人群验证，不能据此作个体化喂养或医疗决策。
- 儿童18项微量营养素从Health Canada公开表中的RDA/AI列提取，分别保留来源；不是《中国居民膳食营养素参考摄入量（2023版）》的儿童数据。成人原数据不改标签。
- 儿童与79岁以上的显示估算不传成自动配餐或AI个体营养目标；缺失必要资料仍为未知。微量营养素只需匹配年龄和性别，可以独立显示。

公开来源：

1. https://www.fao.org/4/y5686e/y5686e07.htm （表5.2，Schofield系数与样本数）
2. https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/equations-estimate-energy-requirement.html
3. https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-vitamins.html
4. https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-elements.html
5. https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-macronutrients.html

邮箱：新注册需六位验证码，十分钟有效，一分钟重发间隔，限流并限制错误尝试；已有账号和评委测试账号可继续登录。服务端SMTP采用QQ邮箱465端口SSL，配置仅保存在环境文件，发行包不含授权码。主页与登录弹窗标题改为“登录”。
