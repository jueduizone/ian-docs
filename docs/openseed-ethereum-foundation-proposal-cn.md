---
description: "OpenSeed 给以太坊基金会的 Grant Proposal：面向 AI 时代的开源归因与依赖资助基础设施"
hidden: true
---
# OpenSeed：面向 AI 时代的开源归因与依赖资助基础设施

## 给 Ethereum Foundation Ecosystem Support Program 的 Proposal

**申请金额：** USD 100,000  
**执行周期：** 6 个月  
**拨款方式：** 按里程碑分期拨款  
**申请方：** OpenSeed  
**主要产出：** 开源软件、开放规范、公开报告，以及一套基于 Ethereum 构建的 dependency funding 参考实现

## 1. 执行摘要

OpenSeed 是一套面向 AI 时代的开源归因与资助基础设施。第一阶段将基于 Ethereum 构建 funding and accountability backend，并在 Ethereum 生态中完成首轮 dependency funding 落地。

核心问题很直接：AI 正在改变开源作品被复用的方式。开发者可以通过 AI 工具参考、fork、重写或重新生成开源代码，但这些使用不一定会留下传统依赖图依赖的痕迹，例如 package manifest、import、fork history 或直接的 repository link。

Ethereum 用多年时间沉淀了持续活跃的公共物品与开源资助文化。下一步，是让资金流更能反映真实依赖关系，更透明，也更容易复用。

OpenSeed 要为这一步建立一个可运行的参考实现：

1. **Pledge Registry**：公开记录项目对开源公共物品和上游依赖的未来回流承诺。
2. **Dependency Funnel**：可解释的依赖分析与分配建议引擎。
3. **SPARK.md**：轻量的 repository-level 归因与资助声明文件。
4. **Public Accountability Dashboard**：展示项目承诺、依赖报告、资金分配建议、实际分发和认领状态的公开界面。
5. **SPARK Seed Pool Pilot**：小规模真实资助落地，通过可审计的 Ethereum 工作流，把种子资金分发给上游维护者。
6. **SPARK License / Addendum Research**：围绕 pledge 和 AI attribution 的早期法律、治理和社区评审材料。

我们申请 **USD 100,000 / 6 个月**，按里程碑分期拨款，用于完成 v0.1 系统、接入第一批 10–15 个 Cohort 项目、生成公开 Dependency Reports、运行一轮模拟分配、完成一轮 **$50,000** 真实资助分发，并把方法论作为面向 Ethereum 生态和更广泛开源生态的开放基础设施发布。

## 2. 为什么现在适合 Ethereum Foundation

Ethereum Foundation Ecosystem Support Program 当前重点支持能强化 Ethereum 基础、帮助 builder、并产出 free、open-source、non-commercial public goods 的项目。ESP 当前 grant 模式围绕 Wishlist 和 RFP 展开，评估标准包括技术方案、生态影响、开源可用性、预算合理性、团队经验，以及与 Ethereum 价值观的契合度。

OpenSeed 和这个方向高度一致。

### 2.1 强化 Ethereum 的开源资助基础设施

Ethereum 依赖大量开源基础设施：客户端、密码学库、开发者工具、package ecosystem、教育资源、研究成果和社区维护工具。很多依赖因为价值分散、难以归因，所以长期资助不足。

OpenSeed 不是再做一个 grant list，而是提供一种机制：识别上游依赖，解释它们为什么重要，并让资金流更透明。

### 2.2 让资助从社交信号转向依赖证据

Vitalik 近期提到，Ethereum 生态应该少谈模糊的 “public goods funding”，多谈 “open source funding”，因为 open source 有更清晰的定义，也更不容易被 social desirability bias 游戏化。

OpenSeed 采用这个方向。它关注可见的产物：repository、maintainer、dependency graph、declaration、report 和 public funding record。目标不是判断谁在道德上更值得被资助，而是让开源影响力变得更可见。

### 2.3 回应 Ethereum 公共物品的可持续性缺口

