---
description: "OpenSeed Agentic Open License 0.1：面向 AI / Agent 时代的开源许可证草案"
hidden: true
---
# OpenSeed Agentic Open License 0.1

**Chinese version:** [Read the Chinese version](https://ian-docs.vercel.app/docs/openseed-agentic-open-license-v0-1-cn)

Draft for community, OSPO, legal, and open-source ecosystem review.

> Status: Draft v0.1  
> License steward: OpenSeed  
> Short name: OSAO-0.1  
> SPDX identifier: Not assigned  
> OSI status: Not submitted / Not approved  
> Intended use: AI-assisted and agent-mediated open-source software reuse, attribution preservation, provenance visibility, dependency-aware funding metadata, and voluntary upstream return.

## Important Notice

This license draft has not been approved by the Open Source Initiative. Do not describe software under this license as “OSI Approved” unless and until this license has completed the OSI license review process.

This draft is designed to preserve open-source software freedoms while adapting license practice to AI-assisted development, software agents, automated code generation, machine-readable attribution, provenance metadata, and voluntary dependency-aware funding.

This draft is not legal advice. Projects should consult qualified counsel before adopting it in production.

## Design Position

OpenSeed Agentic Open License is not designed to restrict AI usage or impose mandatory royalties.

It is designed to solve a narrower but important problem:

> In AI-assisted and agent-mediated software supply chains, attribution, provenance, maintainer funding information, and dependency relationships are easily erased. OpenSeed keeps those signals visible without blocking use, modification, distribution, commercial use, AI training, or agent workflows.

The core principle is:

> Software freedom remains in the license. Commercialization return lives in voluntary public pledges and machine-readable metadata.

## How This Differs from Traditional Licenses

| Area | MIT / BSD | Apache-2.0 | GPL / AGPL | OpenSeed Agentic Open License 0.1 |
| --- | --- | --- | --- | --- |
| Commercial use | Allowed | Allowed | Allowed, with copyleft duties | Allowed |
| Modification | Allowed | Allowed | Allowed, with source obligations | Allowed |
| Redistribution | Allowed | Allowed with notice duties | Allowed with copyleft duties | Allowed with notice + metadata preservation |
| Patent grant | Weak / implicit | Explicit | Explicit | Explicit, Apache-like |
| AI training / indexing | Not addressed | Not addressed | Not addressed | Explicitly allowed |
| AI output boundary | Not addressed | Not addressed | Not addressed | Output not automatically covered unless it copies/adapts protected expression |
| Agent-mediated redistribution | Not addressed | Not addressed | Not addressed | Operator remains responsible when agents distribute on their behalf |
| Machine-readable attribution | Not addressed | NOTICE only | License notices | SPARK.md / OPENSEED-NOTICE / funding metadata preserved |
| Dependency metadata | Not addressed | Not addressed | Not addressed | Recognized and preserved when distributed |
| Commercial return | Not addressed | Not addressed | Not addressed | Voluntary pledge layer, not a license fee |
| Mandatory payment | No | No | No | No |
| Registry requirement | No | No | No | No |
| Badge / logo display | No | No | No | No |

## Recommended File Set

For projects adopting OpenSeed, use four separate files:

1. `LICENSE` — OpenSeed Agentic Open License 0.1.
2. `SPARK.md` — machine-readable attribution, maintainer, dependency, AI reference, funding, and pledge metadata.
3. `OPENSEED-NOTICE` — human-readable attribution and funding notice.
4. `SPARK-PLEDGE.md` — voluntary commercialization and upstream return commitment.

The license grants software freedom. The pledge creates public accountability.

---

# OpenSeed Agentic Open License 0.1

Copyright (c) [year] [copyright holder]

## 1. Definitions

“License” means this OpenSeed Agentic Open License 0.1.

“Licensor” means the copyright owner or entity authorized by the copyright owner that is granting rights under this License.

“Work” means the software, documentation, data files, configuration files, examples, templates, or other copyrightable material made available under this License.

“Contribution” means any original work of authorship intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an entity authorized to submit on behalf of the copyright owner.

“Contributor” means Licensor and any person or entity that provides a Contribution.

“You” or “Your” means any person or entity exercising rights granted by this License.

“Derivative Work” means any work based upon the Work, including modifications, adaptations, translations, or other works that would require permission under applicable copyright law.

“Source Form” means the preferred form for making modifications.

“Object Form” means any form resulting from mechanical transformation or translation of Source Form, including compiled object code, generated documentation, minified files, bundled files, packaged artifacts, or converted formats.

“OpenSeed Metadata” means machine-readable or human-readable files included with the Work that describe attribution, provenance, maintainer information, funding information, dependency relationships, AI reference preferences, or voluntary funding pledges. Examples include `SPARK.md`, `OPENSEED-NOTICE`, `NOTICE`, `FUNDING.yml`, `CITATION.cff`, dependency reports, maintainer records, or equivalent files.

“Agentic System” means an AI system, software agent, code assistant, build service, package manager, continuous integration service, deployment system, autonomous development tool, or other automated system that copies, modifies, packages, publishes, distributes, indexes, analyzes, retrieves, generates, or otherwise processes software or related materials.

## 2. Grant of Copyright License

Subject to the terms and conditions of this License, each Contributor grants You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and Derivative Works in Source Form or Object Form.

## 3. Grant of Patent License

Subject to the terms and conditions of this License, each Contributor grants You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work.

This patent license applies only to patent claims licensable by such Contributor that are necessarily infringed by the Contributor’s Contribution alone or by combination of the Contributor’s Contribution with the Work to which the Contribution was submitted.

If You institute patent litigation against any entity alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work terminate as of the date such litigation is filed.

## 4. Redistribution Conditions

You may reproduce and distribute copies of the Work or Derivative Works in any medium, with or without modifications, in Source Form or Object Form, provided that You comply with the following conditions.

### 4.1 License Copy

You must give recipients of the Work or Derivative Works a copy of this License, or a clear reference to where this License can be obtained.

### 4.2 Copyright and Legal Notices

You must retain copyright, patent, trademark, attribution, and license notices from the Source Form of the Work, excluding notices that do not pertain to any part of the Derivative Work.

### 4.3 Modified Files

If You modify the Work and distribute the modified files, You must cause the modified files to carry prominent notices stating that You changed the files.

### 4.4 OpenSeed Metadata Preservation

If the Work includes OpenSeed Metadata, You must retain a readable copy of such OpenSeed Metadata when You distribute the Work or a Derivative Work, except for entries that do not pertain to any part of the distributed material.

You may satisfy this requirement by including the relevant metadata in at least one of the following places:

1. a `SPARK.md`, `OPENSEED-NOTICE`, `NOTICE`, `FUNDING.yml`, `CITATION.cff`, or equivalent file included with the distribution;
2. the Source Form or documentation distributed with the Work or Derivative Work;
3. a package metadata file customarily used by the relevant ecosystem;
4. a legal notices screen or documentation page, if such a screen or page is already used to show third-party legal notices.

This section does not require You to display any trademark, badge, logo, endorsement statement, funding appeal, or attribution notice in a user interface.

### 4.5 No Endorsement

You may not use the names, trademarks, service marks, or logos of Licensor, Contributors, OpenSeed, maintainers, or upstream projects to endorse or promote Your products or services without prior written permission, except as necessary to provide legally required notices or truthful attribution.

## 5. AI and Agentic Use

### 5.1 Permission

For clarity, this License permits use of the Work for artificial intelligence, machine learning, software agents, automated code generation, indexing, search, retrieval, analysis, benchmarking, code completion, code transformation, vulnerability analysis, documentation generation, dependency analysis, and similar technical purposes.

### 5.2 No Automatic Restriction on Outputs

Outputs generated by an AI system, machine learning model, software agent, code assistant, or automated development tool are not subject to this License merely because the system, model, agent, or tool was trained on, analyzed, indexed, retrieved, prompted with, or otherwise processed the Work.

However, if an output includes copied or adapted portions of the Work that would require permission under applicable copyright law, the relevant license conditions continue to apply to those copied or adapted portions.

### 5.3 Agent-Mediated Compliance

If an Agentic System acts on Your behalf to copy, modify, package, publish, distribute, or otherwise convey the Work or a Derivative Work, You remain responsible for complying with this License.

Using automation does not remove the obligation to preserve applicable license notices, copyright notices, modification notices, and OpenSeed Metadata when the Work or a Derivative Work is distributed.

### 5.4 Preservation of Attribution Signals

You must not knowingly remove or obscure copyright notices, license notices, OpenSeed Metadata, attribution metadata, provenance metadata, or maintainer funding metadata included with the Work when distributing the Work or a Derivative Work, except to the extent such notices or metadata do not pertain to any part of the distributed material.

## 6. Dependency Awareness

The Work may identify upstream projects, maintainers, packages, datasets, models, tools, documentation, standards, or other dependencies that influenced or supported the Work.

Such dependency information is provided to improve attribution, provenance, security review, software supply-chain transparency, maintainer discovery, and voluntary funding coordination.

This License does not require You to accept any dependency scoring, allocation recommendation, funding pledge, public-goods allocation, registry status, or dependency report unless You separately agree to do so in writing.

If You redistribute dependency information included with the Work, You should not knowingly misrepresent the relationship between the Work and the listed dependencies.

## 7. Voluntary Funding and Commercialization Pledges

The Work may include OpenSeed Metadata or a separate pledge file describing voluntary commitments to support upstream dependencies, maintainers, open-source public goods, or ecosystem funding pools after commercialization.

Such pledge may define revenue, funding, token, product launch, enterprise contract, foundation budget, or other commercialization triggers; grace periods; allocation percentages; dependency reporting practices; distribution workflows; and public accountability practices.

Unless separately agreed in writing, such pledge is not a condition of this License. You are not required by this License to pay royalties, make donations, register with OpenSeed or any third-party service, publish a dependency report, make a public-goods allocation, make a dependency allocation, or adopt any funding pledge.

The purpose of such pledge is to create public accountability for upstream return without restricting software freedom.

## 8. No Additional Restrictions

You may not impose legal terms or technological measures that restrict recipients from exercising the rights granted under this License.

You may offer warranty, support, indemnity, hosting, consulting, deployment, training, or other services for a fee.

You may distribute Your own contributions or larger works under additional or different terms, provided that Your use, reproduction, modification, and distribution of the Work otherwise complies with this License.

## 9. Trademarks

This License does not grant permission to use the trade names, trademarks, service marks, product names, logos, or brand features of Licensor, Contributors, OpenSeed, maintainers, or upstream projects, except as required for reasonable and customary use in describing the origin of the Work and reproducing notices required by this License.

## 10. Disclaimer of Warranty

The Work is provided “AS IS”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, non-infringement, title, accuracy, security, or absence of defects.

You are solely responsible for determining the appropriateness of using, modifying, distributing, training on, indexing, deploying, or otherwise processing the Work.

## 11. Limitation of Liability

In no event and under no legal theory, whether in tort, contract, or otherwise, unless required by applicable law or agreed to in writing, shall any Licensor or Contributor be liable to You for damages, including direct, indirect, special, incidental, consequential, exemplary, or punitive damages arising out of the use or inability to use the Work, even if advised of the possibility of such damages.

## 12. Acceptance

You are not required to accept this License in order to receive or run a copy of the Work. However, nothing other than this License grants You permission to exercise rights that would otherwise require permission under copyright or patent law.

By exercising any rights granted under this License, You accept and agree to be bound by its terms.

## 13. Versioning

This is version 0.1 of the OpenSeed Agentic Open License.

Later versions may be published by the license steward. You may use the Work under this version unless the Work expressly states that a later version may also be used.

End of Terms.

---

# OPENSEED-NOTICE Template

```text
OPENSEED-NOTICE

Project: [project name]
Repository: [repository URL]
License: OpenSeed Agentic Open License 0.1
License file: LICENSE

Maintainers:
  - [name / handle / contact]

Preferred attribution:
  [short human-readable attribution text]

Funding:
  Accepts funding: [yes/no]
  Preferred funding methods:
    - GitHub Sponsors: [URL]
    - OpenCollective: [URL]
    - Ethereum wallet: [address]
    - Other: [URL]

Dependency funding:
  This project participates in dependency-aware funding experiments.
  Dependency reports, if any, are published at:
  [URL]

AI and agentic reuse:
  AI-assisted development, indexing, search, retrieval, analysis, and agentic
  software workflows are allowed under the applicable license terms.

  If this project is intentionally included as a named source in a dataset,
  benchmark, model package, software package, retrieval corpus, agent toolset,
  or code-generation corpus, the maintainers prefer the following attribution:
  [preferred citation]

Voluntary pledge:
  Any public-goods allocation, dependency allocation, commercialisation pledge,
  or upstream return commitment is voluntary unless separately agreed in writing.
  Pledge details, if any:
  [URL or text]
```

---

# SPARK.md Template

```yaml
version: "0.1"

project:
  name: example-project
  repository: https://github.com/example/project
  homepage: https://example.org
  license: OpenSeed Agentic Open License 0.1
  license_file: LICENSE
  notice_file: OPENSEED-NOTICE

maintainers:
  - name: Alice
    github: alice
    contact: alice@example.org

attribution:
  preferred_citation: "example-project by Alice and contributors"
  ai_reference_allowed: true
  ai_reference_note: >
    AI-assisted development, indexing, search, retrieval, analysis, and agentic
    software workflows are allowed under the project license. If this project is
    intentionally included as a named source in a dataset, benchmark, model
    package, software package, retrieval corpus, agent toolset, or code-generation
    corpus, maintainers prefer the citation above.

funding:
  accepts_funding: true
  methods:
    github_sponsors: https://github.com/sponsors/alice
    opencollective: https://opencollective.com/example
    ethereum: "0x0000000000000000000000000000000000000000"

openseed:
  registry_status: unregistered
  registry_url:
  dependency_report_url:
  pledge_url:

pledge:
  status: voluntary
  public_goods_allocation:
  dependency_allocation:
  grace_period:
  trigger:
  note: >
    Pledge terms are voluntary and are not conditions of the software license
    unless separately agreed in writing.

upstream:
  declared_dependencies:
    - name: upstream-lib
      repository: https://github.com/example/upstream-lib
      relationship: direct
      criticality: high
      funding_url:
```

---

# SPARK-PLEDGE.md Template

```text
SPARK Pledge Addendum 0.1
Voluntary Public Commitment

This Addendum is not a condition of the software license unless the parties
separately agree in writing.

1. Project

Project name: [name]
Repository: [URL]
Maintainers or steward: [name]
Public registry entry: [URL]

2. Purpose

The project publishes this pledge to make its relationship with upstream
open-source dependencies more visible and to support dependency-aware funding.

3. Commercialization Trigger

This pledge may become active when one or more of the following occurs:

[ ] paid product launch
[ ] annual revenue above [amount]
[ ] enterprise contract signed
[ ] funding round closed
[ ] token generation event
[ ] foundation / grant budget approval
[ ] other: [description]

4. Grace Period

The project may apply a grace period of [duration] after the trigger.

Suggested defaults:

- pre-revenue / research / hackathon project: no payment pledge, metadata only
- early commercial project: 12–24 months after first commercial revenue
- funded startup or protocol: after funding round, TGE, or annual budget approval

5. Voluntary Allocation

If the project reaches the trigger described above, the project intends to allocate:

Public Goods Allocation: [x% or amount]
Dependency Allocation: [y% or amount]

These allocations are intended for open-source public goods, upstream dependencies,
maintainers, or relevant funding pools.

6. Dependency Report

The project intends to publish or update a dependency report before making a
dependency allocation.

The dependency report may include:

- direct dependencies
- transitive dependencies
- non-package dependencies
- AI reference declarations
- maintainer funding links
- allocation recommendations
- project comments or adjustments

7. Public Accountability

The project intends to publish allocation decisions, distribution records,
maintainer claim status, and unclaimed funding status in a public location.

8. No License Condition

This pledge is not a royalty requirement, usage fee, field-of-use restriction,
AI-use restriction, or condition for using, modifying, copying, distributing,
training on, indexing, retrieving, analyzing, or otherwise processing the software.

9. Good-Faith Nature

This pledge is a public good-faith commitment. It is designed for transparency,
coordination, and accountability, not as a substitute for a separately executed
commercial contract, grant agreement, investment agreement, or legal obligation.
```

---

# Explanation

## One-Sentence Summary

OpenSeed Agentic Open License is a permissive open-source license for AI-assisted development and agent-mediated reuse. It preserves software freedom while keeping attribution, provenance, dependency relationships, and voluntary funding information visible across automated software supply chains.

## What It Is Not

It is not:

- A license that restricts AI training;
- A non-commercial license;
- A mandatory revenue-sharing license;
- A license that requires registration with OpenSeed;
- A license that requires badge or logo display;
- A license that automatically infects AI outputs.

## What It Solves

AI and agents have changed how software is reused:

- AI tools may reference, rewrite, or combine open-source code;
- Agents may automatically fork, package, publish, or modify code;
- Code reuse may not leave an import, package manifest, or fork history;
- Upstream maintainers and dependency relationships are more easily erased;
- There is no public mechanism between commercial success and upstream return.

OpenSeed's answer:

- The license guarantees free use, modification, distribution, and commercialization;
- Metadata preserves attribution, provenance, maintainer, funding, and dependency information;
- Pledges handle voluntary return after commercialization;
- Dashboard and registry handle public accountability.

## How Commercialization and Return Are Handled

Commercialization return is written as a voluntary public pledge, not a license fee.

Reason: if the license says "you must pay x% of revenue after commercialization," it likely no longer meets basic open-source expectations and would be blocked by OSI, OSPOs, and enterprise legal teams.

OpenSeed's approach:

> Free use + public pledge + machine-readable metadata + public accountability.

A project can commercialize. But if it supports OpenSeed, it can declare through `SPARK-PLEDGE.md`:

- What conditions trigger the return;
- How long the grace period is;
- What percentage supports public goods;
- What percentage supports upstream dependencies;
- How dependency reports are generated;
- How funding flows are made public.

## Recommended Default Return Model

| Project Stage | Suggested Practice |
| --- | --- |
| Pre-revenue / hackathon / research | Add `SPARK.md` only, no payment pledge |
| Small commercial launch | May pledge 0.5%–1% dependency allocation |
| Funded startup | May pledge 1% dependency + 1% public goods |
| Protocol / foundation / token project | May pledge 1% dependency + 3%–5% public goods |
| Mature company | Custom annual open-source budget |

These percentages are templates, not license conditions.

## OSI Risk Control

To stay as close as possible to the acceptable boundaries for OSI and OSPOs, v0.1 avoids these high-risk terms:

- No restriction on commercial use;
- No restriction on AI training;
- No field-of-use restriction;
- No mandatory payment;
- No requirement to connect to the OpenSeed Registry;
- No requirement to display a badge in the UI;
- No subjective dependency scoring as a legal obligation;
- No automatic license restriction on AI outputs.

Its moderate innovations are:

- Preserving machine-readable attribution, funding, and dependency metadata;
- Making AI and agent use explicitly allowed;
- Making operator compliance responsibility explicit when agents distribute on their behalf;
- Making AI output boundaries explicit;
- Putting commercialization return into voluntary pledges and public accountability.

## Recommended Adoption Path

For maximum ecosystem acceptance, OpenSeed can use two adoption paths:

### Conservative path

Use Apache-2.0 for software, plus:

- `SPARK.md`
- `OPENSEED-NOTICE`
- `SPARK-PLEDGE.md`

This is the lowest-risk path for EF, OSPO, and enterprise adoption.

### OpenSeed-native path

Use OpenSeed Agentic Open License 0.1, plus:

- `SPARK.md`
- `OPENSEED-NOTICE`
- `SPARK-PLEDGE.md`

This path provides stronger OpenSeed identity and AI / Agent-era differentiation, but should be reviewed by legal counsel before production use.

## Suggested Public Messaging

Do not say:

> OpenSeed forces AI companies to pay open-source projects.

Say:

> OpenSeed preserves software freedom while keeping attribution, provenance, dependency, and voluntary funding metadata visible across AI-assisted and agent-mediated software supply chains.
