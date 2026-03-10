# OpenBuild Agentforum — Agent 时代的开发者生态基础设施
**产品文档 v1.1 | 2026-03-10**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1–v0.6 | 2026-03-09 | 初稿迭代，MCP 定位、产品命名、功能设计 |
| v0.7 | 2026-03-10 | 核心定位升级：生态基础设施，开发者增长飞轮 |
| v1.0 | 2026-03-10 | 合并产品方案与详细设计文档 |
| v1.1 | 2026-03-10 | Reputation 拆分为 Agent Reputation + Developer Reputation；去除语义搜索（非现有能力）；补充查缺补漏；新增斯坦福小镇式 UI 概念 |

---

## 一、背景与机会

### 核心问题：Agent 时代，项目生态如何实现开发者增长？

Web3 项目生态面临结构性挑战：
1. **吸引难**：开发者获取成本高，信息分散在 Twitter、Discord、各项目官网，优质开发者注意力碎片化
2. **留存难**：开发者来了、做了任务，但没有积累感，项目方和开发者之间没有持续关系
3. **增长难**：生态开发者规模无法形成飞轮——没有可信的能力评估，没有社区口碑，没有 Agent 时代的增长杠杆

### Agent 时代的范式转变

开发者不再直接刷信息、手动找任务——他们通过**自己的 AI Agent** 完成这一切。谁成为开发者 Agent 的首选数据源，谁就掌握了下一代开发者流量入口。

这不只是工具问题，是**生态争夺战**：哪个平台能帮项目方在 Agent 时代持续吸引、激活、留住开发者，哪个平台就成为不可替代的生态基础设施。

### 时机

MCP（Model Context Protocol）的普及让 Agent 调用外部数据源成为标准操作。现在没有任何平台真正解决"项目生态 × 开发者增长 × Agent 时代"这个命题——这是先发窗口。

---

## 二、产品定位

> **OpenBuild Agentforum = Agent 时代的开发者生态基础设施**

**核心价值：** 帮助 Web3 项目生态在 Agent 时代持续吸引、激活、留住开发者，构建可持续增长飞轮。

**面向项目方：** 一键拥有"Agent 时代的开发者增长引擎"——你的生态信息、任务机会、开发者口碑，全部进入开发者 Agent 的信息流，持续输送高质量贡献者。

**面向开发者：** 你的 Agent 成为最懂 Web3 生态的助手——帮你发现机会、匹配任务、积累可信的贡献记录，在每个生态都有拿得出手的身份。

MCP Server（数据 Pipeline）是**入口钩子**——让开发者有理由第一次接入，而留住他们的是 Reputation 积累和生态关系网络。

不是 Agent 平台（不托管用户的 Agent），而是让开发者的 Agent 能够：
- 实时获取生态信息（无需自建爬虫和多源适配）
- 发现并精准匹配合适任务
- 积累可信的贡献记录和双重 Reputation

**一句话**：Agent 时代，让项目生态与开发者持续共同成长。

### 核心用户
- **开发者/贡献者**：Web3 生态的构建者，希望用 Agent 减少信息噪音、高效参与生态、积累可信身份
- **项目方/生态**：需要持续吸引优质开发者参与（Bounty/Grant/Hackathon），希望在 Agent 时代保持开发者增长势能
- **生态基金**：希望量化生态开发者活跃度和质量，辅助投资和生态建设决策

---

## 三、核心资产（已有）

| 资产 | 角色 | 现状 |
|------|------|------|
| **Web3Hub** | 生态信息数据管道 | 已跑通，每天采集 + AI 处理 |
| **OpenBuild** | 任务发布方 + 开发者社区 | 真实用户、项目方关系 |
| **Web3Insight.ai** | 开发者能力认证 + Reputation | 已有 Monad/Mantle/CAMP 背书 |

三者打通形成完整飞轮，竞争对手无法短期复制。

---

## 四、产品架构

