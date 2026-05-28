---
date: 2026-04-17
repo: denoland/deno
size: L
title: "Deno Node shim gets HTTP, TLS, and stream fixes"
excerpt: "Header limits, HTTP/2 flushes, TLS shutdown behavior, and a stream-wrap refactor landed alongside review-driven Node compat fixes."
commits: 5
authors: [bartlomieju, nathanwhit]
commit_authors: {"67f82d7": bartlomieju, "7eda90e": bartlomieju, "764e4de": bartlomieju, "19c3f43": bartlomieju, "7529c84": nathanwhit}
---

### **HTTP parser now enforces maxHeaderSize** (67f82d7)
The Node HTTP parser now tracks header byte counts and rejects oversized headers instead of letting them slip through. Deno also exposes a parser flag to detect header-overflow errors, which should bring `node:http` behavior closer to Node.js and close a reported bug.

### **Fix Node HTTP rewrite edge cases and validation** (7eda90e)
This commit tightens several `node:http` behaviors: it restores a missing binding warning, validates `writeHead()` status messages for invalid characters to block CRLF injection, and adjusts shutdown/error handling paths. It also updates HTTP parser initialization and related compat tests to match Node’s defaults more closely.

### **HTTP/2 client requests now flush HEADERS promptly** (764e4de)
Client requests now schedule pending HTTP/2 data immediately after stream creation, preventing deadlocks for cases like `endStream=false` and `expect: 100-continue`. The session write path was also adjusted so graceful-close checks happen after queued data is actually written.

### **TLS shutdown now waits for handshake completion** (7eda90e)
TLS shutdown is now deferred if the handshake is still in progress, then completed once the handshake finishes. The client config also falls back to Mozilla’s default root store when no CA is specified, fixing verification failures for ordinary TLS connections.

### **Stream wraps move to native LibUvStreamWrap implementations** (7529c84)
This is a major internal refactor that deletes the old JS `LibuvStreamWrap` layer and replaces duplicated wrap behavior with shared native Rust implementations. It reduces code duplication across TCP/Pipe handling and aligns stream semantics across the Node compatibility layer.

### Other misc changes
- Removed dead JS stream-wrap plumbing and updated type usage for write wraps (19c3f43)
- Enabled previously ignored compat tests after HTTP/2 fixes (764e4de)
- Misc native/polyfill cleanup around pipe and stream handling (7529c84)
- Minor test/config adjustments across node compat suites (7eda90e, 764e4de, 19c3f43)
