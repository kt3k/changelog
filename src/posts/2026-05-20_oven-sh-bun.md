---
date: 2026-05-20
repo: oven-sh/bun
size: L
title: "Bun lands parser, YAML, and runtime fixes"
excerpt: "Major correctness and perf work: YAML scalar parsing, bundler speed, escape diagnostics, Buffer ASCII parity, and several leak/use-after-free fixes."
commits: 15
---

### **YAML block scalars now parse indentation and chomping correctly** (303e97a)
`Bun.YAML` now honors explicit block-scalar indent indicators (`|1`..`|9` / `>1`..`>9`) instead of dropping them, and fixes chomping/folding behavior at EOF and across more-indented lines. This closes multiple conformance gaps in block scalar handling and should make YAML output match the spec and other parsers more reliably.

### **Bundler closes the main-thread performance gap** (32a161f)
The bundler was reworked to cut main-thread serialization overhead in the parse/link pipeline, with the branch measured faster than Zig 1.3.14 on large rolldown benchmarks. This is a meaningful throughput win for large projects and reduces the cost of bundling hot paths.

### **Escape-sequence diagnostics now point at the right character** (71b4baa)
The lexer fixes off-by-one position math in invalid escape handling so carets land on the backslash instead of drifting left, especially for out-of-range `\u{...}` errors. That makes parse errors much easier to understand and fixes a user-visible regression in syntax diagnostics.

### **Buffer ASCII writes now preserve high-bit bytes** (02f9249)
`Buffer.write(..., "ascii")` is aligned with Node’s behavior by treating ASCII writes as Latin-1 byte-preserving encodes instead of masking to 7 bits. This fixes data corruption for bytes `0x80`–`0xFF` and brings `write()`, `fill()`, and `alloc()` string fills into parity.

### **Top-level await is preserved across isolated/preloaded test runs** (2f9e77b)
The test runner now carries TLA metadata through the runtime transpiler cache and module record path, fixing preloads that could resolve before their async setup finished under `--isolate` / `--parallel`. This was a real ordering bug that could make tests observe unset preload state.

### **FileSink flush failures now leave the sink marked done** (3eb0fda)
When `FileSink::end()` fails while flushing buffered data, the sink now marks itself done instead of leaving dangling state that can later write to `Fd::INVALID`. That prevents follow-up writes/flushes and avoids assertion failures after an earlier I/O error.

### **ReadableStream reuses its pull buffer instead of reallocating each read** (a43a01b)
Native `ReadableStream` no longer rotates a fresh buffer on every small pull; it keeps reusing the tail of the existing backing allocation. This avoids pathological memory growth and commit-charge spikes during streaming reads, especially on Windows.

### **Shell brace + glob patterns are globbed correctly** (b3d086e)
Shell expansion now applies globbing after brace expansion instead of silently dropping patterns like `src/*.{ts,tsx}`. This fixes a user-facing shell bug that previously produced wrong no-op behavior with exit code 0.

### **Signal errors list the actual valid names** (b916187)
`subprocess.kill("BADSIGNAL")` now reports the full canonical list of valid signals again instead of a placeholder message. This restores a useful error string and matches released Bun behavior.

### **Bundled wrapper names handle non-ASCII filenames correctly** (f5358e2)
The identifier formatter now decodes multi-byte code points instead of treating each UTF-8 byte as a separate character, fixing generated CommonJS wrapper symbols for filenames like `café-utils.js`. That removes the extra underscore and keeps bundle output stable for non-ASCII paths.

### **`bun_sys::File` and `bun_sys::Dir` now own their fds** (46b2404)
Core file and directory handles were converted into RAII-owned types that close on `Drop`, eliminating an entire class of silent descriptor leaks. The change also propagates through install, bundler, cache, and filesystem code paths that previously depended on manual closes.

### **Dev server directory watches no longer keep dangling paths** (a55a62d)
The live `DirectoryWatchStore` insert path was fixed to stop storing borrowed path data that could outlive its backing allocation. This removes a real use-after-free risk in the dev server’s watcher bookkeeping.

### **`mimalloc` was bumped to a build with a TLS sentinel fix** (be6a3c5)
The dependency update pulls in a mimalloc fix for a flaky crash in the transpiler worker pool caused by a bad sentinel value during heap initialization. This is a targeted stability update rather than a broad dependency refresh.

### **Clippy deny-lint rollout and workspace cleanup** (21db682)
A large linting pass added deny-level clippy rules and fixed thousands of violations across the workspace, including a sizable dead-code reduction. This is mostly internal hygiene and should improve long-term code health, but it’s not a product feature change.

### Other misc changes
- Transpiler cache version bump and preload cache serialization fix for TLA metadata.
- YAML conformance follow-up for `JEF9/02` trailing indentation behavior.
- ReadableStream leak test coverage added.
- Workspace-wide refactors and internal allocation/type plumbing tied to the clippy cleanup and bundler performance work.
