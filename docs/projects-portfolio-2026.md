# OpenClaw Workspace: 研发项目全景与状态报告
**生成日期:** 2026-04-09
**环境:** Ubuntu 22.04 / Vercel / Supabase / PM2 / Docker

---

## 🟢 第一梯队：活跃核心业务 (Active Core)

### 1. ContentFlow (AI 内容运营工具)
*   **技术栈:** Next.js, Supabase (`nofczyucgszztvzaluln`)
*   **部署环境:** Vercel (`contentflow-kfi28exqc...vercel.app`)
*   **后台任务:** Vercel Cron (`/api/fetch-all` 每天 04:00, `/api/update-scores` 每天 06:00)
*   **最新进度:** (今天) 持续迭代热度算法 (hot-score v3)，优化多样性 (Top 10 max 3 per source)，修复了 hotspots 数据过期问题。

### 2. AgentRel (OpenBuild Hackathon 评估框架)
*   **技术栈:** Next.js, Supabase (`zkpeutvzmrfhlzpsbyhr`)
*   **部署环境:** Vercel (`agentrel-o8gta9u00...vercel.app`)
*   **后台任务:** Vercel Cron (`/api/cron/update-skills` 每天 18:00)
*   **最新进度:** (3天前) 新增 sponsors 实体表和 grants 关联，管理员可维护项目方，新增 `GET /api/v1/grants/[id]/context` 供 AI agent 调用。

### 3. Hackagent (Hackathon 管理平台)
*   **技术栈:** Next.js, Supabase (`nofczyucgszztvzaluln`)
*   **部署环境:** Vercel (`hackagent-57wl8dx3d...vercel.app`)
*   **最新进度:** (6天前) 上线 Team Hall 公开页、团队邀请 API 逻辑（邮件脱敏）、P0/P1 级安全审计修复（硬编码 Key、越权修改等）。

### 4. BuildLog (Web3/AI 内容数据采集引擎)
*   **技术栈:** Node.js (collector / processor / shared 分层架构), Supabase (`nofczyucgszztvzaluln`)
*   **部署环境:** PM2 守护进程 (`buildlog-scheduler`, `buildlog-collector`, `buildlog-ai-worker`)
*   **最新进度:** (今天) 修复了采集结果入库遗留 bug，新增 OPML 批量导入功能和小时级 hot_score 重算机制。

### 5. Feedcast (内容分发/二次创作平台)
*   **技术栈:** Next.js, Supabase (`nofczyucgszztvzaluln`), LLM (Minimax / Claude / DeepSeek)
*   **部署环境:** Vercel (`feedcast-p73zf1iv1...vercel.app`), Cron (`/api/admin/collect-images`)
*   **最新进度:** (3天前) 接入 claude-sonnet-4-6 模型支持，新增草稿保存功能，增加 AI 生成超时容错 (9s 兜底)。

### 6. Insight (Web3Insight 开发者数据可视化)
*   **技术栈:** Next.js
*   **部署环境:** Vercel (挂载域)
*   **最新进度:** (3天前) 整合 GitHub 统计与 Web3Insight 链上数据双源同步，优化开发者发现 (Talent Discovery) 的画像 UI 和估值打分逻辑。

---

## 🟡 第二梯队：基础设施与自动化 (Bots & Infra)

### 7. Polymarket Bot (自动化交易程序)
*   **技术栈:** Node.js, Polymarket CLOB API, Polygon RPC
*   **部署环境:** 服务器后台守护进程 (`setsid` 挂载运行)
*   **最新进度:** (3天前) 完善了 signals 日志系统，分离了日志输出与交易策略，当前有 Annica 全周期做市与 Sniper 尾盘两套模块。

### 8. Web3-Hub (内容流中枢)
*   **技术栈:** Docker, RSSHub, Redis
*   **部署环境:** 宿主机 Docker (包含 `web3-hub_redis_1`, `web3-hub_rsshub_1`)
*   **最新进度:** 稳定运行 9 天，主要作为 BuildLog 和上游数据源的中间件。

### 9. OpenClaw Meet (Google Meet 实时会议摘要)
*   **技术栈:** Chrome Extension (Manifest V3)
*   **部署环境:** 浏览器本地安装 + VPS Webhook 接收
*   **最新进度:** (2周前) 适配了 2026 最新 Meet DOM 结构，加入本地缓存和网络重试机制，VPS 端完成聚合摘要直接推送到 Telegram。

### 10. TokenLens (LLM Token 用量与成本监控)
*   **技术栈:** Node.js, SQLite
*   **部署环境:** PM2 (`tokenlens-dashboard`)
*   **最新进度:** (4周前) 完成基础架构搭建和面板初始化，目前稳定收集中。

---

## 🔵 第三梯队：稳定维护/低频项目 (Maintenance)

### 11. Twitter Analytics Pro (推特数据看板)
*   **技术栈:** Next.js, Supabase (`fpgufxrzgtdyqtvkupeu`)
*   **部署环境:** Vercel (`twitter-analytics-gy171gst5...vercel.app`)
*   **最新进度:** (6周前) 修复用户缓存接口，优化了时间范围过滤图表，目前稳定。

### 12. Feedclaw (个人内容订阅前端)
*   **技术栈:** Next.js, Supabase (`zkpeutvzmrfhlzpsbyhr`)
*   **部署环境:** Vercel (`feedclaw-l7664ohbk...vercel.app`)
*   **最新进度:** (4周前) 完成了移动端适配和基本功能，目前低频维护。

### 13. Ian-docs (个人知识库/PRD 站点)
*   **技术栈:** Next.js
*   **部署环境:** Vercel (`ian-docs-ql19bjlfy...vercel.app`)
*   **最新进度:** (今天) 刚刚更新了 ContentFlow / PloPlo 项目的最新 PRD 和方向架构幻灯片。

### 14. Resume-Site (在线简历)
*   **技术栈:** HTML / Python Script 生成
*   **部署环境:** Vercel (`resume-site-ixorwskof...vercel.app`)
*   **最新进度:** 稳定展示版，由脚本驱动更新。

---

## ⚪ 第四梯队：刚启动/脚本集 (New & Scripts)

### 15. Mailer (邮件服务组件)
*   **状态:** 今天刚初始化 commit，准备开发。

### 16. Agentrel-MCP (AgentRel MCP 协议服务端)
*   **状态:** 今天刚初始化 commit，规划暴露 AgentRel 能力给 Claude 桌面端。

### 17. Hackathon-Analyzer (数据分析脚本)
*   **技术栈:** Python
*   **状态:** 用于定期跑报告生成静态 HTML，刚刚更新了对新旧字段名字的兼容。
