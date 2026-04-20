# OpenSeed 技术方案
## SPARK Pledge 实施基础设施

版本：v0.3  
日期：2026-04  
变更摘要：
- v0.3：SPARK.md 格式升级为 YAML frontmatter + Markdown 正文双层结构；动态上报重新定位为"可选激励"（非 License 强制义务）；明确动态上报数据流进入 Funnel Score；License 申报义务层级细化（强制静态申报 vs 可选动态上报）
- v0.2：新增 SPARK License 架构、AI 使用可见性工具链（4.7）、Funnel 第 6 维 AI 使用深度、Registry 双注册类型扩展、Dashboard/DB/API 对应更新

---

## 一、整体架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          用户层 (Frontend)                               │
│   openseed.xyz                                                           │
│   ┌──────────────┐ ┌──────────────┐ ┌────────────────┐ ┌────────────┐  │
│   │ Pledge 签署   │ │ License 注册  │ │ Registry 列表   │ │ Compliance │  │
│   │ 入口          │ │ 入口          │ │ 项目浏览         │ │ Dashboard  │  │
│   └──────────────┘ └──────────────┘ └────────────────┘ └────────────┘  │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────────────┐
│                         后端服务层 (API)                                  │
│                                                                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐  │
│  │  Registry API    │  │  Funnel Engine   │  │  Report / AI API     │  │
│  │  Pledge + License│  │  依赖图解析+分配  │  │  年报 + AI 披露提交   │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────────┬───────────┘  │
│           │                     │                        │               │
│  ┌────────▼─────────────────────▼────────────────────────▼───────────┐  │
│  │                          数据层                                    │  │
│  │  PostgreSQL (链下状态)  +  IPFS (年报/AI披露存档)                   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────────────┐
│                         链上层 (Ethereum Mainnet)                         │
│                                                                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────────┐ │
│  │  SPARKRegistry   │  │  SPARKEscrow     │  │  EAS Schema            │ │
│  │  Pledge + License│  │  Token 托管合约   │  │  链上存证（Pledge/Lic） │ │
│  │  双注册类型       │  │                  │  │                        │ │
│  └──────────────────┘  └──────────────────┘  └────────────────────────┘ │
│                                                                           │
│  外部依赖：EAS (Ethereum Attestation Service)                             │
│           deps.dev API (Google, 依赖图数据源)                             │
│           GitHub API (仓库信息)                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 二、链上合约设计

### 2.1 SPARKRegistry.sol

