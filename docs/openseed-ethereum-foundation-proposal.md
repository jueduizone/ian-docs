---
description: "OpenSeed proposal to the Ethereum Foundation: AI-era open-source attribution and dependency funding infrastructure"
hidden: true
---
# OpenSeed: AI-Era Open-Source Attribution and Dependency Funding Infrastructure

## Proposal to the Ethereum Foundation Ecosystem Support Program

**Requested grant:** USD 100,000  
**Proposed duration:** 6 months  
**Funding structure:** milestone-based payments  
**Applicant:** OpenSeed  
**Primary outputs:** open-source software, open specifications, public reports, and an Ethereum-based pilot for dependency funding

## 1. Executive Summary

OpenSeed is an open-source attribution and funding infrastructure project for the AI era, starting with an Ethereum-based pilot.

The core problem is simple: AI is changing how open-source work is reused. Developers can reference, fork, rewrite, or regenerate open-source code through AI tools without leaving the traditional traces that current dependency graphs rely on: package manifests, imports, fork histories, or direct repository links.

Ethereum has spent years building the strongest public-goods and open-source funding culture in crypto. The next step is to make funding flows more dependency-aware, transparent, and reproducible.

OpenSeed proposes to build a working reference implementation for that next step:

1. **Pledge Registry** — a public registry for projects that commit future value back to open-source public goods and upstream dependencies.
2. **Dependency Funnel** — an explainable dependency analysis and allocation recommendation engine.
3. **SPARK.md** — a lightweight repository-level attribution and funding declaration file.
4. **Public Accountability Dashboard** — a public interface showing pledges, dependency reports, funding recommendations, distributions, and claim status.
5. **SPARK Seed Pool Pilot** — a small real funding pilot that distributes seed funds to upstream maintainers through an auditable Ethereum-based workflow.
6. **SPARK License / Addendum research** — early legal and community review materials for pledge-based and AI attribution clauses.

We are requesting **USD 100,000 over 6 months**, paid across milestones, to build the v0.1 system, onboard a first cohort of 10–15 projects, generate public dependency reports, run a simulated allocation round, complete one small real funding distribution, and publish the methodology as open infrastructure for the Ethereum ecosystem and beyond.

## 2. Why This Fits the Ethereum Foundation Now

The Ethereum Foundation Ecosystem Support Program currently emphasizes work that strengthens Ethereum’s foundations, enables builders, and produces free, open-source, non-commercial public goods. Its current grant model is structured around Wishlist and RFP pathways, with evaluation based on technical approach, ecosystem impact, open-source availability, budget discipline, applicant experience, and alignment with Ethereum values.

OpenSeed is aligned with that direction in four ways.

### 2.1 It strengthens Ethereum’s open-source funding infrastructure

Ethereum depends on a large stack of open-source infrastructure: clients, cryptographic libraries, developer tools, package ecosystems, educational resources, research outputs, and community-maintained tooling. Many of these dependencies are underfunded because their value is diffuse and difficult to attribute.

OpenSeed does not propose another grant list. It proposes a mechanism for identifying upstream dependencies, explaining why they matter, and making funding flows more transparent.

### 2.2 It moves funding from social signaling toward dependency evidence

Vitalik has argued that the Ethereum ecosystem should talk less about vague “public goods funding” and more about “open source funding,” because open source has clearer definitions and is less vulnerable to social desirability bias.

OpenSeed follows that direction. It focuses on visible artifacts: repositories, maintainers, dependency graphs, declarations, reports, and public funding records. The goal is not to decide who is morally deserving. The goal is to make open-source influence more legible.

### 2.3 It addresses a known sustainability gap among Ethereum public goods

The Ethereum Foundation’s Funding Coordination work has pointed out a recurring pattern: critical open-source teams often have strong engineering output but fragile funding and operational runway. Everyone depends on shared infrastructure, but few actors want to be the first or only funder.

OpenSeed complements this work by creating a practical dependency-funding layer: if a project benefits from upstream open-source work, the project can declare that relationship, publish a dependency report, and route part of its future value back to maintainers.

### 2.4 It produces reusable public infrastructure, not a closed product

