---
date: 2026-10-10
repo: nodejs/node
size: L
title: "Stream iter fixes lead a busy day"
excerpt: "Major stream/iter correctness, fs writer ordering, and FFI/WebAssembly support changes land alongside docs and benchmarks."
commits: 31
authors: [jasnell, RafaelGSS, barakor, inoway46, rozzilla, mcollina, ShogunPanda]
commit_authors: {"04bd737": jasnell, "2a4624c": jasnell, "b5a1463": jasnell, "b8090ca": jasnell, "0e77f91": jasnell, "ee7462a": jasnell, "7c0a517": jasnell, "89ca82d": jasnell, "ec5274b": jasnell, "3169ab0": jasnell, "a39c0fa": jasnell, "d4ec9ff": jasnell, "7614f18": jasnell, "cebc433": jasnell, "6c84c34": jasnell, "29dd655": ShogunPanda}
---

### **stream iter gets major correctness and API fixes** (04bd737, 2a4624c, 0e77f91, ee7462a, 7c0a517, 89ca82d, ec5274b, 3169ab0, a39c0fa, d4ec9ff, b8090ca, b5a1463, 1ca08e? )
Several stream/iter paths were tightened: `pipeToSync()` now has an explicit `failOnIncompleteClose` option, preserves the original error when `writer.fail()` throws, and no longer fails writers just because synchronous close could not complete. The day also fixes `from()`/`fromSync()` normalization and batching behavior, async abort handling in `pull()`, `shareSync()` re-entrancy and backpressure edge cases, and TypeError-vs-Error mismatches for closed writers.

### **Utf8Stream flushes and fs handle semantics were corrected** (6c84c34, 7614f18, cebc433)
`Utf8Stream` flushing was reworked so flushes actually drain buffered data, concurrent flushes are tracked properly, and `flushSync()` now errors instead of corrupting output when async writes are in flight. FileHandle `pull()`/`pullSync()` now lock lazily on first consumption, and `writer()` serializes async writes so overlapping un-awaited writes can no longer race on file offsets.

### **FFI and WebAssembly limitations are now documented and enforced** (29dd655)
Node now throws explicit errors when WebAssembly or executable-memory requirements are unavailable, instead of implying silent fallbacks. The release adds `ERR_WEBASSEMBLY_NOT_SUPPORTED` / `ERR_RX_MEMORY_NOT_SUPPORTED` docs and updates CLI, ESM, FFI, and platform guidance to match.

### Other misc changes
- Benchmark fixes/additions: crypto digest, buffer read/write, `util.parseArgs`, HTTP/2 `getHeaders`.
- `process.finalization` marked release candidate.
- Permission flag propagation fixed for `--allow-fs-vfs`.
- Test rerun handling improved for failing todo subtests.
- Minor docs and test-only stream/fs/quic adjustments.
