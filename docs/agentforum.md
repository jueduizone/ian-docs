# AgentRel — Agent 时代的 Web3 生态知识基础设施
**产品文档 v2.0 | 2026-03-15**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1–v0.6 | 2026-03-09 | 初稿迭代，MCP 定位、产品命名、功能设计 |
| v0.7–v1.1 | 2026-03-10 | 核心定位：生态基础设施，开发者增长飞轮；双重 Reputation 体系 |
| v2.0 | 2026-03-15 | **重大升级**：产品改名 AgentRel；新增 toB 服务模式；确立"知识包"核心定位；配置驱动架构设计；明确 Monad/Solana 为 Phase 1 目标 |
| v2.1 | 2026-03-15 | 新增 toD（开发者端）完整设计：两类用户分层、免费策略、Reputation 留存机制、分发渠道、核心指标；ToD UX 用户旅程详细设计 |
| v2.2 | 2026-03-15 | 输出格式扩展：MCP / Skill / llms.txt / REST API 四种格式并行；技术架构文档独立（agentforum-tech-arch.md）；用户群扩展至 Claude Code / OpenClaw 用户 |

---

## 一、背景与机会

### 核心判断：DevRel → AgentRel 时代正在发生

开发者与工具、生态之间的中间层正在被 AI Agent 取代。过去是：**开发者查文档 → 看教程 → 试 API**。现在是：**开发者 prompt → Agent 查文档/调 API/写代码**。

这意味着：**生态能不能被 Agent "理解"，决定了你在这波开发者里的存在感。**

传统 DevRel 的触达路径：`DevRel → 开发者`

Agent 时代的新路径：`DevRel → Agent → 开发者`

所以 DevRel 的工作重心正在发生迁移——不再只是写博客、做 Workshop，而是**让你的生态知识进入开发者 Agent 的上下文**。谁能做到这一点，谁就掌握下一代开发者流量入口。

### 现状：Web3 MCP 生态严重不均衡

**已有官方 MCP 的（少数）：**
- Chainlink：开发者 MCP，访问 CCIP/Data Feeds 文档 + 代码示例
- Chainstack：RPC 调用 + 文档查询
- Tatum：130+ 链区块/交易/余额查询
- Thirdweb：链上执行 + 文档查询

**无官方 MCP 的（绝大多数）：**
- Uniswap、Aave、MakerDAO 等 DeFi 协议：无官方 MCP
- Ethereum、Solana、Base 等主链：协议层动态无 MCP
- Dune Analytics、Nansen 等数据平台：第三方零散实现

**真正的空白地带：**
- 跨链、跨协议的动态信息聚合（治理/安全/Bounty/生态更新）
- 开发文档 + 基础知识 + 实时动态的完整知识包
- Agent 可消费的、有实时性保证的 Web3 知识基础设施

### 时机

MCP 协议普及让 Agent 调用外部数据源成为标准操作（Cursor/Claude Desktop/Windsurf 等主流工具原生支持）。`llms.txt` 标准出现，文档 AI 可读性成为新的基础设施需求。没有任何平台真正解决"Web3 生态 × Agent 可消费知识"这个命题——这是先发窗口。

---

## 二、产品定位

> **AgentRel = Agent 时代 Web3 生态的知识基础设施**

### 核心价值主张

**面向项目方（ToB 核心）：**
你的生态文档、技术知识、最新动态，全部结构化并以 MCP endpoint 形式对外暴露——让全球使用 Cursor/Claude/自建 Agent 的开发者，在写代码时随时能调用你的生态知识。这是 Agent 时代的 DevRel 基础设施。

**面向开发者（ToC 飞轮）：**
你的 Agent 成为最懂 Web3 生态的助手——接一个 MCP endpoint，获取主流 Web3 生态的文档/动态/Bounty，不需要自建任何爬虫和多源适配。

### 产品是什么

AgentRel 为每个 Web3 生态提供一套完整的 **"Agent 可消费知识包"**，三层结构：

