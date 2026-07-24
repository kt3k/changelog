---
date: 2026-07-23
repo: microsoft/typescript-go
size: L
title: "Incremental rebuild fix and checker stability rules"
excerpt: "A batch rebuild bug fix and a new custom lint rule both aim to keep TypeScript diagnostics and incremental output consistent."
commits: 3
authors: [weswigham, martijnwalraven, ahejlsberg]
commit_authors: {"9696f95": weswigham, "d750f85": martijnwalraven, "3c4eee0": ahejlsberg}
---

### **Incremental rebuilds now include all affected files** (d750f85)
When a changed file affects global scope, `getFilesAffectedBy` now returns the full affected-file set instead of just marking the flag and continuing. This fixes cases where batched dependency updates could miss transitive rebuilds or produce stale incremental results.

### **Added a lint rule to catch checker returns that skip child checks** (9696f95)
A new custom analyzer flags early `return` paths in checker dispatch methods when child nodes might not have been checked first. The change is aimed at preventing traversal-order-dependent diagnostic output, which makes errors more stable and predictable.

### **Optimized union assignability checks in CFA** (3c4eee0)
`typeMaybeAssignableTo` now does a quick containment check before iterating union constituents, avoiding extra work when the target type is already present in the source union. This is a targeted performance improvement in control-flow analysis.

### Other misc changes
- Expanded incremental/tsbuild test coverage for global-scope dependency updates and watch/noEmit scenarios.
- Updated checker and baseline outputs to reflect diagnostic ordering/stability changes.
- Added custom lint test data and minor internal checker/utilities refactors.
