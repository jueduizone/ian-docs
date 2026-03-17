# AgentRel 技术架构文档
**v1.0 | 2026-03-15**

---

## 一、核心架构原则

1. **知识源与输出格式解耦** — 知识统一存储，按需适配不同 Agent 平台的消费格式
2. **配置驱动扩展** — 每个生态 = 一份 YAML，不写定制代码
3. **变更追踪优先全量爬取** — 只处理 diff，控制计算成本
4. **多格式输出** — MCP 只是一种输出形式，不是唯一形式

---

## 二、整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        数据采集层                                │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │ 文档爬虫  │  │  RSS/   │  │ Twitter  │  │  Discord/      │  │
│  │ Adapter  │  │  Blog    │  │  API     │  │  Forum         │  │
│  │(GitBook/ │  │ 增量拉取  │  │ 技术内容  │  │ （Phase 2+）  │  │
│  │Docusaurus│  │          │  │  过滤    │  │                │  │
│  │/MkDocs)  │  │          │  │          │  │                │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬────────┘  │
│       └─────────────┴─────────────┴────────────────┘           │
│                            ↓                                    │
│              生态配置 YAML（数据源路由规则）                      │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│                        处理 Pipeline                            │
│                                                                 │
│  原始内容                                                        │
│      → 去重（URL hash + 内容 hash）                             │
│      → 内容提取（正文 / 代码块 / 标题结构）                      │
│      → AI 处理：                                                │
│          ├── 质量评分（relevance / accuracy / freshness）        │
│          ├── 分类打标（ecosystem / layer / type / skill_tags）   │
│          ├── 摘要生成（100 字内，Agent 友好格式）                 │
│          └── 向量化（embedding，用于相似度检索）                  │
│      → 质量元数据附加：                                          │
│          {trust_level, freshness_score, completeness_score,     │
│           source_type, last_verified_at}                        │
└────────────────────────────┬───────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│                        统一知识库                               │
│                     (PostgreSQL + pgvector)                     │
│                                                                 │
│  核心表：                                                        │
│  knowledge_items（内容主表）                                     │
│  ecosystems（生态元数据）                                        │
│  sources（数据源配置 + 同步状态）                                │
│  embeddings（向量索引）                                          │
│  change_log（变更记录）                                          │
└────────────────────────────┬───────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│                        输出适配层                               │
│                                                                 │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │ MCP Server   │  │ Skill    │  │ llms.txt │  │ REST API  │  │
│  │ (SSE/stdio)  │  │ Package  │  │ 自动生成  │  │ (RAG/     │  │
│  │              │  │(SKILL.md │  │ & 托管    │  │  自建Bot) │  │
│  │ Claude/Cursor│  │+scripts) │  │          │  │           │  │
│  │ Windsurf等   │  │ OpenClaw │  │ 任何 LLM │  │ 开发者    │  │
│  │              │  │ Claude   │  │          │  │ 自定义    │  │
│  │              │  │ Code等   │  │          │  │           │  │
│  └──────────────┘  └──────────┘  └──────────┘  └───────────┘  │
└────────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│                     消费层（开发者 Agent）                       │
│                                                                 │
│  Claude Desktop  Cursor  OpenClaw  Claude Code  自建 Agent      │
└────────────────────────────────────────────────────────────────┘
```

---

## 三、数据采集层详解

### 3.1 生态配置 YAML

```yaml
# 示例：solana.yaml
id: solana
name: Solana
category: l1

sources:
  docs:
    - url: https://solana.com/docs
      type: docusaurus
      sync: daily
      priority: high
    - url: https://www.anchor-lang.com/docs
      type: docusaurus
      sync: daily
      track_changes: true   # 追踪 diff，只处理变更页面
  github:
    - repo: solana-labs/solana
      track: releases        # 只追踪 release notes
    - repo: coral-xyz/anchor
      track: releases
  blog:
    - url: https://solana.com/news
      type: rss
      sync: hourly
  twitter:
    - handle: solana
      filter: technical
    - handle: aeyakovenko
      filter: all            # 核心开发者，全量保留
  web3hub:
    ecosystem_tag: solana    # 直接复用 Web3Hub 的采集结果

schema:
  tags: [rust, sealevel, accounts-model, spl]
  related: [base, pyth, jito]

quality:
  trust_level: official
  review_required: true      # 初次导入需人工 review
  min_relevance_score: 0.7
