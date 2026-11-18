---
date: 2026-11-17
repo: nodejs/node
size: L
title: "Node tightens crypto, HTTP/2, and debugging"
excerpt: "Security fixes, new diagnostics, and major runtime changes land alongside memory and API refactors."
commits: 35
authors: [jasnell, nodejs-github-bot, panva, joyeecheung, nigrosimone, bengl, inoway46, christianaurichzm, jackyzha0, UlisesGascon, gabedemesa, vedchaudhari, emyei, IlyasShabi]
commit_authors: {"3ea9547": panva, "65f2246": panva, "7fa06d4": bengl, "1727b13": jasnell, "6c83591": jasnell, "3db9632": jackyzha0, "cdc1dac": gabedemesa, "1c40cfa": joyeecheung, "bf07bea": emyei}
---

### **HTTP/2 client requests now respect session memory limits** (cdc1dac)
Client-initiated `http2.session.request()` calls are now rejected when `maxSessionMemory` is exhausted, matching the existing protection for peer-initiated streams. This closes a loophole where a non-draining socket could keep queueing frames without bound, and adds a new `ERR_HTTP2_SESSION_MEMORY_EXCEEDED` error.

### **HTTP agent now blocks poisoned free sockets** (bf07bea)
Node now checks for pending data on idle HTTP sockets before reusing them, preventing queued bytes from being misattributed to the next request. The fix forward-ports the pending-read guard used to address CVE-2026-105481 and covers the low-level socket path with new `hasPendingRead()` support.

### **`node inspect --probe` can attach to running processes** (1c40cfa)
Probe mode now works against an already-running Node.js process via `--pid`, or against an inspector that is already listening with `--host`/`--port`. This is a substantial debugger workflow expansion: the docs and probe report format were updated, and the session behavior now differs depending on whether probe mode launched the target or attached to it.

### **Source maps are now stored more compactly** (3db9632)
Source map segments are moved from per-entry arrays to a packed `Int32Array`, dramatically reducing heap usage for large maps. The change also avoids unnecessary sorting work when mappings are already ordered, which should help `--enable-source-maps` on large bundled applications.

### **HTTP/2 request header injection gets a new diagnostics channel** (7fa06d4)
A new `http2.client.request.headers` diagnostics channel fires before client request headers are serialized, so instrumentation can mutate headers in time to add context like `traceparent`. This gives tracing and observability tools a supported way to influence outgoing HTTP/2 requests.

### **Deprecations for package exports/imports are now end-of-life** (1727b13)
Trailing-slash exports/imports mappings and empty-segment package targets no longer just warn: they now throw resolution errors. The deprecations were moved to End-of-Life, bringing the implementation in line with the documented resolver behavior.

### **Direct `Hash`/`Hmac` construction is now forbidden** (6c83591)
`crypto.Hash` and `crypto.Hmac` can no longer be constructed directly, even with `new`; callers must use `crypto.createHash()` and `crypto.createHmac()`. The classes remain exported for `instanceof` checks, but attempts to instantiate them directly now fail with `ERR_ILLEGAL_CONSTRUCTOR`.

### **BoringSSL support expands for SHAKE256 and SLH-DSA** (65f2246, 3ea9547)
Node wires up SHAKE256 and SLH-DSA variants more completely on BoringSSL, including key lookup, raw/JWK handling, and one-shot signature support. This unblocks hash and post-quantum crypto paths that depend on BoringSSL’s native implementations and fills in gaps in its digest/key registries.

### Other misc changes
- Async resource cleanup and several internal helper refactors.
- Shared code paths added across fs, DNS, URLPattern, sqlite, streams, util, http, and crypto internals.
- Dependency/vendor updates: zlib, libffi, googletest, V8, and nixpkgs.
- Diagnostics/workflow/test maintenance, including threadpool work events and a v8 backport reminder workflow.
- macOS notarization verification and a small HTTP doc fix.
