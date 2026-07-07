---
date: 2026-07-06
repo: oven-sh/bun
size: L
title: "Bun tightens streams, HTTP, fs, and sockets"
excerpt: "Major bug fixes landed across Web Streams, Bun.serve, node:fs, WebSocket, TLS, cookies, and internals."
commits: 21
authors: [robobun, Jarred-Sumner]
commit_authors: {"a12475e": robobun, "9d0e93d": robobun, "146a2eb": robobun, "d363fa6": robobun, "9f29e55": robobun, "27f4f0a": robobun, "bdc097d": robobun, "8e5d1a6": robobun, "b51577e": robobun, "4ca9ebc": robobun, "7e3c6e8": robobun, "6a35e49": robobun, "82229f2": robobun, "0737687": robobun}
---

### **Fix a spurious unhandled rejection for async iterable response bodies** (a12475e)
Bun now avoids double-reporting errors when an async iterable `Response`/`Request` body throws: the consumer still receives the failure, but it no longer also surfaces as an unhandled rejection. This fixes a nasty false-positive process failure for handled stream errors.

### **Fix unsound pointer provenance in JSON tape and related internals** (9d0e93d)
This is a substantial memory-safety refactor: several long-lived raw pointers were being derived from short-lived reborrows, which Miri flagged as UB under Tree Borrows. The JSON tape, pointer utilities, object pools, and several parser/runtime paths were adjusted to preserve the original provenance and add regression coverage.

### **Move release uploads from macOS to Linux** (146a2eb)
Bun’s release/canary upload step now runs on Linux EC2 instead of the macOS fleet. This frees up scarce macOS capacity and matches the repo’s existing Linux-based artifact upload flow.

### **Make WebAssembly streaming MIME checks case-insensitive** (d363fa6)
`WebAssembly.compileStreaming` and `instantiateStreaming` now accept `Content-Type` values regardless of casing, aligning with the spec’s MIME handling. This removes a surprising compatibility bug for otherwise valid responses.

### **Make `jest.resetAllMocks()` actually reset mocks** (9f29e55)
Bun test’s Jest compatibility now restores mock implementations instead of merely clearing call history. That brings behavior in line with Jest and fixes tests that rely on reset semantics.

### **Take each V8 heap snapshot in its own process** (27f4f0a)
Heap snapshot collection was reworked so each snapshot runs isolated in a separate process. This makes the snapshot tooling more robust and reduces cross-snapshot interference.

### **Give generic sqlite errors a proper `SQLITE_ERROR` code** (bdc097d)
`bun:sqlite` now sets `SQLiteError.code` for generic SQL errors instead of leaving it `undefined`. That makes syntax errors and similar failures easier to branch on consistently.

### **Reject invalid `Response.error()` status lines in Bun.serve** (8e5d1a6)
Bun.serve now refuses to serialize responses whose status is outside `100..=999`, instead of emitting malformed wire output for `Response.error()` and similar cases. This prevents invalid HTTP responses from reaching clients and routes the failure through the error path.

### **Preserve static-route Content-Type across re-registration** (b51577e)
Static routes now keep the response’s inferred or explicit `Content-Type` even after the same `Response` object is registered again. That fixes a subtle regression where reusing a `Response` could drop its MIME type.

### **Fix `writeFile` truncation behavior for non-truncating flags** (4ca9ebc)
`node:fs` now preserves existing file contents for flags like `r+`, `rs+`, and `sr+` instead of silently truncating the file after writing. This restores the documented patch-in-place semantics and avoids accidental data loss.

### **Propagate web stream errors and support `finished()` on WHATWG streams** (7e3c6e8)
The Node stream interop layer was upgraded so `Readable.fromWeb()` surfaces web stream failures correctly and `finished()` works on WHATWG streams without locking them. This closes a long-standing interop gap between Bun and Node stream expectations.

### **Reject RSV1 on websocket continuation frames** (6a35e49)
Bun’s WebSocket client now fails the connection when RSV1 appears on anything other than the first data frame, matching RFC 7692 and browser behavior. Invalid compressed continuations are now closed with protocol error 1002 instead of being delivered.

### **Fix cookie parsing when `Max-Age` appears before `Expires`** (82229f2)
`Bun.Cookie.parse` no longer drops `Expires` just because `Max-Age` comes first. That makes cookie parsing order-independent and more faithful to real-world `Set-Cookie` headers.

### **Fix use-after-free when `upgradeTLS()` runs in socket open** (0737687)
Bun’s socket lifecycle now separates event-loop exit from handler teardown so synchronous `upgradeTLS()` calls during `open`/`data` don’t free handlers twice. This fixes a serious crash/UAF in a high-risk connection-handling path.

### Other misc changes
- Cookie `Expires` formatting and assertion updates (2 commits)
- WebSocket/TLS and socket test coverage additions
- Bundler `publicPath` path-composition fix
- WebSocket/TLS and error-reporting follow-up adjustments
