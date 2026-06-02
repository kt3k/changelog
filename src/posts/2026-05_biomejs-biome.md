---
date: 2026-05-31
repo: biomejs/biome
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Biome’s Sass, Markdown, and Vue support level up"
excerpt: "May brought major SCSS parser/formatter expansion, stronger Markdown/YAML parsing, new lint rules, and plugin/feature gating cleanup."
commits: 174
---

### SCSS becomes much more complete
Biome spent the month filling major Sass gaps in the parser, formatter, and analyzer. Support expanded across interpolation in selectors, pseudo/selectors, attribute selectors, nested properties, keyframes, media/container queries, `url()` values, parent selectors, semicolonless `@use`/`@forward`, semicolonless statement at-rules, and `@include ... using`. Formatting also improved for maps, `@if`/`@else if`, `@each`, binary expressions, blank lines, comments, and interpolation spacing, with several fixes aimed at preserving source intent and reducing churn.

### Markdown parsing got a broad CommonMark cleanup
Markdown handling saw repeated fixes for list continuation, ordered sublists, lazy continuations, fenced code boundaries, quoted list interruptions, blank-line separators, and reference-definition edge cases. The result is a more faithful parser and formatter for nested lists, blockquotes, thematic breaks, and fenced code blocks, with fewer AST surprises in real-world docs.

### YAML support moved from gaps to a real foundation
YAML parsing improved substantially with support for properties, anchors, tags, aliases as keys, and harder mapping/flow cases. Biome also added experimental YAML formatting plumbing, service wiring, and broader test coverage, laying groundwork for first-class YAML formatting while still keeping it gated.

### New lint rules and rule upgrades
May added several new rules, especially for JavaScript and Vue: `noExcessiveNestedCallbacks`, `noBaseToString`, `useThisInClassMethods`, `useTestHooksInOrder`, `useVueNextTickPromise`, `noVueImportCompilerMacros`, and `useVueValidVFor`. Existing rules also became more capable, including `useDestructuring` option parity, `noMisleadingReturnType` improvements, `useOptionalChain` and `noUnnecessaryConditions` coverage, `useNullishCoalescing` configurability, and readonly/`as const`-aware TypeScript checks.

### Tailwind, HTML, and Svelte got meaningful parser upgrades
Tailwind arbitrary values were taught to parse more like CSS, with better handling for numbers, percentages, functions, URLs, math, and typed v4 arbitrary values for sorting. HTML/Svelte parsing and formatting improved around text-context keywords, comments splitting tags, multiline interpolation, function bindings, await blocks, and Astro frontmatter/diagnostic positioning.

### Architecture, config, and CI became more modular
Biome introduced feature gating for plugins and several language services, making Markdown/YAML/GraphQL/Grit and plugin support more explicitly opt-in. The CLI transport was refactored, dependency and workflow hygiene improved, and CI hardening included all-features checks, security scanning, and workflow permission reductions. Import organization also got stricter validation for unknown predefined groups and clearer diagnostics.

### Other misc changes
- `biome rage --linter` now reports domain-enabled rules correctly.
- `noStaticElementInteractions` excludes custom elements; `noThisInStatic` ignores `new this()`.
- `noUntrustedLicenses` text was fixed and several diagnostics/messages became more precise.
- Multiple release housekeeping, dependency bumps, docs, snapshots, and test-harness updates.
