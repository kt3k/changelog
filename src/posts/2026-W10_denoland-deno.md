---
date: 2026-03-08
repo: denoland/deno
period: weekly
slug: 2026-W10
period_label: "Mar 2–8, 2026"
size: L
title: "Deno deepens Node parity while speeding installs and coverage"
excerpt: "A week of major Node-compat fixes, faster npm resolution/extraction, better coverage reporting, and LSP/TS cleanup."
commits: 108
---

### **Node compatibility took another big step forward**
Deno landed a broad set of Node parity fixes across crypto, fs, dgram, worker_threads, stdio, and HTTP. Highlights include broader key and certificate support in `node:crypto`, correct RSA-PSS and padding handling, `KeyObject` equality and constructor compatibility, Triple DES support, sync TTY writes, indestructible stdout/stderr streams, UDP socket API improvements, Windows named-pipe HTTP support, and worker resource limits that now match Node more closely. Several runtime-ordering fixes also moved Deno closer to Node semantics, including explicit microtask handling so `process.nextTick()` runs before promise callbacks and a larger event-loop/uv_compat cleanup.

### **npm installs and tarball extraction got faster and more reliable**
The npm resolver and installer saw repeated improvements to peer dependency handling, graph deduplication, metadata fetching parallelism, and registry precedence. At the same time, tarball extraction was simplified and optimized, with fewer syscalls/copies and faster decompression in the hot path. Global installs were also polished so `npm install -g deno` points at the native binary and starts faster.

### **Coverage reporting became more complete and resilient**
`deno coverage` now reports function coverage alongside line and branch metrics, and its LCOV/summary calculations were fixed to be more accurate. The report also became less fragile when source files disappear after collection, making CI and build pipelines easier to trust.

### **LSP, types, and core internals were cleaned up**
The language server got a correctness fix for root-file syncing with tsgo and dropped some unnecessary JSX import-source caching. Temporal types were split into a dedicated declaration file, and several internal runtime paths were simplified, including recursive module loading and unused op-metrics plumbing. Node fs polyfills continued their consolidation into shared internal modules.

### **Other misc changes**
- `.env` loading now supports variable substitution and improved precedence rules.
- Permission audits can stream to OpenTelemetry.
- Jupyter shutdown and interrupt handling now follows protocol more closely.
- CI, release plumbing, and workspace refactors were updated for the new cache-dir layout and other maintenance work.
- Smaller fixes landed for `console.table`, `process.umask()`, `NODE_CHANNEL_FD` handling, and a few regression tests.
