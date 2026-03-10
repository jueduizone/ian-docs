# OpenBuild Agentforum — Agent 时代的 Web3 生态基础设施
**产品文档 v1.0 | 2026-03-10**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1–v0.6 | 2026-03-09 | 初稿迭代，MCP 定位、产品命名、功能设计 |
| v0.7 | 2026-03-10 | 核心定位升级：从"数据基础设施"到"生态基础设施"，核心价值聚焦开发者增长飞轮 |
| v1.0 | 2026-03-10 | 合并产品方案与详细设计文档，形成完整产品文档 |

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

MCP（Model Context Protocol）的普及让 Agent 调用外部数据源成为标准操作。现在没有任何 Web3 平台是真正解决"项目生态 × 开发者增长 × Agent 时代"这个命题的——这是先发窗口。

---

## 二、产品定位

> **OpenBuild Agentforum = Agent 时代的 Web3 生态基础设施**

**核心价值：** 帮助 Web3 项目生态在 Agent 时代持续吸引、激活、留住开发者，构建可持续增长飞轮。

**面向项目方：** 一键拥有"Agent 时代的开发者增长引擎"——你的生态信息、任务机会、开发者口碑，全部进入开发者 Agent 的信息流，持续输送高质量贡献者。

**面向开发者：** 你的 Agent 成为最懂 Web3 生态的助手——帮你发现机会、匹配任务、积累可信的贡献记录，在每个生态都有拿得出手的身份。

MCP Server（数据 Pipeline）是**入口钩子**——让开发者有理由第一次接入，而留住他们的是 Reputation 积累和生态关系网络。

不是 Agent 平台（不托管用户的 Agent），而是让开发者的 Agent 能够：
- 实时获取生态信息（无需自建爬虫和多源适配）
- 发现并精准匹配合适任务
- 积累可信的贡献记录和 Reputation

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
│  │ Feed API │  │ Bounty   │  │  Web3Insight   │  │
│  │ 语义搜索  │  │ Grant    │  │  能力认证      │  │
│  │          │  │ Hackathon│  │  贡献记录      │  │
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
加入 Claude Desktop / Cursor / Windsurf 配置后，Agent 可直接调用平台所有 Tool，无需额外开发。

#### 方式 B：REST API（面向自建 Bot/Agent 的开发者）
```
Base URL: https://api.agentforum.ai/v1
Auth: Bearer Token (在平台生成)
```
适合自建 Telegram Bot、Discord Bot 或自定义 Agent 框架的开发者。

#### 方式 C：Webhook 推送（被动接收，无需主动轮询）
开发者注册 Webhook URL，平台根据 profile 主动推送匹配的任务和资讯。适合不想改变 Agent 配置、只希望接收推送的开发者。

---

### 5.2 注册与认证流程

```
开发者注册账号
    → 绑定身份（GitHub + 钱包）
    → 真人验证（第三方）
    → 生成 Agent Token
    → 配置 Agent 接入
    → Web3Insight 生成初始 profile
```

**Step 1：账号注册**
- 支持：GitHub OAuth / 钱包签名登录（MetaMask/WalletConnect）
- 不做邮箱注册（Web3 用户习惯，也方便后续链上数据关联）

**Step 2：身份绑定**
- 必选：GitHub 账号（能力评估数据源）+ Web3 钱包（链上记录 + 收款）
- 可选：Twitter/X（社交身份验证）

**Step 3：真人验证（Anti-Sybil）**
- 接入：World ID（优先）/ Gitcoin Passport / BrightID
- 完成验证后账号获得"Human Verified"标记
- 未验证账号可浏览信息，但无法接 Bounty 任务

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

**Step 5：初始 Profile 生成**
- Web3Insight 自动扫描 GitHub 贡献记录、链上活动、OpenBuild 历史参与
- 生成初始技能 profile，开发者可手动补充擅长领域、偏好生态、可用时间

---

### 5.3 MCP Tools 设计

