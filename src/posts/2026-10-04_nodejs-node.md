---
date: 2026-10-04
repo: nodejs/node
size: L
title: "V8 15.2 lands with ABI, build, and API cleanup"
excerpt: "Major V8 uplift plus Node API migrations, build fixes, and one security-relevant FFI validation hardening."
commits: 49
authors: [joyeecheung, targos, StefanStojanovic, IlyasShabi, panva, avivkeller, srl295, eliau2005, codebytere, aduh95, sravani1510, o-, miladfarca, legendecas, abmusse, ShogunPanda, trivikr, Cayan]
commit_authors: {"1407687": StefanStojanovic, "8408753": srl295, "a730f3b": joyeecheung, "1eead12": joyeecheung, "ea86967": StefanStojanovic, "39d3b1d": codebytere, "5d221d9": joyeecheung, "6faa334": IlyasShabi, "daf03c0": IlyasShabi, "9e274db": aduh95, "f296744": o-, "33e5031": joyeecheung, "c419eac": miladfarca, "677424c": joyeecheung, "9b4d157": targos, "6cf05e7": joyeecheung, "b356886": joyeecheung, "536cedd": joyeecheung, "27be1e0": targos, "da93e7e": targos, "45287a9": targos, "268bd64": joyeecheung, "430abdf": targos, "109aaa7": abmusse, "38b9b32": StefanStojanovic, "ee7590d": joyeecheung, "0b7a5c9": targos, "aa1d7b5": joyeecheung, "c148a7f": joyeecheung, "888c6fd": joyeecheung, "07fa728": joyeecheung, "773bdd1": panva, "f4d2742": panva, "04904eb": trivikr}
---

### **V8 upgraded to 15.2.124.38, with ABI and embedder updates**
Node now tracks V8 15.2.124.38 and bumps `NODE_MODULE_VERSION` to 151, which is the key ABI signal for native addons. The embedder string was reset as part of the major V8 refresh, and the vendored Rust crates were updated to match the new V8/temporal stack. (07fa728, aa1d7b5, c148a7f, 888c6fd)

### **FFI now validates ArrayBuffer inputs by brand, not tag**
`ffi.exportArrayBuffer()` now uses a real `isArrayBuffer()` check instead of trusting `Symbol.toStringTag`, so spoofed objects are rejected and genuine ArrayBuffers with custom tags still work. That closes a misleading validation hole and makes the native path fail earlier and more correctly. (04904eb)

### **Node internals migrated off deprecated V8 callback/prototype APIs**
A broad internal refactor replaces deprecated `*V2` and `PropertyCallbackInfo<void>` usages with current V8 APIs across contextify, env vars, module wrap, buffers, and related embedder hooks. This is mostly compatibility work, but it reduces churn from future V8 removals and aligns Node with the new public API surface. (da93e7e, 45287a9, 6cf05e7)

### **Build and platform fixes unblock the V8 update on Windows, AIX, Solaris, and illumos**
Several targeted fixes adjust the build for Windows command-line limits, MSVC constexpr limits, ICU static data handling, and V8 header/layout changes. There are also platform-specific V8 backports for AIX stack handling and decommit races, Solaris and musl stack-limit behavior, illumos `madvise()` compatibility, and compiler-specific SIMD/torque fixes. (1eead12, ea86967, b356886, 109aaa7, 6faa334, daf03c0, 677424c, a4c8687, 904ceda, 5d221d9, 268bd64, 33e5031, 38b9b32, 1407687, 0b7a5c9, 430abdf, ee7590d, 8408753, 9e274db, f296744, 39d3b1d)

### **Web Crypto warnings trimmed, and a few tests were adjusted for new V8 behavior**
Node removes some `ExperimentalWarning`s from Web Crypto paths that are effectively on the browser unflagging path, and updates multiple tests/fixtures to match the new V8 snapshot, serialization format, wasm JSAPI expectations, and shared-value-conveyor behavior. (773bdd1, a730f3b, 536cedd, 27be1e0, 9b4d157, c419eac, f4d2742)

### Other misc changes
- Removed `--jitless` and `--lite` modes; docs, CLI behavior, and tests were updated accordingly.
- Several V8 gypfile refreshes and build-system housekeeping changes.
- Misc test/doc tweaks, including `cluster.md` return types and a perfetto scraper fix.
- Dependency / crate / tooling bumps and vendored updates.
