# HackAgent — AI 驱动的 Hackathon 评审与管理平台
**产品文档 v1.0 | 2026-03-17**

| 版本 | 日期 | 主要变更 |
|------|------|---------|
| v0.1 | 2026-03 | 初版：CSV导入 + AI评分 + 报告页 |
| v0.5 | 2026-03 | 多人评审、评委邀请、Worker异步架构 |
| v0.8 | 2026-03 | 公开投票、i18n、权限系统 |
| v1.0 | 2026-03-17 | 完整产品设计文档 |

---

## 一、定位与核心价值

### 解决什么问题

Hackathon 评审是一件高度重复且主观的工作：
- 100+ 项目需要每个评委逐一阅读理解
- GitHub 代码质量、Web3 影响力等客观维度难以快速判断
- 多评委打分存在标准不一、信息不对称的问题
- 评审结果难以向参赛者透明展示

**HackAgent 的核心价值：让 AI 做初筛，让人做决策。**

### 产品定位

HackAgent 是面向 Web3 Hackathon 组织方的 AI 评审辅助平台：

- **组织方**：快速导入项目 → AI 自动预分析 → 评委高效打分 → 公开透明展示结果
- **评委**：基于 AI 预分析结果做决策，不是从零看项目
- **参与者**：在公开报告页看到客观分析维度，了解为什么得分如此

---

## 二、核心功能模块

### 2.1 活动管理

**创建活动时配置：**
- 活动名称、赛道、描述
- 评审模式：AI 自动 / 多人评审
- AI 模型：支持多模型并行评分（MiniMax M2.5、Gemini、GPT-4o、DeepSeek、Claude）
- 评审维度：可自定义维度名称和权重（如：创新性 30% / 落地可行性 25% / 团队背景 20% / GitHub影响力 15% / 赛道契合度 10%）

**软删除**：活动删除后数据保留，可恢复。

### 2.2 项目导入

支持 CSV 批量导入，字段映射可自定义：

| 必填字段 | 可选字段 |
|---------|---------|
| 项目名称 | 团队名称 |
| GitHub 链接 | Demo 演示链接 |
| | Pitch 视频链接（B站/YouTube） |
| | 标签/技术栈 |
| | 自定义额外字段 |

**字段映射规则**：
- 通过 `column_mapping` 配置 CSV 列 → 系统字段的映射关系
- `extra_fields` 仅收录明确配置了 `extra` 映射的列，其余忽略

### 2.3 AI 预分析

每个项目分析三个维度：

#### GitHub 代码分析
- Stars、Forks、Commits（30天内）、语言组成
- 文件数量、是否有文档/测试
- **代码真实性分析**（LLM 判断）：是否为真实功能代码，AI 生成比例，与项目描述的契合度
- `fake_code_flags`：标注异常信号（空仓库/纯模板/示例代码等）

#### Web3 影响力分析
- 贡献者 Web3 背景（是否参与过 Web3 项目）
- Twitter/X 社媒影响力（粉丝数 ≥ 10000 = KOL）
- Web3 生态评分（0-100）

#### SonarQube 代码质量
- Bugs、Vulnerabilities、Code Smells 数量
- 可维护性评级（A/B/C/D/E）
- 技术债估算

**分析架构**：
```
前端 → POST /api/events/[id]/enqueue → 秒返回
VPS Worker (PM2) → 轮询 analysis_queue → 调 review API → 写回 projects
并发数：2（内存约束）
```

### 2.4 AI 评分

多模型并行评分，每个模型按维度独立打分：

```
项目 → [MiniMax, Gemini, GPT-4o, DeepSeek, Claude] 并行
       ↓
每个模型输出：维度分 + 总评语 + Web3洞察
       ↓
加权均值 → 综合评分
```

**评分存储**：`reviewer_scores` 表，结构为 `(event_id, project_id, reviewer_id, model)`，评委与 AI 各自隔离。

### 2.5 多人评审

**评委邀请流程**：
1. 组织方填写评委邮箱 → 系统发邮件（含邀请链接）
2. 评委点链接 → 注册账号（如未注册）→ 自动关联活动
3. 评委登录后进入专属评审页

**评委操作隔离**：
- 每个评委独立操作，互不可见
- 评委可调整 AI 给出的分数（维度级调整）
- 提交后锁定，不可修改
- 支持自定义维度权重

**数据结构**：
```
reviewer_scores (event_id, project_id, reviewer_id)
  ├── model: 'claude' / 'minimax' / ...
  ├── scores: { 维度名: 分数 }
  ├── overall: 加权均值
  ├── summary: 评语（支持双语 {zh, en}）
  └── status: ai_done / submitted
```

