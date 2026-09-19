---
date: 2026-09-18
repo: biomejs/biome
size: L
title: "Markdown suppression support and lint broadening"
excerpt: "Biome added markdown suppression support, fixed Svelte const tag formatting, and broadened React Compiler diagnostics to all React versions."
commits: 3
authors: [dyc3, ematipico]
commit_authors: {"807f81a": ematipico, "f5e249b": dyc3, "589ca1a": dyc3}
---

### **Markdown now supports suppression comments** (807f81a)
Biome added end-to-end suppression handling for markdown analysis, including new suppression parsing/actions and formatter comment plumbing across multiple languages. This enables rules to recognize and respect markdown suppressions correctly, while also fixing edge cases around empty token ranges and inline suppression generation.

### **Svelte `{@const}` assignments are preserved during formatting** (f5e249b)
`biome check --write` no longer inserts invalid parentheses around Svelte `{@const}` declarations when experimental full HTML support is enabled. The fix is backed by a new CLI regression test covering several assignment patterns, so these constructs should round-trip correctly now.

### **`useReactCompiler` now reports diagnostics regardless of React version** (589ca1a)
The React Compiler lint rule no longer gates diagnostics on `package.json` declaring React 19+. That means projects on React 18 can now see compiler issues too, which makes the rule apply consistently instead of silently skipping older setups.

### Other misc changes
- Markdown formatter and comment-handling refactors across CSS, HTML, JS, GraphQL, Grit, and JSON
- New/updated regression tests and snapshots for suppression, Svelte, Astro, and React Compiler behavior
- Changeset/release note updates
