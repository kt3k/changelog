---
date: 2026-04-29
repo: oven-sh/bun
size: L
title: "Bun lands HTTP/2, WebSocket, and TLS fixes"
excerpt: "A feature-heavy day with security hardening, leak/UAF fixes, and new execve/die-with-parent process controls."
commits: 40
authors: [robobun, Jarred-Sumner, sosukesuzuki]
commit_authors: {"aa90c28": robobun, "aa3f980": robobun, "6c21a7e": robobun, "0f42aed": robobun, "837552f": robobun, "0d072e1": robobun, "2dc22fc": robobun, "6c58f4e": robobun, "842bf95": robobun, "8d2674a": robobun, "a2ef6a8": robobun, "306b381": Jarred-Sumner, "8dead63": robobun, "00ef5a2": robobun, "f62e43d": robobun, "85e866c": robobun, "09203dd": robobun, "34ad4e4": robobun, "1c7d60e": Jarred-Sumner, "1e9599d": robobun, "7f58d4d": robobun, "5b0baa5": robobun, "82b617c": robobun, "9079d5b": robobun, "9a693f3": robobun, "827d4d6": robobun, "a97e868": robobun}
---

### **Process execve and die-with-parent land** (6c21a7e, 1c7d60e)
Bun now implements `process.execve()` for Node compatibility, and adds an opt-in `dieWithParent` watchdog that exits when the parent dies and kills descendants on shutdown. Together these expand process-management capabilities and improve cleanup behavior in supervisor-style deployments.

### **HTTP/2 padding parser now rejects malformed frames safely** (837552f)
The HTTP/2 frame parser now validates PADDED `DATA` and `HEADERS` frames before subtracting padding, avoiding integer underflow and out-of-bounds reads on malformed peer input. This is a real security hardening fix for network-facing code.

### **Valkey Redis client finally verifies TLS hostnames** (2dc22fc, aa3f980)
TLS connections now enforce hostname verification when `rejectUnauthorized` is true, instead of accepting any CA-signed cert. The client recovery path also clears sticky failed/reconnecting state so `connect()` can recover after a failure instead of staying permanently broken.

### **Bun RedisClient recovers after entering failed state** (aa3f980)
Fixes the long-standing bug where a failed `Bun.RedisClient` would reject every later command until process restart. Successful reconnects now reset the connection state correctly, restoring normal operation after retry exhaustion or a manual close.

### **WebSocket close/terminate now completes CONNECTING sockets** (8d2674a, 6c58f4e)
Closing or terminating a socket during `CONNECTING` now cancels the upgrade cleanly, fires the expected events, and releases pending-activity refs so the object can be collected. A separate tunnel-mode fix also releases a leaked upgrade client on successful proxy upgrades.

### **Multiple memory leaks and UAFs were fixed across core subsystems** (aa90c28, 0f42aed, 0d072e1, 827d4d6, 1e9599d, 85e866c, a2ef6a8, 09203dd, 5b0baa5, 82b617c, 9079d5b, 00ef5a2, f62e43d, 34ad4e4, 7f58d4d, 842bf95, 8dead63, 306b381, 9a693f3, a97e868)
This batch cleans up a wide spread of native leaks and lifetime bugs: TLS certificate/session handling, fetch redirect URLs, SQL/MySQL/Postgres result ownership, blob/content-type aliasing, password hashing buffers, UDP wrapper cleanup, filesystem watchers, transform streams, HTMLRewriter handlers, and more. It also includes a notable Bake dev-server UAF fix when client-component boundaries are demoted.

### **Other misc changes**
- Deflake and concurrency tweaks in fetch HTTP/2 tests
- Guard `FSEventStreamCreate` NULL and reduce watch stress iterations
- Parser micro-optimization: pass `ASTMemoryAllocator` by pointer
- Install path resolution moved off worker-thread shared state
- Minor CI/test adjustments and mimalloc dependency bump
