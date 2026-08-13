---
date: 2026-08-12
repo: nodejs/node
size: L
title: "Permissions refactor lands alongside new APIs"
excerpt: "Node tightened syntax checking, hardened FFI and ZIP validation, expanded histogram APIs, and heavily refactored permissions."
commits: 21
authors: [jasnell, bitpshr, Renegade334, RafaelGSS, aduh95, greenheadHQ, HoonDongKang, mcollina, trivikr]
commit_authors: {"1b2de5e": bitpshr, "167768f": Renegade334, "3b214e0": RafaelGSS, "dee1fe7": jasnell, "d157b00": jasnell, "55e00cf": jasnell, "14a4f3a": jasnell, "ae2ce9d": jasnell, "adcc6fc": jasnell, "18c2da1": jasnell, "9dc2f0d": jasnell, "79720e9": jasnell, "075d748": aduh95, "bfa3e98": jasnell, "3ad9427": jasnell, "356ee0a": greenheadHQ, "69bf457": HoonDongKang, "00f0f8c": mcollina, "2fbd056": trivikr}
---

**`--check` now detects ambiguous ESM files correctly** (1b2de5e)
Node now treats `.js` files without a nearest `type` as ESM when their source contains module syntax, matching normal load-time behavior. This fixes a false-negative where `--check` could exit 0 on files that are actually invalid.

**FFI fast paths now reject out-of-range pointer BigInts** (2fbd056)
The optimized FFI path now validates pointer-like BigInts against `uintptrMax` before conversion, preventing silent truncation on fast API calls. That keeps optimized and generic argument handling consistent and closes a correctness gap for pointer arguments.

**ZIP parsing now rejects malformed central-directory counts** (00f0f8c)
Node now verifies that the central directory record count actually consumes the declared directory size, instead of trusting the EOCD metadata alone. This hardens ZIP handling against crafted archives that previously could slip through validation.

**Histogram analysis APIs were substantially expanded** (bfa3e98)
`perf_hooks` histograms gained new analytical methods such as CDF/CCDF queries, `countAt()`, KS testing, bucket rebucketing helpers, and kurtosis-related support. The docs and implementation were updated together, making histograms much more useful for performance analysis and regression detection.

**Permissions internals were heavily refactored and optimized** (d157b00)
The permissions subsystem was consolidated around shared boolean permission helpers, with many duplicated permission classes removed and build wiring simplified. Follow-up commits cached permission strings, trimmed storage, tightened diagnostics-channel message creation, and improved fast-path performance and memory use.

### Other misc changes
- ICU 78 patch float for ICU-23262 (167768f)
- Added AI contribution guidelines and linked them from CONTRIBUTING (3b214e0)
- Tweaked permission namespace/include cleanup and diagnostics channel API internals (dee1fe7, 55e00cf, ae2ce9d, adcc6fc, 18c2da1, 9dc2f0d, 79720e9, 14a4f3a)
- Reduced TLSWrap instance size by packing flags (3ad9427)
- Added internal typings for `internalBinding('credentials')` (69bf457)
- Fixed a broken docs link in vfs.md (356ee0a)
- Updated commit-queue tooling/docs (075d748)
