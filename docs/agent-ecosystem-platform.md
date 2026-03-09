# AgentHub — Web3 生态 AI 劳动力平台
**产品方案 v0.1 | 2026-03-09**

---

## 一、背景与机会

### 问题
Web3 生态的开发者面临三个核心痛点：
1. **信息过载**：生态资讯、Bounty、Grant、Hackathon 分散在 Twitter、Discord、各项目官网，每天刷信息本身就是一份工作
2. **机会错配**：有能力的开发者错过任务，项目方找不到合适的贡献者
3. **贡献不可见**：做了大量工作但没有可信的能力证明，在下一个项目里仍需从零开始

### AI 时代的新范式
开发者不再直接订阅信息、手动找任务——他们通过**自己的 AI Agent** 完成这一切。平台的核心用户从"人"变成了"人 + Agent 的组合体"。

### 时机
MCP（Model Context Protocol）的普及让 Agent 调用外部数据源成为标准操作。现在没有任何 Web3 信息平台是真正 Agent-native 的，这是先发窗口。

---

## 二、产品定位

> **AgentHub = Web3 生态开发者的 AI co-pilot 基础设施**

不是 agent 平台（不托管用户的 agent），而是让开发者的 agent 能够：
- 实时获取生态信息
- 发现并匹配合适任务
- 提交可信的贡献记录

**一句话**：你的 Agent，连接整个 Web3 生态。

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
│                  AgentHub 平台                     │
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

---

### 模块 3：Reputation 层（P1）

**数据来源：**
- Web3Insight.ai：GitHub 贡献 + 链上活动 → 技能 profile
- AgentHub：在平台完成的 Bounty/Grant 记录 → 贡献历史
- 第三方身份验证（World ID / Gitcoin Passport）：人证绑定

**对外暴露：**
- `get_developer_profile(github_handle / wallet)` — 开发者能力快照
- 开发者可授权项目方直接查询其 profile
- 每次完成任务自动回写 Web3Insight，形成复利积累

**数据权属：**
- 所有原始数据归开发者
- 平台只存聚合的 reputation 分数和贡献记录
- 开发者可随时导出、撤销授权

---

### 模块 4：MCP Server（P1）

**一行接入：**
```json
{
  "mcpServers": {
    "agenthub": {
      "url": "https://mcp.agenthub.ai",
      "apiKey": "your_key"
    }
  }
}
```

加入 Claude Desktop / Cursor 配置后，开发者的 agent 即可直接使用所有 tool。

**提供的 MCP Tools：**
- `web3_news` — 获取生态最新资讯
- `find_bounties` — 查找匹配的任务
- `get_my_profile` — 查看自己的 reputation
- `ecosystem_overview` — 某个生态的整体动态

---

## 六、用户旅程

### 开发者侧
```
1. 注册 AgentHub，绑定 GitHub + 钱包
   → Web3Insight 自动生成初始 profile

2. 在 Claude Desktop / Cursor 配置 MCP
   → 一次性操作，5 分钟内完成

3. 每天问 Agent："今天 Monad 生态有什么值得关注的？"
   → Agent 调用 web3_news，返回摘要

4. Agent 主动推送："发现 3 个匹配你技能的 Bounty，要看看吗？"
   → find_bounties 基于 profile 自动筛选

5. 完成 Bounty 后，贡献自动记录到 Web3Insight profile
   → 下次匹配质量更高
```

### 项目方侧
```
1. 在 OpenBuild 后台发布任务（现有流程）
2. 勾选"同步到 AgentHub"
3. 任务自动进入 AgentHub 数据层，被开发者 Agent 发现
4. 可查看申请者的 Web3Insight profile，直接评估能力
```

---

## 七、冷启动策略

### 第一阶段（0→1，1个月）
**目标：** 验证"开发者愿意用 Agent 接 Bounty"假设

- OpenBuild 发布 10-20 个真实 Bounty，要求通过 AgentHub API 接任务
- 提供简单的 MCP 配置文档
- 记录：有多少人配置了 MCP、问了哪些问题、转化率如何

**不需要新产品**，用现有 Web3Hub API + OpenBuild 数据即可跑测试

### 第二阶段（1→10，3个月）
**目标：** 完成 MCP Server + 任务市场 MVP

- 接入 3-5 个生态的 Bounty 数据（从 OpenBuild 合作生态开始）
- 上线 MCP Server，公开文档
- 在 Web3 开发者社区做 MCP 接入教程（内容营销）

### 第三阶段（10→100，6个月）
**目标：** Reputation 层打通，形成飞轮

- Web3Insight profile 与 AgentHub 任务记录双向同步
- 项目方可用 AgentHub 做开发者背调
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
| **AgentHub** | Agent-native + Reputation + 信息三合一 | 新品牌、需要冷启动 |

护城河：**数据飞轮**（Web3Hub + OpenBuild + Web3Insight 三个数据源打通，竞争对手无法复制）

---

## 十、待决策问题

1. **产品命名**：是独立品牌（AgentHub/DevAgent）还是挂靠 OpenBuild 子品牌（OpenBuild Agent）？
2. **第一阶段 Bounty 预算**：OpenBuild 能投入多少真实 Bounty 做冷启动测试？
3. **MCP vs 自建 App**：优先做 MCP Server（低成本验证）还是做独立 App（体验更完整）？
4. **Web3Insight API 打通**：何时启动内部对接排期？

---

*方案版本 v0.1，待 Ian 确认方向后深化技术架构和 Roadmap*
