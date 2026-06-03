---
date: 2026-06-02
repo: nodejs/node
size: L
title: "Perf wins, one crash fix, and build refactor"
excerpt: "Node.js sped up coverage reporting, fixed a zlib crash edge case, tightened Navigator brand checks, and refactored libnode/snapshot build logic."
commits: 18
authors: [nodejs-github-bot, Han5991, zeeshan56656, tniessen, mcollina, bobu-putheeckal, joyeecheung, legendecas, alphaleadership, ndossche, RafaelGSS, 3zrv, addaleax, MayaLekova]
commit_authors: {"a0423e2": tniessen, "3d35dd8": legendecas, "458c37b": ndossche, "75b16f1": Han5991, "29aad20": Han5991, "ba7e6b3": 3zrv}
---

### **Coverage reporting gets much faster** (75b16f1, 29aad20)
The test runner now compiles coverage include/exclude globs once per `TestCoverage` instance and caches per-URL skip decisions. That removes repeated glob parsing and duplicate work across workers, which should noticeably cut coverage report time on large runs.

### **zlib avoids a crash on failed deflate init** (458c37b)
`src/node_zlib.cc` now initializes `strm_.msg` after a `deflateInit2()` failure path that can leave it uninitialized when zlib versions or stream layouts mismatch. This prevents `CompressionError` creation from dereferencing stale memory and crashing Node.

### **`Navigator#language` now brand-checks like other getters** (ba7e6b3)
The `language` getter was updated to throw on invalid receivers instead of silently working on plain objects or `Navigator.prototype`. The added test coverage locks in consistent TypeError behavior across all `Navigator` prototype getters.

### **Build logic now supports snapshot/codecache with libnode** (3d35dd8)
The build system was refactored so `node_use_node_snapshot` and `node_use_node_code_cache` no longer depend on `--shared`, and the old `--node-snapshot-main`/`--shared` incompatibility was removed. The change also reorganizes `node.gyp` around `node_base`, which is a significant build-graph cleanup that broadens supported configurations.

### **X509 subject matching logic was deduplicated** (a0423e2)
Certificate host/email/IP matching now shares a common helper, reducing duplicated control flow in `crypto_x509.cc`. This is mostly an internal refactor, but it trims maintenance overhead in a security-sensitive area.

### Other misc changes
- Doc clarifications and history updates for TTY, `worker_threads`, and `blockList`.
- Dependency bumps: amaro, googletest, and nixpkgs.
- Internal cleanup in FFI, external reference registration, and test fixtures/warnings.
