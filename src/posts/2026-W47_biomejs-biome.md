---
date: 2026-11-22
repo: biomejs/biome
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: L
title: "Astro analysis lands as Biome speeds up and sharpens linting"
excerpt: "Major Astro semantic support, a burst of new lint rules, parser/formatter fixes, and several hot-path performance wins shipped this week."
commits: 88
---

### **Astro analysis becomes first-class**
Biome laid the groundwork for a full Astro semantic model, then extended it across frontmatter, client scripts, `define:vars`, and cross-language references. That enables more accurate linting, rename/unused-import handling, and file-level rules for host documents, while also adding Astro-specific rule support like `noAstroComponentDefaultExport` and better dynamic attribute analysis.

### **Lint coverage expanded across frameworks, SQL, and tests**
This week added a large batch of nursery rules: `noUselessBind`, `useConsistentIndexedObjectStyle`, `noVueDuplicateVElseIf`, `noVueNegationElse`, `noImmediateMutation`, `noArrayDelete`, `useEarlyContinue`, `useDescribeFunctionTitle`, `useExpectEqualityMatcher`, `noExpectToHaveBeenCalledOnce`, `noCanvasToImage`, `noUnsafeSqliteInterpolation`, plus TanStack Query rules for exhaustive dependencies and mutation property order. Biome also added Convex as a recognized rule source, improving ecosystem coverage and config/migration support.

### **Parsing, formatting, and semantic accuracy improved across the board**
Several correctness fixes landed in Markdown, HTML/Svelte, Vue, and Svelte snippet parsing. Notable changes include fixing Markdown emphasis pairing and a whitespace-only blockquote hang, preserving touching HTML/Svelte blocks, handling Astro embeds and doctype edge cases, and supporting Svelte `{#snippet}` type parameters end-to-end. CSS specificity comparisons and nullish-coalescing lint logic were also tightened to reduce false positives.

### **Performance work continued in core internals and plugins**
Biome shipped multiple hot-path optimizations: faster parser and rowan internals, a more efficient `BatchMutation` apply path, fewer per-file project-layout allocations in lint/check/ci, faster GritQL match handling and binding conversion, and Tailwind lexer fast paths including SIMD and NEON classification. These changes target large-project throughput and reduce quadratic behavior in mutation-heavy or match-heavy workflows.

### **Type inference and plugin APIs got smarter**
Type narrowing was expanded to track aliased and property-based conditions, optional-chain receivers, logical assignments, and more TypeScript-like control flow, improving precision for rules such as `noUnnecessaryConditions`. The JS plugin runtime also gained trivia-aware node/token APIs and richer diagnostic targeting, making comment-sensitive rules easier to implement.

### **Other misc changes**
- CLI path handling was refactored for workspace-aware correctness across inspect/search/migrate/file processing
- Module graph support expanded for Sass `@use`, `@forward`, and `@import`
- Dependency, release, CI, and snapshot refreshes throughout the week
