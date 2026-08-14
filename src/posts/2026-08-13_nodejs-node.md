---
date: 2026-08-13
repo: nodejs/node
size: L
title: "WebCrypto, FFI, and sqlite get sharper"
excerpt: "Notable API and correctness work: WebCrypto capability checks, new sqlite statement stats, FFI detached-buffer handling, and a test tag-filter DSL."
commits: 14
authors: [aduh95, geeksilva97, trivikr, nodejs-github-bot, panva, edsadr, jasnell, privatenumber, unstubbable, atlowChemi, greenheadHQ]
commit_authors: {"4078cde": aduh95, "d14729d": nodejs-github-bot, "e1cdcec": panva, "f914e45": geeksilva97, "54bdc2e": edsadr, "1662b69": jasnell, "73eed9b": aduh95, "c3d68ef": privatenumber, "c47ad66": trivikr, "525e8f4": trivikr, "bcb680c": unstubbable, "f46e96f": geeksilva97, "1d9d49c": greenheadHQ}
---

### **WebCrypto `supports()` now matches real algorithm constraints** (e1cdcec)
`SubtleCrypto.supports()` was tightened to account for context parameters, ML-KEM derived-key imports, HKDF output-length limits, and RSA key generation rules. This improves feature-detection accuracy so callers stop getting misleading support signals for invalid or unsupported parameter combinations.

### **sqlite prepared statements expose runtime counters** (f46e96f)
Node’s sqlite API gained `statement.stat(counter)` and `statement.resetStats()`, letting users inspect and reset SQLite’s per-statement performance counters. That makes it much easier to spot full-table scans, sort-heavy queries, and other execution costs without leaving the JS API.

### **Test runner tag filters now accept boolean expressions** (a674c5c)
`--experimental-test-tag-filter` was upgraded from a single tag match to a small expression language with `and`/`or`/`not`, parentheses, and wildcards. This is a meaningful usability jump for large test suites, because tag selection can now express real include/exclude logic instead of repeated literal filters.

### **FFI rejects detached buffers and views consistently** (525e8f4)
FFI pointer conversion now fails fast when given detached `ArrayBuffer`s or views backed by detached buffers, instead of silently passing null-like pointers to native code. The native side and JS wrappers were aligned so detached inputs are rejected uniformly across raw-pointer and memory-export paths.

### **Detached ArrayBufferViews are rejected in FFI memory helpers** (c47ad66)
The higher-level FFI helpers were updated to detect detached backing buffers before exporting memory, matching the stricter native behavior. This closes a gap where detached views could slip through with inconsistent errors or zero-byte exports.

### **`realpathSync()` no longer trusts stale stat state** (bcb680c)
`realpathSync()` now tracks whether the path walk actually hit a pipe or socket instead of reading that state from a shared stat buffer. That fixes a subtle cache-corruption bug where an unrelated FIFO stat could leave symlinks unresolved and poison later realpath lookups.

### Other misc changes
- Options parser internal refactor to packed bitfield-backed booleans (1662b69)
- Preserve function names more reliably when source maps lack names (c3d68ef)
- Escape Windows environment variables in the task runner (73eed9b)
- Improve `REPLServer` docs for DEP0185 throw/uncaught behavior (54bdc2e)
- Cover sqlite benchmark transaction fix (f914e45)
- Lint fix for empty `permittedInsecurePackages` handling (4078cde)
- Collaborator emeritus list update (d14729d)
- Small `stream` BYOB validation cleanup (1d9d49c)
