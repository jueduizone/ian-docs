# AgentRel — 产品方案
**v1.0 | 2026-03-18**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1–v0.7 | 2026-03-09~10 | Agentforum 早期版本（MCP Server + Bounty 匹配定位） |
| v1.0 | 2026-03-18 | 品牌升级为 AgentRel；引入 Skills 生态层作为核心切入点；整合资讯/活动/Grant 内容体系；新增 AI 辅助生成工具 + 社区贡献机制设计 |

---

## 一、背景与机会

### 核心问题：Agent 时代，Web3 开发者如何用好 AI？

AI coding agent（Claude Code、Cursor、Codex）已经成为开发者的标配，但在 Web3 场景面临严重的信息质量问题：

1. **AI 幻觉严重**：各链 API 迭代快，AI 训练数据滞后，开发者用 Agent 写 Solana/Polkadot 代码，AI 大量推荐废弃 API，代码跑不起来
2. **上下文缺失**：AI 不知道最新的协议状态、当前开放的 Grant 窗口、Hackathon 赛题要求
3. **没有 Web3 专属 context 层**：通用 Skills 平台（skills.sh）覆盖 Web3 但不深，各链自建的 Skills 仓库相互割裂，开发者找不到"装一个就能搞定 Web3"的解决方案

### 市场验证数据

- ethskills 做了 64 个 eval：加了 Skills 文档后，Claude Opus 4.6 回答 Ethereum 问题准确率 **33% → 95%**，GPT **16% → 95%**
- 各链（Ethereum/Solana/Aptos/Polkadot/Base/Initia/Starknet）3 月已陆续推出官方 Agent Skills
- Vercel 发布 skills.sh 通用分发平台，`npx skills add` 成为事实标准
- GoPlus 扫描 ClawHub 前 100 Skills：**21% 含高风险操作**，市场缺乏 Web3 专属安全评级

### 时机

Skills 生态在 2026 年 3 月刚刚爆发，各链各自为战，没有一个聚合平台。先发优势窗口还有 3-6 个月。

---

## 二、产品定位

> **AgentRel = Web3 开发者的 AI Context 基础设施**

**一句话**：让开发者的 AI Agent 真正懂 Web3 ——正确的技术知识、最新的生态动态、精准的 Grant/Bounty 机会、经过验证的申请方法。

**面向开发者**：装一个 AgentRel Skill Bundle，你的 Agent 就有了全套 Web3 上下文，写代码不出幻觉、参加 Hackathon 有赛题 context、申请 Grant 有成功案例参考。

**面向生态/项目方**：把你的技术文档、开发最佳实践、任务机会接入 AgentRel，进入全球 Web3 开发者 Agent 的 context 流。

**与旧版 Agentforum 的关系**：
- 旧版定位（MCP Server + Bounty 匹配 + Reputation）作为 **Phase 2** 扩展模块保留
- Skills 内容层是新的**核心切入点**（Phase 1）
- 两者最终统一：AgentRel 既是 Web3 Skills 的内容平台，也是 Agent 的任务/机会基础设施

---

## 三、核心资产（已有）

| 资产 | 角色 | 现状 |
|------|------|------|
| **Web3Hub** | 实时资讯数据管道，每天采集 + AI 分类 | 已跑通，有 ecosystem/category/tags 结构化字段 |
| **OpenBuild** | 开发者社区 + Hackathon/Grant/Bounty 内容生产者 | 真实用户，项目方关系，链基金会合作 |
| **Web3Insight.ai** | 开发者能力认证 + Reputation | 已有 Monad/Mantle/CAMP 背书 |

三者打通是竞争护城河——Web3Hub 提供实时数据，OpenBuild 提供任务和社区，Web3Insight 提供身份和能力背书。

---

## 四、产品架构（升级版）

