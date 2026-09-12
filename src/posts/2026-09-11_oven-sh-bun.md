---
date: 2026-09-11
repo: oven-sh/bun
size: L
title: "Bun hardens HTTP, TLS, and React compiler"
excerpt: "Major fixes across HTTP/2 event ordering, keep-alive safety, TLS socket behavior, and React compiler handling of locals."
commits: 21
authors: [robobun, cirospaciari, dylan-conway]
commit_authors: {"4b5862f": robobun, "6b394bf": robobun, "81f97bb": robobun, "838da26": robobun, "a99e423": robobun, "f10bc78": robobun, "fc479fb": robobun, "c2bf9b4": robobun, "44e51b7": robobun, "e88d46d": robobun}
---

### **HTTP/2 close() now matches Node’s event order** (fc479fb)
Bun fixes `ClientHttp2Stream.close(code)` so non-`NO_ERROR`/`CANCEL` closes no longer emit a spurious `'end'` before `'error'`. This brings Bun in line with Node’s stream contract and avoids downstream code seeing a clean EOF on streams that were actually reset.

### **HTTP/1 fallback now queues pipelined responses instead of throwing** (838da26)
The JS HTTP/1 fallback path now handles back-to-back requests on the same connection without tripping `ERR_HTTP_SOCKET_ASSIGNED`. It also pauses reads when the response queue backs up, preventing pipelined traffic from overrunning the connection.

### **TLS socket adoption now respects readable/writable state** (e88d46d)
`net.Socket({ fd, readable: false, writable: true })` no longer forces both halves on, and adopted fds are treated more like Node’s stdio-style sockets. This fixes broken write-only sockets, keeps `readable: false` connections from self-ending, and improves `resume()`/`read()` behavior for ended read sides.

### **Idle pooled keep-alive sockets are destroyed if they receive unsolicited data** (f10bc78)
Bun now marks free Agent sockets so any bytes arriving while they sit in the pool cause the socket to be destroyed instead of poisoning the next request. This is a security-relevant hardening fix and matches Node’s CVE-motivated behavior.

### **React Compiler preserves locals bound to require() and import()** (4b5862f)
The compiler now keeps function-local bindings for values imported via `require()` or dynamic `import()`, instead of erasing them during lowering. That prevents runtime `ReferenceError`/`TypeError` failures in compiled components and hooks.

### **node:http2 ALTSVC and ORIGIN now preserve latin-1 bytes** (a99e423)
Bun now encodes and decodes ALTSVC/ORIGIN strings using latin-1 semantics, so bytes in the 0x80–0xFF range survive round-trips with Node. This fixes mojibake and invalid-char errors when these HTTP/2 frames carry non-UTF-8 payloads.

### **TLS shutdown before handshake completion now sends FIN** (44e51b7)
Calling `end()` or `destroySoon()` before a TLS handshake finishes now closes the underlying socket instead of hanging indefinitely. That prevents stuck processes when the peer never completes the handshake.

### **node:http releases paused buffered bodies once the response ends** (6b394bf)
Bun now correctly clears in-flight accounting and buffered request-body state when a paused request’s final chunk was already buffered and the response finishes. This fixes server shutdown hangs and leaked request refs in paused-body edge cases.

### **node:net throws from listeners now surface as uncaughtException** (c2bf9b4)
Throws from `'data'` and `'connection'` listeners are now routed like Node’s: they go to `uncaughtException` and the socket keeps living instead of converting into a socket error and closing. This is an important compatibility fix for error handling behavior.

### **node:tls now inherits allowHalfOpen from the wrapped socket** (81f97bb)
TLS sockets created around existing sockets now preserve the wrapped socket’s half-open behavior instead of hard-coding `allowHalfOpen: false`. That aligns Bun with Node and avoids surprising shutdown behavior when wrapping sockets.

### **node:http now keeps pipelined fallback requests working** (838da26)
On the HTTP/1 fallback path, Bun now queues responses for pipelined requests instead of failing when the previous response is still attached. This prevents crashes on keep-alive/pipelined traffic and improves compatibility for ALPN fallback too.

### Other misc changes
- WebKit upgraded to `cf1b36ec8703`.
- Windows usockets crash fix was reverted, then the original fix was reintroduced.
- Dependency bumps (1 commit).
- Minor test and CI workflow updates.
