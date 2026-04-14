# OpenSeed: Building the Infrastructure That Lets SPARK Actually Work
## Ethereum Foundation Grant Application

**Applicant:** OpenSeed  
**Co-founders:** Richard Lin, Ian Xu  
**Requested Amount:** $100,000 USD  
**Grant Type:** Ecosystem Development  
**Timeline:** May 2025 – November 2025 (6 months)  
**Deployment Target:** Ethereum Mainnet

---

## 1. The Short Version

There is a framework sitting in a private Signal group right now, designed by Vitalik Buterin and a working group that OpenSeed is part of, thoughtfully built, ready to change how open-source software gets funded. It is called the SPARK Pledge. And it is completely inert, because no one has built the infrastructure to run it.

OpenSeed is asking for $100,000 to change that.

We will build an on-chain Pledge Registry, a Dependency Funding Funnel that routes money to the projects that built the foundation others stand on, a public Compliance Dashboard, and a verified first cohort of real open-source projects drawn from the Chinese-speaking developer community, a part of the world that has been building on Ethereum for years and receiving far less than its fair share of attention from existing funding mechanisms.

This grant is not about studying the problem. It is about building the thing.

---

## 2. What We're Actually Trying to Fix

### 2.1 The Commons Problem

Every wallet, client, library, and developer tool in the Ethereum ecosystem runs on open-source software. Most of that software is maintained by people who are either volunteers, underpaid, or waiting on grants that may or may not renew next year.

The projects that commercially succeed, the ones that built on these foundations and turned them into businesses, rarely send anything back. Not because they are bad actors, but because there was never a mechanism that expected them to. The commons built them up, and then the relationship ended there.

This problem is not evenly distributed. The open-source infrastructure running inside Chinese-speaking developer communities, tooling that serves tens of millions of developers across China, Taiwan, Hong Kong, and the diaspora, sits even further from the existing funding mechanisms, nearly all of which are English-first and Western-community-centered. Years of real contribution, largely invisible to the grants that could sustain it.

Gitcoin Grants, Optimism RetroPGF, and Protocol Guild each do something real. None of them solve the recursive dependency layer, none of them have strong reach into non-English-speaking communities, and none of them make a forward commitment, a promise at the beginning of a project's life to share the upside when it comes.

### 2.2 What SPARK Actually Says

SPARK, Scaling Public Alignment with Recursive Kindling, starts from a simple premise: if you built your success on the open commons, you owe the commons something back.

The mechanism: when a project adopts the SPARK Pledge, it commits to directing 4% of its future economic upside toward other SPARK-aligned projects. The recipients of that funding make the same commitment. The 4% flows forward, not once, but recursively. Separately, each project commits 1% specifically to the open-source projects it directly depends on, money flowing back to the actual code that made their product possible.

Early-stage projects are not asked to bleed. There is a three-year grace period from commercialization, and obligations are tiered by revenue rather than triggered the moment a dollar comes in.

The framework is designed. The specification has been reviewed within the working group. What does not exist at all is the infrastructure to make any of this real.

No on-chain registry. No dependency graph resolver. No compliance tracking. No projects formally inside the system. A beautifully designed machine with no moving parts yet.

### 2.3 The Gap Is Not Conceptual

| Layer | Status |
|-------|--------|
| SPARK Pledge specification | ✅ Draft exists |
| On-chain Pledge Registry | ❌ Does not exist |
| Dependency Funding Funnel tooling | ❌ Does not exist |
| Compliance tracking and reporting | ❌ Does not exist |
| Verified pilot projects | ❌ Does not exist |
| Chinese-speaking community bridge | ❌ Does not exist |

Every missing row is something OpenSeed is building.

### 2.4 Why AI Makes This More Urgent, Not Less

There is a trend worth naming directly. AI coding tools were supposed to make open source more productive. In some contexts, they have. But a July 2025 randomized controlled study by METR found that for experienced developers working on complex, established codebases, AI tools increased task completion time by 19%. The cost of understanding, verifying, and correcting AI output turned out to exceed the gains from generating it faster.

