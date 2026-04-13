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

The SPARK Pledge is a recursive open-source funding framework co-developed with Vitalik Buterin and the SPARK working group. Today it exists only as a draft document circulating in a private Signal group. No implementation infrastructure exists. No project has formally adopted it.

OpenSeed is applying for $100,000 to build that infrastructure: an on-chain Pledge Registry, a Dependency Funding Funnel, a Compliance Dashboard, and a verified pilot cohort of open-source projects from the Chinese-speaking developer community. This grant funds the first real-world test of SPARK's recursive model. The infrastructure we build will be open, permissionless, and replicable globally.

---

## 2. Problem

### 2.1 Open Source Funding Is Broken

Open source software underlies every layer of the Ethereum ecosystem: wallets, clients, developer tooling, libraries, and protocols. The funding model for that software has not kept pace:

Most grants are one-off with no continuity. Projects that succeed commercially rarely reinvest into the commons they depended on. Critical infrastructure is maintained by underpaid or volunteer contributors. Existing mechanisms — Gitcoin Grants, RetroPGF, Protocol Guild — address parts of the problem but leave significant gaps, particularly for non-token projects, non-English-speaking communities, and the recursive dependency layer.

### 2.2 What SPARK Proposes

SPARK (Scaling Public Alignment with Recursive Kindling) is a pledge framework designed by Vitalik Buterin and a small working group. Its core mechanism:

Projects adopting the SPARK Pledge commit 4% of future economic upside to fund other SPARK-aligned projects. The mechanism is recursive: recipients must also adopt the Pledge. Projects additionally commit 1% to fund their direct open-source dependencies. A 3-year grace period allows early-stage projects to defer obligations until commercially viable. Obligations are tiered by revenue stage, not binary.

The Pledge specification has been drafted and reviewed within the working group. What does not yet exist is any infrastructure to register projects, track compliance, route funds, or resolve dependency graphs.

### 2.3 The Infrastructure Gap

| Layer | Status |
|-------|--------|
| SPARK Pledge specification | ✅ Draft exists |
| On-chain Pledge Registry | ❌ Does not exist |
| Dependency Funding Funnel tooling | ❌ Does not exist |
| Compliance tracking and reporting | ❌ Does not exist |
| Verified pilot projects | ❌ Does not exist |
| Chinese-speaking community bridge | ❌ Does not exist |

OpenSeed builds all of the missing layers.

### 2.4 Why This Matters Now

The rise of AI coding tools has introduced a structural shift that makes the open-source sustainability problem more urgent. A July 2025 randomized controlled study by METR found that AI tools increased task completion time by 19% for experienced developers working on complex, established codebases. The cost of understanding, verifying, and correcting AI output exceeded the generation savings.

Meanwhile, AI tools have flooded open-source repositories with low-quality pull requests. By early 2026, projects like curl, ghostty, and tldraw had closed or severely restricted external contributions. AI lowers the barrier to contributing code but does not lower the cost of reviewing it. Maintainers are shifting from builders to gatekeepers.

This changes what open-source value means. Code production is increasingly commoditized. What becomes scarce is long-term maintenance commitment, architectural judgment, community trust, and the human judgment that determines what code should exist at all. These are exactly the things SPARK is designed to sustain.

It also changes how open-source value should be measured. Existing metrics — lines of code, commit counts, PR volume — are becoming noise. OpenSeed's Dependency Funnel is built around signals that AI cannot fabricate: project longevity, real dependency depth, and maintainer continuity.

---

## 3. What We're Building

### 3.1 SPARK Pledge Registry

A smart contract deployed on Ethereum Mainnet that records each project's Pledge adoption as an on-chain attestation using EAS (Ethereum Attestation Service). The Registry stores dynamic pledge parameters, tracks commercialization trigger events, manages grace period timers, and provides a public, permissionless read interface.

For token-issuing projects, the Registry integrates with TGE contracts to automatically escrow 4% of token supply at issuance. No manual action is required after Pledge adoption.

For non-token projects, Pledge adoption is recorded on-chain, with obligations fulfilled via annual self-reporting and transfers to the SPARK funding pool.

