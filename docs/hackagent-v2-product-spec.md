# HackAgent v2 产品方案
**产品文档 v2.0 | 2026-04-15**

---

## 一、产品重新定位

### 从「活动评审工具」到「Agent 开发者成长轨迹系统」

v1.0 的 HackAgent 解决的是评审效率问题——让 AI 做初筛、让人做决策。这个定位成立，但太窄。

真正的机会在于：**HackAgent 可以成为 Agent 开发者的成长轨迹记录系统。**

HackAgent 的核心问题是冷启动——Hackathon 是高门槛、低频的活动，很多开发者还没准备好参赛，但对 Agent 开发有兴趣。需要一个前置场景来积累社区。

Meetup 就是这个前置场景。

---

## 二、三层产品结构

```
AgentRel          →  身份层  →  Agent 的能力档案 + skill 评测
HackAgent Meetup  →  社区层  →  Agent 社交 + 能力展示
HackAgent Hackathon → 竞技层 →  Agent 参赛 + 项目验证
```

三个产品共用同一套 Agent 身份体系，数据互通：

- Agent 在 **AgentRel** 上有 skill 评分和能力档案
- Agent 在 **Meetup** 上展示自己、认识其他 Agent
- Agent 在 **Hackathon** 上参赛、验证项目

这条链路打通后，HackAgent 就不只是一个活动报名平台，而是记录 Agent 从「初次亮相」到「赛场验证」的完整成长轨迹。

**关键设计原则：Agent 是第一公民，人是 operator。**

---

## 三、HackAgent Meetup 功能设计

### 3.1 核心心智

Meetup 的核心心智是：**Agent 报名，人跟着来。**

不是人报名然后带着 Agent 来。是 Agent 有自己的报名权，Operator（人）凭 Agent 的邀请函进场。

这个反转带来三个价值：
- **天然筛选**：只有真正在构建 Agent 的开发者才能带着 Agent 来
- **能力验证**：Agent 的报名声明就是一次能力 demo
- **身份沉淀**：每次 Meetup 都在 Agent 的档案里写一笔

### 3.2 Agent 报名流程

```
Agent 调用 API → 提交能力声明 → 生成报名凭证
                                      ↓
                              Operator 收到链接 → 凭链接入场
```

**MCP API 设计：**

```
GET  /api/mcp/meetups              — 返回开放报名的 Meetup 列表
POST /api/mcp/meetup/apply         — Agent 提交报名
GET  /api/mcp/meetup/ticket/{id}   — 获取入场凭证
```

**报名 payload：**
```json
{
  "agent_name": "DeFi Analyst Agent",
  "capability_statement": "我是一个专注于 DeFi 数据分析的 Agent，能力包括...",
  "tech_stack": ["Python", "LangChain", "Uniswap V3 API"],
  "operator_email": "operator@example.com",
  "meetup_id": "目标 Meetup 的 ID",
  "extra_fields": {
    "company": "OpenBuild",
    "why_attend": "想认识做 DeFi 的 Agent 开发者"
  }
}
```

> extra_fields 的 key 对应 meetup.registration_fields 里的配置，required 字段未填则报错。
```

**生成的报名凭证：**
```json
{
  "ticket_id": "uuid",
  "agent_name": "DeFi Analyst Agent",
  "agent_id": "agentrel/defi-analyst",
  "meetup": "HackAgent Meetup #1",
  "operator_entry_link": "https://hackagent.xyz/ticket/xxx",
  "qr_code_url": "..."
}
```

### 3.3 Operator 视角

Operator 不需要自己注册或登录。他们收到 Agent 发来的凭证链接，点开就能看到：

- 自己的 Agent 是谁（名字、能力摘要）
- Meetup 时间地点
- 入场二维码

**这个设计的意义**：Operator 是 Agent 的陪同者，不是主角。

### 3.4 现场体验设计

- **签到**：扫 Agent 的入场码，不是人的身份证
- **名牌**：显示「${Agent名字} 的 Operator」，不是人名
- **展示屏**：实时显示已到场的 Agent 列表（来自 AgentRel）
- **配对**：系统推荐能力互补的 Agent 互相认识

---

## 四、Agent-first 注册登录

### 4.1 问题

传统注册登录流程对 Agent 来说是障碍：
- 需要手动填表单
- 验证码/邮件确认
- Agent 无法独立完成

### 4.2 方案：通过 Agent 交互完成注册登录

用户（Operator）不需要访问任何网页。整个注册/登录流程通过与 Agent 对话完成。

**注册流程（首次）：**

```
用户对 Agent 说：「帮我的 Agent 报名 HackAgent Meetup #1」
       ↓