At the same time, AI tools have flooded repositories with low-quality pull requests. By early 2026, projects like curl, ghostty, and tldraw had restricted or closed external contributions entirely. Maintainers were spending more time filtering noise than building things.

What this shift reveals is something that was always true but is becoming undeniable: the hard part of open source was never writing the code. It was the years of maintenance commitment, the architectural judgment built up over time, the community trust that makes people actually adopt something. These are the things AI cannot replicate. These are exactly the things SPARK is designed to sustain.

The old metrics, lines of code, commit frequency, PR volume, are becoming meaningless in a world where AI can generate all of them. OpenSeed's Dependency Funnel was built from the start around signals that cannot be faked: how long a project has existed, how many real downstream dependents it has, how continuously a small group of humans has shown up for it.

But AI changes something else too, something that cuts deeper into how SPARK's funding mechanism works — not just what value looks like, but whether the mechanism can see it at all. We will return to this in Section 5, after describing what Phase 1 builds.

---

## 3. What We're Building

### 3.1 SPARK Pledge Registry

A smart contract on Ethereum Mainnet that records a Pledge adoption as an on-chain attestation via EAS (Ethereum Attestation Service). The Registry tracks commercialization triggers, manages grace period timers, and exposes a public, permissionless read interface so anyone can verify, not just trust.

For projects launching tokens: the Registry integrates directly with TGE contracts to automatically escrow 4% of supply at issuance. The Pledge is honored without any further manual action required.

For non-token projects: adoption is recorded on-chain, with obligations fulfilled through annual self-reporting and direct transfers to the SPARK funding pool.

### 3.2 Dependency Funding Funnel

The 1% dependency allocation is only meaningful if you can actually trace what a project depends on and decide how to weight it.

**Dependency Graph Resolution**

The Funnel integrates with Google's deps.dev API across npm, PyPI, Maven, Go, and Cargo. It resolves transitive dependencies recursively, not just the packages listed in a manifest but the packages those packages depend on, and maps GitHub repositories to on-chain identities via EAS.

**Allocation Algorithm**

The Funnel weights upstream projects on five dimensions, each chosen specifically because AI cannot fabricate them:

- Longevity (25%): Years of continuous active maintenance. AI can clone a library overnight. It cannot fake five years of commit history.
- Real Usage Depth (30%): Downstream dependents that actually use the package, drawn from deps.dev. Not stars. Not forks. Real usage.
- Maintainer Continuity (25%): How long the core contributors have stayed. Human long-term commitment is the signal.
- Issue Responsiveness (10%): Close rate and average close time over 12 months. A proxy for whether the maintainers are actually present and making judgments.
- Dependency Depth Decay (10%): Direct dependencies receive higher weight than transitive ones.

All dimensions normalize to 0-1 before weighting. The algorithm is fully open-source, upgradeable only through OpenSeed multi-sig governance, with every change recorded on-chain. Projects that have joined the SPARK Registry receive a 1.2x bonus weight, an incentive for the Pledge to propagate through the dependency graph rather than stop with any single project.

**Distribution Execution**

Projects with on-chain identity receive funds directly. Projects without are held in escrow, available to claim, or returned to the SPARK pool after 12 months unclaimed.

### 3.3 Compliance Dashboard

A public interface where anyone can look up any registered project and see exactly where they stand: current Pledge status, commercialization trigger history, grace period countdown, annual SPARK Report submissions, and dependency funnel allocation records.

The goal is that no one has to take OpenSeed's word for anything. The data is on-chain. The dashboard surfaces it. Trust is not required.

### 3.4 SPARK Funding Pool

A multi-sig treasury that receives this EF grant as seed funding, then grows through 4% recursive contributions as Cohort 1 projects commercialize, and allocates to new SPARK Pledge projects through a review process. OpenSeed manages it in Phase 1. Governance moves on-chain in Phase 2.