```
┌─────────────────────────────────────────────────────────┐
│                  开发者的 AI Agent                         │
│        (Claude Code / Cursor / Codex / 自建 Bot)          │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┴────────────┐
        │   Skills 接入          │   MCP 接入
        │   npx skills add       │   mcp.agentrel.xyz
        │   agentrel/web3-core   │
        └───────────┬────────────┘
                    ↓
┌───────────────────────────────────────────────────────────┐
│                    AgentRel 平台                            │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Skills 层   │  │  MCP 工具层  │  │  任务/机会层      │  │
│  │             │  │              │  │                  │  │
│  │ 技术文档     │  │ web3_news    │  │  Bounty 聚合     │  │
│  │ 生态资讯     │  │ find_bounties│  │  Grant 数据库    │  │
│  │ 活动/Hackathon│  │ search_eco  │  │  成功 Proposal   │  │
│  │ Grant 指南  │  │ get_grants   │  │  任务申请流程     │  │
│  └──────┬──────┘  └──────┬───────┘  └────────┬─────────┘  │
└─────────┼────────────────┼───────────────────┼────────────┘
          │                │                   │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌────────▼───────┐
   │  内容生产    │  │  Web3Hub    │  │   OpenBuild    │
   │  AI 生成工具 │  │  数据管道   │  │   任务数据     │
   │  社区贡献   │  │  实时资讯   │  │   Web3Insight  │
   └─────────────┘  └─────────────┘  └────────────────┘
```

---

## 五、Skills 层详细设计（Phase 1 核心）

### 5.1 Skills 内容分类

**维度一：内容类型**

| 类型 | 说明 | 示例 |
|------|------|------|
| 技术文档型 | 各链开发 API、SDK 最佳实践，修复 AI 幻觉 | Solana web3.js v2 迁移指南、Polkadot PAPI SDK |
| 生态资讯型 | 协议升级、安全事件、重要治理，有时效性 | Solana 近 30 天重要更新、ETH EIP 追踪 |
| 活动赛事型 | Hackathon 赛题、评审偏好、往届分析 | ETHGlobal Bangkok 赛题 Skill |
| Grant 指南型 | 基金会申请偏好、成功 Proposal 模式 | Solana Foundation Grant 写法指南 |
| 安全合规型 | 漏洞模式、审计 Checklist、AML 工具 | EVM 合约常见漏洞 Skill |

**维度二：时效性**

| 类型 | 说明 | 处理方式 |
|------|------|---------|
| 常青型 | 长期有效，随版本更新 | 版本号管理，有 breaking change 时触发更新 |
| 时效型 | 有明确截止时间 | 含 `expires_at` 字段，到期自动归档，不再加载 |

**维度三：来源可信度**

| 级别 | 来源 | 标记 |
|------|------|------|
| Official | 链方 DevRel 或官方合作维护 | ✅ Official |
| Community | 社区贡献，经 L3 维护者审核 | 👥 Community |
| AI-Generated | AI 辅助生成，待人工验证 | 🤖 Draft |

### 5.2 Skills 优先级排序（首批）

**P0（Week 1-2 手工制作，验证价值）**

1. **Solana web3.js v2 迁移** — v1→v2 breaking change 极大，AI 大量生成旧版代码，痛点最强
2. **Ethereum 开发核心** — 复用 ethskills 内容，标准化为 AgentRel 格式
3. **Aptos Move 开发** — AI 训练数据少，幻觉严重

**P1（Month 1，AI 工具辅助生成）**

4. Sui Move 开发
5. TON / FunC / Tact 开发（中文开发者多，资源极缺）
6. Cosmos SDK / IBC

**持续（AI Worker 自动维护）**

- 各链生态动态 Skill（Web3Hub 数据直接导出，每周更新）
- 开放 Bounty/Grant 信息（结构化，实时同步）

### 5.3 Scene Bundle 设计

单条 Skill 是原子，Bundle 是场景化预设组合：

