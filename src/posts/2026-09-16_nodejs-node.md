---
date: 2026-09-16
repo: nodejs/node
size: L
title: "DTLS overhaul, plus key bug fixes"
excerpt: "Major DTLS API/implementation updates landed, along with fixes for AbortSignal.any, HTTP abort handling, inspector startup, and VFS writes."
commits: 10
authors: [codebytere, legendecas, christianaurichzm, joyeecheung, aduh95, barathraj048, greenheadHQ, inoway46, jasnell]
commit_authors: {"a093ea5": christianaurichzm, "ecd365e": joyeecheung, "67e66b8": barathraj048, "edc61b1": greenheadHQ, "5859ced": codebytere, "de40414": inoway46, "bd2b98f": jasnell}
---

### **DTLS gets a broad API and implementation refresh** (bd2b98f)
DTLS moved from experimental to active development and picked up a large set of API additions and behavioral clarifications, including more complete server/client options, binding errors that match net/dgram, and better docs. The underlying implementation was heavily reworked across JS and C++ to support the expanded surface area and new tests.

### **AbortSignal.any() now preserves abort state more reliably** (de40414)
AbortSignal.any() now follows composite sources at construction time so abort state survives even if the source signals are garbage-collected before the composite is observed. The fix also tightens cleanup of unreachable dependent signals and adds coverage for nested composites and GC edge cases.

### **HTTP request aborts no longer crash completed keep-alive sockets** (67e66b8)
Destroying a ClientRequest after the request and response have fully completed now skips tearing down the socket. This avoids emitting an unhandled socket error while the connection is being returned to the agent pool, fixing a process-crash edge case.

### **fs.openAsBlobSync() lands** (edc61b1)
Node now exposes a synchronous Blob-opening API alongside the existing promise-based version. It integrates with VFS and permission handling, giving users a sync path for opening file-backed Blobs.

### **VFS real file writes now stay attached to the open descriptor** (a093ea5)
RealFSProvider writes now go through the open file descriptor instead of reopening the original path. That preserves write behavior across renames and keeps access-mode and current-position semantics aligned with the opened handle.

### **Inspector no longer aborts when multiple Environments own it** (5859ced)
Inspector startup was refactored to support multiple default-flag Environments without tripping an abort. The change centralizes debug-signal startup and fan-out so concurrent or repeated Environment creation is handled more safely.

### **Primordial init failures now print the thrown exception** (ecd365e)
When primordial initialization fails during snapshot/build-time setup, Node now prints the exception that caused it. That should make local development and build debugging much less opaque.

### Other misc changes
- Doc cleanup and changelog updates.
- Signal-mask documentation clarification for default signal handling.