### 3.5 Cohort 1: Chinese-Speaking Community Pilot

Using OpenBuild's developer network, we are recruiting 10 to 20 open-source projects from the Chinese-speaking developer community for the first SPARK cohort. The scope is intentionally broad: Web3 tooling, developer infrastructure, AI tooling, and general open-source software. Projects do not need to be Ethereum-native to qualify.

Each project in Cohort 1 receives hands-on Pledge onboarding support, technical integration help, visibility within the SPARK Registry, and eligibility to apply for SPARK pool funding.

**How we select projects**

Three questions. All three need a yes.

1. Does the project have identifiable long-term maintainers, people with multi-year contribution histories, not one-time contributors?
2. Is the project's core value built on judgment and ecosystem position, or is it purely functional code that AI could replicate in a few months?
3. Has the maintenance burden held steady or increased since AI tools became widespread, evidence that real human work is still happening?

We are looking for projects whose value goes up in an AI-saturated environment, not down.

### 3.6 Obligation Structure

| Annual Revenue | SPARK Obligation |
|----------------|-----------------|
| Below $50,000 | Not triggered |
| $50K to $500K | 2% (reduced early-stage rate) |
| $500K to $5M | 4% (standard rate) |
| Above $5M | 4% plus governance participation |

Token projects: 4% escrowed at TGE regardless of revenue. Tokens represent future upside, not current revenue.

Grace period: 3 years from commercialization trigger. Obligations accrue from Day 1 and must be settled in full by end of Year 3. The mechanism is designed so that a project that genuinely never makes money never owes anything, and a project that does well cannot quietly avoid contributing.

---

## 4. Why OpenSeed Is the Right Team to Do This

### 4.1 We Have Real Community

