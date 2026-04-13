# OpenSeed: Building the Implementation Infrastructure for the SPARK Pledge
## Ethereum Foundation Grant Application

**Applicant:** OpenSeed  
**Co-founders:** Richard Lin, Ian Xu  
**Requested Amount:** $100,000 USD  
**Grant Type:** Ecosystem Development  
**Timeline:** May 2025 – November 2025 (6 months)  
**Deployment Target:** Ethereum Mainnet

---

## 1. Executive Summary

The SPARK Pledge — a recursive open-source funding framework co-developed with Vitalik Buterin and the SPARK working group — exists today only as a draft document circulating in a private Signal group. No implementation infrastructure exists. No project has formally adopted it. The mechanism cannot propagate on its own.

OpenSeed is applying for $100,000 to build the foundational infrastructure that turns SPARK from a concept into a working system: an on-chain Pledge Registry, a Dependency Funding Funnel, a compliance Dashboard, and a verified pilot cohort of open-source projects from the Chinese-speaking developer community — one of the largest and most active open-source communities in the world, currently underserved by existing Ethereum-ecosystem funding mechanisms. At a moment when AI is commoditizing code production, OpenSeed's infrastructure is designed to fund what AI cannot replace: the long-term human judgment, maintenance commitment, and ecosystem trust that make open source sustainable.

This grant funds the first real-world test of SPARK's recursive model. If successful, the infrastructure we build will be open, permissionless, and replicable globally.

---

## 2. Background and Problem Statement

### 2.1 The Open Source Sustainability Crisis

Open source software underlies every layer of the Ethereum ecosystem — wallets, clients, developer tooling, libraries, and protocols. Yet the funding model for open-source development remains broken:

- Most funding is one-off grants with no continuity
- Projects that succeed commercially rarely reinvest into the commons they depended on
- Critical infrastructure is maintained by underpaid or volunteer contributors
- Existing mechanisms (Gitcoin Grants, RetroPGF, Protocol Guild) serve parts of the problem but leave significant gaps — particularly for non-token projects, non-English-speaking communities, and the recursive dependency layer

### 2.2 What SPARK Proposes

SPARK (Scaling Public Alignment with Recursive Kindling) is a pledge framework designed by Vitalik Buterin and a small working group to address these gaps. Its core mechanism:

- Projects adopting the SPARK Pledge commit **4% of future economic upside** to fund other SPARK-aligned projects (recursive: recipients must also adopt the Pledge)
- Projects additionally commit **1% of future upside** to fund their open-source dependencies (non-recursive, unilateral)
- A **3-year grace period** allows early-stage projects to defer obligations until commercially viable
- Obligations are tiered by revenue stage, not binary, protecting early teams while ensuring eventual contribution
- **All obligations are publicly reported** via annual SPARK Reports, with on-chain attestation for token-based projects

The full SPARK Pledge document has been drafted and reviewed within the working group. What does not yet exist is any infrastructure to register projects, track compliance, route funds, or resolve dependency graphs.

### 2.3 The Gap OpenSeed Fills

| Layer | Status |
|-------|--------|
| SPARK Pledge specification | ✅ Draft exists |
| On-chain Pledge Registry | ❌ Does not exist |
| Dependency Funding Funnel tooling | ❌ Does not exist |
| Compliance tracking & reporting | ❌ Does not exist |
| Verified pilot projects | ❌ Does not exist |
| Chinese-speaking community bridge | ❌ Does not exist |

OpenSeed builds all of the missing layers.

---

### 2.5 The AI Inflection Point: Why Open Source Funding Matters More Now

The rise of AI coding tools (GitHub Copilot, Cursor, and the broader "vibe coding" movement) has introduced a structural shift that makes the open-source sustainability problem simultaneously more urgent and more complex.

**What the research shows:**

A July 2025 randomized controlled study by METR — recruiting 16 experienced contributors from major open-source repositories — found that AI tools *increased* task completion time by 19% for experienced developers. Counterintuitively, AI tooling slowed down experts working on complex, established codebases, because the cost of understanding, verifying, and correcting AI output exceeded the generation savings.

Meanwhile, AI tools have flooded open-source repositories with low-quality AI-generated pull requests. By early 2026, projects like curl, ghostty, and tldraw had closed or severely restricted external contributions. The core dynamic: AI lowers the barrier to contributing code, but does not lower the cost of reviewing it — shifting maintainers from builders to gatekeepers.

**The value shift:**

AI commoditizes code production. What becomes scarce and valuable is:
- Long-term maintenance commitment (years, not sprints)
- Architectural judgment and system-level understanding
- Community trust and ecosystem coordination
- The human judgment that determines what code should exist at all

