# AgentRel — 技术架构文档
**v1.0 | 2026-03-18**

---

## 一、整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                      消费端（开发者 Agent）                     │
│                                                               │
│  Claude Code    Cursor    Codex    Copilot    自建 Bot         │
└──────────┬──────────┬─────────────────────────────────────────┘
           │          │
     Skills 接入    MCP 接入
     (SKILL.md)   (SSE/HTTP)
           │          │
┌──────────▼──────────▼──────────────────────────────────────┐
│                    AgentRel 服务层                             │
│                                                               │
│  ┌──────────────────┐  ┌─────────────────┐                   │
│  │   Skills 服务     │  │   MCP Server    │                   │
│  │                  │  │                 │                   │
│  │  /skills/{id}    │  │  web3_news      │                   │
│  │  /bundles/{id}   │  │  find_bounties  │                   │
│  │  /search         │  │  get_grants     │                   │
│  │  /feedback       │  │  search_eco     │                   │
│  └────────┬─────────┘  └────────┬────────┘                   │
│           │                     │                             │
│  ┌────────▼─────────────────────▼───────────────────────┐    │
│  │                    数据层                              │    │
│  │                                                       │    │
│  │  Skills DB      Content DB      Tasks DB              │    │
│  │  (SKILL.md +    (Web3Hub feeds  (Bounty/Grant/        │    │
│  │   元数据)        + 安全事件)      Hackathon)           │    │
│  └────────────────────────────────────────────────────── ┘    │
└────────────────────────────────────────────────────────────┘
           │                     │                 │
┌──────────▼──────┐  ┌───────────▼─────┐  ┌────────▼──────────┐
│   内容生产层      │  │   Web3Hub       │  │   OpenBuild       │
│                  │  │   数据管道       │  │   任务数据         │
│  AI 生成工具      │  │   PM2 Worker    │  │   Web3Insight     │
│  社区贡献系统     │  │   Scheduler     │  │   Reputation      │
│  变更检测        │  │   Feeds DB      │  │                   │
└──────────────────┘  └─────────────────┘  └───────────────────┘
```

---

## 二、Skills 服务

### 2.1 SKILL.md 文件规范

```markdown
---
id: solana/web3js-v2
name: Solana web3.js v2 Migration
version: 1.2.0
ecosystem: solana
type: technical-doc         # technical-doc | ecosystem-news | event | grant-guide | security
time_sensitivity: evergreen  # evergreen | time-limited
expires_at: null             # ISO 8601，time-limited 时填写
source: community            # official | community | ai-generated
confidence: high             # high | medium | low
maintainer: "@username"
last_updated: 2026-03-18
feedback_endpoint: https://api.agentrel.xyz/feedback
---

## Overview
[内容...]

## 关键变更
[...]

## 常见错误
[AI 容易犯的错误 → 正确做法对照]

## 代码示例
[...]

## 参考链接
[...]

## Feedback
If this skill contains incorrect or outdated information, call:
agentrel_feedback(skill="solana/web3js-v2", issue="<description>",
  code_snippet="<optional>", error_message="<optional>", fix="<optional>")
```

### 2.2 Skills API

```
GET  /api/skills
     ?ecosystem=solana&type=technical-doc&status=active
     ?q=web3js+migration（语义搜索）
     返回：Skills 列表 + 元数据

GET  /api/skills/{id}
     返回：SKILL.md 内容 + 元数据

GET  /api/skills/{id}/raw
     返回：纯 SKILL.md 文本（供 agent curl 直接使用）

GET  /api/bundles/{bundle_id}
     返回：Bundle 包含的 Skills 列表

POST /api/feedback
     body: { skill, agent, issue, code_snippet?, error_message?, fix? }
     动作：在 GitHub 自动开 Issue，打 auto-reported 标签

GET  /api/skills/{id}/health
     返回：Skill 健康度报告（最近 eval 结果、上报问题数）
```

### 2.3 变更检测 Worker

复用 Web3Hub 的 PM2 + Scheduler 基础设施：

```javascript
// skills-change-detector.js (PM2 进程)
// 每天运行一次，检测已收录 Skills 的源仓库变更

