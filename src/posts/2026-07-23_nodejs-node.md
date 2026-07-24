---
date: 2026-07-23
repo: nodejs/node
size: L
title: "QUIC, streams, FFI, and SQLite fixes land"
excerpt: "QUIC session timing, iterable-stream backpressure, FFI string safety, SQLite UAFs, and several API validations were tightened."
commits: 15
authors: [trivikr, jasnell, pimterry, Archkon, trivenay, aduh95, mcollina, RafaelGSS, BIGSUS24]
commit_authors: {"68dc116": trivikr, "de6eeec": Archkon, "fe5037b": trivenay, "241fb9a": trivikr, "fd41198": mcollina, "f9715fc": pimterry, "b9ed467": jasnell, "82c823e": pimterry, "0992f6b": trivikr}
---

### **Iterable streams switch to budget-based backpressure** (b9ed467)
The stream/iter implementation was updated to use a byte `budget` model instead of `highWaterMark`, and the docs were rewritten to match the new semantics. This is a broad behavioral refactor across `push()`, `share()`, `broadcast()`, and related tests, so it affects how backpressure is configured and understood.

### **QUIC server sessions now surface after ClientHello processing** (f9715fc)
Server-side QUIC session events are now deferred until TLS ClientHello has been processed, so `servername` and `alpnProtocol` are available immediately when the callback fires. That avoids surfacing invalid handshakes and makes session metadata reliably readable at the point of emission.

### **FFI now preserves string buffers across reentrant calls** (241fb9a)
Fast API string conversions are now tracked by call depth instead of a single owner-level buffer, preventing nested native calls from clobbering outer string data. This fixes a subtle reentrancy bug that could corrupt strings during recursive FFI use.

### **SQLite sync APIs now keep DatabaseSync alive during callbacks** (fd41198)
`DatabaseSync.Exec()` and `DatabaseSync.ApplyChangeset()` now hold a `BaseObjectPtr` guard while SQLite invokes JS callbacks. That closes a use-after-free where user code could drop the last reference to the database mid-callback.

### **HTTP client propagates `highWaterMark` to OutgoingMessage** (fe5037b)
`http.request({ highWaterMark })` now applies the requested threshold to the request object's internal write buffering, not just the socket path. This fixes incorrect backpressure behavior before the socket connects and prevents hangs in code that waits on `drain`.

### **Zlib validates `pledgedSrcSize` as a safe integer** (de6eeec)
`pledgedSrcSize` is now rejected unless it is a non-negative safe integer, both in JS validation and the native zstd path. That closes gaps where unsafe values could be silently coerced or ignored, improving input correctness for zstd compression.

### **Streams now ignore `null` outputs from stateful transforms** (68dc116)
Stateful sync and async iterable transforms now treat yielded `null` as “no output,” matching normalization semantics. This fixes a transform edge case that previously could have produced invalid output handling.

### **FFI bool fast calls now keep `uint8` semantics** (0992f6b)
Fast API metadata for boolean-returning FFI calls now normalizes to `kUint8`, keeping optimized calls aligned with generic FFI behavior. That preserves numeric return handling and the expected rejection of JavaScript boolean values.

### **ClientRequest highWaterMark bug gets a regression test** (82c823e)
A flaky HTTP/2 socket proxy test was tightened up to avoid intermittent failures. This is a test-only fix.

### **Other misc changes**
- Dependency bump in `/tools/eslint` (1 commit)
- Docs updates for built-in module rules, DNS `verbatim`, QUIC API naming, and security release guidance (4 commits)
- QUIC/stream iter test updates for the backpressure refactor (2 commits)
- Minor stream/QUIC doc and benchmark alignment changes (1 commit)
