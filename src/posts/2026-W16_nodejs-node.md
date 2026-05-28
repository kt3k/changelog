---
date: 2026-04-19
repo: nodejs/node
period: weekly
slug: 2026-W16
period_label: "Apr 13–19, 2026"
size: L
title: "Node expands FFI, hardens web APIs, and ships 24.15.0"
excerpt: "Temporal becomes default, FFI lands and grows, while web API validation, streams, and platform builds get broad fixes."
commits: 57
---

### **Core feature work lands across Temporal, FFI, and inspector tooling**
Temporal is now enabled by default when Rust/ICU prerequisites are available, with Windows build fixes and a cleaner opt-out path for unsupported configs. Node also introduced the new `node:ffi` core module and quickly expanded the experimental FFI surface with memory export helpers, symbol lookup from the current process image, and dedicated error codes. For debugging, `node inspect` gained a non-interactive `--probe` mode for breakpoint-driven runs and report generation.

### **Web platform behavior keeps moving closer to spec**
Several web-facing APIs tightened argument validation and error ordering: WebCrypto now rejects invalid key usage/algorithm combinations earlier, URLPattern now follows WebIDL overload and defaulting rules more closely, Blob construction uses sequence conversion, and Web APIs broadly reject SharedArrayBuffer-backed inputs where unsupported. WebStreams also saw multiple fixes, including SharedArrayBuffer source handling, cleaner `ReadableStream.from()` iteration, and better propagation of nested compose errors.

### **Stability and correctness fixes spread through streams, fs, N-API, and the loader**
The loader now throws a dedicated `ERR_REQUIRE_ESM_RACE_CONDITION` for async-load races, `fs.read*()` validates `position` even on zero-length reads, and `spawnSync` no longer does extra argument cloning. N-API gained experimental external SharedArrayBuffer support, threadsafe function abort now drains queued work before finalizing, and test runner events picked up tracing support plus a stable `testId` for tooling.

### **Platform and dependency updates round out the week**
AIX and Windows build paths were cleaned up across Node, V8, and OpenSSL; bundled SQLite and Undici were upgraded; and libffi build issues were fixed to stabilize native builds. The week also included the Node 24.15.0 LTS release, which brought new CLI flags, raw key support in `KeyObject`, and `throwIfNoEntry` for `fs.stat`/`fs.promises.stat`.

### Other misc changes
Docs and permissions clarifications, CI/test cleanup, minor lint/typo fixes, and a few flaky test skips and workflow updates.