Ethereum Foundation Funding Coordination 相关工作指出了一个反复出现的问题：很多关键开源团队工程能力很强，但资金和运营 runway 很脆弱。所有人都依赖共享基础设施，但很少有人愿意成为第一个或唯一的资助方。

OpenSeed 可以补上一个 dependency-funding layer：如果一个项目受益于上游开源工作，它可以声明这种关系，发布依赖报告，并把一部分未来价值回流给维护者。

### 2.4 产出可复用的公共基础设施，而不是封闭产品

Grant 资助的所有产出都会开源或免费公开：

- Registry 代码
- Dependency Funnel 方法论和实现
- SPARK.md specification
- GitHub Action / CLI helper
- Dashboard 前端
- Cohort reports
- SPARK Pledge Addendum v0.1
- SPARK AI Attribution Clause v0.1
- License compatibility memo

其他社区、基金会、生态和项目都可以 fork、审查和复用这套系统。

## 3. 问题陈述

当前开源资助机制依赖的信号是不完整的。

它们通常能看到：

1. 谁提交了代码
2. 谁出现在 package manifests 里
3. 谁足够可见，能写 grant application
4. 谁在 funding community 里有社交影响力

但它们经常看不到：

1. 被深度依赖但很少被点名的传递依赖
2. 维护无聊但关键基础设施的 maintainer
3. 被 framework 和 template 间接使用的 library
4. 通过 AI-assisted development 被复用的架构模式或实现方式
5. 被 AI 工具大量参考、但没有作为 package import 的项目
6. 没有精力写 grant proposal 的上游维护者

AI 会让这个缺口更大。代码生成降低了下游软件生产成本，但也可能抹掉上游影响的路径。真正变得更有价值的工作，往往也更不可见：稳定维护、安全审查、文档、长期信任和工程判断。

Ethereum 需要一个更好的机制，回答五个实际问题：

1. 这个项目依赖哪些开源项目？
2. 这些依赖背后的维护者是谁？
3. 哪些依赖应该被纳入资助考虑？
4. 分配建议是怎么生成的？
5. 社区如何验证资金已经分发？

OpenSeed 的 v0.1 系统就是为回答这些问题而设计的。

## 4. 解决方案

OpenSeed 是一套归因、承诺、分配和公开问责系统。

它不是法律强制执行系统，也不是判断依赖价值的“客观真理机器”。它是一层透明的 approximation layer，让 dependency funding 更容易讨论、验证和复用。

### 4.1 Pledge Registry

Pledge Registry 记录哪些项目公开承诺：未来把一部分价值回流给开源公共物品和上游依赖。

第一版功能包括：

- 项目注册
- GitHub、域名和 Ethereum wallet 身份绑定
- Pledge 参数记录
- Grace period 和 trigger 记录
- 年度报告状态
- 公开 registry view
- 可选的 Ethereum attestation，用于公开时间戳存证

示例 pledge 参数：

- Public Goods Allocation：流向更广泛开源或公共物品资金池的可配置比例
- Dependency Allocation：流向直接或间接上游依赖的可配置比例
- Grace Period：商业化之后承诺激活前的宽限期
- Trigger：收入、TGE、融资、商业发布、年度预算或其他项目自定义触发条件

第一版会把 4% public-goods allocation 和 1% dependency allocation 这类数值作为模板，而不是固定规则。

### 4.2 Dependency Funnel

Dependency Funnel 生成 dependency reports 和 allocation recommendations。

第一版范围：

- 扫描 npm、PyPI、Cargo、Go、Maven 的 package manifests
- 展开直接依赖和传递依赖
- 尽可能把 package dependency 映射到 GitHub repository
- 识别 maintainer 和 funding links
- 用可解释信号估算依赖相关性
- 允许项目人工补充声明依赖，包括 AI reference 或 non-package dependency
- 为每个 Cohort 项目输出公开 Dependency Report

第一版权重信号：

- 直接依赖 vs 传递依赖距离
- 下游使用信号
- 项目存续年限和连续性
- Maintainer 连续性
- Issue 和 release 活跃度
- 对申请项目的关键程度
- Cohort 项目的人工声明
- 适用时的 AI reference declaration

