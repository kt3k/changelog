---
date: 2026-08-16
repo: oven-sh/bun
size: L
title: "Bun gets a URL, buffer, and diff engine overhaul"
excerpt: "Major runtime fixes and refactors landed: faster URL parsing, safer buffer writes, sliced stream correctness, and a new test diff engine."
commits: 17
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"30fa519": Jarred-Sumner, "8326d1b": Jarred-Sumner, "3cf3149": Jarred-Sumner, "07d38c1": Jarred-Sumner, "d8c7b36": Jarred-Sumner, "1726b14": robobun, "669bd82": robobun, "75fad5b": robobun, "aec33f5": robobun, "23d535a": robobun, "11678f5": robobun, "83d65fa": robobun, "8c5296a": robobun, "f0f6b2c": robobun, "a42889a": robobun, "eec9c8b": robobun}
---

### **Faster URL parsing with punycode validation fixes** (3cf3149)
Bumped Bun’s bundled WebKit to a URL parser rewrite, bringing faster `new URL()`/`fetch`-path parsing and related host handling improvements. Bun also tightened punycode validation so ICU is only re-run when the input actually contained a literal `xn--` label, avoiding false rejections of parser-produced punycode.

### **Test runner diff output is now deterministic and work-bounded** (d8c7b36)
Replaced the old diff-match-patch implementation behind `expect()` failures with a new Myers-based diff engine. This should make large assertion failures faster and more predictable instead of timing out into giant unreadable dumps.

### **Slice windows now stop reading exactly at EOF** (669bd82)
Fixed buffered readers so blob/file slices on pipes, stdin, and sockets clamp reads at the slice boundary instead of consuming and discarding extra bytes. That restores correct streaming behavior for sliced non-regular inputs and prevents later readers from seeing data disappear.

### **Detached Buffers now behave like Node and return 0 on write** (75fad5b)
Changed `Buffer#write` and related encoding paths so detached `ArrayBufferView`s are treated as empty instead of aborting in debug builds. This removes a crash and matches Node’s observable behavior of returning 0 for writes against detached buffers.

### **Isolated install store names no longer leak credentials** (aec33f5)
Adjusted isolated-store path formatting so tarball and git URLs drop userinfo and query strings from the directory name. That avoids putting credentials into store paths and keeps different credentialed URLs separated via a hash suffix.

### **HTTP/2 batch writes now share one byte-source conversion** (83d65fa)
Deduplicated the `BatchSegment`-to-bytes conversion in the HTTP/2 frame parser so the iovec path, copy fallback, and partial-write handling all use the same logic. This reduces the chance of the three paths drifting apart and corrupting batched DATA frames.

### Other misc changes
- Template/init updates to use TypeScript 7 (1726b14)
- DOM wrapper cache refactor removing the global HashMap (07d38c1)
- BufferedReader/FileReader slice-window follow-ups and tests (eec9c8b, 669bd82)
- URL/snippet and WebKit bump follow-ups, plus URL constructor tests (30fa519, 8326d1b)
- Node abort error message tweak to match Node’s punctuation (8c5296a)
- Redis client type linting and source-lint wiring (f0f6b2c)
- Dead-code removal across bindings, codegen, and build scripts (a42889a)
- CI allowlist bucketing change and related harness tweaks (619a88b)
- Docs cleanup/corrections across multiple pages (23d535a, 11678f5)
