---
date: 2026-03-30
repo: oven-sh/bun
size: L
title: "Async stacks, leak fix, stdout flush"
excerpt: "Bun adds async stack traces to more errors, fixes a MySQL memory leak and stdout truncation, and removes the legacy CMake build path."
commits: 7
authors: [Jarred-Sumner, robobun, dylan-conway]
commit_authors: {"17616ae": Jarred-Sumner, "9804f55": Jarred-Sumner, "d7b3749": robobun, "9a27ef7": robobun, "ba05a72": dylan-conway}
---

### **Async stack traces now follow more errors** (9804f55)
Bun now attaches async stack frames to errors rejected from native callbacks, which makes failures in async APIs like `fs.promises`, `Bun.file()`, DNS, crypto, and subprocesses point back to user code instead of starting at an empty stack. It also updates the rejection path across several native subsystems to preserve those async frames consistently.

### **`Error.captureStackTrace()` includes async frames** (17616ae)
`Error.captureStackTrace` now uses the same stack-trace machinery as `new Error()`, so async await-chain frames are no longer dropped. This closes a long-standing mismatch between the two APIs and makes captured stacks much more useful for debugging async code.

### **MySQL adapter no longer leaks per query** (d7b3749)
Fixes a native memory leak in `bun:sql`’s MySQL adapter that could grow RSS steadily until OOM on Linux. The patch frees leaked column-name/parameter allocations and adds regression coverage for repeated query execution.

### **`process.stdout.end()` now waits for buffered writes** (9a27ef7)
Bun now flushes the underlying file sink in `process.stdout._final` before invoking the end callback, preventing truncation when code exits immediately after `end()`. This fixes missing output at common boundary sizes like 64KB and 128KB.

### **Legacy CMake build system removed** (ba05a72)
The repository drops the old CMake build path in favor of the TypeScript build scripts, deleting the `cmake/` tree and related wrappers/scripts. This is a major build-system simplification and removes a large amount of dead infrastructure.

### Other misc changes
- CI/build updates, including switching the Buildkite generator to `node` and bundling Node into the container image
- Deflake webview tests and gate a macOS CI-only Chrome issue
- Update Claude GitHub Actions to a pinned action version
