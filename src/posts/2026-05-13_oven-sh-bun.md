---
date: 2026-05-13
repo: oven-sh/bun
size: M
title: "Fetch keepalive now matches Node behavior"
excerpt: "Bun adds TCP keepalive for fetch sockets and fixes it to respect `keepalive: false`, with tests covering Node/http interop."
commits: 2
authors: [cirospaciari]
commit_authors: {"b8ecc78": cirospaciari, "b9c757b": cirospaciari}
---

### **Fetch sockets gain TCP keepalive, with a guard for `keepalive: false`** (b8ecc78)
Bun now mirrors undici more closely by only enabling `SO_KEEPALIVE` on `fetch()` sockets when the request is actually using keepalive. That means `keepalive: false` no longer gets TCP keepalive settings applied unconditionally, which matters for compatibility with `node:http`/`node:https` and `agent.keepAlive` behavior.

### **TCP keepalive is enabled for fetch client sockets** (b9c757b)
`fetch()` now sets `SO_KEEPALIVE` with a 60-second idle timeout so half-open connections are detected instead of hanging on dead peers, matching Node/undici semantics. The new Linux test validates the kernel timer state and covers both the default behavior and the `keepalive: false` path.

### Other misc changes
- None
