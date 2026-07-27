---
date: 2026-07-26
repo: denoland/deno
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "Deno tightens security, compatibility, and startup speed"
excerpt: "A week of hardening temp/package paths, improving Node/web compat, and landing startup-order perf work for release builds."
commits: 60
---

### **Security hardening across temp dirs, npm, and prompts**
Deno added several defenses against symlink and path-traversal tricks in package materialization, temp `node_modules` setup, `deno clean`, and native addon extraction. Permission prompts also now escape bidi and invisible control characters to reduce spoofing risk.

### **Node and web compatibility got a broad set of fixes**
This week brought new Node parity in `worker_threads.locks`, `util.diff`, `node:test` tag filtering, Buffer search parameters, Node-style error codes, and better stream interop. Web/platform behavior also tightened around `ReadableStream.from`, `AbortSignal.any()`, `SubtleCrypto.deriveBits(…, 0)`, diagnostics column handling, and `Deno.umask()` permissions.

### **Release builds gained startup-order optimization**
The release pipeline now traces startup, generates a function order file, and relinks binaries with that order to improve cold-start performance. The new workflow is verified in CI and paired with a few release/promotion test updates.

### **Resolver, cache, and runtime behavior were made more consistent**
Deno fixed JSON import handling in both directions, improved npm tarball registry rewriting, stopped stale cache updates from downgrading packages, and kept type-only deps in outdated lockfiles. Runtime fixes also covered late inspector console events, dynamic imports during synthetic module evaluation, DNS retry behavior, HTTP/2 backpressure, and other loader/cache edge cases.

### **Desktop, Jupyter, and developer UX saw targeted improvements**
Deno Desktop now exposes load/page-load events and handles HMR URL parsing more reliably, while React Router HMR is enabled for the desktop path. The week also included better `.wasm` type-checking, config discovery for `jsr:` entrypoints, `deno fmt` indentation stability, and smaller CI/build refinements.

### Other misc changes
- Performance refactors such as switching hot internal maps/sets to `FxHash`
- Snapshot, telemetry, FFI, and N-API robustness fixes
- Test coverage additions and assorted workflow/build cleanups
