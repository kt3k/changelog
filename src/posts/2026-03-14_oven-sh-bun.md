---
date: 2026-03-14
repo: oven-sh/bun
size: L
title: "HTTP/2 settings and SQL prep fixes land"
excerpt: "Node-compatible HTTP/2 settings handling and atomic Postgres prepared-statement execution headline a day of important runtime fixes."
commits: 5
authors: [robobun, alii, dylan-conway]
commit_authors: {"10bdb48": robobun, "8fb62c0": robobun, "1f134a1": alii, "685b934": dylan-conway, "f4dc498": robobun}
---

### **HTTP/2 settings now match Node more closely** (8fb62c0)
Bun’s HTTP/2 settings packing/unpacking was rewritten to support `enableConnectProtocol`, honor `customSettings`, and return the expected defaults and error shapes. This should improve Node compatibility for apps that introspect or update session settings, especially around `getPackedSettings()` and `getUnpackedSettings()`.

### **Unnamed Postgres prepared statements are now sent atomically** (10bdb48)
Parse, Bind, Execute, Flush, and Sync are now batched together for unnamed prepared statements so connection poolers like PgBouncer in transaction mode can’t split them across backend connections. That fixes a correctness bug where queries could hit the wrong prepared statement when using pooled Postgres connections.

### **macOS UDP sockets and reusePort are fixed** (f4dc498)
The UDP socket path now enables `SO_REUSEPORT` on macOS where supported, propagates the real bind error, and avoids leaking the socket fd on failure. The regression test covers the implicit-bind path so dgram behavior should be more reliable on Apple platforms.

### **Other misc changes**
- Build flags updated to pass macOS deployment target/sysroot and explicit LTO optimization level at link time (685b934)
- React/Next/next-auth fixture and benchmark dependency upgrades for test coverage (1f134a1)