```

### 3.2 Adapter 实现

| Adapter | 处理逻辑 | 特殊处理 |
|---------|--------|--------|
| `gitbook` | 遍历 sitemap → 按页爬取 | 追踪 last-modified header |
| `docusaurus` | 解析 docusaurus.config.js + sidebar → 递归爬取 | 代码块特殊保留 |
| `mkdocs` | 解析 mkdocs.yml → 递归爬取 | 同上 |
| `github-pages` | 通过 GitHub API 获取目录结构 | 用 git commit hash 做 diff |
| `rss/atom` | 标准 RSS 解析，增量拉取 | etag / last-modified 缓存 |
| `twitter-api` | twitterapi.io / RapidAPI | 关键词 + 账号过滤，去营销内容 |

### 3.3 变更追踪机制

```
文档类：
  存储每页 content_hash
  → 每次同步对比 hash
  → 只处理变更页面（大幅降低 AI 处理成本）

博客/动态类：
  RSS etag + last-modified
  → 增量拉取，不重复处理

GitHub：
  追踪 commit hash / release tag
  → 只在有新 release 时触发处理

异常监控：
  检测 404、结构变更（页面数量骤降 >30%）
  → 触发报警，通知人工处理
```

---

## 四、处理 Pipeline 详解

### 4.1 AI 处理步骤

```
Step 1: 内容提取
  - 去除导航/页脚/广告 HTML
  - 提取主体文字 + 代码块（代码块保持原格式）
  - 识别文档层级（H1/H2/H3）→ 切片时保留层级上下文

Step 2: 智能切片
  - 按语义边界切片（不硬切在句子中间）
  - 每片 500-1500 tokens，适合 Agent 消费
  - 跨片保留标题上下文（每片前附带面包屑路径）

Step 3: AI 评分（GLM-5 或 Kimi，低成本模型）
  - relevance_score: 与生态开发相关度（0-1）
  - quality_score: 内容质量、准确性（0-1）
  - freshness_score: 基于发布时间衰减
  - completeness_score: 内容完整度

Step 4: 分类打标
  - ecosystem: [solana, ethereum, ...]
  - layer: docs | blog | community | security
  - content_type: concept | tutorial | api-reference | changelog | alert
  - skill_tags: [rust, anchor, pda, spl-token, ...]
  - difficulty: beginner | intermediate | advanced

Step 5: 摘要生成
  - 100 字以内，保留关键技术信息
  - Agent 友好格式（避免废话，直接说结论）

Step 6: 向量化
  - 使用 Jina Embedding（现有基础设施）
  - 存入 pgvector
```

### 4.2 质量元数据 Schema

```json
{
  "id": "sol_anchor_pda_001",
  "content": "...",
  "summary": "...",
  "embedding": [...],
  "metadata": {
    "ecosystem": "solana",
    "source_url": "https://www.anchor-lang.com/docs/pdas",
    "source_type": "official_docs",
    "trust_level": "official",
    "layer": "docs",
    "content_type": "concept",
    "skill_tags": ["pda", "anchor", "rust"],
    "difficulty": "intermediate",
    "relevance_score": 0.95,
    "quality_score": 0.88,
    "freshness_score": 0.92,
    "completeness_score": 0.87,
    "published_at": "2025-11-15T00:00:00Z",
    "last_synced_at": "2026-03-15T18:00:00Z",
    "content_hash": "sha256:abc123...",
    "breadcrumb": "Anchor Docs > Core Concepts > PDAs"
  }
}
```

---

## 五、输出适配层详解

### 5.1 MCP Server（重度集成）

**适用场景：** Claude Desktop、Cursor、Windsurf 等支持 MCP 协议的工具

```
协议：SSE（Server-Sent Events）
认证：Bearer Token
端点：https://mcp.agentrel.ai/sse
```

**Tool 列表：**

```
get_ecosystem_docs(ecosystem, query?, section?, since?)
  → 返回文档内容，带质量元数据和来源链接

get_ecosystem_updates(ecosystem, type?, since?, limit?)
  → 实时动态：升级/治理/安全/Bounty

get_security_alerts(ecosystem?, severity?)
  → 安全事件，含影响范围和建议措施

get_bounties(ecosystem?, skills?, amount_min?, deadline_before?)
  → Bounty 列表

compare_ecosystems(ecosystems[], aspect?)
  → 跨生态对比数据

get_ecosystem_overview(ecosystem)
  → 生态整体状态摘要
```

**实现要点：**
- 每次 Tool 调用记录到 Agent Profile（调用类型、时间、成功/失败）
- 限流：公共 Key 200 次/天，注册 Key 无限，按 429 + retry-after 标准返回
- 错误信息清晰，不让开发者猜（"ecosystem 'monad' not found, available: [solana, ethereum, base, ...]"）

### 5.2 Skill 包（轻量集成）

**适用场景：** OpenClaw、Claude Code、任何支持 SKILL.md 规范的 Agent 框架

**为什么 Skill 比 MCP 更轻：**
- 无需跑服务进程
- 纯文件，fork 即用
- 可离线使用（静态知识）
- 在 GitHub 天然可传播

**每个生态的 Skill 包结构：**

```
agentrel-skills/
└── solana/
    ├── SKILL.md              # 技能说明 + 使用方式
    ├── knowledge/
    │   ├── core-concepts.md  # 核心概念（静态，自动从知识库生成）
    │   ├── dev-setup.md      # 开发环境
    │   ├── common-patterns.md # 常见模式
    │   └── gotchas.md        # 常见坑
    ├── scripts/
    │   ├── get-updates.sh    # 获取最新动态（调 AgentRel API）
    │   ├── get-bounties.sh   # 查询 Bounty
    │   └── check-security.sh # 检查安全告警
    └── references/
        ├── api-quick-ref.md  # API 速查表
        └── error-codes.md    # 错误码说明
