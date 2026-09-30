---
date: 2026-09-29
repo: nodejs/node
size: L
title: "HTTP helpers and worker/sqlite fixes land"
excerpt: "Node.js adds fast header validators and fixes several worker, sqlite, zlib, crypto, and http2 correctness bugs."
commits: 23
authors: [panva, nodejs-github-bot, Cherry, nigrosimone, aduh95, jasnell, koreahghg, trivikr, araujogui, lazerg]
commit_authors: {"5643755": panva, "6866129": nigrosimone, "d57738e": koreahghg, "9bf40b2": trivikr, "fa4af16": Cherry, "e6b3f96": panva, "74564d9": panva, "f53f438": panva, "ef8947a": panva, "c5b7a06": araujogui, "1f26576": lazerg, "e77e173": nigrosimone, "d97041f": nigrosimone, "44ba289": jasnell}
---

### **HTTP gets fast non-throwing header validators** (44ba289)
Adds `http.isValidHeaderName()` and `http.isValidHeaderValue()` as boolean counterparts to the existing throwing validators. This helps hot paths avoid error object/stack creation when invalid input is expected, and the new API is documented and covered by tests.

### **Zstd compression now pledges input size by default** (fa4af16)
`zlib.zstdCompress()` now infers and supplies `pledgedSrcSize` for common inputs, matching the sync variant’s output and improving performance at higher compression levels. Explicit `pledgedSrcSize` or non-UTF-8 string encoding still preserves the old behavior.

### **Worker message delivery is fixed across termination and exit** (e6b3f96, 74564d9, f53f438, 5643755, ef8947a)
Worker messaging now preserves serialization semantics after exit, keeps blob module URLs intact, converts `importScripts()` arguments before early rejection, and fixes `postMessage()` overload resolution. Terminating a worker now also stops queued message dispatch cleanly instead of letting late messages leak through.

### **SQLite virtual tables reject unusable plans and oversized strings** (9bf40b2, c5b7a06)
The SQLite binding now rejects query plans that would pass unavailable parameters as `null`, avoiding silent empty results from virtual tables. It also throws `ERR_STRING_TOO_LONG` when SQLite text exceeds V8 string limits, so failed conversions no longer look like successful statements.

### **Crypto key export now throws the right error for mismatched raw formats** (d57738e)
WebCrypto export logic now selects the exporter first and validates key type afterward, so mismatched `raw`, `raw-public`, and `raw-seed` exports raise `InvalidAccessError` instead of a generic `NotSupportedError`. That aligns Node’s behavior with Web Crypto expectations and fixes several algorithm-specific export paths.

### **HTTP/2 abort handling emits RST_STREAM first** (1f26576)
The stream close path now sends `RST_STREAM` before emitting `'aborted'`, which fixes the ordering for aborted destroyed streams. The regression test confirms the stream closes with `NGHTTP2_CANCEL` and surfaces the expected abort error.

### **Internal callback scope overhead is reduced** (d97041f, 6866129, e77e173)
Native-to-JS callback handling was streamlined by trimming repeated environment lookups and reducing async-context bookkeeping overhead in the common no-prior-frame case. The day also adds a focused benchmark and a test to guard callback-scope frame restoration.

### Other misc changes
- Dependency updates: LIEF, zlib, undici, and timezone data
- Benchmark added for HTTP header validation
- zlib decodeStrings crash fix
- SQLite virtual table and statement tests expanded
- Nixpkgs updater and shared test workflow tweaks