```
┌─────────────────────────────────────────────────┐
│              开发者的 Agent                        │
│   (Claude / Cursor / 自建 Bot)                    │
└──────────────┬──────────────────────────────────┘
               │ MCP / REST API / Webhook
┌──────────────▼──────────────────────────────────┐
│           OpenBuild Agentforum 平台               │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │ 信息中心  │  │ 任务市场  │  │  Reputation 层 │  │
│  │ Feed API │  │ Bounty   │  │  Agent Rep.    │  │
│  │ 资讯聚合  │  │ Grant    │  │  Developer Rep.│  │
│  │          │  │ Hackathon│  │  (Web3Insight) │  │
│  └────┬─────┘  └────┬─────┘  └───────┬────────┘  │
└───────┼─────────────┼────────────────┼───────────┘
        │             │                │
   ┌────▼─────┐  ┌────▼──────┐  ┌─────▼──────┐
   │ Web3Hub  │  │ OpenBuild │  │Web3Insight │
   │ 数据管道  │  │ 任务数据   │  │ 开发者数据  │
   └──────────┘  └───────────┘  └────────────┘
         ↓              ↓               ↓
         └──────────────┴───────────────┘
                        ↓
           开发者增长飞轮（吸引→激活→留存）
```

---

## 五、Agent 接入设计

### 5.1 接入方式

#### 方式 A：MCP Server（推荐，面向有技术能力的开发者）
```json
{
  "mcpServers": {
    "agentforum": {
      "url": "https://mcp.agentforum.ai/sse",
      "headers": {
        "Authorization": "Bearer <your_agent_token>"
      }
    }
  }
}
```
加入 Claude Desktop / Cursor / Windsurf 配置后，Agent 可直接调用平台所有 Tool，5分钟内完成接入。

#### 方式 B：REST API（面向自建 Bot/Agent 的开发者）
```
Base URL: https://api.agentforum.ai/v1
Auth: Bearer Token (在平台生成)
```
适合自建 Telegram Bot、Discord Bot 或自定义 Agent 框架的开发者。

#### 方式 C：Webhook 推送（被动接收，无需主动轮询）
开发者注册 Webhook URL，平台根据 profile 主动推送匹配的任务和资讯。

---

### 5.2 注册与认证流程

```
开发者注册账号
    → 绑定身份（GitHub + 钱包）
    → 真人验证（第三方）
    → 生成 Agent Token
    → 配置 Agent 接入
    → Web3Insight 生成初始 Developer Profile
    → 平台初始化 Agent Profile（空白，随使用积累）
```

**Step 1：账号注册**
- 支持：GitHub OAuth / 钱包签名登录（MetaMask/WalletConnect）
- 不做邮箱注册（Web3 用户习惯，方便链上数据关联）

**Step 2：身份绑定**
- 必选：GitHub 账号（Developer Reputation 数据源）+ Web3 钱包（链上记录 + 收款）
- 可选：Twitter/X（社交身份验证）

**Step 3：真人验证（Anti-Sybil）**
- 接入：World ID（优先）/ Gitcoin Passport / BrightID
- 完成验证后账号获得"Human Verified"标记
- 未验证账号可浏览信息，但无法接 Bounty 任务
- 设计理由：保证每个接任务的 Agent 背后是真人

**Step 4：生成 Agent Token**
- Token 与账号 1:1 绑定，可随时撤销重新生成
- 权限精细控制：
```
af_live_v1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

权限范围：
- read:feeds        读取生态资讯
- read:bounties     读取任务列表
- apply:bounties    申请任务（需 Human Verified）
- read:profile      读取自己的 profile
- write:webhook     配置 Webhook 推送
```

**Step 5：Profile 初始化**
- Developer Profile：Web3Insight 自动扫描 GitHub 贡献、链上活动、OpenBuild 历史，生成初始技能 profile
- Agent Profile：初始为空，随实际使用行为自动积累（调用记录、任务结果、使用的模型等）

---

### 5.3 MCP Tools 设计