### 3.2 Dependency Funding Funnel

The 1% dependency allocation requires knowing which upstream projects a given project depends on and how to weight them.

**Dependency Graph Resolution**

The Funnel integrates with Google's deps.dev API, covering npm, PyPI, Maven, Go, and Cargo. It resolves transitive dependencies recursively and maps GitHub repositories to on-chain identities via EAS.

**Allocation Algorithm**

Traditional metrics like lines of code are no longer reliable signals of open-source value. The Funnel uses five AI-resistant weight dimensions:

- Longevity (25%): Years the project has been actively maintained. AI can clone a library overnight; it cannot fake five years of maintenance history.
- Real Usage Depth (30%): Number of downstream projects that actually depend on this package — not stars, but dependents. Source: deps.dev.
- Maintainer Continuity (25%): How long the top contributors have been continuously active. Measures human long-term commitment.
- Issue Responsiveness (10%): Average issue close time and close rate over 12 months. A proxy for maintainer judgment quality.
- Dependency Depth Decay (10%): Direct dependencies weighted higher than transitive ones.

All dimensions are normalized to 0–1 before weighting. The algorithm is fully open-source and upgradeable via OpenSeed multi-sig governance, with an on-chain record of every change. Projects registered in the SPARK Registry receive a 1.2× weight bonus to incentivize Pledge propagation through the dependency graph.

**Distribution Execution**

For projects with on-chain identity: direct on-chain transfer. For projects without: funds are held in escrow until claimed, or returned to the SPARK pool after 12 months unclaimed.

### 3.3 Compliance Dashboard

A public web interface showing all registered SPARK Pledge projects and their current status, commercialization trigger status and grace period countdown, annual SPARK Report submissions, fund flow transparency, and dependency funnel allocation records.

Any stakeholder — funders, community members, downstream projects — can verify compliance without requiring trust in OpenSeed as an intermediary.

### 3.4 SPARK Funding Pool

A multi-sig treasury that receives initial seed funding from this EF grant and community donations, receives 4% recursive contributions from commercialized projects, and allocates to new SPARK Pledge projects via a review process. OpenSeed operates as the initial steward, with plans to decentralize governance in Phase 2.

### 3.5 Chinese-Speaking Community Pilot (Cohort 1)

Using OpenBuild's developer network, we recruit and onboard an initial cohort of 10–20 open-source projects from the Chinese-speaking community. Projects span Web3 tooling, developer infrastructure, AI tooling, and general open-source software. The cohort is not restricted to Ethereum-native projects.

Each project receives Pledge onboarding support, technical integration assistance, visibility within the SPARK Registry, and eligibility for funding from the SPARK pool.

**Cohort 1 Screening Criteria**

Project selection requires affirmative answers to three questions:

1. Does the project have identifiable long-term maintainers with multi-year contribution history?
2. Is the project's core value rooted in judgment and ecosystem position, rather than purely functional code that AI could replicate?
3. Has the project's maintenance burden held steady or increased with AI tool adoption — evidence of real human maintenance work?

These criteria select for projects whose value survives and becomes more important in an AI-saturated environment.

---

## 4. Obligation Structure

To protect early-stage projects while ensuring eventual contribution:

| Annual Revenue | SPARK Obligation |
|----------------|-----------------|
| Below $50,000 | Not triggered |
| $50K to $500K | 2% (reduced early-stage rate) |
| $500K to $5M | 4% (standard rate) |
| Above $5M | 4% plus governance participation |

Token projects: 4% escrowed at TGE regardless of revenue stage. Tokens represent future upside, not current revenue.

Grace period: 3 years from commercialization trigger. Obligations accrue from Day 1 and must be settled in full by end of Year 3.

---

## 5. Why OpenSeed

### 5.1 Community Roots

