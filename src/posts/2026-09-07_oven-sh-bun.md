---
date: 2026-09-07
repo: oven-sh/bun
size: L
title: "Bun fixes fetch, promises, JSX, and pipe draining"
excerpt: "A busy day of correctness fixes across runtime APIs, fetch semantics, JSX config, and build/test infrastructure, plus a few reverts."
commits: 12
authors: [Jarred-Sumner, robobun, dylan-conway]
commit_authors: {"b52d3e5": Jarred-Sumner, "a3e0ab6": Jarred-Sumner, "f45fb24": Jarred-Sumner, "62838e1": Jarred-Sumner, "fbf08c5": Jarred-Sumner, "42ecbb1": Jarred-Sumner, "3f2610e": robobun, "5baea66": robobun, "66c669c": robobun, "85c9f6e": robobun, "8940b0e": robobun, "ae3c3ad": dylan-conway}
---

### **FileSink now keeps pipe-backed writers alive until `end()` drains** (3f2610e)
Pipe-backed `FileSink`s could drop buffered data if `write()` went async and the script didn’t await `end()`. The fix keeps the event loop referenced until the tail has been flushed, closing a data-loss bug for `Bun.stdout.writer()`, FIFOs, and spawned stdin pipes.

### **`fetch()` no longer leaks URL fragments into the request-target** (66c669c)
Bun was incorrectly sending fragments like `#frag?x=1` on the wire when building the request path. The URL parser now stops query detection at `#`, so requests match web expectations and avoid 400s or malformed paths on stricter servers.

### **Early rejected promises from native APIs are now reported** (85c9f6e)
Rejections created by native code could bypass VM notification entirely, which meant missing `unhandledRejection` events and silent test passes. This change routes several APIs through the normal rejected-promise path so failures from `fetch()`, `Bun.write()`, `server.fetch()`, `Bun.resolve()`, and related call sites surface correctly.

### **Solid JSX runtime support removed from config and CLI** (5baea66)
The dead `solid` runtime option has been stripped from bunfig, tsconfig handling, and `--jsx-runtime`, preventing Bun from advertising a transform it no longer implements. That turns a silent runtime footgun into a clear configuration error.

### **`new Array(x, ...spread)` is no longer folded into a literal** (8940b0e)
Minification now preserves array-constructor semantics when spreads are present, avoiding cases where an empty spread would turn `new Array(5)` into `[5]`. The transpiler cache was bumped as part of the behavior change.

### **Chunk renamer tables are now sized per chunk, not per bundle** (b52d3e5)
The bundler was preallocating renamer tables from the full bundle’s symbol count even though each chunk’s renamer lives independently. Sizing from just the chunk’s own symbols should reduce wasted memory in split builds, especially when many chunks are created in parallel.

### Other misc changes
- CI runner retry behavior adjusted for flaky file handling (f45fb24)
- Reverted the “build JavaScriptCore and ICU from source” change (62838e1)
- Reverted the verify-baseline x86 decoder resync change (fbf08c5)
- Reverted the ASan loader expectation revert for aarch64/glibc (42ecbb1)
- Updated binary-expectation logic for aarch64 glibc ASan binaries (ae3c3ad)
- Small runner message tweak for retry output (a3e0ab6)
