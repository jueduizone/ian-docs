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

---

## 新增需求：管理员后台 - 用户使用统计

### 功能描述
管理员可在后台查看用户的 AI 使用记录，包括使用的模型、生成的内容、token 消耗等。

### 数据表设计

```sql
-- 使用记录表
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  model text NOT NULL,                    -- 使用的 AI 模型
  platform text,                          -- 生成平台（小红书/公众号/Twitter/即刻）
  prompt_length integer,                  -- prompt 长度
  output_length integer,                  -- 输出长度
  tokens_used integer,                    -- 消耗的 token 数
  generation_time_ms integer,             -- 生成耗时（毫秒）
  status text DEFAULT 'success',          -- success / error / timeout
  error_message text,                     -- 错误信息（如果失败）
  created_at timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);
CREATE INDEX idx_usage_logs_model ON usage_logs(model);

-- 权限
GRANT ALL ON usage_logs TO anon, authenticated, service_role;
```

### 后台页面

**路径：** `/admin/usage`

**功能：**
- 查看所有用户的使用记录列表
- 按用户筛选
- 按模型筛选
- 按时间范围筛选
- 统计汇总（总 token 数、总生成次数、平均耗时）
- 导出 CSV

### 记录时机

在 `/api/generate` 调用 AI 生成内容时记录：
- 请求前记录：user_id、model、platform、prompt_length
- 请求后记录：output_length、tokens_used、generation_time_ms、status

### 统计指标

| 指标 | 说明 |
|------|------|
| 总生成次数 | 所有用户的生成总次数 |
| 总 token 消耗 | 累计消耗的 token 数 |
| 平均生成时间 | 单次生成的平均耗时 |
| 热门模型 | 使用频率最高的模型 |
| 活跃用户 | 生成次数最多的用户 |


---

## 管理员后台入口设计

### 需求背景
管理员需要统一的后台入口，集中管理所有功能。

### NavBar 调整

**普通用户看到：**
- Logo + 核心导航（素材库、内容生成、数据源、工具箱）
- 用户头像/名称（下拉菜单）
  - 个人设置
  - 退出登录

**管理员额外看到：**
- 用户头像/名称（下拉菜单）
  - 个人设置
  - ⚙️ **后台管理** ← 新增
  - 退出登录

### 后台管理菜单

点击"后台管理"进入 `/admin`，显示侧边栏导航：

```
┌─────────────────────────────────────┐
│  ⚡ ContentFlow        [退出]       │
├──────────┬──────────────────────────┤
│  后台管理 │                          │
│  ─────────┤   页面内容区域            │
│  📋 数据源审核│                          │
│  📊 使用统计  │                          │
│  🎟️ 邀请码   │                          │
│  ⚙️ 系统设置  │                          │
└──────────┴──────────────────────────┘
```

### 后台页面路由

| 路径 | 功能 | 说明 |
|------|------|------|
| `/admin` | 后台首页 | 默认跳转到数据源审核 |
| `/admin/datasources` | 数据源审核 | 审核用户提交的数据源 |
| `/admin/usage` | 使用统计 | 查看用户 AI 使用记录 |
| `/admin/invite-codes` | 邀请码管理 | 生成、查看邀请码 |
| `/admin/settings` | 系统设置 | 全局配置 |

### 权限控制

```typescript
// 仅 admin 角色可访问
const isAdmin = user?.role === 'admin'
if (!isAdmin) {
  redirect('/')
}
```

### 设计要点

1. **统一布局** - 所有后台页面共用侧边栏
2. **面包屑导航** - 显示当前位置
3. **快捷操作** - 常用功能置顶
4. **响应式** - 移动端侧边栏可收起


---

## 方向切换功能设计（工作区模式）

### 核心概念
方向不是固定配置，而是可随时切换的"工作区"，类似 Notion 的 Workspace 切换。

### 设计方案

#### 1. 全局方向切换器
位置：NavBar 右侧，用户区域左侧

```
┌─────────────────────────────────────────────────────────┐
│ ⚡ ContentFlow  素材库 生成 工具  [🤖 AI ▼]  [用户头像] │
│                              方向切换器                  │
└─────────────────────────────────────────────────────────┘
```

点击后下拉选择：
- 🤖 AI
- 🌐 Web3
- 🔧 开源
- 🛠️ 开发者工具
- 📦 产品

#### 2. 切换后的变化

| 元素 | AI 方向 | 开源方向 |
|------|---------|---------|
| **素材库数据源** | BuildLog(ai) + HN + PH | HN + GitHub + 专项 RSS |
| **生成 Prompt** | "受众是对 AI 感兴趣的普通用户" | "受众是开发者社区" |
| **工具描述** | "AI 周报生成器" | "开源周报生成器" |
| **推荐内容** | AI 相关新闻 | 开源项目动态 |

#### 3. 数据隔离与共享

**隔离（按方向）**：
- 数据源过滤
- Prompt 上下文
- 推荐内容
- 工具文案

**共享（全局）**：
- 用户账号
- 历史记录
- 已生成内容
- 个人设置

#### 4. 技术实现

```typescript
// 方向状态管理
const [currentChannel, setCurrentChannel] = useState('ai')

// 切换方向
const switchChannel = (channel: string) => {
  setCurrentChannel(channel)
  localStorage.setItem('lastChannel', channel)
  // 刷新当前页面数据
  router.refresh()
}

// API 请求时带上方向
fetch(`/api/materials?channel=${currentChannel}`)
```

#### 5. 用户体验

- **记住选择**：localStorage 保存最后选择的方向
- **默认方向**：首次登录引导选择，后续默认用上次选择
- **快速切换**：无需刷新页面，数据实时更新
- **视觉反馈**：当前方向在 NavBar 高亮显示


---

## 方向选择规则更新

### 限制条件
- **主方向**：1 个（必选）
- **副方向**：1 个（可选）
- **总计**：最多 2 个方向

### 交互设计

#### 首次登录引导
```
┌─────────────────────────────────────────┐
│  选择你的内容方向                        │
│                                         │
│  主方向（必选）：                        │
│  [🤖 AI        ]  [🌐 Web3      ]      │
│  [🔧 开源      ]  [🛠️ 开发者工具]      │
│  [📦 产品      ]                        │
│                                         │
│  副方向（可选）：                        │
│  [🌐 Web3      ]  [🔧 开源      ]      │
│  [🛠️ 开发者工具]  [📦 产品      ]      │
│  [不选         ]                        │
│                                         │
│         [ 开始创作 ]                    │
└─────────────────────────────────────────┘
```

#### 选择规则
- 主方向必须选一个
- 副方向最多选一个（可以不选）
- 主方向和副方向不能相同
- 选择主方向后，副方向选项排除已选的主方向

#### 设置页面修改
用户可在设置页面修改方向，但限制不变：
- 修改主方向
- 修改/清除副方向

