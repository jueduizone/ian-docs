# FeedCast PRD v0.1

> **内容创作自动化工具** — 从 BuildLog feeds 一键生成小红书 + 公众号 + SEO 内容包

---

## 一、产品定位

FeedCast 是面向 OpenBuild 运营团队的内容生产工具。它对接 BuildLog 的 AI 资讯数据源，帮助运营者快速将优质内容转化为各平台适配格式，减少重复排版和改写工作量。

**目标用户：** OpenBuild 内容运营  
**核心价值：** 选题 → 多平台内容 → 可发布素材，全流程 < 10 分钟

---

## 二、核心功能

### 2.1 选题中心

- 读取 BuildLog Supabase 的最新 feeds（只读）
- AI 对每条资讯评分（相关性 + 传播潜力）
- 展示 Top 10 候选文章，运营者手动确认 1-3 篇
- 支持按分类筛选（AI / DeFi / Web3 / 开发者工具等）

### 2.2 内容生成

每次生成输出以下完整内容包：

| 输出物 | 规格 |
|--------|------|
| **小红书文案** | 标题 + 正文 300-500字 + 10个标签 |
| **小红书竖版图** | 1242×1660px，HTML+CSS Puppeteer 渲染 |
| **公众号长文** | SEO 优化版，1500-3000字 |
| **公众号 HTML 排版** | 样式内嵌，可直接粘贴进公众号后台 |
| **SEO 数据** | 关键词 5-8 个 + meta description（≤160字）+ 标题评分 |
| **一句话摘要** | 核心观点，用于转发/引用 |

### 2.3 小红书竖版图规格（简单科技风）

- 背景：深灰/深蓝渐变（`#0f0f23 → #1a1f3c`）
- 主标题：白色，56-64px，粗体，居中
- 副标题/标签行：蓝紫渐变（`#7c3aed → #2563eb`），24px
- 正文：白色，28px，左对齐，行间距 1.8
- 列表项：▸ 符号前缀
- 底部：OpenBuild Logo 占位 + 账号名
- emoji 点缀：标题附近 1-2 个

### 2.4 公众号排版规格

- 白色背景，正文 `#333`，16px
- h2 标题：左侧 4px 蓝色边框（`#2563eb`）+ 背景浅蓝 `#f0f7ff`
- 重点词：蓝色加粗 `#1d4ed8`
- 段落间距 1.6，每段不超过 4 行
- 无装饰图案，简洁留白

### 2.5 SEO 模块

- 关键词建议：5-8 个，含长尾词
- Meta description：自动生成，≤160字
- 标题 SEO 评分：基于长度（30-60字最优）、关键词覆盖、点击吸引力
- 输出格式：可用于官网/博客发布的结构化 frontmatter

---

## 三、技术架构

### 3.1 项目结构

```
feedcast/          # Next.js 14 独立项目
├── app/
│   ├── page.tsx          # 选题中心
│   ├── generate/         # 内容生成页
│   └── api/
│       ├── feeds/        # BuildLog feeds 读取
│       ├── generate/     # AI 内容生成
│       └── render-image/ # Puppeteer 截图
├── lib/
│   ├── buildlog.ts       # Supabase 只读客户端
│   ├── templates/        # HTML 模板（小红书/公众号）
│   └── seo.ts            # SEO 评分逻辑
└── public/
```

### 3.2 技术选型

| 模块 | 方案 |
|------|------|
| 框架 | Next.js 14 App Router |
| 数据源 | BuildLog Supabase（只读，`nofczyucgszztvzaluln`） |
| AI 生成 | CommonStack API（GLM-5 / Claude Sonnet） |
| 图片渲染 | Puppeteer（本地）→ HTML/CSS 模板参数化 |
| 公众号排版 | 内嵌样式 HTML 片段，无需第三方工具 |
| SEO 模块 | 复用 `~/.openclaw/workspace-work/seomachine` Python 模块 |
| 部署 | Vercel（不含 Puppeteer，图片生成走本地或 VPS API） |

### 3.3 复用现有工具

- **`~/.openclaw/workspace/wechat-md-editor`**：微信公众号 Markdown → HTML 转换（本地 pnpm dev）
- **`~/.openclaw/workspace-work/seomachine`**：SEO 流水线（keyword_analyzer、seo_quality_rater Python 模块）

### 3.4 配置方式

公众号 AppID / AppSecret 等后台凭证通过**环境变量**配置，写入后不可在 UI 中查看明文。支持 Vercel Environment Variables 管理。

---

## 四、页面设计

### 4.1 选题中心（首页）

```
┌────────────────────────────────────────────────┐
│  FeedCast                          [刷新选题]   │
├────────────────────────────────────────────────┤
│  今日推荐选题（AI 评分 Top 10）                  │
│                                                │
│  ① ⭐ 9.2  [AI Agent 正在重塑 DeFi 清算机制]   │
│            Web3 / 2026-03-31                   │
│                                    [选这篇]     │
│  ② ⭐ 8.7  [Solana 生态 TVL 突破 $80B]         │
│            DeFi / 2026-03-31                   │
│                                    [选这篇]     │
│  ...                                           │
├────────────────────────────────────────────────┤
│  已选：1 篇              [开始生成内容包 →]      │
└────────────────────────────────────────────────┘
```

### 4.2 生成结果页

Tab 切换：小红书文案 | 竖版图预览 | 公众号排版 | SEO 数据

每个 Tab 右上角有 [一键复制] 按钮。

---

## 五、MVP 范围

**Phase 1（MVP）：**
- [ ] 选题中心：BuildLog feeds 读取 + AI 评分展示
- [ ] 小红书文案生成（GLM-5）
- [ ] 公众号长文生成（Claude Sonnet）
- [ ] 公众号 HTML 排版（内嵌样式模板）
- [ ] SEO 模块（关键词 + meta + 评分）
- [ ] 小红书竖版图（HTML 模板 + Puppeteer）

**Phase 2（待规划）：**
- 公众号直接发布（需 AppID / AppSecret 配置）
- 历史内容管理
- 多账号支持（小红书多号）
- 定时生成任务

---

## 六、待确认事项

1. **公众号 API 凭证**：AppID + AppSecret 由 Ian 提供，走后台环境变量配置
2. **小红书账号名**：底部 Logo 区默认填 "OpenBuild"，确认是否需要动态配置
3. **Puppeteer 部署**：Vercel 不支持 Puppeteer，图片生成建议走 VPS（198.23.196.164）上的独立 API
4. **seomachine 集成方式**：直接 import Python 模块还是 subprocess 调用，需确认 Node.js 环境下的最佳方案

---

*文档版本：v0.1 | 最后更新：2026-03-31 | 负责人：研发侠*
