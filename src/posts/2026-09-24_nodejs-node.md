---
date: 2026-09-24
repo: nodejs/node
size: L
title: "Temporal, streams, and QUIC get major fixes"
excerpt: "Node.js lands Temporal/system-ICU enablement, a large stream/iter overhaul, QUIC writer fixes, and an FFI null-pointer bug fix."
commits: 20
authors: [jasnell, aduh95, srl295, npm-cli-bot, sxa, legendecas, RafaelGSS, codebytere, panva, christianaurichzm]
commit_authors: {"2964712": jasnell, "9800c29": aduh95, "847da07": jasnell, "bf4bd44": jasnell, "fc78459": jasnell, "fe1a203": jasnell, "8fc9838": jasnell, "04f1b72": jasnell, "0d4a844": jasnell, "f950eb8": jasnell, "4eb3908": npm-cli-bot, "bcf5850": sxa, "e7d8ab5": legendecas, "6825d88": RafaelGSS, "72bb834": codebytere, "bd111f3": panva, "964e668": aduh95, "24b9ca9": christianaurichzm, "bba3422": srl295, "c4c1163": srl295}
---

### **Temporal can now build with system ICU** (bba3422, c4c1163, 9800c29)
Node now enables V8 Temporal support even when using a shared/system ICU, removing the earlier build-time disablement and wiring in the new `v8_enable_temporal_systemicu` flag. This unblocks Temporal for more build configurations and avoids depending on ICU internal headers.

### **stream/iter gets a major behavior and API polish pass** (04f1b72, 8fc9838, fe1a203, 0d4a844, 847da07, bf4bd44, fc78459, 2964712)
The classic stream/iter adapters were refactored to fix backpressure, cancellation, wakeup, and writable lifecycle edge cases, with matching documentation updates. The changes tighten semantics for `fromReadable()`, `fromWritable()`, and `toWritable()`, and the expanded tests cover previously shaky interop paths.

### **QUIC writer backpressure and abort handling are corrected** (fe1a203)
QUIC stream writers now track a single pending write, enforce strict backpressure more accurately, and support abort-aware waiting for drain. That makes write ordering and rejection behavior more predictable under load.

### **FFI now avoids undefined behavior on zero-length null-pointer copies** (24b9ca9)
The FFI helpers skip `memcpy()` when the length is zero, which fixes UB when callers pass a null pointer with an empty transfer. A new test locks in the safe zero-length behavior across buffer and array buffer paths.

### Other misc changes
- `process.ref()` / `process.unref()` graduated from experimental (f950eb8)
- Trace events tests were reworked for perfetto support (e7d8ab5)
- CI label/workflow and collaborator-guide updates for resume-ci handling (bd111f3, 6825d88)
- Alpine docs updated to tier 2 / minimum 3.21 (bcf5850)
- `test-fs-rm` now accepts libc++’s `ENOTEMPTY` on POSIX (72bb834)
- Minor doc cleanup for `util.markPromiseAsHandled` (964e668)
- npm was bumped to 12.1.0 with doc refreshes (4eb3908)
- Build/GYP plumbing updated for Temporal/V8 feature flags (9800c29)