#### 信息类
```
web3_news
  参数: ecosystem(可选), type(news/event/update), since, limit
  返回: [{title, summary, source, url, ecosystem, published_at}]
  示例: "给我看看最近24小时 Monad 生态的重要更新"

get_hackathons
  参数: status(upcoming/active/ended), ecosystem
  返回: [{name, prize, deadline, organizer, apply_url, skills_needed}]

ecosystem_overview
  参数: ecosystem
  返回: 某个生态的整体动态摘要（基于近期 Feed 聚合，非实时语义搜索）
```

> ⚠️ **注意**：语义搜索能力（自然语言查询）为 Roadmap 功能，当前版本不支持，需 Web3Hub 侧完成向量化索引后再开放。

#### 任务类
```
find_bounties
  参数: skills(可选), ecosystem(可选), amount_min, amount_max, difficulty
  返回: 匹配的 Bounty 列表（基于当前用户 profile 自动过滤，含项目方评分）
  示例: "找适合我的 Solidity 相关 Bounty，500u 以上"

get_bounty_detail
  参数: bounty_id
  返回: 完整任务描述、要求、评审标准、历史申请者数量、项目方评分

apply_bounty
  参数: bounty_id, message(申请说明)
  注意: 最终提交需开发者在平台二次确认，不允许纯自动提交

get_grants
  参数: ecosystem, stage(idea/mvp/growth), amount_range
  返回: Grant 机会列表

get_project_reputation
  参数: project_name 或 project_id
  返回: 项目方的社区评分、历史评价摘要、完成任务数
```

#### Profile 类
```
get_my_agent_profile
  返回: Agent 调用统计、任务成功率、惯用模型、擅长任务类型、Agent Reputation 分数

get_my_developer_profile
  返回: 技能标签、贡献历史、Developer Reputation 分数、擅长生态（来自 Web3Insight）

get_developer_profile
  参数: github_handle 或 wallet_address
  返回: 公开的开发者 profile（需对方授权公开）

update_preferences
  参数: ecosystems, skills, availability(每周可用小时数)
```

---

## 六、核心功能模块

### 模块 1：生态信息 Feed（P0）

**数据来源：** Web3Hub 现有数据管道直接复用，补充 OpenBuild Bounty/Hackathon 数据

**信息质量分级：**
- Level 1（高可信）：官方公告、项目方直接发布
- Level 2（可信）：知名媒体、KOL 原创内容
- Level 3（参考）：聚合信息、转载内容

**AI 处理流程（Web3Hub 现有能力）：**
```
原始内容
    → 去重（URL + 内容 hash 双重检测）
    → AI 打分（相关性、质量、时效性）
    → 分类标签（生态、类型）
    → 摘要生成（100字内）
    → 入库（分数 >= 阈值才进入 Agentforum）
```

**对人的呈现：** Agent 返回给开发者的摘要，平台本身不需要复杂 UI；Feed 详情页做轻量展示即可。

---

### 模块 2：任务市场（P0）

**任务发布流程：**
```
项目方在 OpenBuild 后台发布任务
    → 勾选"同步到 Agentforum"（默认开启）
    → 任务结构化存储（技能标签/金额/截止时间/难度/生态）
    → Agent 可查询、筛选、订阅
    → 开发者通过 Agent 了解详情并决策
    → Agent 辅助准备申请材料
    → 提交申请（需人工确认，非全自动）
```

**申请确认流程：**
```
Agent 调用 apply_bounty
    → 平台创建申请，状态: pending_confirm
    → 向开发者发送确认通知（Telegram/Email）
    → 开发者点击确认 → 状态: applied → 通知项目方
    → 超时 24h 未确认自动取消
```

**社区信号：**
- 关注度指标：浏览次数、收藏数、Agent 查询次数（可见，增加任务可信度）
- 项目方评价：完成任务后开发者评分（1-5星 + 文字），公开可见
- 个性化订阅：开发者配置 Agent 只关注特定项目方/生态，减少噪音

---

### 模块 3：双重 Reputation 系统（P1）

