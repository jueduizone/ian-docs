# Hermes 多 Bot 路由重建指南

在 OpenClaw 中，你通过配置一个 `openclaw.json` 实现了 3 个 Telegram Bot 映射到不同的 Agent 和群组。
Hermes 的设计哲学是 **"一个 Profile 对应一个独立的网关进程"**。

要在 Hermes 中完美重建你现在的体验（`@Claw_NiumaBot`, `@prd_niuma_bot`, `@aigaoshenme_bot` 各司其职），推荐使用 **PM2** 来集中管理环境变量和守护进程。

---

## 核心架构目标

1. **Bot 1 (`@Claw_NiumaBot`)** 绑定 `product-dev` 档案，允许你在私聊和 **产品研发群 (-5162237077)** 使用。
2. **Bot 2 (`@prd_niuma_bot`)** 绑定 `prd-bot` 档案，允许你在私聊和 **产品研发群 (-5162237077)** 使用。
3. **Bot 3 (`@aigaoshenme_bot`)** 绑定 `media` 档案，仅允许在 **AI搞什么群 (-1003883042780)** 和私聊使用。

---

## 重建步骤

### 步骤 1：获取你的 3 个 Telegram Tokens
你可以从原 OpenClaw 配置中提取，或者去 BotFather 重新获取。
```bash
# 查看你现有的 OpenClaw Tokens（分别对应 default, product-pm, media 账号）
cat ~/.openclaw/openclaw.json | grep -i "botToken\|token"
```

### 步骤 2：创建 PM2 生态配置文件
在 `~/.hermes/` 目录下创建一个 `ecosystem.config.js` 文件，用来集中管理这 3 个进程的启动参数和安全白名单。

```bash
nano ~/.hermes/ecosystem.config.js
```

填入以下内容（**记得把 `YOUR_TOKEN_X` 替换成真实的 Token**）：

```javascript
module.exports = {
  apps: [
    {
      name: "hermes-tg-main",
      script: "hermes",
      args: "gateway start --profile product-dev",
      env: {
        TELEGRAM_BOT_TOKEN: "YOUR_TOKEN_1_HERE",      // @Claw_NiumaBot 的 Token
        TELEGRAM_ALLOWED_USERS: "409747388",          // Ian 的 TG ID
        TELEGRAM_ALLOWED_GROUPS: "-5162237077",       // 产品研发群
        HTTP_PROXY: "http://127.0.0.1:7897",          // Node.js 22 必须强制代理
        HTTPS_PROXY: "http://127.0.0.1:7897"
      }
    },
    {
      name: "hermes-tg-prd",
      script: "hermes",
      args: "gateway start --profile prd-bot",
      env: {
        TELEGRAM_BOT_TOKEN: "YOUR_TOKEN_2_HERE",      // @prd_niuma_bot 的 Token
        TELEGRAM_ALLOWED_USERS: "409747388",
        TELEGRAM_ALLOWED_GROUPS: "-5162237077",       // 产品研发群
        HTTP_PROXY: "http://127.0.0.1:7897",
        HTTPS_PROXY: "http://127.0.0.1:7897"
      }
    },
    {
      name: "hermes-tg-media",
      script: "hermes",
      args: "gateway start --profile media",
      env: {
        TELEGRAM_BOT_TOKEN: "YOUR_TOKEN_3_HERE",      // @aigaoshenme_bot 的 Token
        TELEGRAM_ALLOWED_USERS: "409747388",
        TELEGRAM_ALLOWED_GROUPS: "-1003883042780",    // AI搞什么群
        HTTP_PROXY: "http://127.0.0.1:7897",
        HTTPS_PROXY: "http://127.0.0.1:7897"
      }
    }
  ]
};
```

### 步骤 3：启动并保存
使用 PM2 一键启动这三个独立的网关进程：

```bash
cd ~/.hermes
pm2 start ecosystem.config.js
pm2 save
```

