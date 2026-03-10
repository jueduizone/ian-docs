# OpenBuild Agentforum — Agent 时代的 Web3 生态基础设施
**产品方案 v0.7 | 2026-03-10**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1 | 2026-03-09 | 初稿 |
| v0.2 | 2026-03-09 | 完整功能详细设计 |
| v0.3 | 2026-03-09 | 身份验证层改为 Billions Network |
| v0.4 | 2026-03-09 | 强化 Agent-native 定位 |
| v0.5 | 2026-03-09 | 改名 OpenBuild Agent，Web3 为第一垂直场景 |
| v0.6 | 2026-03-09 | 改名 OpenBuild Agentforum；MCP 重新定位为数据基础设施；Bounty 增加社区信号功能 |
| v0.7 | 2026-03-10 | 核心定位升级：从"数据基础设施"到"生态基础设施"，核心价值聚焦开发者增长飞轮 |

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

MCP Server（数据 Pipeline 基础设施）是**入口钩子**——让开发者有理由第一次接入，而留住他们的是 Reputation 积累和生态关系网络。

不是 agent 平台（不托管用户的 agent），而是让开发者的 agent 能够：
- 实时获取生态信息（无需自建爬虫和多源适配）
- 发现并精准匹配合适任务
- 积累可信的贡献记录和 Reputation

**一句话**：Agent 时代，让项目生态与开发者持续共同成长。

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
               │ MCP / REST API
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
```

---

## 五、核心功能模块

### 模块 1：生态信息 Feed（P0）

**对 Agent 暴露的能力：**
- `get_feeds(ecosystem, type, since)` — 按生态/类型/时间获取结构化资讯
- `search_feeds(query)` — 语义搜索（"最近 Solana 有什么重要更新"）
- `get_bounties(skills, ecosystem, amount_range)` — 按技能和生态筛选 Bounty
- `get_grants(ecosystem, stage)` — Grant 信息

**数据来源：** Web3Hub 现有数据管道直接复用，补充 OpenBuild Bounty/Hackathon 数据

**对人的呈现：** Agent 返回给开发者的摘要，平台本身不需要复杂 UI

---

### 模块 2：任务市场（P0）

**流程：**
```
项目方发布任务（OpenBuild 后台）
    → 任务结构化存储（技能标签/金额/截止时间/难度）
    → Agent 可查询、筛选、订阅
    → 开发者通过 Agent 了解任务详情
    → 开发者决策后，Agent 辅助准备申请材料
    → 提交申请（仍需人工确认，不全自动）
```

**关键设计：**
- 任务匹配基于 Web3Insight 的开发者技能 profile，精准推荐
- 不做"全自动接任务"，定位为**辅助决策 + 辅助准备**，避免预期落差
- 支持项目方设置"Agent-friendly"标记，表示欢迎 AI 辅助参与

**社区信号（新增）：**

帮助开发者判断"这个项目靠不靠谱"，把口碑数字化：

- **关注度指标**：每个 Bounty/任务显示社区关注度——浏览次数、收藏数、Agent 查询次数
- **项目方评价**：开发者完成任务后可对项目方评分和评价（星级 + 文字），评价公开可见
- **个性化订阅**：开发者可配置自己的 Agent 只关注特定项目方/生态，Agent 查询时自动过滤，减少噪音

---

### 模块 3：Reputation 层（P1）

**数据来源：**
- Web3Insight.ai：GitHub 贡献 + 链上活动 → 技能 profile
- OpenBuild Agentforum：在平台完成的 Bounty/Grant 记录 → 贡献历史
- 第三方身份验证（Billions Network）：人证绑定

**对外暴露：**
- `get_developer_profile(github_handle / wallet)` — 开发者能力快照
- 开发者可授权项目方直接查询其 profile
- 每次完成任务自动回写 Web3Insight，形成复利积累

**数据权属：**
- 所有原始数据归开发者
- 平台只存聚合的 reputation 分数和贡献记录
- 开发者可随时导出、撤销授权

---

### 模块 4：MCP Server（P0）

MCP Server 是 Agentforum 的核心交付物——它是 Web3 数据基础设施的统一接入点，让开发者的 Agent 无需自建任何数据管道即可消费结构化的 Web3 信息。

**一行接入：**
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

加入 Claude Desktop / Cursor 配置后，开发者的 agent 即可直接使用所有 tool。

**提供的 MCP Tools：**
- `web3_news` — 获取生态最新资讯（已聚合、已翻译、已结构化）
- `find_bounties` — 查找匹配的任务，支持社区信号过滤
- `get_my_profile` — 查看自己的 reputation
- `ecosystem_overview` — 某个生态的整体动态
- `get_project_reputation` — 查询项目方的社区评分和历史评价

---

## 六、用户旅程

### 开发者侧
```
1. 注册 OpenBuild Agentforum，绑定 GitHub + 钱包
   → Web3Insight 自动生成初始 profile