These are exactly the things SPARK is designed to sustain. A mechanism that funds projects based on their long-term existence and recursive value propagation — rather than one-off code metrics — is precisely what this moment requires.

**The measurement implication:**

Existing open-source metrics (lines of code, commit counts, PR volume) are becoming noise in the AI era. OpenSeed's Dependency Funnel is built around AI-resistant signals: project longevity, real dependency depth, maintainer continuity, and issue response quality — not LOC.

This positions OpenSeed not just as a funding mechanism, but as an emerging standard for how open-source value should be measured in the AI era.

---

## 3. Why OpenSeed

### 3.1 Origin and Community Roots

OpenSeed was founded by the teams behind OpenBuild, KAIYUANSHE (China's largest open-source alliance), PyChina, and RustCC. These organizations collectively represent hundreds of thousands of developers across China, Taiwan, Hong Kong, and the broader Chinese-speaking diaspora.

OpenBuild alone has onboarded thousands of developers into the Ethereum ecosystem through developer education, hackathons, and project incubation. This existing trust network is the distribution channel for SPARK adoption in Phase 1.

### 3.2 Direct Involvement in SPARK Design

The OpenSeed team has been part of the Signal group initiated by Vitalik Buterin since April 2025, participating directly in the mechanism design discussions that produced the current SPARK Pledge draft. We are not building on a secondhand interpretation of SPARK — we are building on direct design knowledge.

### 3.3 Complementary to Existing Mechanisms

OpenSeed is not competing with Gitcoin, RetroPGF, or Protocol Guild. Our differentiation:

- **Gitcoin:** QF-based, community donation-driven, primarily Web3-native projects, English-first
- **RetroPGF:** Retroactive, Optimism ecosystem-specific, badge-holder governance
- **Protocol Guild:** Ethereum core protocol contributors only
- **OpenSeed/SPARK:** Forward commitment, any open-source project, recursive propagation, global with Chinese-speaking community entry point

We are the implementation layer for a mechanism none of the above provides.

---

## 4. What We're Building

### 4.1 SPARK Pledge Registry (On-Chain)

A smart contract deployed on Ethereum Mainnet that:

- Records each project's Pledge adoption as an on-chain attestation (using EAS — Ethereum Attestation Service)
- Stores dynamic pledge parameters (default: 4% + 1%, adjustable per project within bounds)
- Tracks commercialization trigger events (TGE, revenue threshold crossed)
- Manages grace period timers
- Provides a public, permissionless read interface

For token-issuing projects: the Registry integrates with TGE contracts to automatically escrow 4% of token supply at issuance — no manual action required after Pledge adoption.

For non-token projects: Pledge adoption is recorded on-chain, with obligations fulfilled via annual self-reporting and manual transfers to the SPARK funding pool.

### 4.2 Dependency Funding Funnel

The 1% dependency allocation requires knowing which upstream projects a given project depends on, and how to weight them. We build:

**Dependency Graph Resolution**
- Integrates with Google's deps.dev API (covering npm, PyPI, Maven, Go, Cargo — 5 major ecosystems)
- Resolves transitive dependencies recursively
- Maps GitHub repositories to on-chain identities (via EAS or ENS)

**Allocation Algorithm (v1.1 — AI-Era Adapted)**

Traditional metrics like lines of code (LOC) are no longer reliable signals of open-source value in an era where AI tools can generate thousands of lines in minutes. OpenSeed's Funnel uses five AI-resistant weight dimensions:

- **Longevity (25%):** Years the project has been actively maintained. AI can clone a library overnight; it cannot fake 5 years of maintenance history. Source: GitHub `created_at`
- **Real Usage Depth (30%):** Number of downstream projects that actually depend on this package — not stars (gameable), but dependents. Source: deps.dev dependents count
- **Maintainer Continuity (25%):** How long the top-3 contributors have been continuously active. Measures human long-term commitment. Source: GitHub contributor API
- **Issue Responsiveness (10%):** Average issue close time + close rate over 12 months. Proxy for maintainer judgment quality. Source: GitHub Issues API
- **Dependency Depth Decay (10%):** Direct dependencies weighted higher than transitive ones. Preserved from original design.

All dimensions normalized to 0–1 before weighting. Algorithm is fully open-source, upgradeable via OpenSeed multi-sig governance with on-chain record of every change. SPARK Registry members receive a 1.2× weight bonus to incentivize Pledge propagation through the dependency graph.

**Distribution Execution**
- For projects with on-chain identity: direct on-chain transfer
- For projects without: held in escrow until claimed, or donated to SPARK pool after 12 months unclaimed

This component is inspired by Drips Network's Split architecture but is designed specifically for the SPARK Pledge's 1% obligation flow, with deeper dependency graph automation.

### 4.3 Compliance Dashboard

A public web interface showing:

- All registered SPARK Pledge projects and their current status
- Commercialization trigger status and grace period countdown
- Annual SPARK Report submissions
- Fund flow transparency (who funded whom, amounts, dates)
- Dependency funnel allocation records

This is the trust layer. Any stakeholder — funders, community members, downstream projects — can verify compliance without requiring trust in OpenSeed as an intermediary.

### 4.4 SPARK Funding Pool

A multi-sig treasury (transitioning to on-chain governance post-pilot) that:

- Receives initial seed funding (this EF grant + community donations)
- Receives 4% recursive contributions from commercialized projects
- Allocates to new SPARK Pledge projects via a review process
- OpenSeed operates as the initial steward, with plans to decentralize governance in Phase 2

### 4.5 Chinese-Speaking Community Pilot (Cohort 1)

Using OpenBuild's developer network, we recruit and onboard an initial cohort of 10–20 open-source projects from the Chinese-speaking community:

- Projects spanning Web3 tooling, developer infrastructure, AI tooling, and general open-source software
- Not restricted to Ethereum-native projects — any open-source project with genuine usage qualifies
- Each project receives: Pledge onboarding support, technical integration assistance, visibility within the SPARK Registry, and eligibility for funding from the SPARK pool
- Cohort 1 is the proof-of-concept: does the mechanism work in a real community? Do projects adopt it? Do funded projects pay it forward?

**Cohort 1 Screening Criteria (AI-Era Adapted)**

Given the AI-era context, Cohort 1 project selection requires affirmative answers to three questions:

1. Does the project have identifiable long-term maintainers? (Named individuals with multi-year contribution history — not anonymous or bulk AI-assisted commits)
2. Is the project's core value rooted in judgment and ecosystem position, rather than purely functional code that AI could replicate in months?
3. Has the project's maintenance burden increased or held steady with AI tool adoption? (Projects facing increased review burden are demonstrably doing real human maintenance work)

These criteria intentionally select for projects whose value survives — and becomes more important — in an AI-saturated environment.

---

## 5. Revenue / Obligation Tiering

To protect early-stage projects while ensuring eventual contribution:

| Annual Revenue Stage | SPARK Obligation |
|---------------------|-----------------|
| < $50,000 | Not triggered |
| $50K – $500K | 2% (reduced rate, early-stage) |
| $500K – $5M | 4% (standard rate) |
| > $5M | 4% + governance participation |

Token projects: 4% escrowed at TGE regardless of revenue stage (tokens represent future upside, not current revenue).

Grace period: 3 years from commercialization trigger, obligations accrue from Day 1 and must be settled in full by end of Year 3.

---

## 6. What We Are NOT Building

To maintain focus and credibility:

- **Not building a blockchain or L2** — deploying on Ethereum Mainnet
- **Not auditing project revenues** — self-reporting + community accountability
- **Not replacing Gitcoin or RetroPGF** — complementary, not competitive
- **Not restricting to Web3 projects** — open to any open-source project
- **Not claiming to solve all of open-source funding** — SPARK is one mechanism, not a silver bullet

---

## 7. Budget Breakdown

| Category | Amount | Notes |
|----------|--------|-------|
| Smart contract development | $30,000 | Pledge Registry + Funnel contracts, audit |
| Frontend / Dashboard | $20,000 | Registry UI, Compliance Dashboard, Pledge onboarding flow |
| Dependency Funnel integration | $15,000 | deps.dev API integration, allocation algorithm |
| Pilot cohort program | $20,000 | Project onboarding, support, first-round SPARK pool seeding |
| Operations & legal | $10,000 | Entity setup, documentation, community management |
| Contingency | $5,000 | |
| **Total** | **$100,000** | |

---

## 8. Timeline

### Month 1–2 (May–June 2025): Foundation
- Finalize smart contract architecture
- Deploy SPARK Pledge Registry v0.1 to testnet
- Launch Pledge onboarding website
- Begin Cohort 1 recruitment via OpenBuild network

### Month 3–4 (July–August 2025): Core Build
- Ethereum Mainnet deployment of Registry contract
- Dependency Funnel v0.1 (npm + PyPI ecosystems first)
- Compliance Dashboard v0.1 live
- Cohort 1: 10+ projects onboarded and pledged

### Month 5–6 (September–November 2025): Pilot & Validation
- First SPARK Report cycle from Cohort 1 projects
- Dependency Funnel processing first allocations
- Public launch — open to global projects
- Grant completion report to EF with full metrics

---

## 9. Success Metrics

| Metric | Target (6 months) |
|--------|-------------------|
| Projects registered in SPARK Pledge Registry | 20+ |
| Chinese-speaking community projects (Cohort 1) | 10–15 |
| Global projects (open registration) | 5–10 |
| SPARK Reports submitted | 15+ |
| Dependency Funnel: projects mapped | 100+ upstream dependencies identified |
| Funding pool seeded | $20,000+ (EF grant allocation + community donations) |
| Smart contracts deployed & verified | Ethereum Mainnet |
| Public dashboard live | Yes |
| SPARK Reports including AI-era health data | 80% of submitting projects |
| Dependency Funnel: average project longevity score | > 3 years |

---

## 10. Long-Term Vision and Sustainability

This $100K grant funds the infrastructure build and pilot validation. After 6 months:

**Self-sustainability path:**
- As Cohort 1 projects commercialize, 4% flows back into the SPARK pool — this is the recursive mechanism proving itself
- OpenSeed generates operational revenue through: optional premium Registry services, ecosystem partnerships, and grant support facilitation
- The on-chain infrastructure is permissionless — it can outlive OpenSeed as an organization

**Phase 2 (2026):**
- Expand Cohort to 100+ projects globally
- Integrate with Gitcoin Grants and RetroPGF as a complementary compliance layer
- Transition SPARK pool governance to on-chain DAO
- Publish open-source tooling for other ecosystems to fork and deploy their own SPARK implementations

**The recursive hypothesis:**
If even 3 of the 20 Cohort 1 projects reach commercial scale and honor their 4% pledge, the SPARK pool becomes self-replenishing without further grants. That is the ultimate validation of the mechanism.

---

## 11. Team

**Richard Lin (林旅强)** — Co-founder, OpenSeed. Co-founder of KAIYUANSHE (China's Open Source Society), China's leading vendor-neutral open-source community and the first Chinese member of the Open Source Initiative (OSI). Open Source Ecosystem Lead at Datastrato.ai (Silicon Valley AI/Big Data startup). Previously Head of Developer Ecosystem at Huawei Cloud and 01.AI (LLM). Has advised multiple open-source and infrastructure projects on global expansion. Long-term participant in international open-source communities including Apache, Linux Foundation, and OSI.

**Ian Xu (许银)** — Co-founder, OpenSeed. Board Director of KAIYUANSHE. Founder of OpenBuild community. Organizer of RustCC and PyChina communities. Member of the SPARK working group Signal channel since April 2025.

**SPARK Working Group (earliest Pledge discussants):** Vitalik Buterin (mechanism co-designer), Liraz Siri, Mario Behling, Richard Lin, QZ, and other members of the original SPARK Signal group.

---

## 12. Relationship to the SPARK Working Group

OpenSeed's grant application is submitted with awareness of and alignment with the SPARK working group. We view our role as:

1. The first and primary implementation of the SPARK Pledge infrastructure
2. A feedback loop back to the working group — our pilot data informs mechanism refinement
3. A steward, not an owner — the SPARK Pledge specification is open; any organization can implement it; we are building the reference implementation

We are not claiming exclusive rights to SPARK. We are asking for resources to build what needs to be built.

---

## 13. Open Source Commitment

All infrastructure built with this grant will be open-sourced under MIT license:
- Smart contracts: verified and open on GitHub + Etherscan
- Dependency Funnel algorithm: fully open and auditable
- Dashboard frontend: open-source
- SPARK Pledge tooling: forkable by any ecosystem

This is non-negotiable. Infrastructure built to support open-source must itself be open-source.

---

## Appendix: Comparison with Existing Mechanisms

| Mechanism | Funding Source | Recursive? | Chain-enforced? | Scope |
|-----------|---------------|------------|-----------------|-------|
| Gitcoin QF | Community donations | No | No | Web3, English-first |
| Optimism RetroPGF | OP token inflation | No (retroactive) | Partial | Optimism ecosystem |
| Protocol Guild | Project donations (1% token) | No | Vesting contract | ETH core devs only |
| Drips Network | Any donor | Partial (splits) | Yes (EVM) | Any, manual config |
| Open Source Pledge | Company budgets | No | No | Any, voluntary |
| **SPARK / OpenSeed** | **Upside % pledge** | **Yes (by design)** | **Yes (token) + soft (revenue)** | **Any open source, global** |
