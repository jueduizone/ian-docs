---
description: ""
---
# OpenSeed: Infrastructure for the SPARK Pledge

**Co-founders:** Richard Lin, Ian Xu, Cynthia Xin  
**Deployment:** Ethereum Mainnet

---

## 1. The Problem

### 1.1 Who funds the infrastructure everyone depends on

Every layer of the Ethereum ecosystem runs on open source software — wallets, clients, dev tooling, libraries. Without them, none of this exists. Yet the people who build and maintain that software have been largely running on fumes.

Most grants are one-shot: scoped, time-limited, then done. Projects that started open source and grew into successful companies rarely send anything back upstream. Critical infrastructure maintainers work for well below market rate, or for free. The mechanism to make that sustainable simply doesn't exist.

Existing approaches each cover part of the picture. Gitcoin Grants relies on community donations. Optimism RetroPGF funds retroactively within its own ecosystem. Protocol Guild only covers Ethereum core contributors. The recursive dependency layer, non-token projects, and developer communities outside English-speaking Web3 — these remain uncovered.

### 1.2 What SPARK proposes

SPARK (Scaling Public Alignment with Recursive Kindling) is built around a commitment: projects that join pledge 4% of future economic value to other SPARK-aligned projects. Those projects make the same pledge, and so on. Separately, each project pledges 1% specifically to its direct upstream dependencies — the projects it actually builds on.

To avoid burdening early-stage teams, there's a 3-year grace period. Obligations are tiered by revenue and don't kick in immediately.

The spec is written. The working group has finished internal discussion. What's missing is everything needed to make it actually run: no registration, no on-chain attestation, no dependency graph tooling, no compliance tracking, no first cohort of projects.

### 1.3 The gap

| Layer | Status |
|-------|--------|
| SPARK Pledge spec | ✅ Draft complete |
| On-chain registry contract | ❌ Doesn't exist |
| Dependency funding funnel | ❌ Doesn't exist |
| Compliance tracking | ❌ Doesn't exist |
| Verified seed projects | ❌ Doesn't exist |
| Chinese-speaking community onramp | ❌ Doesn't exist |

OpenSeed builds this.

### 1.4 Why AI makes this more urgent

In July 2025, METR published a randomized controlled study finding that experienced developers working on complex, mature codebases took 19% *longer* to complete tasks when using AI tools. AI-generated code still needs to be understood, verified, and corrected — that cost is higher than the generation itself.

At the same time, low-quality AI-generated PRs started flooding open source repos. By early 2026, projects like curl, ghostty, and tldraw had all restricted or closed external contributions. AI made it cheaper to submit code. It made reviewing code much more expensive.

Generating code has gotten easier. What hasn't changed: sustained maintenance over years, the judgment to know where a system should go, the trust a community builds slowly. That's what SPARK is designed to protect.

Traditional metrics — lines of code, commit frequency, PR volume — are losing signal fast. OpenSeed's dependency funnel ignores them and focuses on what AI can't fake: how long a project has been active, how many real downstream dependents it has, how long its core maintainers have stuck around.

---

## 2. What We're Building

### 2.1 SPARK Pledge Registry

A smart contract on Ethereum Mainnet. Every project's Pledge adoption is recorded on-chain via EAS (Ethereum Attestation Service). The contract stores each project's Pledge parameters, tracks commercialization trigger events, manages grace period timers, and exposes a permissionless public query interface.

For token projects, the contract integrates directly with the TGE contract: 4% of supply is automatically escrowed at token launch, no manual steps required after signing. For non-token projects, the Pledge is recorded on-chain and obligations are fulfilled through annual self-reporting and treasury transfers.

### 2.2 Dependency Funding Funnel

The 1% dependency allocation has two subproblems: which upstream projects does this project depend on, and how much should each of them receive.

**Dependency graph**

The funnel connects to Google's deps.dev API, covering npm, PyPI, Maven, Go, and Cargo. It recursively expands transitive dependencies and maps GitHub repository identities to on-chain addresses via EAS.

**Allocation algorithm**

Legacy metrics like lines of code have lost their signal in the AI era. The funnel uses five dimensions instead — each one difficult to fake in the short term:

- Longevity (25%): years of continuous active development. AI can clone a library overnight; it can't fake five years of commit history.
- Real dependency depth (30%): downstream projects that actually list this package as a dependency — not stars, real usage data from deps.dev.
- Maintainer continuity (25%): how long core contributors have stayed actively involved. Measures long-term human commitment.
- Issue responsiveness (10%): average close time and close rate over 12 months. A proxy for maintainer judgment and accountability.
- Depth decay (10%): direct dependencies weighted more than transitive ones. Closer upstream = more influence.

