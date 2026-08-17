---
date: 2026-08-16
repo: nodejs/node
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "Node adds Web Workers, hardens sqlite, and tightens core APIs"
excerpt: "A week of major platform work: experimental Web Workers, richer sqlite/observability hooks, stricter FFI and ZIP checks, and several core fixes."
commits: 106
---

### **New Web Worker platform and broader standards coverage**
Node introduced an experimental `Worker` API behind `--experimental-web-worker`, bringing a mostly browser-compatible worker model on top of `worker_threads`. The Web Platform Tests harness was expanded to cover multi-global cases, real worker execution, and process-isolated runs, backed by a large batch of new worker/cache-storage fixtures.

### **sqlite became more capable and more robust**
The sqlite module saw both new observability features and harder safety checks. Node added a `diagnostics_channel` hook for sqlite activity, exposed statement performance counters via `statement.stat()` / `resetStats()`, and tightened statement lifetime, reset, and authorizer handling so errors surface correctly and callbacks cannot mutate the invoking connection.

### **Core APIs got stricter, safer validation**
WebCrypto `supports()` was aligned with real algorithm constraints, FIPS builds now gate non-compliant algorithms, and `--check` was fixed to detect ambiguous ESM files with module syntax. FFI also got several consistency fixes: detached buffers and views are now rejected reliably, out-of-range pointer BigInts are blocked on the fast path, and cached string buffers are refreshed on every call to avoid stale native data.

### **Streams, zlib, ZIP, and path handling were hardened or sped up**
Readable async iteration was optimized with a hand-rolled iterator to cut promise overhead, while stream cancellation and teardown paths were cleaned up for more reliable behavior. Zlib classes now require `new`, ZIP handling gained multiple integrity and lifecycle fixes around mismatched headers, rollback, and in-flight closes, and `realpathSync()` no longer trusts stale stat state.

### **Tooling, tracing, and release support moved forward**
`diagnostics_channel.tracingChannel()` and `TracingChannel` became stable, `SetAbortHandler` added a process-global abort hook for embedders, and release tooling learned alpha prerelease tags plus a corrected binary upload name. The permissions subsystem was also heavily refactored and optimized behind the scenes.

### **Other misc changes**
- `--enable-static` is now deprecated/no-op and rejected with `--shared`
- DNS TXT parsing got a small allocation win
- CONNECT tunnel teardown and half-open drain behavior were improved
- Build, CI, docs, and dependency updates across test tooling, libffi, undici, googletest, and Nix packaging