#### 信息类
```
web3_news
  参数: ecosystem(可选), type(news/event/update), since, limit
  示例: "给我看看最近24小时 Monad 生态的重要更新"

search_ecosystem
  参数: query(自然语言), ecosystems(可选过滤)
  示例: "Solana 最近有没有关于账户抽象的讨论"

get_hackathons
  参数: status(upcoming/active/ended), ecosystem
  返回: [{name, prize, deadline, organizer, apply_url, skills_needed}]

ecosystem_overview
  参数: ecosystem
  返回: 某个生态的整体动态摘要
```

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

get_project_reputation
  参数: project_name 或 project_id
  返回: 项目方的社区评分、历史评价摘要、完成任务数
```

#### Profile 类
```
get_my_profile
  返回: 技能标签、贡献历史、reputation 分数、擅长生态

get_developer_profile
  参数: github_handle 或 wallet_address
  返回: 公开的开发者 profile（需对方授权公开）

update_preferences
  参数: ecosystems, skills, availability(每周可用小时数)
```

---

## 六、核心功能模块

### 模块 1：生态信息 Feed（P0）

- 数据来源：Web3Hub 现有数据管道直接复用，补充 OpenBuild Bounty/Hackathon 数据
- 信息质量分级：Level 1（官方公告）/ Level 2（知名媒体/KOL）/ Level 3（聚合转载）
- AI 处理流程：去重 → AI 打分 → 分类标签 → 摘要生成（100字内）→ 入库
- 对人的呈现：Agent 返回给开发者的摘要，平台本身不需要复杂 UI

### 模块 2：任务市场（P0）

**任务发布流程：**
```
项目方在 OpenBuild 后台发布任务
    → 勾选"同步到 Agentforum"（默认开启）
    → 任务结构化存储（技能标签/金额/截止时间/难度）
    → Agent 可查询、筛选、订阅
    → 开发者通过 Agent 了解详情并决策
    → Agent 辅助准备申请材料
    → 提交申请（需人工确认，非全自动）
```

**申请确认流程（关键设计）：**
```
Agent 调用 apply_bounty
    → 平台创建申请，状态: pending_confirm
    → 向开发者发送确认通知（Telegram/Email）
    → 开发者点击确认 → 状态: applied → 通知项目方
    → 超时24h未确认自动取消
```

**社区信号：**
- 关注度指标：浏览次数、收藏数、Agent 查询次数
- 项目方评价：完成任务后开发者评分（星级 + 文字），公开可见
- 个性化订阅：开发者配置 Agent 只关注特定项目方/生态

### 模块 3：Reputation 层（P1）

**开发者 Reputation 分数构成：**
```
reputation_score =
    github_score (30%)    # GitHub 贡献质量
  + onchain_score (20%)   # 链上活跃度
  + bounty_score (35%)    # 平台任务完成质量
  + community_score (15%) # OpenBuild 社区参与
```

**项目方 Reputation（口碑数字化）：**
- 平均评分（1-5星）、历史评价文字、完成任务数、重复雇用率
- 冷启动处理：初期显示"新项目方"标记 + OpenBuild 已验证背书

**Profile 公开范围：**
```
默认公开: 技能标签、reputation 分数、完成任务数量
需授权才公开: 具体任务记录、GitHub 详细数据
完全私有: wallet 余额、申请失败记录
```

开发者可一键生成"能力证明链接"，分享给任意项目方。

**任务完成后的飞轮：**
```
项目方审核通过 → 释放 Bounty 奖励
    → Agentforum 记录贡献
    → 同步到 Web3Insight profile
    → 开发者对项目方评价
    → reputation_score 更新
    → 下次任务匹配精准度提升（飞轮正向循环）
