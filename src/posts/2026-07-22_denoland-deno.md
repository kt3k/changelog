---
date: 2026-07-22
repo: denoland/deno
size: L
title: "Deno tightens npm, streams, and Node parity"
excerpt: "Tarball downloads now honor the configured registry, ReadableStream.from and worker_threads.locks land, plus several important runtime fixes."
commits: 11
authors: [nathanwhit, bartlomieju, crowlbot, petamoriken, Medo-ID]
commit_authors: {"2731794": crowlbot, "d6c91ad": nathanwhit, "fb78add": nathanwhit, "e004dac": crowlbot, "55bceb8": bartlomieju, "79d4652": bartlomieju, "c39f179": bartlomieju, "10979e6": petamoriken, "e2f15f2": Medo-ID, "5f4607d": nathanwhit, "446ed26": nathanwhit}
---

### **Honor configured npm registries for tarballs** (446ed26)
Deno now rewrites package tarball URLs through the active npmrc config before downloading, so private or mirrored registries are actually used for package bytes, not just manifests. This closes a supply-chain gap and also improves the registry-specific auth/error reporting when a download fails.

### **Implement `worker_threads.locks` on top of Web Locks** (2731794)
`worker_threads` now exposes a `locks` API compatible with Node’s newer worker threads surface, backed by the existing Web Locks implementation. That expands Node compatibility for code that coordinates work across workers using lock acquisition and inspection.

### **Fix `ReadableStream.from` and async-sequence handling** (10979e6)
WebIDL and streams now use the spec’s async-sequence shape instead of the old async-iterable converter, which brings `ReadableStream.from` and body extraction in line with expected behavior. The change also avoids double-awaiting yielded promises and tightens converter semantics for several web APIs.

### **Allow dynamic imports during cached synthetic module evaluation** (fb78add)
The cached-module fast path in the core module map no longer holds a borrow across module evaluation, preventing a `RefCell` re-entrancy failure when evaluated code kicks off a dynamic import. This fixes a real runtime deadlock/error path for synthetic ESM modules that import during evaluation.

### **Add end-bounded search parameters to Node `Buffer` methods** (e2f15f2)
`Buffer#indexOf`, `lastIndexOf`, and `includes` now accept the extra `end` parameter that Node supports, matching the public API more closely. This matters for compatibility because code can now limit searches without slicing buffers first.

### **Compress bundled AppImage runtimes** (d6c91ad)
The AppImage runtime stubs are now zstd-compressed at build time and decompressed only for the selected target when packaging an AppImage. That significantly shrinks the data embedded in the binary while preserving cross-target image generation.

### **Other misc changes**
- Jupyter `codemirror_mode` is now reported as a string for compatibility with downstream clients (c39f179)
- Windows resource metadata fix by bumping `libsui` (55bceb8)
- Release/promotion workflow now regenerates checksum sidecars for republished artifacts (79d4652)
- Escape control characters in test names to protect reporter formatting (5f4607d)
- Refactor `ext/web/blob.rs` off `serde_v8` (e004dac)
