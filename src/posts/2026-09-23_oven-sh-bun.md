---
date: 2026-09-23
repo: oven-sh/bun
size: L
title: "Bun lands image, spawn, and TLS fixes"
excerpt: "Notable fixes for image decoding, spawn fd handling, TLS identity matching, and a few concurrency/runtime bugs."
commits: 13
authors: [robobun, Jarred-Sumner, cirospaciari]
commit_authors: {"4224438": robobun, "9103862": robobun, "b2ad29d": robobun, "f385d9a": robobun, "849da93": robobun, "ba1faad": Jarred-Sumner, "85615fb": cirospaciari, "46e03a5": Jarred-Sumner, "75c47c0": robobun}
---

### **Image decoding now tolerates warned JPEGs** (849da93)
Bun.Image now accepts JPEG decodes that libjpeg-turbo completes with only a warning, instead of failing them as decode errors. The change also fixes a cropping-related overflow path and updates the docs/types to describe the new behavior.

### **Spawn keeps stdio-adjacent fds from leaking into children** (b2ad29d)
When fd 0/1/2 are closed, Bun now moves newly created descriptors like socketpairs, memfds, pidfds, and eventfds away from those slots so child processes don't inherit them as stdio. This closes a subtle process-spawn bug that could break stdout pipes or hand children the wrong descriptors.

### **TLS server identity checks stop parsing hosts like URLs** (9103862)
Bun now matches certificate identities on IDNA/UTS #46 mapping alone, instead of feeding hostnames through a URL host parse that could truncate or normalize them incorrectly. The fix also aligns SNI handling with Node-style behavior around embedded NULs and closes a real certificate-validation bypass.

### **`buffer.transcode()` no longer aborts on 2 GiB+ outputs** (75c47c0)
The transcode path now uses recoverable allocation failure handling instead of crashing when the output needs 2 GiB or more. That makes large transcoding work fail like a normal error instead of taking down the process.

### **`bun:ffi` serializes TinyCC across threads** (4224438)
Bun now wraps TinyCC calls in a process-wide lock and disables TinyCC's own lazy semaphore init, preventing concurrent Worker calls from corrupting compiler state. This fixes crashes/hangs when multiple threads invoke `cc()` at the same time.

### **`node:vm` import callbacks now die with their code** (85615fb)
`importModuleDynamically` is now rooted only as long as the `vm.Script`/`compileFunction`/`SourceTextModule` that can invoke it is alive. That fixes a lifetime leak where the callback could outlive the code and keep sandbox state around too long.

### **Cron `next()` now stops at the end of the Date range** (f385d9a)
The cron parser no longer walks past JavaScript's supported Date range while searching for the next match. This avoids assertion failures in debug builds and makes out-of-range queries reliably return `null`.

### **Bundler avoids extra output files for chunks without bytecode** (ba1faad)
Chunks that fail bytecode generation no longer leave behind a reserved output slot, which could desync the bundler's file list. This fixes a bug that showed up when a JS chunk contains syntax JSC won't bytecode-compile.

### **Orderfile generation now traces app-shaped workloads on macOS** (46e03a5)
The linker orderfile tooling gained a much larger app workload suite plus symbol-hint support, so it can learn from long-running compiled apps instead of only tiny startup traces. This should improve code placement for Bun's compiled-app use cases and reduce idle .text residency.

### Other misc changes
- Added a LeakSanitizer regression test for `s3file.writer()` cleanup.
- On macOS, orderfile generation now respects ignored signals directly from the process.
- Removed dead fields/options across 11 crates.
- `child_process` now rejects `tls.TLSSocket` in `stdio` like Node.
- Various docs, tests, and dependency/build updates.
