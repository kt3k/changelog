---
date: 2026-06-07
repo: biomejs/biome
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "Biome expands YAML, SCSS, and Svelte support in v2.5 week"
excerpt: "YAML formatting lands, SCSS parsing/formatting gets broader, Svelte/Vue parsing improves, and v2.5 promotes 73 nursery rules."
commits: 46
---

### Major language support and formatter progress
**YAML moved from parsing gaps to real formatting support** — Biome taught the YAML lexer about directives and document ends, added YAML file handling, and started formatting simple block mappings and block sequences. That’s a meaningful step from “mostly parse coverage” toward practical YAML pretty-printing.

**SCSS/CSS support widened across parsing and formatting** — The week brought SCSS function names with interpolated dashed identifiers, bracketed expression lists, interpolated media-query conditions, better binary-expression spacing, string-concatenation indentation, and fixes for grid-template handling. CSS also picked up better selector-list handling in `:global()`/`:local()` and improved comment spacing around declarations and `!important`.

**Svelte and Vue parsing got more template-aware** — Biome now accepts Svelte `{#each}` rename bindings and TypeScript `as const` inside iterables, adds the `useSvelteRequireEachKey` nursery rule, and fixes Vue `v-on` handlers with multiple inline statements plus Vue-specific lint false positives around `v-bind` and hyphenated attributes.

### Release and rule surface changes
**Biome v2.5 shipped with major lint rule promotion** — The release promoted 73 nursery rules to stable, including several renames that may affect configs and migrations. This is the biggest user-facing policy shift of the week.

**New linting coverage arrived for dependencies and membership checks** — The new `useIncludes` rule flags `indexOf(...) !== -1` patterns, while `noRestrictedDependencies` adds package restriction enforcement backed by e18e metadata. `useExportType` also gained a `style` option for controlling export formatting behavior.

### Robustness, diagnostics, and tooling fixes
**Type-aware rules no longer recurse forever** — Biome added recursion-depth tracking for `typeof` flattening, preventing stack overflows in rules like `noFloatingPromises`, `noMisusedPromises`, and `noUnnecessaryConditions`.

**Diagnostics and reporters became more usable** — Overly long diagnostics are now truncated for readability, `noTsIgnore` highlights a tighter range, and the RDJSON reporter now emits actual fix replacement text instead of a description.

**WASM and infrastructure got incremental upgrades** — SCSS support is now enabled in the unstable WASM build, and the week also included workflow/dependency churn plus snapshot refreshes for CSS/SCSS, YAML, HTML, and lint fixtures.

### Other misc changes
- Parser and lexer cleanup for HTML, CSS, YAML, and SCSS edge cases
- Additional fixture and snapshot updates across the formatter and linter
- Release workflow updates and changeset merge churn
