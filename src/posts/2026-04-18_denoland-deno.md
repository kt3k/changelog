---
date: 2026-04-18
repo: denoland/deno
size: L
title: "Node compat gets a heavy fixes sweep"
excerpt: "Major fixes landed across node compat, N-API, TLS, crypto, workers, and HTTP/2, plus a V8 crate bump."
commits: 10
authors: [bartlomieju]
commit_authors: {"8991405": bartlomieju, "ccc0d6f": bartlomieju, "d75ca4b": bartlomieju, "f43b025": bartlomieju, "4c90c4d": bartlomieju, "bd60606": bartlomieju, "210719b": bartlomieju, "81720cf": bartlomieju, "4b71a60": bartlomieju, "33bee46": bartlomieju}
---

### **HTTP/2 secure server and stream state fixes** (d75ca4b)
Fixed multiple `node:http2` bugs, including missing imports for `createSecureServer({ allowHTTP1: true })`, a session field count mismatch, and a `kLastWriteWasAsync` reset issue after flushing pending frames. These changes unblock secure HTTP/2/HTTP/1.1 interop and prevent incorrect async write state from leaking into stream callbacks.

### **RSA-PSS verification with null algorithms now works** (4c90c4d)
`crypto.verify(null, ...)` now correctly handles RSA-PSS keys that carry an embedded hash algorithm, instead of failing for keys with explicit PSS parameters. The fix also adds lenient PEM parsing to accept OpenSSL/Node-style line widths and improves MGF1 parameter decoding, making signature verification more compatible with real-world keys.

### **N-API external Latin-1 strings are now truly zero-copy** (f43b025)
`node_api_create_external_string_latin1` now uses V8 external one-byte strings instead of copying data and immediately finalizing it. That lowers overhead for native add-ons and fixes the `*copied` flag semantics so callers can reliably detect whether a string was actually copied.

### **Real handle scopes implemented for N-API** (4b71a60)
`napi_open_handle_scope` and related escapable/callback scope APIs are no longer no-ops; they now create and tear down real V8 handle scopes. This matters for native modules that allocate many temporary handles, because it prevents handle buildup and matches Node.js behavior more closely.

### **STARTTLS handshakes auto-start on server sockets** (8991405)
`new tls.TLSSocket(socket, { isServer: true })` now kicks off the handshake automatically when wrapping an already-connected socket. This fixes STARTTLS-style protocols like SMTP, IMAP, XMPP, and PostgreSQL, where TLS was previously never initiated unless internal code manually called `_start()`.

### **TLS writes on JS-backed streams no longer re-enter GC borrows** (bd60606)
Encrypted output from `TLSWrap` is now deferred with `queueMicrotask` before writing back into JS-backed duplex streams. That breaks a reentrant write chain that could panic with `RefCell already borrowed`, fixing TLS-over-duplex scenarios used by drivers like tedious/mssql.

### **ChildProcess.kill() now matches Node’s return value** (210719b)
`ChildProcess.kill()` now returns `false` when the process has already exited, instead of pretending the signal was delivered. The implementation also tightens signal handling, including Windows fallbacks and correct `kill(0)` existence checks.

### **Worker option misuse now warns instead of failing silently** (33bee46)
The web `Worker()` constructor now warns when Node-specific options like `env` or `workerData` are passed, and worker initialization errors are surfaced instead of panicking. That makes a dangerous compatibility footgun much easier to spot and turns a process crash into a JS error.

### Other misc changes
- Updated V8 crate to 147.2.1 (ccc0d6f)
- Added regression tests and fixtures for npm peer-dependency lockfile updates (81720cf)
- Added TLS regression coverage and compatibility test registration (bd60606, 8991405, d75ca4b, 210719b)
