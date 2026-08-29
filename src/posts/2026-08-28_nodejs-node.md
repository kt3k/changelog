---
date: 2026-08-28
repo: nodejs/node
size: L
title: "Node lands MAC API, FFI default, and bug fixes"
excerpt: "Major crypto and FFI changes headline the day, alongside SQLite, HTTP, blob, and EventTarget fixes plus an OpenSSL 3.5.8 bump."
commits: 21
authors: [panva, nodejs-github-bot, joyeecheung, TrevorBurnham, GetThatCookie, mertcanaltin, aryansaves, soreavis, mradbourne, zeexzeex, SomSamantray, sxa, bitpshr, targos, araujogui, greenheadHQ, mcollina]
commit_authors: {"2743045": araujogui, "c3035a4": panva, "1d80624": panva, "76aeacf": TrevorBurnham, "a382c1c": GetThatCookie, "2c07eda": aryansaves, "0544741": bitpshr, "9f04fcd": mcollina}
---

### **Crypto gets a generic MAC API** (1d80624)
Node now exposes `crypto.getMacs()` and `crypto.createMac()` on top of OpenSSL EVP_MAC, adding support for incremental and streaming MAC operations with configurable output sizes and provider validation. This is a sizable public API addition that unlocks HMAC/KMAC-style workflows and includes new docs, benchmarks, and broad test coverage.

### **FFI is enabled by default in supported builds** (9f04fcd)
`node:ffi` now loads by default when Node is built with FFI support, while `--experimental-ffi` remains as a compatibility no-op and `--no-experimental-ffi` becomes the opt-out. That’s a meaningful behavioral shift for users relying on FFI, though the module still warns as experimental.

### **HTTP corking now coalesces chunked writes more safely** (a382c1c)
Outgoing chunked writes are now buffered and flushed as a single chunked frame during auto-corking, with better `writableLength` accounting and more careful destroy/uncork handling. This improves correctness around backpressure and destroyed sockets, and also validates encodings earlier for chunked string writes.

### **SQLite sessions are pinned across callbacks and disposal is stricter** (76aeacf, 2743045)
SQLite callback paths now keep attached session objects alive for the duration of V8 callbacks, preventing GC from freeing sessions while SQLite is still walking them. Separately, disposing an in-use session now throws `ERR_INVALID_STATE`, and the docs/tests were updated to reflect the new `Symbol.dispose` behavior.

### **Blob-backed file opens now surface the real stat error** (0544741)
`fs.openAsBlob()` now propagates the underlying libuv error when the target cannot be `stat`'d, instead of collapsing everything into a generic invalid argument failure. That makes missing files report as `ENOENT` with syscall/path details, which is much more actionable for callers.

### **EventTarget weak listeners now handle shared retainers correctly** (2c07eda)
Weak listener retention no longer stores a single listener per retainer key; it now tracks a set so multiple listeners sharing the same `AbortSignal` or retainer don’t evict each other. This fixes a real GC-related bug where only the last listener stayed protected.

### **Miscellaneous notable fixes**
- HTTP stream and writable-state correctness around uncorking/destroying.
- SEA tests migrated to the native builder path for legacy coverage (c3035a4).
- OpenSSL 3.5.8 source/config updates and a CCM test adjustment.
- Several doc clarifications and test-only reliability skips/flake markings.
- A smaller SQLite GC-safety fix for trace callbacks and related tests.
- GitHub Actions cron schedules nudged by 3 minutes.