2. 在 Claude Desktop / Cursor 配置 MCP
   → 一次性操作，5 分钟内完成

3. 每天问 Agent："今天 Monad 生态有什么值得关注的？"
   → Agent 调用 web3_news，返回摘要

4. Agent 主动推送："发现 3 个匹配你技能的 Bounty，要看看吗？"
   → find_bounties 基于 profile 自动筛选，并附上项目方评分

5. 完成 Bounty 后，贡献自动记录到 Web3Insight profile
   → 下次匹配质量更高，并可对项目方留下评价
```

### 项目方侧
```
1. 在 OpenBuild 后台发布任务（现有流程）
2. 勾选"同步到 OpenBuild Agentforum"
3. 任务自动进入 Agentforum 数据层，被开发者 Agent 发现
4. 可查看申请者的 Web3Insight profile，直接评估能力
5. 任务完成后，积累社区评分，提升未来任务的曝光和信任度
```

---

## 七、冷启动策略

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
- 在 Web3 开发者社区做 MCP 接入教程（内容营销）
- 上线社区信号功能，积累项目方评价数据

### 第三阶段（10→100，6个月）
**目标：** Reputation 层打通，形成飞轮

- Web3Insight profile 与 Agentforum 任务记录双向同步
- 项目方可用 Agentforum 做开发者背调
- 开放 API 收费

---

## 八、商业模式

| 收入来源 | 模式 | 时间点 |
|---------|------|--------|
| 项目方任务上架 | 按任务金额抽佣（5-10%）| 第二阶段 |
| API 调用 | 按量计费（Agent 消费数据）| 第二阶段 |
| 生态合作 | 公链/协议付费采购开发者流量 | 第三阶段 |
| 开发者能力认证 | Web3Insight 高级 profile 订阅 | 第三阶段 |

**早期不收费**，先做用户规模和数据积累。

---

## 九、竞争分析

| 竞品 | 优势 | 缺陷 |
|------|------|------|
| Gitcoin | 品牌强、用户多 | 无 Agent 接入、无能力评估 |
| Dorahacks | Hackathon 专注 | 信息不完整、无 reputation |
| Questbook | Grant 专注 | 垂直、无生态信息层 |
| **OpenBuild Agentforum** | Agent-native + 数据基础设施 + Reputation + 社区信号四合一 | 新品牌、需要冷启动 |

护城河：**三层飞轮**（Web3Hub 数据 + OpenBuild 任务生态 + Web3Insight Reputation 三源打通，竞争对手无法复制）+ **社区口碑数据**（项目方评价随时间积累，形成独特护城河）+ **Agent 时代的先发入口**（率先成为开发者 Agent 的 Web3 数据源，形成使用习惯壁垒）

---

## 十、待决策问题

1. **第一阶段 Bounty 预算**：OpenBuild 能投入多少真实 Bounty 做冷启动测试？
2. **Billions Network 接入排期**：何时启动身份验证层对接？
3. **Web3Insight API 打通**：何时启动内部对接排期？
4. **社区信号冷启动**：初期项目方评价数据为零，如何建立初始可信度？

---

*方案版本 v0.7，OpenBuild Agentforum — Agent 时代的 Web3 生态基础设施*
