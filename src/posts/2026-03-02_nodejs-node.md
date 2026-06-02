---
date: 2026-03-02
repo: nodejs/node
size: L
title: "Node fixes hooks, HTTP validation, SQLite"
excerpt: "Major changes land for module hooks, HTTP request/header validation, and SQLite iterator invalidation, plus new CLI heap sizing support."
commits: 16
authors: [aduh95, araujogui, suuuuuuminnnnnn, tannal, MikeMcC399, ChALkeR, mcollina, joyeecheung, RafaelGSS, rsclarke, cuiweixie, codebytere, nodejs-github-bot, Renegade334]
commit_authors: {"88be44d": araujogui, "cb6ff03": suuuuuuminnnnnn, "ddecee7": tannal, "5554a28": aduh95, "d198813": MikeMcC399, "097e763": ChALkeR, "78e56fa": aduh95, "acb79bc": mcollina, "dd400b9": joyeecheung, "f8d5bad": RafaelGSS, "e78bf55": rsclarke, "09c21d8": cuiweixie, "9027f29": codebytere, "97c1312": aduh95, "a6e9e32": nodejs-github-bot, "70242ea": Renegade334}
---

### **module: run require.resolve through module.registerHooks()** (dd400b9)
`require.resolve()` now flows through registered module resolve hooks instead of bypassing them via `Module._resolveFilename()`. This closes a consistency gap between CommonJS resolution paths and makes hook-based tooling work correctly for `require.resolve()`.

### **http: validate ClientRequest path on set** (acb79bc)
`req.path` is now validated on every reassignment, not just at construction time, blocking invalid characters from slipping into `_implicitHeader()`. This fixes a TOCTOU-style bug and closes a path injection vector.

### **http: validate headers in writeEarlyHints** (e78bf55)
`writeEarlyHints()` now validates both the `Link` header value and any additional headers before serializing them into the raw response. That hardens early hints against CRLF/header injection and tightens `Link` parsing to reject embedded line breaks.

### **sqlite: handle stmt invalidation** (88be44d)
SQLite statement iterators now track a reset generation so they can detect when the underlying statement has been reset by `get()`, `all()`, `run()`, or another `iterate()` call. This prevents stale iterators from continuing after statement reuse and makes the sync API safer and more predictable.

### **cli: add --max-heap-size option** (ddecee7)
Node now accepts `--max-heap-size`, exposing a direct way to cap the process heap in megabytes. That gives operators another memory-tuning knob alongside the existing V8 heap-size flags.

### **stream: accept ArrayBuffer in CompressionStream and DecompressionStream** (cb6ff03)
The webstreams adapters now convert `ArrayBuffer` chunks to `Uint8Array` for non-object-mode writable streams, which lets compression/decompression streams consume ArrayBuffer input correctly. This broadens buffer-source compatibility for WHATWG streams.

### **deps: update undici to 7.22.0** (a6e9e32)
Bundled Undici was bumped to 7.22.0, bringing along internal fetch, cache, and dispatcher updates. This can affect built-in `fetch()` behavior and other Undici-backed APIs.

### Other misc changes
- Deprecated `url.resolve()` in docs and cross-referenced DEP0169 (d198813)
- Expanded `SECURITY.md` with non-vulnerability examples (f8d5bad)
- Improved SQLite conversion docs (70242ea)
- Performance-oriented `validate_ascii_with_errors` swap in buffer code (097e763)
- GN/build and workflow fixes, plus a small UDP wrap offset fix and test cleanup (9027f29, 78e56fa, 09c21d8, 97c1312, 5554a28)
