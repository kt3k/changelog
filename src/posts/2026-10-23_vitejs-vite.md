---
date: 2026-10-23
repo: vitejs/vite
size: M
title: "Sourcemap fix and HMR reload polish"
excerpt: "A few notable fixes landed: sourcemap handling now respects environment settings, and bundled dev HMR reloads more reliably on entry churn."
commits: 7
authors: [sapphi-red, h-a-n-a, btea]
commit_authors: {"82e7aa0": sapphi-red, "67c965b": btea, "a236886": h-a-n-a}
---

### **Respect build sourcemap from the active environment** (82e7aa0)
Vite now reads `build.sourcemap` from `this.environment.config` in plugin-legacy, CSS, asset URL, and worker URL transforms. This fixes cases where sourcemap behavior could be wrong in non-default environments.

### **Bundled dev HMR reloads when an entry can’t be re-run** (a236886)
The bundled dev HMR client now detects entries that no longer have a valid HMR boundary and triggers a full reload earlier and more deterministically. The update also removes the old orphan-tracking logic and adds new coverage for entry cycles and removed imports.

### **Alias resolution now handles `$` replacement patterns correctly** (67c965b)
Vite updated `@rollup/plugin-alias` to v6.0.1 and added regression tests for replacements containing `$$` and `$&`, while preserving capture-group behavior. This closes a class of aliasing bugs that could mis-handle literal dollar sequences in resolved paths.

### Other misc changes
- Moved dynamic-import playground coverage out of optimize-deps and into its own fixture set, with expanded CommonJS interop cases.
- Switched e2e test isolation to `isolate: false` and refactored shared playground test helpers.
- Aligned fallback HTML charset casing.
- Updated watch tests to use a new `waitForRebuild()` helper to avoid Rolldown rebuild flakiness.
- Misc dependency/test fixture maintenance.
