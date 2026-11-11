---
date: 2026-11-10
repo: vitejs/vite
size: M
title: "Build fixes, Windows path perf, and worker HMR"
excerpt: "Notable fixes for CSS entrypoints, transform meta preservation, and inline worker assets; plus a Windows path performance improvement."
commits: 11
authors: [btea, sapphi-red, stevematney]
commit_authors: {"e4ad62b": stevematney, "5e50bae": btea, "a3b28e8": btea, "b643046": btea}
---

### **Reject CSS entrypoints when CSS code splitting is disabled** (e4ad62b)
Vite now errors earlier if `build.cssCodeSplit: false` is used with a CSS input, including virtual entries that resolve to CSS. This prevents an invalid build configuration from slipping through and produces a clearer failure message.

### **Preserve rolldown transform metadata on `ssr` injection** (a3b28e8)
The build pipeline now copies property descriptors instead of shallow-spreading transform options, so rolldown’s lazy `magicString` and `ast` getters survive when Vite adds its own `ssr` flag. That keeps plugin transforms able to edit code through `magicString` without losing metadata.

### **Emit inline worker assets during dev HMR load** (5e50bae)
Inline workers now emit referenced assets during `load` in serve mode, so HMR patches don’t skip the asset generation step. This fixes cases where a worker’s updated asset URL would otherwise never be served after an edit.

### **Speed up Windows realpath resolution for UNC paths** (b643046)
`safeRealpathSync` now defers running `net use` until it actually sees a UNC path, instead of doing that work up front on startup. For projects that only touch local drives, this avoids an unnecessary process spawn while preserving mapped-drive handling when network paths are used.

### Other misc changes
- Updated `@types/node` to v26.
- Updated non-major dependencies across packages and playgrounds.
- Oxlint/Vitest rule enablement and associated test formatting churn.
- Removed an ineffective dynamic import warning test.
- Minor optimizer regex refactor.
