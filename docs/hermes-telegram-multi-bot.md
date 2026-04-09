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