### 步骤 4：验证
检查 3 个进程是否正常运行：
```bash
pm2 status
```
看某一个 Bot 的日志（比如看媒体机器人有没有收到群消息）：
```bash
pm2 logs hermes-tg-media
```

---

## 避坑指南

1. **群组隐私模式 (Privacy Mode)：**
   只要你不换 Token，原本在 BotFather 里面关掉的 Privacy Mode 依然有效，不需要重新关。
2. **命令拦截：**
   Hermes 的 Telegram Gateway 默认会处理 `/start` 和 `/clear`。由于三个 Bot 是独立进程，在**同一个群**里（比如研发群有 2 个 Bot），如果你发了公屏命令，两个都会收到。建议在群里只用 `@提及` 来交互，避免串台。
3. **主守护进程：**
   如果你同时在用 CLI，建议把 CLI 跑在 `main` profile，Telegram bot 跑在 `product-dev` 等子 profile，避免状态冲突。

---

## 🚨 关于 Topic 路由 (Ian's OPC 模式) 的核心差异与局限

在 OpenClaw (Ian's OPC 体验) 中，你习惯了这样的操作：
在同一个 Telegram 群里，把主 Bot (`@Claw_NiumaBot`) 拉进群：
- 在 Topic 8 发消息 → OpenClaw 自动转给 `work` agent
- 在 Topic 2 发消息 → OpenClaw 自动转给 `product-dev` agent
- 在 Topic 4 发消息 → OpenClaw 自动转给 `research` agent

### 为什么 Hermes 原生做不到？
1. **Telegram API 限制：** Telegram 长轮询 (`getUpdates`) 不允许同一个 Token 被多个独立的进程同时拉取，否则会疯狂报错 `409 Conflict: terminated by other getUpdates request`。
2. **架构差异：** OpenClaw 在底层写了一个**中央路由器**，统一拉取消息后，通过读取 `message_thread_id` (Topic ID)，在内存里把消息分发给不同的 Agent。而 Hermes 的架构是**进程级隔离**，`gateway` 是直接绑死在单个 Profile 上的。

### 在 Hermes 中如何替代这种体验？

**方案 A：每个 Topic 绑定一个独立的专属 Bot（推荐，物理隔离）**
如果你一定要保留 Topic 分类的体验，你需要去 BotFather 申请多个 Bot（比如 `@Ian_WorkBot`, `@Ian_LifeBot`），然后把它们分别拉进对应的 Topic，在 PM2 里用不同的 Token 启动：
```javascript
{
  name: "hermes-topic-work",
  script: "hermes",
  args: "gateway start --profile work",
  env: {
    TELEGRAM_BOT_TOKEN: "WORK_BOT_TOKEN",
    TELEGRAM_ALLOWED_GROUPS: "-100xxxxxxx",
    // Hermes gateway 支持限定 specific thread
    TELEGRAM_ALLOWED_THREADS: "8" 
  }
}
```

**方案 B：Hermes 的默认哲学（语义路由，取消 Topic 隔离）**
Hermes 提倡的是**主从协同模式 (Coordinator-Worker)**。
你只需要把主 Bot 放在一个没有任何 Topic 的普通群（或者就在默认的 General 里）。你跟主 Agent 说话，当你的需求涉及“工作/日程”时，主 Agent 会在后台自动调用 `spawn_subagent` 或类似的 tool 把任务丢给 `work` profile 处理，然后汇总结果给你。不需要你物理上去切换 Topic 来人为路由。

**方案 C：编写中间件 Webhook 路由器（硬核魔改）**
如果不妥协，必须用 1 个 Bot + 多 Topic + 多 Profile，你需要：
1. 写一个 Node.js/Python 小服务接管 Telegram Webhook。
2. 识别收到的消息 `message_thread_id`。
3. 通过 Hermes 的本地 API (`hermes serve`) 将请求转发给对应的 Profile。
*(这相当于你要把 OpenClaw 的路由层给重写一遍挂在 Hermes 前面)*