项目 Pledge 注册合约，核心状态机。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SPARKRegistry {

    // ── 注册类型枚举 ──────────────────────────────────────────
    enum RegistrationType {
        Pledge,         // 项目主动签署 SPARK Pledge
        License,        // 项目采用 SPARK License 发布代码
        Both            // 同时注册两种类型
    }

    // ── 状态枚举 ──────────────────────────────────────────────
    enum PledgeStatus {
        None,           // 未注册
        Active,         // 已签署 Pledge，尚未商业化
        Triggered,      // 已商业化，宽限期计时中
        GracePeriodOver, // 宽限期结束，必须履行
        Compliant,      // 已履行当期义务
        Defaulted       // 违约（移出 Registry 但链上记录保留）
    }

    // ── 项目结构体 ────────────────────────────────────────────
    struct Project {
        address owner;          // 项目钱包地址
        string  githubRepo;     // "org/repo" 格式
        string  name;
        uint256 pledgedAt;      // Pledge 签署时间戳（0 = 未签署 Pledge）
        uint256 licenseAdoptedAt; // License 采用时间戳（0 = 未采用 License）
        uint256 triggeredAt;    // 商业化触发时间戳（0 = 未触发）
        uint16  upstreamPct;    // 4% SPARK 递归分配（basis points: 400，uint16 max=65535）
        uint16  depPct;         // 1% 依赖分配（basis points: 100）
        PledgeStatus status;
        RegistrationType regType; // 注册类型
        bool    hasToken;       // 是否是 token 项目
        address tokenAddress;   // token 合约地址（如有）
    }

    // ── 存储 ──────────────────────────────────────────────────
    mapping(bytes32 => Project) public projects;  // key = keccak256(githubRepo)
    mapping(address => bytes32[]) public ownerProjects;
    bytes32[] public allProjects;

    // ── 事件 ──────────────────────────────────────────────────
    event PledgeSigned(bytes32 indexed projectId, address indexed owner, string githubRepo);
    event LicenseAdopted(bytes32 indexed projectId, address indexed owner, string githubRepo);
    event CommercializationTriggered(bytes32 indexed projectId, uint256 timestamp);
    event ObligationFulfilled(bytes32 indexed projectId, uint256 amount, address token);
    event ProjectDefaulted(bytes32 indexed projectId);

    // ── 常量 ──────────────────────────────────────────────────
    uint256 public constant GRACE_PERIOD = 3 * 365 days;
    uint256 public constant REVENUE_THRESHOLD_LOW  = 50_000e6;   // $50K (USDC 6位精度)
    uint256 public constant REVENUE_THRESHOLD_HIGH = 500_000e6;  // $500K

    // ── 核心函数 ──────────────────────────────────────────────

    /// @notice 项目签署 SPARK Pledge
    function signPledge(
        string calldata githubRepo,
        string calldata name,
        uint16 upstreamPct,   // 默认 400 (4%)，可调但 >= 200 (2%)，uint8 会溢出
        uint16 depPct,        // 默认 100 (1%)，可调但 >= 50 (0.5%)
        bool   hasToken,
        address tokenAddress
    ) external {
        bytes32 id = keccak256(bytes(githubRepo));
        require(upstreamPct >= 200, "Minimum 2%");
        require(depPct >= 50, "Minimum 0.5%");

        Project storage p = projects[id];
        if (p.owner == address(0)) {
            // 全新注册
            projects[id] = Project({
                owner: msg.sender,
                githubRepo: githubRepo,
                name: name,
                pledgedAt: block.timestamp,
                licenseAdoptedAt: 0,
                triggeredAt: 0,
                upstreamPct: upstreamPct,
                depPct: depPct,
                status: PledgeStatus.Active,
                regType: RegistrationType.Pledge,
                hasToken: hasToken,
                tokenAddress: tokenAddress
            });
            ownerProjects[msg.sender].push(id);
            allProjects.push(id);
        } else {
            // 已有 License 注册，叠加 Pledge
            require(msg.sender == p.owner, "Unauthorized");
            require(p.pledgedAt == 0, "Pledge already signed");
            p.pledgedAt = block.timestamp;
            p.upstreamPct = upstreamPct;
            p.depPct = depPct;
            p.status = PledgeStatus.Active;
            p.regType = RegistrationType.Both;
        }

        emit PledgeSigned(id, msg.sender, githubRepo);
    }

    /// @notice 项目采用 SPARK License（代码发布时注册）
    function adoptLicense(
        string calldata githubRepo,
        string calldata name,
        bool   hasToken,
        address tokenAddress
    ) external {
        bytes32 id = keccak256(bytes(githubRepo));

        Project storage p = projects[id];
        if (p.owner == address(0)) {
            // 全新注册，仅 License 类型，商业化前义务为零
            projects[id] = Project({
                owner: msg.sender,
                githubRepo: githubRepo,
                name: name,
                pledgedAt: 0,
                licenseAdoptedAt: block.timestamp,
                triggeredAt: 0,
                upstreamPct: 400,  // License 默认 4%，商业化触发后生效
                depPct: 100,
                status: PledgeStatus.Active,
                regType: RegistrationType.License,
                hasToken: hasToken,
                tokenAddress: tokenAddress
            });
            ownerProjects[msg.sender].push(id);
            allProjects.push(id);
        } else {
            // 已有 Pledge，叠加 License
            require(msg.sender == p.owner, "Unauthorized");
            require(p.licenseAdoptedAt == 0, "License already adopted");
            p.licenseAdoptedAt = block.timestamp;
            p.regType = RegistrationType.Both;
        }

        emit LicenseAdopted(id, msg.sender, githubRepo);
    }

    /// @notice 触发商业化（项目方自报，或 OpenSeed 多签触发）
    function triggerCommercialization(bytes32 projectId) external {
        Project storage p = projects[projectId];
        require(msg.sender == p.owner || isOperator(msg.sender), "Unauthorized");
        require(p.status == PledgeStatus.Active, "Invalid status");

        p.triggeredAt = block.timestamp;
        p.status = PledgeStatus.Triggered;

        emit CommercializationTriggered(projectId, block.timestamp);
    }

    /// @notice 检查宽限期是否已过
    function checkGracePeriod(bytes32 projectId) external {
        Project storage p = projects[projectId];
        require(p.status == PledgeStatus.Triggered, "Not triggered");
        require(block.timestamp > p.triggeredAt + GRACE_PERIOD, "Still in grace period");

        p.status = PledgeStatus.GracePeriodOver;
    }

    /// @notice 查询项目信息
    function getProject(bytes32 projectId) external view returns (Project memory) {
        return projects[projectId];
    }

    /// @notice 查询宽限期剩余时间（秒）
    function graceRemaining(bytes32 projectId) external view returns (uint256) {
        Project storage p = projects[projectId];
        if (p.triggeredAt == 0) return type(uint256).max;
        uint256 deadline = p.triggeredAt + GRACE_PERIOD;
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }

    // ... operator 管理、暂停等省略
}
```

**设计要点：**
- `upstreamPct` 和 `depPct` 用 basis points（400 = 4%），参数可调但有下限
- 商业化触发：优先项目自报，OpenSeed 多签可作为辅助触发（防止项目不申报）
- 状态机清晰：Active → Triggered → GracePeriodOver → Compliant / Defaulted
- 违约记录永远在链上，不可删除
- **v0.2 新增：双注册类型**
  - Pledge 类型：主动承诺，义务参数由项目方设定
  - License 类型：随代码发布自动携带，商业化触发后义务生效，默认参数 4%+1%
  - Both 类型：两者叠加，Pledge 参数优先（项目方主动设定）
  - `signPledge` 和 `adoptLicense` 均支持叠加注册，幂等安全

---

### 2.2 SPARKEscrow.sol

Token 项目 TGE 时专用，自动扣留 4% token。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SPARKEscrow {

    SPARKRegistry public immutable registry;
    address       public immutable sparkPool;   // SPARK 资金池多签

    struct EscrowRecord {
        address token;
        uint256 amount;
        uint256 lockedAt;
        uint256 releaseAfter;  // triggeredAt + GRACE_PERIOD
        bool    released;
    }

    mapping(bytes32 => EscrowRecord[]) public escrows;  // projectId => records

    event TokensEscrowed(bytes32 indexed projectId, address token, uint256 amount);
    event TokensReleased(bytes32 indexed projectId, address token, uint256 amount);

    constructor(address _registry, address _sparkPool) {
        registry = SPARKRegistry(_registry);
        sparkPool = _sparkPool;
    }

    /// @notice 项目 TGE 时调用，自动扣留 4%
    /// @dev 调用前需 approve 足够额度
    function escrowAtTGE(
        bytes32 projectId,
        address token,
        uint256 totalSupply
    ) external {
        SPARKRegistry.Project memory p = registry.getProject(projectId);
        require(msg.sender == p.owner, "Unauthorized");
        require(p.hasToken, "Not a token project");

        // 按项目约定比例计算托管量
        uint256 escrowAmount = totalSupply * p.upstreamPct / 10000;

        IERC20(token).transferFrom(msg.sender, address(this), escrowAmount);

        // 同步触发商业化
        registry.triggerCommercialization(projectId);

        escrows[projectId].push(EscrowRecord({
            token: token,
            amount: escrowAmount,
            lockedAt: block.timestamp,
            releaseAfter: block.timestamp + registry.GRACE_PERIOD(),
            released: false
        }));

        emit TokensEscrowed(projectId, token, escrowAmount);
    }

    /// @notice 宽限期满后，释放到 SPARK 资金池
    function releaseToPool(bytes32 projectId, uint256 index) external {
        EscrowRecord storage r = escrows[projectId][index];
        require(!r.released, "Already released");
        require(block.timestamp >= r.releaseAfter, "Grace period not over");

        r.released = true;
        IERC20(r.token).transfer(sparkPool, r.amount);

        emit TokensReleased(projectId, r.token, r.amount);
    }
}
```