```
┌─────────────────────────────────────┐
│  Layer 3：生态动态（实时）             │
│  升级公告、治理提案、安全告警、Bounty  │
├─────────────────────────────────────┤
│  Layer 2：基础知识（持续更新）         │
│  概念解释、架构设计、最佳实践          │
├─────────────────────────────────────┤
│  Layer 1：开发文档（保鲜同步）         │
│  官方文档、API Reference、示例代码    │
└─────────────────────────────────────┘
```

三层缺一不可。只有文档，Agent 不知道协议有没有重大变更；只有动态，Agent 没有基础知识做判断。完整的知识包才能让 Agent 真正"理解"一个生态。

### 产品不是什么

- 不是 Agent 平台（不托管用户的 Agent）
- 不是文档搜索工具（不只是静态索引）
- 不是任务市场（任务是数据，不是平台核心）
- 不是 RPC 网关（基础设施层已有 Tatum/Chainstack，不竞争）

---

## 三、商业模式（ToB 为主）

### 目标客户

| 客户类型 | 痛点 | 支付意愿 |
|---------|------|--------|
| L1/L2 基金会 | 开发者增长压力，但没能力自建 AgentRel 基础设施 | 高，有 DevRel 预算和 grant 资金 |
| DeFi 协议方 | 文档乱、更新慢，开发者集成体验差 | 中高，直接影响 TVL 和集成数量 |
| 开发工具公司 | 希望进入开发者 Agent 的工具链 | 中，视增长效果付费 |

### 服务层级

**基础版（SaaS，标准化）**
- 客户提供：官方文档 URL、GitHub repo、官方社媒账号
- AgentRel 产出：托管的 MCP endpoint + 自动同步更新 + 基础 Dashboard
- 定价：按生态/月订阅（类似 GitBook 托管文档的逻辑）

**进阶版（定制知识包）**
- 三层完整知识包：文档 + 基础知识库 + 实时动态
- 推送进主流 Agent 平台注册表（Cursor Directory、Claude MCP list）
- 对客户的价值：让 10 万个用 Cursor 的开发者的 Agent 里默认有他们的生态知识

**旗舰版（AgentRel 整体策略）**
- 知识包 + 分发渠道 + 效果数据看板
- 类似 OpenBuild 帮生态做开发者增长，但目标受众从人变成了 Agent
- 联合运营，按效果收费

### OpenBuild 优势

OpenBuild 现有生态客户关系是核心资产。把现有客户从"帮你做 Hackathon/课程"升级成"帮你做 AgentRel"——客单价更高，且这件事他们自己做不了（没有技术积累）。

### 最快验证路径

拿一个现有 OpenBuild 合作生态，先**免费**帮他们做完整的 MCP endpoint，跑通后：
- 数据拿去做销售（"接入后 X 个开发者 Agent 在使用"）
- 成为标准服务套餐的案例

---

## 四、Phase 1 目标生态

### Monad（先谈商务）

**理由：** 主网刚启动，生态开发者大量涌入，文档仍在建设期。这正是最需要 AgentRel 的阶段。Monad 基金会有 grant 预算、有增长压力，先接触 DevRel 团队谈合作 MOU，可以获得内部文档资源和联合推广。

**知识包内容：**
```
核心概念
├── 并行 EVM 原理（与标准 EVM 的差异）
├── 异步执行模型对合约的影响
├── 状态冲突检测机制
└── 与 Ethereum 的兼容性边界

开发实践
├── 开发环境搭建（Hardhat/Foundry on Monad）
├── 并行安全的合约写法 pattern
├── 常见踩坑（reentrancy 在并行执行下的新问题）
└── Testnet/Mainnet RPC endpoint

生态动态
├── 官方 blog + 技术更新（daily sync）
├── 生态项目进展
├── Grant 申请动态
└── 核心开发者讨论（Twitter/Discord）
```

### Solana（先建产品）

**理由：** 开发者基数大，`web3.js v1 → v2` 有大量 breaking change 导致旧教程大量过期，官方 docs + Anchor docs + Solana Cookbook 各自为政，混乱程度是 Web3 开发工具里最高的。Agent 辅助价值最大，也最容易验证产品效果。