OpenSeed was founded by the teams behind OpenBuild, KAIYUANSHE (China's largest vendor-neutral open-source community and the first Chinese member of the Open Source Initiative), PyChina, and RustCC. Collectively, these organizations represent hundreds of thousands of developers across China, Taiwan, Hong Kong, and the Chinese-speaking diaspora.

OpenBuild has brought thousands of developers into the Ethereum ecosystem through education, hackathons, and project incubation. The network already exists. The trust is already there. SPARK adoption in Phase 1 does not require cold outreach. It requires a conversation with people we have been building with for years.

### 4.2 We Were in the Room

The OpenSeed team joined the Signal group initiated by Vitalik Buterin in April 2025 and participated directly in the mechanism design discussions that produced the current SPARK Pledge specification. We are not interpreting a document from the outside. We helped shape it.

### 4.3 We Are Builders, Not Owners

The specification is open. Anyone can implement it. We are building the reference implementation, and we intend to make it good enough that it sets a useful precedent.

What we are not doing is claiming ownership of SPARK. We are the first implementation, a feedback channel back to the working group where pilot data informs mechanism refinement, and stewards of the initial pool until governance moves on-chain. The infrastructure is permissionless by design. If OpenSeed disappears tomorrow, the contracts keep running.

### 4.4 What Makes This Different from Existing Mechanisms

Gitcoin QF, Optimism RetroPGF, Protocol Guild, and Drips Network each do real work. The gap none of them fill is forward commitment: a promise made at the beginning of a project's life, embedded in its structure, that grows with the project and propagates recursively through the dependency graph. Every existing mechanism is either retroactive, ecosystem-scoped, or voluntary in a way that only reaches projects that already know to look for it. SPARK is the only mechanism that starts with the project before it succeeds and follows it as it does. The detailed comparison is in the Appendix.

---

## 5. Two More Pieces: SPARK License and SPARK.md

The Pledge Registry and Dependency Funnel are the core of Phase 1. But building this infrastructure made two structural gaps visible — gaps the Pledge alone was never designed to close.

The Pledge requires a project to actively find the mechanism, understand it, and sign. Every voluntary opt-in mechanism has this ceiling. It works for projects that are ideologically aligned and paying attention. Most projects that build on open-source infrastructure and later commercialize never sign anything, not because they object, but because the friction is enough to prevent it.

The second gap is different in kind. The Dependency Funnel routes the 1% obligation by tracing what a project depends on. That tracing assumes dependencies are visible — that when a project uses something, that usage shows up in a manifest or import statement. AI coding tools have broken this assumption. When a developer uses Cursor or Copilot to generate code, the output may be deeply informed by open-source projects — their algorithms, design patterns, architectural decisions — without any explicit import, fork, or attribution. The dependency exists. It just does not appear in any manifest. As AI tools become the primary interface between developers and the open-source ecosystem, the Funnel's dependency graph becomes systematically incomplete.

SPARK License addresses the first gap. SPARK.md addresses the second. Both are Phase 2 deliverables, built on the Registry infrastructure this grant funds.

### 5.1 SPARK License: Embedding Obligations Into the Code Itself

Traditional open-source licenses govern one thing: the right to use code. GPL governs code derivatives. BSL restricts commercial use. The Open Source Pledge asks nicely. None of them attach an economic obligation to a project's commercial lifecycle — to what happens after the code gets used to build something successful.

SPARK License embeds the obligation structure into the license text itself. Any downstream project that incorporates SPARK-licensed code and later commercializes inherits the same obligations: 4% of economic upside to SPARK-aligned projects, 1% to declared dependencies. The commitment travels with the code. A project that has never heard of OpenSeed but ships SPARK-licensed code in its stack becomes part of the network at the moment it commercializes — without any further voluntary action required.

Before commercialization, SPARK License is identical to MIT. Zero obligations. Complete freedom to use, modify, and distribute. The mechanism only activates when a project succeeds.

SPARK License also explicitly covers something GPL was never designed to address: AI-era usage. Using a SPARK-licensed project as a training source, a retrieval reference for an AI coding tool, or a foundational pattern in AI-generated code constitutes a use case that triggers disclosure obligations. This is the first license to treat AI intermediation as a first-class dependency category.

**Pledge and License are independent entry points, not a bundle.** Signing the Pledge does not require switching licenses. Adopting the SPARK License does not require filing a Pledge. Many mature projects have stable license terms that downstream users depend on; requiring a license change as a condition of Pledge adoption would turn a values-alignment decision into a legal coordination problem. The two paths are designed to compound, not gate each other. Projects that adopt both receive a 1.3x Funnel weight multiplier — an economic incentive, not a requirement.

**The path to OSI recognition**

For SPARK License to achieve lasting ecosystem impact, it needs to enter the standard license infrastructure — not remain a project-specific instrument. The target is OSI certification and an SPDX identifier.

The legal argument is that SPARK License satisfies all ten conditions of the Open Source Definition. It does not restrict fields of endeavor. It does not discriminate. The economic obligation only activates post-commercialization, through a tiered and transparent structure that is closer in spirit to copyleft — a mechanism the open-source community has accepted for decades — than to any commercial restriction. Pre-commercialization, it is indistinguishable from MIT.

Phase 2 opens the OSI license-review process with a complete legal draft and OSD compliance analysis. Simultaneously, we file for an SPDX identifier through the Linux Foundation, which is faster and makes the license machine-readable across toolchains. Richard Lin's existing relationships within OSI's international community provide the pre-consultation channel to surface objections before formal submission. Real adoption data from Pledge projects that voluntarily adopt the License is the most compelling evidence that the mechanism is operationally viable, not just theoretically sound.

SPARK License v1.0 ships in Phase 2, with legal review complete, SPDX identifier filed, and OSI review process initiated.

### 5.2 SPARK.md: Making the Invisible Dependency Graph Visible

The second structural gap requires a different kind of fix. It is not about propagation — it is about visibility.

For most of software history, the dependency graph was traceable because usage was explicit. You imported a package; it appeared in your manifest; the Funnel could see it. AI coding tools broke that assumption at the infrastructure level. A developer using Cursor generates a routing module. That module's architecture is informed by express, its validation logic by zod, its error handling pattern by a library the developer has never directly imported. The influence is real. None of it is visible to any existing tooling.

This is not a corner case. It is the default condition of AI-assisted development in 2025. The projects whose patterns are most heavily recycled by AI tools — the foundational libraries that shaped how entire generations of code gets written — may receive the least from the Funnel, because their influence runs through AI intermediation rather than direct import. The mechanism designed to fund the most important open-source work would systematically miss its targets.

SPARK.md is the mechanism for closing this gap. Every SPARK-registered repository includes a SPARK.md file at its root. The YAML frontmatter is machine-parseable: registration status, license type, attribution preferences. The Markdown body is natural language — written for human developers, but also loaded as context by AI coding tools. When Cursor or Copilot indexes a repository, the Markdown body enters the context window. When a developer then generates code informed by that project, they have already been told what the project is, what its registration status means, and what an AI dependency declaration looks like.

The declaration itself is a best-effort estimate, not an audit. A developer looks at AI-generated code, identifies which upstream projects plausibly influenced it, and files the declaration. Submission is compliance. The goal is not perfect accuracy — it is building a practice. The same habit developers already have for package dependencies, extended to AI dependencies.

These declarations feed directly into the Funnel's AI usage depth scoring. Projects frequently declared as AI-era dependencies receive up to a 1.3x weight multiplier in Funnel distributions. The more a project's patterns are actually being used by the ecosystem, the more it benefits — even when that usage runs through AI intermediation rather than a direct import statement.

There is precedent for how a simple convention in a root file becomes infrastructure. In 2017, two security researchers proposed security.txt: a plain text file at `/.well-known/security.txt` where organizations could publish a vulnerability disclosure policy. No standards body, no governance process. Within a few years, Google, GitHub, and Facebook had adopted it. By 2022, it was RFC 9116, an official IETF standard. SPARK.md follows the same logic: a low-friction convention that creates value immediately for early adopters, whose usefulness compounds as adoption spreads, and whose trajectory points toward standardization rather than away from it.

Together, SPARK License and SPARK.md address the two failure modes the Pledge cannot reach on its own: projects that never voluntarily join, and value flows that never appear in any manifest. Phase 1 builds the registry infrastructure both depend on. Phase 2 ships them.

---

## 6. What We Are Not Building

- Not building a new blockchain or L2. We are deploying on Ethereum Mainnet.
- Not auditing project revenues. The mechanism runs on self-reporting and community accountability. Social and reputational pressure is the enforcement layer for non-token projects, not surveillance.
- Not replacing Gitcoin, RetroPGF, or Protocol Guild. We are the layer none of them provide: forward commitments, recursive propagation, global scope. We are designed to complement them, not compete.
- Not restricting to Web3 projects. Any open-source project with genuine usage and real maintainers can join.
- Not claiming to solve all of open-source funding. SPARK is one mechanism. It addresses one part of the problem. We are not the last word.

---

## 7. Open Source Commitment

Everything built with this grant will be open-sourced under MIT. Smart contracts verified and public on GitHub and Etherscan. The Dependency Funnel algorithm fully open and auditable. The dashboard frontend open-source. SPARK Pledge tooling forkable by any ecosystem that wants to run its own implementation.

Infrastructure built to support open-source must itself be open-source. That is not negotiable.

---

## 8. Budget and Timeline

### Budget

| Category | Amount | Notes |
|----------|--------|-------|
| Smart contract development | $30,000 | Pledge Registry, Funnel contracts, audit |
| Frontend and Dashboard | $20,000 | Registry UI, Compliance Dashboard, onboarding flow |
| Dependency Funnel integration | $15,000 | deps.dev API integration, allocation algorithm |
| Pilot cohort program | $20,000 | Project onboarding, support, first-round SPARK pool seeding |
| Operations and legal | $10,000 | Entity setup, documentation, community management |
| Contingency | $5,000 | |
| **Total** | **$100,000** | |

### Timeline

**Month 1–2 (May–June): Foundation**  
Finalize smart contract architecture. Deploy SPARK Pledge Registry v0.1 to testnet. Launch Pledge onboarding site. Begin Cohort 1 recruitment.

**Month 3–4 (July–August): Build**  
Mainnet deployment of Registry contract. Dependency Funnel v0.1 live across npm and PyPI. Compliance Dashboard v0.1 up. Cohort 1: 10+ projects onboarded and pledged.

**Month 5–6 (September–November): Validate**  
First SPARK Report cycle from Cohort 1. Dependency Funnel processing first real allocations. Open registration to global projects. Full grant completion report to EF with all metrics.

---

## 9. What We're Measuring

| Metric | Target (6 months) |
|--------|-------------------|
| Projects registered in SPARK Pledge Registry | 20+ |
| Chinese-speaking community projects (Cohort 1) | 10-15 |
| Global projects via open registration | 5-10 |
| SPARK Reports submitted | 15+ |
| Upstream dependencies mapped by Funnel | 100+ |
| Funding pool seeded | $20,000+ |
| Smart contracts deployed and verified on Mainnet | Yes |
| Public dashboard live | Yes |
| Average project longevity score in Funnel | 3+ years |

---

## 10. What Comes After

Six months of infrastructure work and pilot validation is the beginning, not the end. The sustainability argument is built into the mechanism: as Cohort 1 projects commercialize over the next two to five years, their 4% commitments flow back into the SPARK pool. If three of twenty Cohort 1 projects reach commercial scale and honor their pledge, the pool becomes self-replenishing. That is the real proof of concept — not this grant, but what it enables.

OpenSeed as an organization generates operational revenue through optional premium Registry services and ecosystem partnerships. The on-chain infrastructure is permissionless and designed to outlive us.

Phase 2, starting in 2026: 100+ projects globally, integration with Gitcoin and RetroPGF as a complementary compliance layer, SPARK pool governance transitioning to an on-chain DAO, SPARK License v1.0 entering OSI review with a complete legal draft and SPDX identifier filed, and open tooling for other ecosystems to fork and deploy their own SPARK implementations. The goal was never for this to be one team's project.

---

## 11. Team

**Richard Lin (林旅强)** — Co-founder, OpenSeed. Co-founder of KAIYUANSHE, China's largest vendor-neutral open-source community and the first Chinese member of the Open Source Initiative (OSI). Open Source Ecosystem Lead at Datastrato.ai. Previously Head of Developer Ecosystem at Huawei Cloud and 01.AI. Long-term participant in Apache, Linux Foundation, and OSI international communities.

**Ian Xu (许银)** — Co-founder, OpenSeed. Board Director of KAIYUANSHE. Founder of OpenBuild community. Organizer of RustCC and PyChina. Member of the SPARK working group Signal channel since April 2025.

**SPARK Working Group:** Vitalik Buterin (mechanism co-designer), Liraz Siri, Mario Behling, Richard Lin, QZ, and other members of the original SPARK Signal group.

---

## Appendix: Comparison with Existing Mechanisms

| Mechanism | Funding Source | Recursive | Chain-enforced | Scope |
|-----------|---------------|-----------|----------------|-------|
| Gitcoin QF | Community donations | No | No | Web3, English-first |
| Optimism RetroPGF | OP token inflation | No (retroactive) | Partial | Optimism ecosystem |
| Protocol Guild | Project donations (1% token) | No | Vesting contract | ETH core devs only |
| Drips Network | Any donor | Partial (splits) | Yes (EVM) | Any, manual config |
| Open Source Pledge | Company budgets | No | No | Any, voluntary |
| **SPARK / OpenSeed** | **Upside % pledge** | **Yes (by design)** | **Yes (token) + soft (revenue)** | **Any open source, global** |