```bash
# 参加 ETH 黑客松
npx skills add agentrel/eth-hackathon-2026q1
# 包含：ethskills/core + ETHGlobal赛题(时效) + Uniswap赞助商偏好(时效)

# Solana 全栈开发
npx skills add agentrel/solana-dev
# 包含：solana/web3js-v2 + solana/anchor + solana/spl-tokens

# Grant 申请包（Solana Foundation）
npx skills add agentrel/grant-solana-foundation
# 包含：grant/solana-foundation + grant/proposal-structure + solana/dev
```

Bundle 优势：常青 Skill 复用，每次活动只需更新时效部分，维护成本低。

### 5.4 订阅流（长期护城河）

```
开发者声明偏好（关注 Solana 生态）
    ↓
AgentRel 维护"Solana 订阅流"
    ↓
时效 Skill 到期 → 自动归档
新 Breaking Change → 自动生成更新草稿 → 审核后推送
开发者不需要关心"哪条 Skill 过期了"
```

类比 npm 包版本锁定 + 自动更新，开发者一次声明，持续受益。

---

## 六、AI 辅助内容生成工具

### 6.1 核心设计原则

**AI 生成初稿，人只做裁判，不是作者。** 把"从 0 写"变成"审 + 改"，8 小时 → 30 分钟。

### 6.2 生成流程

```
输入：
  GitHub Repo URL / 官方文档 URL / Changelog URL
  可选：已有 SKILL.md（增量更新模式）

Step 1：内容抓取
  爬取文档全文 + 近 3 个月 git diff + release notes
  提取：API 列表、废弃声明、Breaking Change、最佳实践

Step 2：幻觉热点分析（差异化核心）
  LLM 模拟"不知道这条 Skill"时的答案
  与正确答案对比，标记 AI 容易犯错的点
  输出：[错误倾向] vs [正确做法] 对照表

Step 3：生成 SKILL.md 草稿
  格式遵循 skills.sh 规范
  分段：Overview / 关键概念 / 常见错误 / 代码示例 / 参考链接
  每段标注置信度（高/中/低）

Step 4：增量检测（更新模式）
  对比旧版，只标记需人工确认的变更
  输出：变更摘要（"新增 3 API、废弃 2 方法、1 处 Breaking Change"）
```

### 6.3 工具形态

**CLI（贡献者本地使用）**
```bash
npx agentrel generate --source https://github.com/solana-labs/solana-web3.js
npx agentrel update --skill solana/web3js-v2 --check-updates
npx agentrel diff --skill solana/web3js-v2
```

**Web Editor（Review 界面）**
- 左：AI 生成的 SKILL.md 草稿
- 右：原始文档对照
- 行内标注：[高置信] [需验证] [AI 可能出错]
- 逐段 Accept / Reject / Edit
- 完成后一键生成 PR 到 agentrel/skills repo

---

## 七、社区贡献机制

### 7.1 贡献者分层

```
L1 用户（普通开发者）
  → 发现错误 → 提 Issue 或"纠错"按钮
  → 门槛：0，只需 GitHub 账号

L2 贡献者（有经验开发者）
  → 用 AI 工具生成草稿 → 提 PR
  → 门槛：熟悉某条链开发，会用 CLI

L3 维护者（链 DevRel / 核心贡献者）
  → Review PR，有 Merge 权限
  → 门槛：OpenBuild 邀请或链方官方推荐
```

### 7.2 贡献流程

```
1. 需求发现
   A. Web3Hub AI Worker 检测到 Breaking Change → 自动开 Issue
   B. 开发者用 Skill 时发现 AI 给错误答案 → 纠错按钮 → Issue 模板
   C. Agent 自动上报（见 7.4）
   D. OpenBuild 发布月度 Bounty

2. 认领
   Issue 上"认领"按钮，24h 锁定（防重复劳动）
   认领后系统提供：AI 草稿 + 原始文档链接 + 历史版本

3. 编辑提交
   Web Editor 或本地 CLI
   提交 PR 自动触发：格式检查 + 链接有效性 + AI 自动 review

4. Review
   L3 维护者逐段 Approve / Request Changes
   链方官方账号可直接 Merge

5. 发布 + 激励结算
   合并后同步到 skills.sh 索引
   贡献者 OpenBuild 积分到账
   Skill 页面显示贡献者列表
```