**知识包内容：**
```
核心概念
├── Accounts model 详解（vs EVM storage）
├── PDA（Program Derived Address）
├── CPI（Cross-Program Invocation）
└── Rent / Lamports 机制

开发工具
├── Anchor framework（最新版本，跟踪 breaking changes）
├── web3.js v2 迁移指南（重点标注 v1 vs v2 差异）
├── Solana CLI 常用命令
└── Metaplex（NFT 标准）

实时动态
├── 网络状态（近期是否有拥堵/outage）
├── 协议升级动态
├── 生态热点项目
└── Bounty / grant 信息
```

### Phase 1 完整 MCP 覆盖清单

**开发工具层（最高频）：**
- Hardhat / Foundry
- OpenZeppelin（合约标准库）
- Ethers.js / Viem
- Wagmi / RainbowKit

**主链生态包：**
- Ethereum（EIP 动态 + 客户端升级 + 生态治理）
- Solana（见上）
- Monad（见上）
- Base（OP Stack 文档 + Coinbase 生态）
- Arbitrum（Stylus/Nitro 技术文档）

**DeFi 协议层：**
- Uniswap v4（hooks 开发文档，变化最大）
- Aave（借贷协议集成）
- Chainlink（预言机接入，补充官方 MCP 覆盖不完整的部分）
- LayerZero（跨链消息开发）
- EigenLayer（AVS 开发文档，热点且文档乱）

**安全 + Bounty（差异化最强，无人在做）：**
- Immunefi Bounty 实时列表
- 主流协议审计报告库
- 链上安全事件追踪

---

## 五、核心架构：配置驱动，不写定制代码

### 设计原则

扩展第 10 个生态的成本要和扩展第 2 个一样低。**每个生态 = 一份配置文件，不允许硬编码任何生态特定逻辑。**

### 数据源配置格式

```yaml
# monad.yaml
id: monad
name: Monad
category: l1-evm

sources:
  docs:
    - url: https://docs.monad.xyz
      type: gitbook        # gitbook/docusaurus/mkdocs/github-pages/custom
      sync: daily
      priority: high
  github:
    - repo: monad-labs/monad-docs
      track: commits       # 追踪文档变更
      branch: main
  blog:
    - url: https://monad.xyz/blog
      type: rss
      sync: hourly
  twitter:
    - handle: monad_xyz
      filter: technical    # 过滤营销内容，只保留技术动态
  discord:
    - channel: dev-announcements
      type: announcement_only

schema:
  tags: [evm, parallel-execution, l1]
  language: solidity
  related: [ethereum, arbitrum]

quality:
  trust_level: official    # official/community/third-party
  review_required: true    # 初次导入需人工 review
```

### Pipeline 架构

```
Config（YAML）
    ↓
采集层（按 type 路由到对应 Adapter）
    ↓
清洗层（通用 Pipeline：去重 / 内容提取 / 格式归一化）
    ↓
处理层（AI：分类 / 摘要 / 质量评分 / 向量化）
    ↓
知识库（统一 Schema，带质量元数据）
    ↓
MCP endpoint（自动生成，统一接口）
```

### Adapter 层

文档类型就那几种，写 5-6 个 Adapter 覆盖 90% 情况：

| Adapter | 覆盖场景 |
|---------|--------|
| `gitbook` | GitBook 托管文档（大多数 Web3 项目） |
| `docusaurus` | Docusaurus（React 生态、部分 Web3 项目） |
| `mkdocs` | MkDocs（Python 生态，部分区块链项目） |
| `github-pages` | GitHub Pages 静态文档 |
| `rss/atom` | 博客、更新日志 |
| `twitter-api` | 官方 Twitter 技术内容过滤 |
| `discord-webhook` | Discord 公告频道（需项目方授权） |

新生态的文档大概率命中已有 Adapter，直接复用，不写新代码。

### 内容质量元数据

每条内容都带质量评分，Agent 自己判断可信度：

