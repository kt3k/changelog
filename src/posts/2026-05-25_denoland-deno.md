---
date: 2026-05-25
repo: denoland/deno
size: L
title: "Timers, upgrades, and bug fixes land across Deno"
excerpt: "Multiple user-facing fixes: web timers were rebuilt on core timers, delta upgrades compressed patches, and several runtime/type bugs were patched."
commits: 13
---

### **Web timers now run directly on core timers** (860acab)
`setTimeout`/`setInterval` in `ext/web` no longer go through Node's `Timeout` class; they’re built straight on `core.createTimer`. This also adds explicit AsyncContext save/restore around callbacks and keeps the numeric timer-ID mapping in `ext/web`.

### **Delta upgrades now ship compressed bsdiff patches** (5d41c46)
The upgrade path now zstd-compresses generated `.bsdiff` artifacts before upload, dramatically shrinking the patch size. The client detects both the new zstd-wrapped format and older raw patches so existing published deltas continue to work.

### **Lazy-loaded ESM now survives concurrent imports** (96aeaf2)
A race in concurrent dynamic imports could drop shared lazy-loaded module sources and fall through to an unsupported `loader.load()` path. The fix keeps lazy ESM source available across loads and adds regression coverage for the concurrent import case.

### **Transpilation preserves JSDoc newlines after block comments** (a865b21)
`deno transpile` now post-processes SWC output to restore newlines after multi-line block comments, avoiding collapsed JSDoc like `*/ export function ...`. The pass is skipped when source maps are requested so generated mappings stay correct.

### **`--config` path resolution no longer panics on URL conversion failures** (31969b4)
Workspace discovery now propagates URL conversion errors instead of unwrapping them, fixing a crash when a config path or its parent can’t be turned into a `file://` URL on the host platform. Users get an error instead of a panic.

### **Brotli restored in DOM and webworker compression types** (e4c2fff)
The vendored TypeScript lib patches were restored so `CompressionFormat` again includes `"brotli"` in `lib.dom.d.ts` and `lib.webworker.d.ts`. This keeps `CompressionStream("brotli")` type-checking correctly after TS upgrades.

### **Node `fs.promises` wrappers drop stray extra arguments** (728239f)
Promise wrappers for callback-style `fs` methods now truncate surplus positional args before calling through, fixing cases like `paths.map(fs.promises.unlink)` that previously passed `index`/`array` into the underlying callback signature. This removes a real footgun in Node-compat code.

### **Node base64Slice now accepts omitted args** (5bd5a3b)
`base64Slice` was tightened to allow missing arguments, aligning the polyfill with expected Node behavior.

### Other misc changes
- Reverted the Node compile-cache polyfill surface and removed related startup env reads (54179d8)
- Fixed a panic when `--config` paths can’t be converted to URLs (31969b4)
- Updated the OpenSSL dependency (8f1411f)
- Disabled a flaky cluster deadlock test (64f41ef)
- Added a regression test for JSDoc `@example` handling with decorators (0204e21)
- Fixed a panic in `deno test --parallel` via dependency updates (f9182b4)
- Minor timer/internal refactor in `ext/web` (860acab)
