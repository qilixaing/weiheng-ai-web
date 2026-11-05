# 维衡 AI：食物库、照片识别与每日分析

现有 Vue 3 `<script setup>` + Vite 内容层，原生 CSS，没有新增 UI 依赖。原来的 `ambient-background.js`、`app.js`、`index.html`、`styles.css` 不参与本次修改；Canvas 初始化、绘制和鼠标涟漪完全保留。

## 启动

要求 Node.js 22.17 或以上。项目已安装依赖时直接使用：

```powershell
cd C:\Users\z\Documents\Codex\2026-10-29\ai-ai\work\vue-content
npm run build
npm start
# 浏览 http://localhost:4173
```

开发时保留后端运行，另开终端：

```powershell
npm run dev
# http://127.0.0.1:5173，/api 代理到 4173
```

若后端使用其他端口，运行 Vite 前设置 `$env:VITABALANCE_API_TARGET='http://127.0.0.1:4180'`。不要直接双击 HTML，也不要用不支持 `/api` 的普通静态服务器测试 AI。

## DeepSeek 服务端配置

仅在尚无 `.env` 时复制 `.env.example`，已有文件请保留并编辑所需字段。不要覆盖真实配置。设置后重启 `npm start`：

```dotenv
DEEPSEEK_API_KEY=你的有效密钥
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_TEXT_MODEL=deepseek-flash
DEEPSEEK_VISION_MODEL=deepseek-flash
DEEPSEEK_TIMEOUT_MS=55000
PORT=4173
```

密钥仅由 Node 服务读取，不使用 `VITE_` 前缀，不进入浏览器存储、源码构建或日志。不要把 `.env` 提交到仓库。接口为 `/api/ai/status`、`/api/ai/ask`、`/api/ai/recognize`、`/api/ai/analyze-day`。status 只返回配置状态和模型名称。官方图像调用使用用户消息中的 `image_url` 数据 URL；模型可通过环境变量更换。接口处理未配置、鉴权失败、额度不足、限流、超时、异常格式；失败不会伪装成识别或分析成功。

此应用用于本机访问；直接公开到互联网前，需要部署方增加访问鉴权与使用额度管理。原有账号与旧接口保留，但本次 Vue 内容层的数据不会自动同步到账号服务器。