**设计要点：**
- TGE 时一次调用完成：存证 + 托管 + 触发商业化计时
- 托管期间 token 锁在合约，项目无法动用
- 宽限期满自动可释放，任何人都可以调用 `releaseToPool`（无需信任）

---

### 2.3 EAS Schema（链上 Pledge 存证）

使用 Ethereum Attestation Service，无需自己维护 Registry 合约也可以做存证，两者并行：

```
Schema UID: 由 EAS SchemaRegistry 分配（Pledge 和 License 各自独立 Schema）

-- Pledge Schema --
Schema 字段：
  string  githubRepo      // "org/repo"
  string  projectName
  uint16  upstreamPct     // basis points（uint8 max=255，会溢出，改 uint16）
  uint16  depPct
  bool    hasToken
  uint256 pledgedAt
  string  pledgeVersion   // "SPARK-1.0"

-- License Schema（v0.2 新增）--
Schema 字段：
  string  githubRepo
  string  projectName
  string  licenseVersion  // "SPARK-LICENSE-1.0"
  uint256 adoptedAt
  string  sparkMdCid      // SPARK.md 文件的 IPFS CID（可选）

Resolver: SPARKRegistry 合约地址（两个 Schema 共用同一 Resolver）
Revocable: false（Pledge 和 License 采用均不可单方面撤销）
```

EAS 部署网络：Ethereum Mainnet（已决策，全部 Mainnet，与 SPARKRegistry 保持一致）

---

## 三、Dependency Funnel 引擎

### 3.1 整体流程

```
输入: GitHub repo URL
      ↓
Step 1: 获取仓库语言和包管理文件
        (package.json / requirements.txt / go.mod / Cargo.toml / pom.xml)
      ↓
Step 2: 调用 deps.dev API 解析依赖树
        递归展开，获取所有传递依赖
      ↓
Step 3: 权重计算
        每个依赖 repo 分配权重 (longevity / real_usage / maintainer_continuity / responsiveness / depth decay)
      ↓
Step 4: 匹配 SPARK Registry
        依赖中哪些已签署 Pledge？优先分配给已签署的
      ↓
Step 5: 生成分配方案
        JSON 格式，可审计，可链上执行
      ↓
Step 6: 执行分发
        已知链上地址 → 直接转账
        未认领 → 进入待认领池（12个月后归入 SPARK 总池）
```

### 3.2 deps.dev API 调用

```typescript
// 获取依赖树
async function getDependencyTree(
  system: 'npm' | 'pypi' | 'go' | 'cargo' | 'maven',
  packageName: string,
  version: string
): Promise<DependencyNode[]> {

  const url = `https://api.deps.dev/v3alpha/systems/${system}/packages/${packageName}/versions/${version}:dependencies`

  const resp = await fetch(url)
  const data = await resp.json()

  // 递归展开，最多 5 层深度（防止爆炸）
  return flattenDependencies(data.nodes, 5)
}

// 解析 GitHub 仓库关联
async function resolveGitHubRepo(
  system: string,
  packageName: string
): Promise<string | null> {

  const url = `https://api.deps.dev/v3alpha/systems/${system}/packages/${packageName}`
  const resp = await fetch(url)
  const data = await resp.json()

  // deps.dev 会返回关联的 GitHub repo
  return data.versions?.[0]?.links?.find(
    (l: any) => l.label === 'SOURCE_REPO'
  )?.url ?? null
}
```

### 3.3 权重算法

**已决策（2026-04）：去除 LOC，改为以下 6 维度（v0.2 新增 AI 使用深度）：**

```
维度                   权重    数据来源
─────────────────────────────────────────────────────────────────
longevity              25%    repo created_at → 存续年限
real_usage             30%    deps.dev dependents 数量
maintainer_continuity  25%    核心维护者连续活跃年限
responsiveness         10%    issue 平均关闭时间 + 关闭率
depth_decay            10%    依赖深度衰减 [1.0,0.7,0.5,0.35,0.25]

加成系数（叠加，不影响上方5维度归一化）：
  已签 SPARK Pledge：× 1.2
  AI 使用深度加成（v0.2 新增，v0.3 数据来源更新）：× (1.0 ~ 1.3)
    ├── SPARK.md ai-dependencies 中被申报为依赖：+ 0.1 per 申报（上限 × 1.3）
    ├── SPARK.md 存在且 wants-attribution: true：+ 0.05（覆盖率信号，上限叠加）
    └── SPARK Report API 检测到动态使用事件（opt-in）：+ 0.05 per 事件（上限 × 1.2）