```

### 模块 4：MCP Server（P0）

Web3 数据基础设施的统一接入点，开发者 Agent 无需自建任何数据管道即可消费结构化 Web3 信息。

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

---

## 七、项目方端设计

### 任务发布
现有 OpenBuild 流程不变，新增：
- "同步到 Agentforum" 勾选项（默认开启）
- 技能标签结构化填写（用于 Agent 匹配）
- "Agent-Friendly" 标记

### 开发者发现
- 按技能/生态筛选开发者（Web3Insight API）
- 查看公开的 reputation profile
- Push Bounty：邀请特定开发者参与任务

### 申请者管理
- 查看每个申请者的 Agentforum profile，对比技能分布
- 一键联系（OpenBuild 消息系统）

### 生态增长看板（项目方专属）
- 本生态开发者数量趋势（周/月）
- Bounty 完成率和开发者留存率
- 高质量贡献者列表（可 Push 邀请）
- 与其他生态的开发者重叠度分析

---

## 八、用户旅程

### 开发者侧
```
1. 注册，绑定 GitHub + 钱包
   → Web3Insight 自动生成初始 profile

2. 在 Claude Desktop / Cursor 配置 MCP（5分钟内完成）

3. 每天问 Agent："今天 Monad 生态有什么值得关注的？"
   → Agent 调用 web3_news，返回摘要

4. Agent 推送："发现 3 个匹配你技能的 Bounty，要看看吗？"
   → find_bounties 基于 profile 自动筛选，附上项目方评分

5. 完成 Bounty 后，贡献自动记录到 Web3Insight profile
   → 下次匹配质量更高，可对项目方留下评价
```

### 项目方侧
```
1. 在 OpenBuild 后台发布任务（现有流程）
2. 勾选"同步到 Agentforum"
3. 任务进入数据层，被开发者 Agent 发现
4. 查看申请者 Web3Insight profile，直接评估能力
5. 任务完成后，积累社区评分，提升未来任务曝光和信任度
```

---

## 九、通知系统

**触发场景：** 匹配新 Bounty、申请状态变更、任务截止提醒（72h/24h）、生态重大更新、Reputation 变化

**渠道：** Telegram Bot（首选）/ Email（备选）/ Webhook（供 Agent 自定义处理）

**频率控制：** 每天最多 N 条、按类型过滤、静默时间设置

---

## 十、数据架构

### 核心数据模型

```
Developer: id, github_handle, wallet_address, human_verified,
           verification_method, agent_token, preferences

AgentToken: token_id, developer_id, permissions[], is_active

DeveloperProfile (Web3Insight):
  skills: [{name, level:1-5, verified}]
  ecosystems: [{name, contribution_score}]
  github_stats, onchain_stats, reputation_score

Feed (Web3Hub):
  id, title, summary, source_url, ecosystem[], type, ai_score, published_at

Bounty (OpenBuild):
  id, title, project_name, ecosystem, reward_amount, skills_required[],
  difficulty, status, deadline, view_count, agent_query_count

ProjectReputation:
  project_id, avg_rating, total_reviews
  reviews: [{developer_id, rating, comment, bounty_id}]
  completed_bounties, repeat_hire_rate

Contribution:
  id, developer_id, bounty_id, status, submitted_at, approved_at,
  reward_paid, synced_to_web3insight
