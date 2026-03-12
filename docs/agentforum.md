# OpenBuild Agentforum — Agent 时代的 Web3 生态信息基础设施
**产品文档 v2.0 | 2026-03-12**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1–v1.1 | 2026-03-09~10 | 初稿迭代，MCP 定位、功能设计、Reputation 体系 |
| v2.0 | 2026-03-12 | 核心重构：MCP Server 升级为产品主轴；平台定位从任务市场转为聚合型信息基础设施；前端定位重新明确 |

---

## 一、核心重构：从"任务平台 + MCP"到"MCP 优先"

### v1.x 的问题

旧版设计里，MCP Server 是"吸引开发者的钩子"，本质是任务市场 + 生态信息的组合产品，MCP 只是接入方式之一。

这个方向有两个问题：
1. **任务市场竞争激烈**（Gitcoin/Dorahacks/Questbook），差异化难
2. **MCP 的真正价值被低估了**——开发者 Agent 需要的不仅是"找任务"，更需要"理解生态、获取上下文"，这个需求频率更高、门槛更低

### v2.0 的核心判断

> **谁成为开发者 Agent 的首选 Web3 数据源，谁就掌握了 Agent 时代的开发者流量入口。**

把 MCP Server 从功能模块升级为产品主轴，其他一切是为 MCP 提供数据的管道。

**本质转变：**
- v1.x：任务平台，MCP 是特性
- v2.0：MCP 信息层，任务是其中一个数据集

---

## 二、产品定位

> **OpenBuild Agentforum = Web3 生态的聚合型 MCP 平台**

**一句话：** 开发者只需接入一个 MCP，即可让自己的 Agent 了解所有主流 Web3 生态的文档、动态和机会。

**面向开发者：** 配置一次，你的 Agent 就拥有 Web3 全生态的上下文——文档、资讯、Bounty、项目背景，全部结构化可调用。

**面向项目方：** 你的生态信息直接进入开发者 Agent 的知识库，持续输送关注度和贡献者，无需自建 MCP。

---

## 三、产品架构（三层）

```
┌─────────────────────────────────────────────────────┐
│                  开发者的 Agent                       │
│          (Claude / Cursor / Windsurf / 自建)          │
└──────────────────┬──────────────────────────────────┘
                   │ MCP Protocol
┌──────────────────▼──────────────────────────────────┐
│               Layer 2：MCP Server（产品核心）          │
│                                                       │
│    get_ecosystem_context  │  find_opportunities       │
│    get_recent_updates     │  get_opportunity_detail   │
│    search_dev_resources   │  get_my_profile           │
│                                                       │
└──────┬────────────────────────────────┬──────────────┘
       │                                │
┌──────▼────────┐              ┌────────▼────────────┐
│  Layer 1      │              │  Layer 3             │
│  数据采集层    │              │  平台门户（对人）      │
│               │              │                     │
│  项目方提交    │              │  /ecosystems 浏览    │
│  自动抓取      │              │  /bounties 列表      │
│  Web3Hub 管道  │              │  /docs MCP 接入      │
│  定期更新      │              │  /submit 项目提交    │
└───────────────┘              └─────────────────────┘
```

---

## 四、Layer 1：数据采集层

### 内容来源

| 来源 | 处理方式 | 更新频率 |
|------|---------|---------|
| 项目方提交（官网/文档/GitHub） | 自动抓取 → Markdown → 摘要 | 按项目设定（每天/每周）|
| Web3Hub 实时资讯管道 | 直接复用，已结构化 | 实时 |
| OpenBuild Bounty/Hackathon 数据 | API 同步 | 实时 |
| GitHub Repo | GitHub API + Gitingest | 每天 |
| llms.txt | 直接消费（若项目已有） | 跟随项目更新 |

### 生态分级（内容策展）

不是抓到什么收什么，平台做主动策展：

**Tier 1（核心生态）**：Monad / Sui / Base / Solana / TON 等主流链
- 文档全量索引，支持语义搜索
- 实时资讯，官方公告 24h 内同步
- 深度 context（核心合约、SDK 示例、开发者资源）

**Tier 2（标准接入）**：中长尾 Web3 生态
- 基础信息 + 官方文档摘要
- 资讯聚合（非实时）

**Tier 3（项目方自提交）**：
- 项目方主动提交后平台审核
- 审核通过升级为 Tier 2，优质项目可升 Tier 1

冷启动策略：先把 5-10 个 Tier 1 生态做精，再扩张长尾。

### 项目方自服务接入流程

```
项目方填写：
  官网 URL
  GitHub repo
  文档地址（Gitbook / Notion / 自建）
  Discord / Telegram（可选）

平台自动：
  抓取内容 → 转 Markdown → AI 生成摘要和关键词
  创建 MCP context 草稿
  预览界面给项目方确认

项目方可额外编辑：
  ① 修正 AI 摘要（纠正错误理解）
  ② 设置更新频率
  ③ 填写"给 Agent 的特别说明"（见下）
```

### 「给 Agent 的特别说明」字段（差异化设计）

这是竞品没有做的功能。项目方可以直接写一段给 Agent 读的说明，例如：

