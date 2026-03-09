# AgentHub — 完整产品设计文档
**v0.2 | 2026-03-09**

---

## 一、产品概述

### 定位
Web3 生态开发者的 AI co-pilot 基础设施。

开发者通过自己的 AI Agent 接入平台，获取生态资讯、发现任务机会、积累可信贡献记录。平台不托管 Agent，而是作为 Agent 的数据源和任务层。

### 核心用户
- **开发者/贡献者**：Web3 生态的构建者，希望用 Agent 减少信息噪音、高效参与生态
- **项目方**：需要向开发者分发任务（Bounty/Grant/Hackathon），希望找到能力匹配的贡献者
- **生态基金**：希望量化生态开发者活跃度和质量

---

## 二、Agent 接入设计

### 2.1 接入方式

平台提供两种接入方式，覆盖不同技术水平的开发者：

#### 方式 A：MCP Server（推荐，面向有技术能力的开发者）
```json
// 加入 Claude Desktop / Cursor / Windsurf 的 mcp 配置
{
  "mcpServers": {
    "agenthub": {
      "url": "https://mcp.agenthub.ai/sse",
      "headers": {
        "Authorization": "Bearer <your_agent_token>"
      }
    }
  }
}
```
配置完成后，Agent 可直接调用平台所有 Tool，无需额外开发。

#### 方式 B：REST API（面向自建 Bot/Agent 的开发者）
```
Base URL: https://api.agenthub.ai/v1
Auth: Bearer Token (在平台生成)
```
适合自建 Telegram Bot、Discord Bot 或自定义 Agent 框架的开发者。

#### 方式 C：Webhook 推送（被动接收，无需主动轮询）
开发者注册 Webhook URL，平台根据 profile 主动推送匹配的任务和资讯。
适合不想改变 Agent 配置、只希望接收推送的开发者。

---

### 2.2 Agent 注册与认证流程

#### 整体流程
```
开发者注册账号
    → 绑定身份（GitHub + 钱包）
    → 真人验证（第三方）
    → 生成 Agent Token
    → 配置 Agent 接入
    → Web3Insight 生成初始 profile
```

#### 步骤详解

**Step 1：账号注册**
- 支持：GitHub OAuth / 钱包签名登录（MetaMask/WalletConnect）
- 不做邮箱注册（Web3 用户习惯，也方便后续链上数据关联）
- 首次登录自动创建账号

**Step 2：身份绑定**
- 必选：GitHub 账号（用于能力评估数据源）
- 必选：Web3 钱包（用于链上贡献记录和收款）
- 可选：Twitter/X（用于社交身份验证）

**Step 3：真人验证（Anti-Sybil）**
- 接入第三方：World ID（优先）/ Gitcoin Passport / BrightID
- 完成验证后账号获得"Human Verified"标记
- 未验证账号可浏览信息，但无法接 Bounty 任务
- 设计理由：保证每个接任务的 Agent 背后是真人，项目方可信

**Step 4：生成 Agent Token**
- 验证完成后，平台生成唯一的 `agent_token`
- Token 与账号 1:1 绑定，代表开发者的 Agent 身份
- Token 可随时撤销重新生成
- Token 权限可精细控制（只读 / 可申请任务 / 可接收推送）

```
Token 格式示例：
ah_live_v1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Token 权限范围：
- read:feeds        读取生态资讯
- read:bounties     读取任务列表
- apply:bounties    申请任务（需 Human Verified）
- read:profile      读取自己的 profile
- write:webhook     配置 Webhook 推送
```

**Step 5：初始 Profile 生成**
- 绑定 GitHub 后，Web3Insight 自动扫描：
  - GitHub 贡献记录（语言、项目类型、活跃度）
  - 链上活动（持仓、协议交互历史）
  - OpenBuild 历史参与记录
- 生成初始技能 profile，用于任务匹配
- 开发者可手动补充：擅长领域、偏好生态、可用时间

---

### 2.3 MCP Tools 设计

开发者 Agent 接入后，可调用以下 Tools：

#### 信息类 Tools
```
web3_news
  参数: ecosystem(可选), type(news/event/update), since(时间), limit
  返回: [{title, summary, source, url, ecosystem, published_at}]
  示例: "给我看看最近24小时 Monad 生态的重要更新"

search_ecosystem
  参数: query(自然语言), ecosystems(可选过滤)
  返回: 语义搜索结果列表
  示例: "Solana 最近有没有关于账户抽象的讨论"

get_hackathons
  参数: status(upcoming/active/ended), ecosystem
  返回: [{name, prize, deadline, organizer, apply_url, skills_needed}]
```