```

**SKILL.md 格式（兼容 OpenClaw AgentSkills 规范）：**

```markdown
# Solana Developer Knowledge

## 描述
Solana 生态开发知识包。包含核心概念、开发工具、最佳实践和实时动态。

## 使用方式
- 查询 Solana 技术概念：直接问，知识库已内置
- 获取最新生态动态：运行 scripts/get-updates.sh
- 查找 Bounty：运行 scripts/get-bounties.sh

## 覆盖内容
- Accounts model、PDA、CPI、Rent 机制
- Anchor framework（最新版本）
- web3.js v2 迁移指南
- 实时：协议升级、安全告警、Grant 动态

## 数据同步
静态知识：每周自动更新（AgentRel 推送新版本到 GitHub）
实时动态：通过 scripts/ 按需拉取
```

**发布方式：**
- GitHub 仓库：`agentrel/skills`，每个生态一个目录
- OpenClaw ClawHub：发布到技能注册表，`clawhub install agentrel/solana`
- 自动更新：知识库有重大变更时，CI 自动提 PR 更新静态知识文件

### 5.3 llms.txt（最轻量）

**适用场景：** 任何 LLM，配合 system prompt 使用；也是项目方网站的标准 SEO 配置

**格式：**

```markdown
# Solana Developer Resources

> Solana is a high-performance blockchain supporting builders around the world.