All grant-funded outputs will be open-source or freely available:

- Registry code
- Dependency Funnel methodology and implementation
- SPARK.md specification
- GitHub Action / CLI helpers
- Dashboard frontend
- Cohort reports
- SPARK Pledge Addendum v0.1
- SPARK AI Attribution Clause v0.1
- License compatibility memo

Other communities, foundations, ecosystems, and projects should be able to fork, inspect, and reuse the system.

## 3. Problem Statement

Current open-source funding mechanisms rely on incomplete signals.

They often see:

1. Who submitted code
2. Who appears in package manifests
3. Who is visible enough to write grant applications
4. Who has social reach inside a funding community

They often miss:

1. Transitive dependencies that are deeply relied upon but rarely named
2. Maintainers of boring but critical infrastructure
3. Libraries used indirectly through frameworks and templates
4. Architectural patterns or implementations reused through AI-assisted development
5. Projects that are widely referenced by AI tools but not imported as packages
6. Upstream maintainers without grant-writing bandwidth

AI makes this gap worse. Code generation lowers the cost of producing downstream software, but it can erase the trail of upstream influence. The work that becomes more valuable is often the work that becomes less visible: stable maintenance, security review, documentation, long-term trust, and design judgment.

Ethereum needs a better mechanism for answering five practical questions:

1. Which open-source projects does this project depend on?
2. Which maintainers are behind those dependencies?
3. Which dependencies should be considered for funding?
4. How was the allocation recommendation produced?
5. How can the community verify that funds were distributed?

OpenSeed is designed to answer these questions with a working v0.1 system.

## 4. Proposed Solution

OpenSeed is an attribution, pledge, allocation, and public accountability system.

It is not a legal enforcement system. It is not an objective truth machine for dependency value. It is a transparent approximation layer that makes dependency funding easier to discuss, verify, and repeat.

### 4.1 Pledge Registry

The Pledge Registry records which projects have made a public commitment to return future value to open-source public goods and upstream dependencies.

Initial functions:

- Project registration
- GitHub, domain, and Ethereum wallet identity binding
- Pledge parameter recording
- Grace period and trigger recording
- Annual report status
- Public registry view
- Optional Ethereum attestation for public timestamping

Example pledge parameters:

- Public Goods Allocation: a configurable share for broader open-source or public-goods pools
- Dependency Allocation: a configurable share for direct or indirect upstream dependencies
- Grace Period: time before the pledge activates after commercialization
- Trigger: revenue, TGE, fundraising, commercial launch, annual budget, or other project-specific trigger

The first version will treat common values such as 4% public-goods allocation and 1% dependency allocation as templates, not fixed rules.

### 4.2 Dependency Funnel

The Dependency Funnel generates dependency reports and allocation recommendations.

Initial scope:

- Scan package manifests for npm, PyPI, Cargo, Go, and Maven
- Expand direct and transitive dependencies
- Map package dependencies to GitHub repositories where possible
- Identify maintainers and funding links
- Estimate dependency relevance with explainable signals
- Allow projects to add manually declared dependencies, including AI reference or non-package dependencies
- Output a public Dependency Report for each cohort project

Initial weighting signals:

- Direct vs transitive dependency distance
- Downstream usage signal
- Project age and continuity
- Maintainer continuity
- Issue and release activity
- Criticality to the applicant project
- Manual declaration by the cohort project
- AI reference declaration where applicable

The Funnel is a recommendation engine. Projects can accept, adjust, or comment on recommendations before distribution.

### 4.3 SPARK.md

`SPARK.md` is a repository-level attribution and funding declaration file.

It should be as simple to understand as `README.md`, `LICENSE`, `SECURITY.md`, or `FUNDING.yml`.

Initial fields:

```yaml
project:
  name: example-project
  repository: https://github.com/example/project
  maintainers:
    - name: Alice
      github: alice

funding:
  accepts_funding: true
  preferred_methods:
    - github_sponsors
    - opencollective
    - ethereum
  wallet: 0x...

attribution:
  ai_reference_allowed: true
  attribution_required: true
  preferred_citation: "example-project by Alice"

spark:
  pledge_status: registered
  public_goods_allocation: 4%
  dependency_allocation: 1%
  grace_period: 36 months

upstream:
  declared_dependencies:
    - https://github.com/example/upstream-lib
```