OpenSeed was founded by the teams behind OpenBuild, KAIYUANSHE (China's largest open-source alliance), PyChina, and RustCC. These organizations collectively represent hundreds of thousands of developers across China, Taiwan, Hong Kong, and the broader Chinese-speaking diaspora.

OpenBuild has onboarded thousands of developers into the Ethereum ecosystem through developer education, hackathons, and project incubation. This existing trust network is the distribution channel for SPARK adoption in Phase 1.

### 5.2 Direct Involvement in SPARK Design

The OpenSeed team has been part of the Signal group initiated by Vitalik Buterin since April 2025, participating directly in the mechanism design discussions that produced the current SPARK Pledge draft. We are building on direct design knowledge, not a secondhand interpretation.

### 5.3 Relationship to the SPARK Working Group

We view our role as threefold: the first and primary implementation of the SPARK Pledge infrastructure; a feedback loop back to the working group, where our pilot data informs mechanism refinement; and a steward rather than an owner. The SPARK Pledge specification is open. Any organization can implement it. We are building the reference implementation.

### 5.4 Complementary to Existing Mechanisms

| Mechanism | Funding Source | Recursive | Scope |
|-----------|---------------|-----------|-------|
| Gitcoin QF | Community donations | No | Web3, English-first |
| Optimism RetroPGF | OP token inflation | No | Optimism ecosystem |
| Protocol Guild | Project donations | No | Ethereum core devs only |
| Drips Network | Any donor | Partial | Any, manual config |
| Open Source Pledge | Company budgets | No | Any, voluntary |
| SPARK / OpenSeed | Upside % pledge | Yes | Any open source, global |

OpenSeed is the implementation layer for a mechanism none of the above provides.

---

## 6. Budget and Timeline

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

**Month 1–2 (May–June 2025): Foundation**
Finalize smart contract architecture. Deploy SPARK Pledge Registry v0.1 to testnet. Launch Pledge onboarding website. Begin Cohort 1 recruitment via OpenBuild network.

**Month 3–4 (July–August 2025): Core Build**
Ethereum Mainnet deployment of Registry contract. Dependency Funnel v0.1 covering npm and PyPI ecosystems. Compliance Dashboard v0.1 live. Cohort 1: 10+ projects onboarded and pledged.

**Month 5–6 (September–November 2025): Pilot and Validation**
First SPARK Report cycle from Cohort 1 projects. Dependency Funnel processing first allocations. Public launch open to global projects. Grant completion report to EF with full metrics.

---

## 7. Success Metrics

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

## 8. Long-Term Vision

This grant funds the infrastructure build and pilot validation. The path to self-sustainability runs through the recursive mechanism itself: as Cohort 1 projects commercialize, 4% flows back into the SPARK pool. If even three of the twenty Cohort 1 projects reach commercial scale and honor their pledge, the pool becomes self-replenishing without further grants. That is the ultimate validation of the mechanism.

OpenSeed generates operational revenue through optional premium Registry services, ecosystem partnerships, and grant support facilitation. The on-chain infrastructure is permissionless and can outlive OpenSeed as an organization.

In Phase 2 (2026), we expand the cohort to 100+ projects globally, integrate with Gitcoin Grants and RetroPGF as a complementary compliance layer, transition SPARK pool governance to on-chain DAO, and publish open-source tooling for other ecosystems to fork and deploy their own SPARK implementations.

All infrastructure built with this grant will be open-sourced under MIT license: smart contracts verified on GitHub and Etherscan, the Dependency Funnel algorithm fully open and auditable, the dashboard frontend open-source, and SPARK Pledge tooling forkable by any ecosystem.

---

## 9. Team

**Richard Lin (林旅强)** — Co-founder, OpenSeed. Co-founder of KAIYUANSHE, China's leading vendor-neutral open-source community and the first Chinese member of the Open Source Initiative (OSI). Open Source Ecosystem Lead at Datastrato.ai. Previously Head of Developer Ecosystem at Huawei Cloud and 01.AI. Long-term participant in Apache, Linux Foundation, and OSI communities.

**Ian Xu (许银)** — Co-founder, OpenSeed. Board Director of KAIYUANSHE. Founder of OpenBuild community. Organizer of RustCC and PyChina communities. Member of the SPARK working group Signal channel since April 2025.

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
