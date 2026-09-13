---
date: 2026-09-12
repo: biomejs/biome
size: L
title: "HTML fixes, a new Svelte rule, and faster parsing"
excerpt: "Biome fixed Svelte attribute-expression writes, added a nursery Svelte debug-tag rule, improved HTML formatting performance, and removed a parser slowdown."
commits: 4
authors: [santichausis, griff-rees, dyc3, ematipico]
commit_authors: {"3835945": santichausis, "71eaa0d": griff-rees, "27177ca": dyc3, "ff992a1": ematipico}
---

**Fix writes for fixes inside HTML attribute expressions** (3835945)
`biome check --write` and `biome lint --write` now correctly apply diagnostics inside HTML attribute expressions, such as Svelte event handlers and mustache expressions. This closes a silent no-op bug where fixes were reported as available but never written back.

**Add `noSvelteAtDebugTags` for Svelte `{@debug}` tags** (71eaa0d)
Biome now ships a new nursery rule that flags Svelte `{@debug}` tags and offers a safe fix to remove them. It also wires the rule into config schema, ESLint migration, and Svelte rule metadata so it behaves like the rest of the linter.

**Speed up HTML formatting and fix tag classification** (27177ca)
The HTML formatter now uses token-set checks instead of repeated string comparisons for native tag detection, which should help documents with lots of HTML/SVG elements. The same change also fixes component/native tag misclassification in Vue, Svelte, and Astro, and removes obsolete special handling for `<listing>`.

**Avoid quadratic slowdown in large parenthesized object expressions** (ff992a1)
The lexer no longer eagerly consumes a huge iterator when extending lookahead, preventing quadratic behavior on large parenthesized object expressions. This is a meaningful performance fix for formatting and checking large files.

### Other misc changes
- Performance and bugfix changes above included a few related tests and changelog entries.
