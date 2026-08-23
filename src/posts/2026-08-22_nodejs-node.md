---
date: 2026-08-22
repo: nodejs/node
size: L
title: "Crypto, URL, and fs get faster and safer"
excerpt: "Major crypto API expansion, URLSearchParams speedups, fs and net fixes, plus several security and performance hardenings."
commits: 22
authors: [panva, anonrig, skdas20, mag123c, shulaoda, MarshallOfSound, Nashit-h, GetThatCookie, luanmuniz, richardlau, codebytere, hyemimi, trivikr, gibson042, HoonDongKang, Han5991, Shivay-98, inukshuk]
commit_authors: {"6586288": Shivay-98, "cc57cb7": anonrig, "3ff8c2d": skdas20, "4b3bba5": anonrig, "7d69ed1": shulaoda, "c01e3b3": MarshallOfSound, "70c189b": Nashit-h, "467c043": GetThatCookie, "82a7102": luanmuniz, "e38eede": codebytere, "f411275": panva, "f4bcf75": hyemimi, "30fe871": panva, "148b6cd": panva, "e573bd6": panva, "bd25af3": trivikr, "a48e33f": gibson042, "1db6cda": HoonDongKang, "34db39b": inukshuk}
---

### **Crypto Cipher/Decipher APIs now support SIV modes** (e573bd6)
Node’s cipher APIs now recognize AES-SIV and AES-GCM-SIV modes, with matching docs, vectors, and coverage. This broadens the supported authenticated-encryption surface for apps that need misuse-resistant modes.

### **URLSearchParams is substantially optimized** (4b3bba5)
Parsing and serialization were reworked to avoid per-character scanning, skip unnecessary string coercions, and cache serialized output until mutation. That should improve hot-path performance for query-heavy workloads and repeated `toString()`/`URL.href` reads.

### **fs.cp preserves directory symlink types with filters** (7d69ed1)
The JS fallback for `fs.cp`/`fs.cpSync` now passes the symlink type through when `verbatimSymlinks: true` is combined with a filter. This fixes a Windows-only mismatch where directory symlinks could be recreated as file symlinks.

### **URL data: MIME detection no longer backtracks super-linearly** (3ff8c2d)
The `data:` URL MIME regex was tightened so malformed inputs without a comma can’t trigger catastrophic backtracking. A benchmark was added to catch regressions as an ops/sec cliff rather than a hang.

### **test_runner dot reporter now prints coverage failures** (2858c2d)
With coverage enabled, the dot reporter now emits diagnostic and coverage information instead of silently returning only a failing exit code. That makes threshold failures explain themselves instead of forcing users to rerun with another reporter.

### **fs promise requests stop allocating stats buffers eagerly** (c01e3b3)
Promise-based fs requests now create their stats/statfs backing arrays only when a stat result is actually produced. This trims per-request memory overhead and avoids paying for data most operations never use.

### **Bootstrap loads fewer modules without a snapshot** (e38eede)
Several builtins that were previously loaded unconditionally during bootstrap are now deferred unless a snapshot is being built. That should reduce startup work for worker threads, embedders, and `--no-node-snapshot` runs.

### **BoringSSL crypto handling is aligned with current APIs** (30fe871, 148b6cd)
The crypto backend now uses BoringSSL’s native validation, negotiated-group, and security-level APIs, while removing obsolete compatibility shims. This also tightens error reporting and preserves support for newer key and mode behaviors on that backend.

### **net socket teardown no longer crashes on undefined `_parent`** (6586288)
`Socket._unrefTimer()` and `_destroy()` now stop walking parent chains on any nullish link, not just strict `null`. That fixes a teardown crash seen when `_parent` ends up `undefined`, including TLS-layered cases.

### **HTTP parser caches `maxHeaderPairs` per header section** (467c043)
The parser now tracks the header-pair limit once per header section instead of recomputing it repeatedly. This is a small but useful parser-side performance cleanup.

### **Odd-length UCS2 transcoding no longer writes out of bounds** (70c189b)
The transcoder was fixed to avoid an out-of-bounds write when handling odd-length UCS2 input. This is a security-relevant memory-safety fix.

### **URL handling got faster and less eager at startup** (e38eede, 4b3bba5)
In addition to the bootstrap changes, URLSearchParams internals were simplified and cached to reduce repeated work. Together these changes should improve both startup behavior and runtime URL parsing cost.

### Other misc changes
- Commit queue failure comment wording improved (f411275)
- `ffi` docs and type naming cleaned up (bd25af3)
- Fix function formatting in `util.inspect` (a48e33f)
- Update docs: WASI version note and broken GYP link (f4bcf75, 1db6cda)
- Test/benchmark additions and updates for Headers, test-only/mock timers, fs/cp, net, and runner behavior (cc57cb7, 82a7102, 280c85e, 34db39b, 467c043, 2858c2d)