Grant-funded outputs will include:

- SPARK.md v0.1 specification
- Template files
- Validation rules
- GitHub Action
- CLI helper
- Badge and documentation

### 4.4 Public Accountability Dashboard

The Public Accountability Dashboard answers two questions:

1. What did a project pledge?
2. Where did the money go?

Dashboard views:

- Registered projects
- Pledge parameters
- Cohort participation
- Dependency reports
- Allocation recommendations
- Distribution status
- Maintainer claim status
- Public funding records
- Methodology documentation

The dashboard is intentionally not called a compliance dashboard. OpenSeed creates public accountability, not regulatory enforcement.

### 4.5 SPARK Seed Pool Pilot

The SPARK Seed Pool is a small pilot fund used to test the full workflow.

Process:

1. Select 10–15 cohort projects
2. Generate dependency reports
3. Produce allocation recommendations
4. Ask cohort projects to confirm or annotate recommendations
5. Contact upstream maintainers
6. Verify claim information
7. Distribute a small amount of seed funding
8. Publish public records and a cohort report

The first pilot prioritizes proving the mechanism, not maximizing funding size.

### 4.6 SPARK License / Addendum Research

The grant will also produce early legal and governance materials:

1. `SPARK License Draft v0.1`
2. `SPARK Pledge Addendum v0.1`
3. `SPARK AI Attribution Clause v0.1`
4. `License compatibility memo`
5. Maintainer and OSPO FAQ

The goal in this phase is review, not broad license adoption. Mature projects can start with `SPARK.md` and the Pledge Addendum. The License Draft is for feedback from maintainers, communities, OSPOs, foundations, and legal advisors.

## 5. Why Start With Ethereum

Ethereum is the right first funding and accountability backend for OpenSeed.

1. **Public-goods culture:** Ethereum has a long history of grants, retroactive funding, quadratic funding, and open-source support.
2. **Real dependency surface:** Ethereum projects rely heavily on open-source software and shared infrastructure.
3. **Transparent records:** Ethereum is suitable for public commitments, attestations, multisig distributions, and verifiable funding records.
4. **Programmable funding:** Stablecoins, smart contracts, attestations, and existing tools such as Safe and EAS make funding workflows testable without inventing a new financial stack.
5. **Ecosystem relevance:** Dependency funding is directly relevant to developer tooling, security infrastructure, research libraries, community resources, and long-term ecosystem resilience.

OpenSeed does not make Ethereum the only possible implementation. Ethereum is the first pilot because it has the strongest combination of values, tooling, and real need.

## 6. Cohort Design

OpenSeed will select 10–15 projects for Cohort 1.

Target project types:

- Ethereum developer tools
- Web3 infrastructure tools
- AI developer tools
- Open-source libraries used by Ethereum builders
- Community-maintained technical resources
- Projects connected to Chinese-speaking Ethereum and open-source communities

Selection criteria:

- Active maintainers
- Public repository
- Real downstream usage or clear ecosystem relevance
- Willingness to add `SPARK.md`
- Willingness to review and publish a dependency report
- Willingness to participate in a simulated allocation exercise
- For pledge candidates: willingness to explore a Pledge Addendum or public commitment

Cohort projects receive:

- SPARK.md onboarding support
- Dependency Report
- Pledge / Addendum assistance
- Public dashboard listing
- Eligibility for the first seed funding distribution
- Community and ecosystem visibility

## 7. Milestones and Payment Schedule

We propose **USD 100,000** in milestone-based payments across 6 months.

