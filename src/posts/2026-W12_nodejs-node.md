---
date: 2026-03-22
repo: nodejs/node
period: weekly
slug: 2026-W12
period_label: "Mar 16–22, 2026"
size: L
title: "Node sharpens Web APIs, test runner, and platform support"
excerpt: "WebCrypto and crypto deprecations landed alongside test runner fixes, ESM/stream bug fixes, and ICU/SQLite/undici updates."
commits: 39
---

### **WebCrypto and crypto APIs move closer to spec**
Node tightened several WebCrypto and crypto-adjacent surfaces this week. WebCrypto parameter objects now use `outputLength` for cSHAKE/KMAC, `SubtleCrypto.supports` became enumerable, and `QuotaExceededError` is now exposed as a real `DOMException`-derived class. In `node:crypto`, passing `CryptoKey` objects is now deprecated in more places, and `KeyObject.from()` with a non-extractable `CryptoKey` is also warned.

### **Test runner reliability improves**
The test runner got two important fixes: suite-definition errors now fail the run instead of exiting successfully, and timeout cleanup no longer relies on `timer[SymbolDispose]()` so fake timers and other shimmed implementations work correctly. These changes close a couple of long-standing edge cases where broken tests could be reported too optimistically or timeouts could misbehave under test doubles.

### **Module resolution, streams, and diagnostics fixes**
ESM resolution now correctly handles trailing slashes during path finalization, avoiding a path-normalization bug. `stream.pipeline()` now preserves the original error instead of letting a later `AbortError` mask it, and `diagnostics_channel`’s `tracePromise()` warns on non-thenables instead of silently wrapping them. Coverage handling for mocked CJS modules imported from ESM was also fixed so search params survive compilation.

### **Native dependency and platform bumps**
Node refreshed several bundled dependencies: SQLite moved to 3.51.3, ICU to 78.3, and undici to 7.24.4, with a fetch URL-path fix included in the undici update. The week also raised the minimum Power target on AIX and IBM i to Power 9, and updated the build tooling for V8 depot_tools Python 3.12 compatibility.

### Other misc changes
- `util.styleText()` now accepts color aliases like `grey` again.
- `Buffer.indexOf()`’s Latin1 path now uses stack allocation for the needle buffer.
- CLI `--eval` docs were clarified for leading hyphens and negative-number edge cases.
- Several docs, CI, and metadata updates landed, including npm/doc refreshes and small typo fixes.
