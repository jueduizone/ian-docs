---
description: "OpenSeed Agentic Open License 0.1 中文版：面向 AI 与 Agent 时代的开源许可证草案"
hidden: true
---
# OpenSeed Agentic Open License 0.1 中文版

**This article is also available in English:** [English version](https://ian-docs.vercel.app/docs/openseed-agentic-open-license-v0-1)

面向社区、OSPO、法律顾问和开源生态评审的草案。

> 状态：Draft v0.1  
> 许可证维护方：OpenSeed  
> 简称：OSAO-0.1  
> SPDX identifier：暂未分配  
> OSI 状态：尚未提交 / 尚未批准  
> 适用场景：AI 辅助开发、Agent 自动复用、开源软件归因保留、来源可见性、依赖资助元数据，以及自愿上游回馈。

## 重要说明

本许可证草案尚未获得 Open Source Initiative（OSI）批准。在完成 OSI 许可证评审流程之前，不应将使用本许可证的软件描述为 “OSI Approved”。

本草案旨在保留开源软件自由，同时让许可证实践适配 AI 辅助开发、软件 Agent、自动代码生成、机器可读归因、来源元数据，以及自愿的依赖感知资助。

本草案不构成法律意见。项目在生产环境采用前，应咨询合格法律顾问。

## 设计定位

OpenSeed Agentic Open License 不是为了限制 AI 使用，也不是为了设置强制权利金或使用费。

它要解决的是一个更窄但重要的问题：

> 在 AI 辅助开发和 Agent 参与的软件供应链中，归因、来源、维护者资助信息和依赖关系很容易被抹掉。OpenSeed 希望在不阻止使用、修改、分发、商业使用、AI 训练或 Agent 工作流的前提下，让这些信号继续可见。

核心原则是：

> 软件自由由许可证保障；商业化回馈则放在自愿公开承诺和机器可读元数据中。

## 与传统许可证的区别

| 维度 | MIT / BSD | Apache-2.0 | GPL / AGPL | OpenSeed Agentic Open License 0.1 |
| --- | --- | --- | --- | --- |
| 商业使用 | 允许 | 允许 | 允许，但有 copyleft 义务 | 允许 |
| 修改 | 允许 | 允许 | 允许，但有源码义务 | 允许 |
| 再分发 | 允许 | 允许，需保留声明 | 允许，有 copyleft 义务 | 允许，需保留声明和元数据 |
| 专利授权 | 弱 / 隐含 | 明确 | 明确 | 明确，参考 Apache |
| AI 训练 / 索引 | 未处理 | 未处理 | 未处理 | 明确允许 |
| AI 输出边界 | 未处理 | 未处理 | 未处理 | 输出内容不自动受本许可证约束，除非其中复制或改编了受保护表达 |
| Agent 自动分发 | 未处理 | 未处理 | 未处理 | Agent 代表操作者分发时，操作者仍需负责合规 |
| 机器可读归因 | 未处理 | NOTICE | 许可证声明 | 保留 SPARK.md / OPENSEED-NOTICE / 资助元数据 |
| 依赖元数据 | 未处理 | 未处理 | 未处理 | 正式承认并要求分发时保留 |
| 商业化回馈 | 未处理 | 未处理 | 未处理 | 自愿承诺层，不是许可证费用 |
| 强制付款 | 无 | 无 | 无 | 无 |
| 注册表要求 | 无 | 无 | 无 | 无 |
| Badge / Logo 展示 | 无 | 无 | 无 | 无 |

## 推荐文件组合

采用 OpenSeed 的项目建议使用四个独立文件：

1. `LICENSE` — OpenSeed Agentic Open License 0.1。
2. `SPARK.md` — 机器可读的归因、维护者、依赖、AI 引用、资助和承诺元数据。
3. `OPENSEED-NOTICE` — 人类可读的归因和资助说明。
4. `SPARK-PLEDGE.md` — 自愿的商业化和上游回馈承诺。

许可证负责授予软件自由；承诺文件负责建立公开问责。

---

# OpenSeed Agentic Open License 0.1 中文参考译文

版权所有 (c) [年份] [版权所有者]

## 1. 定义

“许可证”指本 OpenSeed Agentic Open License 0.1。

“许可方”指根据本许可证授权的版权所有者，或经版权所有者授权的实体。

“作品”指根据本许可证提供的软件、文档、数据文件、配置文件、示例、模板或其他可受版权保护的材料。

“贡献”指版权所有者，或经版权所有者授权的实体，有意提交给许可方并纳入作品的原创内容。

“贡献者”指许可方以及提供贡献的任何个人或实体。

“你”或“你的”指行使本许可证所授予权利的任何个人或实体。

“衍生作品”指基于作品形成的任何作品，包括修改、改编、翻译，或根据适用版权法需要许可的其他作品。

“源码形式”指用于进行修改的首选形式。

“目标形式”指源码形式经机械转换或翻译后形成的任何形式，包括编译后的目标代码、生成的文档、压缩文件、打包文件、软件包制品或转换格式。

“OpenSeed 元数据”指随作品一起提供的机器可读或人类可读文件，用于描述归因、来源、维护者信息、资助信息、依赖关系、AI 引用偏好或自愿资助承诺。示例包括 `SPARK.md`、`OPENSEED-NOTICE`、`NOTICE`、`FUNDING.yml`、`CITATION.cff`、依赖报告、维护者记录或等价文件。

“Agent 系统”指 AI 系统、软件 Agent、代码助手、构建服务、包管理器、持续集成服务、部署系统、自主开发工具，或其他自动系统；这些系统可能复制、修改、打包、发布、分发、索引、分析、检索、生成或以其他方式处理软件或相关材料。

## 2. 版权授权

在遵守本许可证条款和条件的前提下，每位贡献者授予你一项永久、全球、非独占、免费、免权利金、不可撤销的版权许可，允许你复制、制作衍生作品、公开展示、公开表演、再授权，以及以源码形式或目标形式分发作品和衍生作品。

## 3. 专利授权

在遵守本许可证条款和条件的前提下，每位贡献者授予你一项永久、全球、非独占、免费、免权利金、不可撤销的专利许可，允许你制造、委托制造、使用、许诺销售、销售、进口以及以其他方式转让作品。

该专利许可仅适用于该贡献者可许可的专利权利要求，且这些权利要求必须是由该贡献者的贡献单独，或该贡献与其提交至的作品组合后必然构成侵权的权利要求。

如果你对任何实体提起专利诉讼，主张作品或纳入作品的贡献构成直接或间接专利侵权，则本许可证下授予你的、与该作品相关的任何专利许可，自该诉讼提交之日起终止。

## 4. 再分发条件

你可以在任何媒介中复制和分发作品或衍生作品，无论是否修改，无论以源码形式或目标形式，前提是你遵守以下条件。

### 4.1 许可证副本

你必须向作品或衍生作品的接收者提供本许可证的副本，或提供一个清晰的引用，说明可以在哪里获得本许可证。

### 4.2 版权和法律声明

你必须保留作品源码形式中的版权、专利、商标、归因和许可证声明，但可以排除与衍生作品任何部分无关的声明。

### 4.3 修改文件

如果你修改作品并分发修改后的文件，你必须在修改后的文件中加入明显声明，说明你修改了这些文件。

### 4.4 OpenSeed 元数据保留

如果作品包含 OpenSeed 元数据，当你分发作品或衍生作品时，你必须保留这些 OpenSeed 元数据的可读副本，但可以排除与所分发材料任何部分无关的条目。

你可以通过在以下至少一个位置包含相关元数据来满足该要求：

1. 随分发一起提供的 `SPARK.md`、`OPENSEED-NOTICE`、`NOTICE`、`FUNDING.yml`、`CITATION.cff` 或等价文件；
2. 随作品或衍生作品分发的源码形式或文档；
3. 相关生态中通常使用的软件包元数据文件；
4. 法律声明页面或文档页面，前提是该页面本来就用于展示第三方法律声明。

本条不要求你在用户界面中展示任何商标、Badge、Logo、背书声明、资助请求或归因声明。

### 4.5 无背书

除非事先获得书面许可，你不得使用许可方、贡献者、OpenSeed、维护者或上游项目的名称、商标、服务标识或 Logo 来背书或推广你的产品或服务。但为提供法律要求的声明或真实归因而进行的必要使用除外。

## 5. AI 和 Agent 使用

### 5.1 许可说明

为避免歧义，本许可证允许将作品用于人工智能、机器学习、软件 Agent、自动代码生成、索引、搜索、检索、分析、基准测试、代码补全、代码转换、漏洞分析、文档生成、依赖分析以及类似技术用途。

### 5.2 AI 输出不自动受约束

AI 系统、机器学习模型、软件 Agent、代码助手或自动开发工具生成的输出，不会仅因为该系统、模型、Agent 或工具训练、分析、索引、检索、提示或以其他方式处理过作品，就自动受本许可证约束。

但是，如果某个输出包含复制或改编自作品的部分，并且该部分根据适用版权法需要许可，则相关许可证条件仍然适用于这些复制或改编部分。

### 5.3 Agent 参与场景下的合规责任

如果 Agent 系统代表你复制、修改、打包、发布、分发或以其他方式传递作品或衍生作品，你仍然负责遵守本许可证。

使用自动化工具，并不会消除你在分发作品或衍生作品时保留适用许可证声明、版权声明、修改声明和 OpenSeed 元数据的义务。

### 5.4 归因信号保留

当你分发作品或衍生作品时，不得故意移除或遮蔽随作品一起提供的版权声明、许可证声明、OpenSeed 元数据、归因元数据、来源元数据或维护者资助元数据，但这些声明或元数据与所分发材料任何部分无关的除外。

## 6. 依赖可见性

作品可能列明影响或支持该作品的上游项目、维护者、软件包、数据集、模型、工具、文档、标准或其他依赖。

这些依赖信息用于改善归因、来源追踪、安全审查、软件供应链透明度、维护者发现和自愿资助协调。

本许可证不要求你接受任何依赖评分、分配建议、资助承诺、公共物品分配、注册状态或依赖报告，除非你另行以书面形式同意。

如果你再分发作品中包含的依赖信息，不应故意歪曲作品与所列依赖之间的关系。

## 7. 自愿资助和商业化承诺

作品可以包含 OpenSeed 元数据或单独的承诺文件，用于描述在商业化后支持上游依赖、维护者、开源公共物品或生态资助池的自愿承诺。

该承诺可以定义收入、融资、Token、产品发布、企业合同、基金会预算或其他商业化触发条件，以及宽限期、分配比例、依赖报告、分发流程和公开问责方式。

除非另有书面协议，此类承诺不是本许可证的条件。本许可证不要求你支付权利金或使用费、捐赠、注册 OpenSeed 或任何第三方服务、发布依赖报告、进行公共物品分配、进行依赖分配或采纳任何资助承诺。

该承诺的目的，是在不限制软件自由的前提下，为上游回馈建立公开问责。

## 8. 无额外限制

你不得施加法律条款或技术措施，限制接收者行使本许可证授予的权利。

你可以收费提供保证、支持、赔偿、托管、咨询、部署、培训或其他服务。

你可以对自己的贡献或更大范围的作品采用额外或不同条款，但前提是你对本作品的使用、复制、修改和分发仍然遵守本许可证。

## 9. 商标

本许可证不授予使用许可方、贡献者、OpenSeed、维护者或上游项目的商号、商标、服务标识、产品名称、Logo 或品牌特征的许可。但为了合理且惯常地描述作品来源，以及复制本许可证要求的声明所必需的使用除外。

## 10. 免责声明

作品按 “AS IS” 提供，不附带任何明示或暗示的保证，包括但不限于适销性、特定用途适用性、不侵权、权属、准确性、安全性或无缺陷的保证。

你应自行负责判断使用、修改、分发、训练、索引、部署或以其他方式处理作品是否适当。

## 11. 责任限制

在任何情况下，无论基于侵权、合同或其他法律理论，除非适用法律要求或书面同意，任何许可方或贡献者均不对你承担因使用或无法使用作品而产生的损害责任，包括直接、间接、特殊、附带、后果性、惩戒性或惩罚性损害，即使其已被告知可能发生此类损害。

## 12. 接受

你不需要为了接收或运行作品副本而接受本许可证。但是，除本许可证外，没有其他内容授予你行使那些在版权法或专利法下本需获得许可的权利。

一旦你行使本许可证授予的任何权利，即表示你接受并同意受本许可证条款约束。

## 13. 版本

本版本为 OpenSeed Agentic Open License 0.1。

许可证维护方可能发布后续版本。除非作品明确声明也可以使用后续版本，否则你可以按本版本使用作品。

条款结束。

---

# OPENSEED-NOTICE 模板

```text
OPENSEED-NOTICE

项目： [project name]
Repository： [repository URL]
License： OpenSeed Agentic Open License 0.1
License file： LICENSE

维护者：
  - [name / handle / contact]

Preferred attribution：
  [short human-readable attribution text]

Funding：
  Accepts funding： [yes/no]
  Preferred funding methods：
    - GitHub Sponsors： [URL]
    - OpenCollective： [URL]
    - Ethereum wallet： [address]
    - Other： [URL]

Dependency funding：
  This project participates in dependency-aware funding experiments.
  Dependency reports, if any, are published at：
  [URL]

AI and agentic reuse：
  AI-assisted development, indexing, search, retrieval, analysis, and agentic
  software workflows are allowed under the applicable license terms.

  If this project is intentionally included as a named source in a dataset,
  benchmark, model package, software package, retrieval corpus, agent toolset,
  or code-generation corpus, the maintainers prefer the following attribution：
  [preferred citation]

Voluntary pledge：
  Any public-goods allocation, dependency allocation, commercialisation pledge,
  or upstream return commitment is voluntary unless separately agreed in writing.
  Pledge details, if any：
  [URL or text]
```

---

# SPARK.md 模板

```yaml
version: "0.1"

project:
  name: example-project
  repository: https://github.com/example/project
  homepage: https://example.org
  license: OpenSeed Agentic Open License 0.1
  license_file: LICENSE
  notice_file: OPENSEED-NOTICE

maintainers:
  - name: Alice
    github: alice
    contact: alice@example.org

attribution:
  preferred_citation: "example-project by Alice and contributors"
  ai_reference_allowed: true
  ai_reference_note: >
    AI-assisted development, indexing, search, retrieval, analysis, and agentic
    software workflows are allowed under the project license. If this project is
    intentionally included as a named source in a dataset, benchmark, model
    package, software package, retrieval corpus, agent toolset, or code-generation
    corpus, maintainers prefer the citation above.

funding:
  accepts_funding: true
  methods:
    github_sponsors: https://github.com/sponsors/alice
    opencollective: https://opencollective.com/example
    ethereum: "0x0000000000000000000000000000000000000000"

openseed:
  registry_status: unregistered
  registry_url:
  dependency_report_url:
  pledge_url:

pledge:
  status: voluntary
  public_goods_allocation:
  dependency_allocation:
  grace_period:
  trigger:
  note: >
    Pledge terms are voluntary and are not conditions of the software license
    unless separately agreed in writing.

upstream:
  declared_dependencies:
    - name: upstream-lib
      repository: https://github.com/example/upstream-lib
      relationship: direct
      criticality: high
      funding_url:
```

---

# SPARK-PLEDGE.md 模板

```text
SPARK Pledge Addendum 0.1
自愿公开承诺

除非各方另行书面同意，本 Addendum 不是软件许可证的条件。

1. 项目

项目名称： [name]
Repository： [URL]
维护者或 steward： [name]
公开 registry entry： [URL]

2. 目的

项目发布此承诺，是为了让其与上游开源依赖的关系更可见，并支持依赖感知资助。

3. 商业化触发条件

当以下一个或多个条件发生时，本承诺可以被激活：

[ ] 付费产品发布
[ ] 年收入超过 [amount]
[ ] 签署企业合同
[ ] 完成融资
[ ] token generation event
[ ] 基金会 / grant 预算批准
[ ] 其他： [description]

4. 宽限期

项目可以在触发条件发生后设置 [duration] 的宽限期。

建议默认值：

- 尚未产生收入 / 研究项目 / 黑客松项目：不做付款承诺，只保留元数据
- early commercial project：首次商业收入后 12–24 个月
- funded startup or protocol：融资、TGE 或年度预算批准后

5. 自愿分配

如果项目达到上述触发条件，项目计划分配：

Public Goods Allocation： [x% or amount]
Dependency Allocation： [y% or amount]

这些分配旨在支持开源公共物品、上游依赖、维护者或相关资助池。

6. Dependency Report

项目计划在进行依赖分配前发布或更新依赖报告。

Dependency report 可以包括：

- 直接依赖
- 传递依赖
- 非 package 依赖
- AI reference declarations
- 维护者资助链接
- allocation recommendations
- project comments or adjustments

7. 公开问责

项目计划在公开位置发布分配决策、分发记录、维护者认领状态和未认领资金状态。

8. 非 License 条件

本承诺不是权利金要求、使用费、用途限制或 AI 使用限制，也不是使用、修改、复制、分发、训练、索引、检索、分析或以其他方式处理软件的条件。

9. 善意性质

本承诺是一项公开善意承诺。它用于透明度、协调和问责，不替代单独签署的商业合同、资助协议、投资协议或法律义务。
```

---

# 中文解释

## 一句话定位

OpenSeed Agentic Open License 是一个面向 AI 辅助开发和 Agent 自动化复用场景的宽松型开源许可证。它保留软件自由，同时让归因、来源、依赖关系和自愿资助信息在自动化软件供应链中保持可见。

## 它不是做什么

它不是：

- 限制 AI 训练的许可证；
- 非商业许可证；
- 强制分润许可证；
- 要求注册 OpenSeed 的许可证；
- 要求展示 Badge / Logo 的许可证；
- 让 AI 输出自动受许可证约束的许可证。

## 它要解决什么

AI 和 Agent 改变了软件复用方式：

- AI 工具可能参考、重写或组合开源代码；
- Agent 可能自动 fork、打包、发布或改写代码；
- 代码复用不一定留下 import、package manifest、fork history；
- 上游维护者和依赖关系更容易被抹掉；
- 商业化成功和上游回馈之间缺少公开机制。

OpenSeed 的回答是：

- 许可证保证自由使用、修改、分发、商业化；
- 元数据保留归因、来源、维护者、资助和依赖信息；
- 承诺文件处理商业化后的自愿回馈；
- Dashboard / registry 负责公开问责。

## 商业化和回馈如何处理

商业化回馈不写成许可证费用，而写成自愿公开承诺。

原因：如果许可证写成“商业化后必须支付 x% 收入”，它很可能不再符合开源的基本预期，也会被 OSI、OSPO 和企业法务拦住。

OpenSeed 采用的是：

> 自由使用 + 公开承诺 + 机器可读元数据 + 公开问责。

项目可以商业化，但如果它认同 OpenSeed，可以通过 `SPARK-PLEDGE.md` 声明：

- 什么条件触发回馈；
- 有多久宽限期；
- 拿多少比例支持公共物品；
- 拿多少比例支持上游依赖；
- 依赖报告如何生成；
- 资金流向如何公开。

## 推荐默认回馈模型

| 项目阶段 | 建议做法 |
| --- | --- |
| 尚未产生收入 / 黑客松 / 研究项目 | 只添加 SPARK.md，不做付款承诺 |
| 小规模商业发布 | 可承诺 0.5%–1% 依赖分配 |
| 已融资创业项目 | 可承诺 1% 依赖分配 + 1% 公共物品分配 |
| 协议 / 基金会 / Token 项目 | 可承诺 1% 依赖分配 + 3%–5% 公共物品分配 |
| 成熟公司 | 自定义年度开源预算 |

这些比例是模板，不是许可证条件。

## OSI 风险控制

为了尽量贴近 OSI / OSPO 可接受边界，v0.1 避免了这些高风险条款：

- 不限制商业使用；
- 不限制 AI 训练；
- 不限制用途领域；
- 不强制付款；
- 不要求连接 OpenSeed Registry；
- 不要求 UI 展示 badge；
- 不把主观依赖评分变成法律义务；
- 不让 AI 输出自动受许可证约束。

它做的温和创新是：

- 保留机器可读归因 / 资助 / 依赖元数据；
- 明确 AI / Agent 使用被允许；
- 明确 Agent 自动分发时操作者仍需合规；
- 明确 AI 输出的边界；
- 把商业化回馈放进自愿承诺和公开问责系统。

## 推荐采用路径

为了最大化生态接受度，OpenSeed 可以提供两条采用路径。

### 保守路径

软件使用 Apache-2.0，同时添加：

- `SPARK.md`
- `OPENSEED-NOTICE`
- `SPARK-PLEDGE.md`

这是 EF、OSPO 和企业采用风险最低的路径。

### OpenSeed 原生路径

软件使用 OpenSeed Agentic Open License 0.1，同时添加：

- `SPARK.md`
- `OPENSEED-NOTICE`
- `SPARK-PLEDGE.md`

这条路径 OpenSeed 身份更强，也更能体现 AI / Agent 时代差异，但在正式采用前应先由法律顾问审阅。

## 建议对外表述

不要说：

> OpenSeed forces AI companies to pay open-source projects.

应该说：

> OpenSeed preserves software freedom while keeping attribution, provenance, dependency, and voluntary funding metadata visible across AI-assisted and agentic software supply chains.

中文：

> OpenSeed 不靠许可证收税，而是把 AI 和 Agent 复用过程中最容易丢失的归因、来源、依赖关系和回馈入口保留下来，并把商业化后的上游回馈变成一种公开、可审计、可传播的开源信用机制。