async function detectChanges(skill) {
  // 1. 拉取源仓库最新 commit/release
  const latestCommit = await github.getLatestCommit(skill.sourceRepo)
  const lastChecked = skill.lastCheckedCommit

  if (latestCommit === lastChecked) return  // 无变更

  // 2. 获取 diff
  const diff = await github.getDiff(skill.sourceRepo, lastChecked, latestCommit)

  // 3. AI 分析变更类型
  const analysis = await ai.analyze(diff, {
    prompt: "识别 breaking change、API 废弃、新增功能，评估对 SKILL.md 的影响"
  })

  // 4. 如果有重要变更，自动开 Issue
  if (analysis.severity === 'high') {
    await github.createIssue({
      title: `[${skill.id}] Breaking change detected: ${analysis.summary}`,
      body: analysis.detail,
      labels: ['auto-detected', 'needs-update']
    })
  }

  // 5. 如果 severity 为 low，自动生成更新草稿并附在 Issue 上
  if (analysis.severity === 'low') {
    const draft = await ai.generateSkillUpdate(skill, diff)
    await github.createIssue({ ... draft ... })
  }
}
```

---

## 三、AI 辅助生成工具

### 3.1 CLI 工具

```
npx agentrel <command>

命令：
  generate  --source <url>      从 URL 生成 SKILL.md 草稿
            --skill <id>        生成特定 Skill 的草稿（用于初始化）
            --output <path>     输出路径，默认 stdout

  update    --skill <id>        检查并更新已有 Skill
            --check-updates     只检查，不生成（显示有无变更）
            --auto-pr           自动提交 PR（需要 GitHub token）

  diff      --skill <id>        显示待更新内容（对比线上版本）

  eval      --skill <id>        跑 eval 问题集，输出健康度报告
            --questions <path>  自定义问题集

  validate  --file <path>       验证 SKILL.md 格式是否符合规范
```

### 3.2 生成流水线实现

```typescript
async function generateSkill(source: string): Promise<SkillDraft> {
  // Step 1: 抓取内容
  const content = await crawler.fetch(source)
  const gitHistory = await github.getRecentHistory(source, days=90)

  // Step 2: 幻觉热点分析
  const hallucinations = await detectHallucinations({
    docs: content,
    prompt: `
      你是一个专家开发者。根据这份文档，列出 AI 编程助手（不熟悉最新版本）
      最容易犯的错误。对每个错误给出：
      1. AI 可能会怎么回答（错误版本）
      2. 正确答案是什么
      3. 置信度（high/medium/low）
    `
  })

  // Step 3: 生成 SKILL.md
  const draft = await ai.generate({
    template: SKILL_TEMPLATE,
    content,
    hallucinations,
    breakingChanges: gitHistory.breakingChanges,
  })

  // Step 4: 置信度评分
  const scored = await scoreConfidence(draft)

  return {
    content: scored.markdown,
    metadata: {
      confidence: scored.overallConfidence,
      needsReview: scored.lowConfidenceSections,
      breakingChanges: gitHistory.breakingChanges.length,
    }
  }
}
```

### 3.3 Web Editor 技术方案

- **框架**：Next.js（复用 HackAgent 技术栈）
- **编辑器**：CodeMirror（Markdown 编辑）
- **预览**：react-markdown + remark-gfm（已在 HackAgent 验证）
- **Diff 视图**：diff2html

关键页面：
```
/editor/new              新建 Skill（输入源 URL，AI 生成草稿）
/editor/{skill_id}       编辑已有 Skill
/editor/{skill_id}/diff  查看待更新内容（与线上版本对比）
/review/{pr_id}          L3 维护者 Review 界面（逐段 Approve/Reject）
```

---

## 四、Agent 反馈系统

### 4.1 Feedback API

```typescript
// POST /api/feedback
interface FeedbackPayload {
  skill: string           // e.g. "solana/web3js-v2"
  agent: string           // e.g. "claude-code", "cursor", "custom"
  issue: string           // 问题描述
  code_snippet?: string   // 出错代码
  error_message?: string  // 错误信息
  fix?: string            // Agent 找到的正确写法
  session_id?: string     // 用于聚合同一问题的多次上报（可选）
}