| Milestone | Timeline | Payment | Deliverables |
| --- | --- | ---: | --- |
| M1: Specification and architecture | Month 1 | $20,000 | Technical architecture, SPARK.md v0.1 draft, registry schema, cohort selection criteria, public project repo |
| M2: Registry and SPARK.md tooling | Month 2 | $20,000 | Pledge Registry v0.1, GitHub/domain/wallet identity flow, SPARK.md templates, validator, GitHub Action / CLI prototype |
| M3: Dependency Funnel and first reports | Months 3–4 | $25,000 | Dependency Funnel v0.1 covering npm, PyPI, Cargo, Go, Maven; 5+ preliminary Dependency Reports; methodology notes |
| M4: Dashboard and simulation round | Month 5 | $20,000 | Public Accountability Dashboard v0.1, 10+ cohort reports, simulated allocation round, SPARK Pledge Addendum v0.1 |
| M5: Real distribution and final report | Month 6 | $15,000 | One small real funding distribution, maintainer claim workflow, public cohort report, SPARK.md spec, Dependency Funnel methodology, License compatibility memo |
| **Total** | **6 months** | **$100,000** |  |

This structure is flexible. If the EF prefers a smaller first tranche, the project can start with a scoped Phase 1 grant focused on M1–M2 and expand after review.

## 8. Budget Breakdown

| Category | Amount | Description |
| --- | ---: | --- |
| Registry and Ethereum attestations | $18,000 | Pledge Registry, identity binding, EAS / attestation integration, data model, auditability |
| Dependency Funnel | $22,000 | Package ecosystem integrations, dependency expansion, GitHub mapping, scoring methodology, report generation |
| SPARK.md tooling | $12,000 | Specification, templates, validator, CLI helper, GitHub Action, documentation |
| Public Accountability Dashboard | $15,000 | Public project pages, reports, pledge states, distribution records, maintainer claim status |
| Cohort pilot and maintainer outreach | $13,000 | Cohort onboarding, dependency report reviews, upstream maintainer outreach, community coordination |
| SPARK Seed Pool distribution | $10,000 | Small first distribution to upstream maintainers; final allocation to be public and methodology-based |
| License / Addendum research | $6,000 | SPARK Pledge Addendum, AI Attribution Clause, compatibility memo, legal / OSPO feedback coordination |
| Reporting, translation, and documentation | $4,000 | Public report, English / Chinese documentation, final write-up, ecosystem communications |
| **Total** | **$100,000** |  |

The grant-funded work will be open-source and accessible. The seed distribution portion is intentionally modest because the main goal is to validate the workflow.

## 9. Deliverables

By the end of 6 months, OpenSeed will deliver:

1. Open-source Pledge Registry v0.1
2. Open-source Dependency Funnel v0.1
3. SPARK.md v0.1 specification
4. SPARK.md templates and examples
5. SPARK.md validator / GitHub Action / CLI helper
6. Public Accountability Dashboard v0.1
7. 10+ public Dependency Reports
8. 10+ simulated allocation recommendations
9. One real seed funding distribution to upstream maintainers
10. Public cohort report
11. SPARK Pledge Addendum v0.1
12. SPARK AI Attribution Clause v0.1
13. License compatibility memo
14. Maintainer / OSPO FAQ
15. Documentation for other ecosystems to fork or replicate the workflow

## 10. Success Metrics

| Metric | 6-month target |
| --- | ---: |
| Cohort projects onboarded | 10–15 |
| Projects with SPARK.md added | 10+ |
| Dependency Reports published | 10+ |
| Package ecosystems covered | 5 |
| Upstream dependencies mapped | 100+ |
| Simulated allocation rounds completed | 10+ |
| Real funding distribution completed | 1 |
| Maintainers contacted | 30+ |
| Maintainers successfully claimed funding | 5+ |
| Projects trying SPARK Pledge Addendum | 3–5 |
| Projects testing SPARK License Draft | 1–2 |
| Communities / organizations giving public review or feedback | 2+ |
| Public Dashboard | Live |
| Final methodology report | Published |

## 11. Open-Source Commitment

All software and specifications developed under this grant will be open-source or freely available.

Expected repositories and artifacts:

- `openseed-registry`
- `dependency-funnel`
- `spark-md`
- `spark-md-action`
- `openseed-dashboard`
- `SPARK.md` specification
- Dependency Funnel methodology
- Cohort report template
- SPARK Pledge Addendum v0.1
- SPARK AI Attribution Clause v0.1
- License compatibility memo

The system should be inspectable by the Ethereum community and reusable by other ecosystems.