### 2.6 公开投票

**配置项**：
- 开关（enabled）
- 投票页标题、说明（支持 Markdown）
- 每人可投票数（1-10）
- 截止时间
- 展示字段：描述/Demo/Pitch/GitHub/标签/AI评分
- 是否实时显示票数

**投票规则**：
- 未登录可浏览项目
- 点击投票跳转登录（登录后回到投票页）
- 票数绑定 userId，防刷票
- 唯一索引：`(event_id, project_id, voter_user_id)`

### 2.7 结果展示

**项目报告页** (`/events/[id]/projects/[projectId]`)：
- 顶部：综合评分 + 评分来源（AI均值 / 评委提交）
- GitHub 分析：仓库统计 + 代码真实性标签 + 贡献者列表
- 评审维度：各维度雷达图 + 进度条
- 多模型对比：各模型分数卡 + 评语
- Web3 分析：Twitter影响力 + 生态评分
- SonarQube：代码质量指标

**评审汇总页** (`/events/[id]/panel`)：
- 多评委完成情况
- 项目综合排名（可按模型/评委切换）
- 点击评委查看详情 Sheet

---

## 三、技术架构

### 技术栈

| 层 | 技术 |
|----|------|
| 前端 | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| 数据库 | Supabase (PostgreSQL) |
| 部署 | Vercel (前端) + VPS (Worker/SonarQube) |
| AI | Zenmux proxy → MiniMax M2.5 / Gemini / GPT-4o / DeepSeek / Claude |
| 代码分析 | SonarQube 10.4 (VPS) + sonar-proxy (Python FastAPI) |
| 邮件 | Mailgun (`claw@build.openbuild.xyz`) |

### 数据库核心表

```sql
events          -- 活动（含 public_vote jsonb 配置）
projects        -- 项目（含 analysis_result jsonb、pitch_url）
reviewer_scores -- AI/评委评分（多模型×多评委）
analysis_queue  -- 异步分析队列
public_votes    -- 公开投票记录
users           -- 用户（role text[]，默认 '{viewer}'）
invite_codes    -- 邀请码（评委邀请流程）
```

### 权限模型

```
users.role: text[]（数组，支持多角色）

admin       -- 创建活动、管理所有功能
organizer   -- 发布和管理自己的活动（规划中）
reviewer    -- 参与指定活动的评审
viewer      -- 注册账号、参与公开投票（默认）
```

---

## 四、下一步规划

### Phase 2：自助发布 + 开发者报名

**目标**：让组织方自助发布 Hackathon，开发者自主报名，打通从报名到评审的完整闭环。

**新角色**：organizer（发布和管理自己的活动）

**新流程**：
```
组织方发布活动（填规则/奖金/时间线/报名配置）
    ↓
开发者报名（团队信息/GitHub/技术栈）
    ↓
报名截止 → 组织方审核（可选）
    ↓
开发者提交项目（GitHub + Demo + 描述）
    ↓
[现有] AI预分析 → 评委打分 → 公开投票 → 结果公示
```

**Agent 自助报名**（MCP 对接）：
- `GET /api/mcp/hackathons` — 返回所有开放报名的活动列表
- `POST /api/mcp/apply` — Agent 直接提交报名（team_name/github_url/description）
- Agent 可自动读取规则 → 判断赛道匹配度 → 自动完成报名

**新增数据表**：
```sql
-- 活动报名配置（追加到 events）
ALTER TABLE events ADD COLUMN registration_config jsonb;
-- { open: bool, deadline: string, max_teams: int, require_review: bool }

-- 报名记录
CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id),
  user_id uuid REFERENCES users(id),
  team_name text NOT NULL,
  github_url text,
  description text,
  status text DEFAULT 'pending', -- pending/approved/rejected
  extra_fields jsonb,
  submitted_at timestamptz DEFAULT now()
);
```

**报名 → 项目闭环**：
- 报名审核通过 → 自动创建 `projects` 记录
- 触发 AI 预分析入队
- 进入现有评审流程

### Phase 3：结果公示与生态集成

- 结果公开 API（供其他平台调用）
- 颁奖证书生成（PDF）
- 与 AgentForum/MCP 生态对接（评审结果作为开发者 Reputation 数据）

---

## 五、当前线上状态

| 项目 | 状态 |
|------|------|
| 线上地址 | https://hackagent.vercel.app |
| 文档 | https://hackagent.vercel.app/docs.html |
| 已分析项目 | 100个（done: 99 / error: 3） |
| 评委评分 | 502条，全部 ai_done |
| 公开投票 | 已配置，每人3票，截止 2026-03-20 |