#### 任务类 Tools
```
find_bounties
  参数: skills(可选), ecosystem(可选), amount_min, amount_max, difficulty
  返回: 匹配的 Bounty 列表（基于当前用户 profile 自动过滤）
  示例: "找一些适合我的 Solidity 相关 Bounty，500u 以上"

get_bounty_detail
  参数: bounty_id
  返回: 完整任务描述、要求、评审标准、历史申请者数量

apply_bounty
  参数: bounty_id, message(申请说明)
  返回: 申请状态（需 Human Verified Token）
  注意: 最终提交需开发者在平台二次确认，不允许纯自动提交

get_grants
  参数: ecosystem, stage(idea/mvp/growth), amount_range
  返回: Grant 机会列表
```

#### Profile 类 Tools
```
get_my_profile
  参数: 无（基于 Token 识别身份）
  返回: 技能标签、贡献历史、reputation 分数、擅长生态

get_developer_profile
  参数: github_handle 或 wallet_address
  返回: 公开的开发者 profile（需对方授权公开）

update_preferences
  参数: ecosystems(偏好生态), skills(技能), availability(每周可用小时数)
  返回: 更新成功，影响后续任务推荐结果
```

---

## 三、数据架构

### 3.1 数据层分工

```
┌─────────────────────────────────────────────────────┐
│                    AgentHub 数据层                    │
├──────────────┬──────────────────┬───────────────────┤
│  信息数据     │   任务数据        │   身份/能力数据    │
│              │                  │                   │
│  Web3Hub     │  OpenBuild        │  Web3Insight      │
│  - RSS 聚合  │  - Bounty         │  - GitHub 分析    │
│  - AI 处理   │  - Hackathon      │  - 链上数据       │
│  - 分类标签  │  - Grant          │  - 贡献记录       │
└──────────────┴──────────────────┴───────────────────┘
```

### 3.2 核心数据模型

#### Developer（开发者）
```
id, github_handle, wallet_address
human_verified: boolean
verification_method: world_id | gitcoin_passport | brightid
agent_token: string
preferences: { ecosystems[], skills[], availability_hours }
created_at, last_active_at
```

#### AgentToken
```
token_id, developer_id
token_value: string (hashed)
permissions: string[] (read:feeds, apply:bounties, ...)
is_active: boolean
created_at, last_used_at
```

#### DeveloperProfile（来自 Web3Insight）
```
developer_id
skills: [{name, level: 1-5, verified: boolean}]
ecosystems: [{name, contribution_score}]
github_stats: {stars, commits, repos, languages}
onchain_stats: {protocols_used, chains_active, tx_count}
reputation_score: number
last_synced_at
```

#### Feed（来自 Web3Hub）
```
id, title, summary, content
source_url, source_name
ecosystem: string[]
type: news | bounty_info | event | update | tutorial
ai_score: number
published_at, fetched_at
```

#### Bounty（来自 OpenBuild）
```
id, title, description
project_name, ecosystem
reward_amount, reward_currency
skills_required: string[]
difficulty: 1-5
status: open | in_progress | completed
deadline
apply_count
created_at
```

#### Contribution（贡献记录）
```
id, developer_id, bounty_id
status: applied | accepted | submitted | approved | rejected
submitted_at, approved_at
reward_paid: boolean
回写到 Web3Insight: boolean
```

---

## 四、任务申请流程设计

### 4.1 正常申请流程
```
Agent 调用 find_bounties
    → 平台基于 profile 返回匹配列表
    → Agent 展示给开发者
    → 开发者告诉 Agent "申请第2个"
    → Agent 调用 apply_bounty（带 message）
    → 平台创建申请记录，状态: pending_confirm
    → 平台向开发者发送确认通知（Email/Telegram）
    → 开发者点击确认 → 状态变为: applied
    → 通知项目方
```

**关键设计：必须有人工确认步骤**
- 防止 Agent 误操作批量申请
- 保证申请的严肃性，避免垃圾申请影响项目方体验
- 确认超时（24h未确认）自动取消

### 4.2 任务进行中
- 开发者可通过 Agent 查询任务状态
- 项目方可在 OpenBuild 后台与申请者沟通
- 提交成果仍走 OpenBuild 现有流程（不改变项目方操作习惯）

### 4.3 任务完成后
```
项目方审核通过
    → OpenBuild 释放 Bounty 奖励
    → AgentHub 记录贡献
    → 同步到 Web3Insight profile
    → 开发者 reputation_score 更新
    → 下次任务匹配精准度提升
```

---

## 五、Reputation 系统设计

### 5.1 分数构成

```
reputation_score = 
    github_score (30%)      # GitHub 贡献质量
  + onchain_score (20%)     # 链上活跃度
  + bounty_score (35%)      # 在平台完成的任务质量
  + community_score (15%)   # OpenBuild 社区参与
```

### 5.2 Bounty Score 计算
- 完成数量（基础分）
- 项目方评分（1-5星，权重最高）
- 完成速度（在截止日前提交加分）
- 任务难度系数
- 重复合作加分（项目方二次选择同一开发者）

### 5.3 Profile 公开与授权
```
默认公开: 技能标签、reputation 分数、完成任务数量
需授权才公开: 具体任务记录、GitHub 详细数据
完全私有: wallet 余额、申请失败记录
```

