---
date: 2026-06-28
repo: nodejs/node
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "Node tightens crypto, streams, zlib, and experimental I/O"
excerpt: "This week brought stricter crypto validation, new Blob/text module streaming APIs, zlib end-of-stream checks, and a VFS security clarification."
commits: 58
---

### **Platform/API additions and stream ergonomics**
Node expanded its content and streaming story with `Blob.textStream()` for incremental UTF-8 reads, `perf_hooks.monitorEventLoopDelay()` gaining an iteration-based sampling mode, and experimental text modules via `--experimental-import-text`. These changes make it easier to consume data lazily and add a new gated ESM import path for plain-text modules.

### **Crypto correctness and parser fixes**
Several crypto-facing fixes landed across the week: EdDSA verification now rejects known low-order points, X.509 parsing no longer truncates large RSA exponents, and DH validation handles very large generators correctly. Node also refreshed its bundled `libffi` to 3.6.0, which can affect native addon/FFI behavior on some platforms.

### **Stricter decompression and VFS correctness**
`zlib` gained `rejectGarbageAfterEnd`, allowing callers to fail on trailing bytes or extra gzip members across sync, async, stream, Brotli, and Zstd paths. In the virtual file system, reads now use the already-open file descriptor and preserve offsets, fixing rename and `readFile()` correctness issues.

### **Performance, diagnostics, and lifecycle improvements**
The UTF-8 encoder now avoids copying source strings, REPL startup/completion got faster by lazy-loading parser dependencies, and promise resolver internals were adjusted so resolved Promises can be collected sooner. Diagnostics also improved with better JUnit timestamps, richer test-runner coverage failure output, safer debugger startup behavior, and tracePromise preserving original thenables.

### **Other misc changes**
- Stream abort handling now interrupts pending iterator and `pipeTo()` work sooner
- `Readable.wrap()` fixed a proxying bug for the first own method
- Watch mode restart messages now include the triggering filename
- `node:vfs` docs now explicitly say it is not a security boundary
- Release/tooling updates for Node 24.18.0 and 26.4.0, plus assorted CI/docs cleanup
