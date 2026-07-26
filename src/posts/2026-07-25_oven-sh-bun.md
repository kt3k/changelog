---
date: 2026-07-25
repo: oven-sh/bun
size: L
title: "REPL, QUIC, TLS, sqlite, and security fixes"
excerpt: "Major Bun day: ships node:repl and node:quic, hardens TLS and Blob NaN handling, fixes sqlite and CommonJS heap snapshots."
commits: 13
authors: [robobun, cirospaciari, Jarred-Sumner]
commit_authors: {"1960936": cirospaciari, "44f6469": Jarred-Sumner, "d3cfcea": robobun, "7c49f0d": cirospaciari, "85f22bb": cirospaciari, "b321f82": robobun, "65f3fe3": robobun, "762cefb": cirospaciari, "ae4b17d": robobun}
---

### **node:inspector and node:repl become usable ports** (7c49f0d, 1960936)
Bun now implements `node:inspector` coverage APIs and `inspector.open()` with a real DevTools-protocol server, plus a substantial `node:repl` port that replaces the stub with Node-compatible interactive behavior. These changes materially improve Node.js compatibility for debugging, coverage, completion, history, and `bun --interactive` workflows.

### **node:quic lands on lsquic** (762cefb)
Bun adds an experimental `node:quic` implementation backed by lsquic, covering HTTP/3, bidirectional and unidirectional streams, datagrams, resumption, qlog/keylog, and more. This is a major new networking surface for apps that want Node QUIC/HTTP3 compatibility.

### **TLS shutdown, injected-socket, and handshake paths fixed** (85f22bb)
This patch tightens TLS correctness across shutdown and wrapped-socket upgrade flows, including sending `close_notify` on `end()`, fixing reject-handshake wire behavior, and addressing data-loss and SNI/ALPN edge cases. It also adds vendored upstream tests and lifts TLS coverage from 81% to 86%.

### **Blob/File lastModified NaN boxing hardened** (b321f82)
`Blob`/`File` now purify `lastModified` before boxing it into a JS value, closing a structured-clone/deserialization bug where crafted NaN bit patterns could forge invalid immediates or pointers. That turns a potential crash / memory-safety issue into a normal numeric NaN.

### **SQLite empty aliases and row-returning behavior corrected** (ae4b17d)
Bun’s sqlite bindings now preserve empty-name columns instead of dropping them, and row-returning paths are keyed off `sqlite3_column_count()` instead of cached column-name state. This fixes observable API mismatches with Node/better-sqlite3 for queries that include `AS ""` or otherwise rely on exact column counts.

### **CommonJS module heap snapshots now show hidden slots** (44f6469)
Heap snapshots now report `module.children` and `module._compile` as property edges on CommonJS `Module` objects, matching what GC already sees. This improves snapshot fidelity for debugging memory retention in module graphs.

### Other misc changes
- `node:http` parser token fix for `M-SEARCH` (65f3fe3)
- `install`: preserve package `postinstall` when auto-injecting `node-gyp rebuild` (d3cfcea)
- `verify-baseline-static` allowlist/provenance updates (2 commits)
- CI comment-cop workflow added/updated (2 commits)
