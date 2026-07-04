---
date: 2026-07-03
repo: denoland/deno
size: L
title: "Deno tightens perf, watch, and safety paths"
excerpt: "Big wins for startup, streams, and worker messaging, plus a TLS UAF fix and several CLI behavior fixes."
commits: 17
authors: [bartlomieju, crowlKats, chatman-media, tomas-zijdemans, nathanwhit, divybot, nathanwhitbot]
commit_authors: {"ef62439": crowlKats, "c239456": chatman-media, "e056796": bartlomieju, "9bfbb0d": bartlomieju, "45f999d": tomas-zijdemans, "9834a73": bartlomieju, "c29f8e1": bartlomieju, "9ae8fbd": nathanwhit, "5a12492": divybot, "a126271": bartlomieju, "1d0ea85": bartlomieju, "83198a1": nathanwhitbot}
---

### **NPM registry and glob hot paths get faster** (9ae8fbd, a126271, 83198a1)
Deno landed three performance-oriented changes: SIMD-based packument indexing for npm metadata, cheaper glob matching via literal-suffix pruning, and deferred registration of residual lazy sources at startup. Together these cut work from common discovery and registry paths and should improve cold-start and file-scanning performance.

### **Streams and workers now avoid more JS-side copying** (9bfbb0d, 5a12492, e056796)
`pipeTo` gained a Rust fast path for resource-backed streams, worker message passing was optimized with a structured-clone fast path, and wasm fetch bytes now stream directly to the compiler from Rust. These changes reduce cross-runtime copying and should lower latency in high-throughput I/O and messaging workloads.

### **Inspector can be enabled on demand with SIGUSR1** (c29f8e1)
Sending `SIGUSR1` to a running Unix process now starts Deno's inspector on the default `127.0.0.1:9229`, matching a useful Node.js debugging workflow. That makes it much easier to attach a debugger to long-running processes without restarting them.

### **Watch mode now accepts paths for fmt, lint, and bench** (1d0ea85)
The watch-flag parsing was reworked so `fmt`, `lint`, and `bench` can accept explicit watch paths, instead of treating watch handling inconsistently across subcommands. This fixes a user-visible CLI gap and aligns watch behavior more closely across Deno commands.

### **TLS teardown now avoids a use-after-free in node:tls** (45f999d)
`TLSWrap` now marks itself dead before checking whether a TLS connection exists, closing a hole where teardown could return early and leave in-flight encrypted writes with a dangling pointer. The added regression tests cover the no-ALPN / `finish_accept` error path that could previously trigger the bug.

### **Deploy, permissions, lint, and inspector behavior were corrected** (ef62439, c239456, 9834a73)
Several correctness fixes landed in core CLI behavior: deploy now disables config discovery and refreshes the cached CLI version, `--ignore-read` properly splits comma-separated paths, and lint no longer errors on package exports that can't be analyzed as modules like CSS files. These are all practical fixes for real-world workflows rather than internal cleanup.

### Other misc changes
- Added `deno_print` crate and routed several stdout-printing call sites through it.
- Release automation now updates `versions.json` in the download bucket.
- Documentation clarified `ServeHandlerInfo.completed` rejection behavior.
- Bumped `cmov` and added a missing package metadata entry.
- CI workflow formatting tweaks and generated workflow updates.
