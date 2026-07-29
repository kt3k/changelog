---
date: 2026-07-28
repo: oven-sh/bun
size: L
title: "Bun adds fetch text streams and speeds up test running"
excerpt: "Major fetch Body.textStream() support landed, alongside a macOS test-parallelism cap and a few regression fixes."
commits: 11
authors: [robobun, Jarred-Sumner]
commit_authors: {"e532ad9": robobun, "789be97": robobun, "be5c92a": Jarred-Sumner, "0341a4e": robobun, "d549845": robobun, "2a5855b": robobun, "b650f55": robobun, "9c5542c": Jarred-Sumner}
---

### **Fetch bodies now support `textStream()`** (2a5855b)
Bun implements the Fetch-spec `Body.textStream()` API for both `Request` and `Response`, exposing a `ReadableStream<string>` of UTF-8 text. It decodes native body sources directly, handles chunk boundaries correctly, and adds type definitions plus WPT/regression coverage.

### **Abort now errors buffered response bodies instead of silently finishing** (789be97)
When a fully-buffered fetch response is aborted, Bun now errors the body stream so pending reads reject with the abort reason instead of resolving as done. This brings abort behavior in line with fetch semantics and plugs leak/regression cases around aborted body streams.

### **Test runner batches fast tests per shard and caps macOS width** (be5c92a, e532ad9)
The parallel test runner was reworked to run fast, non-flaky files as a single `bun test --parallel` batch per shard, and macOS parallel-safe width is now capped at 4 to avoid oversubscribing Intel minis and tart VMs. This should make CI more predictable and avoid timeouts on macOS lanes.

### **Native text-stream decoding no longer stalls on empty decodes** (d549845, 0341a4e)
A follow-up fix keeps `textStream()` pulling when a native chunk decodes to an empty string, which prevents hangs on split multibyte characters and BOM-prefix cases. Additional tests cover the edge cases that previously stalled.

### **Build ordering now avoids racey strip/wrapper execution** (b650f55)
The build now orders `smoke_test` and `dsymutil` after `strip` so the wrapper doesn’t race against a still-unstripped binary on PATH. This fixes a subtle build-time ordering bug in release builds.

### **Builtin module embedding now follows dependency order** (9c5542c)
Embedded builtin modules are now laid out in DFS post-order over the static require graph instead of registry order. That improves locality for cold starts by keeping modules adjacent to their dependencies in the blob.

### Other misc changes
- Test cleanup and refactors, including converting `tempDirWithFiles` callers to `using tempDir`.
- Removed a spurious debug log from a few test files.
- Darwin flake fix in `serve.test.ts` backpressure coverage.
