---
date: 2026-06-26
repo: oven-sh/bun
size: L
title: "A security-heavy day of fixes across Bun"
excerpt: "Major fixes landed for FFI NaN-boxing, Fetch/HTTP backpressure, Node compatibility, and several crash/UAF bugs."
commits: 57
authors: [robobun, Jarred-Sumner, cirospaciari, sosukesuzuki]
commit_authors: {"8268889": robobun, "e384998": robobun, "983ec49": robobun, "8c87871": robobun, "be99161": robobun, "c21f08c": robobun, "c464f01": robobun, "642b9f6": robobun, "179978a": robobun, "0fe7567": robobun, "4ecbdf2": robobun, "3f464e8": robobun, "b99024a": robobun, "d75b273": robobun, "67ef311": cirospaciari, "944345f": robobun, "fad2b2d": robobun, "b4e9605": robobun, "031f73c": robobun, "0621a0a": robobun, "aaba8f0": robobun, "0589548": robobun, "863379d": Jarred-Sumner, "44c0cc4": robobun, "ff2781d": robobun, "f58fd03": robobun, "7fa26a7": robobun, "9fed8df": robobun, "ba04159": robobun, "2b1d61d": robobun, "81dfd59": robobun, "9bf3934": robobun, "4e159fb": robobun, "3656e58": robobun, "3a9f554": robobun, "5889bca": robobun, "d235bc5": robobun}
---

### **FFI/NAPI: sanitize NaNs before NaN-boxing native doubles** (179978a)
Bun now canonicalizes NaN payloads coming from native code before boxing them into JS values, closing a type-confusion/arbitrary-read risk in `bun:ffi`, N-API, and raw memory readers. This is a security fix: impure NaNs could previously decode as forged immediates or cell pointers.

### **HTTP/fetch: couple response backpressure to JS consumption** (81dfd59)
The fetch transport now pauses after delivering the first chunk until JS actually reads again, instead of buffering an entire body eagerly. That reduces memory growth and fixes backpressure behavior across h1/h2/h3.

### **Node compatibility sweep for `node:buffer`, `path`, `cluster`, `crypto`, `zlib`, `net`, and more** (e384998, c464f01, c21f08c, 0621a0a, aaba8f0, 0589548)
Several public Node APIs were brought closer to Node’s behavior, including `Buffer.byteLength`, path normalization, cluster worker disconnect handling, `setAAD()` on non-AEAD ciphers, zlib handle lifecycle checks, and reconnecting live sockets. These are mostly correctness fixes, but they affect widely used APIs.

### **Structured clone and AbortSignal GC bugs fixed** (983ec49, be99161, 4ecbdf2, b4e9605)
Bun fixed back-reference corruption in `structuredClone` and several GC/reachability issues around `AbortSignal` and abort reasons. These bugs could produce wrong object identity, lost listeners, or debug/ASAN crashes under collector pressure.

### **Crash/UAF fixes in HTTP, spawn stdout, shell, TLS, and fetch finalizers** (642b9f6, 3f464e8, d75b273, 67ef311, f58fd03, 863379d, 2b1d61d)
Multiple race and lifetime bugs were addressed across the networking stack, including a Bun.serve crash, subprocess stdout lifetime pinning, shell pipe-read use-after-free, TLS truncation on destroy-after-write, proxy tunnel pooling after fatal TLS errors, and fetch finalizer GC safety. These are reliability fixes with real crash potential.

### **SQL/Postgres protocol parsing and query scheduling fixes** (0fe7567, 031f73c)
The Postgres client now rejects malformed message lengths instead of panicking or silently accepting them, and it no longer sends a redundant `Sync` after simple queries. Together these fix a protocol crash surface and a query ordering bug that could mix results or hang requests.

### **Parser, transpiler, YAML/Markdown, glob, and performance fixes** (b99024a, 944345f, 8268889, ba04159, ff2781d, 9fed8df, 8c87871, 3656e58, 3a9f554, 5889bca, d235bc5, 7fa26a7, 4e159fb, 9bf3934, fad2b2d, 44c0cc4)
Bun fixed several panic-on-input edge cases, a quadratic scan in `Bun.indexOfLine`, and a handful of printer/parser correctness issues around decorators, enums, path handling, and YAML escaping. These are mostly robustness and performance improvements, but they remove a lot of fuzzer-found failure modes.

### Other misc changes
- Install-path collision hardening for scoped registries and folder resolution.
- Windows symlink error handling for unmapped Win32 codes.
- Crash handler now re-raises the original signal instead of always ending in SIGILL.
- `verify-baseline` allowlist update for a false positive.
- Test fixes/deflakes and merge-only housekeeping.
