# 维衡 AI：USDA SR28 食物营养参考子集

此目录提供 **146 条**经显式选取及中文翻译的 USDA 食物参考记录，覆盖 20 个浏览分类。所有营养值逐字段读取官方数据；未用 AI、人工记忆或其他食物条目补齐缺失值。分类和中文别名由本项目整理，不属于 USDA 官方分类。

## 官方来源与许可

- 官方历史数据下载页：<https://fdc.nal.usda.gov/download-datasets/>
- 实际下载文件：<https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abbr.zip>
- USDA 当前历史归档文件：<https://fdc.nal.usda.gov/fdc-datasets/SR-Legacy-Archive/sr28abbr.zip>
- 官方文档：<https://www.ars.usda.gov/ARSUserFiles/80400535/Data/SR/sr28/sr28_doc.pdf>
- 许可说明：<https://fdc.nal.usda.gov/api-guide/#licensing> 以及 <https://fdc.nal.usda.gov/>。USDA 食物数据为公有领域，按 CC0 1.0 发布；USDA 请求使用者标注来源。
- 下载日期：2026-10-30。数据库版本：SR28，2015 年发布、2016 年 5 月略作修订。

建议引用：U.S. Department of Agriculture, Agricultural Research Service, Nutrient Data Laboratory. USDA National Nutrient Database for Standard Reference, Release 28 (Slightly revised). Version current: May 2016.

`source.id` 是保持前导零的原始 5 位 NDB ID，**不是 FoodData Central 新 FDC ID**。`source.description` 原样保留 USDA ABBREV.txt 的英文短描述。`source.url` 指向官方历史下载列表；`source.version` 记录固定数据版本。

## 重量和缺失数据规则

所有营养值以 **每 100 克可食部** 为口径。用户输入的食用克数也须是可食部重量；份量营养值 = 原值 × 可食部克数 ÷ 100。**不再乘食部比例**。不使用原始数据中的 Refuse_Pct 修正营养值。

USDA 空字段（`^^` 或 `^~~^`）转为 JSON `null`，不得当作 0。原始数字 0 保留为数字 0。当前子集有 43 个缺失字段。显示时应使用“暂无数据”；汇总时记录覆盖范围，不能因为部分食物未知而将结果说成完整营养总量。

`grams: 100` 只是查询界面默认的可食部计量，不表示推荐份量。生、熟、带皮、去皮、加盐、强化状态均在 `name` / `state` 中明确保留。绝不能把干米或干燕麦的数据用于等重熟米饭或燕麦粥。

## 指标单位

| 字段 | 单位 / 口径 |
| --- | --- |
| energy | kcal |
| protein, carbs, fat, fiber, water | g |
| calcium, iron, magnesium, phosphorus, potassium, sodium, zinc, copper, manganese | mg |
| selenium | μg |
| vitaminA | μg RAE（视黄醇活性当量） |
| vitaminC, vitaminE, b1, b2, b6 | mg |
| vitaminD, vitaminK, b12 | μg |
| folate | μg DFE（膳食叶酸当量） |
| cholesterol | mg |

`vitaminE` 为 α-生育酚，`vitaminK` 为叶绿醌，`vitaminD` 为总维生素 D（μg，而不是 IU）。`carbs` 是 USDA 的差减法碳水化合物，**包括膳食纤维**；不要另外把 fiber 加到 carbs 中。`energy` 直接使用 USDA 能量字段，不用三大宏量营养素乘 4/4/9 重新编造数据库热量。RAE、RE、DFE、食物叶酸不是可无条件互换的单位；与个人目标比较前，应确认参考目标采用相同定义。

## 再生与审计

目录包含下载后的 `sr28abbr.zip`、解压原始数据 `raw/ABBREV.txt`、官方文档 `raw/sr28_doc.pdf`。再生不依赖 npm 包或联网 API key：

```powershell
node .\import-sr28.mjs
# 或指定数据输入和输出
node .\import-sr28.mjs .\raw\ABBREV.txt .\food-reference.json
```

`selection.mjs` 是显式选取清单，固定 NDB ID、翻译名称、别名、分类、加工状态、旧项目 key。`import-sr28.mjs` 按官方 Table 16 的零起始字段位置映射，检查 53 列、ID 存在、数值有效、key 唯一。它输出 `food-reference.json` 和 `import-summary.json`（分类数量、原文件 SHA256、缺失字段数量、复用 key）。

ABBREV.txt SHA256：`289acf4a3f1e019f318e46c5558944a77add116e985b9f31fe17637542c40777`。

## 与现有目录合并

复用了 24 个有明确对应含义的原 key：rice、brown-rice、oats、corn、whole-wheat-bread、potato、sweet-potato、spinach、lotus-root、broccoli、tomato、cucumber、carrot、banana、apple、orange、pear、grapes、watermelon、kiwi、blueberry、mango、pomelo。

这些条目仍应显示完整来源名称及生熟状态。`potato` 为生且带皮的马铃薯，`sweet-potato` 为生红薯；另有独立熟食变体。`rice` 为长粒、未强化、无盐白米饭，`oats` 为无盐清水煮燕麦粥。旧记录若没有确认来源和生熟状态，应保留“数据不足”状态，不应将旧的模糊记录默认为用户已经确认该样本。

原项目的 `cabbage` 名称为“白菜”，现明确绑定 NDB 11119 的结球大白菜（pe-tsai，生）；另新增大白菜水煮无盐（11120）、小白菜生（pak-choi，11116）及水煮无盐（11117）。USDA 通用 CABBAGE（11109）是卷心菜，保留独立条目，不能拿来代替大白菜。哈密瓜、火龙果、桃子、面条、面包、牛奶、酸奶、奶酪、猪肉、牛肉、鸡肉、鸡蛋、豆腐、虾、巧克力、薯片、爆米花、冰淇淋等泛称或未明确生熟、配方的旧条目不强行对应特定 USDA 样本；明确变体使用独立 `usda-xxxxx` key。父项目可以保留泛称条目用于记录，营养字段设 null，同时提供明确变体给用户选择。

## 使用限制

这是美国样本的历史食物成分参考，不是中国本地所有品种、品牌、食谱的检测结果。食物实际营养会随产地、品种、配方、做法改变。146 条是覆盖 20 类的基础浏览子集，并不声称包含参考网站的全部食物。没有精确对应的食物保持缺失，不能用相似食物替代后仍展示为精确值。

照片识别只能给名称与估计克数；应先匹配、由用户确认数据库的具体变体，然后按确认的可食部克数计算。数据库本身也可能包含 USDA 依据研究、计算或推导得到的营养数据；本子集保留官方发布数值，不将每个值宣称为逐项实测。婴幼儿分类仅用于查询，不表示给成人或婴幼儿的膳食建议。酒类条目仅为数据库展示，不能因为营养值存在而推荐饮酒。

