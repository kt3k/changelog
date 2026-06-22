---
date: 2026-06-21
repo: biomejs/biome
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Security, LSP stability, and analyzer correctness land"
excerpt: "Biome shipped security updates, tightened LSP behavior, and fixed several lint/analyzer false positives across HTML, Svelte, and JSX."
commits: 30
---

### **Security and editor stability were the big themes**
Biome updated Vite to 7.3.5 and made related toolchain/security adjustments, while also hardening the formatter's dirty-file scan and bumping git2 in the codegen path. On the editor side, go-to-definition was turned off by default to avoid eager module-graph work and memory issues in large workspaces, and multi-root LSP config loading was fixed so one broken folder no longer suppresses diagnostics in others.

### **Lint/analyzer accuracy improved across HTML, JSX, and Svelte**
Several false positives were fixed: `useErrorCause` now recognizes shorthand `cause` properties, `useInlineScriptId` trims trivia before checking existing `id` attributes, `useAnchorContent` skips anchors used as render props, and `noUnusedVariables` now treats Svelte `{@html}` references as used. Biome also clarified `useValidAnchor` docs for invalid `href` cases, including the `href="#"` edge case.

### **Semantic/config groundwork moved forward**
Rule configuration now requires an explicit `level`, making config validation stricter and failures more immediate. In semantic analysis, same-name function overloads are now tracked separately, and a new codegen pipeline was introduced for generating global TypeScript type data, laying groundwork for replacing hand-maintained metadata.

### **Diagnostics and rule messaging became more helpful**
`useFlatMap` diagnostics now explain the performance benefit of `.flatMap()`, and `useExportType` was refactored to share list-splitting helpers, reducing duplication in the analyzer. There were also a few small docs and JSDoc wording fixes alongside internal helper cleanups.

### **Other misc changes**
Dependency bumps and lockfile updates, workflow/image digest refreshes, additional HTML accessibility test coverage across Astro/Svelte/Vue fixtures, snapshot updates, and minor migrator cleanup.
