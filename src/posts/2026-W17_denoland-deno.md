---
date: 2026-04-26
repo: denoland/deno
period: weekly
slug: 2026-W17
period_label: "Apr 20–26, 2026"
size: L
title: "Deno sharpens Node parity with TLS, HTTP/2, workers"
excerpt: "Major Node-compat fixes landed across TLS, HTTP/2, fs, workers, and N-API, alongside a few targeted performance wins."
commits: 137
---

### **Node compatibility jumps across core networking and addons**
This week focused heavily on closing the biggest Node parity gaps. TLS/server auth behavior was tightened, `node:http` and `node:http2` picked up multiple correctness fixes, `node:net` gained `resetAndDestroy()` plus more option support, and `worker_threads` semantics were aligned more closely with Node. Native addons also got a safer N-API story, including deferred finalizers, `napi_async_init`/`destroy`, and a rollback of real V8 handle scopes after crashes in existing addons.

### **Performance wins in hot runtime paths**
Several changes were aimed squarely at throughput and tail latency: the event-loop polling path was reworked to avoid scanning every live handle, HTTP parsing and stream writes were trimmed, and worker/`MessagePort` messaging was sped up with raw post-message ops and synchronous drain loops. These should show up most in chatty networking and IPC-heavy workloads.

### **Filesystem, process, and platform behavior moved closer to Node**
A broad set of smaller-but-important compatibility fixes landed in `fs`, `child_process`, `process`, and path handling. Highlights include `fs.stat`/`lstat` `throwIfNoEntry` support, `fs.watch` path normalization, Windows named-pipe reconnect fixes, `spawnSync` stdio inheritance support, `process.env` and `debugPort` edge-case alignment, and `pathToFileURL()` improvements for Windows and special characters.

### **Web/crypto/runtime semantics were tightened**
`structuredClone()` now correctly rejects non-serializable platform objects like `Request`, `Response`, `Headers`, and streams. TLS crypto handling also got stricter validation and better body draining, RSA OAEP parameters are now normalized and validated, and macOS permission checks now compare filesystem-equivalent paths to avoid false mismatches.

### **Other misc changes**
- `fs.glob` sibling traversal bug fixed for patterns like `**/../*`
- `module.builtinModules` / builtin-module lookup aligned
- `fs.Stats` deprecation warning added
- `deno task --filter` now matches workspace directory names
- `deno coverage` stops counting injected helper code
- Various test updates, CI/sharding tweaks, dependency bumps, and error-message polish
