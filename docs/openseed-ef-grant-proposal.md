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

There is a framework sitting in a private Signal group right now — co-designed with Vitalik Buterin, thoughtfully built, ready to change how open-source software gets funded. It is called the SPARK Pledge. And it is completely inert, because no one has built the infrastructure to run it.

OpenSeed is asking for $100,000 to change that.

We will build an on-chain Pledge Registry, a Dependency Funding Funnel that routes money to the projects that built the foundation others stand on, a public Compliance Dashboard, and a verified first cohort of real open-source projects — drawn from the Chinese-speaking developer community, a part of the world that has been building on Ethereum for years and receiving far less than its fair share of attention from existing funding mechanisms.

This grant is not about studying the problem. It is about building the thing.

---

## 2. What We're Actually Trying to Fix

### 2.1 The Commons Problem

Every wallet, client, library, and developer tool in the Ethereum ecosystem runs on open-source software. Most of that software is maintained by people who are either volunteers, underpaid, or waiting on grants that may or may not renew next year.

The projects that commercially succeed — the ones that built on these foundations and turned them into businesses — rarely send anything back. Not because they are bad actors, but because there was never a mechanism that expected them to. The commons built them up, and then the relationship ended there.

Gitcoin Grants, Optimism RetroPGF, and Protocol Guild each do something real. None of them solve the recursive dependency layer, none of them have strong reach into non-English-speaking communities, and none of them make a forward commitment — a promise, at the beginning of a project's life, to share the upside when it comes.

### 2.2 What SPARK Actually Says

SPARK — Scaling Public Alignment with Recursive Kindling — starts from a simple premise: if you built your success on the open commons, you owe the commons something back.

The mechanism: when a project adopts the SPARK Pledge, it commits to directing 4% of its future economic upside toward other SPARK-aligned projects. The recipients of that funding make the same commitment. The 4% flows forward, not once, but recursively. Separately, each project commits 1% specifically to the open-source projects it directly depends on — money flowing back to the actual code that made their product possible.

Early-stage projects are not asked to bleed. There is a three-year grace period from commercialization, and obligations are tiered by revenue rather than triggered the moment a dollar comes in.

The framework is designed. The specification has been reviewed within the working group. What does not exist — at all — is the infrastructure to make any of this real.

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

The old metrics — lines of code, commit frequency, PR volume — are becoming meaningless in a world where AI can generate all of them. OpenSeed's Dependency Funnel was built from the start around signals that cannot be faked: how long a project has existed, how many real downstream dependents it has, how continuously a small group of humans has shown up for it.

---

## 3. What We're Building

### 3.1 SPARK Pledge Registry

A smart contract on Ethereum Mainnet that turns a promise into a provable, on-chain fact. Each project's Pledge adoption is recorded as an attestation via EAS (Ethereum Attestation Service). The Registry tracks commercialization triggers, manages grace period timers, and exposes a public, permissionless read interface — so anyone can verify, not just trust.

For projects launching tokens: the Registry integrates directly with TGE contracts to automatically escrow 4% of supply at issuance. The Pledge is honored without any further manual action required.

For non-token projects: adoption is recorded on-chain, with obligations fulfilled through annual self-reporting and direct transfers to the SPARK funding pool.

### 3.2 Dependency Funding Funnel

The 1% dependency allocation is only meaningful if you can actually trace what a project depends on and decide how to weight it.

**Dependency Graph Resolution**

The Funnel integrates with Google's deps.dev API across npm, PyPI, Maven, Go, and Cargo. It resolves transitive dependencies recursively — not just the packages listed in a manifest, but the packages those packages depend on — and maps GitHub repositories to on-chain identities via EAS.

**Allocation Algorithm**

The Funnel weights upstream projects on five dimensions, each chosen specifically because AI cannot fabricate them:

- Longevity (25%): Years of continuous active maintenance. AI can clone a library overnight. It cannot fake five years of commit history.
- Real Usage Depth (30%): Downstream dependents that actually use the package, drawn from deps.dev. Not stars. Not forks. Real usage.
- Maintainer Continuity (25%): How long the core contributors have stayed. Human long-term commitment is the signal.
- Issue Responsiveness (10%): Close rate and average close time over 12 months. A proxy for whether the maintainers are actually present and making judgments.
- Dependency Depth Decay (10%): Direct dependencies receive higher weight than transitive ones.

All dimensions normalize to 0–1 before weighting. The algorithm is fully open-source, upgradeable only through OpenSeed multi-sig governance, with every change recorded on-chain. Projects that have joined the SPARK Registry receive a 1.2× bonus weight — an incentive for the Pledge to propagate through the dependency graph rather than stop with any single project.

**Distribution Execution**

