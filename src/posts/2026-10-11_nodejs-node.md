---
date: 2026-10-11
repo: nodejs/node
size: M
title: "Node tightens builds and fixes tracing"
excerpt: "Major simdjson integration, a diagnostics_channel context fix, and several build/runtime correctness updates landed."
commits: 10
authors: [aduh95, lemire, nodejs-github-bot, lazerg, MikeMcC399, nigrosimone, mcollina]
commit_authors: {"3b639be": aduh95, "6b07f2f": lazerg, "85543c1": MikeMcC399, "cbac135": mcollina, "2e9d43c": lemire, "08a7e39": lemire}
---

### **Update simdjson and stop dragging its headers through env.h** (08a7e39, 2e9d43c)
Node upgrades simdjson to 5.0.3 and refactors inspector profiling to keep the large simdjson header out of broad transitive includes. That should cut parser overhead across many `src/` files and also changes how profile JSON is extracted and written.

### **Fix diagnostics_channel callback context allocation** (cbac135)
`traceCallback()` now creates a fresh context when none is provided, instead of reusing a frozen empty object. This avoids shared-state bugs when subscribers are present and aligns callback tracing behavior with the sync/promise tracing paths.

### **Fix CJS package-map resolution for package imports** (6b07f2f)
CommonJS resolution now skips package-map lookup for `#`-prefixed imports, letting `imports` entries resolve normally. This closes a bug where package imports could be incorrectly routed through the experimental package map instead of the package's own `imports` map.

### **Keep gtest out of the node link line** (3b639be)
The build now separates gtest's extra libraries from the main `node` binary link path, while still allowing cctest to use them. This reduces unnecessary link-time dependencies in the shipped binary.

### **Support Python 3.15 in CI and configure scripts** (85543c1)
Multiple workflows and configure entrypoints were updated to use Python 3.15. This is a build-environment compatibility update that keeps CI and tarball generation working as Python releases advance.

### Other misc changes
- Nixpkgs updates for tooling (2 commits)
- Doc tooling dependency bumps in `/tools/doc`
- Fix NAPI benchmark handling in GitHub Actions
- V8 cherry-pick to fix GCC 16 arm64 compilation
