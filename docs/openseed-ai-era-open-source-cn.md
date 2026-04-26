---
description: "OpenSeed：面向 AI 时代的开源归因与资助基础设施"
hidden: true
---
# OpenSeed：面向 AI 时代的开源归因与资助基础设施

## 1. 核心定位

OpenSeed 不是一个只面向 Web3 的资助工具。

它从 Ethereum 生态开始试点，是因为 Ethereum 有公共物品资助文化、可编程资金、链上公开账本和足够多真实开源依赖。但它最终要解决的问题属于整个开源世界：

AI 正在让开源影响力变得不可见。开发者可以通过 AI 调用、参考、fork、重写开源项目，却不一定留下传统依赖记录。过去靠 package manifest、import、fork history 就能看到的关系，在 AI 辅助开发里开始断裂。

OpenSeed 要做的是建立一套新的归因和资助基础设施，让 AI 时代的开源影响力重新变得可声明、可追溯、可资助。

## 2. 要解决的问题

传统开源资助主要依赖三类信号：

1. 谁提交了代码
2. 谁被 package manager 依赖
3. 谁会写 grant proposal

AI 时代，这些信号不够了。

一个开源项目可能被 AI 工具反复参考，但没有 import。

一个 repo 可能被 AI fork 成多个变体，但原项目维护者不知道。

一个架构模式、算法实现、工程判断可能被大量复用，但不会出现在 dependency graph 里。

同时，AI 让代码生成更便宜，却让维护、审查、判断和长期责任更贵。真正稀缺的不是一次性代码产出，而是长期维护者、稳定项目、真实下游依赖和社区信任。

OpenSeed 解决的不是“如何给开源捐钱”这个老问题，而是：

> 在 AI 让依赖关系变得不可见之后，如何重新建立开源归因、承诺和资金回流机制。

## 3. 当前阶段解决什么，不解决什么

### 3.1 当前阶段解决什么

第一阶段解决四件事。

**第一，记录承诺。**

项目可以公开声明自己愿意在未来商业化后，将一部分收入或代币回流给公共物品和上游依赖。

这个承诺不是固定税率。4% 和 1% 只是默认模板，可以根据项目类型调整。

**第二，追踪显性依赖。**

系统通过 package manifest、deps.dev、GitHub metadata 等数据源，识别项目使用了哪些上游开源项目。

这部分适合自动化。

**第三，建立 AI 时代的声明入口。**

通过 `SPARK.md`，项目可以声明自己的身份、依赖关系、资助方式、AI 使用规则和归因要求。

AI 工具、开发者、扫描器都可以读取这个文件。

**第四，公开资金流和履约状态。**

系统展示哪些项目做了承诺、提交了报告、完成了分配、哪些上游项目待认领。

OpenSeed 不做私下协调，而是让承诺和资金流公开可查。

### 3.2 当前阶段不解决什么

第一阶段不承诺自动识别所有 AI 参考来源。

AI 参考开源项目，很多时候没有 import、没有 fork、没有调用记录。系统无法可靠证明一段 AI 生成代码到底参考了谁。

第一阶段也不解决 AI Agent 运行期调用计费。

Agent 调用了哪个 API、MCP server、模型、数据源，应该属于 runtime attribution 和 usage receipt 的问题，可以作为后续方向，不放进第一阶段主线。

第一阶段不强制非链上项目付款。

对非代币项目和传统公司，OpenSeed 依靠公开承诺、年度报告、社区问责和资助资格约束，不假装智能合约能解决所有执行问题。

## 4. 产品结构

OpenSeed 分为四层。

### 4.1 Pledge Registry

回答：谁承诺了什么？

功能包括：

1. 项目注册
2. GitHub / 域名 / 钱包身份绑定
3. 承诺参数记录
4. 宽限期记录
5. 年度报告记录
6. 公开状态查询

第一阶段可以用 EAS 或链上 attestation 做公开存证，但不需要把所有逻辑都做成复杂合约。

### 4.2 Dependency Funnel

回答：这个项目依赖谁，资金应该如何建议分配？

功能包括：

1. 扫描 npm、PyPI、Cargo、Go、Maven 等生态依赖
2. 展开直接依赖和传递依赖
3. 映射 GitHub repo 和维护者信息
4. 计算分配建议
5. 输出可解释的权重
6. 支持项目人工补充遗漏依赖

Dependency Funnel 是建议器，不是判官。

系统给出透明、可解释的分配建议，项目可以接受、调整或补充说明。

### 4.3 SPARK.md

回答：一个开源项目如何让人和 AI 知道它是谁、如何归因、如何资助？

`SPARK.md` 是 OpenSeed 最重要的长期标准。