Funnel 是 recommendation engine。项目可以在分发前接受、调整或注释建议。

### 4.3 SPARK.md

`SPARK.md` 是 repository-level 的归因与资助声明文件。

它应该像 `README.md`、`LICENSE`、`SECURITY.md` 或 `FUNDING.yml` 一样简单。

第一版字段：

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

Grant 资助产出包括：

- SPARK.md v0.1 specification
- Template files
- Validation rules
- GitHub Action
- CLI helper
- Badge and documentation

### 4.4 Public Accountability Dashboard

Public Accountability Dashboard 回答两个问题：

1. 项目承诺了什么？
2. 钱流向了哪里？

Dashboard 展示内容：

- 注册项目
- Pledge 参数
- Cohort 参与情况
- Dependency reports
- Allocation recommendations
- Distribution status
- Maintainer claim status
- Public funding records
- Methodology documentation

这里有意不叫 compliance dashboard。OpenSeed 做的是公开问责，不是监管执行。

### 4.5 SPARK Seed Pool Pilot

SPARK Seed Pool 是第一阶段的核心预算项，用来跑通真实 dependency funding 分发。第一轮真实分发资金包含在本次 **USD 100,000** 申请预算内，对应预算表中的 **SPARK Seed Pool distribution：$50,000**。如果后续有社区捐赠或合作方 matching funds，可以作为额外资金进入 Seed Pool，但不作为本 proposal 的前置条件。

流程：

1. 选择 10–15 个 Cohort 项目
2. 生成 dependency reports
3. 生成 allocation recommendations
4. 让 Cohort 项目确认或注释建议
5. 联系上游维护者
6. 验证 claim 信息
7. 分发 **$50,000** seed funding
8. 发布公开记录和 cohort report

第一轮重点是跑通机制，不是追求资助金额规模。

### 4.6 SPARK License / Addendum Research

SPARK License 是 OpenSeed 的重要组成部分，但第一阶段不把它作为强制采用的主路径。原因是 license 牵涉开源定义、许可证兼容性、企业法务接受度和社区治理，不适合在没有试点数据前直接推动大规模采用。

这部分工作不只是写草案，也包括面向开源机构、基金会、OSPO、法律顾问和海外开发者社区的持续沟通。OpenSeed 需要把 SPARK License / Pledge 的设计逻辑讲清楚，收集不同机构的风险反馈，并在相关开源、Ethereum、AI devtools 和 public goods funding 场合进行布道。

第一阶段会采用三层推进方式：

1. **SPARK.md**：最低摩擦的声明层。项目保留现有 license，只新增一份机器可读的 attribution / funding declaration。
2. **SPARK Pledge Addendum**：轻量承诺层。项目保留原许可证，同时通过 addendum 声明未来商业化后如何回流公共物品和上游依赖。
3. **SPARK License Draft**：许可证研究层。产出 v0.1 草案，用于社区、基金会、OSPO 和法律顾问评审，不在第一阶段要求成熟项目迁移 license。

Grant 会产出以下法律和治理材料：

1. `SPARK License Draft v0.1`
2. `SPARK Pledge Addendum v0.1`
3. `SPARK AI Attribution Clause v0.1`
4. `License compatibility memo`
5. Maintainer 和 OSPO FAQ

这个阶段的目标是形成可讨论、可评审、可迭代的 license 路径，不是追求大规模 license adoption，也不声称第一版会获得 OSI / SPDX 认可。成熟项目可以先采用 `SPARK.md` 和 Pledge Addendum；新项目、AI devtools、agent framework 和明确支持 recursive funding 的项目，可以自愿试用 `SPARK License Draft v0.1`。

License compatibility memo 会重点回答：

1. SPARK License 与 MIT、Apache-2.0、GPL 等主流许可证的关系
2. SPARK Pledge Addendum 是否可以和现有 license 并存
3. AI reference、agent fork、代码生成和 attribution clause 的边界
4. 企业 OSPO / legal team 可能关心的采用风险
5. 后续进入 SPDX / OSI 讨论前需要满足的条件

