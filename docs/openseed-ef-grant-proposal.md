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

Open source has always been sustained by something other than code: the long-term presence of maintainers, the trust built over years of consistent work, and the dependency relationships that quietly hold up entire ecosystems. These things were always what mattered. They were just hard to measure, so funding mechanisms ignored them.

AI has made this impossible to ignore. When code generation becomes cheap, what remains scarce is exactly what was always valuable: projects that have survived for years, maintainers who have stayed, dependencies that thousands of real projects rely on. SPARK is not a response to the AI moment. It is a funding mechanism built around the signals that have always indicated real open-source value — and that AI cannot fake.

The SPARK Pledge is a recursive open-source funding framework co-developed with Vitalik Buterin and the SPARK working group. It exists today only as a draft document circulating in a private Signal group. No implementation infrastructure exists. No project has formally adopted it. The mechanism cannot propagate on its own.

OpenSeed is applying for $100,000 to build the infrastructure that turns SPARK from a concept into a working system: an on-chain Pledge Registry, a Dependency Funding Funnel, a compliance Dashboard, and a verified pilot cohort of open-source projects from the Chinese-speaking developer community. Chinese-speaking developers make up one of the largest developer populations in the world and are significantly underserved by existing Ethereum-ecosystem funding mechanisms.

OpenSeed is also developing the SPARK License — extending this infrastructure to cover AI-era usage patterns that existing licenses were never designed to address.

This grant funds the first real-world test of SPARK's recursive model. If it works, the infrastructure we build will be open, permissionless, and replicable globally.

---

## 2. Background and Problem Statement

### 2.1 The Open Source Sustainability Crisis

Open source software underlies every layer of the Ethereum ecosystem: wallets, clients, developer tooling, libraries, and protocols. The funding model for open-source development, however, remains broken:

- Most funding is one-off grants with no continuity
- Projects that succeed commercially rarely reinvest into the commons they depended on
- Critical infrastructure is maintained by underpaid or volunteer contributors
- Existing mechanisms (Gitcoin Grants, RetroPGF, Protocol Guild) serve parts of the problem but leave significant gaps, particularly for non-token projects, non-English-speaking communities, and the recursive dependency layer

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

### 2.4 Why Existing Licenses Don't Solve This

The open source license landscape was designed for a different problem. MIT and Apache give users maximum freedom. GPL ensures code derivatives remain open. BSL and Commons Clause restrict commercial use. None of them create positive obligations: a project that becomes commercially successful owes nothing back to the projects it depended on.

The AI era adds a second gap. When developers use AI coding tools, the resulting code may be deeply informed by open source projects — their algorithms, patterns, architectural decisions — with no explicit dependency recorded anywhere. deps.dev can map what packages a project imports. It cannot map what ideas and patterns an AI model absorbed during training and reproduced during code generation.

SPARK License is designed to close both gaps. It is developed in parallel with the Pledge infrastructure and is covered in Section 4.6.

### 2.5 The AI Inflection Point: Why Open Source Funding Matters More Now

Open source value was never really about code volume. It was about projects that stayed alive, maintainers who kept showing up, and dependency relationships that quietly became load-bearing infrastructure for entire ecosystems. The problem was that these signals were difficult to measure systematically, so most funding mechanisms fell back on proxies: commit counts, star ratings, PR velocity.

AI has broken those proxies entirely. It has also made the underlying truth harder to ignore.

**Research findings:**

A July 2025 randomized controlled study by METR recruited 16 experienced contributors from major open-source repositories and found that AI tools *increased* task completion time by 19% for experienced developers. AI tooling slowed down experts working on complex, established codebases, because the cost of understanding, verifying, and correcting AI output exceeded the generation savings.

Meanwhile, AI tools have flooded open-source repositories with low-quality AI-generated pull requests. By early 2026, projects like curl, ghostty, and tldraw had closed or severely restricted external contributions. AI lowers the barrier to contributing code, but does not lower the cost of reviewing it, shifting maintainers from builders to gatekeepers.

**The value shift:**

AI commoditizes code production. What becomes scarce is:
- Long-term maintenance commitment (years, not sprints)
- Architectural judgment and system-level understanding
- Community trust and ecosystem coordination
- The human judgment that determines what code should exist at all

These were always the things that mattered. AI has made them newly legible as scarce resources.

