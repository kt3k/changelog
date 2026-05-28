---
date: 2026-05-17
repo: denoland/deno
size: L
title: "Node compat gets TLS, V8, and HTTP upgrades"
excerpt: "Major Node polyfills landed for compile cache, GC profiling, startupSnapshot, TLS/socket behavior, and async_hooks-compatible HTTP server handling."
commits: 31
authors: [divybot, bartlomieju, littledivy, fibibot, lunadogbot]
commit_authors: {"2270082": littledivy, "bcd6e4f": bartlomieju, "cee2067": bartlomieju, "88dbd89": bartlomieju, "6dca921": divybot, "dc3a0e5": littledivy, "d9cec98": divybot, "105a9b0": divybot, "d71f9a7": littledivy, "01e228d": divybot, "04cbd8c": divybot, "898ed17": divybot, "19e63a0": divybot, "a7fb5ef": divybot, "07eb330": divybot, "41523bf": bartlomieju, "ff55026": bartlomieju, "917b232": fibibot, "8ea25a3": bartlomieju, "2668e09": bartlomieju, "c2b5033": fibibot, "57d43c5": lunadogbot, "98ce50c": fibibot, "9346ea7": bartlomieju, "a38a98b": bartlomieju, "c41feee": divybot, "f828b5b": divybot, "a9bc206": divybot, "eb042fb": divybot, "ffd7a57": divybot, "565302b": divybot}
---

### **Node compatibility broadens across core APIs**
The day’s biggest work adds or fixes several high-value Node surfaces: `module.enableCompileCache()` and related compile-cache plumbing (04cbd8c), `v8.GCProfiler` (c41feee), `v8.startupSnapshot` (a7fb5ef), `v8.queryObjects()` / `util.queryObjects()` (ffd7a57), `process._debugEnd()` / `_debugProcess()` (105a9b0), and `Module._stat` (565302b). These fill in real Node API gaps that previously caused load-time or runtime failures in compat tests and user code.

### **Networking and TLS behavior move much closer to Node**
Several fixes tighten socket, HTTP, and TLS semantics: `executionAsyncResource()` now works per-request in HTTP server flows (07eb330), `shouldUpgradeCallback` is supported (a38a98b), TLS wrapping preserves raw socket connect timing (8ea25a3), TLS peer cert chains are completed (2668e09), session resumption is isolated across strict vs. insecure clients (9346ea7), and `useUserBuffer()` is implemented for TCP/Pipe/TLS reads (f828b5b). Together these close a cluster of hard-to-debug compat bugs around connection lifecycle, upgrade handling, and encrypted socket I/O.

### **Compat fixes unblock inspector, VM, async hooks, and eval behavior**
Inspector eval scripts now report as `[eval]` instead of synthetic file URLs (01e228d), `vm.createContext` no longer panics during teardown (d9cec98), and `util.aborted()` now weakly tracks resources so long-lived abort signals don’t retain dead objects (57d43c5). The repo also gained `process._debugEnd()`/`_debugProcess()` support and `internal/net` exposure to satisfy Node internals and test expectations.

### **Other misc changes**
- Enabled a large batch of passing Node compat tests; many more were added, while a few flaky or unsupported cases were ignored (2270082).
- Ignored async-loader, ShadowRealm, internal `JSStream`, and several architecture-specific failing Node compat tests (cee2067, 6dca921, dc3a0e5, d71f9a7, 19e63a0, a9bc206).
- Added regression coverage for active handles on `exit`, `vm` teardown, `v8`, `util.aborted`, task arg escaping, inspector eval URLs, and TLS/http behavior (898ed17, a7fb5ef, 57d43c5, 98ce50c, 01e228d, 41523bf, ff55026, 2668e09).
- Minor Node compat config and test-suite toggles, plus a few small compatibility tweaks and bug fixes (bcd6e4f, 88dbd89, 917b232, c2b5033, eb042fb, 4 remaining low-impact commits).
