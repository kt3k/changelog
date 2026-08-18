---
date: 2026-08-17
repo: oven-sh/bun
size: L
title: "Bun gets major URL, Redis, install, and stability work"
excerpt: "Big day of new Redis methods, URL performance wins, install fixes, and multiple crash/security bug fixes across Node and HTMLRewriter."
commits: 42
authors: [robobun, Jarred-Sumner, alii, dylan-conway]
commit_authors: {"6fe59cb": Jarred-Sumner, "1d1131c": robobun, "5c8725f": robobun, "875c761": robobun, "3d369b4": robobun}
---

### **Redis client grows first-class coverage for many command families** (1d1131c)
`Bun.redis` / `RedisClient` now exposes dozens of additional typed methods for bitmap, HyperLogLog, geo, scripting, server, and stream commands. This removes a major `.send()` escape hatch for users and brings autocomplete and type safety to a much wider slice of Redis/Valkey APIs.

### **URL parsing and accessors get faster, with punycode handled without full ICU** (6fe59cb)
`href` / `toString()` / `toJSON()` now reuse the constructor's canonical string when possible and cache wrapper results, making common URL access patterns cheaper. The patch also adds a fast ASCII punycode check for literal `xn--` hosts and speeds up `new URL(rel, urlObject)` by reusing the base cache.

### **Install fixes credentials, tarballs, and isolated store naming** (875c761)
Install now correctly handles three edge cases: tarball URL credentials become `Authorization: Basic`, `file:` tarballs resolve relative to their declaring folder package, and isolated-store entry names are bounded so long resolutions don't explode path length. These are practical compatibility fixes for real package sources and reduce install failures on tricky dependency specs.

### **Multiple runtime crash and UAF fixes land in HTTP, buffer, TLS, HTMLRewriter, and SQL**
Several user-facing bugs were fixed across core APIs: detached buffers now behave like empty views in more Node-compatible operations, `HTMLRewriter` stops reading freed content-op strings and fixes sink/controller lifetime issues, `node:http` and `node:http2` avoid response/header path crashes, and `bun:sqlite` no longer crashes on empty column names. Together these close a wide set of correctness and safety gaps in hot paths.

### **Inspector and http2 protocol plumbing is refreshed** (3d369b4, 5c8725f)
The inspector protocol snapshot was regenerated from Bun's pinned WebKit, and the debug adapter now only re-emits valid inspector event domains. Separately, inbound `node:http2` header materialization now reuses the per-VM header identifier cache instead of allocating new names on every inbound block.

### **Other misc changes**
- CI/workflow tweaks and source-lint updates
- Dead-code removals and cleanup across Rust/C++/JS
- Build/tooling guardrails for rust std/backtrace
- Small Node compatibility fixes in `node:path`, `node:tls`, `node:buffer`, `node:http`, and `node:inspector`