> "我们的 SDK v2 与 v1 不兼容，所有新项目请使用 v2 文档。v1 文档仅供历史项目参考。"

> "Monad 测试网于 2026-02-01 重置，旧地址无效，请参考最新部署文档。"

这段话会被注入每次 `get_ecosystem_context` 的返回结果，直接影响 Agent 的行为，是项目方主动向开发者 Agent 传递关键信息的渠道。

### llms.txt 标准推动

- 平台消费接入生态的 llms.txt（若已有）
- 同时帮项目方自动生成 llms.txt，供其他 Agent 直接用
- 逐步成为 Web3 领域 llms.txt 的推动者和标准化参与者

---

## 五、Layer 2：MCP Server（产品核心）

### 接入配置

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

兼容：Claude Desktop / Cursor / Windsurf / 自建 Agent

### MCP Tools 设计

按"开发者 Agent 真正会问什么"来设计：

#### 生态信息类

```
get_ecosystem_context(ecosystem)
  返回：项目简介、核心合约地址、官方文档摘要、关键 SDK/API 资源、
        「给 Agent 的特别说明」（项目方填写）
  示例："帮我了解 Monad 的开发环境"

get_recent_updates(ecosystem, days=7)
  返回：官方公告、重大协议升级、重要 PR 合并
  区分：官方内容（高可信）vs 社区内容（参考）
  示例："Sui 最近一周有什么重要更新"

search_dev_resources(query, ecosystem?)
  返回：匹配的文档片段 + 来源链接
  基于向量化索引，支持自然语言查询
  示例："Solana 上怎么实现 SPL Token 转账"
  注意：需 Tier 1 生态，Tier 2 不支持语义搜索
```

#### 机会发现类

```
find_opportunities(skills?, ecosystems?, min_reward?, type?)
  type: bounty | grant | hackathon | all
  返回：按匹配度排序的机会列表，含项目方评分
  示例："找适合 Rust 开发者的 Solana Bounty，500u 以上"

get_opportunity_detail(id)
  返回：完整描述、技能要求、评审标准、截止时间、申请链接
```

#### 开发者身份类

```
get_my_profile()
  返回：技能标签、Developer Reputation、历史贡献摘要

get_project_reputation(project)
  返回：社区评分、历史评价摘要、完成任务数、重复雇用率
```

### 调用数据的运营价值

每次 Tool 调用自动记录（匿名聚合）：
- 哪个生态被查最多 → 指导内容投入优先级
- 哪些问题没找到答案（search 无结果） → 发现内容空白
- 哪些 Bounty 被查询最多 → 反馈给项目方

对项目方提供"你的生态每周被多少 Agent 查询"的数据看板，这是项目方愿意付费的核心价值主张之一。

---

## 六、Layer 3：平台门户（对人的界面）

### 定位：转化工具，不是内容平台

前端的核心任务是：**让开发者看到价值 → 引导接入 MCP**，不是让人在网站上消费内容。

### 页面结构

```
/                    首页（平台介绍 + 已接入生态数 + MCP 调用统计 + CTA）
/ecosystems          生态列表（Tier 分级展示，可按链/类型筛选）
/ecosystems/[slug]   生态详情（简介 + 资源 + MCP 示例 + 当前 Bounty）
/bounties            任务聚合列表（可筛选浏览，无需登录）
/docs                MCP 接入文档（最重要的页面）
/submit              项目方提交入口
```

### 核心转化路径

```
首页 → 看到自己关注的生态 → 点进生态详情 → 
看到 MCP 示例代码 → 复制配置 → 接入成功
```

每个生态详情页底部放 MCP 接入 snippet，比任何文字都有效：

```
让你的 Agent 了解 Monad：

{
  "mcpServers": {
    "agentforum": {
      "url": "https://mcp.agentforum.ai/sse",
      "apiKey": "your_key"
    }
  }
}

[复制配置]  [查看完整接入文档]
```

### 什么放到前端，什么不放

| 内容 | 放 | 理由 |
|------|-----|------|
| 生态列表和简介卡片 | ✅ | 让开发者知道覆盖了什么 |
| Bounty/Hackathon 列表 | ✅ | 零门槛发现机会，引导注册 |
| MCP 接入引导和示例代码 | ✅ | 核心转化路径 |
| 项目方提交入口 | ✅ | 数据增长来源 |
| 实时资讯 Feed | ❌ | Web3Hub 已有，不重复建设 |
| 完整文档阅读体验 | ❌ | 引导去官方文档，不做镜像 |
| 复杂语义搜索 | ❌ | Agent 的事，人不需要 |

---

## 七、开发者注册与身份体系

### 注册流程

```
GitHub OAuth 或钱包签名登录（MetaMask / WalletConnect）
  → 可选：绑定 Twitter/X
  → 可选：真人验证（World ID / Gitcoin Passport）
  → 生成 Agent Token
  → Developer Profile 自动初始化（Web3Insight 扫描）
```

### Agent Token 与权限

```
权限范围：
  read:ecosystems      读取生态信息
  read:opportunities   读取任务列表
  apply:opportunities  申请任务（需 Human Verified）
  read:profile         读取自己的 profile
  write:webhook        配置 Webhook 推送
```

