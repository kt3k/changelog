---
date: 2026-10-15
repo: nodejs/node
size: L
title: "Node ships V8 15.6 and VFS goes default"
excerpt: "Major V8 uplift, VFS unflagged, stream/iter gets a performance sweep, plus crypto fixes and API cleanup."
commits: 29
authors: [joyeecheung, jasnell, aduh95, targos, panva, gengjiawen, mcollina, lazerg, bjohansebas]
commit_authors: {"1c90519": aduh95, "2d87c56": joyeecheung, "2589e42": joyeecheung, "0e2f479": joyeecheung, "c1e280b": joyeecheung, "66f9d2e": joyeecheung, "fc2b3fb": joyeecheung, "5fb4242": joyeecheung, "cb94692": targos, "d9264eb": joyeecheung, "415fe6e": joyeecheung, "826df07": joyeecheung, "153ec89": jasnell, "818f348": jasnell, "17e7b68": jasnell, "a7c156f": jasnell, "13d0167": jasnell, "e6c9c8e": jasnell, "724190c": jasnell, "778306c": jasnell, "5bcade9": jasnell, "82563d8": jasnell, "df214ab": aduh95, "a5af644": panva, "38aa1f3": gengjiawen, "49ad950": mcollina, "f0f8115": lazerg, "12ce819": bjohansebas}
---

### **VFS is now enabled by default** (49ad950)
`node:vfs` is unflagged, and the old `--experimental-vfs` switch is replaced by `--no-experimental-vfs` for disabling it. The CLI and docs were updated accordingly, and workers now use `--vfs-load` without needing the experimental flag.

### **Node updates its embedded V8 to 15.6.75.13** (826df07)
This pulls in a large V8 roll with build-system and platform updates across the embedded engine. It also pairs with ABI bookkeeping in Node so native addons can track the new engine version.

### **Native addon ABI version bumped for V8 15.6** (d9264eb)
`NODE_MODULE_VERSION` was updated to 153 to reflect the new V8 line. That’s the compatibility signal addon authors use to know they need a rebuild for this runtime.

### **Crypto.randomInt() no longer reuses stale cache bytes** (38aa1f3)
Async cache refills now write into a separate buffer and copy back only after the refill completes, preventing synchronous `randomInt()` calls from consuming bytes that a pending async refill will later hand out again. The fix closes both a correctness bug and a potential race on the shared cache.

### **X509 curve lookup now handles non-NIST curves safely** (f0f8115)
`GetCurveName()` now treats the OpenSSL curve-name lookup as nullable instead of assuming an empty string on failure, avoiding a crash for certificates on curves like brainpoolP256r1. A regression test covers the non-NIST case.

### **stream/iter gets a broad performance and correctness pass** (153ec89, 818f348, 17e7b68, a7c156f, 13d0167, e6c9c8e, 724190c, 778306c, 5bcade9, 82563d8)
A cluster of changes reduces per-chunk allocations and keeps long-lived stream/iter objects in fast-property mode, which should improve throughput in iterator-heavy pipelines. It also fixes a `fromWritable()` drain race and makes `pipeToSync()` correctly accept writers without `endSync()`.

### **_http_* internals are deprecated in favor of public http APIs** (12ce819)
The legacy internal HTTP modules are now runtime-deprecated, and benchmarks were switched to public or exposed-internal entry points. The implementation also consolidates HTTP internals under `lib/internal/http/*`, moving a large amount of code behind the new deprecation boundary.

### Other misc changes
- V8 cherry-picks for build and portability fixes on GCC 16, MSVC STL, and illumos (1c90519, 2d87c56, 2589e42, 0e2f479, c1e280b, 66f9d2e, fc2b3fb, 5fb4242)
- Patch V8 to avoid a duplicated zlib symbol (cb94692)
- OpenSSL workflow/docs updates for selected-branch releases (a5af644)
- gtest integration fix in build tooling (df214ab)
- Rust crate lockfile/vendor refresh for the V8 roll (415fe6e)
