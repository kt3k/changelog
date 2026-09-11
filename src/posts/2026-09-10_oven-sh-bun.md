---
date: 2026-09-10
repo: oven-sh/bun
size: L
title: "HTTP, crypto, sqlite fixes land in Bun"
excerpt: "Major compat and correctness fixes across http2, crypto, sqlite, fetch, serve-file, and parser handling; also adds new V8 addon symbols."
commits: 8
authors: [robobun]
commit_authors: {"61cdc7a": robobun, "2ffa891": robobun, "d61e0b0": robobun, "e5f9986": robobun, "c97fabb": robobun, "8541df9": robobun, "e5c3e03": robobun, "f27fa4b": robobun}
---

### **Node http2 now reports refused connects correctly** (61cdc7a)
Bun no longer writes the HTTP/2 client preface to a socket that is still connecting, which preserves the original `ECONNREFUSED` on a closed port instead of turning it into `ECONNRESET` or swallowing it. This restores Node-compatible error behavior for `http2.connect()` failure paths.

### **Bun’s V8 shim now exposes more addon APIs** (2ffa891)
Implemented `v8::Function::GetScriptOrigin()`, `GetScriptLineNumber()`, `GetScriptColumnNumber()`, and `v8::Value::ToInt32()`, filling a compatibility gap that could prevent native addons from loading or crash them at first use. This directly unblocks addons like New Relic’s inspection path and broadens Bun’s native addon surface.

### **Parser no longer panics on huge import clauses** (d61e0b0)
The JS parser now uses `usize`-sized accounting instead of overflowing a 16-bit cast when an import clause has more than 65,535 names. That turns a hard parser crash into normal handling for extreme-but-valid source input across `bun run`, `bun build`, and transpilation.

### **Hash finalization now matches Node after `end()`** (e5f9986)
`Hash.update()` and `Hash.copy()` no longer reuse a finalized digest context after `end()`, which fixes hangs seen with SHA-3 and similar algorithms. The change also makes empty `update()` calls succeed after digest finalization, aligning Bun’s crypto behavior more closely with Node/OpenSSL.

### **SQLite bindings now treat detached typed arrays as empty blobs** (c97fabb)
Detached `TypedArray`/`ArrayBufferView` values now bind as zero-length BLOBs instead of SQL NULL, matching live empty views and Node’s sqlite behavior. The patch also switches blob/text bindings to 64-bit length APIs so 2 GiB values are rejected instead of silently truncating or misbinding.

### **Large file responses no longer race ahead of buffered headers** (8541df9)
On Linux/Android, `Bun.serve` now defers `sendfile()` until any partially buffered response headers have drained to the socket. This fixes a subtle wire-ordering bug where file bytes could overtake the tail of the headers for large responses.

### **Fetch now rejects malformed chunk-size tokens** (e5c3e03)
Bun’s HTTP parser is patched to reject invalid chunk-size syntax like `0x5` instead of misreading it as a valid zero-length chunk. That closes a response-smuggling/corruption bug and brings `fetch()` behavior in line with stricter HTTP parsing.

### Other misc changes
- Deflake Node.js compatibility test for `node-http-agent-tls-options` (f27fa4b)
- Added regression tests for the http2 refusal case, crypto finalization, sqlite edge cases, sendfile/header ordering, and malformed chunked responses
- Minor internal binding and parser refactors to support the fixes
