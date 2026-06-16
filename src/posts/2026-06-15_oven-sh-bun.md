---
date: 2026-06-15
repo: oven-sh/bun
size: L
title: "Compat fixes land across HTTP, TLS, and SQL"
excerpt: "Bun tightens Node/Web compatibility and fixes several native leaks and regressions in websocket, fetch, TLS, Postgres, and JSON5."
commits: 10
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"f764878": robobun, "352ce1a": robobun, "88d09d5": robobun, "65f80dc": robobun, "8cfee50": robobun, "332aa78": robobun, "df55ab7": alii, "e0acad3": Jarred-Sumner, "2d8d5da": Jarred-Sumner, "7daa6ef": Jarred-Sumner}
---

### **Fetch decompresses large gzip bodies again** (332aa78)
Bun removes the 1 GiB decompressed-body cap from the HTTP decompressor, matching the original Zig behavior for buffered responses. That unblocks large but valid gzip payloads that previously failed with a zlib error.

### **TLS now enforces the server default for incoming cert checks** (7daa6ef)
`tls.Server` now propagates its normalized `rejectUnauthorized` default to per-connection sockets, so client cert verification is actually enforced when `requestCert` is enabled. The teardown path was also adjusted to avoid surfacing an uncaught socket error in the reject path.

### **WebSocket fragmented dispatch keeps its receive buffer capacity** (65f80dc)
The websocket client now preserves and rewinds the receive FIFO instead of throwing it away after fragmented message dispatch. That fixes the capacity regression that caused repeated fragmented messages to keep reallocating from a zero-capacity buffer.

### **Postgres null-byte validation now throws the right Node error** (df55ab7)
Postgres connection parameter checks now raise `ERR_INVALID_ARG_TYPE` instead of a generic code-less error when `username`, `password`, `database`, or `path` contain NUL bytes. This brings Bun in line with MySQL and the Zig reference, and keeps the public error contract consistent.

### **`Bun.embeddedFiles[].name` now preserves asset subdirectories** (352ce1a)
`bun build --compile` no longer drops `[dir]` from embedded asset names when using path-preserving asset naming. The fix also normalizes Windows lookup paths so imported file assets can still be read correctly from the compiled binary.

### **`Bun.JSON5.stringify` no longer leaks string refs** (88d09d5)
The JSON5 stringifier now owns its `space` and identifier strings explicitly, releasing the extra `WTF::StringImpl` refs that were accumulating on repeated calls. This fixes a real memory leak in both pretty-print spacing and object key handling.

### **`require('module')._nodeModulePaths()` releases refs properly** (8cfee50)
The resolver now wraps input and generated paths in owned strings so temporary refs are dropped instead of leaking. This fixes another memory leak in Node compatibility code that was visible under repeated calls.

### **`get_optional_slice` now uses property wording in type errors** (f764878)
The JSC helper that reads optional options-object properties now throws the same “property must be of type…” message as Zig instead of the older argument-style wording. This is a compatibility polish fix for user-facing error text.

### **`Hmac.update()` now throws `ERR_INVALID_THIS` on bad receivers** (e0acad3)
Native HMAC `update()` now rejects invalid receivers with the proper Node error code. That tightens the public crypto API’s error behavior for misuse.

### **`CLAUDE.md` was trimmed and reorganized** (2d8d5da)
The repo guidance doc was shortened and split with a new landing-PRs companion page. Mostly editorial cleanup, not a runtime change.

### Other misc changes
- JSON5 stringify leak tests and memory assertions added.
- WebSocket fragmented-pong regression coverage expanded.
- TLS cert compatibility tests added for default and explicit `rejectUnauthorized` behavior.
- SQL validation tests expanded for null-byte, TLS, and query-shape errors.
- Build/review documentation updates in CLAUDE.md and new reviewer guidance doc.