```json
{
  "content": "...",
  "metadata": {
    "source": "official_docs",
    "trust_level": "official",
    "freshness_score": 0.95,
    "published_at": "2026-03-15T10:00:00Z",
    "last_verified_at": "2026-03-15T18:00:00Z",
    "completeness_score": 0.87,
    "ecosystem": "monad",
    "layer": "docs"
  }
}
```

### 变更追踪（控制成本的关键）

不做全量爬取，只处理 diff：

- 文档：追踪 GitHub commit hash，只重新处理变更的页面
- 博客：RSS/Atom 增量拉取
- 动态：按更新频率设置轮询间隔（技术公告 hourly，静态文档 daily）

### 初期接入成本

| 步骤 | 时间 | 人工 |
|------|------|------|
| 写数据源 YAML 配置 | 30 分钟 | 是 |
| 初次导入 + 质量 review | 1-2 小时 | 是 |
| 后续自动同步 | 0 | 否（自动） |
| 数据源结构变更报警处理 | 按需 | 是（偶发） |

---

## 六、数据来源

### Web3Hub（已有，作为 AgentRel 的动态数据层）

Web3Hub 的采集 + AI 处理 pipeline 直接复用为 AgentRel 的动态信息数据源之一：
- 每天采集 10+ 数据源
- AI 评分（developer_relevance、quality）
- 去重、分类、摘要生成

Web3Hub → AgentRel 的接入：增加一个 API 接口，按 ecosystem 标签查询高质量内容。

### 待建：文档爬虫 + Diff 追踪

专门处理静态/半静态文档的变更追踪，独立于 Web3Hub 的新闻采集器。

### 规划中：社区知识沉淀

Discord / Forum / GitHub Issues 的知识挖掘——最难、成本最高，但也是最有价值的差异化数据源。Phase 2-3 再做。

---

## 七、多格式输出设计（MCP 只是其中之一）

### 核心设计原则

AgentRel 是**知识源**，不是"MCP 提供商"。知识统一存储，输出格式按不同 Agent 平台需求适配——MCP 被诟病太重，不能是唯一路径。

```
统一知识库
    ↓
输出适配层
    ├── MCP endpoint    → Claude Desktop / Cursor / Windsurf
    ├── Skill 包        → OpenClaw / Claude Code / 自建 Agent
    ├── llms.txt        → 任何 LLM（最轻量）
    └── REST API        → 自建 Bot / LangChain / RAG pipeline
```

### 各格式适用场景

| 格式 | 适用平台 | 特点 |
|------|--------|------|
| **MCP Server** | Claude Desktop、Cursor、Windsurf | 重度集成，实时调用，需跑服务进程 |
| **Skill 包** | OpenClaw、Claude Code、各类 Agent 框架 | 轻量，纯文件，fork 即用，GitHub 天然传播 |
| **llms.txt** | 任何 LLM | 零成本消费，配合 system prompt，项目方标准配置 |
| **REST API** | 自建 Telegram Bot、LangChain、自定义 Agent | 完全灵活，开发者自己控制调用逻辑 |

### 为什么 Skill 很重要

- **零部署成本**：不需要跑服务进程，纯文本 + 脚本
- **离线可用**：静态知识文件可离线使用
- **GitHub 传播**：每个生态的 Skill 包独立仓库，star/fork/PR 是天然分发渠道
- **OpenClaw / Claude Code 用户**：这批用户不会配 MCP，但会用 `clawhub install agentrel/solana`

### Skill 包结构

```
agentrel-skills/solana/
├── SKILL.md                # 技能说明（OpenClaw AgentSkills 规范）
├── knowledge/
│   ├── core-concepts.md    # 核心概念（自动从知识库生成，每周更新）
│   ├── dev-setup.md
│   ├── common-patterns.md
│   └── gotchas.md
├── scripts/
│   ├── get-updates.sh      # 调 AgentRel API 获取最新动态
│   ├── get-bounties.sh
│   └── check-security.sh
└── references/
    ├── api-quick-ref.md
    └── error-codes.md
```

### llms.txt 作为即时 toB 价值

