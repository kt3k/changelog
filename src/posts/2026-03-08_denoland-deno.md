---
date: 2026-03-08
repo: denoland/deno
size: M
title: "LSP and types reshuffle land"
excerpt: "Deno sped up LSP caching, fixed tsgo root sync, and split Temporal types into their own declarations file."
commits: 5
authors: [bartlomieju]
commit_authors: {"0e2450c": bartlomieju, "574272d": bartlomieju}
---

### **Fix LSP root file syncing with tsgo** (55b7691)
The LSP now keeps its root file set and URI edits aligned with tsgo instead of relying on inconsistent per-document edit handling. This is a substantive correctness fix for project tracking and diagnostics, with a large accompanying test update.

### **Move Temporal types into a dedicated declaration file** (e7bafc9)
Temporal’s TypeScript definitions were extracted from `lib.deno.unstable.d.ts` into a new `lib.temporal.d.ts`, then wired into the window/worker libs and build pipeline. This makes the API surface cleaner and lines Deno up with TypeScript’s own plan for `esnext.temporal.d.ts`.

### **Remove unused op summary metrics plumbing** (0e2450c)
Dead `OpMetricsSummary` code was deleted across core, worker, and CLI wiring. This trims unused runtime bookkeeping and simplifies the op metrics path.

### **Drop JSX import source caching in the LSP** (f7d492d)
The language server no longer eagerly caches JSX import source resolutions, removing a source of extra work and the related test coverage. This should reduce LSP overhead in projects using JSX import sources.

### **Consolidate Node fs polyfills** (574272d)
Node’s `fs` polyfills for rename, rm, and rmdir were folded into the shared `fs.ts` and `internal/fs/promises.ts` modules. This continues the multi-part Node polyfill consolidation, reducing module sprawl and maintenance cost.
