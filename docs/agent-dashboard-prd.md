# Agent Board — 需求文档 v0.1

> 作者：Ian / 日期：2026-04-16

---

## 一、背景与动机

现有 LLM 可观测性工具（Langfuse、AgentOps、Phoenix 等）覆盖的是「LLM 调用链路追踪」，
核心指标是 token、latency、cost。

但本地多 agent 系统（Hermes、OpenClaw 等）真正需要的是：
- 哪些 agent 在线？当前在处理什么？
- 某个 session 从哪来、经过哪些 agent、现在在哪？
- 记忆里存了什么？有多少？最近在访问哪些？
- Cron 任务有没有跑成功？
- 工具调用失败率是多少？

这是一个「多 agent 运维面板」，不是 LLM 调试器。

---

## 二、目标用户

**主要用户：** 本地运行多个 AI agent 实例的开发者 / power user
**典型场景：**
- 自己搭了 3-5 个 Hermes/OpenClaw agent，想知道它们都活着么
- 昨晚 cron 有没有跑成功
- 某个 session 卡住了，想看看卡在哪个工具上
- 想知道记忆里存了什么、有没有乱写

---

## 三、竞品对比

| 维度 | Langfuse | AgentOps | Phoenix | Helicone | **Agent Dashboard（本项目）** |
|------|----------|----------|---------|----------|-------------------------------|
| 定位 | LLM 工程平台 | Agent 监控 SDK | AI 可观测性 | LLM 代理监控 | 多 agent 运维面板 |
| 部署方式 | 自托管 / 云 | 云为主 | 自托管 | 云为主 | 纯本地，零依赖 |
| 接入方式 | SDK 埋点 | SDK 埋点 | OTel 埋点 | 改 base_url | 读本地文件 / HTTP API，零埋点 |
| Agent 健康状态 | ❌ | ❌ | ❌ | ❌ | ✅ |
| Session 流转可视化 | 部分（trace 树） | ✅ | ✅ | ❌ | ✅（跨 agent 流转） |
| 记忆内容可视化 | ❌ | ❌ | ❌ | ❌ | ✅ |
| Cron 任务状态 | ❌ | ❌ | ❌ | ❌ | ✅ |
| 工具调用统计 | ✅ | ✅ | ✅ | ❌ | ✅ |
| Token / Cost | ✅ | ✅ | ✅ | ✅ | 次要 |
| 多框架支持 | LangChain 为主 | AutoGen/CrewAI | 通用 | 通用 | Hermes / OpenClaw / 任意 OpenAI 兼容 |
| 需要改代码 | 是 | 是 | 是 | 最少 | **否**（读现有接口） |

核心差异化：**零埋点、本地优先、记忆可视化、agent 运维视角**

---

## 四、功能范围（MVP）

### 4.1 Agent 健康看板

- 每个 agent 实例的在线状态（绿/红）
- 检测方式：轮询 /health 接口 + systemd 服务状态
- 显示：agent 名称、角色、模型、运行时长、最近活跃时间
- 支持配置：agent 列表、端口、名称

### 4.2 Session 列表与详情

- 读取 state.db（SQLite），展示所有 session
- 列表字段：session_id、来源 platform、开始时间、消息数、工具调用数、token 用量
- 详情页：完整消息流，工具调用展开显示（输入/输出）
- 搜索：按关键词全文检索（FTS5）
- 筛选：按 agent、时间范围、platform

### 4.3 记忆可视化

- 读取 memory（Hermes memory.md 格式 或 Hindsight SQLite）
- 展示记忆条目列表：内容、创建时间、来源 session
- 支持搜索、删除单条

### 4.4 Cron 任务状态

- 读取 cron jobs 配置（~/.hermes/cron/jobs.json 或 API）
- 列表：job 名称、schedule、上次运行时间、上次运行状态（成功/失败）、输出摘要

### 4.5 工具调用统计

- 按时间段统计各工具调用次数、成功率、平均耗时
- 可视化：柱状图或简单表格

---

## 五、非功能需求

- **零依赖安装**：单个 HTML 文件 或 `npx` 一条命令启动
- **本地优先**：所有数据读本地文件或 localhost API，不上传任何数据
- **多框架**：Hermes 和 OpenClaw 开箱即用，其他框架通过配置文件接入
- **轻量**：不引入数据库，不常驻后台进程（可选轮询模式）

---

## 六、兼容哪些工具？

### Hermes Agent（当前场景）

接入方式：
- state.db → session 数据
- /health、/v1/runs/{id}/events → 实时状态
- ~/.hermes/cron/ → cron 状态
- ~/.hermes/memory.md + hindsight db → 记忆内容
- systemd unit 状态 → agent 在线检测

**完全兼容，零改动。**

### OpenClaw

OpenClaw 是 Hermes 的前身 / 同源项目，目录结构类似（~/.openclaw/）。
接入方式同 Hermes，路径配置不同。
state.db 格式相同，API 接口兼容。

**兼容，需要配置路径。**

### 任意 OpenAI 兼容 agent

只要暴露了：
- GET /health
- POST /v1/chat/completions（或 /v1/runs）

就能接入健康监控 + 基础 session 追踪。

记忆可视化、cron 状态需要对应框架支持。

### LangChain / LangGraph / AutoGen / CrewAI

这些框架本身没有本地 state.db，需要额外埋点（或接入 Langfuse/AgentOps）。
本项目不优先支持，但可以通过 OpenTelemetry 接收器作为可选扩展。

---

## 七、技术方案（初步）

### 前端

- React + TailwindCSS
- 数据来源：本地后端 REST API

### 后端

- Node.js（Express）极简后端
- 职责：读 SQLite、轮询 /health、读本地文件、暴露统一 REST API
- 启动方式：npx agent-board

### 数据读取

```
~/.hermes/state.db          → sessions, messages, tool_calls
~/.hermes/cron/jobs.json    → cron 任务配置
localhost:864x/health       → agent 在线状态
localhost:864x/v1/runs      → 实时 session 追踪
~/.hermes/memory.md         → 记忆内容（短期）
hindsight db                → 记忆内容（长期）
systemd / ps               → 进程状态
```

### 部署形态

- **优先**：`npx agent-dashboard`，一条命令本地启动
- **备选**：Docker compose，方便服务器部署
- **长期**：Electron 桌面版（Mac/Windows）

---

## 八、开源策略

- 协议：MIT
- 仓库名：agent-board
- 定位关键词：local-first, zero-instrumentation, multi-agent, self-hosted
- 区别于 Langfuse/AgentOps 的核心叙事：
  「你不需要改一行代码，不需要 SDK，不需要上云。只需要你的 agent 在本地跑着。」

---

## 九、MVP 排期（草稿）

| 阶段 | 内容 | 估时 |
|------|------|------|
| v0.1 | Agent 健康看板 + Session 列表 | 1-2天 |
| v0.2 | Session 详情 + 工具调用展开 | 1天 |
| v0.3 | 记忆可视化 | 1天 |
| v0.4 | Cron 状态 + 统计图表 | 1天 |
| v1.0 | OpenClaw 适配 + 文档 + 发布 | 1-2天 |

---

## 十、待讨论

- [x] 项目名：agent-board ✅
- [x] 技术选型：Web（npx 启动）✅
- [x] 独立开源项目，Hermes/OpenClaw 作为第一批支持框架 ✅
- [x] 暂不找 OpenClaw 共建 ✅