帮项目方自动生成并托管 `llms.txt` + `llms-full.txt`，托管于 `agentrel.ai/<ecosystem>/llms.txt` 或客户自己域名。动态信息每小时自动刷新。这是 toB 服务里**最快交付的即时价值**，项目方不需要做任何开发。

详细接口设计见《AgentRel 技术架构文档》。

---

## 八、开发者端（ToC 飞轮）

### 接入方式

```json
{
  "mcpServers": {
    "agentrel": {
      "url": "https://mcp.agentrel.ai/sse",
      "headers": {
        "Authorization": "Bearer <api_key>"
      }
    }
  }
}
```

### Tool 列表

#### 知识查询类

```
get_ecosystem_docs
  参数: ecosystem, query(可选), section(可选), since
  返回: [{content, source_url, trust_level, freshness, section}]

get_ecosystem_updates
  参数: ecosystem, type(upgrade/governance/security/bounty), since, limit
  返回: [{title, summary, type, source, published_at, importance}]

get_security_alerts
  参数: ecosystem(可选), severity(critical/high/medium)
  返回: 安全事件列表，含影响范围和建议措施

get_bounties
  参数: ecosystem, skills, amount_min, deadline_before
  返回: Bounty 列表（来自 Immunefi + OpenBuild）

get_ecosystem_overview
  参数: ecosystem
  返回: 该生态的整体状态摘要

compare_ecosystems
  参数: ecosystems[], aspect(dev_activity/docs_quality/bounty_count)
  返回: 跨生态对比数据
```

---

双重 Reputation：**Agent Reputation**（Agent 行为轨迹）+ **Developer Reputation**（开发者能力画像）

详见 v1.1 文档第三章，此处不重复。

### 任务市场

Bounty/Grant/Hackathon 的结构化数据层，Agent 可查询和匹配。详见 v1.1 文档第二章。

---

## 九、竞争壁垒

| 维度 | 竞品现状 | AgentRel 优势 |
|------|--------|------------|
| 覆盖广度 | 各生态自己的 MCP 只覆盖自己 | 跨生态统一入口 |
| 动态信息 | 无任何 MCP 做实时生态动态 | Web3Hub 现有 pipeline |
| 安全/Bounty | 无 MCP 覆盖 | 差异化数据源 |
| 客户关系 | 竞品无生态客户资源 | OpenBuild 现有合作生态 |
| 数据飞轮 | 无 | Web3Hub + OpenBuild + Web3Insight 三源 |

**核心护城河：** 配置覆盖的生态越多，数据越完整，对新生态客户的说服力越强，形成正向飞轮。先发优势是真实的。

---

## 十、技术实现路径

### Phase 1（6-8 周）：验证可行性

**目标：** 跑通 Monad + Solana 知识包，有可演示的 MCP endpoint

- 实现配置驱动的采集 pipeline（支持 gitbook / rss / twitter adapter）
- Web3Hub 数据接入（按 ecosystem 标签 API 化）
- MCP Server MVP（SSE 协议，支持核心 Tool 查询）
- 接入 Monad 和 Solana 完整知识包
- 人工 review 初始知识库质量

**交付物：**
- `mcp.agentrel.ai` 可用的 MCP endpoint
- Monad + Solana 知识包上线
- 能跑的 Cursor/Claude Desktop 接入 demo

### Phase 2（3 个月）：ToB 商业化

**目标：** 第一个付费生态客户

- 扩展主链生态包（Ethereum/Base/Arbitrum/BNB）
- 开发工具层知识包（Hardhat/OZ/Viem/Wagmi）
- 安全 + Bounty 层（Immunefi 接入）
- 项目方 Dashboard（知识包状态 + Agent 查询统计）
- 面向 Monad 基金会的合作提案

### Phase 3（6 个月）：规模化

**目标：** 5+ 付费生态，开发者 MAU 1 万+

- DeFi 协议层全覆盖
- Developer Reputation 与 Web3Insight 打通
- 社区知识沉淀（Discord/Forum）
- API 按量计费
- 生态活动可视化大屏（斯坦福小镇风格，需有数据支撑）

