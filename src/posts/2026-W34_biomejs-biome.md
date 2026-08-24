---
date: 2026-08-23
repo: biomejs/biome
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "Biome adds plugin TS support, new safety rules, and parser wins"
excerpt: "This week brought TypeScript plugins, new security/safety lint rules, a TS stripTypes transform, and broad parser/formatter fixes."
commits: 50
---

### Major new capabilities
**TypeScript plugins are now supported** — Biome’s JS plugin runtime can load `.ts` plugins, expanding authoring options and tightening syntax validation.

**TypeScript type stripping lands as a new JS transform** — A new `stripTypes` transformation erases TS annotations across classes, enums, imports/exports, namespaces, and more.

**Markdown frontmatter parsing is now supported** — Markdown files can preserve YAML-style frontmatter end-to-end through parsing and formatting.

### Safety and linting improvements
**New Astro and CSS safety rules** — The week added `useAstroClientOnlyDirectiveValue`, `noAstroSetHtmlDirective`, `useNamedLayer`, and `noUndeclaredCustomProperties`, covering invalid Astro directives, XSS-prone HTML injection, anonymous cascade layers, and undeclared CSS variables.

**New TypeScript correctness checks** — `noUnsafeTypeAssertion` now flags unsound `as` assertions, while `useStrictMode` and Vue-related rules were refined to reduce false positives and avoid unsafe autofixes.

### Parser, resolver, and analyzer fixes
**Astro, Svelte, Vue, YAML, and JS parsing got major cleanup** — Biome fixed multiple edge cases around Astro expressions/frontmatter, incomplete Svelte declarations, Vue bindings, YAML indentation and mapping parsing, and parenthesized object expressions in JS.

**TypeScript path resolution and inference improved** — Path aliases without `./` now resolve correctly, and local inference was tightened for dependent class members to improve analysis quality and performance.

**Plugin and GritQL tooling became more capable** — JS plugins can query nodes by kind, GritQL handles metavariables in quoted strings and richer export patterns, and WASM builds can opt into JS plugins.

### Performance and internal refactors
**Analyzer, deserializer, and markdown hot paths were optimized** — Several internal refactors reduced monomorphization, narrowed lint queries, improved cache eviction, and trimmed markdown lexer/formatter overhead.

### Other misc changes
**Maintenance and cleanup** — CI and dependency updates, release housekeeping, changeset cleanup, and assorted test/snapshot refreshes landed throughout the week.
