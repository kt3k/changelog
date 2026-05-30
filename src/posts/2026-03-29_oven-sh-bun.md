---
date: 2026-03-29
repo: oven-sh/bun
size: M
title: "Linux accept path gets a kernel fast path"
excerpt: "Bun now enables deferred accept on Linux/FreeBSD listeners to cut an extra event-loop round trip for HTTP/TLS connections."
commits: 1
authors: [Jarred-Sumner]
commit_authors: {"1cc8376": Jarred-Sumner}
---

### **Enable TCP_DEFER_ACCEPT for Bun.serve() listeners on Linux/FreeBSD (1cc8376)**
Bun’s HTTP listener path now asks the kernel to hold accepts until client data is ready, using `TCP_DEFER_ACCEPT` on Linux and `SO_ACCEPTFILTER "dataready"` on FreeBSD. That lets newly accepted sockets be dispatched as readable immediately, avoiding an extra epoll/kqueue trip for short-lived HTTP connections and reducing latency/overhead.

### Other misc changes
- Public listener option added: `LIBUS_LISTEN_DEFER_ACCEPT`
- Listen-socket state updated to track whether deferred accept was successfully enabled
- Event-loop accept handling adjusted for the deferred-accept fast path and timeout/EWOULDBLOCK fallback
- HTTP context/bindings updated to wire the new listener behavior through