---

## 十一、待决策问题

1. **域名**：`agentrel.ai` 是否可注册？如果不行备选方案是什么？
2. **独立品牌 vs OpenBuild 子品牌**：AgentRel 独立出去还是作为 OpenBuild 产品线？
3. **第一个 toB 客户**：从哪个现有 OpenBuild 合作生态开始免费试点？
4. **Monad 合作谈判时机**：Phase 1 MVP 完成前还是完成后去谈？
5. **Web3Insight 对接优先级**：Phase 1 能同步基础 profile，不等 Phase 3？
6. **开发者端免费策略**：ToC 端永久免费还是有调用量限制？
7. **Web2 扩展时机**：先把 Web3 做深，Web2 机会等自然出现还是主动规划？
8. **Telegram Bot 优先级**：B 类用户的核心接入点，Phase 1 是否先做？
9. **公共 Key 限额**：每天 200 次是否合适，防止滥用的机制？

---

## 十二、ToD（面向开发者端）设计

### ToD 的战略定位

ToD 不是商业模式的核心，但是**信任背书和增长飞轮的基础**。项目方买单的逻辑是"X 万开发者的 Agent 在用你的数据"——这个数字要靠 toD 端积累。

**ToD 设计的唯一目标：最低门槛让开发者用起来，留住，产生数据。**

---

### 两类开发者，两条路径

**A 类：用 Agent 写 Web3 代码的开发者（技术驱动）**
- 核心需求：Cursor/Claude 能理解 Solana PDA、Uniswap v4 hooks、Monad 并行 EVM
- 接入动机：主动寻找开发工具，愿意配置 MCP
- 触达渠道：Cursor Directory、Claude MCP list、Twitter 技术教程

**B 类：找 Bounty/Grant 的 Web3 开发者（任务驱动）**
- 核心需求：Agent 帮我筛选适合我的任务机会
- 接入动机：提高接任务效率，积累 Reputation
- 触达渠道：OpenBuild 站内导流、Telegram Bot

两类用户 onboarding 路径分开设计，不强迫走同一个流程。

---

### 免费策略

ToD 端必须有足够慷慨的免费档，否则无法积累足够的用户数据给 toB 客户看。

```
公共档（无需注册）：
- 查询公开生态文档/动态：每天 200 次
- Bounty 浏览：无限
- 使用公共 API Key，无个性化

注册档（绑 GitHub 或钱包）：
- 文档/动态查询：无限
- 个性化推送（基于技能 profile 匹配 Bounty）
- Bounty 申请资格
- Developer + Agent Reputation 积累开始计入
- 永久免费

付费档（$9/月，未来）：
- 优先推送高价值 Bounty
- Reputation 详细分析报告
- 私有知识库接入（把自己的项目文档加入 Agent 上下文）
```

公共档的存在理由：Cursor Directory 上的开发者不需要注册就能体验，零摩擦，第一步不要拦人。

---

### Reputation 是留存的核心钩子

开发者在 AgentRel 积累的 Reputation 是迁移成本：
- Agent 调用记录越多 → Agent Reputation 越高
- 完成任务越多 → Developer Reputation 越高
- Reputation 高的开发者能被项目方主动发现、邀请

**Day 1 就要开始无感收集数据**，即使初期不展示给用户，数据要先存起来。

---

### 分发渠道

```
主动渠道：
1. Cursor Directory / Claude MCP list   → A 类技术型开发者
2. OpenBuild 站内推送                   → B 类任务型开发者
3. Solana/Monad Discord #dev-tools      → 生态开发者
4. Twitter 技术教程（中英文）            → 广泛触达

内容钩子（自动生成，开发者主动传播）：
- 每周 "Web3 生态 Agent 报告"（AgentRel 数据生成）
- "你的 Agent 不知道的 10 个 Uniswap v4 变化"（教程 + 产品植入）
- "用 AgentRel + Claude 30 秒搞懂 Solana PDA"（上手 demo）
```

---

### 核心指标（只盯三个）

