---
date: 2026-04-24
repo: oven-sh/bun
size: L
title: "CI speedups and crash fixes land"
excerpt: "Mac/Windows CI throughput improved, a path URL crash was fixed, and several teardown/GC regressions were patched."
commits: 15
authors: [dylan-conway, robobun, Jarred-Sumner]
commit_authors: {"2883530": Jarred-Sumner, "3429283": dylan-conway, "75b7475": dylan-conway, "64c585b": dylan-conway, "ba8aec1": robobun, "03723c2": robobun, "583cd86": robobun, "def5676": Jarred-Sumner}
---

### **CI throughput improves for macOS and build images**
The macOS test fleet was rebalanced and the launcher script was brought up to date for launchd-based runners, while Buildkite images now bake in dependency and test-docker prefetch caches (75b7475, 64c585b, 3429283, 2883530). This should cut redundant jobs, reduce network fetches, and raise CI throughput materially.

### **Fix Bun.pathToFileURL crash on long relative paths**
`Bun.pathToFileURL()` no longer panics when a relative path expands past the old 4096-byte join buffer; it now falls back to heap allocation for oversized inputs (ba8aec1). The new tests cover both very long paths and long paths with `..` normalization.

### **Windows teardown overflow is fixed**
The Windows event loop now uses saturating active-handle accounting during activate/deactivate and process teardown, preventing the integer overflow seen after spawning hundreds of subprocesses (03723c2). This removes a flaky exit-time crash that only showed up under heavy subprocess churn.

### **Immediate callbacks no longer crash after GC**
`JSRef.downgrade()` now safely no-ops once a ref is already finalized, instead of asserting unreachable during immediate-task cleanup (583cd86). That closes a GC-sensitive crash triggered by `clearImmediate(setImmediate(...))` followed by collection.

### **ASAN no longer breaks MarkedArgumentBuffer stack semantics**
ASAN defaults for Bun were moved into a directly linked Zig object and the `MarkedArgumentBuffer` bridge is explicitly suppressed so its inline storage stays on the real stack (def5676). This fixes an intermittent sanitizer-only crash caused by stack values being collected too early.

### Other misc changes
- Fixed Windows build flags and link/config mismatches.
- Removed a redundant macOS release-13 test split.
- Loosened a Windows socket memory-leak test bound.
- Ported WebKit JSPI wasm stress tests.
- Deleted an unnecessary integration test.
- Bumped the bundled old Bun version used in CI image builds.
