# SPARK License & AI Usage Visibility
## A Framework for Open Source Sustainability in the AI Era

---

## The Problem

Traditional open source licenses govern one thing: the right to use code. They say nothing about what happens after a project built on that code becomes commercially successful. The result is a well-documented failure mode — projects that depend heavily on open source infrastructure rarely reinvest into it.

AI coding tools have introduced a second, structurally different problem. When a developer uses Cursor or Copilot to generate code, that code may be deeply informed by open source projects — their algorithms, patterns, architectural decisions — without any explicit fork, import, or attribution. The dependency exists. It just isn't visible.

These are two separate problems that share a root cause: **the tools we have for tracking open source usage were designed for a world where usage was explicit and traceable.** That world no longer exists.

SPARK License is designed to address both.

---

## What SPARK License Is

SPARK License is a software license that does two things traditional licenses do not:

**1. It attaches economic obligations to commercial success.**

Adopting the SPARK License means committing a percentage of future economic upside — from revenue, token issuance, or acquisition — back to the open source ecosystem the project depended on. The obligation is not triggered at adoption. It is triggered at commercialization.

This is distinct from existing approaches:
- GPL/copyleft governs code derivatives, not economic outcomes
- BSL and Commons Clause restrict commercial use but don't create positive obligations
- Open Source Pledge is voluntary and unenforceable

SPARK License creates a forward commitment, recorded on-chain, that follows the project through its commercial lifecycle.

**2. It defines AI-era usage as a first-class category.**

Using a SPARK-licensed project to train an AI model, as a retrieval source for an AI coding tool, or as a foundational reference in AI-generated code constitutes a use case that triggers disclosure obligations. This closes the gap that GPL was never designed to address.

---

## The AI Usage Visibility Problem

The robots.txt analogy is instructive but incomplete. robots.txt works because web crawlers access content at a defined moment — the HTTP request — where a protocol check is possible. AI training and inference don't have that moment. By the time a model generates code informed by an open source project, the usage has already occurred, distributed across millions of training examples with no single attribution point.

This means **post-hoc enforcement is structurally impossible**. The realistic goal is not detection and punishment. It is making usage visible enough that norms can form and compliance becomes the path of least resistance.

Four mechanisms, in order of near-term feasibility:

---

### Mechanism 1: SPARK Metadata Standard

Every SPARK-licensed project includes a machine-readable declaration file at a standard path:

```
.well-known/spark.json
```

Contents:
```json
{
  "project": "project-name",
  "registry": "0x...",
  "license": "SPARK-1.0",
  "ai_usage": "disclosure-required",
  "contact": "spark@project.org"
}
```

AI tools that index code repositories — Cursor, GitHub Copilot, Continue, Sourcegraph — already crawl this type of file. When an AI tool references a SPARK-licensed project during code generation, it can:

1. Surface a disclosure notice to the developer
2. Log an anonymized usage event to the SPARK Registry
3. Include an attribution comment in generated code

This requires no change to the license enforcement model. It requires AI tool vendors to implement a lightweight protocol. The incentive structure: tools that implement it can credibly claim SPARK compliance; tools that don't become the ones associated with license violations.

The robots.txt parallel holds here. robots.txt is not legally binding in most jurisdictions, but violating it is a reputational and practical liability. SPARK metadata works the same way.

---

### Mechanism 2: Declarative AI Dependency Reporting

For projects that use AI coding tools, SPARK License requires an annual `AI_DEPENDENCIES.md` declaration — a best-effort estimate of which open source projects materially informed AI-generated code in the project.

This is not an audit. It is a self-attestation, similar to how carbon footprint disclosures work. It is acknowledged to be imprecise. The purpose is not to achieve perfect accuracy — it is to create a practice of looking, and a paper trail that makes good-faith compliance visible.

The SPARK toolchain provides a scanner that:
- Analyzes import patterns and code structure
- Cross-references against the SPARK Registry
- Generates a draft `AI_DEPENDENCIES.md` for developer review and submission

Submission to the SPARK Registry updates dependency weights in the Funding Funnel, directing a portion of the 1% obligation toward projects identified as AI-era dependencies.

---

### Mechanism 3: AI Tool Protocol Integration

The highest-leverage intervention is at the AI tool layer. A SPARK Protocol integration for AI coding tools would:

- At code generation time: check if referenced code originates from SPARK-licensed repositories
- Log anonymized usage events (project identity, not user identity) to the SPARK Registry
- Provide developers with a one-click disclosure flow

This is analogous to how package managers handle license compliance today — npm warns you when you install a package with a license incompatible with your project. SPARK Protocol extends this to AI-generated code.

