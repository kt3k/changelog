---
date: 2026-08-07
repo: biomejs/biome
size: L
title: "YAML parser lands, Tailwind sort gets smarter"
excerpt: "Major YAML parsing work, Tailwind v4 class ordering, and several parser/formatter fixes across HTML, Markdown, CSS, and GraphQL."
commits: 12
authors: [ematipico, dyc3, Netail, johncarmack1984, subotac]
commit_authors: {"f3a9868": dyc3, "73896e6": ematipico, "896e89a": johncarmack1984, "dc59333": dyc3, "d4d8e6f": ematipico, "ad897ce": ematipico, "e7dc67e": ematipico, "6a85588": dyc3, "edacfc6": Netail, "ca2e0d0": ematipico, "1d24304": Netail, "caefe39": subotac}
---

**YAML parser error recovery and benchmark support** (e7dc67e)
Biome’s YAML parser got a substantial upgrade to catch more syntax errors, with new fixtures covering block-scalar indentation, duplicate indicators, and mapping recovery. The repo also adds dedicated benchmark wiring for YAML, signaling parser performance is now being tracked as part of the workflow.

**Tailwind v4 class sorting now accounts for variant ordering** (896e89a)
`useSortedClasses` now groups variants across the full class list before assigning sort weights, so variant placement is determined consistently rather than locally per candidate. This is a notable behavior change for class ordering, especially for Tailwind v4 presets and config extraction.

**Markdown parser now reparses deferred inlines via checkpoints** (ca2e0d0)
The markdown parser was refactored to restore state from checkpoints when resolving deferred inline content, instead of relying on the previous event-range handling. This is primarily a performance and robustness improvement for parsing documents with later link definitions.

**HTML/Svelte parsing fixes stop misreading double curly braces** (6a85588)
Svelte handling was corrected so `{{ ... }}` is no longer mistaken for an interpolation in cases like object literals inside expressions. That fixes real parse failures in Svelte content and tightens the HTML parser’s treatment of embedded syntax.

**HTML formatter now indents embedded script/style content in Prettier samples** (f3a9868, dc59333)
The HTML formatter test suite was expanded and updated to reflect improved formatting of embedded script and style blocks, including multi-parser cases and numerous snapshot changes. This is a formatter behavior change, but the commit is mostly test-driven and narrowly scoped to embedded content handling.

**CSS block comments preserve their source indentation** (caefe39)
CSS formatting now keeps block comments between a property colon and its value aligned with the original indentation instead of stripping it. That improves readability for custom properties and fixes a visible formatting regression.

### Other misc changes
- GraphQL `noRootType` diagnostic range fix and message polish (73896e6)
- Rule-generation and rule-renaming maintenance for markdown tooling (ad897ce, 1d24304, edacfc6)
- Path normalization cleanup across ruledoc/language tooling (d4d8e6f)
- HTML parser lexer/parser adjustments to support the Svelte fix (6a85588)
- Minor test/snapshot updates across HTML and GraphQL
- Dependency and config churn in YAML tooling (Cargo.lock, bench deps)
