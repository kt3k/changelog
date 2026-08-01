---
date: 2026-07-31
repo: nodejs/node
size: L
title: "QUIC, sqlite, streams, and coverage land"
excerpt: "Notable fixes and features: test coverage expansion, a QUIC crash fix, sqlite state checks, and a streams BYOB speedup."
commits: 9
authors: [avivkeller, trivikr, mcollina, nodejs-github-bot, pimterry, soulee-dev]
commit_authors: {"8a1ca0f": avivkeller, "a0d1911": avivkeller, "b7d29fe": avivkeller, "c543cfb": mcollina, "756a023": nodejs-github-bot, "67af6d1": pimterry, "598693b": soulee-dev, "bec3d0b": trivikr, "a58aad7": trivikr}
---

### **Test runner gains `--test-coverage-include-all`** (b7d29fe)
Adds a new experimental coverage option that includes source files never loaded during a test run, reporting them as zero-coverage entries. This makes coverage reports more complete and is wired through CLI docs, the test runner API, option parsing, and coverage collection.

### **Streams BYOB pending reads now use the ring buffer** (c543cfb)
`ReadableByteStreamController` switches its pending BYOB pull-into descriptor queue from a plain array to the same ring-buffer `Queue` used elsewhere in WHATWG streams. That removes repeated `Array.prototype.shift()` overhead on BYOB reads and should improve byte-stream performance without changing behavior.

### **QUIC avoids a segfault on fragmented ClientHello** (67af6d1)
The session code now defers `PostReceive()` until an application is actually selected, instead of assuming ALPN is ready during packet processing. This fixes a crash path when a ClientHello spans multiple QUIC Initial packets, and the new test covers the multi-packet handshake case.

### **SQLite methods now reject calls on closed databases** (a58aad7)
`enableLoadExtension()` and `setAuthorizer()` now check that the database is still open before passing control to SQLite, matching the existing defensive behavior in related APIs. Calls after `close()` now throw `ERR_INVALID_STATE` instead of risking process termination.

### Other misc changes
- Backported V8 inspector promise-lifetime fix and bumped `v8_embedder_string` (a0d1911)
- Updated WPT URL fixtures (756a023)
- Moved a flaky REPL inspector test out of the flaky list (8a1ca0f)
- Documentation cleanup for cctest source listing instructions (598693b)
- Faster setup for a recursive vfs test (bec3d0b)