```

---

## 十一、隐私与数据权属

- **开发者拥有自己的数据**：可随时导出所有记录（JSON格式）
- **平台不存储 Agent 对话内容**：只存聚合调用日志用于匹配优化
- **授权最小化**：Token 权限按需申请

| 数据类型 | 平台使用方式 | 开发者可控 |
|---------|------------|----------|
| GitHub 数据 | 生成技能 profile | 可撤销授权 |
| 链上数据 | 链上活跃度评估 | 可关闭展示 |
| 任务记录 | Reputation 计算 | 可设置公开范围 |
| Agent 调用日志 | 匹配优化（聚合） | 不存原始内容 |

账号注销后平台删除所有个人数据，Reputation 分数匿名化保留用于生态统计。

---

## 十二、冷启动策略

### 第一阶段（0→1，1个月）
**目标：** 验证"开发者愿意用 Agent 接 Bounty"假设

- OpenBuild 发布 10-20 个真实 Bounty，要求通过 Agentforum API 接任务
- 提供简单的 MCP 配置文档
- 记录：有多少人配置了 MCP、问了哪些问题、转化率如何

**不需要新产品**，用现有 Web3Hub API + OpenBuild 数据即可跑测试

### 第二阶段（1→10，3个月）
**目标：** 完成 MCP Server + 任务市场 MVP

- 接入 3-5 个生态的 Bounty 数据（从 OpenBuild 合作生态开始）
- 上线 MCP Server，公开文档
- Web3 开发者社区做 MCP 接入教程（内容营销）
- 上线社区信号功能，积累项目方评价数据

### 第三阶段（10→100，6个月）
**目标：** Reputation 层打通，形成飞轮

- Web3Insight profile 与 Agentforum 任务记录双向同步
- 项目方可用 Agentforum 做开发者背调
- 开放 API 收费

---

## 十三、技术实现路径

### Phase 1：数据 API 层（4周）
- Web3Hub 新增 Agent-friendly API 接口
- OpenBuild Bounty 数据同步到 Agentforum 数据层
- 开发者注册 + Token 生成系统
- 基础 REST API（信息查询 + Bounty 查询）

### Phase 2：MCP Server + 任务申请（4周）
- 实现 MCP Server（SSE 协议）
- 接入 World ID / Gitcoin Passport 验证
- 任务申请流程（含人工确认）
- Telegram Bot 通知
- 项目方口碑系统上线

### Phase 3：Reputation 层打通（6周）
- Web3Insight Profile API 内部对接
- 贡献记录自动回写
- 开发者 Profile 页面
- 项目方开发者发现功能 + 生态增长看板

### Phase 4：优化与商业化（持续）
- 语义搜索优化
- 推荐算法迭代
- API 收费体系上线
- 更多生态数据源接入

---

## 十四、商业模式

| 收入来源 | 模式 | 时间点 |
|---------|------|--------|
| 项目方任务上架 | 按任务金额抽佣（5-10%）| Phase 2 |
| API 调用 | 按量计费（Agent 消费数据）| Phase 2 |
| 生态合作 | 公链/协议付费采购开发者流量 | Phase 3 |
| 开发者能力认证 | Web3Insight 高级 profile 订阅 | Phase 3 |
| 生态增长看板 | 项目方付费功能（待定）| Phase 3 |

**早期不收费**，先做用户规模和数据积累。

---

## 十五、竞争分析

| 竞品 | 优势 | 缺陷 |
|------|------|------|
| Gitcoin | 品牌强、用户多 | 无 Agent 接入、无能力评估 |
| Dorahacks | Hackathon 专注 | 信息不完整、无 reputation |
| Questbook | Grant 专注 | 垂直、无生态信息层 |
| **OpenBuild Agentforum** | Agent-native + 生态基础设施 + Reputation + 社区信号四合一 | 新品牌、需冷启动 |

**护城河：** 三层飞轮（Web3Hub 数据 + OpenBuild 任务生态 + Web3Insight Reputation 三源打通）+ 社区口碑数据积累 + Agent 时代先发入口（形成使用习惯壁垒）

---

## 十六、待决策问题

1. **产品名称**：独立品牌（Agentforum.ai）还是 OpenBuild 子品牌？
2. **Agent Token**：是否支持一个开发者创建多个 Token（对应不同 Agent）？
3. **人工确认**：是否允许高 reputation 开发者开启"自动申请"模式？
4. **Web3Insight 对接优先级**：Phase 1 能否同步基础 profile，不等到 Phase 3？
5. **项目方准入**：只来自 OpenBuild 已认证项目方，还是开放任意项目方发布？
6. **冷启动 Bounty 预算**：OpenBuild 能投入多少真实 Bounty 做测试？
7. **Billions Network 接入排期**：何时启动身份验证层对接？
8. **生态增长看板**：付费功能还是免费提供以吸引生态合作？

---

*v1.0 | OpenBuild Agentforum — Agent 时代的 Web3 生态基础设施*
