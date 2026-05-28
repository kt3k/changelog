---
date: 2026-05-21
repo: denoland/deno
size: L
title: "CLI gains watch mode and new install defaults"
excerpt: "Deno added watch support to check, smarter audit/install CLI parsing, API typings, and a few targeted perf/fix wins."
commits: 10
authors: [bartlomieju, nathanwhitbot, nathanwhit, jbg, turtletongue]
commit_authors: {"8266125": nathanwhit, "3e3430b": nathanwhitbot, "663d8a0": bartlomieju, "67b4248": bartlomieju, "f1a7e4e": bartlomieju, "0eb9b05": jbg, "99babcf": turtletongue, "0b6cd36": bartlomieju, "1ebc47a": nathanwhit, "d3ec5aa": nathanwhitbot}
---

### **`deno check` now supports `--watch`** (67b4248)
`deno check` can now rerun automatically when files in the dependency graph change, bringing parity with the existing watch behavior in other commands. This removes the need for external file-watching wrappers and makes the type-check loop tighter and more ergonomic.

### **Global installs now default bare package names to npm** (663d8a0)
`deno install -g` now treats unprefixed package names like `deno add` and local `deno install` do, auto-resolving them as `npm:` instead of erroring on a missing prefix. The change also validates all entries up front so a later parse error no longer leaves earlier global installs partially applied.

### **`deno audit fix` is now accepted as an alias** (0b6cd36)
The audit subcommand now accepts a positional `fix` token and maps it to the existing `--fix` behavior, matching the muscle memory users bring from tools like `npm audit fix`. Invalid positionals still fail, so the new shorthand stays narrow and explicit.

### **Node `ServerResponse.end(string)` got a direct fast path** (3e3430b)
The Node HTTP polyfill now bypasses part of the normal write path for safe string վերջ-ending responses, writing the header and body directly when a long list of invariants is satisfied. That should reduce overhead on a common hot path without changing behavior for chunked, HEAD/no-body, trailer, or strict-length cases.

### **TypeScript libs now expose `Math.sumPrecise` and `Intl.Locale.variants`** (f1a7e4e)
Deno’s bundled typings now include two runtime APIs that were already available through V8 but previously caused `deno check` errors. This closes the gap between runtime and types for users relying on those newer platform features.

### **Bitmap image handling is fixed for wide buffers** (99babcf)
`createImageBitmap`’s raw-buffer image construction now maps pixels using x/y coordinates instead of writing `index,index`, which fixes incorrect output for non-square bitmaps. The accompanying regression test covers a wide image case.

### **HTTP Brotli setup was consolidated** (d3ec5aa)
Brotli compressor construction now shares constants and a helper across the HTTP response paths, reducing duplication while keeping the same quality and window settings. This is mostly a cleanup, but it also makes the compression configuration easier to maintain consistently.

### **Release builds now use `panic=abort`** (1ebc47a)
Release Rust builds were switched to `panic=abort`, which should improve release binary size and simplify panic handling in optimized artifacts. This is a build/runtime tradeoff rather than a user-facing feature.

### **ICU data is no longer bundled twice** (8266125)
The core crate no longer includes an ICU data copy that’s now already bundled by V8, removing an estimated ~11MB regression from the upgraded engine. This is a meaningful size fix for shipped binaries.

### **Other misc changes**
- Dependency bump: `twox-hash` unpinned and updated to 2.1.2 (0eb9b05)
