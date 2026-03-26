# Monad DevInsight — 产品方案
**v1.0 | 2026-03-26**

---

## 一、背景与目标

### 背景

Monad 生态快速扩张，官方运营团队需要持续了解生态内开发者和项目的活跃状态，以支撑：
- 资源分配决策（谁值得重点扶持）
- 活动效果评估（参加了 Hackathon / Bootcamp 之后开发者是否留存）
- 生态健康度汇报（向上汇报 or 对外展示）

### 目标

**让运营团队每周花 10 分钟，就能掌握生态内重点开发者和项目的动态。**

---

## 二、产品定位

> Monad DevInsight = Monad 生态运营团队的内部开发者/项目跟踪与分析工具

**用户：** Monad 官方运营团队（内部使用）

**核心场景：**
1. 维护一份"重点关注"开发者/项目名单
2. 每周自动汇总各对象的多维度活动数据
3. 可视化展示，支持运营决策

---

## 三、数据来源

| 来源 | 内容 | 接入方式 |
|------|------|---------|
| **各活动平台导出** | Hackathon/Bootcamp 参与记录、获奖情况 | CSV 导入（支持字段自动匹配） |
| **Web3Insight** | 开发者能力认证、Reputation 评分、技能标签 | API 对接（已有合作关系） |
| **GitHub API** | 仓库活跃度、commit 频率、star/fork 增长 | GitHub REST API |
| **Twitter/X** | 社媒活跃度、粉丝增长、内容质量 | twitterapi.io / RapidAPI |
| **Monad 链上数据** | 合约部署、交易活跃度 | Monad RPC / 区块浏览器 API |
| **管理员手动录入** | 项目状态、备注、标签、评级 | 后台管理界面 |

**数据采集频率：** 每天采集一次，每周生成汇总报告

---

## 四、核心功能

### 4.1 名单管理

- 管理员维护"重点关注"开发者名单（可导入 CSV 或逐条录入）
- 每个开发者关联：GitHub、Twitter、Monad 钱包地址、Web3Insight ID
- 支持打标签（如：Hackathon 获奖者、Bootcamp 毕业生、活跃贡献者）
- 支持分组（如：重点扶持、正常跟踪、已流失）

### 4.2 CSV 导入与开发者身份合并

**核心问题：** 各活动平台（Dorahacks、Luma、Questbook 等）导出字段不一致，同一个开发者可能在不同活动中用不同邮箱/用户名报名。

**字段自动匹配：**

```
上传 CSV → 系统识别列名 → 展示字段映射界面
  ↓
原始列：name / email / github_url / wallet / team_name / ...
  ↓
映射到系统字段：
  "name"         → 开发者姓名
  "email"        → 邮箱（主 Key）
  "github_url"   → GitHub 账号
  "wallet"       → 钱包地址
  "team_name"    → 所属团队（可选）
  [未识别字段]   → 存入 extra_data JSONB，不丢失数据
```

支持保存映射模板（同一平台下次导入直接复用）。

**开发者身份合并（Dedup）：**

系统用以下字段作为**合并 Key**，优先级从高到低：

1. **邮箱**（最可靠，同一邮箱 = 同一人）
2. **GitHub 账号**（次可靠）
3. **钱包地址**（链上唯一）
4. **姓名模糊匹配**（兜底，需人工确认）

导入流程：
```
上传 CSV → 字段映射 → 逐行匹配现有开发者
  ↓
完全匹配（邮箱/GitHub/钱包命中） → 自动合并，追加活动记录
部分匹配（姓名相似）             → 标记"疑似重复"，等管理员确认
无匹配                           → 新建开发者档案
  ↓
导入结果：新建 X 人 / 合并 Y 条记录 / X 条待确认
```

**每个开发者的活动记录独立存储：**

```
开发者 Alice
  ├── 参加活动：Monad Hackathon S1（2026-01，获奖：二等奖）
  ├── 参加活动：Monad Bootcamp W1（2026-02，状态：结业）
  └── 参加活动：ETHGlobal Bangkok（2025-11，外部活动）
```

### 4.3 项目管理

- 管理员维护生态项目名单
- 每个项目关联：GitHub Repo、网站、所属开发者、赛道/类别
- 项目状态：活跃开发中 / 已上线 / 停更 / 待评估

### 4.3 周报看板

每周自动生成，运营团队核心消费场景：

```
本周生态快照（2026-W13）
─────────────────────────────
📊 总览
  活跃开发者：47 / 120（本周有 GitHub 或链上活动）
  新加入项目：3 个
  本周 GitHub commits（全生态）：284

🔥 本周最活跃（TOP 5 开发者）
  1. @alice — 32 commits, 2 新合约部署
  2. @bob — 15 commits, 活跃社媒
  ...

⚠️ 需关注
  @charlie — 连续 3 周无活动（之前是 Hackathon 冠军）
  Project XYZ — GitHub 30 天无更新

📅 本周活动关联
  Monad Bootcamp Week 3 结业 → 12 名参与者，其中 8 人本周有后续开发活动
```

