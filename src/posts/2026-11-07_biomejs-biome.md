---
date: 2026-11-07
repo: biomejs/biome
size: L
title: "Svelte const tags and GritQL plugin queries"
excerpt: "Biome adds GritQL-based JS plugin queries, fixes typed Svelte {@const} parsing/formatting, and tightens a switch-declarations lint rule."
commits: 3
authors: [dyc3, Riccardo-bit-cpu, arendjr]
commit_authors: {"05a1409": dyc3, "419aa5d": Riccardo-bit-cpu, "d1896a0": arendjr}
---

### **GritQL patterns are now supported in JS plugins** (d1896a0)
Biome now lets JavaScript plugins use `grit()` queries to select nodes with GritQL patterns instead of only `ast()` or `semantic()` selectors. This opens up more expressive rule matching for multi-node shapes, while explicitly rejecting patterns that contain rewrites.

### **Typed Svelte `{@const}` tags now parse and format correctly** (05a1409)
Svelte `{@const}` tags with TypeScript annotations are now handled in `<script lang="ts">` components, fixing parsing and formatter output for typed destructuring, arrays, and annotated expressions. The change also adds coverage to ensure these files still lint correctly after formatting.

### **`noSwitchDeclarations` stops flagging `var` declarations** (419aa5d)
The linter no longer reports `var` declarations inside `switch` clauses for `noSwitchDeclarations`, aligning the rule with `var` hoisting semantics and ESLint's equivalent behavior. The rule still flags block-scoped declarations like `using` and `await using` in switch cases.

### Other misc changes
- Added/updated changelog entries and snapshots for the above fixes.
- Expanded test coverage for Svelte const tags and Grit-in-JS plugin behavior.
- Minor internal refactors in Grit pattern handling and plugin loader support.
