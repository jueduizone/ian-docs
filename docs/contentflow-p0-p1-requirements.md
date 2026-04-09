# ContentFlow P0 + P1 详细需求文档

## 生成时间
2026-04-08 00:09

---

## P0 MVP（优先完成）

### 1. 采集状态监控面板

**页面入口：** `/admin/datasources` → 顶部新增「采集健康」Tab

**数据表设计：**
```sql
CREATE TABLE datasource_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT NOT NULL,       -- 'hn' / 'github' / 'buildlog' / 'ph' / 'arxiv'
  source_name TEXT NOT NULL,     -- 显示名称
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  items_count INTEGER DEFAULT 0, -- 本次采集条数
  status TEXT DEFAULT 'success', -- success / partial / failed
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON datasource_sync_logs(source_id, synced_at DESC);
```

**前端展示（表格）：**

| 数据源 | 最近采集时间 | 今日条数 | 状态 | 操作 |
|--------|------------|---------|------|------|
| Hacker News | 2小时前 | 24条 | ✅ 正常 | 触发 |
| GitHub Trending | 6.5小时前 | 8条 | ⚠️ 待更新 | 触发 |
| BuildLog | 14小时前 | 0条 | ❌ 异常 | 触发 |

**状态判断逻辑：**
- ✅ 正常：距上次采集 < 6h
- ⚠️ 待更新：6h-24h 未采集
- ❌ 异常：> 24h 或 status=failed

**手动触发：** 管理员点击「触发」→ `POST /api/admin/datasources/:source_id/trigger` → 调用对应 fetch API

---

### 2. 小红书内容生成细化

**生成界面新增「内容类型」选择：**

```
[资讯类] [观点类] [工具类]
```

**Prompt 根据类型调整：**

| 类型 | Prompt 模板关键词 | 字数范围 | 结构 |
|------|-----------------|---------|------|
| 资讯类 | 事件→背景→影响→判断→建议 | 400-550 字 | 开头 Hook 20-40 字 |
| 观点类 | 明确立场→论据×3→结论 | 600-750 字 | 开头 Hook 20-40 字 |
| 工具类 | 是什么→解决什么→怎么用→适合谁→评价 | 500-650 字 | 开头 Hook 20-40 字 |

**标签生成规则（注入 Prompt）：**
```
生成 8-10 个话题标签：
- 2个大流量词（平台热门，如 #AI #人工智能）
- 4-5个垂直词（内容精准词，如 #ChatGPT #效率工具）
- 2-3个长尾词（精准但流量中等，如 #打工人日常）
```

**Hook 类型（注入 Prompt）：**
```
正文第一句必须是强吸引力开头，20-40字，类型选一：
- 数字型："看了X篇/X个月，发现..."
- 对比型："大家都说...，但实际..."  
- 疑问型："为什么我劝你别..."
- 故事型："上个月踩了个坑..."
```

---

### 3. 方向用户画像 Prompt 注入

**在 `lib/channel-filter.ts` 的 CHANNEL_AUDIENCE 常量里替换为完整画像：**

```typescript
const CHANNEL_AUDIENCE: Record<string, string> = {
  ai: `受众是对 AI 感兴趣的普通用户和从业者（产品经理、开发者、创业者）。
知识水平基础到中级，不需解释基础概念，但需要具体案例和实操建议。
他们关心：哪些工具好用、怎么提升效率、最新趋势。
语气要求：接地气、有案例、能直接用，避免过于技术化。`,

  web3: `受众是 Web3 开发者和加密货币用户，有链上经验，熟悉钱包、DeFi、NFT。
知识水平中级到高级，不需解释基础术语。
他们关心：技术实现细节、项目可靠性、安全风险。
语气要求：专业、硬核、有观点，避免小白化解释。`,

  opensource: `受众是开发者社区成员（贡献者、维护者），熟悉 Git、GitHub、开源协议。
他们关心：技术深度、社区贡献文化、如何参与开源。
语气要求：技术范儿、尊重社区文化，避免营销化表达。`,

  devtools: `受众是工程师（前端/后端/全栈/DevOps），熟悉主流技术栈。
他们关心：工具效率、学习成本、集成难度、对比分析。
语气要求：实用主义、对比分析、有代码示例更好。`,

  product: `受众是产品经理和创业者，熟悉产品方法论、用户研究。
他们关心：如何发现需求、如何做决策、如何增长、竞品分析。
语气要求：有洞察、有案例、能引发思考，避免功能罗列。`
}
```

---

### 4. 平台内容规格落地

**公众号 Prompt 补充：**
```
标题规则：22-26字（含标点），有钩子感（数字型/对比型/疑问型）
排版：正文字号14-15px，行高1.8，引用块用灰底左边框
封面图：900×500px，文字居中，字号48-64px，纯色或渐变背景
结尾：引导关注/点赞/转发，或开放性问题
```