## 12. Team

**Richard Lin** — Co-founder, OpenSeed. Co-founder of KAIYUANSHE, one of China’s largest vendor-neutral open-source communities and the first Chinese organization to join OSI. Open-source ecosystem lead at Datastrato.ai. Former developer ecosystem lead at Huawei Cloud and 01.AI. Long-term participant in Apache, Linux Foundation, and OSI-related open-source communities.

**Ian Xu** — Co-founder, OpenSeed. Council member of KAIYUANSHE. Founder of OpenBuild. Core contributor to RustCC and PyChina communities. Participant in the SPARK working group Signal channel since April 2025.

**Cynthia Xin** — Co-founder, OpenSeed. Lead organizer of the PyChina community.

**Community base:** OpenBuild, KAIYUANSHE, PyChina, and RustCC provide access to Chinese-speaking Web3, open-source, Python, and Rust developer communities. These communities can help identify pilot projects, gather maintainer feedback, and distribute the final methodology.

## 13. Risk Management

| Risk | Mitigation |
| --- | --- |
| Dependency scoring is perceived as arbitrary | Publish the methodology, expose weighting factors, allow project annotations, and treat the Funnel as a recommendation engine rather than a judge |
| AI-based attribution is overclaimed | Do not claim complete AI provenance detection; use SPARK.md and manual declarations as the first practical layer |
| Legal complexity around SPARK License | Keep License as review material in Phase 1; prioritize SPARK.md and Pledge Addendum for practical adoption |
| Maintainers do not claim funds | Keep first distribution small, use multiple contact methods, support GitHub Sponsors / OpenCollective / Ethereum wallet options |
| Cohort projects are too diverse | Start with 10–15 projects and a clear report template; prioritize projects with active maintainers and public repos |
| Funding workflow becomes too complex | Use existing Ethereum tools where possible, such as Safe, EAS, and stablecoin transfers; keep v0.1 simple |

## 14. Relationship to Existing Funding Tools

OpenSeed is not intended to replace Gitcoin, Octant, Drips, RetroPGF, or EF grants.

It can complement them by producing better dependency data and attribution records.

- Gitcoin-style funding can use dependency reports as additional signal.
- Retroactive funding rounds can use OpenSeed reports to identify upstream maintainers.
- Drips-like dependency splitting can benefit from SPARK.md declarations and dependency mapping.
- EF and other foundations can use OpenSeed reports to understand which upstream projects support critical ecosystem work.

OpenSeed’s specific contribution is the missing attribution layer: a way for projects to declare themselves, map dependencies, explain allocation recommendations, and publish funding records.

## 15. References and Alignment Notes

This proposal is informed by the following Ethereum ecosystem materials:

1. Ethereum Foundation Ecosystem Support Program — mission, scope, process, and selection criteria. ESP supports free and open-source work that strengthens Ethereum’s foundations and enables builders.
2. ESP’s updated grants model — Wishlist and RFP pathways for more proactive, targeted, and outcome-oriented support.
3. ESP Funded Projects database — recent support across infrastructure, developer tooling, research, ecosystem development, and public goods.
4. Vitalik Buterin, “We should talk less about public goods funding and more about open source funding” — framing open source as a clearer and less gameable target for funding.
5. Ethereum Foundation Funding Coordination, “This Is Fine (Until the Grant Runs Out)” — analysis of sustainability gaps for critical Ethereum-related open-source public goods.
6. Existing ecosystem mechanisms such as Gitcoin, Octant, Drips, and RetroPGF — relevant prior work for public-goods and dependency-aware funding.

## 16. Closing

OpenSeed starts from a practical belief: open-source funding should be easier to trace, easier to explain, and harder to game.

Ethereum is the right place to test this. It has the culture, tooling, and real dependency surface. The AI era makes the problem more urgent because open-source influence is becoming less visible just as more software is being generated from prior work.

With a USD 100,000 milestone-based grant, OpenSeed can deliver a working v0.1 system, onboard a first cohort, publish dependency reports, run a real funding pilot, and release the methodology as open infrastructure for Ethereum and the broader open-source ecosystem.
