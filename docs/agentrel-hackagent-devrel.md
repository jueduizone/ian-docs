# DevRel 这个角色，正在被 AI 接管

**作者：OpenBuild 社区**

---

## 一、DevRel 这个角色在发生什么

Web3 行业有一种职位叫 DevRel——Developer Relations。

他们的工作是：帮开发者理解一条链、降低上手门槛、在 Discord 里答疑、写教程、办 Hackathon、建社区信任。一个好的 DevRel 是开发者和生态之间的桥梁，既懂技术，又懂社区。

现在问题来了：每个开发者桌上都多了一个 AI Agent。

当一个开发者开始用 Cursor 或 Claude Code 写合约，他的第一反应不再是去 Discord 找 DevRel 问问题，而是直接问 AI。AI 在这里扮演了一个新角色——开发者和 Web3 生态之间的**新中间层**。

但这个中间层今天是断的。

AI 不知道这条链的 SDK 上周发了大版本更新，不知道这个协议的 API 已经废弃，不知道这个基金会 Q2 的 Grant 通道现在开着，不知道下个月有哪个 Hackathon 正在招募开发者。AI 接过了 DevRel 的位置，却没有 DevRel 的知识。

结果就是：开发者在用 AI 写代码，AI 生成的是三年前的写法，代码跑不起来，开发者还以为是自己的问题。

我们测试过。用 Claude 和 GPT-4o 回答 Ethereum 开发问题，不给任何额外上下文，准确率分别是 33% 和 16%。不是 AI 笨，是 AI 的训练数据赶不上 Web3 的迭代速度。

---

## 二、AgentRel：把 DevRel 的能力，喂给 AI

AgentRel 这个名字，是 Agent + Rel（Relation）。

我们在做的事，是把 DevRel 这个角色的核心能力——准确的技术知识、最新的生态动态、精准的 Grant 和 Bounty 机会——沉淀成可以被 AI Agent 消费的结构化知识层。

这不是一个 AI 产品，是一层 **context 基础设施**。

当一个开发者正在写 Monad 合约，他的 Agent 从 AgentRel 拿到了 Monad 最新的技术文档、当前开放的 Grant 窗口、社区的 best practice——这时候 AI 给他的建议才是真正有用的。转化率远高于一条 Twitter 推文。

用法很简单，一行命令：

```bash
npx skills add agentrel/web3-core
```

或者直接把这个 URL 加进你 AI 的系统提示词：

```
https://agentrel.xyz/api/v1/skill.md
```

加了 Ethereum Skills 之后，Claude 的准确率从 33% 涨到了 95%。

目前 AgentRel 上有 212+ 条 Skills，覆盖 25+ 个 Web3 生态：Ethereum、Solana、Starknet、Sui、TON、Monad、Zama 等等。这些内容一部分来自链方官方，更多来自社区贡献者。

---

## 三、一个让我们没有选择快路的原因

但在说我们怎么保证 Skill 质量之前，先说一件有点反直觉的事。

研发侠最近分享了一组数据：METR 在 2025 年做了一个随机对照实验，16 名资深开源开发者，246 个真实 issue，用了 AI 工具之后任务完成时间**反增 19%**。

不是 AI 不好用。是在复杂的存量代码库里，理解 + 验证 + 修正 AI 输出的成本，比 AI 生成节省的时间还要多。

开源社区正在真实地反应：curl 关掉了漏洞赏金，ghostty 禁止了外部 AI PR，tldraw 封锁了所有外部 PR。**AI 降低了贡献门槛，但没有降低 review 成本。维护者正在变成 AI PR 的审核员。**

这件事对 AgentRel 的影响很直接：我们不能走"量大管饱"的路线。一条低质量的 Skill 进了库，AI 用它生成了错误代码，这个坑比没有 Skill 还要深。

所以我们的质量体系是这样设计的：

每条 Skill 都要跑 eval——用标准题库测，看加了这条 Skill 之后 AI 的回答准确率有没有真实提升。健康度 = eval 准确率 × 50% + 反馈错误率 × 30% + 内容新鲜度 × 20%。低于 70% 自动降级，低于 50% 下架。

贡献分三级：
- **L1**：发现错误提 issue，最低门槛
- **L2**：贡献新 Skill 的 PR
- **L3**：成为某条链的长期维护者，有 Merge 权限，需链方推荐或 OpenBuild 邀请

L3 维护者需要真正长期跟进这条链——这种承诺，AI 目前替代不了。

