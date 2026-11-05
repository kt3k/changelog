---
date: 2026-11-04
repo: biomejs/biome
size: M
title: "Array-type fixes and a faster lint walk"
excerpt: "Biome improves lint performance and tightens type-aware rules for arrays, maps, sets, and Promise callbacks, plus a CLI symlink test fix."
commits: 5
authors: [dyc3]
commit_authors: {"fe9248e": dyc3, "ce71284": dyc3}
---

### **Faster kind-filtered syntax walks** (fe9248e)
Biome’s lint traversal now skips childless nodes and avoids copying segment data during preorder walks. That should reduce overhead in lint passes that filter by syntax kind, especially on large trees.

### **Type inference cleanup unlocks better linting** (ce71284)
The Array type lowering override was removed, and the generated global type data plus inference code were updated accordingly. This also broadens lint coverage: `useExhaustiveSwitchCases` now catches non-exhaustive switches over `Array.prototype.entries()`, `Map`, `Set`, and indexed array element properties, while `noMisusedPromises` now flags Promise-returning callbacks passed to array methods like `find` and `every`.

### Other misc changes
- Fixed a flaky CLI symlink test.
- Increased release builder sizes in CI.
- Release metadata/changeset cleanup for the patch batch.
