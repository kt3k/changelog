---
date: 2026-06-11
repo: biomejs/biome
size: M
title: "Module graph refactor removes DB mutex"
excerpt: "A broad internal refactor rewires module-graph symbol lookups to avoid the salsa DB mutex and updates several lints and services to use the new flow."
commits: 1
authors: [ematipico]
commit_authors: {"ac6615c": ematipico}
---

### **Module graph lookups drop the salsa DB mutex** (ac6615c)
Biome’s module-graph internals were refactored to remove mutex-based access around the salsa database and replace it with module-scoped symbol handling. That change ripples through import/class resolution, lints, and service “go to” paths, which should simplify concurrent access and reduce contention in these code paths.

### Other misc changes
- CI workflow tweak: removed a pinned `tombi` version from autofix.
- Cargo manifest formatting and dependency feature list cleanup in `biome_cli`.
- Spec test updates and assorted internal refactors across module-graph and service code.