## Core Documentation
- [Getting Started](https://solana.com/docs/intro/quick-start): Setup and first program
- [Accounts Model](https://solana.com/docs/core/accounts): Solana's data model
- [Programs](https://solana.com/docs/core/programs): Writing on-chain programs
- [Anchor Framework](https://www.anchor-lang.com/docs): Recommended framework

## Recent Updates (auto-updated by AgentRel)
- [2026-03-14] web3.js v2.1.0 released — breaking change in Transaction signing API
- [2026-03-10] Firedancer v0.1 mainnet deployment begins
- [2026-03-08] New Bounty: $5000 for Anchor v0.31 migration guide

## API Reference
- [JSON RPC API](https://solana.com/docs/rpc): Full RPC method reference
- [web3.js v2 Docs](https://solana-labs.github.io/solana-web3.js/): JavaScript SDK

## Security
- [Security Advisories](https://agentrel.ai/solana/security): Latest alerts
```

**AgentRel 帮项目方做的：**
- 自动生成 `llms.txt` + `llms-full.txt`（详细版）
- 托管在 `agentrel.ai/<ecosystem>/llms.txt`，也可托管在客户自己域名
- 自动保持更新（动态信息每小时刷新）
- 这是 toB 服务里最容易交付的即时价值

### 5.4 REST API（自建 Agent / RAG Pipeline）

**适用场景：** 自建 Agent、LangChain、LlamaIndex、Telegram Bot

```
GET  /v1/ecosystems                    # 列出所有生态
GET  /v1/ecosystems/{id}/docs          # 查询文档
GET  /v1/ecosystems/{id}/updates       # 获取动态
GET  /v1/ecosystems/{id}/bounties      # 查询 Bounty
GET  /v1/search?q={query}&ecosystem={} # 跨生态语义搜索（Phase 2）
POST /v1/webhooks                      # 注册变更推送

Auth: Bearer Token
Rate limit: 公共 Key 200/day，注册 Key 无限
```

---

## 六、数据库 Schema

```sql
-- 生态元数据
CREATE TABLE ecosystems (
  id            TEXT PRIMARY KEY,    -- 'solana', 'monad'
  name          TEXT NOT NULL,
  category      TEXT,                -- 'l1', 'l2', 'defi', 'tool'
  tags          TEXT[],
  related       TEXT[],
  config_yaml   TEXT,                -- 完整 YAML 配置
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 数据源状态
CREATE TABLE sources (
  id              SERIAL PRIMARY KEY,
  ecosystem_id    TEXT REFERENCES ecosystems(id),
  source_url      TEXT NOT NULL,
  source_type     TEXT,              -- 'gitbook', 'rss', 'twitter'
  trust_level     TEXT,              -- 'official', 'community'
  last_synced_at  TIMESTAMPTZ,
  last_hash       TEXT,              -- 上次同步的内容 hash
  sync_interval   INTERVAL,
  error_count     INT DEFAULT 0,
  last_error      TEXT
);

-- 知识内容主表
CREATE TABLE knowledge_items (
  id                TEXT PRIMARY KEY,
  ecosystem_id      TEXT REFERENCES ecosystems(id),
  source_id         INT REFERENCES sources(id),
  content           TEXT NOT NULL,
  summary           TEXT,
  content_hash      TEXT,
  source_url        TEXT,
  source_type       TEXT,
  trust_level       TEXT,
  layer             TEXT,            -- 'docs', 'blog', 'community', 'security'
  content_type      TEXT,            -- 'concept', 'tutorial', 'changelog', 'alert'
  skill_tags        TEXT[],
  difficulty        TEXT,
  breadcrumb        TEXT,
  relevance_score   FLOAT,
  quality_score     FLOAT,
  freshness_score   FLOAT,
  completeness_score FLOAT,
  published_at      TIMESTAMPTZ,
  last_synced_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 向量索引
CREATE TABLE embeddings (
  item_id    TEXT REFERENCES knowledge_items(id),
  embedding  vector(1536),           -- Jina embedding 维度
  model      TEXT DEFAULT 'jina-v3'
);
CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops);

-- 变更记录（审计 + diff 追踪）
CREATE TABLE change_log (
  id           SERIAL PRIMARY KEY,
  source_id    INT REFERENCES sources(id),
  item_id      TEXT,
  change_type  TEXT,                 -- 'created', 'updated', 'deleted'
  old_hash     TEXT,
  new_hash     TEXT,
  changed_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 开发者账号
CREATE TABLE developers (
  id                TEXT PRIMARY KEY,
  github_handle     TEXT UNIQUE,
  wallet_address    TEXT,
  api_token         TEXT UNIQUE,
  plan              TEXT DEFAULT 'free',  -- 'free', 'paid'
  preferences       JSONB,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  last_active_at    TIMESTAMPTZ
);

-- Agent 调用记录（Reputation 数据源）
CREATE TABLE agent_calls (
  id           SERIAL PRIMARY KEY,
  developer_id TEXT REFERENCES developers(id),
  tool_name    TEXT,
  ecosystem    TEXT,
  success      BOOLEAN,
  latency_ms   INT,
  called_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 七、技术选型

| 层 | 选型 | 理由 |
|----|------|------|
| 数据库 | PostgreSQL + pgvector | 现有 Supabase，向量检索原生支持 |
| 队列 | BullMQ + Redis | 现有 Web3Hub 基础设施 |
| AI 处理 | GLM-5（评分/标签）+ Kimi（摘要） | 低成本，现有 key |
| Embedding | Jina v3 | 现有 key，效果好 |
| MCP Server | Node.js（现有技术栈） | 快速实现 |
| Skill 生成 | 模板 + AI 生成静态 md | 低成本批量生成 |
| 采集调度 | PM2 + cron（现有模式） | 与 Web3Hub 一致 |
| 部署 | Vercel（API） + PM2（worker） | 现有模式 |

---

## 八、与现有系统的关系

```
Web3Hub（现有）
    ├── 采集器（collector）  →  AgentRel 复用，增加文档类 Adapter
    ├── AI Worker           →  AgentRel 复用，增加 Skill 生成任务
    ├── 数据库（Supabase）   →  AgentRel 新建表，共用同一个实例
    └── Scheduler           →  AgentRel 的同步任务加入现有调度

AgentRel（新建）
    ├── 知识库（knowledge_items + embeddings）
    ├── MCP Server（新服务，port xxxx）
    ├── REST API（Vercel Functions）
    ├── Skill 生成 Worker（PM2）
    └── llms.txt 生成 & 托管（Vercel）
```

Web3Hub 的动态数据经 API 直接注入 AgentRel 知识库，无需重复采集。

---

## 九、Phase 1 实现优先级

```
Week 1-2：
  ✅ 数据库 Schema 建立
  ✅ gitbook / docusaurus / rss adapter 实现
  ✅ Solana + Monad 数据源 YAML 配置
  ✅ 初次全量导入 + 人工 quality review

Week 3-4：
  ✅ AI 处理 pipeline（评分 + 标签 + 摘要）
  ✅ Web3Hub 动态数据接入
  ✅ MCP Server MVP（核心 5 个 Tool）
  ✅ 公共 Key + 基础限流

Week 5-6：
  ✅ Skill 包生成（Solana + Monad）
  ✅ llms.txt 生成 & 托管
  ✅ REST API（基础 4 个端点）
  ✅ 开发者注册 + API Token 生成
  ✅ 首页 + Dashboard 基础版
  ✅ Cursor Directory 上架
```

---

*v1.0 | AgentRel 技术架构 | 2026-03-15*
