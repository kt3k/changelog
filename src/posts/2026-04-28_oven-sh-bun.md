---
date: 2026-04-28
repo: oven-sh/bun
size: L
title: "Security fixes, HTTP/3, and CI hardening"
excerpt: "A heavy day of memory-safety fixes, new HTTP/3 client/server plumbing, and several CI/build/test reliability improvements."
commits: 34
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"56d7403": dylan-conway, "36794bb": robobun, "06218ad": robobun, "97f683e": robobun, "189c1f0": Jarred-Sumner, "621c401": robobun, "fad191d": robobun, "245c1e4": robobun, "ca9e089": Jarred-Sumner, "70f9002": Jarred-Sumner, "68a2c3d": Jarred-Sumner}
---

### **HTTP/2 client hardened with new Alt-Svc HTTP/3 support** (ca9e089, 189c1f0)
Bun’s experimental HTTP client work got a major upgrade: HTTP/2 was hardened with tighter header/body buffering limits and more defensive stream handling, while HTTP/3 was split into a dedicated `h3_client/` module and wired up behind new CLI/env feature flags. The new Alt-Svc-driven upgrade path matters because it lets `fetch()` opportunistically move origins to QUIC/HTTP-3 instead of staying on TCP, but only when explicitly enabled.

### **Fixes for multiple memory-safety bugs in core networking and TLS** (fad191d, 68a2c3d, 245c1e4, 621c401, 06218ad, 97f683e, 36794bb)
Several high-severity bugs were fixed across HTTP, TLS, UDP, zlib, WebSocket upgrade handling, and macOS file watching, including UAFs, heap OOBs, and leaks. These are the kinds of issues that can crash Bun under real workloads or become security-relevant when exposed to untrusted network input.

### **Install force now replaces corrupted global-store entries** (56d7403)
`bun install --force` now actually overwrites an existing bad global-store entry instead of silently keeping it if the publish step collides. That makes forced reinstalls reliable again when the cache is corrupted or partially written.

### **New hardware timer backend for rough tick counts** (70f9002)
Bun now backs `getRoughTickCount()` with a dedicated hardware timer implementation exposed as `bun.hw_timer`. This is a performance/runtime change that improves monotonic time access across targets and standardizes a low-overhead timestamp source.

### **Other misc changes**
- CI no longer skips tests when GitHub PR file listing fails; cache PR metadata instead. 
- Windows debug builds now emit PDBs for better crash diagnostics.
- Various leak fixes in `TextDecoder`, `DataURL.decodeData`, `server.fetch(string)`, SQL statement parsing, and router route cleanup.
- Test-only hardening and regression coverage for ASAN, streams, zstd, S3 validation, and HTTP/2/HTTP/3 cases.