## 5. 为什么基于 Ethereum 构建

Ethereum 是 OpenSeed 第一阶段 funding and accountability backend 的优先实现环境。

1. **公共物品文化**：Ethereum 长期支持 grants、retroactive funding、quadratic funding 和开源项目。
2. **真实依赖面**：Ethereum 项目高度依赖开源软件和共享基础设施。
3. **透明记录**：Ethereum 适合公开承诺、attestations、多签分发和可验证 funding records。
4. **可编程资助**：稳定币、智能合约、attestations，以及 Safe、EAS 等现有工具，让 funding workflow 可以在不重造金融栈的前提下直接落地。
5. **生态相关性**：Dependency funding 和 developer tooling、security infrastructure、research libraries、community resources 以及长期生态韧性直接相关。

OpenSeed 不把 Ethereum 绑定为唯一实现。Ethereum 是第一阶段的优先实现环境，因为它同时具备价值观、工具和真实需求。

## 6. Cohort 设计

OpenSeed 会为 Cohort 1 选择 10–15 个项目。

目标项目类型：

- Ethereum developer tools
- Web3 infrastructure tools
- AI developer tools
- 被 Ethereum builders 使用的开源库
- 社区维护的技术资源
- 和华语 Ethereum / 开源社区有关的项目

筛选标准：

- 有活跃 maintainer
- 公开 repository
- 有真实下游使用，或明确生态相关性
- 愿意添加 `SPARK.md`
- 愿意审阅并发布 dependency report
- 愿意参与 simulated allocation exercise
- 对 pledge candidate：愿意探索 Pledge Addendum 或公开承诺

Cohort 项目获得：

- SPARK.md 接入支持
- Dependency Report
- Pledge / Addendum 协助
- Public dashboard listing
- 第一轮 seed funding distribution 资格
- 社区和生态曝光

## 7. 里程碑与拨款安排

我们申请 **USD 100,000**，按 6 个月里程碑分期拨款。

| 里程碑 | 时间 | 拨款 | 交付物 |
| --- | --- | ---: | --- |
| M1：Specification and architecture | 第 1 个月 | $15,000 | 技术架构、SPARK.md v0.1 draft、registry schema、cohort selection criteria、公开项目 repo |
| M2：Registry and SPARK.md tooling | 第 2 个月 | $15,000 | Pledge Registry v0.1、GitHub / domain / wallet identity flow、SPARK.md templates、validator、GitHub Action / CLI prototype |
| M3：Dependency Funnel and first reports | 第 3–4 个月 | $15,000 | Dependency Funnel v0.1，覆盖 npm、PyPI、Cargo、Go、Maven；5+ preliminary Dependency Reports；methodology notes |
| M4：Dashboard, license outreach and simulation round | 第 5 个月 | $20,000 | Public Accountability Dashboard v0.1、10+ cohort reports、simulated allocation round、SPARK Pledge Addendum v0.1、机构 / OSPO 反馈启动 |
| M5：Real distribution and final report | 第 6 个月 | $35,000 | 第一轮真实资金分发、maintainer claim workflow、public cohort report、SPARK.md spec、Dependency Funnel methodology、License compatibility memo、海外 BD / 大会布道总结 |
| **合计** | **6 个月** | **$100,000** |  |

这个结构可以调整。如果 EF 希望先用更小金额启动，也可以先做 M1–M2 的 scoped Phase 1 grant，评审后再扩展。

## 8. 预算拆分

