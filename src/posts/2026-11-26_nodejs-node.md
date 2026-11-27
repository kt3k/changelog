---
date: 2026-11-26
repo: nodejs/node
size: L
title: "Crypto, QUIC, REPL, and fs fixes land"
excerpt: "Major correctness and API changes span crypto deprecations, QUIC behavior, REPL promise handling, fs mode validation, and more."
commits: 18
authors: [avivkeller, jasnell, vedchaudhari, rozzilla, pimterry, aduh95, nigrosimone, ychuhai, yohannesjoya, martenrichter, inoway46, Renegade334]
commit_authors: {"3872251": nigrosimone, "b663e55": avivkeller, "345e2b2": jasnell, "691c528": jasnell, "c698e79": ychuhai, "31fff58": yohannesjoya, "32d410c": martenrichter, "3c15087": vedchaudhari, "7da2308": pimterry}
---

### **Crypto ECDH public-key setter removed** (345e2b2)
`ecdh.setPublicKey()` is now End-of-Life and removed from the public docs, JS wrapper, and native binding. This eliminates a long-deprecated API surface and tightens ECDH to the supported private-key/public-peer flow.

### **Invalid package "main" no longer falls back to index.js** (691c528)
`require()` now throws `MODULE_NOT_FOUND` when a package.json `main` entry exists but cannot be resolved, instead of silently trying the package’s top-level `index.js`. This aligns runtime behavior with the deprecation moving to End-of-Life and avoids loading the wrong entry point.

### **REPL promise completion now uses direct inspector evaluation** (b663e55)
The REPL inspector path no longer does a second `Runtime.awaitPromise` round-trip; it now relies on the direct `Runtime.evaluate` result and updates recoverable parsing for top-level `await`. The new tests cover promise display/completion and GC behavior, fixing a regression in how promises were shown and awaited in the REPL.

### **fs now rejects modes above INT32_MAX instead of aborting** (31fff58)
File mode validation was tightened to match the native signed 32-bit expectation, turning previously fatal out-of-range inputs into normal `RangeError`s. This affects `open`, `chmod`, `mkdir`, and stream constructors, preventing process aborts from invalid `mode` values.

### **TextDecoder fatal errors now reset decoder state** (3c15087)
After a fatal decode error, the decoder now clears pending chunk state and BOM tracking so the next decode starts fresh, matching the Encoding Standard. This fixes follow-up decodes that previously inherited stale state after an error.

### **QUIC HTTP/3 stream teardown no longer kills the session** (32d410c)
When a stream is destroyed before queued headers are flushed, nghttp3 now sees a null user-data sentinel and ends the stream cleanly instead of resetting the whole session. The added test verifies that headers still arrive and that the session remains usable afterward.

### **QUIC streams are created synchronously** (7da2308)
This changes QUIC stream creation timing and updates the public docs plus a wide set of behavior tests. It’s a substantial internal behavior change that can affect callback ordering and stream lifecycle assumptions.

### **MakeCallback can now take an Environment directly** (3872251)
Addon authors can now pass a cached `Environment` into `node::MakeCallback()` instead of re-looking it up on every call. That reduces repeated lookup overhead in hot paths, and the new benchmark suggests a performance-oriented API improvement for native addons.

### **Web Locks now throws proper receiver/constructor errors** (c698e79)
`LockManager.request()` now explicitly validates its receiver and returns the expected `ERR_INVALID_THIS` instead of failing inconsistently. The tests also lock down constructor and property-access error behavior for both `LockManager` and `Lock`.

### Other misc changes
- Permission error hint added for `process.report.writeReport()` write denials.
- Zlib and stream internals stopped using mutable `.push()` patterns in sync/end callback collection.
- A Web Locks import/receiver fix and a QUIC HTTP/3 header-name handle leak fix.
- Build/tooling tweaks: libatomic linking, a new ESLint rule, and a Windows crates build dependency.
- Documentation updates and release/changelog rollup.
