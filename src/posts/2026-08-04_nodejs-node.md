---
date: 2026-08-04
repo: nodejs/node
size: L
title: "HTTP/2 gets faster; TLS, QUIC, FFI improve"
excerpt: "Major HTTP/2 throughput boosts, TLS handshake hardening, QUIC STOP_SENDING support, and FFI fast-path and call-plan work landed."
commits: 31
authors: [nodejs-github-bot, pimterry, mcollina, trivikr, aduh95, Rawal27, npm-cli-bot, legendecas, hanityx, agape1225, ganjanggejang, islandryu, bitpshr, umuoy1, Archkon, panva, boneskull]
commit_authors: {"2b350bb": trivikr, "1576cb8": mcollina, "31cde9f": umuoy1, "793a6ec": Archkon, "d18457b": pimterry, "5b940dd": pimterry, "3fc98b8": mcollina, "2ddade6": pimterry, "13e4e3d": pimterry}
---

### **HTTP/2 defaults jump for throughput** (1576cb8)
Node now defaults HTTP/2 stream flow control to 4MB and the connection window to 32MB, a big increase from the prior 64KB baseline. That should materially improve throughput on higher-latency links, while keeping existing apps compatible unless they override settings.

### **TLS handshake callbacks are deferred off the OpenSSL stack** (d18457b)
`SNICallback` and `OCSPRequest` are now scheduled asynchronously instead of running directly from the TLS library stack, avoiding re-entrancy during handshake. This also tightens an error path in client hello handling so teardown scenarios don’t accidentally resume handshakes.

### **TLS client-hello parsing is replaced with native callback support** (5b940dd)
Node drops the hand-rolled ClientHello parser and related plumbing in favor of modern OpenSSL/BoringSSL early ClientHello callbacks for resume-session flows. This is a substantial simplification of the TLS stack and removes a fragile internal subsystem.

### **QUIC gains explicit STOP_SENDING handling** (13e4e3d)
A new `stream.onstopsending` callback exposes peer-initiated `STOP_SENDING` events separately from `RESET_STREAM`, making QUIC stream shutdown semantics clearer and more precise. The update also threads the new callback through docs, bindings, and tests.

### **HTTP response completion now matches Writable more closely** (2ddade6)
`writableFinished` is now based on actual flush completion, and `end()` callbacks report success or the flush error instead of always hanging off `'finish'`. That fixes cases where HTTP responses could signal completion too early or lose the real failure reason after write errors.

### **FFI multi-arg fast calls accept pointer BigInts** (2b350bb)
The multi-argument fast path now accepts BigInt pointer values the same way the single-argument path already did, instead of rejecting them during raw pointer extraction. This fixes a real compatibility gap for pointer-based FFI calls.

### **FFI reuses libffi call plans** (31cde9f)
On x86-64 System V, fixed-signature FFI calls now reuse precomputed libffi call plans instead of rebuilding argument placement on every invocation. That trims per-call overhead in the generic path and is backed by a new benchmark.

### **ReadableStream pipeTo cuts per-chunk allocations** (3fc98b8)
The webstreams pipe-to implementation was refactored to reuse write/read bookkeeping instead of allocating new promise records and closures for every chunk. This is a performance-focused internal rewrite that should reduce GC pressure in steady-state streaming.

### **Task runner paths are handled as UTF-8 on Windows** (793a6ec)
Filesystem paths are now converted with UTF-8 instead of the active Windows code page when passed into Node and libuv interfaces. That prevents non-ASCII paths from being mangled or rejected on Windows.

### **Other misc changes**
- npm updated to 11.19.0.
- nghttp2, nghttp3, ngtcp2, simdjson, acorn, minimatch, and googletest dependency bumps.
- SQLite test and close-behavior fixes; in-memory test database cleanup.
- Misc build/tooling updates for perfetto and nix automation.
- Documentation and grammar edits across HTTP/2, QUIC, CLI, dgram, addons, and test docs.
- Smaller FFI, test runner, and SharedArrayBuffer pointer support fixes.
