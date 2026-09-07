---
date: 2026-09-06
repo: nodejs/node
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "Node adds a benchmark API, VFS support, and major core fixes"
excerpt: "This week brought node:bench, ZIP/SEA virtual filesystems, faster fs and worker paths, plus stricter crypto, permission, and stream behavior."
commits: 170
---

### **New virtual filesystem capabilities across Node**
Node expanded its VFS story from basic file access to module/runtime integration. ZIP archives can now be mounted via `vfs.ZipProvider`, SEA bundles can expose a read-only VFS with `useVfs`, and mounted VFS paths can even load native addons. The VFS work also reached both CommonJS and ESM loaders, making packaged archives usable for normal module resolution, relative imports, and asset loading.

### **Benchmarking becomes a first-class Node feature**
The experimental `node:bench` API landed and was then quickly expanded with file/glob execution, richer run metadata, diagnostics, `bench:plan` events, and improved stream/permission behavior. This turns Node into a more complete in-process benchmark runner with structured output and process-isolated execution.

### **Filesystem hot paths got faster and more correct**
Several core fs APIs saw substantial work: recursive `fs.watch()` was reworked for Linux and stabilized across race/error cases, `fs.readdir({ recursive: true })` received a major performance pass, and `fs.writeFile()` now avoids extra libuv thread-pool round trips for small writes. `mkdtemp()` also now preserves Buffer inputs by returning a Buffer when given one, and smaller fixes tightened `fs.cp`, `fs.glob`, and `fs.watch` edge cases.

### **Crypto and security controls tightened up**
WebCrypto gained hybrid KEM support, RSA JWK import/export now preserves multi-prime data, and ECDH secret computation caches validation results to avoid repeated checks. On the policy side, FIPS got stricter `--force-fips` modes plus observable indicator events, permission audit mode stopped blocking fs/addon paths, and permission APIs became more flexible by accepting URLs and raw byte references.

### **Workers, streams, and inspector behavior were cleaned up**
Workers now start from the built-in snapshot, which should improve cold start time, while stream and stream-iter semantics were heavily normalized around writer conversion, draining, EOF handling, and async disposal. The inspector was also hardened to avoid executing JS from V8 interrupt paths, and an uncaught-exception re-entrancy guard now breaks fatal recursion loops instead of hanging.

### **Other misc changes**
- `node:domain` is now a runtime deprecation
- QUIC 0-RTT/session handling was simplified and stop-sending handling was trimmed
- SQLite bindings gained more re-entrancy and buffer-safety checks
- TLS certificate access no longer consumes the peer chain on repeated reads
- `perfetto`, `corepack`, `undici`, `npm`, GoogleTest, and simdjson were updated
- Numerous docs, test deflakes, typings, and build/tooling refreshes
