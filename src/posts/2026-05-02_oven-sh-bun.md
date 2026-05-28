---
date: 2026-05-02
repo: oven-sh/bun
size: L
title: "Bun tightens safety across core paths"
excerpt: "Big fixes landed for macOS orphan tracking, memory-safety bugs, WebSocket upgrades, and more, plus a notable binary size win."
commits: 17
authors: [robobun, Jarred-Sumner, djs5008, dylan-conway]
commit_authors: {"2136518": robobun, "9781940": robobun, "fcd764b": Jarred-Sumner, "57453aa": robobun, "57476f3": robobun, "fafe81f": robobun, "4cb49e7": robobun}
---

### **Fix macOS no-orphans tracking with fork scanning** (fcd764b)
Bun replaces the unsupported `NOTE_TRACK` approach with `NOTE_FORK` plus a `p_puniqueid`-based scan to discover descendants on macOS. This fixes CI timeouts/failures on Darwin and preserves `bun run --no-orphans` behavior without relying on a kernel feature that has been rejected since early macOS releases.

### **Close a Buffer.concat / Bun.concatArrayBuffers memory leak** (2136518)
A getter-detach TOCTOU could let `Buffer.concat()` and `Bun.concatArrayBuffers()` return uninitialized heap memory when input buffers changed during iteration. The fix resolves all elements before measuring/copying, eliminating the data disclosure and hardening array-buffer flattening against user-side effects.

### **Harden N-API external buffers against pending exceptions** (57453aa)
`napi_create_external_buffer` and `napi_create_external_arraybuffer` now reject immediately if a napi exception is already pending, matching Node.js. The implementation also switches to an armable destructor so ownership of external memory is only transferred once the JS wrapper is successfully created.

### **Clamp untrusted Blob offsets during structured-clone deserialization** (57476f3)
Structured-clone and V8 deserialization could feed a crafted `offset` into `Blob`, leading to out-of-bounds reads when the blob was later materialized. Bun now clamps the offset against the backing store and adds coverage for malicious payloads, closing a potential memory disclosure/crash path.

### **Fix WebSocket upgrades from borrowing header strings unsafely** (9781940)
`server.upgrade()` now clones `Sec-WebSocket-Key`, `-Protocol`, and `-Extensions` before running user option getters that can mutate `request.headers`. This prevents use-after-free on the borrowed header storage and makes upgrade handling safe across re-entrant user code.

### **Route streaming 413 responses through the normal request shutdown path** (fafe81f)
When a streaming request body exceeds `maxRequestBodySize`, Bun now rejects the body and finishes via `endWithoutBody` so `ctx.resp` detaches and the base ref is released. That avoids stale response pointers and late async handler crashes after a 413 has already been sent.

### **Fix shell brace expansion for nested sibling products** (4cb49e7)
Brace expansion counting was wrong for patterns like `{{a,b}{c,d}}`, causing crashes or incorrect output. The new stack accounting handles sibling-product nesting correctly and adds regression tests for several mixed nested cases.

### Other misc changes
- WebKit upgrade to 39862040be27 (1 commit)
- Binary size reduction work across output/logging and bundled deps (-~2 MB)
- MySQL `.raw()` strips length-prefix bytes from length-encoded columns
- macOS DNS resolver retry now re-registers libinfo poll on the new mach port
- `bun run` completion keeps standalone `pre*`/`post*` scripts
- Windows `fs.cp` now closes the source handle in the reparse-point branch
- WebSocket server reload no longer leaks discarded handlers
- `bun add`/`remove`/`link`/`unlink` now handle long positionals without stack overflow
- `cd` shell builtin now reports remaining errno cases instead of hanging
- Docs formatting fix in transpiler documentation
