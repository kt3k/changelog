---
date: 2026-04-12
repo: oven-sh/bun
size: L
title: "Serve, WebSocket, and process fixes land"
excerpt: "Major Bun.serve file-streaming overhaul, live process.ppid, and Unix-socket WebSocket support headline the day."
commits: 11
authors: [Jarred-Sumner, robobun, sosukesuzuki]
commit_authors: {"ff2c8b7": robobun, "a0d9aab": Jarred-Sumner, "b18f268": robobun, "c39ed14": robobun}
---

### **Bun.serve gets unified file streaming, Range support, and abort-safe fd handling** (a0d9aab)
Bun.serve now routes file bodies through a shared `FileResponseStream`, replacing several divergent code paths with one implementation for static routes and file responses from `fetch` handlers. The change adds Range support and fixes aborted-stream hangs, while also tightening fd lifetime handling around non-streaming responses.

### **process.ppid becomes a live getter** (ff2c8b7)
`process.ppid` now reflects the kernel’s current parent PID on every read instead of caching the initial value. That fixes orphan-detection logic after reparenting and aligns Bun more closely with Node.js behavior.

### **WebSocket client adds ws+unix:// and wss+unix:// support** (b18f268)
The WebSocket client can now connect over Unix domain sockets using new `ws+unix://` and `wss+unix://` URL schemes. This unlocks local-socket WebSocket setups, including TLS-over-unix-socket connections, and explicitly bypasses proxy handling for these local endpoints.

### **Static file routes stop leaking fds on 304 and HEAD** (c39ed14)
`Bun.serve` static routes now close file descriptors correctly for bodiless responses like 304, 204/205, and HEAD requests. This fixes a real descriptor leak that could exhaust the OS fd limit under CDN-like traffic.

### Other misc changes
- WebKit engine upgrade and related API churn (1 commit)
- Deflake and test stabilization changes (2 commits)
- Build script fixes/reverts and C++ rebuild cleanup (3 commits)