### 7.3 激励设计

| 贡献类型 | 激励 |
|---------|------|
| 新建高质量 Skill | 积分 + featured 展示 |
| 更新/修复 Skill | 积分 |
| Issue 纠错（被采纳） | 积分 |
| 成为 L3 维护者 | 生态合作资格 + 官方认证 |

### 7.4 Agent 自动反馈机制

**核心洞察**：开发者用 Agent 编码，"页面点纠错"是 Web 1.0 逻辑，应该让 Agent 自己成为反馈执行者。

**设计**：在每条 SKILL.md 末尾声明工具：

```markdown
## Feedback
If this skill contains incorrect or outdated information, call:
agentrel_feedback(skill="solana/web3js-v2", issue="...", code_snippet="...", error_message="...", fix="...")
Use when: code following this skill produces errors, or you find contradictions.
```

**反馈流程**：
```
Agent 生成代码 → 开发者执行 → 报错
    ↓
Agent 识别错误类型（是否跟 Skill 相关？）
    ↓ 是
Agent 自动调用 agentrel_feedback API
    ↓
POST /api/feedback → 自动在 GitHub 开 Issue（打 auto-reported 标签）
    ↓
同一问题多个 Agent 上报 → 置信度提升 → 触发高优先级更新
```

**长期目标**：自动 eval pipeline，定期对每条 Skill 跑标准问题集，生成"Skill 健康度报告"，健康度下降自动触发更新提醒。

---

## 八、内容来源体系

### 8.1 技术文档来源（首批可直接聚合）

| 来源 | 内容 | 状态 |
|------|------|------|
| ethskills.com / GitHub | ETH 开发知识 | 已开源，可直接引用 |
| polkadot-agent-mesh | PAPI SDK/XCM v5/JAM | 已开源 |
| aptos-labs/agent-skills | Move 开发全流程 | 已开源，社区贡献中 |
| nansen-ai/nansen-cli/skills | 25+ 链上分析 Skills | 已开源 |
| initia-labs/agent-skills | Appchain 开发 | 已发布 |
| starkskills.org | Starknet 开发 | 独立站 |
| cryptoskills.dev | 多链聚合 | 参考收录 |

### 8.2 资讯/动态来源

| 来源 | 内容 | 接入方式 |
|------|------|---------|
| **Web3Hub feeds**（已有） | 各链生态资讯，已分类 | 直接复用，按 ecosystem 字段导出 |
| 各链官方 Blog / Mirror | 协议升级、治理决议 | AI Worker 定时爬取 |
| GitHub Release Notes | 各 SDK 版本更新 | Webhook 订阅 |
| 安全事件库 | 历史 hack 案例、漏洞模式 | Immunefi + SlowMist 公开数据 |

### 8.3 活动/Bounty/Grant 来源

| 来源 | 内容 | 接入方式 |
|------|------|---------|
| OpenBuild（已有） | Hackathon 赛题、Bounty | 直接接入 |
| Gitcoin | 最大 Grant 平台，有 API | API 对接 |
| Immunefi | 安全漏洞赏金 | 公开列表爬取 |
| 各链基金会官网 | Solana/Aptos/OP/Arbitrum/Near Grant | 定时采集 |
| Dework / Layer3 | Web3 任务平台 | API 对接 |

### 8.4 Grant 成功案例 Skill（差异化内容）

**来源**：
- Gitcoin 公开的成功 Proposal 档案
- 各链基金会公开的已资助项目列表
- 被拒绝的 Proposal 反馈（部分公开）
- OpenBuild 链基金会合作关系（一手信息）