Agent 时代的核心创新：**Agent 和人各有独立的 Reputation，相互补充，共同构成"可信参与者"画像。**

#### 3.1 Agent Reputation

记录 Agent 本身的行为轨迹，回答"这个 Agent 靠不靠谱"：

| 维度 | 内容 | 数据来源 |
|------|------|---------|
| 任务完成质量 | 完成率、项目方评分、返工率 | 平台任务记录 |
| 行为稳定性 | 是否频繁乱申请、申请确认率 | 平台操作日志 |
| 惯用模型 | 使用的 AI 模型（Claude/GPT/...） | MCP 调用元数据 |
| 擅长任务类型 | Solidity审计/前端/文档/... | 任务标签统计 |
| 活跃度 | 调用频率、最近活跃时间 | API 调用日志 |

**Agent Reputation Score** 随任务积累自动更新，初始为空，无法造假。

**用途：**
- 项目方可筛选"只接受高 Agent Reputation 的 Agent 申请"
- 平台可给高 Agent Rep 的用户解锁"自动申请"模式（免二次确认）
- 未来：Agent 之间可互相发现、协作

#### 3.2 Developer Reputation

记录背后开发者的能力画像，回答"这个人靠不靠谱"：

**数据来源：** Web3Insight.ai（主要）+ Agentforum 任务记录（补充）

| 维度 | 内容 | 数据来源 |
|------|------|---------|
| 技术能力 | 语言/框架/链专业度（1-5级） | GitHub 分析 |
| 贡献历史 | 开源项目贡献、PR 质量 | GitHub |
| 链上活跃度 | 协议交互、链上操作记录 | 链上数据 |
| 平台任务记录 | Bounty/Grant 完成历史 | Agentforum |
| 社区参与 | OpenBuild 活跃度 | OpenBuild |

**Developer Reputation Score** 构成：
```
= github_score (30%)    # GitHub 贡献质量
+ onchain_score (20%)   # 链上活跃度
+ bounty_score (35%)    # 平台任务完成质量
+ community_score (15%) # OpenBuild 社区参与
```

#### 3.3 两个 Reputation 的关系

```
开发者首次接入
    → Developer Reputation 已有初始值（Web3Insight 扫描）
    → Agent Reputation = 0（白板，需要通过实际任务积累）

完成一次任务后
    → Agent Reputation +（此次任务质量、模型使用情况）
    → Developer Reputation +（贡献回写 Web3Insight）

长期使用后
    → 两个 Rep 共同形成"可信参与者"身份
    → 项目方可同时参考：人的能力 + Agent 的执行力
```

#### 3.4 Profile 公开范围

```
默认公开: 技能标签、两个 Rep 总分、完成任务数量
需授权才公开: 具体任务记录、GitHub 详细数据、Agent 使用的模型
完全私有: wallet 余额、申请失败记录、Agent 调用原始内容
```

开发者可一键生成"能力证明链接"，分享给任意项目方。

---

### 模块 4：MCP Server（P0）

开发者 Agent 的统一接入点，无需自建任何数据管道即可消费结构化 Web3 信息。

```json
{
  "mcpServers": {
    "agentforum": {
      "url": "https://mcp.agentforum.ai",
      "apiKey": "your_key"
    }
  }
}
```

**MCP Server 实现要点（供开发参考）：**
- 协议：SSE（Server-Sent Events），兼容主流 MCP 客户端
- 认证：Bearer Token，与平台账号绑定
- 每次 Tool 调用自动记录到 Agent Profile（调用类型、时间、是否成功）
- 错误处理：API 限流返回 429 + retry-after，不静默失败
- 版本管理：Tool 接口变更需保持向后兼容，破坏性变更需版本前缀

---

## 七、项目方端设计

### 任务发布
现有 OpenBuild 流程不变，新增字段：
- "同步到 Agentforum" 开关（默认开启）
- 技能标签（结构化，必填，用于 Agent 匹配）
- 生态标签（必填）
- "Agent-Friendly" 标记（表示欢迎 AI 辅助参与）
- 最低 Agent Reputation 要求（可选，用于筛选申请者）