// 处理逻辑
async function handleFeedback(payload: FeedbackPayload) {
  // 1. 存入 feedback DB
  const feedback = await db.feedback.create(payload)

  // 2. 检查是否有相似 Issue（embedding 相似度检测）
  const similar = await findSimilarFeedback(payload.issue)

  if (similar && similar.confidence > 0.85) {
    // 聚合到已有 Issue，增加 upvote
    await github.commentOnIssue(similar.githubIssueId, {
      body: `Another report: ${payload.issue}`,
      metadata: payload
    })
    await db.feedback.incrementConfidence(similar.id)
  } else {
    // 新开 Issue
    const issue = await github.createIssue({
      repo: 'agentrel/skills',
      title: `[${payload.skill}] ${payload.issue.slice(0, 80)}`,
      body: formatFeedbackIssue(payload),
      labels: ['auto-reported', `skill:${payload.skill}`]
    })
    await db.feedback.update({ githubIssueId: issue.id })
  }

  // 3. 如果同一 Skill 在 24h 内收到 3+ 条不同反馈，触发高优先级提醒
  const recentCount = await db.feedback.countRecent(payload.skill, hours=24)
  if (recentCount >= 3) {
    await notifyMaintainer(payload.skill, 'high-priority-update-needed')
  }
}
```

### 4.2 Eval Pipeline

```typescript
// 每周自动跑，检测 Skill 健康度
async function runSkillEval(skillId: string) {
  const skill = await db.skills.get(skillId)
  const questions = await db.evalQuestions.getByEcosystem(skill.ecosystem)

  const results = []
  for (const q of questions) {
    // 有 Skill vs 无 Skill，对比回答质量
    const withSkill = await llm.answer(q.question, { context: skill.content })
    const withoutSkill = await llm.answer(q.question, { context: null })

    const score = await evaluateAnswer(withSkill, q.correctAnswer)
    const baseScore = await evaluateAnswer(withoutSkill, q.correctAnswer)

    results.push({ question: q.id, withSkill: score, withoutSkill: baseScore })
  }

  const healthReport = {
    skillId,
    avgImprovement: average(results.map(r => r.withSkill - r.withoutSkill)),
    passingRate: results.filter(r => r.withSkill >= 0.8).length / results.length,
    failingQuestions: results.filter(r => r.withSkill < 0.6),
    generatedAt: new Date()
  }

  await db.skillHealth.upsert(healthReport)

  // 健康度下降超过 10% → 触发更新提醒
  const prev = await db.skillHealth.getPrevious(skillId)
  if (prev && healthReport.passingRate < prev.passingRate - 0.1) {
    await notifyMaintainer(skillId, 'health-degraded', healthReport)
  }

  return healthReport
}
```

---

## 五、数据模型

### Skills DB

```sql
-- Skill 元数据
CREATE TABLE skills (
  id            TEXT PRIMARY KEY,     -- e.g. "solana/web3js-v2"
  name          TEXT NOT NULL,
  ecosystem     TEXT NOT NULL,
  type          TEXT NOT NULL,        -- technical-doc | ecosystem-news | event | grant-guide | security
  time_sensitivity TEXT DEFAULT 'evergreen',
  expires_at    TIMESTAMPTZ,
  source        TEXT NOT NULL,        -- official | community | ai-generated
  confidence    TEXT DEFAULT 'medium',
  version       TEXT NOT NULL,
  source_repo   TEXT,                 -- 变更检测用
  last_checked_commit TEXT,
  maintainer    TEXT,
  content       TEXT NOT NULL,        -- SKILL.md 全文
  content_hash  TEXT,                 -- 用于变更检测
  install_count INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Bundle
CREATE TABLE bundles (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  scenario    TEXT,                   -- "eth-hackathon" | "solana-dev" | ...
  skills      TEXT[] NOT NULL,        -- skill id 数组
  expires_at  TIMESTAMPTZ,            -- Bundle 级别的过期（时效型）
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 用户反馈
CREATE TABLE skill_feedback (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id        TEXT NOT NULL REFERENCES skills(id),
  agent           TEXT,
  issue           TEXT NOT NULL,
  code_snippet    TEXT,
  error_message   TEXT,
  fix             TEXT,
  issue_embedding VECTOR(1536),       -- 用于相似度聚合
  github_issue_id INTEGER,
  confidence      INTEGER DEFAULT 1,  -- 多次上报累加
  status          TEXT DEFAULT 'open', -- open | investigating | resolved
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Skill 健康度
CREATE TABLE skill_health (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id        TEXT NOT NULL REFERENCES skills(id),
  avg_improvement FLOAT,
  passing_rate    FLOAT,
  failing_count   INTEGER,
  generated_at    TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 六、部署架构

### 服务组成

| 服务 | 技术 | 部署方式 |
|------|------|---------|
| Skills API | Next.js API Routes | Vercel（与 HackAgent 相同技术选型，独立项目）|
| Web Editor | Next.js | Vercel |
| MCP Server | Node.js + SSE | Vercel Functions / Railway |
| AI 生成工具（CLI）| Node.js + npm 包 | npm publish |
| 变更检测 Worker | Node.js | PM2（复用 Web3Hub 基础设施）|
| Eval Pipeline | Node.js | PM2 定时任务 |
| Skills DB | Supabase | 独立 Project（不复用 Web3Hub）|

### 环境变量

```bash
# AI
COMMONSTACK_API_KEY=ak-xxxx
COMMONSTACK_API_URL=https://api.commonstack.ai/v1

# GitHub（PR 自动提交 + Issue 创建）
GITHUB_TOKEN=github_pat_xxx
GITHUB_REPO=agentrel/skills

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx

# Web3Hub（复用数据）
WEB3HUB_SUPABASE_URL=https://nofczyucgszztvzaluln.supabase.co
WEB3HUB_SUPABASE_SERVICE_KEY=xxx
```

---

## 七、与现有系统的集成

### 7.1 Web3Hub 数据复用

Web3Hub 已有 `feeds` 表，字段 `ecosystem`、`category`、`tags`、`summary_zh`、`summary_en` 可直接用于生成"生态动态 Skill"：

```typescript
// 每周从 Web3Hub 自动生成"生态动态 Skill"
async function generateEcosystemNewSkill(ecosystem: string) {
  const feeds = await web3hub.db
    .from('feeds')
    .select('title, summary_zh, summary_en, source_name, published_at, original_url')
    .eq('ecosystem', ecosystem)
    .gte('published_at', subDays(new Date(), 7))
    .order('hot_score', { ascending: false })
    .limit(20)

  const skill = await ai.generate({
    template: ECOSYSTEM_NEWS_TEMPLATE,
    feeds,
    ecosystem,
  })

  await db.skills.upsert({
    id: `${ecosystem}/weekly-news`,
    type: 'ecosystem-news',
    time_sensitivity: 'time-limited',
    expires_at: addDays(new Date(), 7),
    content: skill,
  })
}
```

### 7.2 OpenBuild Bounty/Grant 同步

```typescript
// 每天同步 OpenBuild 的活跃 Bounty 和 Grant 到 AgentRel
async function syncOpenBuildTasks() {
  const tasks = await openbuild.api.getTasks({ status: 'active' })
  for (const task of tasks) {
    await db.tasks.upsert({
      id: task.id,
      title: task.title,
      type: task.type,           // bounty | grant | hackathon
      ecosystem: task.ecosystem,
      reward: task.reward,
      deadline: task.deadline,
      skills_required: task.skills,
      apply_url: task.url,
      source: 'openbuild',
    })
  }
}
```

---

## 八、MVP 技术优先级

**Week 1-2（最小可验证）**
- [ ] Skills 仓库（GitHub repo：agentrel/skills）
- [ ] 手工写入 3-5 条 SKILL.md，发布到 skills.sh
- [ ] 简单的 Skills 列表页（静态即可）

**Week 3-4（工具化）**
- [ ] CLI `generate` 命令（AI 辅助生成草稿）
- [ ] `POST /api/feedback` endpoint（接收 Agent 反馈 → 自动开 GitHub Issue）
- [ ] GitHub Issue 模板 + 贡献指南

**Month 2**
- [ ] Web Editor（左右对照 Review 界面）
- [ ] Skills DB（Supabase）
- [ ] 变更检测 Worker（Web3Hub PM2 复用）
- [ ] Bundle 支持

**Month 3**
- [ ] MCP Server（复用 Agentforum 设计）
- [ ] Eval Pipeline
- [ ] Web3Hub 数据自动导出"生态动态 Skill"

---

*技术架构文档 v1.0 | AgentRel | 2026-03-18*