SPARK is designed to fund exactly these. A mechanism that weights longevity, real dependency depth, and maintainer continuity is not a reaction to AI — it is what a well-designed open-source funding mechanism should have looked like all along. The AI era just makes the case undeniable.

**Measurement in the AI era:**

Existing open-source metrics (lines of code, commit counts, PR volume) are becoming noise in the AI era. OpenSeed's Dependency Funnel is built around signals that AI cannot fake: project longevity, real dependency depth, maintainer continuity, and issue response quality, not LOC.

This makes OpenSeed relevant not just as a funding mechanism, but as a framework for measuring open-source value in the AI era.

The SPARK License addresses the measurement problem at the source. By defining AI-era usage — training data, retrieval-augmented generation, AI coding tool references — as a first-class category requiring disclosure, it makes the dependency graph legible in ways that deps.dev alone cannot achieve. The License and the Funnel are designed to work together: disclosed AI dependencies feed directly into Funnel weight calculations, closing the loop between usage and funding.

---

## 3. Why OpenSeed

### 3.1 Origin and Community Roots

OpenSeed was founded by the teams behind OpenBuild, KAIYUANSHE (China's largest open-source alliance), PyChina, and RustCC. These organizations collectively represent hundreds of thousands of developers across China, Taiwan, Hong Kong, and the broader Chinese-speaking diaspora.

OpenBuild alone has onboarded thousands of developers into the Ethereum ecosystem through developer education, hackathons, and project incubation. This existing trust network is the distribution channel for SPARK adoption in Phase 1.

### 3.2 Direct Involvement in SPARK Design

The OpenSeed team has been part of the Signal group initiated by Vitalik Buterin since April 2025, participating directly in the mechanism design discussions that produced the current SPARK Pledge draft. We are not building on a secondhand interpretation of SPARK. We are building on direct design knowledge.

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

- Records each project's Pledge adoption as an on-chain attestation (using EAS, Ethereum Attestation Service)
- Stores dynamic pledge parameters (default: 4% + 1%, adjustable per project within bounds)
- Tracks commercialization trigger events (TGE, revenue threshold crossed)
- Manages grace period timers
- Provides a public, permissionless read interface

For token-issuing projects: the Registry integrates with TGE contracts to automatically escrow 4% of token supply at issuance. No manual action is required after Pledge adoption.

For non-token projects: Pledge adoption is recorded on-chain, with obligations fulfilled via annual self-reporting and manual transfers to the SPARK funding pool.

The Registry is designed to support both Pledge adoption and License adoption as distinct but interoperable registration types. A project can register under either or both.

### 4.2 Dependency Funding Funnel

The 1% dependency allocation requires knowing which upstream projects a given project depends on, and how to weight them. We build:

**Dependency Graph Resolution**
- Integrates with Google's deps.dev API (covering npm, PyPI, Maven, Go, Cargo — 5 major ecosystems)
- Resolves transitive dependencies recursively
- Maps GitHub repositories to on-chain identities (via EAS or ENS)

**Allocation Algorithm (v1.1, AI-Era Adapted)**

Traditional metrics like lines of code (LOC) are no longer reliable signals of open-source value when AI tools can generate thousands of lines in minutes. OpenSeed's Funnel uses six dimensions that AI cannot easily game:

- **Longevity (25%):** Years the project has been actively maintained. AI can clone a library overnight; it cannot fake 5 years of maintenance history. Source: GitHub `created_at`
- **Real Usage Depth (30%):** Number of downstream projects that actually depend on this package. Not stars (gameable), but dependents. Source: deps.dev dependents count
- **Maintainer Continuity (25%):** How long the top-3 contributors have been continuously active. Measures human long-term commitment. Source: GitHub contributor API
- **Issue Responsiveness (10%):** Average issue close time and close rate over 12 months. Proxy for maintainer judgment quality. Source: GitHub Issues API
- **Dependency Depth Decay (10%):** Direct dependencies weighted higher than transitive ones. Preserved from original design.
- **AI Usage Depth (bonus weight):** Disclosed AI dependencies from AI_DEPENDENCIES.md submissions and SPARK Protocol tool integrations. Projects identified as implicit dependencies in AI-generated code receive additional weight in the Funnel, capturing value that the explicit dependency graph misses.

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
- License adoption status and AI disclosure history
- AI_DEPENDENCIES.md submission records

This is the trust layer. Any stakeholder — funders, community members, downstream projects — can verify compliance without requiring trust in OpenSeed as an intermediary.

### 4.4 SPARK Funding Pool

A multi-sig treasury (transitioning to on-chain governance post-pilot) that:

- Receives initial seed funding (this EF grant and community donations)
- Receives 4% recursive contributions from commercialized projects
- Allocates to new SPARK Pledge projects via a review process
- OpenSeed operates as the initial steward, with plans to decentralize governance in Phase 2

### 4.5 Chinese-Speaking Community Pilot (Cohort 1)

Using OpenBuild's developer network, we recruit and onboard an initial cohort of 10–20 open-source projects from the Chinese-speaking community:

- Projects spanning Web3 tooling, developer infrastructure, AI tooling, and general open-source software
- Not restricted to Ethereum-native projects. Any open-source project with genuine usage qualifies
- Each project receives Pledge onboarding support, technical integration assistance, visibility within the SPARK Registry, and eligibility for funding from the SPARK pool
- Cohort 1 is the proof-of-concept: does the mechanism work in a real community? Do projects adopt it? Do funded projects pay it forward?

**Cohort 1 Screening Criteria (AI-Era Adapted)**

Cohort 1 project selection requires affirmative answers to four criteria:

1. Does the project have identifiable long-term maintainers? (Named individuals with multi-year contribution history, not anonymous or bulk AI-assisted commits)
2. Is the project's core value rooted in judgment and ecosystem position, rather than purely functional code that AI could replicate in months?
3. Has the project's maintenance burden increased or held steady with AI tool adoption? (Projects facing increased review burden are demonstrably doing real human maintenance work)
4. Is the project willing to adopt the SPARK License at publication? (Cohort 1 projects are encouraged — not required — to publish new work under SPARK License, making them the first reference implementations.)

These four criteria intentionally select for projects whose value holds up — and becomes more important — as AI tooling proliferates.

### 4.6 SPARK License

SPARK License is a software license that does two things traditional licenses do not: it attaches economic obligations to commercial success, and it defines AI-era usage as a first-class category requiring disclosure.

**License Structure**

SPARK License 1.0 has three tiers, triggered by project stage:

**Tier 0 — Pre-commercial (default)**

Identical to MIT. No obligations active. Full freedom to use, modify, distribute.

**Tier 1 — Commercially active**

Triggered by: annual revenue exceeding $50,000, or token issuance (TGE).

Obligations:
- 4% of economic upside directed to SPARK-aligned projects (via Registry)
- 1% of economic upside directed to declared dependencies
- Annual SPARK Report submission
- AI usage disclosure (AI_DEPENDENCIES.md and SPARK metadata standard)

**Tier 2 — Scaled (> $5M annual revenue)**

All Tier 1 obligations, plus:
- Participation in SPARK governance (multi-sig or DAO, depending on phase)
- Enhanced dependency audit (not self-reported, third-party verified)

**Grace period:** 3 years from commercialization trigger. Obligations accrue from Day 1 and must be settled by end of Year 3.

**Token projects:** 4% escrowed at TGE regardless of revenue stage.

**Relationship to SPARK Pledge**

SPARK License and SPARK Pledge are complementary entry points into the same ecosystem:

| | SPARK Pledge | SPARK License |
|--|--|--|
| Adoption mechanism | Voluntary commitment | Applied to code at publication |
| Who is bound | The project that adopts it | Anyone who uses the licensed code commercially |
| Propagation | Recipients must also adopt | Viral through code reuse |
| Enforcement | Reputation + social | Reputation + legal |
| AI usage coverage | No | Yes |

Together they create two vectors of growth:
- **Pledge:** ideologically motivated projects actively joining the ecosystem
- **License:** dependency-driven propagation through the broader software supply chain

A project can adopt both. A project that only uses SPARK-licensed code (but hasn't signed the Pledge) is still bound by the License obligations at commercialization.

**Enforcement Model**

SPARK License enforcement relies on three layers, not one:

**Layer 1: On-chain reputation** — SPARK Registry status is public. A project in `Defaulted` status cannot receive SPARK pool funding, cannot display the SPARK badge, and is publicly searchable as non-compliant. For projects that depend on community trust — which is most open source projects — this is a real cost.

**Layer 2: Ecosystem pressure** — SPARK-aligned projects and funders can make adoption of the license a condition of funding, integration, or partnership. This creates network effects: as SPARK coverage grows, being outside it becomes a liability.

**Layer 3: Legal enforceability (long-term)** — The commercial obligation clauses in SPARK License are designed to be legally enforceable, with jurisdictional coverage expanding as case law develops around similar mechanisms (BSL, Commons Clause). OpenSeed is working with legal counsel to ensure the license text is enforceable in key jurisdictions (US, EU, Taiwan, Singapore) from day one.

The honest assessment: Layer 3 will be weak initially. Layers 1 and 2 carry most of the weight in the near term. This is the same trajectory as GPL — the legal theory preceded practical enforcement by years. The mechanism works before the courts have weighed in.

### 4.7 AI Usage Visibility Toolchain

AI coding tools have introduced a structurally new problem: when a developer uses Cursor or Copilot to generate code, that code may be deeply informed by open source projects — their algorithms, patterns, architectural decisions — without any explicit import or attribution. The dependency exists; it just isn't visible. Four mechanisms address this, in order of near-term feasibility:

**Mechanism 1: SPARK Metadata Standard**

Every SPARK-licensed project places a `SPARK.md` file in the repository root — a natural-language declaration for AI agents, stating project identity, license type, and AI usage disclosure requirements. Tools like Cursor, GitHub Copilot, Continue, and Sourcegraph feed `.md` files as context when indexing repositories. `SPARK.md` lets the agent understand and follow disclosure requirements without relying on any programmatic parsing protocol.

When an AI tool references a SPARK-licensed project during code generation, it can surface a disclosure notice, log an anonymized usage event to the Registry, and include an attribution comment in generated code.

**SPARK Metadata Standard as a standalone initiative**

The `SPARK.md` spec is designed to exist as an open standard independent of the SPARK License — any open source project can place this file without adopting SPARK License, simply declaring "this project exists; please attribute when AI tools reference it." The adoption bar is as low as `robots.txt`: drop a file, declare an intent.

The precedent is `security.txt`. In 2017, two security researchers proposed a simple idea: place a plain-text file at `/.well-known/security.txt` telling security researchers where to report vulnerabilities. No complex protocol, no standards body, just a convention. It spread quickly — Google, GitHub, and Facebook adopted it — and in 2022 it was published by the IETF as RFC 9116, a formal internet standard.

`SPARK.md` follows the same path. OpenSeed drives adoption of this spec under the name **SPARK Agent Disclosure Standard**, independent of the SPARK License adoption curve. Once it becomes common practice, the disclosed dependency data feeds back as input to Dependency Funnel weight calculations, closing the loop between AI usage and open source funding.

**Mechanism 2: Declarative AI Dependency Reporting**

For projects that use AI coding tools, SPARK License requires an annual `AI_DEPENDENCIES.md` declaration — a best-effort estimate of which open source projects materially informed AI-generated code. This is a self-attestation, not an audit, acknowledged to be imprecise. The SPARK toolchain provides a scanner that analyzes import patterns and code structure, cross-references against the SPARK Registry, and generates a draft `AI_DEPENDENCIES.md` for developer review. Submissions update dependency weights in the Funding Funnel, directing a portion of the 1% obligation toward projects identified as AI-era dependencies.

**Mechanism 3: AI Tool Protocol Integration**

The highest-leverage intervention is at the AI tool layer. A SPARK Protocol integration checks at code generation time whether referenced code originates from SPARK-licensed repositories, logs anonymized usage events (project identity, not user identity) to the Registry, and provides developers with a one-click disclosure flow. Target integrations in priority order: Continue.dev (open source, fastest to integrate), Cursor (largest developer mindshare), GitHub Copilot (requires Microsoft partnership, long-term goal). The data model is privacy-preserving by design: usage frequency informs Funnel weights; no individual developer is identified or tracked.

**Mechanism 4: Semantic Code Fingerprinting**

The longest-term mechanism. Embed statistically detectable patterns into SPARK-licensed codebases — structural regularities in algorithm design, test coverage patterns, and naming conventions that survive transformation by AI tools. When AI-generated code contains these patterns at above-baseline frequency, it is evidence (not proof) of training influence from that project. This is currently a research-stage capability demonstrated by academic groups at MIT CSAIL and Stanford; productionizing it at license-enforcement scale is a 3–5 year horizon. OpenSeed will monitor this space and incorporate fingerprinting capabilities into the toolchain as the research matures.

---

## 5. What We Are NOT Building

To maintain focus and credibility:

- **Not building a blockchain or L2.** Deploying on Ethereum Mainnet
- **Not auditing project revenues.** Self-reporting + community accountability
- **Not replacing Gitcoin or RetroPGF.** Complementary, not competitive
- **Not restricting to Web3 projects.** Open to any open-source project
- **Not claiming to solve all of open-source funding.** SPARK is one mechanism, not a silver bullet
- **Not solving AI training data attribution at the legal level** — SPARK License creates disclosure obligations and ecosystem norms; it does not attempt to resolve the unsettled legal questions around AI training and copyright.

---

## 6. Budget Breakdown

| Category | Amount | Notes |
|----------|--------|-------|
| Smart contract development | $30,000 | Pledge Registry + Funnel contracts, audit |
| Frontend / Dashboard | $20,000 | Registry UI, Compliance Dashboard, Pledge onboarding flow |
| Dependency Funnel integration | $15,000 | deps.dev API integration, allocation algorithm |
| Pilot cohort program | $20,000 | Project onboarding, support, first-round SPARK pool seeding |
| Operations & legal | $5,000 | Entity setup, documentation, community management |
| SPARK License legal review | $5,000 | License text drafting, jurisdictional review (US, EU, Singapore) |
| AI toolchain & SPARK.json standard | $5,000 | Scanner tool, metadata standard, Continue.dev integration scoping |
| **Total** | **$100,000** | |

---

## 7. Timeline

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
- Public launch, open to global projects
- Grant completion report to EF with full metrics

---

## 8. Success Metrics

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

## 9. Long-Term Vision and Sustainability

This $100K grant funds the infrastructure build and pilot validation. After 6 months:

**Self-sustainability path:**
- As Cohort 1 projects commercialize, 4% flows back into the SPARK pool. The recursive mechanism starts proving itself
- OpenSeed generates operational revenue through optional premium Registry services, ecosystem partnerships, and grant support facilitation
- The on-chain infrastructure is permissionless. It can outlive OpenSeed as an organization

**Phase 2 (2026):**
- Expand Cohort to 100+ projects globally
- Integrate with Gitcoin Grants and RetroPGF as a complementary compliance layer
- Transition SPARK pool governance to on-chain DAO
- Publish open-source tooling for other ecosystems to fork and deploy their own SPARK implementations

**Recursive Validation:**

If even 3 of the 20 Cohort 1 projects reach commercial scale and honor their 4% pledge, the SPARK pool becomes self-replenishing without further grants. That is the validation the mechanism needs.

---

## 10. Team

**Richard Lin (林旅强)** — Co-founder, OpenSeed. Co-founder of KAIYUANSHE (China's Open Source Society), China's leading vendor-neutral open-source community and the first Chinese member of the Open Source Initiative (OSI). Open Source Ecosystem Lead at Datastrato.ai (Silicon Valley AI/Big Data startup). Previously Head of Developer Ecosystem at Huawei Cloud and 01.AI (LLM). Has advised multiple open-source and infrastructure projects on global expansion. Long-term participant in international open-source communities including Apache, Linux Foundation, and OSI.

**Ian Xu (许银)** — Co-founder, OpenSeed. Board Director of KAIYUANSHE. Founder of OpenBuild community. Organizer of RustCC and PyChina communities. Member of the SPARK working group Signal channel since April 2025.

**SPARK Working Group (earliest Pledge discussants):** Vitalik Buterin, Liraz Siri, Mario Behling, Richard Lin, QZ, and other members of the original SPARK Signal group.

Our role within the working group:

1. The first and primary implementation of the SPARK Pledge infrastructure
2. A feedback loop back to the working group. Our pilot data informs mechanism refinement
3. A steward, not an owner. The SPARK Pledge specification is open; any organization can implement it; we are building the reference implementation

We are not claiming exclusive rights to SPARK. We are asking for resources to build what needs to be built.

---

## 11. Open Source Commitment

All infrastructure built with this grant will be open-sourced under MIT license:
- Smart contracts: verified and open on GitHub and Etherscan
- Dependency Funnel algorithm: fully open and auditable
- Dashboard frontend: open-source
- SPARK Pledge tooling: forkable by any ecosystem

Infrastructure built to support open-source must itself be open-source.

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