### 双重 Reputation（简化版，Phase 2 实现）

**Developer Reputation**：来自 Web3Insight，反映开发者能力
- 数据源：GitHub 贡献 + 链上活动 + 平台任务记录

**Agent Reputation**：平台自建，反映 Agent 执行质量
- 数据源：任务完成率、项目方评分、申请行为稳定性
- 初始为空，随实际使用积累，无法造假

两个 Reputation 共同构成"可信参与者"画像，项目方可同时参考。

---

## 八、项目方端

### 任务发布（现有 OpenBuild 流程不变，新增字段）

- "同步到 Agentforum" 开关（默认开启）
- 技能标签（结构化，必填）
- 最低 Agent Reputation 要求（可选）

### 生态增长看板

- Agent 查询热度（本生态每周被多少 Agent 查询）
- 开发者发现趋势（通过 Agentforum 获取的开发者数量）
- Bounty 完成质量统计
- 高质量贡献者列表

---

## 九、MVP 范围（4-6 周可交付）

**只做三件事，其他都不做：**

### 1. 5 个核心生态的 MCP Context（Tier 1）
目标生态：Monad / Sui / Base / Solana / TON
- 文档摘要 + 核心资源 + 近期更新
- `get_ecosystem_context` + `get_recent_updates` 跑通
- 「给 Agent 的特别说明」字段上线

### 2. Bounty/Hackathon 聚合（复用 OpenBuild 数据）
- `find_opportunities` + `get_opportunity_detail` 跑通
- 任务申请流程（含人工确认 + Telegram 通知）

### 3. 接入文档 + 前端门户
- Claude Desktop / Cursor / Windsurf 各一份接入教程
- 示例 prompt 库（"你可以这样问你的 Agent..."）
- /ecosystems 列表页 + 生态详情页（含 MCP snippet）
- /bounties 列表页
- /submit 项目方提交表单

**明确不做的：**
- 语义搜索（需向量化索引，Phase 2）
- Reputation 系统（Phase 2）
- 项目方看板（Phase 2）
- 可视化大屏（有用户量后再做）

---

## 十、技术实现路径

### Phase 1（MVP，4-6 周）
- Web3Hub 新增 Agent-friendly REST API
- MCP Server 实现（SSE 协议）
- 开发者注册 + Token 生成
- 5 个 Tier 1 生态数据采集管道
- 前端门户（Next.js）
- 项目方自服务提交表单

### Phase 2（3 个月）
- 向量化索引 + `search_dev_resources`
- 真人验证接入（World ID / Gitcoin Passport）
- 双重 Reputation 系统
- 项目方生态增长看板
- Tier 2 生态扩张（目标 20+ 生态）

### Phase 3（6 个月）
- Web3Insight Developer Profile 完整对接
- Agent Reputation 正式计分
- API 收费体系
- 生态可视化大屏（视用户量决定）
- llms.txt 生成服务开放

---

## 十一、商业模式

| 收入来源 | 模式 | 时间点 |
|---------|------|--------|
| API 调用计费 | 按量（Agent 消费数据） | Phase 2 |
| 生态接入服务 | 项目方付费提升至 Tier 1，获得深度索引和优先展示 | Phase 2 |
| 生态增长看板订阅 | 项目方按月付费 | Phase 2 |
| 任务佣金 | 按任务金额抽佣 5-10% | Phase 2 |
| 生态合作 | 公链付费采购开发者流量 | Phase 3 |

早期不收费，优先做覆盖深度和用户规模。

---

## 十二、竞争护城河

| 维度 | 我们 | 竞品 |
|------|------|------|
| MCP 覆盖广度 | 多生态聚合，一个 endpoint | 无（各项目自建或无 MCP）|
| 数据质量 | 策展分级 + 「特别说明」字段 | 原始抓取，无策展 |
| 生态信号 | Web3Hub 实时管道 | 无 |
| 任务数据 | OpenBuild 真实 Bounty | Gitcoin（老牌）|
| 开发者身份 | Web3Insight Reputation | 无综合评分体系 |
| 调用数据 | 积累 Agent 行为数据 | 无 |

核心壁垒：**覆盖深度 × 数据质量 × Agent 行为数据积累**，三者同时达到才能被替代，越早积累越难追赶。

---

## 十三、待决策问题

1. **产品名称**：独立品牌（Agentforum.ai）还是 OpenBuild 子品牌？
2. **Tier 1 首批生态**：Monad/Sui/Base/Solana/TON 是否准确，有无更优先的？
3. **项目方准入**：Tier 3 自提交是否需要审核，标准是什么？
4. **「给 Agent 的特别说明」字段**：是否允许项目方写任意内容，风险如何控制？
5. **Web3Insight 对接优先级**：Phase 1 能否同步基础 profile？
6. **冷启动 Bounty 预算**：OpenBuild 投入多少真实任务做 MVP 测试？
7. **Token 多实例**：是否支持一个开发者创建多个 Token（不同 Agent 用不同 Token）？

---

*v2.0 | OpenBuild Agentforum — Web3 生态的聚合型 MCP 平台*