开发者可一键生成"能力证明链接"，分享给任意项目方查看授权范围内的数据。

---

## 六、项目方端设计

### 6.1 任务发布（在 OpenBuild 完成）
现有流程不变，新增：
- "同步到 AgentHub" 勾选项（默认开启）
- 技能标签结构化填写（用于 Agent 匹配）
- "Agent-Friendly" 标记（表示欢迎 AI 辅助申请）

### 6.2 开发者发现
项目方可用 Web3Insight API 查询：
- 按技能/生态筛选开发者
- 查看公开的 reputation profile
- 邀请特定开发者参与任务（Push Bounty）

### 6.3 申请者管理
- 查看每个申请者的 AgentHub profile
- 对比多个申请者的技能分布
- 一键联系（通过 OpenBuild 消息系统）

---

## 七、通知系统设计

### 7.1 通知触发场景
- 发现匹配的新 Bounty（基于 profile 自动推送）
- 申请状态变更（项目方接受/拒绝）
- 任务截止日前 72h/24h 提醒
- 生态重大更新（用户关注的生态）
- Reputation 分数变化

### 7.2 通知渠道
- Telegram Bot（首选，Web3 开发者高使用率）
- Email（备选）
- Webhook（供 Agent 自定义处理）

### 7.3 通知频率控制
- 开发者可设置：每天最多推送 N 条
- 可按类型过滤：只要 Bounty 通知，不要资讯
- 静默时间设置

---

## 八、信息质量保障

### 8.1 内容来源分级
```
Level 1（高可信）: 官方公告、项目方直接发布
Level 2（可信）:  知名媒体、KOL 原创内容
Level 3（参考）:  聚合信息、转载内容
```

### 8.2 AI 处理流程（Web3Hub 现有能力）
```
原始内容
    → 去重（URL + 语义双重检测）
    → AI 打分（相关性、质量、时效性）
    → 分类标签（生态、类型）
    → 摘要生成（100字内）
    → 入库（分数>=阈值才进入 AgentHub）
```

### 8.3 Anti-Spam
- Bounty 信息必须来自已认证的项目方（通过 OpenBuild 验证）
- 资讯来源白名单机制
- 用户可举报低质量内容，影响来源信誉分

---

## 九、隐私与数据权属

### 9.1 数据权属原则
- **开发者拥有自己的数据**：可随时导出所有记录（JSON格式）
- **平台不存储原始执行内容**：Agent 的对话记录不上传
- **授权最小化**：Token 权限按需申请，不强制全量授权

### 9.2 数据使用规则
| 数据类型 | 平台使用方式 | 开发者可控 |
|---------|------------|----------|
| GitHub 数据 | 生成技能 profile | 可撤销授权 |
| 链上数据 | 链上活跃度评估 | 可关闭展示 |
| 任务记录 | Reputation 计算 | 可设置公开范围 |
| Agent 调用日志 | 匹配优化（聚合） | 不存原始内容 |

### 9.3 账号注销
- 注销后，平台删除所有个人数据
- Reputation 分数在匿名化处理后保留（用于生态数据统计）
- Web3Insight 数据的删除需单独操作（独立产品）

---

## 十、技术实现路径

### Phase 1：数据 API 层（4周）
- Web3Hub 数据库新增 Agent-friendly API 接口
- OpenBuild Bounty 数据同步到 AgentHub 数据层
- 开发者注册 + Token 生成系统
- 基础 REST API（信息查询 + Bounty 查询）

### Phase 2：MCP Server + 任务申请（4周）
- 实现 MCP Server（SSE 协议）
- 接入 World ID / Gitcoin Passport 验证
- 任务申请流程（含人工确认）
- Telegram Bot 通知

### Phase 3：Reputation 层打通（6周）
- Web3Insight Profile API 内部对接
- 贡献记录自动回写
- 开发者 Profile 页面
- 项目方开发者发现功能

### Phase 4：优化与商业化（持续）
- 语义搜索优化
- 推荐算法迭代
- API 收费体系上线
- 更多生态数据源接入

---

## 十一、待决策问题

1. **产品名称**：独立品牌（AgentHub / DevAgent.xyz）还是 OpenBuild 子品牌（OpenBuild Agent）？
   - 独立品牌：有更大想象空间，不绑定 OpenBuild
   - 子品牌：冷启动更快，复用 OpenBuild 信任背书

2. **Agent Token 设计**：是否支持一个开发者创建多个 Token（对应不同 Agent）？

3. **人工确认步骤**：任务申请必须人工确认是否过于保守？是否允许高 reputation 的开发者开启"自动申请"模式？

4. **Web3Insight 对接优先级**：Phase 1 能否就同步基础 profile 数据，不等到 Phase 3？

5. **项目方准入**：AgentHub 上的任务是只来自 OpenBuild 已认证项目方，还是开放给任意项目方发布？

---

*方案版本 v0.2 | 待 Ian 审阅后推进技术架构评估*