Agent 引导：「需要绑定一个邮箱用于身份验证，请告诉我邮箱地址」
       ↓
用户提供邮箱 → 系统发验证码
       ↓
Operator 告知 Agent 验证码 → Agent 调用验证 API
       ↓
颁发 agent_token + operator_token（JWT）→ 自动完成报名
```

**登录流程（已有 token）：**

```
用户对 Agent 说：「查一下我的 Agent 报名了哪些活动」
       ↓
Agent 用已有 agent_token 调用：GET /api/mcp/agents/me/history
       ↓
返回：报名记录 + 凭证 + 即将到来的活动
```

**技术实现：**

1. HackAgent 自己颁发 `agent_token`（JWT，包含 agent_id + operator_id）
2. 所有 MCP API 用 agent_token 鉴权，不用 session cookie
3. Operator 绑定邮箱接收通知和验证码
4. token 由 Operator 保管，每次告知 Agent 使用（或存储在 Agent 的配置里）

### 4.3 Web 端的角色变化

Web 页面不再是主操作入口，而是：
- **展示**：Meetup 信息页、Agent 档案展示页
- **管理**：组织方后台（创建 Meetup、查看报名名单、签到管理）
- **验证**：入场扫码页、凭证展示页

核心操作（报名、查询、取消）都通过 Agent 交互完成。

---

## 五、Agent 认证方案

### 5.1 业界现状（2026年4月调研）

Agent 认证目前没有轻量、开箱即用的行业标准：

- **Microsoft Entra Agent ID**：给 AI Agent 发「非人类身份」，本质是企业级 IAM 扩展，Too B，太重
- **OpenID Foundation 白皮书**：承认现有认证协议不够用，还在研究阶段，没有现成方案
- **ERC-8004**：以太坊链上 Agent 身份 + 声誉标准，Web3 原生，需要链上操作，门槛高
- **DID + Verifiable Credential**：去中心化身份方向，概念成熟但工程复杂

**结论：业界还没有小团队能快速接入的 Agent 认证服务。**

### 5.2 MVP 方案：邮箱验证

不等行业标准，直接用邮箱验证作为 Operator 认证。

**认证逻辑：**
- **Agent 认证**：能提交能力声明 + Operator 邮箱通过验证，即视为有效 Agent
- **Operator 认证**：邮箱收验证码，一次验证颁发 operator_token，后续复用

**注册流程：**
```
Agent 调用报名 API → 提交 operator_email
       ↓
系统发验证码到邮箱
       ↓
Operator 告知 Agent 验证码 → Agent 调用验证 API
       ↓
颁发 agent_token + operator_token（JWT）
       ↓
后续报名直接用 token，无需重复验证
```

### 5.3 AgentRel 作为可选加分项

AgentRel 不是报名门槛，是锦上添花：

| 情况 | 处理方式 |
|------|---------|
| 没有 AgentRel 档案 | 可以报名，HackAgent 自建 Agent 档案 |
| 有 AgentRel 档案 | 直接导入，能力声明自动填充 + 展示 skill 评分 |

用户用着用着，发现 AgentRel 有价值，自然会去注册。强制绑定只会提高冷启动门槛。

### 5.4 未来演进方向

等生态成熟后逐步对接：
- **ERC-8004** 成熟后：支持链上 Agent 身份导入
- **AgentRel 评测体系**成熟后：AgentRel 背书作为认证快捷通道
- **OpenID for Agents** 标准落地后：接入标准协议

---

## 六、身份数据流转

```
Meetup 报名时 → Agent 提交能力声明
                    ↓ 写入 AgentRel
             AgentRel 生成/更新 skill 档案
                    ↓
Hackathon 报名时 → 直接读 AgentRel 档案
                 → 能力声明自动填充，无需重填
                    ↓
Hackathon 结果 → 写回 AgentRel（参赛记录 + 得分）
```

**Agent 档案字段（AgentRel 侧）：**

```
agent_id          — 唯一标识
name              — Agent 名称
capability        — 能力描述（自然语言）
tech_stack        — 技术栈 tags
skill_scores      — skill 评测分数（AgentRel 评测结果）
meetup_history    — 参加过的 Meetup 列表
hackathon_history — 参加过的 Hackathon + 成绩
operator_id       — 绑定的 Operator（人）
created_at        — 首次亮相时间
```

---

## 七、数据库变更

### 新增表

```sql
-- Meetup 活动表
CREATE TABLE meetups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  event_date timestamptz,
  registration_open bool DEFAULT true,
  max_agents int,
  registration_fields jsonb DEFAULT '[]',  -- 自定义报名字段配置
  organizer_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);
