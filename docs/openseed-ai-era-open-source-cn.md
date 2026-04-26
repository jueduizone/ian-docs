---
description: "OpenSeed：面向 AI 时代的开源归因与资助基础设施"
hidden: true
---
# OpenSeed：面向 AI 时代的开源归因与资助基础设施

## 1. 核心定位

OpenSeed 从 Ethereum 生态开始试点，目标是建立一套面向 AI 时代的开源归因与资助基础设施。

Ethereum 适合作为第一站：它有公共物品资助文化、可编程资金、链上公开账本，也有大量真实开源依赖。OpenSeed 借这个环境先跑通机制，再把标准推广到更广泛的开源社区。

AI 正在改变开源依赖关系。开发者可以通过 AI 调用、参考、fork、重写开源项目，却不一定留下 package manifest、import 或 fork history。OpenSeed 要让这些影响重新变得可声明、可追溯、可资助。

## 2. 问题

传统开源资助主要依赖三类信号：

1. 谁提交了代码
2. 谁被 package manager 依赖
3. 谁会写 grant proposal

AI 时代，这些信号不够了。

一个开源项目可能被 AI 工具反复参考，但没有 import。

一个 repo 可能被 AI fork 成多个变体，但原项目维护者不知道。

一个架构模式、算法实现、工程判断可能被大量复用，但不会出现在 dependency graph 里。

同时，AI 让代码生成更便宜，却让维护、审查、判断和长期责任更贵。真正稀缺的是长期维护者、稳定项目、真实下游依赖和社区信任。

OpenSeed 要解决的是：在 AI 让依赖关系变得不可见之后，重新建立开源归因、承诺和资金回流机制。

## 3. 第一阶段目标

第一阶段跑通四件事。

### 3.1 记录承诺

项目公开声明未来商业化后，愿意将一部分收入、代币或年度预算回流给公共物品和上游依赖。

这个承诺使用参数化模板，不写死比例。常用参数包括：

1. Public Goods Allocation：流向公共物品资金池
2. Dependency Allocation：流向项目直接或间接依赖的上游项目
3. Grace Period：商业化后的宽限期
4. Trigger：收入、TGE、融资、商业发布等触发条件

### 3.2 追踪显性依赖

系统通过 package manifest、deps.dev、GitHub metadata 等数据源，识别项目使用了哪些上游开源项目。

第一阶段覆盖 npm、PyPI、Cargo、Go、Maven 等生态。

### 3.3 建立 AI 时代的声明入口

通过 `SPARK.md`，项目声明自己的身份、依赖关系、资助方式、AI 使用规则和归因要求。

开发者、扫描器、AI 工具都可以读取这个文件。

### 3.4 公开资金流和履约状态

Dashboard 展示项目承诺、报告提交、分配建议、资金分发、待认领项目和 Cohort 进展。

这里用 Public Accountability Dashboard 或 Transparency Dashboard，不用 Compliance Dashboard。OpenSeed 做公开问责，不做监管。

## 4. 产品结构

### 4.1 Pledge Registry

记录谁承诺了什么。

功能包括：

1. 项目注册
2. GitHub、域名、钱包身份绑定
3. 承诺参数记录
4. 宽限期记录
5. 年度报告记录
6. 公开状态查询

第一阶段可以用 EAS 或链上 attestation 做公开存证，复杂资金逻辑放到后续阶段。

### 4.2 Dependency Funnel

生成依赖分析和资金分配建议。

功能包括：

1. 扫描 package 依赖
2. 展开直接依赖和传递依赖
3. 映射 GitHub repo 和维护者信息
4. 计算建议分配权重
5. 输出可解释理由
6. 支持项目人工补充遗漏依赖

Dependency Funnel 是建议器。系统给出透明、可解释的分配建议，项目可以接受、调整或补充说明。

### 4.3 SPARK.md

`SPARK.md` 是项目级归因声明文件，放在仓库根目录。

它应该像 `README.md`、`LICENSE`、`SECURITY.md`、`FUNDING.yml` 一样简单。

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

4% 和 1% 是默认模板。不同项目可以按阶段、收入、代币模型、组织形态调整。

### 4.4 Public Accountability Dashboard

Dashboard 回答两个问题：承诺有没有履行，资金流向哪里。

展示内容包括：

1. 注册项目列表
2. 承诺参数
3. 报告提交情况
4. 依赖分配建议
5. 资金分发记录
6. 待认领项目
7. Cohort 试点进展

## 5. 为什么从 Ethereum 开始

Ethereum 是第一套 funding and accountability backend。