All dimensions are normalized to 0–1 before weighting. The algorithm is fully open source, governed by OpenSeed multisig, with every change recorded on-chain. Projects registered in the SPARK Registry receive a 1.2x weight bonus, giving economic incentive for Pledge to propagate through dependency chains.

**Distribution**

Projects with an on-chain identity receive direct transfers. For those without one, funds sit in a multisig waiting to be claimed. Unclaimed after 12 months, they return to the SPARK pool.

### 2.3 Compliance Dashboard

A public web page. Compliance status, grace period countdowns, SPARK report history, fund flows, funnel allocation results — all live, all public.

Anyone — community members, downstream projects, partner organizations — can verify compliance directly. No need to trust anything OpenSeed says.

### 2.4 SPARK Treasury

A multisig treasury that accepts community donations and, over time, the 4% recursive contributions from commercialized projects. Funds are allocated to new SPARK projects through a review process. OpenSeed manages it initially; governance transitions on-chain in Phase 2.

### 2.5 Cohort 1: Chinese-speaking Developer Pilot

Through OpenBuild's developer network, we're recruiting 10–20 open source projects from Chinese-speaking communities as the first cohort. Scope is broad — not just Ethereum-native projects. Web3 tooling, developer infrastructure, AI tooling, general open source software all qualify.

Selected projects receive onboarding support, technical integration assistance, visibility in the SPARK Registry, and eligibility to apply for treasury funding.

**Selection criteria**

Three questions, all need a yes:

1. Does the project have identifiable long-term maintainers with years of continuous contribution?
2. Is the project's core value built on judgment and ecosystem position — or is it feature code that AI could replicate in a few months?
3. Has the maintenance burden increased or held steady since AI tools became widespread? That's direct evidence of real human investment.

Projects that belong in Cohort 1 are ones whose value holds or grows as AI becomes ubiquitous.

### 2.6 SPARK License: Obligations That Travel with Code

The Pledge path requires a project to find the onramp, understand the mechanism, and sign. That works for projects already aligned with the mission. For most others, the friction is just high enough that they never get around to it — not because they disagree, but because they never take that step.

SPARK License is a second path, designed for passive spread rather than active opt-in.

Traditional open source licenses govern how code can be used: GPL covers derivatives, BSL limits commercial use, Open Source Pledge is a moral call to action. None of them attach economic obligations to a project's commercial lifecycle. SPARK License embeds the obligation structure directly into the license text: any downstream project that includes SPARK-licensed code automatically inherits the 4% recursive obligation and 1% dependency obligation upon commercialization. Use the code, carry the commitment — no additional action required.

Before commercialization, SPARK License is equivalent to MIT: zero obligations, completely free to use, modify, and distribute. Trigger conditions and obligation tiers are identical to the Pledge path.

SPARK License also explicitly covers what GPL was never designed to handle: AI-mediated use. Using a SPARK-licensed project as training data, as a reference for AI coding tools, or as an architectural pattern base for AI-generated code — all of these constitute use cases that trigger reporting obligations. It's the first license to treat AI-mediated dependencies as a first-class category.

**Pledge and License are independent paths, not bundled.** A project that signs the Pledge doesn't need to relicense. A project that ships SPARK-licensed code doesn't need to separately sign the Pledge. Mature projects have stable license terms that their downstream depends on — forcing a relicense turns a values decision into a legal and coordination burden. The two paths are designed to complement and stack. Projects that adopt both get a 1.3x funnel weight bonus. That's an economic incentive, not a requirement.

**OSI certification path**

The long-term goal is to get SPARK License into the standard open source license ecosystem — OSI certification and an SPDX identifier. The legal argument is clear: SPARK License meets all ten criteria of the Open Source Definition. It doesn't restrict use cases or discriminate against any person or group. Economic obligations only trigger post-commercialization, through a tiered, transparent structure that's closer in spirit to copyleft than to commercial restriction.

### 2.7 SPARK.md: Making AI-Mediated Dependencies Visible

The 1% dependency allocation assumes one thing: we can see who the dependencies are. That used to hold — add a package, it appears in the manifest, the dependency graph is traceable.

AI coding tools broke that assumption. When a developer uses Cursor or Copilot to generate code, the output may draw heavily on an open source project's algorithms, design patterns, or architectural decisions — but it won't produce an import statement, and it won't appear in any manifest. The dependency exists in a meaningful sense, but it's invisible to every existing tool.

This isn't an edge case. It's the default state of AI-assisted development in 2025. Projects whose patterns are repeatedly reused by AI might receive the least from the funnel, because their influence is invisible.

SPARK.md makes that influence visible. Each registered repository puts a `SPARK.md` file in its root. YAML frontmatter is machine-readable by scanners and tooling. The Markdown body is natural language context for humans and AI coding assistants — when tools like Cursor, Copilot, or Continue index a repository, they load this content, and developers generating code already know what the project is, what its registry status means, and how to report AI dependencies.

