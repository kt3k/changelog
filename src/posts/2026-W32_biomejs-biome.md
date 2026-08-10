---
date: 2026-08-09
repo: biomejs/biome
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "Biome adds Markdown, YAML, and stronger CSS semantics"
excerpt: "This week brought Markdown and YAML support, better CSS/HTML semantics, a new React Compiler rule, and multiple parser and lint fixes."
commits: 53
---

### Major language support and linting expansion
**Markdown linting landed end-to-end** — Biome now supports Markdown analysis with CLI/SARIF integration and a first nursery rule, `useConsistentHeaderLevel`. The parser was also refactored into a two-phase design with checkpoint-based inline resolution for better correctness and maintainability.

**YAML parsing is now in play** — A new YAML parser shipped with improved error recovery and benchmark coverage, making YAML a first-class parsing target with performance tracking.

**CSS semantics got materially stronger** — Biome added validation for registered custom properties, including a new nursery lint for invalid `@property initial-value`s. It also fixed parsing/semantic handling for `@property syntax`, SCSS partial combinator selectors, and CSS formatting around block comments.

### Framework- and ecosystem-aware lint improvements
**HTML, Svelte, and Vue cases were tightened up** — HTML `style` attributes are now parsed as CSS, giving real DOM styles full lint coverage. Several framework-specific false positives and formatting bugs were fixed too: Svelte attachments count as references, Vue `:deep()` is accepted in embedded styles, Vue template globals are scoped correctly, and Svelte legacy `{@const}` now has a dedicated nursery rule.

**React Compiler lint mode arrived** — Biome added `useReactCompiler`, a nursery rule that reports React Compiler lint diagnostics and is wired into config, docs, metadata, and tests.

**Tailwind sorting became more accurate** — `useSortedClasses` now accounts for variant ordering across the full class list, improving class sorting behavior for Tailwind v4 setups.

### Parser, formatter, and analyzer fixes
**Import-cycle analysis got faster** — `noImportCycles` was optimized with SCC-based pruning and explicit `node_modules` skipping, reducing unnecessary graph traversal on large projects.

**Markdown, HTML, and Svelte formatting/parsing were hardened** — Biome fixed HTML EOF comment duplication, blank-line preservation, multiline suppression handling, embedded script/style formatting, and Svelte parsing issues around array-pattern holes and double-curly braces.

**Type inference and promise/undefined rules were refined** — Legacy type inference was prepared for removal, `noMisusedPromises` got faster, `noUselessUndefined` became smarter about explicit return types, and `useAwait` now recognizes `await using`.

### Other misc changes
- Added a Claude code-review skill and contributor docs
- Grit WASM snippet offsets were fixed for non-ASCII text
- Various rule performance, diagnostics, benchmark, CI, and dependency updates
