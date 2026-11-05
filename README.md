# 维衡 AI

Vue 3 + Vite 营养管理应用，配套 Node.js 服务端。食物目录、营养计算、饮食草稿和历史报告以本地存储为主；使用 DeepSeek 功能时，界面会说明实际发送的数据。

## 启动

需要 Node.js 22.17 或更新版本。

~~~powershell
cd C:\Users\z\Desktop\weiheng\vs
npm install
npm run build
npm start
~~~

打开 http://localhost:4173。桌面 `weiheng/vs` 是用户实际使用的主项目；`npm start` 会按源码内容自动检查、重建前端，不会沿用旧构建。VS Code 可按 F5 选择“维衡 AI：启动最新本地版”。日常继续使用 `http://localhost:4173/`，以读取同一浏览器地址下的本地档案和记录。开发时运行 npm run dev，Vite 默认使用 http://127.0.0.1:5173，并将 /api 请求代理到 4173。
修改服务端代码或 `.env` 后，需重启当前 Node 服务，使进程加载新路由和最新配置。

## DeepSeek 配置

在项目根目录复制 .env.example 为 .env，并设置服务端变量：

~~~dotenv
DEEPSEEK_API_KEY=替换为你的有效密钥
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_TEXT_MODEL=deepseek-flash
DEEPSEEK_VISION_MODEL=deepseek-flash
DEEPSEEK_TIMEOUT_MS=55000
PORT=4173
~~~

密钥只放在 Node 服务的环境变量中；不要使用 VITE_ 前缀，不要写入浏览器存储或提交到代码仓库。未配置、鉴权失败、额度不足、限流、超时和模型不支持时，页面会显示实际错误。

## AI 餐食规划 Agent

膳食方案页允许用户描述餐食目标，服务端通过 DeepSeek Function Calling 固定执行：

1. 在本地统一食物库检索条目。
2. 读取命中条目的精确数据与来源。
3. 由现有程序按可食部克数计算营养。
4. 使用本地个人档案目标计算本餐的目标占比。
5. AI 根据证据组织一份待确认方案。

服务端只注册检索、详情、营养计算和目标比较四个白名单工具，没有写入记录的工具。工具参数、食物 ID、克数和最终方案都会重新校验；用户目标按不可信内容处理。工作流最多四轮工具调用、最长 90 秒。DeepSeek 具名 tool_choice 不支持 thinking mode，因此 Agent 请求关闭 thinking；如模型不支持 Function Calling，界面会报错，不会伪造方案。

方案克数是估算值。用户可编辑或移除条目，确认后仅加入对应日期的本地饮食草稿；用户仍需在饮食记录页核对并保存。营养数字来自食物库和程序计算，AI 只组织解释和建议。

Agent 请求只发送用户餐食目标、必要的性别/年龄/身高/体重/活动水平以及本次检索到的公开食物数据。饮食偏好和安全提醒默认不发送；只有用户在 Agent 表单中明确勾选后才会随本次请求发送，并按不可信输入处理。不会发送照片、饮食日记、历史记录、姓名或本地存储中的其他信息。其他 AI 功能的数据发送范围见 VUE_CONTENT.md。

演示建议：进入“膳食方案”，输入“帮我搭配一份高蛋白午餐，包含蔬菜和主食”，查看 Agent 工具轨迹、证据和计算结果，调整克数后确认加入饮食草稿，再打开“饮食记录”核对。

## 主要接口

- GET /api/ai/status：返回服务配置状态、模型名和食物数据版本，不返回密钥。
- POST /api/ai/ask：基于本地目录回答食物问题。
- POST /api/ai/chat：对限定长度的多轮消息，结合当前访问者最新保存的身体档案（性别、年龄、身高、体重、活动水平）、所选日期的已保存饮食记录与程序计算结果生成解释。每日目标、基础代谢和每日能量需求沿用概览页公式，由服务端重算；档案只用于本次请求，不在用户之间复用。备注、健康标记和偏好备注不会自动发送；聊天中主动添加的照片和文件会按附件说明发送。
- POST /api/ai/recognize：将用户选定的餐食照片发送给视觉模型识别。
- POST /api/ai/analyze-day：分析本地程序计算的每日营养汇总。
- POST /api/ai/meal-plan：运行餐食规划 Agent。

## 检查

~~~powershell
npm run typecheck
npm test
npm run build
npm run food:audit
~~~

`npm run typecheck` 覆盖全部 `src/**/*.vue`、TypeScript 声明和核心 Agent/饮食类型；饮食营养计算与本地存储 JS 文件通过文件级 `@ts-check` 检查。默认 `npm test` 使用本地 mock，不需要真实密钥或网络。

需要验证真实服务时，先在一个终端启动 `npm start`，再在另一个终端执行：

~~~powershell
npm run ai:smoke
# 可选：显式提供一张本地测试图片，验证照片识别
node .\scripts\ai-smoke.mjs --image .\path\to\synthetic-meal.jpg
# 本地服务使用非默认端口时
$env:AI_SMOKE_BASE_URL='http://127.0.0.1:4174'; npm run ai:smoke
~~~

冒烟脚本只访问本机 `/api/ai/*`，使用合成档案和份量；本机 Node 服务再按 `.env` 配置调用 DeepSeek。照片只在显式传入 `--image` 后读取和发送。真实调用会使用模型额度，未配置、鉴权失败、余额不足、限流、超时或 Function Calling 不可用都会被报告为失败；未传照片会标记为跳过。脚本不读取或输出密钥。它不属于默认 `npm test`。

`npm run food:audit` 会按当前合并食物目录重建 [食物覆盖报告](docs/FOOD_DATA_COVERAGE.md)。真实模型测试方法和状态见 [AI 质量验证](docs/AI_EVALUATION.md)，可复现讲解步骤见 [演示脚本](docs/DEMO_SCRIPT.md)。更多食物来源、隐私边界和既有页面说明见 VUE_CONTENT.md。

面向线上评审的产品路径、AI 职责边界、数据审计快照和复核方式见 [线上评审说明](docs/SUBMISSION_OVERVIEW.md)；应用内也可从“作品说明”页自助进入各功能。

## 每日报告中的缺失营养估算

保存饮食后，若食物条目缺少热量、蛋白质、碳水或脂肪等比较指标，后端会在生成每日分析时自动调用 DeepSeek 估计缺失值范围，并将程序已知小计与该范围合并计算参考差值。报告会显示缺失食物数量、逐项估算范围与假设；无需手动启动估算。食物库原始值和程序已知小计保持独立，AI 估算不会写入目录或饮食记录。估算只作为非检测、非诊疗参考。旧报告首次打开时若缺少此字段且记录中确有缺项，会自动重新分析。

估算使用 JSON Output，服务端会检测截断和结构缺项并自动重试一次；前端也会验证估算条目完整后才把报告标记为完成。若界面提示服务端没有返回自动估算字段，说明浏览器连接的 Node 服务仍是旧进程：在原来启动服务的终端停止后，按原有环境配置重新运行 `npm start`，然后刷新页面再重试。不要把密钥放到前端或浏览器存储中。

## 版权及使用声明

Copyright © 2026 qilixaing.

本仓库公开用于竞赛评审和项目展示，未对作者享有权利的原创部分授予开源许可证。

除适用法律、GitHub服务条款及有效参赛条款允许的行为外，未经权利人许可，不得复制、修改、分发或商业使用上述原创部分。不得冒用作者身份，或将本项目冒充为他人原创成果参赛。

项目使用的第三方代码、依赖、食物数据、照片和字体等，分别遵循其原有许可证及署名要求；本声明不覆盖或限制第三方已经授予的权利。