AI dependency disclosure is best-effort, not a full audit. A developer glances at the generated code, makes a judgment about which upstream projects likely influenced it, and records them. Submitting counts as compliance. The goal isn't precision — it's building a habit: treating AI dependencies the same way we treat package dependencies.

SPARK.md is designed to spread as an independent open standard, the same way `security.txt` (RFC 9116) did. Drop a file, declare intent, provide context. The more broadly it's adopted, the more accurate the funnel's signal becomes.

### 2.8 Obligation Structure

| Annual Revenue | SPARK Obligation |
|----------------|-----------------|
| Under $50,000 | Not triggered |
| $50K–$500K | 2% (early-stage rate) |
| $500K–$5M | 4% (standard rate) |
| Over $5M | 4% + governance participation |

Token projects: 4% of supply escrowed at TGE, independent of revenue stage. Tokens represent future value, not current income.

Grace period: 3 years from commercialization trigger. Obligations accrue from day one and must be settled in full before year three ends.

---

## 3. How It Fits with Existing Mechanisms

| Mechanism | Funding Source | Commitment | Recursive | Global |
|-----------|---------------|------------|-----------|--------|
| Gitcoin QF | Community donations | None upfront | No | Partial |
| Optimism RetroPGF | OP token issuance | None upfront | No | No |
| Protocol Guild | Project donations | None upfront | No | No |
| Drips Network | Any donor | Manual config | Partial | Yes |
| Open Source Pledge | Corporate budgets | Moral call | No | Yes |
| **SPARK / OpenSeed** | **Revenue commitment** | **Upfront + on-chain** | **Yes** | **Yes** |

Each of these solves part of the problem. None of them combines upfront commitment, recursive propagation, on-chain verifiability, and openness to any open source project globally. OpenSeed fills that gap. It's not competition.

---

## 4. What We're Not Building

Scope matters.

- **No new chain or L2.** We deploy on Ethereum Mainnet.
- **No revenue auditing.** The mechanism runs on self-reporting and community accountability. For non-token projects, social and reputational pressure is the enforcement layer — not surveillance.
- **No replacement for Gitcoin, RetroPGF, or Protocol Guild.** We're adding what none of them provide: upfront commitment, recursive propagation, global reach. Complementary by design.
- **Not limited to Web3 projects.** Any open source project with real usage and real maintainers can join.
- **No claim to solving all of open source funding.** SPARK is one mechanism. We're not the final answer.

---

## 5. Open Source Commitment

Everything OpenSeed builds ships under MIT. Contracts are publicly verified on GitHub and Etherscan. The funnel algorithm is fully auditable. The toolchain can be forked by any ecosystem that wants to run its own SPARK implementation.

This isn't a bonus. It's a baseline. Infrastructure built for open source has to be open source.

---

## 6. Roadmap

**Phase 1 — Foundation (May–Jun 2026)**
Contract architecture finalized, Registry v0.1 deployed to testnet, Pledge onboarding site live, Cohort 1 recruitment open. SPARK License legal text drafted, SPARK.md spec v0.1 published.

**Phase 2 — Core Launch (Jul–Aug 2026)**
Registry contract on Mainnet. Dependency funnel v0.1 live (npm and PyPI first). Compliance Dashboard v0.1 live. Cohort 1 reaches 10+ projects with Pledge signed and SPARK.md deployed. SPARK License v0.9 distributed to Cohort 1.

**Phase 3 — Pilot Validation (Sep–Nov 2026)**
Cohort 1 completes first SPARK reports. Funnel processes first round of allocations including AI dependency signals. Global registration opens.

**Phase 4 — Scale**
100+ projects globally. Integration with Gitcoin and RetroPGF as a compliance complement layer. Treasury governance transitions to on-chain DAO. Toolchain open for any ecosystem to fork and run its own SPARK implementation.

---

## 7. Team

**Richard Lin** — Co-founder, OpenSeed. Co-founder of Kaiyuanshe, China's largest vendor-neutral open source community and the first Chinese organization to join OSI. Currently Head of Open Source Ecosystem at Datastrato.ai. Previously developer ecosystem lead at Huawei Cloud and 01.AI. Long-term contributor to Apache, Linux Foundation, and OSI governance.

**Ian Xu** — Co-founder, OpenSeed. Board member of Kaiyuanshe. Founder of OpenBuild community. Core contributor to RustCC and PyChina. Joined the SPARK working group Signal channel in April 2025.

**Cynthia Xin** — Co-founder, OpenSeed. Organizer of PyChina community.

**SPARK Working Group:** Vitalik Buterin (mechanism co-designer), Liraz Siri, Mario Behling, Richard Lin, QZ, and other early participants in the Signal group.
