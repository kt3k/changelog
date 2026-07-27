---
date: 2026-07-26
repo: nodejs/node
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "Node adds Perfetto tracing and sharpens stream/crypto APIs"
excerpt: "Perfetto tracing lands, stream backpressure is refactored, and Node tightens crypto, FFI, net, sqlite, DNS, and REPL edge cases."
commits: 79
---

### **Tracing, streams, and net saw the biggest platform changes**
Node gained a new Perfetto-backed tracing agent and build support, marking a major tracing backend addition. In parallel, iterable streams moved to a byte-budget backpressure model, with updates across `push()`, `share()`, `broadcast()`, and related docs/tests. On the network side, `net.BoundSocket` now supports Unix domain sockets and named pipes via `path`, and Windows socket handle transfer is now allowed for `net.Socket` and `net.Server`.

### **Crypto, FFI, and zlib got a round of correctness and safety fixes**
Crypto work focused on both performance and hardening: KEM encapsulation avoids extra copies, provider-backed private keys are cleansed before free, RSA-PSS legacy DER export is preserved, and malformed/incomplete key exports now fail cleanly. FFI got several boundary fixes, including single-read wrapper signatures, better integer validation, reentrant string-buffer handling, and preserved `uint8` semantics for boolean returns. Zstd/zlib also picked up safer input handling, including safe-integer validation for `pledgedSrcSize`, truncated-stream EOF reporting fixes, and `ArrayBuffer` dictionary support.

### **SQLite, DNS, and REPL behavior were tightened up**
SQLite database/session lifetimes are now guarded so callbacks and sessions can’t outlive their backing database objects. DNS reverse lookups now ignore hosts files and use PTR/DNS behavior only, while `dns.setServers()` was modernized to use the newer c-ares CSV API. The REPL also gained basic syntax highlighting, making interactive use more polished without changing semantics.

### **Other misc changes**
- Permission audit mode now logs denials instead of throwing them.
- `http.request({ highWaterMark })` now applies backpressure correctly before socket connect.
- Web Streams transfer/adapters and stream iterators got several teardown and abort fixes.
- `process.binding('buffer').copyArrayBuffer()` and other internal paths picked up bounds/lifetime fixes.
- Docs cleanup touched crypto, QUIC, streams, DNS, release guidance, and deprecation codemods.