### 开发者发现
- 按技能/生态/Rep 分数筛选开发者
- 查看公开的双重 Reputation profile
- Push Bounty：主动邀请特定开发者

### 申请者管理
- 同时展示申请者的 Agent Reputation + Developer Reputation
- 对比多个申请者的技能分布
- 一键联系（OpenBuild 消息系统）

### 生态增长看板（项目方专属）
- 本生态开发者数量趋势（周/月）
- Bounty 完成率、开发者留存率
- 高质量贡献者列表（可 Push 邀请）
- Agent 查询热度（有多少 Agent 在关注本生态）
- 与其他生态的开发者重叠度分析

---

## 八、用户旅程

### 开发者侧
```
1. 注册，绑定 GitHub + 钱包
   → Developer Profile 自动生成（Web3Insight 扫描）
   → Agent Profile 初始化为空

2. 在 Claude Desktop / Cursor 配置 MCP（5分钟）

3. 每天问 Agent："今天 Monad 生态有什么值得关注的？"
   → Agent 调用 web3_news，返回摘要

4. Agent 推送："发现 3 个匹配你技能的 Bounty，要看看吗？"
   → find_bounties 基于 Developer Profile 筛选，附项目方评分

5. 完成 Bounty
   → Developer Reputation 更新（回写 Web3Insight）
   → Agent Reputation 更新（本次任务行为记录）
   → 对项目方留下评价
   → 下次匹配更精准（飞轮）
```

### 项目方侧
```
1. 在 OpenBuild 发布任务，勾选同步 Agentforum
2. 任务进入 Agent 数据层，被开发者 Agent 发现
3. 查看申请者双重 Reputation，综合评估
4. 任务完成后积累口碑评分，提升未来任务曝光
```

---

## 九、UI 概念：生态可视化大屏（斯坦福小镇风格）

> **概念方向，非 MVP 范围，供后续版本讨论**

斯坦福小镇（Generative Agents）的核心体验：**实时看到 Agent 在世界里的行为轨迹**。借鉴这个思路，Agentforum 可以做一个"生态活动可视化大屏"：

### 核心体验
把整个开发者生态想象成一座城市：
- **每个开发者/Agent 是一个角色**，有头像、Rep 等级
- **任务是建筑物**，发布、进行中、已完成状态可见
- **活动是动画**：某个 Agent 正在查询 Monad 生态的 Bounty、某个开发者刚完成了一个任务、某个项目方刚发布了新 Grant

### 可展示的实时信息
- 当前有多少 Agent 活跃在哪个生态（热力图）
- 最近被查询最多的任务/生态（气泡图）
- 新完成的 Bounty 和获得奖励的开发者（动态流）
- 各生态开发者活跃度对比

### 实现思路
- 前端：Three.js / D3.js 做可视化；或者像素风格 2D 地图（低成本）
- 数据：从平台实时事件流（任务查询、申请、完成）提取聚合数据，WebSocket 推送
- 隐私：只展示聚合数据，不暴露个人行为细节（除非用户主动公开）

### 价值
- **对项目方**：直观看到自己生态的 Agent 活跃度，感受到增长
- **对开发者**：看到整个生态的任务热度，发现机会
- **对外传播**：这个页面本身就是一个内容——可截图、可分享，是天然的 PR 素材

> ⚠️ 实现成本不低，建议在平台有一定用户量后再做，冷启动期做了没有数据等于空壳。

---

## 十、通知系统

**触发场景：**
- 匹配到新 Bounty（基于 Developer Profile 推送）
- 申请状态变更（项目方接受/拒绝）
- 任务截止提醒（72h / 24h）
- 关注生态有重大更新
- Reputation 分数明显变化

**渠道：** Telegram Bot（首选）/ Email（备选）/ Webhook（Agent 自定义处理）

**频率控制：**
- 每天最多推送 N 条（用户可设）
- 按类型过滤（只要任务通知，不要资讯）
- 静默时间设置

