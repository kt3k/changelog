---
date: 2026-05-28
repo: nodejs/node
size: M
title: "QUIC errors, HTTP/2 timing, and stream fixes"
excerpt: "Notable runtime fixes landed for QUIC, HTTP/2, streams, and SQLite, plus some snapshot and lint cleanup."
commits: 12
authors: [mcollina, trivikr, pimterry, legendecas, aduh95, joyeecheung, RafaelGSS, Renegade334, junius-sec]
commit_authors: {"e1ae3a5": pimterry, "5174c66": trivikr, "bac704d": mcollina, "d8ac301": junius-sec}
---

### **QUIC failures now report proper codes and messages** (e1ae3a5)
QUIC error handling was overhauled to preserve the wire error type, code, and human-readable reason text, including TLS alert names when available. That makes failures much easier to debug and aligns stream/session errors with Node’s standard internal error objects.

### **HTTP/2 client requests now fail asynchronously when sessions disappear** (bac704d)
`ClientHttp2Session.request()` no longer throws synchronously for destroyed or GOAWAY sessions; it creates the stream and lets it emit the session error on the next tick. This better matches request retry flows and fixes close-order behavior so session shutdown is observed before stream teardown.

### **Concurrent `share()` reads are now serialized** (5174c66)
Overlapping `next()` calls on a shared async iterator now resolve in request order instead of racing each other. This closes a correctness gap in stream iteration that could surface as out-of-order consumer behavior.

### **Bundled SQLite gets a corruption-handling backport** (d8ac301)
A SQLite session-extension fix was cherry-picked to avoid passing NULL while applying malformed update changesets. The bundled test coverage now checks that corrupt changesets are rejected as `SQLITE_CORRUPT`/malformed-database errors instead of misbehaving.

### Other misc changes
- Eagerly load ESM snapshot helpers to reduce runtime loading noise and capture them in the snapshot.
- Add an ESLint rule for aborted `AbortController` usage.
- Update `git node land` docs for security releases.
- Adjust permission docs wording and add a `vfs` subsystem label.
- Defang a build flag so `NODE_USE_NODE_CODE_CACHE` is only used in `node_mksnapshot`.
- Minor test/doc tweaks around QUIC, net pipe connect errors, and TypeScript coverage.
