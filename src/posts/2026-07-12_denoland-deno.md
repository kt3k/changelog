---
date: 2026-07-12
repo: denoland/deno
size: L
title: "Sync-types now works without node_modules"
excerpt: "Deno sync-types can now generate TypeScript mappings from module graph roots in global-cache mode, avoiding a node_modules tree."
commits: 1
authors: [nathanwhit]
commit_authors: {"786457c": nathanwhit}
---

### **sync-types now supports root-based discovery and global-cache mode** (786457c)
`deno sync-types` can now take one or more file/directory roots, discover dependencies only from those module graph roots, and generate the tsconfig/type mappings needed for stock TypeScript tooling. This also removes the old requirement to materialize `node_modules`, so it works in `nodeModulesDir: "none"` by generating per-package TypeScript projects under `.deno/npm/` with mapped dependency paths.

The command’s CLI, flag plumbing, and tsconfig generation logic were updated accordingly, along with tests covering the new global-cache workflow.

### Other misc changes
- None
