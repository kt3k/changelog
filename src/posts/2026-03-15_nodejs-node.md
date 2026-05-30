---
date: 2026-03-15
repo: nodejs/node
size: M
title: "Undici gains SOCKS5, libuv updated"
excerpt: "Undici adds SOCKS5 proxy support and cache docs, libuv bumps to 1.52.1, plus worker heap profile optimizations."
commits: 5
authors: [nodejs-github-bot, aduh95, IlyasShabi]
commit_authors: {"4579957": nodejs-github-bot, "5bebd7e": nodejs-github-bot, "82409af": IlyasShabi}
---

### **Undici 7.24.3 lands with SOCKS5 proxy support** (4579957)
This update brings a sizable Undici refresh, including new `Socks5Agent`/`socks5-proxy-agent` support, related core plumbing, and expanded docs and examples. It also updates handler behavior and API docs, which matters for apps using proxies, caching, or custom dispatchers.

### **libuv updated to 1.52.1** (5bebd7e)
Node picks up the libuv 1.52.1 release, along with the upstream changelog, build metadata, and API/doc adjustments. This is a meaningful runtime dependency update that can carry platform, I/O, and compatibility improvements.

### **SIMDUTF enabled for Ada URL parsing** (1bc0fdd)
Ada is now built against V8’s `simdutf` and defines `ADA_USE_SIMDUTF=1`, wiring in a faster text/UTF utility path. That should improve URL parsing performance characteristics in the affected code path.

### **Worker heap profile serialization optimized** (82409af)
Heap profile collection now stops sampling before JSON serialization and writes with the pretty-printing path enabled. This looks like a targeted performance/implementation tweak for worker profiling output.

### Other misc changes
- Commit-message validation in the push notification workflow now checks all pushed commits, with Slack alerts limited to the main Node.js repo.
- Small Undici doc/example updates and ignore-file additions.