Projects with on-chain identity receive funds directly. Projects without are held in escrow — available to claim, or returned to the SPARK pool after 12 months unclaimed.

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

1. Does the project have identifiable long-term maintainers — people with multi-year contribution histories, not one-time contributors?
2. Is the project's core value built on judgment and ecosystem position, or is it purely functional code that AI could replicate in a few months?
3. Has the maintenance burden held steady or increased since AI tools became widespread — evidence that real human work is still happening?

We are looking for projects whose value goes up in an AI-saturated environment, not down.

---

## 4. The Obligation Structure

| Annual Revenue | SPARK Obligation |
|----------------|-----------------|
| Below $50,000 | Not triggered |
| $50K to $500K | 2% (reduced early-stage rate) |
| $500K to $5M | 4% (standard rate) |
| Above $5M | 4% plus governance participation |

Token projects: 4% escrowed at TGE regardless of revenue. Tokens represent future upside, not current revenue.

Grace period: 3 years from commercialization trigger. Obligations accrue from Day 1 and must be settled in full by end of Year 3. The mechanism is designed so that a project that genuinely never makes money never owes anything, and a project that does well cannot quietly avoid contributing.

---

## 5. Why OpenSeed Is the Right Team to Do This

### 5.1 We Have Real Community

OpenSeed was founded by the teams behind OpenBuild, KAIYUANSHE (China's largest vendor-neutral open-source community and the first Chinese member of the Open Source Initiative), PyChina, and RustCC. Collectively, these organizations represent hundreds of thousands of developers across China, Taiwan, Hong Kong, and the Chinese-speaking diaspora.

OpenBuild has brought thousands of developers into the Ethereum ecosystem through education, hackathons, and project incubation. The network already exists. The trust is already there. SPARK adoption in Phase 1 does not require cold outreach — it requires a conversation with people we have been building with for years.

### 5.2 We Were in the Room

The OpenSeed team joined the Signal group initiated by Vitalik Buterin in April 2025 and participated directly in the mechanism design discussions that produced the current SPARK Pledge specification. We are not interpreting a document from the outside. We helped shape it.

### 5.3 We Are Builders, Not Owners

We are clear about what we are and are not. We are the first implementation of SPARK Pledge infrastructure. We are a feedback channel back to the working group, where pilot data informs mechanism refinement. We are stewards of the initial pool, transitioning to on-chain governance as quickly as is responsible.

We are not claiming any ownership of SPARK. The specification is open. Anyone can implement it. We are building the reference implementation, and we intend to make it good enough that it sets a useful precedent.

### 5.4 What Makes This Different from Existing Mechanisms

| Mechanism | Funding Source | Recursive | Chain-enforced | Scope |
|-----------|---------------|-----------|----------------|-------|
| Gitcoin QF | Community donations | No | No | Web3, English-first |
| Optimism RetroPGF | OP token inflation | No (retroactive) | Partial | Optimism ecosystem |
| Protocol Guild | Project donations | No | Vesting contract | ETH core devs only |
| Drips Network | Any donor | Partial (splits) | Yes (EVM) | Any, manual config |
| Open Source Pledge | Company budgets | No | No | Any, voluntary |
| **SPARK / OpenSeed** | **Upside % pledge** | **Yes (by design)** | **Yes (token) + soft (revenue)** | **Any open source, global** |

The existing mechanisms are doing real work. None of them provide what SPARK provides: a forward commitment, built into a project's structure from the start, that grows with the project and propagates recursively through the ecosystem.

---

## 6. SPARK License

The SPARK Pledge is a forward commitment that projects adopt voluntarily. But there is a second, complementary entry point into the SPARK ecosystem: the SPARK License.

When a project releases its code under the SPARK License, the obligation structure is embedded in the license itself rather than in a separate pledge document. The mechanism is the same — 4% of commercial upside to SPARK-aligned projects, 1% to direct dependencies — but the trigger is different. Any downstream project that incorporates SPARK-licensed code and later commercializes inherits the obligation. The license propagates recursively through the dependency graph.

Before commercialization, SPARK License is equivalent to MIT: zero obligations, complete freedom to use, modify, and distribute. The obligations only activate when the project crosses the $50K revenue threshold or completes a TGE. At that point, the 3-year grace period and tiered obligation structure kick in, identical to the Pledge path.

The two registration paths — Pledge and License — are independent on-chain attestations using separate EAS schemas but sharing the same SPARKRegistry contract. A project can adopt both, and many will: Pledge as an organizational commitment, License as the technical mechanism that makes the commitment propagate downstream.

## 7. SPARK.md — The Metadata Standard

The SPARK Pledge and License handle the funding mechanics. SPARK.md handles the transparency layer.

Every SPARK-registered repository is expected to include a `SPARK.md` file in its root directory. The file has two layers:

- **YAML frontmatter** — structured, machine-parseable fields for scanners and tooling: registration status, license type, attribution preferences, and AI dependency declarations
- **Markdown body** — natural language context for human readers and AI coding assistants; when Cursor, Copilot, or Continue indexes a repository, this section loads automatically as context

The AI dependency section is the part that matters most in 2025. When a developer uses an AI coding tool and the generated code references or adapts patterns from a SPARK-licensed project, `SPARK.md` provides the standard mechanism for declaring that dependency. The declaration is a best-effort estimate — not a complete audit — and the act of filing it is itself considered compliant. We are not building a surveillance system. We are building a culture of attribution.

A minimal SPARK.md frontmatter looks like this:

```yaml
spark-version: "1.0.0"
project:
  github: "org/repo"
license:
  type: "SPARK-LICENSE-1.0"
  adopted-at: "2025-01-01"
spark-ai-disclosure:
  wants-attribution: true
  dynamic-reporting: false
ai-dependencies:
  - repo: "expressjs/express"
    confidence: "high"
    reason: "Core routing patterns referenced in AI-generated code"
```

Dynamic reporting — where a project opts into real-time AI usage event reporting via the SPARK Report API — is optional and off by default. The open-source principle of freedom to use without obligation to report is preserved. Projects that do opt in receive a higher weight in the Dependency Funnel's AI usage dimension, creating a real incentive without creating a mandate.

SPARK.md is designed to propagate as an independent open standard. Its adoption does not depend on whether a project has signed the Pledge or adopted the License. Think of it as `robots.txt` for the AI era: a file you place in your repository to declare an intent and provide context. The more repositories include it, the more signal the Funnel has.

## 8. What We Are Not Building

Scope discipline matters, especially in a first grant. Being explicit about what we are not doing is as important as describing what we are.

- **Not building a new blockchain or L2.** We are deploying on Ethereum Mainnet.
- **Not auditing project revenues.** The mechanism runs on self-reporting and community accountability. Social and reputational pressure is the enforcement layer for non-token projects, not surveillance.
- **Not replacing Gitcoin, RetroPGF, or Protocol Guild.** We are the layer none of them provide — forward commitments, recursive propagation, global scope. We are designed to complement them, not compete.
- **Not restricting to Web3 projects.** Any open-source project with genuine usage and real maintainers can join.
- **Not claiming to solve all of open-source funding.** SPARK is one mechanism. It addresses one part of the problem. We are not the last word.

---

## 9. Open Source Commitment

Everything built with this grant will be open-sourced under the MIT license. Smart contracts verified and public on GitHub and Etherscan. The Dependency Funnel algorithm fully open and auditable. The dashboard frontend open-source. SPARK Pledge tooling forkable by any ecosystem that wants to run its own implementation.

This is not a nice-to-have. Infrastructure built to support open-source must itself be open-source. That is not negotiable.

---

## 10. Budget and Timeline

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

## 11. What We're Measuring

| Metric | Target (6 months) |
|--------|-------------------|
| Projects registered in SPARK Pledge Registry | 20+ |
| Chinese-speaking community projects (Cohort 1) | 10–15 |
| Global projects via open registration | 5–10 |
| SPARK Reports submitted | 15+ |
| Upstream dependencies mapped by Funnel | 100+ |
| Funding pool seeded | $20,000+ |
| Smart contracts deployed and verified on Mainnet | Yes |
| Public dashboard live | Yes |
| Average project longevity score in Funnel | 3+ years |

---

## 12. What Comes After

Six months of infrastructure work and pilot validation is the beginning, not the end. The sustainability argument is built into the mechanism: as Cohort 1 projects commercialize over the next two to five years, their 4% commitments flow back into the SPARK pool. If three of twenty Cohort 1 projects reach commercial scale and honor their pledge, the pool becomes self-replenishing. That outcome — not this grant, but what the grant enables — is the real proof of concept.

OpenSeed as an organization generates operational revenue through optional premium Registry services and ecosystem partnerships. But the on-chain infrastructure is permissionless and designed to outlive us. If OpenSeed disappears tomorrow, the contracts keep running.

Phase 2, starting in 2026: 100+ projects globally, integration with Gitcoin and RetroPGF as a complementary compliance layer, SPARK pool governance transitioning to an on-chain DAO, and open tooling for other ecosystems to fork and deploy their own SPARK implementations. The goal was never for this to be one team's project.

Everything built with this grant will be MIT-licensed and fully open: contracts verified on GitHub and Etherscan, the Funnel algorithm auditable, the dashboard frontend open-source, the tooling forkable by anyone.

---

## 13. Team

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
