---
date: 2026-05-31
repo: biomejs/biome
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: M
title: "Parser edge cases fixed across Markdown, YAML, Svelte, SCSS"
excerpt: "Biome tightened parsing and formatting for several languages, expanded lint coverage, and added plugin config plus unstable playground builds."
commits: 13
---

### Parser and formatter correctness got a broad polish
**Markdown list and fence handling improved** — fenced code blocks now stop at list boundaries, unterminated fences are handled more accurately, and loose lists after empty items stay grouped correctly.
**YAML syntax support expanded** — aliases are now accepted as mapping keys, and anchor/tag properties before block sequences parse and format correctly.
**Svelte and SCSS edge cases fixed** — omitted `then`/`catch` bindings in Svelte await blocks are now valid, and semicolonless `@use`/`@forward` rules in SCSS no longer trip parsing.

### Linting and config surfaces grew
**`noUnnecessaryConditions` catches more dead logic** — the rule now uses type info to flag more always-true/false checks, including nullish, optional chaining, logical, and impossible `switch` cases.
**`useNullishCoalescing` got finer control** — a new `ignoreMixedLogicalExpressions` option suppresses suggestions inside mixed `&&`/`||` trees.
**Plugin config is now part of the public schema** — emitted types/regression issues were fixed and a new `plugins` field was added to the surfaced config API.

### Tooling and playground updates
**Playground preview WASM can enable unstable features** — preview builds now pass `--features=unstable`, with the WASM crate wiring Markdown/YAML support through that flag.

### Other misc changes
- CI and release automation updates, including stale-issue workflow changes and safer GitHub Actions steps
- Release housekeeping, changelog/package version bumps, and changeset cleanup
