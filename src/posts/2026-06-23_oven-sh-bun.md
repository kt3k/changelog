---
date: 2026-06-23
repo: oven-sh/bun
size: L
title: "Big safety and HTTP plumbing day"
excerpt: "Major new APIs, memory-safety fixes, proxy stress coverage, and compression plumbing landed across Bun's runtime and HTTP stack."
commits: 20
authors: [robobun, alii, cirospaciari, Jarred-Sumner]
commit_authors: {"be6a664": cirospaciari, "d34ca02": robobun, "5d2f66c": robobun, "91f0283": robobun, "1bd44db": robobun, "03042ab": robobun, "ff63668": alii, "85ef0c5": cirospaciari, "6b702ae": robobun, "ea7e44f": robobun, "4982b91": alii, "126e800": robobun, "7ff1181": robobun, "cbcec93": robobun, "c6be834": Jarred-Sumner, "18ead54": Jarred-Sumner, "98094dc": robobun, "23315f4": cirospaciari, "28f2dbd": alii}
---

### **Add process.on('memoryPressure') event** (03042ab)
Bun now exposes a `process` event that fires when the OS signals low available memory, letting apps shed caches or reap idle work instead of polling. The implementation spans platform-specific event-loop plumbing and new Node typings, with semantics that avoid keeping the loop alive.

### **Add automatic request body compression to fetch()** (c6be834)
`fetch()` now accepts a `compress` option to transparently gzip/deflate/brotli/zstd buffered request bodies and set `Content-Encoding` for you. This is a significant API addition that changes request construction across HTTP/2 and HTTP/3 paths and includes leak/perf coverage.

### **Fix direct stream responses waiting for synchronous pull() bodies** (5d2f66c)
Bun.serve no longer finalizes a direct `ReadableStream` response too early when `pull()` returns synchronously but schedules `end()` later. This closes a correctness gap where streamed responses could be truncated, especially for server-rendered output that writes in multiple phases.

### **Fix structuredClone crash on very large nested ArrayBuffers** (126e800)
Serialization now handles near-2GB buffers without crashing the process by clamping vector growth instead of relying on unchecked expansion. That makes `structuredClone()` and `postMessage()` safer for large payloads and turns an abort into a handled failure path.

### **Fix proxy tunnel streamed-upload UAFs and add stress coverage** (d34ca02)
The HTTP proxy tunnel write path was hardened against re-entrancy and use-after-free hazards when TLS alerts or close-notify events race with writable callbacks. The same change adds a large adversarial stress suite for fetch and WebSocket proxy tunnels, giving this fragile area much better coverage.

### **Broaden HTTP/compression internals with safe wrappers** (ea7e44f)
Compression and decompression code was refactored around safer wrapper types for brotli, zstd, zlib, and libdeflate instead of scattered raw FFI and lifetime erasure. This is a major internal safety cleanup that reduces the chance of future memory bugs in request/response compression paths.

### **Fix React compiler bundled output refs and parity** (18ead54)
React compiler codegen now properly binds synthesized refs in bundled output and adds related hoisting/parity fixes. This matters because previously generated bundles could reference names that were never actually imported or bound, breaking compiled output in real apps.

### **Fix large Windows environment blocks for bunx fast path** (1bd44db)
The Windows `.bunx` fast path now heap-allocates the environment block instead of relying on a fixed-size buffer capped at 32,767 UTF-16 code units. That removes a practical ceiling that could break launches in CI or other env-heavy setups.

### **Fix S3 stream cancel leak by waking the HTTP thread** (be6a664)
Cancelling an S3 download stream now wakes the HTTP thread so the wrapper and streaming task can actually be released. This closes a leak that only showed up when the server went idle after sending partial data.

### **Fix leaked JSValue refs in fetch proxy/file/blob URLs** (91f0283)
Several fetch code paths were holding extra `WTF::StringImpl` references and never releasing them. The fix removes per-call leaks for proxy URLs and file/blob response URLs, which matters for long-running code that repeatedly constructs these requests.

### **Fix use-after-free in JSReadable*Controller end()/close()** (98094dc)
The generated sink/controller teardown path was adjusted to avoid re-entrancy hazards when `onClose` can re-enter the event loop. That closes a crash class observed in the direct readable stream server path.

### **Fix stream error object rooting across GC** (7ff1181)
Stream errors parked in ByteStream now keep their JS values rooted properly, preventing them from being collected before consumers observe the rejection. This is a correctness and stability fix for async download/stream error propagation.

### **Fix ReadableStream native source onClose leak** (cbcec93)
ReadableStream native sources now store `onClose` in a write barrier slot rather than a strong GC root, breaking a retention cycle through the native heap. That prevents streams from surviving after all JS references have been dropped.

### **Fix shell rm task leak on early aborts** (85ef0c5)
The `rm` builtin now cleans up its queued directory task state when readdir aborts after children have already been enqueued. This closes an ASAN-reported leak in the recursive removal path.

### **Update bundled root certificates** (23315f4)
Bun’s embedded CA bundle was refreshed to NSS 3.124, dropping removed roots and syncing with newer Firefox trust stores. This is important for TLS compatibility, but it’s a routine maintenance update.

### Other misc changes
- Dependency/test fixture cleanup: removed DuckDB test packages and generated lockfile churn (6b702ae)
- Source-map layout assertion added for SIMD parser state (ff63668)
- Parser doc/test follow-up for `__require` bundle-mode collision coverage (28f2dbd)
- S3/fetch/stream and SQL test refactors plus leak/stress coverage updates (4982b91)
- Windows static baseline allowlist tweak for LLInt decode noise (ea7e44f)
- Misc docs/type comments, internal refactors, and test-only updates across streams, fetch, and SQL