原因有四个：

1. Ethereum 有长期公共物品资助文化
2. Ethereum 项目大量依赖开源基础设施
3. 链上记录适合做公开承诺和资金流透明化
4. 稳定币和智能合约适合验证 programmable funding

OpenSeed 的长期对象包括开源项目、AI 工具、基金会、企业开源办公室和开发者社区。

## 6. 执行步骤

### 第一步：完成第一阶段交付

交付四个产品模块：

1. Pledge Registry v0.1
2. Dependency Funnel v0.1
3. SPARK.md v0.1
4. Public Accountability Dashboard v0.1

同时启动 SPARK License 草案和 AI runtime attribution 接口设计。

### 第二步：确定 Cohort 1

从 Ethereum 生态和华语开源社区中选择 10 到 15 个项目。

筛选标准：

1. 有真实维护者
2. 有持续维护记录
3. 有明确下游使用场景
4. 愿意公开声明依赖和资助承诺
5. 愿意添加 `SPARK.md`

项目类型包括 Web3 工具、开发者工具、AI 工具、通用开源库。

### 第三步：生成 Dependency Report

为每个 Cohort 项目生成一份依赖报告。

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

配套提供：

1. 模板
2. GitHub Action 校验
3. CLI 初始化命令
4. 文档说明
5. Badge

目标是让 `SPARK.md` 成为低摩擦声明习惯。

### 第五步：完成模拟分配

先跑一轮模拟分配，展示：

1. 如果项目贡献 dependency allocation，资金会流向哪些上游
2. 每个上游项目为什么获得这个权重
3. 哪些项目可以直接认领
4. 哪些项目需要人工 outreach

这一步验证算法和用户理解成本。

### 第六步：完成第一轮真实资助

从种子资金池拿出一小笔资金做真实分发。

流程：

1. 生成分配建议
2. 项目确认
3. 上游维护者 outreach
4. 维护者认领
5. 资金分发
6. Dashboard 公开记录

重点是跑通流程，不是金额大小。

### 第七步：沉淀开放标准

试点结束后发布三份文档：

1. `SPARK.md` specification
2. Dependency Funnel methodology
3. OpenSeed Cohort 1 report

这三份文档决定 OpenSeed 能否从 Ethereum 试点走向通用开源基础设施。

## 7. SPARK License

SPARK License 第一阶段要有版本出来，第二阶段再推动规模化落地。

它解决的是承诺能否随代码传播：项目被下游使用、fork、商业化之后，公共物品回流义务是否能跟着代码一起传递。

### 7.1 第一阶段交付

第一阶段交付四份材料：

1. `SPARK License Draft v0.1`
2. `SPARK Pledge Addendum v0.1`
3. `SPARK AI Attribution Clause v0.1`
4. `License compatibility memo`

`SPARK License Draft v0.1` 是完整许可证草案，用来接受社区、基金会和法律顾问审查。

`SPARK Pledge Addendum v0.1` 是轻量版本。项目保留原许可证，只额外放一个承诺文件，声明商业化后按约定比例回流资金。

`SPARK AI Attribution Clause v0.1` 说明 AI 训练、检索、代码生成、agent fork 等场景下，项目希望如何被归因和申报。

`License compatibility memo` 说明 SPARK License 和 MIT、Apache、GPL、Open Source Definition、SPDX 流程的关系。

### 7.2 第一阶段认可目标

第一阶段拿到初步认可。

目标包括：

1. 3 到 5 个 Cohort 项目采用 `SPARK Pledge Addendum`
2. 1 到 2 个新项目试用 `SPARK License Draft`
3. 至少 2 个社区、组织或基金会公开支持继续评审
4. 至少 1 位开源法律或 OSPO 背景顾问完成书面反馈
5. 发布一版 FAQ，回答企业法务和开源维护者最关心的问题

### 7.3 第二阶段落地

第二阶段推动小规模真实采用。

优先对象：

1. 新项目
2. AI devtool
3. agent framework
4. 开源基础设施工具
5. 明确支持 recursive funding 的社区项目

成熟项目先采用 `SPARK.md` 和 `SPARK Pledge Addendum`，再评估是否切换许可证。

## 8. 后续扩展：AI Runtime Attribution

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

第一阶段只预留接口，不做主交付。

## 9. 一句话总结

OpenSeed 从 Ethereum dependency funding 试点开始，目标是成为 AI 时代的开源归因与资助基础设施。

它让项目能声明自己，让依赖能被追溯，让资金能回流，让 AI 造成的隐性开源影响重新变得可见。
