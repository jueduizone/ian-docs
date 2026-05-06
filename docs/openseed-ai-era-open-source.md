---
description: "OpenSeed: Open-Source Attribution and Funding Infrastructure for the AI Era"
hidden: true
---
# OpenSeed: Open-Source Attribution and Funding Infrastructure for the AI Era

**Chinese version:** [Read the Chinese version](https://ian-docs.vercel.app/docs/openseed-ai-era-open-source-cn)

## 1. Executive Summary

OpenSeed starts with a pilot in the Ethereum ecosystem. It builds open-source attribution and funding infrastructure for the AI era.

AI is changing open-source dependency relationships. Developers can use AI to call, reference, fork, or rewrite open-source projects, but these actions may not leave a package manifest, an import statement, or fork history. Traditional dependency graphs can only see explicit dependencies. They cannot see the hidden influence created by AI.

In Phase 1, OpenSeed will deliver the Pledge Registry, Dependency Funnel, `SPARK.md`, Public Accountability Dashboard, and the SPARK License v0.1 draft. Together, they run the full flow from project pledges, dependency tracking, funding allocation, maintainer claims, to public accountability.

Ethereum is the first funding and accountability backend. The long-term goal is for OpenSeed to become a general standard for open-source attribution and funding, serving open-source projects, AI tools, foundations, open-source program offices, and developer communities.

## 2. The Problem

Traditional open-source funding mainly depends on three types of signals:

1. Who contributed code
2. Who is listed as a package dependency
3. Who can write a grant proposal

In the AI era, these signals are no longer enough.

An open-source project may be repeatedly referenced by AI tools, but never imported.

A repo may be forked by AI into many variants, while the original maintainers never find out.

An architecture pattern, algorithm implementation, or engineering judgment may be reused at scale, but never appear in a dependency graph.

At the same time, AI makes code generation cheaper, but makes maintenance, review, judgment, and long-term responsibility more expensive. What becomes truly scarce is long-term maintainers, stable projects, real downstream usage, and community trust.

OpenSeed addresses this question: after AI makes dependency relationships harder to see, how can we rebuild open-source attribution, pledges, and funding return mechanisms?

## 3. Background

OpenSeed started from discussions around the SPARK Pledge. The core idea of SPARK is simple: projects that succeed commercially should return part of their future value to the open-source ecosystem they depend on.

This direction is aligned with Vitalik’s recent discussion of dependency funding: funding real dependencies instead of giving random grants.

What is missing now is not the idea, but an operating mechanism: who makes the pledge, who depends on whom, how the money is allocated, how maintainers claim it, and how the community verifies the process.

OpenSeed first builds a reference implementation. In Phase 1, it uses Ethereum to run the funding and public accountability flow, while turning `SPARK.md`, the Dependency Funnel, and the SPARK License draft into open standards that other ecosystems can reuse.

## 4. Where the Gap Is

| Layer | Current State | OpenSeed Phase 1 Delivery |
| --- | --- | --- |
| SPARK / Dependency Funding idea | Already discussed | Reference implementation |
| Project pledge entry point | Missing | Pledge Registry |
| Explicit dependency tracking | Partly visible | Dependency Funnel |
| AI implicit dependency | Mostly invisible | `SPARK.md` + manual declaration entry point |
| Funding allocation | No standard process | Allocation Recommendation |
| Maintainer claim | No unified process | Claim workflow |
| Public accountability | Missing | Public Accountability Dashboard |
| License path | Lacks draft and review process | SPARK License Draft v0.1 |

## 5. Why We Can Do This

OpenSeed has three foundations.

First, the team was part of early SPARK discussions. We are not interpreting the idea from the outside. We joined during the mechanism draft stage and understand why it is designed around recursive pledges and dependency return.

Second, we have real developer community access. OpenBuild, Kaiyuanshe, PyChina, and RustCC cover Chinese-speaking Web3, open-source, Python, and Rust developer communities. This helps us find the first projects willing to pilot the mechanism and collect real feedback.

Third, we have the community and organizational base to push the license forward. Kaiyuanshe is the first Chinese member of OSI. Team members have long been involved in Apache, the Linux Foundation, OSI, and other open-source governance networks. In Phase 1, the goal is to produce a v0.1 draft, organize reviews with communities, foundations, OSPOs, and legal advisors, and form a version that can keep moving forward.

OpenSeed acts as a reference implementation and pilot organizer. It does not claim ownership over SPARK, and it does not bind the Ethereum implementation as the only version.

## 6. Phase 1 Goals

Phase 1 needs to make four things work.

### 6.1 Record Pledges

Projects publicly state that, after future commercialization, they are willing to return part of their revenue, token allocation, or annual budget to public goods and upstream dependencies.

The pledge uses a parameterized template instead of fixed percentages. Common parameters include:

1. Public Goods Allocation: funds flowing to a public goods pool
2. Dependency Allocation: funds flowing to direct or indirect upstream dependencies
3. Grace Period: the grace period after commercialization
4. Trigger: revenue, TGE, fundraising, commercial launch, and other trigger events

### 6.2 Track Explicit Dependencies

The system identifies which upstream open-source projects a project uses through package manifests, deps.dev, GitHub metadata, and other data sources.

Phase 1 covers ecosystems such as npm, PyPI, Cargo, Go, and Maven.

### 6.3 Create a Declaration Entry Point for the AI Era

Through `SPARK.md`, a project declares its identity, dependency relationships, funding methods, AI usage rules, and attribution requirements.

Developers, scanners, and AI tools can all read this file.

### 6.4 Make Funding Flows and Fulfillment Status Public

The dashboard shows project pledges, report submissions, allocation recommendations, fund distribution, pending claims, and cohort progress.

We use the term Public Accountability Dashboard or Transparency Dashboard, not Compliance Dashboard. OpenSeed is about public accountability, not regulation.

## 7. Product Structure

### 7.1 Pledge Registry

The Pledge Registry records who pledged what.

Features include:

1. Project registration
2. GitHub, domain, and wallet identity binding
3. Pledge parameter records
4. Grace period records
5. Annual report records
6. Public status lookup

In Phase 1, EAS or on-chain attestation can be used for public proof. Complex funding logic can be moved to later phases.

### 7.2 Dependency Funnel

The Dependency Funnel generates dependency analysis and funding allocation recommendations.

Features include:

1. Scanning package dependencies
2. Expanding direct and transitive dependencies
3. Mapping GitHub repos and maintainer information
4. Calculating recommended allocation weights
5. Producing explainable reasons
6. Allowing projects to manually add missing dependencies

Initial weighting signals include:

1. Project age
2. Real downstream dependency count
3. Core maintainer continuity
4. Issue response quality
5. Direct or indirect dependency distance
6. Manually declared AI reference signals

The Dependency Funnel is a recommendation engine. It gives transparent and explainable allocation suggestions. Projects can accept, adjust, or add explanations.

### 7.3 `SPARK.md`

`SPARK.md` is a project-level attribution declaration file placed in the repository root.

It should be as simple as `README.md`, `LICENSE`, `SECURITY.md`, and `FUNDING.yml`.

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

4% and 1% are default template values. Different projects can adjust them based on stage, revenue, token model, and organization type.

### 7.4 SPARK Seed Pool

The SPARK Seed Pool is the Phase 1 seed funding pool. It is used to run a real funding flow.

Funding sources include EF grants, community donations, and partner support. In later phases, it can also receive Public Goods Allocation returned by commercialized projects.

How funds are used:

1. Generate allocation recommendations through the Dependency Funnel
2. Let projects confirm the allocation result
3. Reach out to upstream maintainers
4. Let maintainers complete the claim process
5. Distribute funds through multisig or on-chain payment
6. Publish records on the dashboard

The focus of Phase 1 is to validate the process, not to distribute large amounts of money.

### 7.5 Public Accountability Dashboard

The dashboard answers two questions: whether pledges are fulfilled, and where the money goes.

It shows:

1. Registered projects
2. Pledge parameters
3. Report submission status
4. Dependency allocation recommendations
5. Funding distribution records
6. Pending claim projects
7. Cohort pilot progress

## 8. Why Start with Ethereum

Ethereum is the first funding and accountability backend.

There are four reasons:

1. Ethereum has a long-term public goods funding culture
2. Ethereum projects rely heavily on open-source infrastructure
3. On-chain records are suitable for public pledges and transparent funding flows
4. Stablecoins and smart contracts are suitable for validating programmable funding

OpenSeed’s long-term audience includes open-source projects, AI tools, foundations, open-source program offices, and developer communities.

## 9. Execution Steps

### Step 1: Complete Phase 1 Delivery

Deliver five product modules:

1. Pledge Registry v0.1
2. Dependency Funnel v0.1
3. `SPARK.md` v0.1
4. Public Accountability Dashboard v0.1
5. SPARK Seed Pool v0.1

At the same time, start the SPARK License draft and AI runtime attribution interface design.

### Step 2: Define Cohort 1

Select 10 to 15 projects from the Ethereum ecosystem and Chinese-speaking open-source communities.

Selection criteria:

1. Real maintainers
2. Continuous maintenance history
3. Clear downstream usage scenarios
4. Willingness to publicly declare dependencies and funding pledges
5. Willingness to add `SPARK.md`

Project types include Web3 tools, developer tools, AI tools, and general open-source libraries.

Selected projects receive:

1. `SPARK.md` integration support
2. Dependency Report
3. Pledge / Addendum integration support
4. Dashboard listing
5. Eligibility for the first round of dependency funding
6. Community and foundation exposure

### Step 3: Generate Dependency Reports

Generate one dependency report for each Cohort project.

The report includes:

1. Explicit dependency list
2. Direct and transitive dependencies
3. Upstream repo information
4. Maintainer activity
5. Recommended allocation weights
6. AI references or manually declared dependencies that need confirmation

This report is the most important product output in Phase 1.

### Step 4: Implement `SPARK.md`

Help Cohort projects add `SPARK.md` to the repository root.

Supporting tools include:

1. Template
2. GitHub Action validation
3. CLI initialization command
4. Documentation
5. Badge

The goal is to make `SPARK.md` a low-friction declaration habit.

### Step 5: Complete a Simulated Allocation

First run a simulated allocation and show:

1. If a project contributes dependency allocation, which upstream projects will receive funding
2. Why each upstream project receives its weight
3. Which projects can claim directly
4. Which projects need manual outreach

This step validates the algorithm and the user’s understanding cost.

### Step 6: Complete the First Real Funding Round

Use a small amount from the seed pool for real distribution.

Flow:

1. Generate allocation recommendations
2. Project confirms
3. Outreach to upstream maintainers
4. Maintainers claim funds
5. Funds are distributed
6. Dashboard publishes the records

The focus is to make the process work, not the size of the amount.

### Step 7: Produce Open Standards

After the pilot, publish three documents:

1. `SPARK.md` specification
2. Dependency Funnel methodology
3. OpenSeed Cohort 1 report

These three documents will decide whether OpenSeed can move from an Ethereum pilot to general open-source infrastructure.

## 10. SPARK License

The SPARK License needs a first version in Phase 1. Wider adoption can be pushed in Phase 2.

It addresses whether pledges can travel with code: after a project is used, forked, or commercialized downstream, can the public goods return obligation also travel with the code?

### 10.1 Phase 1 Delivery

Phase 1 delivers four materials:

1. `SPARK License Draft v0.1`
2. `SPARK Pledge Addendum v0.1`
3. `SPARK AI Attribution Clause v0.1`
4. `License compatibility memo`

`SPARK License Draft v0.1` is a full license draft for review by communities, foundations, and legal advisors.

`SPARK Pledge Addendum v0.1` is a lightweight version. A project keeps its original license and adds a pledge file, stating that it will return funding after commercialization based on agreed parameters.

`SPARK AI Attribution Clause v0.1` explains how a project wants to be attributed and reported in AI training, retrieval, code generation, agent forks, and similar scenarios.

`License compatibility memo` explains the relationship between the SPARK License and MIT, Apache, GPL, the Open Source Definition, and the SPDX process.

### 10.2 Phase 1 Recognition Goals

Phase 1 aims to get early recognition.

Goals include:

1. 3 to 5 Cohort projects adopt `SPARK Pledge Addendum`
2. 1 to 2 new projects try `SPARK License Draft`
3. At least 2 communities, organizations, or foundations publicly support continued review
4. At least 1 advisor with open-source legal or OSPO background provides written feedback
5. Publish an FAQ answering the main questions from enterprise legal teams and open-source maintainers

### 10.3 Phase 2 Adoption

Phase 2 pushes small-scale real adoption.

Priority targets:

1. New projects
2. AI devtools
3. Agent frameworks
4. Open-source infrastructure tools
5. Community projects that clearly support recursive funding

Mature projects should first adopt `SPARK.md` and `SPARK Pledge Addendum`, then evaluate whether to switch licenses.

## 11. Open-Source Commitment

All infrastructure built in OpenSeed Phase 1 will be open source.

This includes:

1. Registry code
2. Dependency Funnel algorithm
3. Dashboard frontend
4. `SPARK.md` specification
5. SPARK License draft
6. Cohort report template

Other ecosystems can fork the toolchain and deploy their own OpenSeed / SPARK implementation.

## 12. Budget and Timeline

### 12.1 Budget

| Category | Amount | Notes |
| --- | --- | --- |
| Registry and on-chain proof | $20,000 | Pledge Registry, EAS / attestation, identity binding |
| Dependency Funnel | $20,000 | deps.dev integration, dependency scanning, allocation recommendation algorithm |
| Dashboard and integration tools | $15,000 | Public Dashboard, project onboarding flow, GitHub Action / CLI |
| `SPARK.md` and License | $15,000 | Specification, draft, legal review, FAQ |
| Cohort pilot and funding pool | $20,000 | Project support, first real funding round, maintainer outreach |
| Operations and documentation | $10,000 | Community coordination, reports, translation, public materials |
| **Total** | **$100,000** | 6 months |

### 12.2 Timeline

| Time | Delivery |
| --- | --- |
| Months 1–2 | Registry v0.1, `SPARK.md` v0.1, Cohort recruitment, license draft kickoff |
| Months 3–4 | Dependency Funnel v0.1, Dashboard v0.1, first Dependency Reports |
| Month 5 | Simulated allocation, Pledge Addendum trial, License v0.1 review |
| Month 6 | First real funding round, Cohort report, public standard documents |

## 13. Success Metrics

| Metric | 6-Month Target |
| --- | --- |
| Cohort projects | 10–15 |
| Projects completing `SPARK.md` | 10+ |
| Dependency Reports | 10+ |
| Simulated allocations completed | 10 |
| Real funding round completed | 1 round |
| Upstream dependencies mapped | 100+ |
| Projects adopting Addendum | 3–5 |
| Organizations reviewing License Draft | 2+ |
| Public Dashboard | Live |

## 14. Team

**Richard Lin**: Co-founder of OpenSeed. Co-founder of Kaiyuanshe, China’s largest vendor-neutral open-source community and the first Chinese organization to join OSI. He is currently Head of Open Source Ecosystem at Datastrato.ai. He previously led developer ecosystems at Huawei Cloud and 01.AI, and has long been involved in Apache, the Linux Foundation, OSI, and other international communities.

**Ian Xu**: Co-founder of OpenSeed. Council member of Kaiyuanshe, founder of the OpenBuild community, and core contributor to RustCC and PyChina. He joined the SPARK Working Group Signal channel in April 2025.

**Cynthia Xin**: Co-founder of OpenSeed. Lead organizer of the PyChina community.

**Relationship with the SPARK Working Group**: The OpenSeed team joined early SPARK Pledge discussions and will continue to feed pilot data and community adoption feedback back to the working group.

## 15. Future Extension: AI Runtime Attribution

OpenSeed can later expand to AI Agent runtime calls.

The direction is Runtime Receipts.

Each time an Agent calls a tool, API, model, or data source, it generates a machine-readable receipt:

```json
{
  "agent": "did:example:agent",
  "tool": "github.com/example/tool",
  "timestamp": "2026-04-26T00:00:00Z",
  "usage": {
    "calls": 1
  },
  "payment": {
    "amount": "0.001",
    "currency": "USDC"
  },
  "attribution": {
    "spark_project": "example-project"
  }
}
```

Phase 1 only reserves the interface. It is not a main delivery.

## 16. One-Sentence Summary

OpenSeed starts with an Ethereum dependency funding pilot and aims to become open-source attribution and funding infrastructure for the AI era.

It lets projects declare themselves, makes dependencies traceable, lets funding flow back, and makes the hidden open-source influence created by AI visible again.
