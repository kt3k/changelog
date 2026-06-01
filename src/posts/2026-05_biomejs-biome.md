---
date: 2026-05-31
repo: biomejs/biome
period: monthly
slug: 2026-05
period_label: "May 2026"
size: M
title: "Parser correctness and rule coverage improved across languages"
excerpt: "Biome fixed several parser edge cases in Markdown, YAML, Svelte, and SCSS, while expanding lint rule precision and adding plugin config support."
commits: 13
---

### Parser and formatter correctness across markup languages
Biome spent the month tightening syntax handling in several front-end and content languages. Markdown parsing was fixed for fenced code blocks that should stop at list boundaries, and for loose lists that follow empty items, bringing CommonMark behavior closer to spec. YAML got multiple fixes too: aliases can now be used as mapping keys, and anchors/tags are correctly lexed before block sequences. On the template side, Svelte `{:then}`/`{:catch}` blocks now accept omitted bindings, and SCSS semicolonless `@use`/`@forward` rules are parsed and formatted cleanly.

### Linting got smarter and more configurable
`noUnnecessaryConditions` now catches a broader set of redundant conditions using type information, including optional chaining, nullish coalescing, logical expressions, null/undefined comparisons, and impossible `switch` cases. In parallel, `useNullishCoalescing` gained `ignoreMixedLogicalExpressions`, giving teams a way to suppress suggestions in mixed `&&`/`||` trees.

### Public config and build/runtime updates
Biome’s public schema now exposes a `plugins` configuration field, and a regression in emitted configuration types/schema generation was fixed so generated typings stay aligned. Playground preview WASM builds also started enabling unstable features, with the WASM crate gaining an `unstable` feature flag to toggle Markdown and YAML support for web previews.

### Other misc changes
- Release housekeeping, changelog/package version updates, and changeset cleanup
- CI and GitHub Actions workflow updates, including stale-issue automation and safer steps
- Minor token/workflow maintenance in repository automation