Target integrations, in priority order:
1. Continue.dev (open source, fastest to integrate)
2. Cursor (largest developer mindshare, high strategic value)
3. GitHub Copilot (requires Microsoft partnership, long-term goal)

The data model is privacy-preserving by design: the Registry records that a SPARK-licensed project was used in a session, not who used it or in what project. Usage frequency informs Dependency Funnel weights. No individual developer is identified or tracked.

---

### Mechanism 4: Semantic Code Fingerprinting

The longest-term mechanism. Embed statistically detectable patterns into SPARK-licensed codebases — not visible markers, but structural regularities in algorithm design, test coverage patterns, and naming conventions that survive transformation by AI tools.

When AI-generated code contains these patterns at above-baseline frequency, it is evidence (not proof) of training influence from that project.

This is currently a research-stage capability. Several academic groups (MIT CSAIL, Stanford) have demonstrated the principle. Productionizing it at the scale of a license enforcement system is a 3–5 year horizon.

OpenSeed will monitor this space and incorporate fingerprinting capabilities into the SPARK toolchain as the research matures. It is not a dependency for the current implementation.

---

## License Structure

SPARK License 1.0 has three tiers, triggered by project stage:

**Tier 0 — Pre-commercial (default)**

Identical to MIT. No obligations active. Full freedom to use, modify, distribute.

**Tier 1 — Commercially active**

Triggered by: annual revenue exceeding $50,000, or token issuance (TGE).

Obligations:
- 4% of economic upside directed to SPARK-aligned projects (via Registry)
- 1% of economic upside directed to declared dependencies
- Annual SPARK Report submission
- AI usage disclosure (Mechanisms 1 and 2 above)

**Tier 2 — Scaled (> $5M annual revenue)**

All Tier 1 obligations, plus:
- Participation in SPARK governance (multi-sig or DAO, depending on phase)
- Enhanced dependency audit (not self-reported, third-party verified)

**Grace period:** 3 years from commercialization trigger. Obligations accrue from Day 1 and must be settled by end of Year 3.

**Token projects:** 4% escrowed at TGE regardless of revenue stage.

---

## Enforcement Model

SPARK License enforcement relies on three layers, not one:

**Layer 1: On-chain reputation**

SPARK Registry status is public. A project in `Defaulted` status cannot receive SPARK pool funding, cannot display the SPARK badge, and is publicly searchable as non-compliant. For projects that depend on community trust — which is most open source projects — this is a real cost.

**Layer 2: Ecosystem pressure**

SPARK-aligned projects and funders can make adoption of the license a condition of funding, integration, or partnership. This creates network effects: as SPARK coverage grows, being outside it becomes a liability.

**Layer 3: Legal enforceability (long-term)**

The commercial obligation clauses in SPARK License are designed to be legally enforceable, with jurisdictional coverage expanding as case law develops around similar mechanisms (BSL, Commons Clause). OpenSeed is working with legal counsel to ensure the license text is enforceable in key jurisdictions (US, EU, Taiwan, Singapore) from day one.

The honest assessment: Layer 3 will be weak initially. Layers 1 and 2 carry most of the weight in the near term. This is the same trajectory as GPL — the legal theory preceded practical enforcement by years. The mechanism works before the courts have weighed in.

---

## Relationship to SPARK Pledge

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

---

## What This Means for OpenSeed's Roadmap

SPARK License development is a Phase 2 priority, dependent on the Registry and Funnel infrastructure being operational.

**Phase 1 (current grant period):** SPARK Pledge infrastructure. Establishes the Registry, Dependency Funnel, and Compliance Dashboard. Proves the mechanism works with voluntary adopters.

**Phase 2 (2026):** SPARK License v1.0 release. Legal review complete, AI metadata standard published, Continue.dev integration shipped. License applied to all OpenSeed-developed infrastructure.

**Phase 3:** SPARK Protocol for AI tools. Cursor and/or GitHub Copilot integration. Semantic fingerprinting research incorporated if feasible.

The License does not need to wait for the AI tool integrations to be useful. Every project that publishes under SPARK License adds a node to the dependency graph and a future obligation to the ecosystem. The AI visibility mechanisms improve the quality of that graph over time.

---

## Appendix: Comparison with Existing License Approaches

| License | Commercial restriction | Recursive? | AI usage covered? | Positive obligation? |
|---------|----------------------|------------|-------------------|----------------------|
| MIT | No | No | No | No |
| GPL v3 | No | Yes (code only) | No | No |
| BSL | Yes (time-limited) | No | No | No |
| Commons Clause | Yes (sales restriction) | No | No | No |
| Open Source Pledge | Voluntary | No | No | Yes (voluntary) |
| **SPARK License** | **No (usage free, upside shared)** | **Yes (economic)** | **Yes** | **Yes (triggered)** |