**Twitter/X Prompt 补充：**
```
生成格式为 Thread，5-8 条推文：
1. 首推：核心观点 + 钩子 + 🧵，100-140字符
2. 第2推：背景说明，200-250字符
3. 第3-5推：核心论据，每推200-250字符
4. 倒数第2推：So What（对读者意味着什么）
5. 最后一推：金句总结 + 关注/转发CTA
```

**即刻 Prompt 补充：**
```
150-350字，必须有明确立场，不要中立表达。
开头直接说观点，不要铺垫。
话题标签2-4个，选垂直话题（AI工具/产品思考/开发者/创业）。
禁用词：干货、必看、建议收藏、绝绝子、YYDS。
结尾可加开放性问题引发讨论。
```

---

## P1（P0 完成后执行）

### 5. 数据源扩展（4个）

**arXiv AI 论文：**
- Feed URL：`https://arxiv.org/rss/cs.AI` + `https://arxiv.org/rss/cs.LG`
- 解析字段：标题、作者（取前3位）、摘要（前200字）、PDF链接、发布时间
- 采集频率：每天一次（论文更新不频繁）
- 分类：AI 方向

**Substack 订阅：**
- 用户在数据源管理页填入 Substack 博客地址，系统自动拼接 `/feed`
- 解析：标题、摘要、作者、发布时间、原文链接
- 采集频率：每6小时
- 分类：产品/开源方向

**Mirror.xyz：**
- API：`https://mirror.xyz/api/entries?contributor=<address>`（需要用户填入钱包地址或 ENS）
- 解析：标题、内容摘要、作者、发布时间
- 备选：Mirror RSS `https://mirror.xyz/<address>/rss`
- 分类：Web3 方向

**DEV.to：**
- API：`https://dev.to/api/articles?tag=devops&per_page=10`
- 免费，无需 API Key
- 解析：标题、摘要、作者、阅读数、发布时间
- 可按 tag 过滤（devtools/typescript/webdev）
- 分类：开发者工具方向

---

### 6. 历史记录「继续编辑」

**交互流程：**
```
历史记录列表
  ↓ 每条记录右侧显示「继续编辑」按钮
  ↓ 点击
跳转到 /generate 页面，URL 带参数：
  ?platform=xiaohongshu&topic=xxx&ref=<encoded历史内容>
  ↓
生成页面读取参数
  ↓
右侧展示「参考内容」折叠面板（原历史结果）
  ↓
用户可修改 topic 或 prompt，点击重新生成
```

**技术实现：**
- 历史记录存 `localStorage` 或 Supabase `generation_history` 表
- `ref` 参数 URL encode，长度 > 500 字改用 sessionStorage 传递

---

### 7. 前端补完

**skeleton 加载：**
```
点击「生成」
  ↓
按钮变「生成中...」+ 禁用
结果区域显示 skeleton（3-4 行灰色占位）
  ↓
生成完成 → 替换为实际内容
```

**重试按钮：**
```
生成失败 → 显示错误信息 + 「重试」按钮
点击重试 → 重新发起相同请求
```

**超时提示：**
```
生成 > 10s → 显示「正在努力生成中，请稍候...」
生成 > 30s → 显示「生成时间较长，可能是网络问题，如需可重试」+ 重试按钮
```

---

### 8. 邀请码逻辑调整

**当前逻辑：** `expires_at = created_at + 30天`

**改为：**
```typescript
// 生成邀请码时
expires_at = NULL  // 未使用的码永不过期

// 用户激活邀请码时
expires_at = NOW() + 30天  // 激活时才开始计时
activated_at = NOW()
```

**数据库字段变更：**
```sql
ALTER TABLE invite_codes ADD COLUMN activated_at TIMESTAMPTZ;
-- expires_at 改为激活时写入，生成时留 NULL
```

---

## 开发顺序

1. **P0 全部完成** → 通知产品虾验收
2. **P1 全部完成** → 通知产品虾验收

## 验收标准

### P0 验收点
- [ ] 采集状态监控面板功能完整
- [ ] 小红书字数分类 + Hook 规则实现
- [ ] 方向画像 Prompt 注入生效
- [ ] 平台内容规格落地（公众号/Twitter/即刻）

### P1 验收点
- [ ] 4个数据源扩展完成（arXiv/Substack/Mirror/DEV.to）
- [ ] 历史记录「继续编辑」功能
- [ ] 前端 skeleton/重试/超时提示
- [ ] 邀请码逻辑调整完成

---

**文档版本：** v1.0  
**更新时间：** 2026-04-08 00:09  
**负责人：** 产品虾 🦐
