---
date: 2026-11-02
repo: nodejs/node
size: L
title: "QUIC, streams, and module loading speed up"
excerpt: "QUIC retains buffered reads, writable streams fix close-window writes, and ESM/module resolution avoids extra parsing."
commits: 17
authors: [antonioduran, mcollina, MikeMcC399, leah-1ee, trivikr, gegham1, inoway46, SergioCalderon101, JPeer264, EmmanuelFlorencioT, 11rls11, rraulg5, gurgunday, GiHoon1123]
commit_authors: {"1206541": mcollina, "1389475": GiHoon1123, "76e8b64": trivikr, "45df6b7": gurgunday, "70e1db3": mcollina}
---

### **QUIC keeps buffered data readable after destroy** (1389475)
Destroyed QUIC streams now preserve already-buffered incoming data for iteration instead of dropping it, while still surfacing truncation or errors afterward. The implementation keeps a reader alive earlier and updates the docs/tests to cover peer data arriving before the consumer starts reading.

### **WritableStream writes are rejected cleanly during close** (70e1db3)
Writes issued while a `WritableStream` close/flush is still in flight now fail with a `TypeError` instead of tripping an internal assertion. This tightens Web Streams behavior for both plain writable streams and `TransformStream` flushes.

### **Node stream adapters preserve async context for writes** (1206541)
`Writable.fromWeb()` and `Duplex.fromWeb()` now dispatch queued writes in the async context of the originating Node.js write, even when the underlying Web stream starts later. This fixes context leakage across writes and finalization, and adds regression coverage for async-context preservation.

### **ESM format detection avoids reparsing package.json** (45df6b7)
Module format detection now uses `getPackageType()` instead of repeatedly spreading full package config objects, avoiding lazy `exports`/`imports` getter re-evaluation on every module load. That reduces unnecessary parsing and memory growth for packages with large `package.json` maps.

### **VFS real-provider watchFile forwards the listener** (76e8b64)
`RealFSProvider.watchFile()` now passes the caller’s listener through to `fs.watchFile()` instead of registering a no-op stub. This fixes `fs.watchFile()` callbacks on real-directory mounts and lets `unwatchFile()` remove the watcher by identity.

### Other misc changes
- Internal typings/type-resolution fixes for builtin module loading and `internalBinding` declarations
- Test-only cleanup and flake fixes across cluster, net, buffer, async-hooks, zlib, and require-resolve suites
- Docs updates for deprecations, dependencies, and QUIC API references
- CI workflow dependency bump for `cachix/install-nix-action`