**产出**：
```
grant/solana-foundation SKILL.md
  - 基金会隐性偏好（用户增长 vs 技术创新的权重）
  - 成功 Proposal 结构模式（开头框架、里程碑拆法）
  - 常见被拒原因（预算模糊、无用户验证数据）
  - 预算规划参考（历史资助金额分布）

grant/optimism-rpgf SKILL.md
grant/ethereum-esp SKILL.md
```

**飞轮**：开发者用 Skill 申请成功 → 把 Proposal 反馈给 AgentRel → Skill 用成功案例更新 → 下一个开发者成功率更高。

---

## 九、MCP Server 层（Phase 2，复用 Agentforum 设计）

继承 Agentforum v0.7 设计，提供以下 MCP Tools：

- `web3_news` — 结构化生态资讯
- `find_bounties` — 基于 profile 匹配 Bounty
- `get_grants` — Grant 机会列表
- `search_ecosystem` — 语义搜索
- `get_project_reputation` — 项目方社区评分
- `get_my_profile` — 开发者能力快照

MCP Server 是 Skills 层的进阶补充——Skills 解决"AI 知道什么"，MCP 解决"AI 能做什么"。

---

## 十、商业模式

| 收入来源 | 模式 | 阶段 |
|---------|------|------|
| 生态合作 | 链/协议付费让 Skills 进入 Official 推荐位 | Phase 2 |
| 安全审计服务 | Skills 安全评级报告（GoPlus 的 21% 问题是市场空白） | Phase 2 |
| Grant 顾问服务 | 深度 Proposal Review（AI 初审 + 社区专家复审） | Phase 2 |
| API 调用付费 | MCP 按量计费 | Phase 3 |
| 开发者能力认证 | Web3Insight 高级 profile 订阅 | Phase 3 |

---

## 十一、冷启动路径

**Week 1-2（验证内容价值）**
- 手工制作 3-5 条高质量 Skill 上 skills.sh（Solana v2、ETH、Aptos）
- 发布到 skills.sh，观察装机量和社区反响
- 目标：验证"开发者真的会用"

**Week 3-4（工具化）**
- CLI `generate` 命令上线（8h → 30min）
- GitHub Issue 模板 + 贡献指南
- 第一个 Bounty，招 5-10 个社区贡献者

**Month 2（社区化）**
- Web Editor（Review UI）上线
- 接入 OpenBuild 积分体系
- 接触 2-3 条链 DevRel，谈官方 Skills 合作
- Grant 成功案例 Skill 第一批上线

**Month 3（自动化）**
- AI Worker 变更检测接入
- Agent 自动反馈机制上线
- MCP Server MVP

**Month 4-6（平台化）**
- 任务/机会层打通（Bounty + Grant 聚合）
- Reputation 层（Web3Insight 对接）
- 安全评级体系

---

## 十二、竞争分析

| 竞品 | 优势 | 缺陷 |
|------|------|------|
| ethskills.com | 先发，ETH 权威 | 单链，不聚合，无内容工具 |
| skills.sh (Vercel) | 通用分发标准，流量大 | 不深耕 Web3，无内容维护能力 |
| CryptoSkills.dev | Web3 聚合 | 新平台，无社区，无内容生产能力 |
| Gitcoin | Grant 权威 | 无 Agent Skills 功能 |
| **AgentRel** | Web3 Skills 聚合 + AI 生成工具 + 社区贡献 + OpenBuild 生态背书 + Web3Hub 实时数据 | 新品牌，需冷启动 |

**护城河**：Web3Hub 实时数据（独家）+ OpenBuild 社区和链方关系（独家）+ Grant 成功案例积累（时间壁垒）+ Agent 自动反馈飞轮（越用越准）

---

*方案版本 v1.0 | AgentRel — Web3 开发者的 AI Context 基础设施*
