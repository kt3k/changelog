---
date: 2026-09-27
repo: biomejs/biome
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: L
title: "Biome sharpens type inference, parser correctness, and LSPs"
excerpt: "A week of major type-lowering expansion, resolver/LSP improvements, and a stream of parser, formatter, and lint correctness fixes."
commits: 50
---

### Type system and declaration lowering got much deeper
**Big expansion in generated global types and lowering** — Biome substantially widened its type model, adding support for indexed access types, `keyof` in generic operands, predefined types with generics, generic constructors, function/overloaded call signatures, `Array.from`, `RegExp`, builtin constructors, `Iterable`, `Math`, and readonly/const-generic inference. This should improve exhaustiveness, builtin understanding, and downstream analysis precision across the JS/TS ecosystem.

### Resolver and language-server workflows improved
**Workspace resolution and file watching became more robust** — The resolver was reworked to use salsa-backed inputs so manifest and path-mapping changes stay in sync in long-running workspaces without touching importing files. In parallel, the LSP now scopes file watchers per workspace folder and falls back safely for older clients, tightening incremental behavior in multi-root setups.

### Parser, analyzer, and suppression handling were hardened
**Several correctness bugs in parsing and embedded analysis were fixed** — Biome now handles suppression comments more accurately in YAML, HTML-ish snippets, JavaScript embeddings, and Svelte blocks. It also fixed tricky TypeScript parsing around `<<`/instantiation expressions and corrected HTML regex lexing, reducing false parse errors and making ignores behave where developers expect them.

### Linting and autofix behavior became more trustworthy
**Multiple rules were refined or added** — New nursery rules landed for Tailwind raw colors, logical CSS properties, and meaningless `void` usage. Existing rules were tightened for self-recursive arrow functions, focused-test detection, negative-index handling, `for...of` suggestions, infinite truthy loops, and `frame-sizing`, while config handling was corrected so disabled domains and invalid config files no longer hide expected diagnostics.

### Formatter and CLI fixes cleaned up edge cases
**Formatter and CLI output got a round of polish** — Fixes landed for YAML suppression placement, Svelte block comments, GritQL spacing, plugin load error reporting, and `noOctalEscape`/string-concat autofixes so rewrites preserve code meaning and diagnostics are easier to act on.

### Other misc changes
- Added benchmarks and fixtures for complex module-graph/type-inference workloads
- Updated tests, snapshots, and internal analyzer plumbing throughout the week
- Misc dependency, docs, and release-note maintenance
