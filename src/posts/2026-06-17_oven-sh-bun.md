---
date: 2026-06-17
repo: oven-sh/bun
size: L
title: "Bun ships major Node parity and bug fixes"
excerpt: "Big day for HTTP, net/tls, crypto, streams, and install correctness, plus several crash and leak fixes."
commits: 18
authors: [robobun, cirospaciari, dylan-conway, alii, Jarred-Sumner]
commit_authors: {"797d565": robobun, "92311e1": alii, "65f12bd": dylan-conway, "1ee0960": robobun, "899168a": cirospaciari, "1ecbea9": robobun, "7765caf": robobun, "c4a937c": cirospaciari, "be38df3": robobun, "3b4f286": robobun, "3b24ca9": robobun, "76d5d28": robobun, "bd8edc7": cirospaciari}
---

### **node:http gets a full socket-based client rewrite** (c4a937c)
Bun replaces the fetch-based `ClientRequest` with a port of Node’s real HTTP client on `net`/`tls`, llhttp, and an `Agent` socket pool. This is a large compatibility shift that also brings client proxy support and a big jump in Node test parity.

### **net/tls compatibility expands with half-open, callbacks, and local bind support** (bd8edc7)
The networking stack picks up broad Node parity work: half-open/reset/write behavior, server `TLSSocket` wrapping, session/keylog handling, SNICallback/ALPNCallback, pfx, OpenSSL error shapes, `addCACert`, and local binding. It also adds connect-time `localAddress`/`localPort` binding and updates the underlying socket implementation accordingly.

### **node:stream gains async iterator support and broader parity fixes** (899168a)
Bun vendors the full upstream stream suite for Node v26.3.0 and implements the experimental `stream/iter` and `zlib/iter` APIs behind `--experimental-stream-iter`. The runtime changes fill several semantics gaps around reads, compose/pipeline, web adapters, and HTTP/fs/net integration.

### **HTTP proxy tunnel bugs are fixed, including a use-after-free and a dead-socket assertion** (1ecbea9, 7765caf)
Two separate proxy-tunnel failure paths are hardened: one avoids a use-after-free when response bytes and `close_notify` arrive together, and the other stops asserting when the outer socket dies mid-handshake and now returns `ConnectionClosed`. These are correctness fixes for real proxy traffic that could previously hang or crash.

### **Postgres query cleanup no longer leaks on error paths** (92311e1)
The Postgres SQL query runner now centralizes teardown so failed execute/bind paths release query and statement refs consistently. That prevents event-loop hangs and ref leaks when synchronous errors occur during query dispatch.

### **Install now trusts root `file:` overrides and reports newer lockfiles clearly** (797d565, 1ee0960)
`bun install` now treats `file:` paths from root `package.json` overrides/resolutions as user-authored and safe even when they point outside the package tree, fixing a false-positive unsafe-path rejection. It also gives a much clearer error when a `bun.lock` was written by a newer Bun, including a suggestion to run `bun upgrade`.

### **Crypto hashing accepts SHAKE aliases** (76d5d28)
`createHash` and `crypto.hash` now accept `shake-128`/`shake-256` aliases in addition to the shorter forms. This matches Node/OpenSSL behavior and removes an unnecessary incompatibility for SHAKE users.

### **Crash handler fixes baseline platform reporting** (65f12bd)
Baseline builds were emitting the wrong trace-string platform character because the code checked a nonexistent Cargo feature. That broke crash-symbolication on bun.report for baseline x86_64 builds, so this fixes the metadata at the source.

### **Web globals become readonly accessors** (be38df3)
`navigator.userAgent`, `navigator.platform`, and `navigator.hardwareConcurrency` are now getter-only instead of writable data properties. That aligns Bun with browser semantics and Node-like expectations, preventing accidental reassignment.

### **Microtask and websocket API correctness fixes** (3b24ca9, 3b4f286)
`queueMicrotask.length` is corrected from 2 to 1, matching the spec and other runtimes. `ServerWebSocket.cork()` also now passes the websocket instance into the callback as documented.

### Other misc changes
- Reproducible build path remapping for Rust (`--remap-path-prefix`) and related build-script tweaks
- `StatWatcherScheduler` double-push guard for Node fs
- `moduleLoaderImportModule` TLA referrer async-order fix
- `bun.lock` version error message improvement
- CI/machine/bootstrap comment and metadata updates
- Minor HTTP/stream/internal refactors and test additions
