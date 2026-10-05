---
date: 2026-10-04
repo: oven-sh/bun
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: L
title: "Bun hardens runtime safety and fixes TLS/HTTP edge cases"
excerpt: "A week of security, lifetime, and compatibility fixes across codegen locking, sockets, TLS, HTTP, test, and build tooling."
commits: 65
---

### **Security hardening for string-to-code paths**
Bun added `--disallow-code-generation-from-strings`, including a stricter Bun-only mode that blocks every string-to-code path it can reach. The flag now covers workers, VM contexts, the inspector, native addons, and compiled executables, closing a major eval/Function hardening gap.

### **Socket, TLS, and HTTP lifecycle bugs were a big focus**
Multiple crashers and Node-compat edge cases were fixed across the networking stack: spawned stdio now behaves correctly under `O_NONBLOCK`/`EAGAIN`, paused TLS handshakes stay paused, `tls.connect({ socket })` and TLS shutdown paths handle early end/EOF correctly, and several `node:http` cases now match Node for `listen()`, proxy tunnels, pipelined/displaced responses, half-closes, and idle connection teardown. These changes also removed several use-after-free and segfault paths.

### **Runtime lifetime fixes landed across hot reload, VM, require, and clone/clone-like flows**
Bun patched `--hot` entry-point promise lifetime issues, import/module loading races, `require()` cleanup after cache entries disappear, and structured clone transfer atomicity. Related fixes also addressed `Module.runMain` override errors, Blob slice streaming after GC, HTMLRewriter stream reuse, and a few other lifetime-sensitive paths that had been crashing or misbehaving under reload and embedding workloads.

### **Fetch, SQL, DNS, and Bun.serve compatibility improved**
`fetch()` now handles deflate more reliably, `Bun.serve` respects `If-Range`, macOS DNS lookup follows split-DNS failover, and SQL got fixes for failed `begin()` rollback detection and `Bun.file()` TLS CA handling. Bun also tightened range/file body behavior and plugin/module specifier handling to better match expected Node/runtime semantics.

### **Test runner, bundler, and CLI reliability improved**
`bun test` no longer segfaults on asymmetric matchers, deep prints, or coverage flag misuse, while `bun build` no longer crashes on sourcemap/link failures. The package manager and plugin system also picked up fixes for long labels, resolution handling, and virtual-module behavior.

### **Build and memory management updates**
Docker image builds were unblocked by embedding the release signing key, and the WebKit/mimalloc bumps improve memory reclamation for compiler threads, idle workers, and `Bun.sleepSync()`-style sleep periods. These upgrades also added regression coverage around RSS and idle-thread release behavior.

### Other misc changes
- Minifier symbol collision fix and `bun:test` typing cleanup
- ANSI helpers and `FileSink` edge-case abort fixes
- CSS duplicate-rule merge fix
- Buffer write validation changes and related test updates
- Docs, typings, dependency bumps, and regression-test expansion across the touched areas
