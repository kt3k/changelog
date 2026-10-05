---
date: 2026-10-04
repo: nodejs/node
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: L
title: "V8 15.2 lands as Node sharpens FFI, HTTP, and crypto"
excerpt: "Node upgraded to V8 15.2, dropped legacy async/CLIs, and shipped a week of hot-path, FFI, and correctness fixes."
commits: 155
---

### V8 15.2 upgrade drives the week
**V8 15.2.124.38 and NODE_MODULE_VERSION 151** rolled in, bringing a new addon ABI and a broad embedder refresh. The upgrade also forced internal API cleanup off deprecated V8 callback/prototype surfaces, plus a large set of build and platform fixes for Windows, AIX, Solaris, illumos, musl, and other edge cases.

### FFI got the most user-visible tightening
**FFI gained safer and more flexible argument handling** across the week: safe JS numbers are now accepted for 64-bit integer args, optimized pointer-call paths validate BigInts consistently, ArrayBuffer inputs are checked by brand instead of spoofable tags, and unsafe oversized offsets/lengths are rejected before native conversion. Related fixes also turned callback-termination and allocation failures into normal errors instead of crashes.

### HTTP, buffers, and child_process all picked up hot-path wins
**Core hot paths were trimmed for allocation and validation overhead.** `buffer.isLatin1()` was added, `require()` cache-key allocation was removed, HTTP got fast non-throwing header validators, and `OutgoingMessage` now keeps headers and listener tables in fast mode longer. `child_process` also stopped cloning `process.env` on default spawns, cutting process-launch overhead on env-heavy systems.

### Correctness fixes landed across crypto, fs, workers, and sqlite
**Several bugs that could silently misbehave now fail loudly or behave correctly.** Crypto now rejects bad string encodings for update/digest APIs, WebCrypto export picks the right error for mismatched raw formats, `fs.mkdir({ recursive: true })` no longer loops forever on ENOENT, `cpSync()` preserves untouched destination timestamps, worker messaging/termination semantics were tightened, and SQLite now preserves connection state on reopen while rejecting unusable plans and oversized strings.

### AsyncLocalStorage and test runner internals were simplified
**AsyncLocalStorage now always uses AsyncContextFrame,** removing the legacy implementation and its `--no-async-context-frame` switch. The test runner and `tools/test.py` also got robustness fixes around stdout framing, process waits, and shutdown behavior.

### Other misc changes
**Miscellaneous cleanup and maintenance** included OpenSSL 3.5.9, zstd and random-fill fast paths, internal callback-scope and nextTick optimizations, updated timezone/dependency/tooling data, and a long tail of test deflakes, benchmark additions, and platform-specific build fixes.