### 4.4 开发者详情页

单个开发者的完整 profile：

- 基础信息（GitHub / Twitter / 钱包）
- 活动参与历史（参加了哪些 Monad 活动）
- 多维度活动时间线（GitHub commit / 链上活动 / 社媒发布，统一时间轴）
- Web3Insight 能力评分
- 管理员备注 + 运营记录

### 4.5 项目详情页

单个项目的完整 profile：

- 基本信息 + 关联开发者
- GitHub 活跃趋势图（近 12 周 commit 量）
- 链上数据（合约部署时间、交易量趋势）
- 运营评级（管理员手动打分，1-5 星）
- 备注 + 运营记录

### 4.6 生态大盘

宏观视角，支持对外汇报：

- 活跃开发者数趋势（周/月）
- 项目数量 & 赛道分布（饼图）
- GitHub 活跃度热力图（生态整体）
- 活动转化漏斗（参加活动 → 有后续开发活动 → 活跃项目）

---

## 五、数据模型（补充现有 User/Project）

现有后端已有 `User` 和 `Project` 基础模型，需补充：

### 新增字段（User）

```go
// 新增字段
WalletAddress string  // Monad 钱包地址
Web3InsightId string  // Web3Insight ID
Tags          []string // 标签（Hackathon获奖者、Bootcamp毕业生等）
Group         string  // 分组（重点扶持/正常跟踪/已流失）
GithubStats   JSONB   // GitHub 聚合数据（每日更新）
TwitterStats  JSONB   // Twitter 聚合数据（每日更新）
ChainStats    JSONB   // 链上数据（每日更新）
Notes         string  // 管理员备注
```

### 新增字段（Project）

```go
Status       string  // 活跃开发中/已上线/停更/待评估
Category     string  // 赛道/类别
Rating       int     // 运营评级 1-5
GithubStats  JSONB   // GitHub 聚合数据
ChainStats   JSONB   // 链上数据
Notes        string  // 管理员备注
```

### 新增表

```
ActivityRecord    活动参与记录（开发者 × 活动，如 Hackathon/Bootcamp）
WeeklyReport      每周汇总报告（自动生成，可归档查看）
DataSnapshot      每日数据快照（历史数据，用于趋势图）
OperationLog      运营记录（管理员手动添加的跟进记录）
```

---

## 六、技术架构

```
前端（Next.js 16 + Ant Design 6 + Recharts）
  ├── 周报看板（首页）
  ├── 开发者列表 + 详情
  ├── 项目列表 + 详情
  ├── 生态大盘
  └── 管理后台（名单维护 + 数据导入）

后端（Go + Gin，已有基础）
  ├── 现有：User / Project CRUD API
  ├── 新增：ActivityRecord / WeeklyReport / DataSnapshot API
  └── 新增：数据采集 Worker（定时任务）

数据采集 Worker（Go 定时任务 or PM2）
  ├── GitHub API 采集（每日）
  ├── Twitter API 采集（每日）
  ├── 链上数据采集（每日）
  └── 周报生成（每周一凌晨）

数据库：PostgreSQL（现有）
```

---

## 七、MVP 范围

**Phase 1（2 周，核心流程跑通）**

- [ ] 管理员可以录入/管理开发者名单（GitHub/Twitter/钱包关联）
- [ ] GitHub 数据自动采集（每日 commit 数、活跃仓库）
- [ ] 开发者列表页（带活跃度排序、标签筛选）
- [ ] 开发者详情页（基础信息 + GitHub 活跃趋势）
- [ ] 简单周报（TOP 活跃开发者 + 本周无活动预警）

**Phase 2（后续）**

- [ ] Twitter 数据接入
- [ ] 链上数据接入
- [ ] Web3Insight 对接
- [ ] 活动参与记录（Hackathon/Bootcamp 关联）
- [ ] 生态大盘
- [ ] 周报自动推送（邮件或 Telegram）

---

## 九、账号体系

内部工具，需要登录验证，不对外开放。

**角色设计（两级）：**

| 角色 | 权限 |
|------|------|
| **Super Admin** | 管理员账号创建/删除、所有功能 |
| **Admin** | 数据录入、CSV 导入、查看所有看板、添加运营记录 |

**登录方式：** 邮箱 + 密码（内部工具，不需要 OAuth）

**账号管理：** Super Admin 在后台创建/停用管理员账号，不开放自助注册

**Session 方案：** JWT，7 天有效期，后端 `/v1/login` 接口（代码里已注释，待启用）

---

*Monad DevInsight v1.0 | 2026-03-26*
