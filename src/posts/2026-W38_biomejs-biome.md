---
date: 2026-09-20
repo: biomejs/biome
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: L
title: "Biome broadens lint coverage and sharpens type analysis"
excerpt: "New JSON, Vue, React, and Promise lint rules landed alongside Tailwind, markdown suppression, and deeper type/codegen fixes."
commits: 60
---

### Major lint coverage expansions
**JSON correctness rules** — Biome added `noJsonUnsafeValues` to catch non-round-trippable JSON values like infinities, lone surrogates, subnormal numbers, and unsafe integers, plus `useConsistentObjectKeys` to enforce stable Unicode normalization for object keys.

**Framework and JS rule additions** — New nursery rules landed for Vue undeclared directives, React object defaults, Promise rejections using non-Error values, and self-imports. Biome also broadened existing checks like `useIncludes`, `useExhaustiveSwitchCases`, `useReactCompiler`, `useAnchorContent`, `noAstroSetHtmlDirective`, and `useSimplifiedLogicExpression` with fewer false positives and better autofixes.

**Tailwind analysis gets broader and safer** — The Tailwind parser and shorthand rules improved across class expressions, embedded framework syntax, and arbitrary-value handling. Detection now works better in Svelte/Vue/Astro expressions, while shared syntax detection simplified `noTailwindArbitraryValue` and reduced incorrect matches.

### Type inference, codegen, and runtime foundations
**Deeper global type modeling** — Biome expanded generated global type data for built-ins such as Set, Map, Date, RegExp, WeakMap, Symbol, iterator-related declarations, and method/array generics. It also tightened generic substitution and nested alias inference, improving type-aware lint precision.

**Smaller, cleaner runtime and analyzer plumbing** — The JS runtime was slimmed down for a smaller binary, and analyzer services moved behind salsa-backed retrieval. There were also fixes for Grit import-pattern matching and CSS dependency traversal to avoid repeated work and hangs.

### Markdown, suppressions, and formatting fixes
**Markdown suppression support** — Suppressions now work end-to-end in markdown analysis, bringing comment plumbing and parsing in line with other languages.

**Formatting and round-trip fixes** — Several formatter edge cases were corrected, including Svelte `{@const}` handling, fragment parsing in Astro, and safer autofixes for renamed test imports and arrow returns.

### Release and ecosystem plumbing
**Crate publishing hardening** — The repo added publishability checks, a dedicated crate-publish workflow, and release/version bumps to make publishing more reliable.

**Integration updates** — Biome added `@shadcn/lint` as a rule source, improved rule-doc snippet validation for HTML-like examples, and refreshed migration/config mapping across the week.

### Other misc changes
- Dependency, workspace, and CI updates
- Docs and snapshot refreshes
- Minor rule mappings and generated artifact maintenance
