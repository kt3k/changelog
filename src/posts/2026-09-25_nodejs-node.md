---
date: 2026-09-25
repo: nodejs/node
size: L
title: "Major crypto, perf, and VFS updates"
excerpt: "Web Crypto got a large correctness overhaul, perf_hooks gained new histogram APIs, and Node now exposes a readable VFS root."
commits: 63
authors: [panva, jasnell, anonrig, christianaurichzm, agape1225, Renegade334, mcollina, XadillaX, HoonDongKang, DevJunz, trivikr, soulee-dev, aguashui, tlhunter, hanityx, styfle, RomainLanz, Dansatch, xia-chao, pipobscure, inoway46]
commit_authors: {"9827749": styfle, "9c06dab": mcollina, "4bd56b3": anonrig, "823d229": jasnell, "a2dedcc": jasnell, "bc6e1ad": anonrig, "0a36bce": anonrig, "402889c": xia-chao, "38187f8": panva, "a18fd89": pipobscure, "f205177": inoway46, "b9e257f": jasnell, "5af276e": jasnell, "f916641": jasnell}
---

### **Web Crypto gets a major correctness and hardening pass** (38187f8)
Node’s Web Crypto implementation was significantly reworked to use backend cSHAKE/KMAC support, tighten parameter validation, and align error handling and prototypes with the spec. This also adds a batch of correctness fixes around key usage, JWK import/export, AES/KW/AES-GCM edge cases, random value bounds, and species/prototype defenses.

### **`perf_hooks` adds new histogram snapshot/export capabilities** (b9e257f)
Histograms can now be snapshotted into independent, read-only copies, which makes it possible to capture a stable view of live metrics without resetting them. The change also sets up the native copy path and documents the new API for event-loop delay and other recording use cases.

### **Histogram import/export is hardened and versioned** (5af276e, f916641)
Histogram CBOR export moves to format version 2, with import now explicitly tolerating unknown keys in v2 while rejecting malformed or inconsistent payloads. Import validation is much stricter overall, catching duplicate keys, invalid types, out-of-range values, and bad totals instead of silently accepting broken data.

### **`perf_hooks` can now record zero values** (a2dedcc)
Recordable histograms now accept `0` in `record()`, `recordDelta()`, and sliding-window recording. That fixes a real API limitation and matches the documented range for these metrics.

### **Node gains a built-in process timeout flag** (823d229)
A new `--process-timeout=N` option will terminate a process after the specified duration and print diagnostic context about what was running and what kept the event loop alive. A companion `--report-on-process-timeout` flag can emit a report, making hangs far easier to debug in CI and production.

### **VFS exposes and serves its reserved root directory** (a18fd89)
The virtual filesystem now has a public `vfs.vfsBase()` accessor and a readable reserved root that lists mounted VFS instances. That makes mounts discoverable through `fs`, while preserving the restriction that the root itself is read-only and cannot be renamed or removed.

### **HTTP parser and server hot paths get faster** (9c06dab, 4bd56b3)
Node removes a per-request `maxHeaderPairs` lookup from the HTTP parser path and avoids repeated `toLowerCase()` work on common server-side header checks. These changes reduce parser overhead and trim allocations on a very hot part of the runtime.

### **Net, TLS, buffer, and zlib behavior fixes land** (bc6e1ad, 0a36bce, 9827749, f205177, 402889c)
Several user-facing bugs were fixed: blocklist string checks got faster, IPv6 detection skips obvious non-IPv6 inputs, TLS now preserves session/SNI setup when custom lookup aborts, UTF-16LE `indexOf()` no longer matches before the requested range, and Zstd reset now refuses to silently corrupt incomplete frames.

### **Other misc changes**
- FFI validation and memory-handling fixes; lazy string-storage allocation; signature/type strictness
- SQLite virtual-table cleanup now runs generator `return()` on refilter
- `util.isPartialDeepStrictEqual()` is now exposed
- `--process-timeout`/`perf_hooks`/crypto docs updated
- Bench and test harness fixes, dependency/workflow tweaks, typo/comment cleanup, and crypto test reductions
- Misc performance and internal refactors across URL, messaging, blocklist, and benchmark code
