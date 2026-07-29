---
date: 2026-07-28
repo: denoland/deno
size: L
title: "Node stream fixes and leaner Linux builds"
excerpt: "Backpressure and TLS race fixes landed in ext/node and ext/net, alongside a Linux release packaging overhaul to drop unwind tables."
commits: 4
authors: [nathanwhit, gaurav0107, bartlomieju]
commit_authors: {"697ba72": gaurav0107, "f5bb6d5": bartlomieju, "1ec783e": nathanwhit, "3b11cc4": nathanwhit}
---

### **Readable.toWeb now honors backpressure** (697ba72)
`Readable.toWeb()` now uses a byte-based queuing strategy for non-object-mode streams so the Web Streams controller can actually apply backpressure instead of buffering the whole source. The fix also covers byte streams and string-encoded chunks, closing a memory/flow-control bug in Node stream interop.

### **TLS write completion is deferred to avoid reentrancy panics** (f5bb6d5)
TLS write-completion callbacks are now dispatched in a way that avoids re-entering ops while `OpState` is borrowed, which was causing a `RefCell already borrowed` panic. The patch also hardens fatal-exception reporting so exceptions from native callbacks can’t leak across the shared event-loop scope.

### **Linux release artifacts drop unwind tables** (1ec783e)
Release builds for Linux x86_64 and aarch64 now force frame pointers and disable generated unwind tables, then explicitly strip `.eh_frame`/`.eh_frame_hdr` from shipped binaries. That shrinks release artifacts and removes unused unwind metadata while preserving panic traces via the new frame-pointer-based path.

### **Concurrent TCP listener drops no longer leave ports bound** (3b11cc4)
The TCP load-balancer listener drop path was tightened so the shared connection reference is released inside the same critical section as the map cleanup. This fixes a race where concurrent drops could leave the socket registered until process exit, keeping the port bound unexpectedly.

### Other misc changes
- TLS/web-stream regression tests added/updated.
- Release CI/build workflow updated for the Linux packaging and panic-trace changes.
- Minor test fixture updates.