| 指标 | 定义 | 用途 |
|------|------|------|
| **MCP 接入数** | 配置了 AgentRel MCP 的开发者数量 | 卖给项目方的核心数字 |
| **月活调用量** | 知识包被 Agent 调用次数/月 | 证明使用深度 |
| **Bounty 完成率** | 通过平台申请并完成的任务比例 | 产品质量验证 |

---

### ToD ↔ ToB 飞轮

```
ToD 用起来 → 积累调用数据
    ↓
调用数据 → 证明给项目方：你的生态被 X 个 Agent 关注
    ↓
项目方付费 → 知识包覆盖更多生态
    ↓
更多生态 → 对开发者更有价值 → 更多开发者接入
    ↓
飞轮形成
```

**冷启动破局点：** Monad + Solana 知识包上线后，在两个生态的 Discord/Twitter 密集做教程，把前 100 个活跃用户拉进来。有了调用数据，再去找第一个付费客户才有底气。

---

### ToD UX 设计

#### UX 原则

1. **Agent 是主角，不是人** — UI 服务于"让 Agent 配置和使用"，而不是让人在网页上操作
2. **5 分钟内跑起来** — 从看到产品到 Agent 能调用 AgentRel，不超过 5 分钟
3. **不强迫注册** — 公共 API 先用，有了价值感再注册
4. **Reputation 可见** — 用户随时能看到自己积累了什么，留存感

---

#### UX Flow A：技术型开发者（Cursor/Claude 用户）

```
发现阶段
└── Cursor Directory 搜索 "web3" 找到 AgentRel
    或 Twitter 看到教程文章
    或 朋友推荐

第 1 步：零门槛试用（无需注册）
└── 复制公共配置（30 秒）：
    {
      "mcpServers": {
        "agentrel": {
          "url": "https://mcp.agentrel.ai/sse",
          "headers": { "Authorization": "Bearer public_demo_key" }
        }
      }
    }
└── 在 Cursor 里问："Solana 里 PDA 是什么？"
└── Agent 调用 get_ecosystem_docs，返回结构化解释 + 来源链接
└── 有价值感 ✅

第 2 步：注册（有了价值感才引导）
└── 首次调用 5 次后，Tool 返回软提示：
    "注册免费账号解锁个性化推送和无限调用"
└── GitHub OAuth 一键注册（不填表单）
└── 注册完成，自动扫描 GitHub → 生成初始 Developer Profile
└── 生成个人 API Key，替换公共 Key

第 3 步：个性化激活
└── 首次登录引导页（30 秒完成）：
    "选择你关注的生态" → [Ethereum / Solana / Monad / Base / ...]
    "你主要写什么" → [Solidity / Rust / TypeScript / ...]
└── 完成后 Agent 推送立刻变得精准

第 4 步：深度留存
└── 每周推送："本周 Solana 生态 3 个重要更新，你的 Agent 已同步"
└── 首个匹配 Bounty 推送："发现 1 个匹配你技能的任务，$500 USDC"
└── Reputation Dashboard 可见：
    Agent Reputation: ██░░░ 正在积累（已有 23 次调用）
    Developer Reputation: ███░░ 基于 GitHub 生成（78 分）
```

**关键时间节点：**
- T+0：看到产品
- T+1min：第一次调用跑起来
- T+5min：拿到有价值的回答
- T+10min：注册，扫描 GitHub，profile 生成
- T+1day：收到第一条个性化推送

---

#### UX Flow B：任务型开发者（Bounty/Grant 猎手）