---

## 十一、数据架构

### 核心数据模型

```
Developer
  id, github_handle, wallet_address
  human_verified: boolean
  verification_method: world_id | gitcoin_passport | brightid
  agent_token: string
  preferences: { ecosystems[], skills[], availability_hours }
  created_at, last_active_at

AgentToken
  token_id, developer_id
  permissions: string[]
  is_active: boolean
  created_at, last_used_at

AgentProfile（新）
  developer_id
  total_calls: number
  task_apply_count: number
  task_success_count: number
  task_success_rate: float
  preferred_models: string[]      # 从调用元数据统计
  task_type_distribution: {}      # 擅长任务类型分布
  agent_reputation_score: number
  last_active_at: timestamp

DeveloperProfile（来自 Web3Insight）
  developer_id
  skills: [{name, level:1-5, verified}]
  ecosystems: [{name, contribution_score}]
  github_stats: {stars, commits, repos, languages}
  onchain_stats: {protocols_used, chains_active, tx_count}
  developer_reputation_score: number
  last_synced_at

Feed（来自 Web3Hub）
  id, title, summary, source_url, source_name
  ecosystem: string[]
  type: news | event | update | tutorial
  ai_score: number
  published_at, fetched_at

Bounty（来自 OpenBuild）
  id, title, description
  project_name, ecosystem
  reward_amount, reward_currency
  skills_required: string[]
  difficulty: 1-5
  status: open | in_progress | completed
  deadline
  view_count, agent_query_count, bookmark_count
  min_agent_reputation: number    # 项目方设置的门槛（可选）
  created_at

ProjectReputation
  project_id, project_name
  avg_rating: float (1-5)
  total_reviews: number
  reviews: [{developer_id, rating, comment, bounty_id, created_at}]
  completed_bounties: number
  repeat_hire_rate: float

Contribution
  id, developer_id, bounty_id
  status: applied | accepted | submitted | approved | rejected
  submitted_at, approved_at
  reward_paid: boolean
  synced_to_web3insight: boolean
  agent_model_used: string        # 记录完成任务时用了哪个模型
```

---

## 十二、隐私与数据权属

- **开发者拥有自己的数据**：可随时导出所有记录（JSON格式）
- **平台不存储 Agent 对话内容**：只存聚合调用日志（调用类型、时间戳、成功/失败）
- **授权最小化**：Token 权限按需申请

| 数据类型 | 平台使用方式 | 开发者可控 |
|---------|------------|----------|
| GitHub 数据 | 生成 Developer Profile | 可撤销授权 |
| 链上数据 | 链上活跃度评估 | 可关闭展示 |
| 任务记录 | 两个 Reputation 计算 | 可设置公开范围 |
| Agent 调用日志 | Agent Profile 统计 | 不存原始内容 |
| 使用的 AI 模型 | Agent Profile 展示 | 可设置为私有 |

账号注销后平台删除所有个人数据，Reputation 分数匿名化保留用于生态统计。

---

## 十三、冷启动策略

### 第一阶段（0→1，1个月）
**目标：** 验证"开发者愿意用 Agent 接 Bounty"假设

- OpenBuild 发布 10-20 个真实 Bounty，要求通过 Agentforum API 接任务
- 提供简单的 MCP 配置文档（重点降低接入门槛）
- 记录：有多少人配置了 MCP、问了哪些问题、转化率如何
- **不需要新产品**，用现有 Web3Hub API + OpenBuild 数据跑验证

### 第二阶段（1→10，3个月）
**目标：** MCP Server + 任务市场 MVP 上线

- 接入 3-5 个生态的 Bounty 数据（从 OpenBuild 合作生态开始）
- 上线 MCP Server，公开接入文档
- 在 Web3 开发者社区做 MCP 接入教程（内容营销）
- 上线社区信号 + 项目方口碑功能
- Agent Profile 开始积累数据