官方参考：[DeepSeek 图片输入](https://api-docs.deepseek.com/guides/vision/)、[Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)、[错误码](https://api-docs.deepseek.com/quick_start/error_codes/)。

## AI 餐食规划 Agent

服务端新增 POST /api/ai/meal-plan。固定工作流为“检索本地食物 → 读取命中条目 → 程序计算餐食营养 → 与每日目标比较 → AI 组织待确认方案”。工具依次为 search_foods、get_food_detail、calculate_nutrition、compare_with_targets；没有保存或编辑记录的工具。

Function Calling 使用具名 tool_choice，并关闭 thinking mode。DeepSeek 官方文档说明具名工具选择在 thinking mode 下不支持。若配置模型不支持工具调用，接口会如实返回错误，不会回退伪造方案。服务端验证工具名、JSON 参数、食物 ID、克数和最终方案；最多执行四个工具轮次，单次工作流最长 90 秒。

在膳食方案页输入目标并生成方案，可查看实际调用轨迹、食物来源、缺失指标和程序计算的营养值。克数为估算值，可编辑或删除。点击“确认并加入饮食草稿”后只写入所选日期的本地草稿，仍需到饮食记录页核对并保存。

官方接口参考：[Chat Completions / Tool Choice](https://api-docs.deepseek.com/api/create-chat-completion/)、[Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)。

## 食物数据与计算

- 浏览结构参照 HowToEat 的 20 类；本项目提供 189 个统一目录条目，其中 146 个带 USDA SR28 固定版本的成分样本。不是参考站全量数据库。
- `src/data/catalogue.js` 是搜索、浏览、照片匹配和记录共用的唯一目录。原条目 key 保留，明确样本才关联营养数据；不能用相近品种填补精确数值。
- `src/data/food-reference.json` 是从 USDA 官方公有领域 SR28（2016-05）逐字段读取的子集。来源 ID 为 NDB ID，非 FDC ID。生熟、强化、配方、品种在名称和状态中展示。可复现导入及原始数据见 `docs/food-data/README.md`。
- 用户输入重量和每 100 克基准均为**可食部**。本份营养 = 数据库数值 × 克数 / 100，不重复乘食部比例。空值为 `null`，显示“暂无数据”，合计只显示已知小计并提示缺失项，真实 0 保留。
- 热量直接使用数据库能量字段。碳水是差减法且包括纤维，维 A 为 μg RAE、叶酸为 μg DFE，维 E 为 α-生育酚，不能直接当作中国目标的 α-TE。
- 分类总览保留分类照片；食物列表、搜索和详情改为 `src/data/foodPhotoSources.json` 中按具体食物匹配的 Commons 开放许可照片。图片本地化保存在 `assets/food-photos/`，逐图记录作者、原页和许可；只共用同食材的参考图，不使用全类别图代替具体食物。没有匹配照片时显示中性占位，图片加载失败也自动降级。图片仅作食材外观参考，生熟/配方以条目文字为准。详见 `docs/FOOD_IMAGES.md`。
- 没有准确对应的原泛称仍可记录克数，营养值保持缺失。历史记录未明确确认数据库样本时不参与营养小计，确认后才计算，避免悄悄将干粮当熟食。

## 页面与数据联动

食物 RAG 检索按精确名称、精确别名、ID、名称包含、别名包含、分类、近似拼写排序；回答会显示本次命中食物、来源和缺失指标。

`FoodBrowserPage.vue`：分类、子分类、分页、营养排序、名称/别名/模糊搜索、建议词、两食物对比和数据支撑的 AI 问答。

`FoodDetailModal.vue`：按克数实时换算完整指标，选择日期和餐次后加入对应草稿。`DiaryPage.vue` 编辑同一批条目，汇总后保存。旧类别统计、营养评估和膳食方案继续工作。

`PhotoRecognitionPanel.vue`：入口先披露上传用途；图片压缩并存入 IndexedDB 后自动开始真实识别。修改名称会解除旧匹配，需重新选择准确样本；未匹配条目保持未知。用户可修改估重、删除、补充、重试、预览、更换和移除照片。确认批次 ID 防止重复添加。相机不支持时仍可本地选图。

`useLocalNutrition.js`：保存先尝试 localStorage 写入，成功才更新已保存记录；草稿按日期独立保留。记录保存完成后才启动 `useAiReports.ts` 的请求，AI 失败不回滚记录。

`AiReportModal.vue` / `ReportsPage.vue`：进度、错误、重试、快照、程序汇总、AI 解释及版本。报告关联日期、记录版本、档案版本、生成时间与模型，重新分析产生新历史版本。修改记录/档案后旧报告提示需更新。关闭窗口不取消生成；刷新后完成报告恢复，未完成请求标为中断并可重试。

## 本地存储及联网边界

- 餐食规划 Agent 会发送自然语言目标、必要的基础档案和本次检索到的公开食物数据；不发送照片、饮食备注、历史记录、姓名或其他本地存储内容。
- `localStorage['weiheng.local.v2']`：档案、已保存记录、按日期草稿、识别候选条目、行动勾选、偏好。旧 `vitabalance.*` 键只读迁移，不删除。
- `localStorage['weiheng.theme.v1']`：主题。
- IndexedDB `weiheng.media.v1` 的 `photos` / `reports`：压缩照片和报告。事务完成后才视为保存成功。
- 选图识别时发送压缩照片；问答发送问题及相关公开数据库条目；每日分析发送确认的食物、可食部克数、餐次及性别/年龄/身高/体重/活动水平。每日分析不发送照片、备注、健康标记或姓名。
- 后端只在内存中短暂保留请求去重结果（5 分钟），不把新照片和报告写入服务器磁盘。DeepSeek 自身的数据处理按其服务规则；本地保存不等于 AI 请求离线。
- 清理浏览器站点数据会丢失本机照片和报告，换端口/域名是独立存储空间。未实现多设备同步。

## 验证

Agent 新增严格 TypeScript 契约：请求/响应、工具参数/结果、工具调用轨迹和待确认方案均定义于 src/types/agent.ts；新增的 useMealAgent.ts 和 MealPlanningAgent.vue 已纳入 typecheck。

```powershell
npm run typecheck
npm test
npm run build
```

`useAiReports.ts` 与 `NutrientSummary.vue` 使用 TypeScript，`src/types/nutrition.ts` 定义食物条目、个人档案、营养汇总和 AI 报告的数据契约；同目录 `.d.ts` 为仍保留 JavaScript 的运行时模块提供类型边界。`npm run typecheck` 使用严格模式检查这部分核心业务类型。其余页面和既有逻辑继续使用 JavaScript，后续可按模块逐步迁移。

测试覆盖原营养公式、20 类数据/别名/缺失值、可食部换算、历史兼容、不重复合计、版本、服务端重算、模型配置、图片消息格式、请求去重以及未配置/鉴权/额度/超时/限流错误。协议测试使用明确模拟的上游，不等于真实 DeepSeek 成功；真实服务需有效密钥、可用余额及网络。


## 每日报告缺失营养估算

食物缺少比较所需的宏量营养指标时，保存当天记录会自动向 DeepSeek 请求缺失项估算范围，并以程序已知小计加 AI 范围计算比较值。报告显示“有 N 项食物缺少部分营养数据”、逐项估算假设和 AI 参考差值范围；无需再手动点击估算。已知数据库值与 AI 推估值分区展示，估算不会覆盖食物库或保存记录。若档案没有对应目标，仍展示估算摄入范围并说明无法计算目标差值。旧报告首次打开且有缺项时自动触发更新；AI 失败不影响已保存记录。

估算请求只包含缺失食物名称、可食部克数、已知营养指标和缺失字段，不发送照片、备注或身份信息。AI 返回值由服务端按缺失字段、重复 ID、非负范围和食物克数上限校验，异常响应会使报告显示失败状态并允许重新分析，不会伪装成成功。

DeepSeek JSON 输出被截断或结构校验失败时，服务端会提高输出预算并自动重试一次；前端验证每个缺失食物及其所需指标都有估算范围后才标记完成。若前端提示当前服务端未返回估算字段，表示连接的 Node 进程仍是旧版本，需在原启动终端重启服务后刷新页面。
