---
date: 2026-09-12
repo: nodejs/node
size: L
title: "Node lands QRDE, crypto parsing, and stream fixes"
excerpt: "Major perf_hooks, crypto, QUIC, and stream changes shipped alongside security-minded fixes and a new experimental bench flag."
commits: 29
authors: [mcollina, jasnell, lazerg, panva, hanityx, everett1992, semx, joyeecheung, sjungwon03, legendecas, aduh95, bmuenzenmeyer, pdaehne, richardscarrott, trivikr, martenrichter, XadillaX, watilde, BridgeAR, christianaurichzm, soulee-dev]
commit_authors: {"1278496": richardscarrott, "666edfd": jasnell, "1c179c9": everett1992, "e03e2f6": mcollina, "6b28d88": semx, "8aee69b": mcollina, "77f95b5": mcollina, "40b1821": mcollina, "6fc8826": bmuenzenmeyer, "3fc994e": pdaehne, "ce20f7a": lazerg, "fe52478": trivikr, "312c562": martenrichter, "89b32cf": XadillaX, "0fbc7d3": watilde, "cba0833": BridgeAR, "ef2be18": lazerg, "565f69f": soulee-dev}
---

### **perf_hooks: add QRDE analysis to Histogram** (666edfd)
Node now exposes `histogram.qrde()` for quantile-respectful density estimates, with support for custom probability boundaries, dequantization modes, and optional snapshot caching. The implementation is backed by native code and documented with new benchmarks and oracle tests, making tail-latency analysis much more practical without retaining raw samples.

### **crypto: add `crypto.parsePKCS12()`** (6fc8826)
A new public API can extract the private key, end-entity certificate, and other certificates from PKCS#12 bundles into JavaScript objects. This removes the need for shelling out to OpenSSL or adding userland parsers when applications need to inspect `.p12/.pfx` contents directly.

### **quic: add a promise for pending streams** (312c562)
`QuicStream` gains an `opened` promise that resolves once a stream becomes available or rejects if the pending stream closes first. This gives callers a direct way to await flow-control-limited streams instead of polling.

### **stream/web: fix parked write handling and faster state objects** (8aee69b, 77f95b5)
Web Streams got a behavioral fix for parked transform writes, avoiding an extra promise allocation and wiring completions directly to the writable controller's reactions. Separately, the internal state records were converted to fast-mode classes, which should reduce allocation and property-access overhead on hot paths.

### **stream, fs, net, assert: fix correctness bugs in core APIs** (1c179c9, 3fc994e, 1278496, e03e2f6, 6b28d88)
Several user-facing bugs were fixed: async iteration now handles `undefined` chunks safely, `FileHandle.readableWebStream()` works with BYOB views that have a byte offset, and cancelling `Readable.toWeb()` no longer races into `ERR_INVALID_STATE`. `net.Server.listen()` now throws on repeated listen attempts more reliably, and deep equality no longer crashes on `null`/primitive Map or Set entries.

### **security: harden histogram import and VFS rename checks** (40b1821, fe52478)
Histogram import now rejects malformed normalization offsets that could lead to out-of-bounds native writes, closing a serious memory-safety issue. The experimental VFS rename path also now resolves symlinks before descendant checks so directories cannot be moved into their own subtree through symlink tricks.

### **tls, spawn, dgram, urlpattern, ffi: assorted API fixes** (ef2be18, ce20f7a, cba0833, 89b32cf, 565f69f, 0fbc7d3)
TLS now loads every CRL in a PEM bundle instead of stopping at the first one, and failed spawns no longer risk killing the caller's own process group. Dgram now skips custom lookup for literal IPs, URLPattern gets a proper `Symbol.toStringTag`, FFI corrects its error typing, and `cpSync()` now matches async `cp()` when `errorOnExist` hits an existing directory.

### Other misc changes
- `node:bench` hidden behind `--experimental-bench`.
- OpenSSL 4.1 compatibility updates for docs/tests.
- Test fixes, flakes, and small docs/meta edits.
- Nix lint/build workflow tweaks and test optimizations.