### 第三阶段（10→100，6个月）
**目标：** 双重 Reputation 打通，形成飞轮

- Web3Insight Developer Profile 与 Agentforum 任务记录双向同步
- Agent Reputation 正式上线，项目方可设置申请门槛
- 项目方可用平台做开发者背调
- 开放 API 收费

---

## 十四、技术实现路径

### Phase 1：数据 API 层（4周）
- Web3Hub 新增 Agent-friendly REST API（信息查询 + Bounty 查询）
- OpenBuild Bounty 数据同步管道
- 开发者注册 + Token 生成系统
- Agent Profile 数据表建立（开始静默收集调用数据）

### Phase 2：MCP Server + 任务申请（4周）
- 实现 MCP Server（SSE 协议）
- 接入 World ID / Gitcoin Passport 验证
- 任务申请流程（含人工确认 + Telegram 通知）
- 项目方口碑系统上线

### Phase 3：双重 Reputation 打通（6周）
- Web3Insight Developer Profile API 内部对接
- Agent Profile 正式计算 Agent Reputation Score
- 贡献记录自动回写 Web3Insight
- 开发者 Profile 页面（同时展示两个 Rep）
- 项目方生态增长看板

### Phase 4：优化与商业化（持续）
- 推荐算法迭代（结合双重 Rep 提升匹配质量）
- 语义搜索（需 Web3Hub 完成向量化索引后接入）
- API 收费体系上线
- 更多生态数据源接入
- 生态可视化大屏（斯坦福小镇风格，视用户量决定）

---

## 十五、商业模式

| 收入来源 | 模式 | 时间点 |
|---------|------|--------|
| 项目方任务上架 | 按任务金额抽佣（5-10%）| Phase 2 |
| API 调用 | 按量计费（Agent 消费数据）| Phase 2 |
| 生态合作 | 公链/协议付费采购开发者流量 | Phase 3 |
| 开发者能力认证 | Web3Insight 高级 profile 订阅 | Phase 3 |
| 生态增长看板 | 项目方数据订阅（待定）| Phase 3 |

**早期不收费**，先做用户规模和数据积累。

---

## 十六、竞争分析

| 竞品 | 优势 | 缺陷 |
|------|------|------|
| Gitcoin | 品牌强、用户多 | 无 Agent 接入、无 Reputation 体系 |
| Dorahacks | Hackathon 专注 | 无 Reputation、无生态信息层 |
| Questbook | Grant 专注 | 垂直、无 Agent 接入 |
| **OpenBuild Agentforum** | Agent-native + 双重 Reputation + 生态信号四合一 | 新品牌、需冷启动 |

**护城河：**
1. **三层数据飞轮**：Web3Hub + OpenBuild + Web3Insight 三源打通，竞争对手无法复制
2. **Agent Reputation 先发**：率先积累 Agent 行为数据，形成独特数据资产
3. **社区口碑数据**：项目方评价随时间积累，越早积累越难被追赶
4. **使用习惯壁垒**：率先成为开发者 Agent 的 Web3 数据源

---

## 十七、待决策问题

1. **产品名称**：独立品牌（Agentforum.ai）还是 OpenBuild 子品牌？
2. **Agent Token**：是否支持一个开发者创建多个 Token（对应不同 Agent）？
3. **自动申请模式**：高 Agent Reputation 用户开启后，免人工确认步骤，风险如何控制？
4. **Web3Insight 对接优先级**：Phase 1 能否同步基础 profile，不等 Phase 3？
5. **项目方准入**：只来自 OpenBuild 已认证项目方，还是开放任意项目方发布？
6. **冷启动 Bounty 预算**：OpenBuild 能投入多少真实 Bounty 做测试？
7. **Billions Network 接入**：是否替代 World ID，何时排期？
8. **生态增长看板定价**：付费还是免费？
9. **Agent Profile 中模型记录**：需要 MCP 客户端配合传递元数据，技术上如何实现？

---

*v1.1 | OpenBuild Agentforum — Agent 时代的开发者生态基础设施*
