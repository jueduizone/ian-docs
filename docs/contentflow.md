# ContentFlow PRD v0.2

> 版本：v0.2
> 最后更新：2026-04-07
> 作者：产品虾 🦐

---

## 一、产品定位

**内部工具**，帮助内容创作者基于自己关注的方向，从多数据源中自动筛选内容、一键生成多平台可发布内容。

- 面向：内容运营、个人创作者
- 核心价值：从「有内容方向」到「各渠道可直接发布版本」全流程自动化
- 不是通用 AI 写作工具，是有数据源接入的垂直内容生产平台

---

## 二、用户体系

### 2.1 注册与激活

```
注册（邮箱+密码）→ 创建账号（可登录浏览）
→ 使用核心功能需要邀请码
→ 输入有效邀请码 → 激活完整权限
→ 首次登录引导弹窗：选择内容方向
→ 开始使用
```

**邀请码规则：**
- 管理员后台批量生成
- 每码限单人使用，一次性有效
- 有效期 30 天

### 2.2 用户 Profile

| 字段 | 说明 |
|------|------|
| email | 邮箱（唯一） |
| channels | 关注方向（主方向1个必选，副方向最多2个，共≤3个） |
| invite_code | 使用的邀请码 |
| activated_at | 激活时间 |

---

## 三、内容方向（Channel）

### 3.1 内置方向（5个，前期不开放自定义）

| 方向 | Emoji | 受众定位 | 数据源 |
|------|-------|---------|--------|
| AI | 🤖 | 泛 AI 读者和从业者 | BuildLog(ai) · HN · PH |
| Web3 | 🌐 | Web3 开发者和加密用户 | BuildLog(build/web3) · 专项 RSS |
| 开源 | 🔧 | 开发者社区 | HN · GitHub Trending · 专项 RSS |
| 开发者工具 | 🛠️ | 工程师 | HN · PH · 专项 RSS |
| 产品 | 📦 | 产品人 | PH · HN · 专项 RSS |

### 3.2 方向对创作的影响（中层）

生成 prompt 里注入方向受众上下文：
- AI → 「受众是对 AI 感兴趣的普通用户和从业者，注重实用性」
- Web3 → 「受众是 Web3 开发者和加密货币用户，熟悉链上概念」
- 开源 → 「受众是开发者社区，注重技术深度和社区贡献文化」
- 开发者工具 → 「受众是工程师，关注效率提升和工程实践」
- 产品 → 「受众是产品经理和创业者，关注用户需求和商业模式」

---

## 四、数据源

### 4.1 现有数据源

| 数据源 | 覆盖方向 | 状态 |
|--------|---------|------|
| BuildLog feeds | AI · Web3 · Build | 已接入 |
| Hacker News | 技术 · 开源 · 产品 | 已接入 |
| Product Hunt | 产品 · AI 工具 | 已接入 |
| RSS 订阅 | 用户自定义 | 已接入 |

### 4.2 用户自提交数据源

**流程：**
```
用户提交 URL（RSS / 网站）
→ AI 自动检测：能否爬取到内容
→ 进入人工审核队列（含 AI 检测结果作参考）
→ 审核通过/拒绝
→ Mailgun 邮件通知提交人
→ 审核通过 → 绑定到对应方向 → 加入数据源池
```

**规则：**
- 提交不限次数
- AI 判断结果仅作参考，不自动拒绝，全部进入人工审核
- 审核员可看到：URL、AI 爬取检测结果、内容样本预览

---

## 五、平台与生成逻辑

### 5.1 支持平台

| 平台 | Emoji | 核心用户逻辑 | 输出规格 |
|------|-------|------------|---------|
| 小红书 | 📱 | 结论前置，「对我有什么用」 | 正文 700-850 字 + 4 张卡片 + 标签 |
| 微信公众号 | 💬 | 深度+有观点+值得转发 | 1200-1800 字 HTML + 封面图 |
| Twitter/X | 🐦 | 转发动机=让自己显得有见识 | 结构化 Thread（Hook→洞察→So What→金句） |
| 即刻 | 🟡 | 有立场的短观点，非资讯转述 | 200-350 字 + 话题标签 |

### 5.2 生成流程

```
选题（基于用户方向过滤的 feeds）
→ 确认选题
→ 选平台 + 风格 + 卡片风格
→ AI 生成（prompt 含方向受众上下文）
→ 预览 + 复制/下载
```

---

## 六、技术方案

### 6.1 架构

- **框架：** Next.js + TypeScript
- **数据库：** Supabase（nofczyucgszztvzaluln）
- **认证：** Supabase Auth
- **邮件：** Mailgun（domain: build.openbuild.xyz）
- **部署：** Vercel
- **AI：** Zenmux（主）/ CommonStack（备）

### 6.2 新增数据表

```sql
-- 邀请码
CREATE TABLE invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户 Profile（扩展 Supabase auth.users）
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  primary_channel TEXT NOT NULL DEFAULT 'ai',
  secondary_channels TEXT[] DEFAULT '{}',
  activated_at TIMESTAMPTZ,
  invite_code_id UUID REFERENCES invite_codes(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 数据源提交
CREATE TABLE datasource_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  url TEXT NOT NULL,
  channel TEXT,
  ai_crawlable BOOLEAN,
  ai_check_detail JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewer_note TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 七、开发计划

### Phase 1（当前）
- [ ] 注册页 + 邀请码激活逻辑
- [ ] 首次登录引导弹窗（选内容方向）
- [ ] user_profiles 表 + invite_codes 表
- [ ] 数据源提交入口
- [ ] 后台审核队列（含 AI 检测结果展示）
- [ ] Mailgun 审核通知邮件

### Phase 2
- [ ] 素材库 / 选题按用户方向过滤
- [ ] 生成 prompt 注入方向受众上下文
- [ ] 工具页提示文案跟随用户方向动态更新

### Phase 3
- [ ] 方向页 `/channel/:slug`
- [ ] 数据源公共池展示
- [ ] 用户方向统计

---

## 八、待决策 / 已决策

| 问题 | 决策 |
|------|------|
| 频道是全局还是自定义？ | 系统固定5个，前期不开放自定义 |
| 数据源提交门槛？ | 不限次数，AI 检测+人工审核 |
| 邮件服务？ | Mailgun（build.openbuild.xyz） |
| 方向影响创作深度？ | 中层：prompt 注入受众上下文 |
| 工具页文案何时改？ | Phase 2，方向功能上线后一并改 |
| 用户激活引导时机？ | 首次登录后立即引导弹窗 |
