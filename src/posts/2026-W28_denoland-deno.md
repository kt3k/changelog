---
date: 2026-07-12
repo: denoland/deno
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "Deno sharpens TS tooling, Node parity, and core hot paths"
excerpt: "Upstream TypeScript lands, sync-types matures, and Deno speeds up streams, sockets, fs.cp, and SQLite while tightening security and compatibility."
commits: 98
---

### **TypeScript tooling takes a major turn**
Deno dropped its forked TypeScript compiler in favor of upstream `typescript@6.0.3`, reshaping bundled libs and type-resolution behavior to match stock TS more closely. That change set also tightened `deno check` semantics (`export =` in ESM is now a hard error), deduped `@types/node` handling, and improved DOM/global typing coexistence.

On top of that, the new `deno sync-types` command landed and quickly matured: it now generates stock-TS-friendly project config, materializes remote dependency types, supports `--allow-import`, and works without `node_modules` via root-based discovery and global-cache mode. It’s a significant step toward first-class compatibility with plain `tsc`, tsgo, and editor TS servers.

### **Node compatibility widened across networking, processes, and APIs**
Deno filled a notable Service Worker gap by implementing `Cache.keys()`, added `followSymlinks` to `fs.glob()`, and exposed `v8.setHeapSnapshotNearHeapLimit()` for near-OOM debugging. Node parity also improved in child-process fd inheritance, `inspector.waitForDebugger()`, Unix-socket permissions, and fetch error shaping.

Several long-standing correctness issues were fixed too: `Deno.connect()` now honors aborts during DNS resolution, socket destruction stops in-flight reads to prevent heap leaks, and `Deno.serve` now propagates stream errors correctly instead of masking the underlying failure.

### **Core hot paths got noticeably faster**
This week brought a broad round of performance work across the runtime. Web Streams picked up multiple hot-path reductions in allocations and microtask overhead, `node:tls` and `node:net` writes became more zero-copy, `fs.cp` gained a native fast path, and `atob` avoids a large-path memcpy. SQLite’s `StatementSync` APIs were also tightened up to cut repeated work in common insert/select paths.

### **Desktop and runtime behavior got safer and more capable**
Deno Desktop gained framework HMR support and better framework detection, including React Router and broader Vite/Nuxt coverage. A security fix also closed a desktop error-reporting escape by making the target URL native-configured instead of JS-controlled. Runtime teardown and watcher behavior were cleaned up, and `deno desktop --exclude-unused-npm` now respects the compile flag to keep bundles smaller.

### **Other misc changes**
- OTEL span attribute length limits are now honored.
- `--min-dep-age` was added as a CLI alias, with wildcard exclusions supported in `minimumDependencyAge.exclude`.
- Duplicate parse diagnostics were deduped; LSP now respects `no-slow-types` exclusions.
- Coverage accounting, cache determinism, packument caching, and release/workflow plumbing saw smaller fixes and refactors.