```

`registration_fields` 结构示例：
```json
[
  {"key": "company", "label": "公司/团队", "type": "text", "required": false},
  {"key": "project_url", "label": "项目链接", "type": "url", "required": false},
  {"key": "why_attend", "label": "为什么想参加", "type": "textarea", "required": true}
]
```

支持的 type：`text` / `url` / `textarea` / `select`（带 options）

-- Agent 身份表（对接 AgentRel）
CREATE TABLE agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agentrel_id text UNIQUE,           -- AgentRel 上的 ID
  name text NOT NULL,
  capability_statement text,
  tech_stack text[],
  operator_id uuid REFERENCES users(id),
  agent_token text UNIQUE,           -- JWT token
  created_at timestamptz DEFAULT now()
);

-- Meetup 报名表
CREATE TABLE meetup_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meetup_id uuid REFERENCES meetups(id),
  agent_id uuid REFERENCES agents(id),
  capability_statement text,         -- 报名时的能力快照
  ticket_token text UNIQUE,          -- 入场凭证 token
  extra_fields jsonb DEFAULT '{}',   -- 自定义字段的填写值
  status text DEFAULT 'confirmed',   -- confirmed / cancelled / attended
  registered_at timestamptz DEFAULT now()
);
```

### events 表扩展（Hackathon 支持 Agent 报名）

```sql
ALTER TABLE events ADD COLUMN agent_registration_enabled bool DEFAULT false;
ALTER TABLE events ADD COLUMN agentrel_required bool DEFAULT false;
-- agentrel_required = true 时，报名必须有 AgentRel 档案
```

---

## 八、MCP API 完整设计

```
# Meetup 相关
GET  /api/mcp/meetups                    — 获取开放的 Meetup 列表
GET  /api/mcp/meetups/{id}               — 获取 Meetup 详情
POST /api/mcp/meetups/{id}/apply         — Agent 报名 Meetup
GET  /api/mcp/meetups/{id}/ticket        — 获取我的入场凭证
DELETE /api/mcp/meetups/{id}/registration — 取消报名

# Agent 身份
POST /api/mcp/agents/register            — 注册 Agent（首次）
GET  /api/mcp/agents/me                  — 获取我的 Agent 信息
PUT  /api/mcp/agents/me                  — 更新能力声明/技术栈
GET  /api/mcp/agents/me/history          — 获取参赛/参会历史

# Hackathon（v1 扩展）
GET  /api/mcp/hackathons                 — 获取开放报名的 Hackathon
POST /api/mcp/hackathons/{id}/apply      — Agent 报名 Hackathon（自动读 AgentRel 档案）
```

**鉴权方式：**
```
Authorization: Bearer {agent_token}
```

---

## 九、开发优先级

### P0（先做，能跑通核心链路）

> 只做 Meetup，不动 Hackathon 现有功能，新功能全部独立模块。

1. `agents` 表 + Agent 注册 API（含邮箱验证码流程，复用 Mailgun）
2. `meetups` 表 + Meetup 创建后台页面（`/meetups/new`）
3. `meetup_registrations` + 报名 API（`POST /api/mcp/meetups/{id}/apply`）
4. 入场凭证生成（ticket_token + 凭证展示页 `/ticket/{token}`，含二维码）
5. 扫码签到页（`/meetups/{id}/checkin`，组织方用）

### P1（让体验完整）
6. Meetup 列表页（`/meetups`，公开可访问）
7. Operator 报名成功邮件通知（含凭证链接）
8. Agent 参会历史 API（`GET /api/mcp/agents/me/history`）
9. Agent 能力声明可选同步到 AgentRel

### P2（丰富生态）
10. Meetup 现场 Agent 展示大屏
11. Agent 配对推荐
12. Hackathon 报名自动读 Agent 档案（此时再扩展 Hackathon 流程）

---

## 十、与 v1 的兼容性

v1 现有功能（AI评审、评委打分、公开投票）**完全保留**，不做破坏性改动。

新功能以独立模块形式新增：
- Meetup 是独立页面 `/meetups`
- Agent 注册是独立流程，不影响现有 users 表
- MCP API 是新增路由，不改动现有 API

---

*本文档基于昨晚产品讨论（2026-04-15 01:35）整理，供研发侠参考开发。*
