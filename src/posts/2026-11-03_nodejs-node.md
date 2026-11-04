---
date: 2026-11-03
repo: nodejs/node
size: L
title: "Node tightens iterators, FFI, and core deps"
excerpt: "Iterator result order is standardized across core, FFI gets GC fixes, and V8 plus native deps are refreshed."
commits: 20
authors: [nodejs-github-bot, bakkot, joyeecheung, trivikr, LiviaMedeiros, aduh95, RafaelGSS, GeoffreyBooth]
commit_authors: {"2265763": trivikr, "8309481": nodejs-github-bot, "c0abfea": bakkot, "b8aec5b": RafaelGSS, "c99ebf2": joyeecheung, "3b5e0d1": joyeecheung, "6920b08": GeoffreyBooth, "1b070ff": nodejs-github-bot, "70074c6": trivikr, "96de0e2": nodejs-github-bot, "73953d5": nodejs-github-bot, "168229f": nodejs-github-bot}
---

### **Iterator results now use `{ value, done }` everywhere** (c0abfea)
Core code paths were updated to construct iterator-result objects in the spec/V8-preferred order, including events, streams, fs promises, URL, and VFS watcher internals. This is a broad consistency and performance-oriented cleanup that also avoids relying on the less optimal property order.

### **FFI functions can now be collected, and `pointer` is defined safely** (70074c6, 2265763)
The FFI dynamic library wrapper now avoids pinning Fast API function templates in V8, so dropping a JS wrapper can release both the function and its backing library. A separate fix makes the exported `pointer` property an own data property, preventing inherited `Function.prototype.pointer` values from shadowing the native address.

### **V8 is patched to 15.6.75.33** (168229f)
Node picks up the latest V8 patch series, including changes in promise handling, compiler/runtime internals, and several new regression tests. This is a significant engine refresh with the usual bug fixes and behavior adjustments that come with a V8 upgrade.

### **Amaro is updated and loaded from its new internal entrypoint** (8309481, 6920b08)
Node updates amaro to 1.3.0 and adjusts its embedding to load `dist/internal.js` instead of the old top-level entry. This matches the package’s new layout and keeps the built-in TypeScript tooling working after the upstream packaging change.

### **Perfetto and simdjson are refreshed** (96de0e2, 73953d5)
Both bundled native dependencies were bumped to newer releases, bringing in large upstream code drops. These are mostly maintenance updates, but they can carry important fixes and compatibility improvements in low-level subsystems.

### **Fast API/permissions docs and build/tooling updates** (b8aec5b, c99ebf2, 3b5e0d1, d2812af, 3067a0a, db9d24a, 1b070ff)
Documentation around the permission model was clarified, and build/tooling inputs were updated for V8 preserve_most support, eslint-related package bumps, GitHub Actions, and nixpkgs pins. These are useful maintenance changes but not user-facing feature work.

### Other misc changes
- Added a benchmark for URLSearchParams iterator consumers, then reverted it.
- Minor iterator-result ordering fix in `vfs`.