它应该像 `README.md`、`LICENSE`、`SECURITY.md`、`FUNDING.yml` 一样简单。

第一版字段包括：

```yaml
project:
  name: example-project
  repository: https://github.com/example/project
  maintainers:
    - name: Alice
      github: alice

funding:
  accepts_funding: true
  preferred_methods:
    - github_sponsors
    - opencollective
    - ethereum
  wallet: 0x...

attribution:
  ai_reference_allowed: true
  attribution_required: true
  preferred_citation: "example-project by Alice"

spark:
  pledge_status: registered
  public_goods_allocation: 4%
  dependency_allocation: 1%
  grace_period: 36 months

upstream:
  declared_dependencies:
    - https://github.com/example/upstream-lib
```

第一版目标不是完美，而是让项目可以低成本声明。

### 4.4 Public Accountability Dashboard

回答：承诺有没有被履行？资金流向哪里？

Dashboard 展示：

1. 注册项目列表
2. 承诺参数
3. 报告提交情况
4. 依赖分配建议
5. 资金分发记录
6. 待认领项目
7. Cohort 试点进展

这里不建议叫 Compliance Dashboard。

OpenSeed 不是监管工具，应该叫 Public Accountability Dashboard 或 Transparency Dashboard。

## 5. 4% 和 1% 的处理方式

4% 和 1% 不应该写成不可变规则。

它们应该是默认模板。

建议拆成两个参数：

1. Public Goods Allocation：流向公共物品资金池
2. Dependency Allocation：流向项目直接或间接依赖的上游项目

默认模板可以是：

| 模板 | Public Goods Allocation | Dependency Allocation | 适用对象 |
| --- | --- | --- | --- |
| Light | 1% | 0.5% | 早期项目 |
| Standard | 4% | 1% | 成熟 Web3 / AI 项目 |
| Token | 1%–4% token allocation | 0.5%–1% | 代币项目 |
| Enterprise | 固定年度预算或收入比例 | 按 SBOM / 依赖图分配 | 企业开源办公室 |

这样 SPARK 不是税率，而是一套可组合的承诺模板。

## 6. 为什么从 Ethereum 开始

Ethereum 是试点环境，不是最终边界。

从 Ethereum 开始有四个原因：

1. Ethereum 有长期公共物品资助文化
2. Ethereum 项目大量依赖开源基础设施
3. 链上记录适合做公开承诺和资金流透明化
4. 稳定币和智能合约适合验证 programmable funding

但 OpenSeed 的最终目标不是 Web3 项目资助平台。

最终目标是服务所有开源项目、AI 工具、基金会、企业开源办公室和开发者社区。

Ethereum 是第一个 funding and accountability backend，不是唯一后端。

## 7. 执行步骤

### 第一步：缩小第一阶段范围

第一阶段只做四个交付：

1. Pledge Registry v0.1
2. Dependency Funnel v0.1
3. SPARK.md v0.1
4. Public Accountability Dashboard v0.1

SPARK License 不作为第一阶段核心交付，只作为研究和草案工作推进。

AI Agent runtime payment 不进入第一阶段，只保留接口设计。

### 第二步：确定 Cohort 1

从 Ethereum 生态和华语开源社区中选择 10 到 15 个项目。

筛选标准：

1. 有真实维护者
2. 有持续维护记录
3. 有明确下游使用场景
4. 愿意公开声明依赖和资助承诺
5. 愿意添加 `SPARK.md`

项目不必全部是 Web3 项目。

应该包含 Web3 工具、开发者工具、AI 工具、通用开源库。

### 第三步：为每个项目生成依赖报告

对每个 Cohort 项目生成一份 Dependency Report。

报告包括：

1. 显性依赖列表
2. 直接依赖和传递依赖
3. 上游 repo 信息
4. 维护者活跃度
5. 建议分配权重
6. 待确认的 AI 参考或人工声明依赖

这份报告是第一阶段最关键的产品输出。

### 第四步：落地 SPARK.md

帮助 Cohort 项目在仓库根目录添加 `SPARK.md`。

同时提供：

1. 模板
2. GitHub Action 校验
3. CLI 初始化命令
4. 文档说明
5. Badge

目标是让 `SPARK.md` 先成为一种低摩擦习惯。

### 第五步：完成第一轮模拟分配

不急着自动打钱。

先跑一轮模拟分配，展示：

1. 如果项目贡献 1% dependency allocation，资金会流向哪些上游
2. 每个上游项目为什么获得这个权重
3. 哪些项目可以直接认领
4. 哪些项目需要人工 outreach

这一步验证算法和用户理解成本。

### 第六步：做第一轮真实资助

从种子资金池中拿出一小笔资金做真实分发。

金额不用大，重点是跑通流程：

