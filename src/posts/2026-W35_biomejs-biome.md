---
date: 2026-08-30
repo: biomejs/biome
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "Vue and Markdown get big correctness and performance passes"
excerpt: "False positives dropped across Vue, Svelte, Astro, and TS rules, while Markdown parsing/formatting and workspace scans got faster."
commits: 37
---

### Vue/HTML framework support got noticeably smarter
**Vue unused-variable and ref checks were tightened** — custom directives, CSS `v-bind()`, `<script setup>` aliases, `toRefs()`/`useTemplateRef()` flows, and nested callback params are now tracked more accurately, cutting several real false positives in `noUnusedVariables`, `noGlobalAssign`, and `noVueRefAsOperand`.

**Vue formatting became more stable** — interpolations now stay attached to neighboring content at whitespace-sensitive boundaries, reducing drift and making some templates converge in a single format pass.

**Astro and stdin-based framework parsing improved** — Astro now handles implicit fragments, void elements, and shorthand `href` usage more reliably, and stdin files get full Astro/Svelte/Vue support when experimental full framework support is enabled.

### Markdown parsing and formatting sped up
**Markdown formatter avoids costly edge cases** — list formatting no longer does quadratic work on nested layouts, and fenced code blocks inside blockquotes preserve indentation correctly for idempotent round-tripping.

**Markdown parser got multiple performance passes** — the parser now skips unnecessary block-start probing, rescans, allocations, and link-lookahead work, which should reduce overhead on large or structurally complex documents.

### Lint correctness improved across JS, CSS, Svelte, and GraphQL
**TypeScript and Promise rules were refined** — `noUnusedVariables` now respects implemented overload type parameters, `noFloatingPromises` better distinguishes awaited Promise values, and `useArraySortCompare`/`noFloatingPromises` avoid expensive inference in common paths.

**CSS selector ordering is more accurate again** — `noDescendingSpecificity` received a broader specificity check, briefly landed a repeated-tail fix, and then was reverted the next day after regression handling.

**Svelte and GraphQL diagnostics were cleaned up** — Svelte now reports HTML comments inside tag attribute lists and avoids duplicating render comments, while GraphQL enum naming diagnostics point at the actual offending token.

### Workspace scanning and binary size were trimmed
**Workspace analysis no longer re-runs dependency scans** — a scanner bug that could cause repeated dependency analysis and long hangs was fixed with an epoch-based queueing path.

**A refactor aims to shrink binaries** — registry and rule matching were simplified to reduce generic instantiations, with supporting analyzer, CLI SARIF, config, and codegen updates.

### Other misc changes
- Release tooling and changesets were updated repeatedly throughout the week.
- Several internal cleanup, test, and snapshot updates landed alongside the user-facing fixes.
- Toolchain and dependency bumps were included early in the week.