```
发现阶段
└── OpenBuild 首页 Banner："用 Agent 找任务，更快更精准"
    或 Telegram 群里看到分享

第 1 步：OpenBuild 一键开启（无需重新注册）
└── 已登录 OpenBuild 的用户点击开启 AgentRel
└── 自动同步 OpenBuild 身份
└── 自动生成 API Token
└── 引导配置 Telegram Bot

第 2 步：Telegram Bot 激活
└── "/start"
└── Bot："你的 AgentRel 已就绪。问我 Web3 问题，或让我帮你找 Bounty。"
└── "帮我找适合 Rust 开发者的 Bounty"
└── Bot 返回匹配列表：[项目名 / 金额 / 截止日 / 技能匹配度]

第 3 步：任务申请
└── "申请第 2 个"
└── Bot："确认申请 Sui 生态 Bounty，$800 USDC，截止 3/30？[确认] [取消]"
└── 确认 → 申请提交 → 通知项目方
└── 项目方接受 → Bot："🎉 你的申请被接受了！"

第 4 步：Reputation 积累可见
└── 完成任务后 Bot："你的 Developer Reputation 更新了，+15 分"
└── "/profile" 查看当前状态
└── "/bounties" 查看历史记录
```

---

#### 关键页面设计

**首页（主要面向潜在用户）**

```
[Hero]
"让你的 Agent 理解 Web3"
接一个 MCP，获取 20+ 主流生态的文档/动态/Bounty

[快速上手]
# 30 秒接入 Cursor
{配置代码，一键复制}
已有 X,XXX 个开发者的 Agent 在使用

[生态展示]
[Monad] [Solana] [Ethereum] [Base] [Uniswap] [Chainlink] ... 等 20+

[数据信任背书]
📊 本月 Agent 调用次数：XXX,XXX
🔥 最近更新：Monad（2 小时前）/ Solana（45 分钟前）
```

**Dashboard（已注册用户）**

```
左侧导航：我的 Agent / Reputation / Bounty / 关注生态

主区域：
┌─────────────────────────────────────┐
│ 今天，你关注的生态动态               │
│ • Solana: web3.js v2.1.0 发布       │
│ • Monad: 新 grant 轮开放             │
│ • Uniswap: v4 审计报告发布           │
└─────────────────────────────────────┘

┌───────────────┬─────────────────────┐
│ 推荐 Bounty   │ Reputation 状态     │
│ 3 个匹配      │ Agent Rep: 42       │
│ 最高 $2000    │ Dev Rep: 78         │
│ [查看全部]    │ [查看详情]          │
└───────────────┴─────────────────────┘
```

**生态知识包页面（对外可见，toB 展示用）**

```
[Solana 知识包]

覆盖状态：
✅ 官方文档（2 小时前同步）
✅ Anchor 文档（6 小时前同步）
✅ web3.js v2 迁移指南
✅ 实时动态（最新 45 分钟前）
🔜 Discord 社区知识（即将上线）

Agent 调用统计：本月 XX,XXX 次
接入方式：[复制 MCP 配置]
```

---

#### 防坑清单

**绝对不能做：**
- ❌ 注册才能试用（第一步就拦人）
- ❌ 配置超过 3 步（开发者失去耐心）
- ❌ 第一次调用返回空结果（冷启动期知识库要先填充好再公开）
- ❌ 推送太频繁（每天超过 3 条会关掉通知）
- ❌ Reputation 只涨不解释（用户不知道怎么提升会失去动力）

**必须做对：**
- ✅ 公共 Key 零门槛，5 分钟内有价值感
- ✅ GitHub OAuth 一键注册，不填表单
- ✅ 注册后 24 小时内收到第一条个性化推送
- ✅ Reputation 变化有解释（"+5 分，因为完成了 Bounty #123"）
- ✅ MCP 调用出错有清晰 error message

---

## 附：名称变更说明（AgentForum → AgentRel）

**AgentForum** 暗示"社区/论坛"，与产品实际定位（知识基础设施）不匹配。

**AgentRel** 更精准：
- 直接占位新品类——如同 "DevRel" 定义了一个行业，"AgentRel" 宣告了 Agent 时代的新范式
- 含义双关："Agent Relations"（生态与 Agent 的关系层）+ "Relevant to Agents"（对 Agent 有价值的）
- 与 OpenBuild 的 DevRel 定位一脉相承，延续性强
- 比 AgentForum 更有品类占位的野心

---

*v2.1 | AgentRel — Agent 时代的 Web3 生态知识基础设施*
*基于 AgentForum v1.1（2026-03-10）迭代升级*