研发侠的调研里有一句话说得很准：**AI 让代码生产成本趋近于零，稀缺的变成了架构判断力、长期维护承诺、社区信任、以及决定什么代码该存在的人类判断。** 这是我们做 AgentRel 的贡献体系时一直在想的事。

---

## 四、HackAgent：让评审这件事变得可信

我们同期在做的另一个产品是 HackAgent。

起点是 OpenBuild 自己的痛——我们参与组织了大量 Hackathon，组织方的苦我们都经历过：100 个项目，每个评委要逐一看，主观分差异极大，GitHub 代码认不认真写根本看不出来，评出来的结果很难服众，参赛者也不知道自己为什么得了这个分。

HackAgent 的核心逻辑：**让 AI 做初筛，让人做决策。**

组织方导入项目、设好维度权重（比如创新性 30%、落地可行性 25%、代码质量 20%），AI 并行跑 5 个模型打分——Claude、Gemini、GPT-4o、DeepSeek、MiniMax。评委看到的是 AI 的预分和维度拆解，在这个基础上调整确认，而不是从零开始看每个项目。

AI 能做人很难做到的客观判断：
- **GitHub 代码真实性**：识别空仓库、AI 生成比例过高的项目、commit 频率
- **Web3 背景分析**：团队的链上活跃度、社区知名度、KOL 识别
- **SonarQube 代码质量**：Bug 数、漏洞数、可维护性评级

这些维度有客观依据，评审结果才能向参赛者透明展示。

HackAgent 目前已跑完 100+ 个项目的 AI 分析，积累 502 条评委评分记录，今年 3 月完成了第一个真实 Hackathon 的完整评审流程。

---

## 五、它们要做同一件事

HackAgent 和 AgentRel 不是两个独立的工具，它们指向同一个方向：**让 Web3 开发者的能力被可信地证明。**

路径是这样的：

参加 HackAgent 上的 Hackathon → 获得 AI 客观评分 → 分数沉淀为 Reputation → 在 AgentRel 上匹配更好的 Grant 和 Bounty → 执行记录继续积累 → 形成可验证的 Web3 开发者身份

今天一个开发者想拿高门槛的 Grant，很难快速证明自己的水平——GitHub 活跃度、Hackathon 奖项、社区口碑都分散在各处，没有统一格式。我们要做的就是把这些执行记录统一起来，形成 AI 可读、可验证的开发者 Reputation。

这条路还很长，但每一步都是真实数据，不是凭空造出来的。

---

## 六、为什么是 OpenBuild 来做

这两个产品都是 OpenBuild 社区孵化的，两个都开源。

为什么是 OpenBuild？

因为 AgentRel 的护城河不是技术，是内容的可信度。一条 Official 认证的 Skill，背后需要真正理解这条链的 L3 维护者，需要链方愿意和我们合作，需要社区开发者持续反馈纠错。这些关系，是 OpenBuild 过去几年积累的开发者社区带来的，没有捷径。

HackAgent 也是。组织方信任这个工具，是因为背后有 OpenBuild 的信用。参赛者愿意在平台上展示自己，是因为这里有真实的开发者社区，不是数据孤岛。

我们对这件事有一个判断：**AI 会越来越多地站在开发者和 Web3 生态之间，DevRel 这个角色的形态会变，但它背后的东西——信任、知识、社区——不会消失，只会更稀缺。** AgentRel 就是要把这些东西做成基础设施，让 AI 能用，让开发者受益。

---

## 你现在可以做的事

**作为开发者：**
- 去 [agentrel.xyz](https://agentrel.xyz) 把 Skills 装进你的 AI，现在就能用
- 发现哪里不准确，提个 issue，这是最低门槛的贡献
- 深耕某条链的，考虑申请 L3 维护者——有分润，有链方认证资格

**作为 Hackathon 组织方：**
- 联系我们试用 [hackagent.vercel.app](https://hackagent.vercel.app)，目前邀请制开放
- 下一个活动用 AI 做预评，评委效率和结果可信度都会不一样

**作为任何人：**
- 两个项目都在 GitHub 开源，欢迎看代码、提 issue、贡献 PR
- 觉得这个方向有意思，加入 OpenBuild 社区一起做

---

AI 会让越来越多的代码被生产出来。但哪些代码值得存在，哪些开发者值得信任，哪些社区值得投资——这件事，始终需要人来判断。

我们在做的，就是让这个判断有据可依。

---

*AgentRel：[agentrel.xyz](https://agentrel.xyz) | 开源，MIT License*
*HackAgent：[hackagent.vercel.app](https://hackagent.vercel.app) | 邀请制开放中*
*OpenBuild 社区：[openbuild.xyz](https://openbuild.xyz)*
