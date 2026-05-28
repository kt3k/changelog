---
date: 2026-05-17
repo: denoland/deno
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "Deno deepens Node parity while speeding startup and I/O"
excerpt: "A week of major Node-compat wins, faster lazy-loading polyfills, and fixes for TLS, inspector, workers, and core runtime semantics."
commits: 122
---

### **Node compat coverage expanded across core runtime APIs**
Deno filled in several big Node gaps: `node:wasi`, `perf_hooks.createHistogram()`, `vm.SyntheticModule` and two-phase module linking, `v8.GCProfiler`/`startupSnapshot`/`queryObjects()`, `module.enableCompileCache()`, and `process._debugEnd()`/`_debugProcess()`. It also improved `node:sqlite` with `serialize()`/`deserialize()` and tagged-template support, making more real-world Node apps and test suites run without shims or workarounds.

### **Loader, module, and worker semantics were tightened**
The module system got a substantial overhaul: async imports are pre-resolved before registration, lazy ESM now evaluates before namespace reuse, and `module.register()`/loader-hook paths were corrected to preserve Deno resolution and avoid misrouting `node:` builtins. Worker and message-passing behavior also moved closer to Node with synthetic ESM-backed builtin facades, `postMessageToThread`, deduped message listeners, and fixes for top-level await in `node:test`.

### **Networking, TLS, and HTTP compatibility improved noticeably**
A cluster of fixes brought Deno closer to Node/libuv behavior in sockets and TLS: Windows named-pipe connects now retry when busy, `shouldUpgradeCallback` is supported, `useUserBuffer()` landed for TCP/Pipe/TLS reads, peer cert chains and session resumption were fixed, and `tls.createSecureContext()` now throws the expected OpenSSL-shaped errors. HTTP/server async context tracking and upgrade handling were also corrected, along with a few long-standing child-process and pipe-handle leaks.

### **Performance work reduced startup and worst-case overhead**
Deno continued moving Node polyfills onto lazy-loaded JS/ESM paths, now covering many more built-ins including `net`, `_stream_*`, TLS, `worker_threads`, `url`, `zlib`, and friends. In parallel, `FormData`, `URLSearchParams`, and `Headers` got linear-time mutation paths, and `TextEncoder.encodeInto()` was optimized for a reported short-string speedup. These changes should reduce cold-start work and eliminate quadratic behavior in duplicate-heavy web API inputs.

### **Tooling and CLI got more robust**
`deno bump-version` is now workspace-aware, making it a more capable release tool for multi-package repos. `deno install -g npm:<pkg>` was fixed for native binaries and stale lockfiles, `deno fmt`/`deno lint` no longer over-scan workspace trees, and `npmrc` now respects `min-release-age`. On Windows, `spawn` pipe cleanup was fixed to prevent later EMFILE-style failures, and `process.report()` now reports libc fields only where appropriate.

### Other misc changes
- `URLSearchParams` and `FormData` compatibility/error-message fixes.
- `fs.watchFile`, `fs.openAsBlob()`, `readSync(position)`, `fs.readdir`, and `FileHandle` behavior adjustments.
- Inspector Network domain support and eval URL labeling fixes.
- CI/workflow and test-suite updates, plus assorted internal refactors and cleanup.