```

```typescript
interface DependencyWeight {
  repo: string
  longevityScore: number        // 项目存续年限（归一化）
  realUsageScore: number        // deps.dev dependents 数量（归一化）
  maintainerScore: number       // 核心维护者连续活跃年限（归一化）
  responsivenessScore: number   // issue 响应质量（归一化）
  depthScore: number            // 深度衰减分：depth 1 = 1.0, depth 2 = 0.7 ...
  // v0.2 新增
  aiDeclaredCount: number       // 被 SPARK.md ai-dependencies 申报的次数
  aiSparkMdCount: number        // 有 SPARK.md 且 wants-attribution: true 的仓库数
  aiUsageEventCount: number     // SPARK Report API 动态上报的使用事件数（opt-in）
  finalWeight: number           // 综合权重
}

function calculateWeights(deps: ResolvedDep[]): DependencyWeight[] {
  const DEPTH_DECAY = [1.0, 0.7, 0.5, 0.35, 0.25]  // 最多 5 层
  const WEIGHTS = {
    longevity:            0.25,
    real_usage:           0.30,
    maintainer_continuity: 0.25,
    responsiveness:       0.10,
    depth_decay:          0.10,
  }

  const rawScores = deps.map(dep => {
    // 5 维度归一化得分
    const score =
      dep.longevityScore            * WEIGHTS.longevity +
      dep.realUsageScore            * WEIGHTS.real_usage +
      dep.maintainerScore           * WEIGHTS.maintainer_continuity +
      dep.responsivenessScore       * WEIGHTS.responsiveness +
      DEPTH_DECAY[dep.depth - 1]    * WEIGHTS.depth_decay

    // 加成系数（叠加，不影响5维度归一化）
    let bonus = 1.0
    if (dep.hasSparkPledge)     bonus *= 1.2

    // v0.2：AI 使用深度加成（v0.3：数据来源更新）
    const aiDeclaredBonus  = Math.min(dep.aiDeclaredCount  * 0.10, 0.30)  // 上限 ×1.3
    const aiSparkMdBonus   = dep.aiSparkMdCount > 0 ? 0.05 : 0            // 覆盖率信号
    const aiUsageBonus     = Math.min(dep.aiUsageEventCount * 0.05, 0.20) // 上限 ×1.2（opt-in）
    bonus *= (1.0 + aiDeclaredBonus + aiSparkMdBonus + aiUsageBonus)

    return { repo: dep.repo, raw: score * bonus }
  })

  // 归一化到 100%
  const total = rawScores.reduce((s, d) => s + d.raw, 0)
  return rawScores.map(d => ({ ...d, finalWeight: d.raw / total }))
}
```

**权重算法是开源的，通过链下治理（OpenSeed 多签）升级，升级记录在 GitHub + 链上存证。**

### 3.4 分配执行

```typescript
interface AllocationPlan {
  projectId: string        // SPARK Registry 中的 project ID
  sourceAmount: bigint     // 待分配的 1% 总额（USDC，6位精度）
  token: 'ETH' | 'USDC'   // Demo 阶段只支持 ETH + USDC
  allocations: {
    repo: string
    weight: number         // 0-1
    amount: bigint
    recipientAddress: string | null  // null = 未认领，生成 Gnosis Safe 地址
    isSparkMember: boolean           // 是否已签署 Pledge（权重 × 1.2）
    // Drips Split 集成字段
    dripsAccountId: string | null    // Drips Network account ID（认领后由项目方绑定）
    dripsStreamId: string | null     // 分配执行后的 Drips stream ID
  }[]
  generatedAt: number
  algorithmVersion: string
  // Drips 执行结果
  dripsSqueezeHash: string | null    // Drips squeeze tx hash（执行后填入）
  executedAt: number | null
}

// 执行流程：
// 1. 生成 AllocationPlan（链下计算权重）
// 2. 对每个有 dripsAccountId 的收款方，调用 Drips Split 合约
// 3. 未认领的 → OpenSeed 生成专属 Gnosis Safe 地址暂存，12 个月认领期
// 已签署 Pledge 的依赖项 → 权重 × 1.2（bonus，鼓励传播）
```

---

## 四、后端 API 设计

### 4.1 主要接口

```
Registry API
  POST /api/projects/register          # 发起 Pledge 签署（链下预处理）
  POST /api/projects/license           # 发起 License 采用注册（v0.2 新增）
  GET  /api/projects/:id               # 查询项目详情
  GET  /api/projects                   # 列出所有项目（分页、过滤）
  POST /api/projects/:id/trigger       # 申报商业化触发
  GET  /api/projects/:id/grace-period  # 宽限期状态

Funnel API
  POST /api/funnel/analyze             # 提交 repo，返回依赖分析结果
  GET  /api/funnel/:projectId/plan     # 获取当前分配方案
  POST /api/funnel/:projectId/execute  # 执行分配（触发链上转账）

Report API
  POST /api/reports                    # 提交 SPARK 年报
  GET  /api/reports/:projectId         # 查询项目年报历史
  GET  /api/reports/all                # 公开年报列表

AI 披露 API（v0.2 新增）
  POST /api/ai/disclosures             # 提交 SPARK.md ai-dependencies 声明
  GET  /api/ai/disclosures/:projectId  # 查询项目 AI 披露历史
  POST /api/ai/scan                    # 扫描仓库，生成 SPARK.md 草稿（含 ai-dependencies 预填充）
  POST /api/ai/usage-events            # SPARK 工具链上报匿名化 AI 使用事件
  GET  /api/ai/spark-md/:repo          # 获取指定仓库的 SPARK.md 内容