| 类别 | 金额 | 说明 |
| --- | ---: | --- |
| Registry and Ethereum attestations | $7,000 | Pledge Registry、身份绑定、EAS / attestation 集成、数据模型、可审计性 |
| Dependency Funnel | $10,000 | Package ecosystem 集成、依赖展开、GitHub mapping、scoring methodology、report generation；优先复用现有数据源和社区资源 |
| SPARK.md tooling | $5,000 | Specification、templates、validator、CLI helper、GitHub Action、文档 |
| Public Accountability Dashboard | $6,000 | 公开项目页、报告、pledge states、distribution records、maintainer claim status |
| Cohort operations and maintainer outreach | $7,000 | Cohort onboarding、dependency report review、上游 maintainer outreach、社区协调 |
| SPARK Seed Pool distribution | $50,000 | 包含在本次 $100,000 grant 内，用于第一轮上游维护者真实资助；最终分配会公开，并基于方法论生成 |
| License / Addendum institutional outreach and overseas BD | $12,000 | SPARK Pledge Addendum、AI Attribution Clause、compatibility memo、法律 / OSPO 反馈、海外机构沟通、会议布道和合作拓展 |
| Reporting, translation, and documentation | $3,000 | 公开报告、中英文文档、final write-up、生态传播材料 |
| **合计** | **$100,000** |  |

Grant 资助的工作会开源和公开。Seed distribution 的 **$50,000** 包含在本次总预算内，是第一阶段最大预算项。这样的预算结构让 grant 资金优先流向真实上游维护者资助，同时支持必要的 maintainer outreach、license / OSPO 沟通、海外机构 BD 和会议布道。工程交付仍覆盖 Registry、Dependency Funnel、SPARK.md tooling 和 Public Dashboard v0.1。后续如果有社区捐赠、生态合作方或 matching funds，可以扩充 Seed Pool，但不会影响本 grant 的交付范围。

## 9. 交付物

6 个月结束时，OpenSeed 会交付：

1. 开源 Pledge Registry v0.1
2. 开源 Dependency Funnel v0.1
3. SPARK.md v0.1 specification
4. SPARK.md templates and examples
5. SPARK.md validator / GitHub Action / CLI helper
6. Public Accountability Dashboard v0.1
7. 10+ public Dependency Reports
8. 10+ simulated allocation recommendations
9. 一轮面向上游维护者的真实 seed funding distribution
10. Public cohort report
11. SPARK Pledge Addendum v0.1
12. SPARK AI Attribution Clause v0.1
13. License compatibility memo
14. Maintainer / OSPO FAQ
15. License / Pledge institutional feedback notes
16. Overseas BD and conference advocacy summary
17. 供其他生态 fork 或复用的 workflow 文档

## 10. 成功指标

| 指标 | 6 个月目标 |
| --- | ---: |
| Cohort 项目接入 | 10–15 |
| 添加 SPARK.md 的项目 | 10+ |
| 发布 Dependency Reports | 10+ |
| 覆盖 package ecosystem | 5 |
| 映射上游依赖 | 100+ |
| 完成模拟分配 | 10+ |
| 完成真实资助分发 | 1 轮，合计 $50,000 |
| 联系 maintainer | 30+ |
| 成功 claim funding 的 maintainer | 10+ |
| 试用 SPARK Pledge Addendum 的项目 | 3–5 |
| 测试 SPARK License Draft 的项目 | 1–2 |
| 公开评审或反馈的社区 / 组织 | 2+ |
| OSPO / legal / foundation 访谈或反馈 | 8+ |
| 海外会议、side event 或线上公开分享 | 2+ |
| Public Dashboard | 上线 |
| Final methodology report | 发布 |

## 11. 开源承诺

本 grant 下开发的软件和规范都会开源或免费公开。

预期 repositories 和 artifacts：

- `openseed-registry`
- `dependency-funnel`
- `spark-md`
- `spark-md-action`
- `openseed-dashboard`
- `SPARK.md` specification
- Dependency Funnel methodology
- Cohort report template
- SPARK Pledge Addendum v0.1
- SPARK AI Attribution Clause v0.1
- License compatibility memo

这套系统应该可以被 Ethereum 社区审查，也可以被其他生态复用。

## 12. 团队

**林旅强（Richard Lin）**：OpenSeed 联合创始人。开源社联合创始人，开源社是中国重要的厂商中立开源社区之一，也是首个加入 OSI 的中国组织。现任 Datastrato.ai 开源生态负责人，曾任华为云和零一万物开发者生态负责人，长期参与 Apache、Linux Foundation、OSI 等开源社区。

