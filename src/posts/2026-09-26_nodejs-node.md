---
date: 2026-09-26
repo: nodejs/node
size: L
title: "Permissions, streams, zlib, and sqlite get major work"
excerpt: "Node adds env permissions, speeds up streams/querystring, and lands notable fixes across zlib, worker, fs, HTTP, and sqlite."
commits: 33
authors: [lazerg, jasnell, anonrig, panva, dayun6530, xia-chao, pimterry, inoway46, aduh95, mcollina, IlyasShabi, MayaLekova, christianaurichzm, osztenkurden, legendecas, eliau2005, efekrskl, nodejs-github-bot, trivikr, TrevorBurnham, araujogui]
commit_authors: {"8812357": TrevorBurnham, "14e8f5b": aduh95, "cd908df": lazerg, "b456adb": lazerg, "7ff6267": mcollina, "147ade5": jasnell, "d196094": jasnell, "f378cfc": jasnell, "261c8a1": lazerg, "cf072ab": IlyasShabi, "6a6e09e": anonrig, "1e17275": christianaurichzm, "db1e36b": osztenkurden, "1e0167d": xia-chao, "ca0810f": xia-chao, "af13502": pimterry, "71c6391": legendecas, "08dbed2": eliau2005, "c0681e5": efekrskl, "95279e7": nodejs-github-bot, "66f26d3": panva, "4cd4701": panva, "5d9228d": pimterry, "45fef37": panva, "4889fb0": anonrig, "236b53f": anonrig, "ebd5238": inoway46, "733bb34": inoway46, "f2b698f": araujogui}
---

### **Add `--allow-env` permission model support** (f378cfc)
Node now lets the permission model restrict environment variables at startup, with support for exact names, prefixes, or `*`. This is a semver-major security and isolation feature: disallowed variables are scrubbed from `process.env`, native `getenv()`, child processes, and workers, while a small allowlist of Node/runtime-critical vars remains available.

### **Rename and broaden `node:sqlite`’s public API** (f2b698f)
`DatabaseSync`/`StatementSync` are now `Database`/`Statement`, with the old names kept as deprecated aliases, and the docs/tests were updated accordingly. This is a public API rename with broad surface-area churn across docs, benchmarks, and C++ bindings.

### **Fix gzip reset semantics and preserve Brotli params in zlib** (ca0810f, 1e0167d)
Resetting a gzip stream after it has already emitted part of an incomplete member now fails with `ERR_ZLIB_INCOMPLETE_FRAME` instead of producing undecodable output. Brotli streams also now preserve their configured parameters and dictionary across `reset()`, making stream reuse behave more predictably.

### **Make streams faster on the common flowing-pipe path** (236b53f, 4889fb0, 7ff6267)
Several stream internals were reworked to keep pre-fetched chunks and consumer state in fast paths instead of bouncing through slower buffer/dictionary-style state. The result is a notable throughput improvement for flowing pipes and iter-based stream consumers, with benchmark-backed speedups.

### **Speed up `querystring` parsing and unescaping** (6a6e09e)
The default parse path and `unescapeBuffer()` now avoid extra scanning and state-machine work when inputs don’t contain escapes. This is a performance win on common querystring workloads, especially simple or mostly-unencoded inputs.

### **Fix `fs` crash on negative-zero file descriptors** (1e17275)
`readFileSync()` and `writeFileSync()` now coerce `-0` to `0` before crossing into the binding layer. That closes a crash path where `-0` was accepted as an integer in JS but rejected by V8/native handling.

### **Improve worker and web worker string-tag and TypeScript handling** (b456adb, cd908df, db1e36b)
Worker messaging objects now expose the expected `Symbol.toStringTag` values, improving inspection/debuggability and aligning with web platform expectations. Separately, file-backed web worker module entries now strip TypeScript when type-stripping is enabled, including coverage for module workers loaded from `file:` URLs.

### Other misc changes
- HTTP CONNECT path normalization fix (c0681e5)
- `addAbortListener()` fix for already-aborted signals (261c8a1)
- Heap profile output now includes size/count (cf072ab)
- Several test deflakes and benchmark fixes (147ade5, d196094, 66f26d3, 4cd4701, 45fef37, af13502)
- Nix/CI/build tweaks, including temporal-by-default in Nix integration and PGO/sccache/tarball changes (14e8f5b, 71c6391, 5d9228d, ebd5238, 733bb34)
- Malformed localStorage handling and inspector DOM storage error reporting improvements (8812357)
- V8/googletest dependency updates (08dbed2, 95279e7)