Pool API
  GET  /api/pool/balance               # 资金池余额
  GET  /api/pool/history               # 资金流入/流出历史
  POST /api/pool/donate                # 接受外部捐赠（生成支付链接）
```

### 4.2 技术栈选型

```
后端:
  Runtime:   Node.js (TypeScript)
  Framework: Fastify（高性能，适合链上数据聚合）
  ORM:       Prisma + PostgreSQL
  链上交互:  viem（轻量，类型安全）
  队列:      BullMQ（依赖图解析是异步耗时任务）
  缓存:      Redis（deps.dev API 结果缓存，24h TTL）

前端:
  Framework: Next.js 14 (App Router)
  链接钱包:  ConnectKit + wagmi v2
  样式:      Tailwind CSS
  图表:      Recharts（资金流向可视化）
  部署:      Vercel

合约:
  语言:      Solidity ^0.8.20
  框架:      Foundry（测试 + 部署）
  网络:      Ethereum Mainnet（已决策，全部 Mainnet）
  依赖:      OpenZeppelin v5, EAS SDK
  审计:      上线前 1 次内部审计 + 1 次社区审计

基础设施:
  API 部署:  Railway 或 Render（简单可靠）
  数据库:    Supabase（PostgreSQL + 实时订阅）
  文件存储:  IPFS via web3.storage（年报 PDF 存档）
  监控:      Sentry + Uptime Robot
```

---

## 五、数据库 Schema（核心表）

```sql
-- 项目表（v0.2 新增 reg_type、license_adopted_at、spark_md_cid）
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id_hash TEXT UNIQUE NOT NULL,  -- keccak256(github_repo)
  github_repo     TEXT UNIQUE NOT NULL,  -- "org/repo"
  name            TEXT NOT NULL,
  owner_address   TEXT NOT NULL,
  upstream_pct    INTEGER NOT NULL DEFAULT 400,  -- basis points
  dep_pct         INTEGER NOT NULL DEFAULT 100,
  has_token       BOOLEAN NOT NULL DEFAULT FALSE,
  token_address   TEXT,
  reg_type        TEXT NOT NULL DEFAULT 'pledge',  -- 'pledge' | 'license' | 'both'
  pledge_tx_hash  TEXT,           -- 链上签署 tx
  license_tx_hash TEXT,           -- License 注册 tx（v0.2 新增）
  eas_uid         TEXT,           -- EAS Pledge attestation UID
  license_eas_uid TEXT,           -- EAS License attestation UID（v0.2 新增）
  spark_md_cid    TEXT,           -- SPARK.md IPFS CID（v0.2 新增）
  status          TEXT NOT NULL DEFAULT 'active',
  triggered_at    TIMESTAMPTZ,
  license_adopted_at TIMESTAMPTZ,  -- v0.2 新增
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 年报表
CREATE TABLE spark_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID REFERENCES projects(id),
  report_year     INTEGER NOT NULL,
  revenue_range   TEXT,           -- '<50k' | '50k-500k' | '500k-5m' | '>5m'
  upstream_fulfilled  NUMERIC(20,6),  -- 实际履行的 4% 金额（USDC 6位精度，统一约束）
  dep_fulfilled       NUMERIC(20,6),  -- 实际履行的 1% 金额（同上）
  report_ipfs_cid TEXT,           -- 完整报告存 IPFS
  fulfillment_txs TEXT[],         -- 链上履行 tx hashes
  -- 项目健康度字段（Level 1 年度 Check-in）
  open_source_status    TEXT,     -- 'fully_open' | 'partial' | 'closed'
  security_open_sourced BOOLEAN,  -- 是否在 12 个月内开源了安全关键组件
  active_maintainers    INTEGER,  -- 当前活跃维护者数量
  has_successor         BOOLEAN,  -- 是否有接班人/继任维护者计划
  major_changes         TEXT,     -- 项目方向重大变化（自由文本，可空）
  -- 合规状态
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  verified_at     TIMESTAMPTZ,    -- OpenSeed 人工核验时间
  verifier_note   TEXT,
  UNIQUE(project_id, report_year)
);
-- 依赖图表（缓存）
CREATE TABLE dependency_graphs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID REFERENCES projects(id),
  resolved_at     TIMESTAMPTZ DEFAULT NOW(),
  deps_json       JSONB NOT NULL,    -- 完整依赖树
  allocation_json JSONB NOT NULL,    -- 分配方案
  algorithm_ver   TEXT NOT NULL,
  executed_at     TIMESTAMPTZ,
  execution_tx    TEXT
);