1. 生成分配建议
2. 项目确认
3. 上游维护者 outreach
4. 维护者认领
5. 资金分发
6. Dashboard 公开记录

这比一开始设计复杂合约更重要。

### 第七步：总结成开放标准

试点结束后，沉淀三份文档：

1. `SPARK.md` specification
2. Dependency Funnel methodology
3. OpenSeed Cohort 1 report

这三份文档决定 OpenSeed 能不能从 Ethereum 试点走向通用开源基础设施。

## 8. SPARK License 的位置

SPARK License 第一阶段要有版本出来，但不作为大规模 adoption 的入口。

它要解决的是：承诺能否随代码传播。也就是项目被下游使用、fork、商业化之后，公共物品回流义务是否能跟着代码一起传递。

但许可证是高摩擦、高争议、高法务成本的东西。第一阶段不能要求 Cohort 项目大面积换许可证，也不能宣称它已经符合 OSI 标准。

第一阶段目标是发布一个可讨论、可审查、可被少数组织认可的版本。

### 8.1 第一阶段交付

第一阶段交付四件事。

1. `SPARK License Draft v0.1`
2. `SPARK Pledge Addendum v0.1`
3. `SPARK AI Attribution Clause v0.1`
4. `License compatibility memo`

`SPARK License Draft v0.1` 是完整许可证草案，用来接受社区、基金会和法律顾问审查。

`SPARK Pledge Addendum v0.1` 是轻量版本。项目可以保留 MIT、Apache、GPL 等原许可证，只额外放一个承诺文件，声明商业化后愿意按约定比例回流资金。这个版本更适合第一阶段真实采用。

`SPARK AI Attribution Clause v0.1` 是面向 AI 使用的条款模块，用来说明 AI 训练、检索、代码生成、agent fork 等场景下，项目希望如何被归因和申报。它可以放进 `SPARK.md`，也可以作为 Addendum 的一部分。

`License compatibility memo` 说明 SPARK License 和 MIT、Apache、GPL、Open Source Definition、SPDX 流程的关系。第一阶段不下最终结论，只列清楚风险和争议点。

### 8.2 第一阶段认可目标

第一阶段要拿到的是“初步认可”，不是正式标准化。

目标包括：

1. 3 到 5 个 Cohort 项目愿意采用 `SPARK Pledge Addendum`
2. 1 到 2 个新项目愿意试用 `SPARK License Draft`
3. 至少 2 个社区、组织或基金会愿意公开支持继续评审
4. 至少 1 位开源法律或 OSPO 背景顾问完成书面反馈
5. 形成一版公开 FAQ，回答企业法务和开源维护者最关心的问题

这里的“认可”不等于 OSI 认证，也不等于法律背书。它指的是：相关社区认为这个方向值得继续推进，并愿意进入下一阶段试点。

### 8.3 第二阶段落地

第二阶段再推动小规模真实采用。

适合对象是：

1. 新项目
2. AI devtool
3. agent framework
4. 开源基础设施工具
5. 明确支持 recursive funding 的社区项目

成熟项目不建议直接切换主许可证。它们可以先采用 `SPARK.md` 和 `SPARK Pledge Addendum`。

### 8.4 和 SPARK.md 的关系

不要把 SPARK License 和 `SPARK.md` 捆绑。

`SPARK.md` 是轻入口，目标是广泛传播。

SPARK License 是强路径，目标是验证承诺随代码传播是否可行。

第一阶段的正确顺序是：

1. 所有 Cohort 项目添加 `SPARK.md`
2. 部分项目采用 `SPARK Pledge Addendum`
3. 少量新项目试用 `SPARK License Draft`
4. 根据反馈决定 v0.2 是否进入更正式的基金会和 SPDX 讨论

## 9. 后续扩展：AI Runtime Attribution

OpenSeed 后续可以扩展到 AI Agent 运行期调用。

方向是 Runtime Receipts。

每次 Agent 调用工具、API、模型、数据源时，生成一条机器可读凭证：

```json
{
  "agent": "did:example:agent",
  "tool": "github.com/example/tool",
  "timestamp": "2026-04-26T00:00:00Z",
  "usage": {
    "calls": 1
  },
  "payment": {
    "amount": "0.001",
    "currency": "USDC"
  },
  "attribution": {
    "spark_project": "example-project"
  }
}
```

这不是第一阶段交付，但应该在架构上预留。

## 10. 一句话总结

OpenSeed 从 Ethereum dependency funding 试点开始，但目标不是做 Web3 资助平台。

它要成为 AI 时代的开源归因与资助基础设施：让项目能声明自己，让依赖能被追溯，让资金能回流，让 AI 造成的隐性开源影响重新变得可见。
