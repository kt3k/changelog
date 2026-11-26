---
date: 2026-11-25
repo: nodejs/node
size: L
title: "SBOM tooling, SQLite hardening, and more"
excerpt: "Major SBOM generation lands alongside SQLite permission fixes, a new process-timeout worker-stacks flag, and several API/bugfix updates."
commits: 25
authors: [mcollina, legendecas, jasnell, LiviaMedeiros, christianaurichzm, BethGriggs, nigrosimone, rozzilla, ychuhai, SergioCalderon101, ADITHYAKUMARREDDY, aduh95, nodejs-github-bot, pimterry, r-Larch, inoway46, gengjiawen, araujogui]
commit_authors: {"f31711c": BethGriggs, "0b41a91": jasnell, "2fd4580": r-Larch, "bf201ef": inoway46, "ffc57f0": gengjiawen, "5440ac1": mcollina, "88c3dbe": mcollina, "36ca6a7": araujogui, "b4e974c": jasnell}
---

### **Add CycloneDX SBOM generation for bundled deps** (f31711c)
Node.js now has a stdlib-only `tools/sbom/generate_sbom.py` plus `make sbom` / `make test-sbom` targets to emit and validate a CycloneDX 1.7 software bill of materials. It reads build config and dependency metadata to report bundled dependency versions, which is a meaningful supply-chain and release-artifact upgrade.

### **Enforce the permission model for SQLite, with VFS path checks** (5440ac1)
Opening `node:sqlite` databases now consults the permission model before touching file-backed databases, and the implementation routes connections through a new VFS shim that checks journal/WAL/temp/attach/backup paths too. This closes a sandbox bypass where `--permission` users could otherwise read or write arbitrary databases.

### **Add `statement.columnCount` to `node:sqlite`** (36ca6a7)
`Statement` now exposes a `columnCount` getter backed by `sqlite3_column_count()`. That gives consumers a direct way to inspect prepared statements’ result-set shape without extra bookkeeping.

### **`--process-timeout` can now print worker stacks** (b4e974c)
A new `--process-timeout-worker-stacks` flag extends timeout diagnostics to include worker-thread activity and event-loop blockers, not just the main thread. This should make hung-process debugging much more useful in multi-worker apps.

### **`http2` compat gains `response.writeProcessing()`** (bf201ef)
`Http2ServerResponse` now matches HTTP/1’s compat surface with `writeProcessing()`, sending a 102 Processing informational response via `writeInformation()`. Code that moves between HTTP/1 and HTTP/2 compat APIs should no longer trip over a missing method.

### **SQLite virtual tables no longer double-close on re-entrant reset** (ffc57f0)
The SQLite binding now guards against re-entrant `sqlite3_reset()` calls that could close a virtual-table cursor twice and crash. This is a correctness and stability fix for generator-backed virtual tables, especially when cleanup code recursively resets the same statement.

### **Linked binding and N-API init errors now propagate correctly** (2fd4580)
`process._linkedBinding()` and N-API module registration now stop before reading or writing `module.exports` if the initializer already threw, preserving the original exception. That fixes cases where linked bindings could silently return an empty exports object instead of surfacing the real error.

### **`node --help` now shows the missing env vars** (0b41a91)
Help output was omitting several documented environment variables, including `NODE_OPTIONS` and OpenSSL-related settings. The fix is small, but it corrects user-facing CLI documentation where discoverability matters.

### **`stream.compose()` now forwards tail errors after finish** (88c3dbe)
An error emitted by the last stream in a composition could escape after `finish` and crash the process as an unhandled `'error'` event. The composed duplex now destroys itself when that tail errors, aligning behavior with pipeline-style expectations.

### Other misc changes
- Migrated internal V8 buffer access off deprecated `ArrayBufferView::Buffer()` across multiple subsystems, with a related benchmark update.
- `data:` URL handling now skips an unnecessary percent-decode copy for plain unescaped payloads.
- `eventNames()` and ESM load-cache internals got small performance/structure tweaks.
- `node:sqlite` also gained a permission-model error path for unsupported builds and a guard for URI filenames.
- Fixed a TLS/OpenSSL compression leak that mainly helps ASAN/leak-detection runs.
- Recognized additional Unicode line terminators in source-map/inspect logic.
- Updated bundled zstd to 1.6.0.
- Adjusted CI/tooling and tests, including Cachix pinning and a `noexec` temp-dir test fix.