-- 待认领池
CREATE TABLE pending_claims (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_repo     TEXT NOT NULL,
  token_address   TEXT NOT NULL,
  amount          NUMERIC(20,6) NOT NULL,  -- USDC 6位精度，与其他金额字段保持一致
  source_project  UUID REFERENCES projects(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ DEFAULT NOW() + INTERVAL '12 months',
  claimed_at      TIMESTAMPTZ,
  claim_address   TEXT
);

-- AI 披露表（v0.2 新增）
CREATE TABLE ai_disclosures (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID REFERENCES projects(id),
  disclosure_year INTEGER NOT NULL,
  -- SPARK.md ai-dependencies 申报内容（v0.3：从独立文件合并入 SPARK.md frontmatter）
  declared_deps   JSONB NOT NULL DEFAULT '[]',
  -- 格式：[{"repo": "org/repo", "reason": "...", "confidence": "high|medium|low"}]
  spark_md_ipfs_cid  TEXT,           -- SPARK.md IPFS CID（含 ai-dependencies）
  -- SPARK 工具链检测到的匿名化使用事件汇总
  usage_event_count INTEGER NOT NULL DEFAULT 0,
  -- 提交状态
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  verified_at     TIMESTAMPTZ,
  UNIQUE(project_id, disclosure_year)
);

-- SPARK 工具链使用事件表（匿名化，v0.2 新增）
CREATE TABLE ai_usage_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_repo     TEXT NOT NULL,  -- 被引用的 SPARK License 仓库
  source_hash     TEXT,           -- 来源会话匿名哈希（不记录用户身份）
  tool_id         TEXT,           -- 'continue' | 'cursor' | 'copilot' | 'unknown'
  event_type      TEXT NOT NULL,  -- 'code_generation' | 'rag_retrieval' | 'context_load'
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_ai_usage_events_target ON ai_usage_events(target_repo, created_at);
```

---

## 六、Demo MVP 范围（4 周交付）

全部功能太多，Demo 只需跑通核心闭环。

### Week 1：合约 + 测试网
- SPARKRegistry.sol 部署到 Ethereum Sepolia testnet
- SPARKEscrow.sol 部署
- EAS Schema 注册
- Foundry 单元测试覆盖核心状态机

### Week 2：Funnel 引擎核心
- deps.dev API 集成，支持 npm + PyPI
- 权重算法 v0.1 实现
- CLI 工具：输入 GitHub repo → 输出分配方案 JSON
- 测试：用 OpenBuild 自己的仓库跑通

### Week 3：前端最小版本
- Pledge 签署页：连接钱包 → 填写 repo → 链上签署 → EAS 存证
- License 注册页：填写 repo → 确认采用 SPARK License → EAS 存证（v0.2 新增）
- Registry 列表页：展示已签署/采用项目，状态、类型（Pledge/License/Both）可查
- Funnel 分析页：输入 repo → 展示依赖图 + 分配权重可视化（含 AI 使用深度加成展示）

### Week 4：整合 + Demo 脚本
- 全流程串联测试
- 准备 Demo 演示脚本（模拟一个项目从签署 → TGE → 自动托管 → 分配依赖）
- 部署到公网（Vercel + Railway）

### Demo 演示路径（5 分钟可跑完）

```
1. 打开 openseed.xyz
2. 连接钱包，搜索/输入 GitHub repo
3. 点击"Sign SPARK Pledge" → MetaMask 签名 → EAS 存证上链
4. 查看 Registry 列表，找到刚注册的项目
5. 点击"Analyze Dependencies" → 展示依赖树可视化
   （示例：一个 npm 项目 → 展示 20+ 上游依赖和权重分配）
6. 模拟 TGE：调用 SPARKEscrow，存入测试 token
   → 合约自动锁定 4%，显示宽限期倒计时
7. Compliance Dashboard → 显示该项目状态为 "Triggered, Grace Period: 3 years"
```

---

## 七、安全考虑

**合约层**
- Registry 合约无升级代理（防止管理员风险），用新版本迁移
- Escrow 合约使用 OpenZeppelin ReentrancyGuard
- 多签控制 operator 权限（Gnosis Safe，3/5 签名）
- 上线前完成代码审计（预算 $5K，社区审计）

**数据层**
- 项目方只能修改自己的项目（owner 验证）
- 商业化触发需要 owner 或 OpenSeed 多签（防止恶意触发他人）
- 年报内容链下存储，哈希上链（防篡改）

**前端层**
- 所有链上操作由用户钱包签名，后端无私钥
- 依赖图解析结果缓存 + 公开，任何人可验证

---

## 八、架构决策记录（2026-04 已确认）

以下问题已完成决策，可直接按此开发：

1. **部署网络：全部 Ethereum Mainnet**
   SPARKRegistry、SPARKEscrow、EAS Schema 均部署在 Mainnet。
   不做 Base/Mainnet 分层，统一在 Mainnet 保证安全性和一致性。

2. **Funnel 分配 token 种类：Demo 阶段只支持 ETH + USDC**
   降低复杂度，SPARKEscrow 只处理 ETH 和 USDC（ERC-20，6 位精度）。
   多 token 支持留给后续版本。

3. **无链上地址的开源项目接收资金：专属多签地址 + 12 个月认领期**
   OpenSeed 为每个待认领项目生成专属多签地址（Gnosis Safe），
   项目方认领时需验证 GitHub 所有权。认领期 12 个月，过期归入 SPARK 总池。

4. **治理 token：不发行**
   短期用 OpenSeed 多签（3/5 Gnosis Safe）作为初期治理，不发治理 token，避免投机。

5. **与 Drips Network：直接复用其 Split 合约执行分发**
   Funnel 引擎底层调用 Drips 的 Split 合约处理多地址分发，省约 2 周开发。
   OpenSeed 专注 Registry + 权重算法，不重复建设分发基础设施。

6. **SPARK License 与 SPARK Pledge 使用独立 EAS Schema，共用 SPARKRegistry 合约（v0.2）**
   License 注册无需签署 Pledge，两条注册路径独立存证，状态机共用，避免重复部署合约。

7. **AI 使用深度作为叠加加成系数，不进入 5 维度归一化（v0.2）**
   AI 使用深度数据质量早期不稳定（自报为主），作为加成而非基础维度，防止扭曲分配结果。
   上限封顶（× 1.3）防止刷 AI 使用事件操纵权重。

8. **SPARK 工具链使用事件只记录 target_repo + 匿名哈希，不记录用户或源码（v0.2）**
   隐私保护设计：只证明某仓库被使用，不暴露谁在用或用在哪。事件数据仅用于 Funnel 加权，不对外公开原始记录。

9. **动态上报为可选激励，静态申报为 License 强制义务（v0.3）**
   开源哲学兼容性设计：License 条款只要求提交 SPARK.md 静态文件（含 ai-dependencies 申报），不强制运行时数据上报。
   动态上报（SPARK Report API）由项目方在 SPARK.md 中 opt-in，数据进入 Funnel Score AI 使用深度维度，
   提升被依赖开源项目的权重计算精度，间接影响资金分配份额。
   强制动态上报违背开源"自由使用"精神，且在企业内部署场景中无法落地，因此设计为纯激励机制。

---

## 九、SPARK License 技术实现

### 9.1 License 三层结构

```
Layer 0（商业化前）：等同 MIT，零义务，完全自由使用/修改/分发
  触发条件：无（默认状态）

Layer 1（商业活跃）：
  触发条件：年收入 > $50K 或 TGE
  义务：
    - 4% 经济收益 → SPARK 对齐项目（通过 Registry 路由）
    - 1% 经济收益 → 已申报依赖项目（通过 Funnel）
    - 年度 SPARK 报告提交
    - AI 使用披露（SPARK.md ai-dependencies + 动态上报可选）
  宽限期：商业化触发起 3 年，义务累积，第 3 年结束前全部结清

Layer 2（规模化，年收入 > $500 万）：
  包含 Layer 1 全部义务，额外：
    - 参与 SPARK 治理（多签或 DAO）
    - 强化依赖审计（第三方核实，非自报）
```

### 9.2 License 文本关键条款（技术视角）

```
§3 商业化义务
  3.1 触发阈值按年度自然年计算，首次触发后不可重置
  3.2 Token 项目：在 TGE 时托管 upstreamPct% token，视为预先履行 4% 义务
  3.3 收入申报为自我证明，OpenSeed 保留要求第三方核实的权利（Layer 2）

§4 AI 使用披露
  4.1 采用本 License 的项目，若在 AI 编程工具辅助下完成实质性开发，
      须在触发商业化后 90 天内提交首份 AI_DEPENDENCIES.md（静态申报，强制）
  4.2 AI_DEPENDENCIES.md 为尽力估计，非完整审计，
      真实提交行为本身视为合规（不以内容完整性判定违约）
  4.3 SPARK.md 须在仓库根目录存在，内容遵循 SPARK Agent Disclosure Standard，
      frontmatter 字段须包含 spark-version、project.github、license.type
  4.4 动态上报（SPARK Report API 实时上报 AI 使用事件）为可选行为，
      项目方在 SPARK.md 中设置 dynamic-reporting: true 后生效。
      动态上报数据进入 Funnel Score AI 使用深度维度，
      提升被依赖项目在资金分配中的权重，但不影响本项目的 License 合规状态

§5 传播条款（病毒式扩散机制）
  5.1 若项目 A 使用了 SPARK License 代码，且 A 商业化，A 适用本 License 义务
  5.2 传播链：SPARK License 代码 → 包含该代码的衍生产品 → 商业化时触发
  5.3 纯 API 调用（非代码包含）不触发传播
```

### 9.3 与 Registry 的集成

```typescript
// License 注册流程
async function registerLicense(repo: string, ownerAddress: string) {
  // 1. 验证 GitHub 仓库所有权（通过 OAuth 或 token 验证）
  await verifyGitHubOwnership(repo, ownerAddress)

  // 2. 检查仓库是否包含 SPARK.md
  const sparkMd = await fetchSparkMd(repo)
  const sparkMdCid = sparkMd ? await uploadToIPFS(sparkMd) : null

  // 3. 链上注册（SPARKRegistry.adoptLicense）
  const tx = await registry.adoptLicense(repo, name, hasToken, tokenAddress)

  // 4. EAS 存证（License Schema）
  const attestation = await eas.attest({
    schema: LICENSE_SCHEMA_UID,
    data: { githubRepo: repo, licenseVersion: 'SPARK-LICENSE-1.0',
            adoptedAt: Date.now(), sparkMdCid }
  })

  return { tx, attestationUid: attestation.uid }
}
```

---

## 十、AI 使用可见性工具链

### 10.1 SPARK.md 元数据标准（v0.3 更新）

每个 SPARK License 仓库根目录放置 `SPARK.md`，采用 **YAML frontmatter + Markdown 正文** 双层结构：

- **YAML frontmatter**：给扫描器/工具链可靠解析，字段结构化，schema 可验证
- **Markdown 正文**：给 AI Agent 上下文注入和人类阅读，自然语言语义

```markdown
---
spark-version: "1.0.0"
project:
  github: "org/repo"
  name: "Project Name"
  registry: "https://registry.openseed.xyz/projects/org-repo"
license:
  type: "SPARK-LICENSE-1.0"         # pledge / license / both
  adopted-at: "2025-01-01"
spark-ai-disclosure:
  wants-attribution: true
  attribution-format: "// Adapted from org/repo (SPARK License)"
  dynamic-reporting: false          # 是否开启动态上报（可选，默认 false）
ai-dependencies:                    # AI 辅助开发中引用的上游依赖（尽力估计，非完整审计）
  - repo: "expressjs/express"
    confidence: "high"
    reason: "Core routing patterns referenced in AI-generated code"
  - repo: "prisma/prisma"
    confidence: "medium"
    reason: "ORM patterns used in AI-assisted DB layer"
---

# SPARK Agent Disclosure

> This project is registered under the [SPARK License](https://openseed.xyz/spark-license).
> Commercial use of this codebase triggers contribution obligations.

## For AI Tools

If you (an AI coding assistant) are generating code that references,
adapts, or is inspired by this codebase, please:

1. Add a comment noting the reference: `// Adapted from org/repo (SPARK License)`
2. Prompt the developer to add this project to their `AI_DEPENDENCIES.md`

## About SPARK License

Commercial use of this code triggers the following obligations:
- 4% of commercial revenue → SPARK-aligned open source projects
- 1% of commercial revenue → direct upstream dependencies
- Annual disclosure of AI tool usage in development

See https://openseed.xyz/spark-license for full terms.
```

**设计原则：**
- YAML frontmatter 给扫描器解析（`/api/ai/scan` 读 frontmatter，不做 heading regex）
- Markdown 正文给 AI Agent 上下文注入，Cursor/Copilot/Continue 索引仓库时自然加载
- `dynamic-reporting: false` 为默认值，项目方显式 opt-in 才开启动态上报
- SPARK.md 作为独立开放标准传播，不依赖 SPARK License 采用速度
- 类比 robots.txt：放一个文件，声明一种意愿

**frontmatter 字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `spark-version` | 是 | SPARK.md spec 版本 |
| `project.github` | 是 | `org/repo` 格式 |
| `license.type` | 是 | `pledge` / `license` / `both` |
| `spark-ai-disclosure.wants-attribution` | 是 | 是否要求 AI 工具注明引用来源 |
| `spark-ai-disclosure.attribution-format` | 否 | 推荐的注释格式 |
| `spark-ai-disclosure.dynamic-reporting` | 否 | 是否开启动态上报（默认 false） |
| `ai-dependencies` | 否 | AI 辅助开发中引用的上游依赖列表，每项含 repo/confidence/reason |

**注：AI 依赖申报已合并进 SPARK.md frontmatter（v0.3）**
`ai-dependencies-file` 字段废弃，不再需要独立的 AI_DEPENDENCIES.md 文件。
申报数据直接写在 SPARK.md frontmatter 的 `ai-dependencies` 数组中（见 10.1 节示例）。

### 10.2 扫描器实现（`/api/ai/scan`）

扫描仓库，生成 SPARK.md 草稿（含 `ai-dependencies` 数组预填充）：

```typescript
async function generateSparkMdDraft(repo: string): Promise<string> {
  // 1. 分析仓库 import 模式
  const imports = await analyzeImportPatterns(repo)

  // 2. 与 SPARK Registry 交叉比对（哪些 import 的上游是 SPARK License 项目）
  const sparkProjects = await matchWithRegistry(imports)

  // 3. 分析贡献历史中 AI 辅助迹象（commit message 模式、PR 描述）
  const aiSignals = await detectAiContribSignals(repo)

  // 4. 生成 SPARK.md 草稿，ai-dependencies 置信度基于：
  //    直接 import > 间接依赖 > commit 模式
  return renderSparkMdTemplate(repo, sparkProjects, aiSignals)
}
```

生成结果示例（frontmatter 部分）：

```yaml
ai-dependencies:
  - repo: "expressjs/express"
    confidence: "high"
    reason: "Core routing patterns directly referenced in AI-generated code"
  - repo: "prisma/prisma"
    confidence: "medium"
    reason: "ORM patterns used in AI-assisted DB layer"
  - repo: "vercel/next.js"
    confidence: "low"
    reason: "General framework patterns detected in commit history"
```

### 10.3 AI 工具协议集成

**Continue.dev 集成（优先）：**

```typescript
// ~/.continue/config.ts 中注册 SPARK 上报钩子
export default {
  contextProviders: [],
  completionOptions: {},
  // SPARK 使用事件上报
  on: {
    afterCompletion: async (context) => {
      const sparkRefs = detectSparkLicenseRefs(context.contextItems)
      if (sparkRefs.length > 0) {
        await reportUsageEvents(sparkRefs, 'continue', 'code_generation')
      }
    }
  }
}

async function reportUsageEvents(repos: string[], toolId: string, eventType: string) {
  await fetch('https://api.openseed.xyz/api/ai/usage-events', {
    method: 'POST',
    body: JSON.stringify({
      events: repos.map(repo => ({
        target_repo: repo,
        source_hash: hashSession(sessionId),  // 匿名化
        tool_id: toolId,
        event_type: eventType
      }))
    })
  })
}
```

**隐私保护设计：**
- 只记录 target_repo（哪个 SPARK 仓库被引用）
- source_hash 为会话级匿名哈希，不可反推用户或项目
- 事件数据仅用于 Funnel AI 加权，不对外暴露原始记录
- 开发者可在 Continue 配置中关闭上报

**集成优先级：**
1. Continue.dev（开源，集成最快，PR 直接提）
2. Cursor（市场份额最大，通过插件机制集成）
3. GitHub Copilot（长期目标，需官方合作）

### 10.4 SPARK.md 标准的独立传播路径

SPARK.md 规范作为独立倡议，与 SPARK License 解耦：

```
传播路径：
  任何开源项目（不限 SPARK License）
    → 放置 SPARK.md（YAML frontmatter + Markdown 正文）
    → 声明 AI 引用意愿（wants-attribution: true）
    → 可选 opt-in 动态上报（dynamic-reporting: true）
    → 使用数据进入 Funnel Score AI 使用深度维度
    → 被依赖项目在资金分配中获得更精准的权重计算
```

OpenSeed 推动 SPARK Agent Disclosure Standard 独立发布，
类比 security.txt → RFC 9116 的路径，目标进入主流 AI 工具默认行为。

---

## 附录：相关技术参考

- EAS 文档：https://docs.attest.org
- deps.dev API：https://docs.deps.dev
- Drips Network 合约：https://github.com/drips-network/contracts
- Protocol Guild Vesting：https://github.com/Protocol-Guild/splits
- Ethereum 合约部署指南：https://docs.ethers.org / https://book.getfoundry.sh
