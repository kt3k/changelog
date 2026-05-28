---
date: 2026-05-23
repo: nodejs/node
size: L
title: "Major crypto, streams, and new VFS work"
excerpt: "A big day for Node.js: experimental node:vfs lands, WebCrypto gets hardened and refactored, and stream/iter fixes improve correctness."
commits: 10
---

### **node:vfs lands as a new experimental builtin** (c9562dd)
Node.js adds a minimal `node:vfs` subsystem with an in-memory virtual file system and provider classes, plus a new `--experimental-vfs` flag. This is a substantial new API surface aimed at tests, fixtures, embedded assets, and other self-contained filesystem use cases.

### **WebCrypto is refactored into native job flows and hardened against prototype pollution** (e24e698, b8fc182, 0cabd66, dfe2d47)
WebCrypto methods were reworked to remove `async` wrappers, route synchronous validation through a shared promise helper, and move more of the work into native `CryptoJob` paths. The changes also reduce secret material copies for KDFs, pass `CryptoKey` handles directly into native jobs, and add protections against prototype pollution and species/thenable trickery when resolving WebCrypto promises.

### **Streams/iter fixes tighten cancellation, backpressure, and flush behavior** (8d3245e, a7d5446, 837910d)
The stream iterator adapters now better handle backpressure without duplicating writes, preserve abort reasons for `share`/`broadcast`, and ensure fused stateless transforms receive their final flush correctly. These fixes target observable correctness issues in the experimental stream iterator APIs.

### **Test runner coverage can now start after bootstrap** (c9dbb86)
The test runner now exposes a new internal profiler entrypoint to start V8 precise coverage after bootstrap, which helps coverage work in isolation-aware setups. This also avoids crashing the parent process in `--test --test-isolation=process` scenarios where workers own coverage collection.

### Other misc changes
- Docs cleanup for `modules.md` spacing (985b608)
- Small test/doc updates around the new coverage and stream behavior