**许银（Ian Xu）**：OpenSeed 联合创始人。开源社理事，OpenBuild 社区创始人，RustCC 和 PyChina 社区核心贡献者。2025 年 4 月起加入 SPARK 工作组 Signal 频道。

**辛庆（Cynthia Xin）**：OpenSeed 联合创始人。PyChina 社区主理人。

**社区基础**：OpenBuild、开源社、PyChina 和 RustCC 覆盖华语 Web3、开源、Python 和 Rust 开发者社区，可以帮助识别首批 Cohort 项目、收集 maintainer 反馈，并传播最终方法论。

## 13. 风险管理

| 风险 | 应对 |
| --- | --- |
| Dependency scoring 被认为主观 | 公开方法论，暴露权重因素，允许项目注释，把 Funnel 定位为 recommendation engine 而不是 judge |
| AI attribution 被过度承诺 | 不声称能完整检测 AI provenance；第一阶段只用 SPARK.md 和人工声明作为实际可落地层 |
| SPARK License 法律复杂度高 | Phase 1 只做评审材料；实际落地优先 SPARK.md 和 Pledge Addendum |
| Maintainer 不认领资金 | 第一轮分发采用分批 claim 和多渠道联系，支持 GitHub Sponsors / OpenCollective / Ethereum wallet，并把未认领状态公开展示 |
| Cohort 项目差异太大 | 从 10–15 个项目开始，使用统一 report template，优先活跃 maintainer 和公开 repo |
| Funding workflow 过复杂 | 尽量使用现有 Ethereum 工具，例如 Safe、EAS、stablecoin transfers；v0.1 保持简单 |

## 14. 与现有资助工具的关系

OpenSeed 不替代 Gitcoin、Octant、Drips、RetroPGF 或 EF grants。

它可以通过提供更好的 dependency data 和 attribution records 来补充它们。

- Gitcoin-style funding 可以把 dependency reports 作为额外信号。
- Retroactive funding rounds 可以用 OpenSeed reports 识别上游维护者。
- Drips-like dependency splitting 可以受益于 SPARK.md declarations 和 dependency mapping。
- EF 和其他基金会可以用 OpenSeed reports 理解哪些上游项目支撑了关键生态工作。

OpenSeed 的具体贡献是缺失的 attribution layer：让项目能声明自己、映射依赖、解释分配建议，并公开资金记录。

## 15. 参考与对齐说明

本 proposal 参考并对齐以下 Ethereum 生态材料：

1. Ethereum Foundation Ecosystem Support Program：mission、scope、process 和 selection criteria。ESP 支持强化 Ethereum 基础并帮助 builders 的 free and open-source work。
2. ESP 更新后的 grant 模式：Wishlist 和 RFP，用于更主动、更聚焦、更 outcome-oriented 的支持。
3. ESP Funded Projects database：近期对 infrastructure、developer tooling、research、ecosystem development 和 public goods 的支持。
4. Vitalik Buterin《We should talk less about public goods funding and more about open source funding》：把 open source 作为更清晰、更不容易被游戏化的资助对象。
5. Ethereum Foundation Funding Coordination《This Is Fine (Until the Grant Runs Out)》：分析 Ethereum 相关关键开源公共物品的可持续性缺口。
6. Gitcoin、Octant、Drips、RetroPGF 等现有生态机制：作为 public-goods funding 和 dependency-aware funding 的相关先例。

## 16. 结语

OpenSeed 从一个很实际的判断出发：开源资助应该更容易追踪、更容易解释，也更难被游戏化。

Ethereum 是这套机制的优先落地环境。它有公共物品文化，有工具，有真实依赖面。AI 时代让这个问题更紧迫，因为开源影响正在变得更不可见，而越来越多软件正在基于已有开源工作被生成。

通过一笔 **USD 100,000、按里程碑分期拨款** 的 grant，OpenSeed 可以交付 v0.1 系统，接入第一批 Cohort，发布 dependency reports，跑通一轮真实资助，并把方法论作为面向 Ethereum 和更广泛开源生态的开放基础设施发布。
