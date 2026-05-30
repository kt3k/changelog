---
date: 2026-03-25
repo: denoland/deno
size: L
title: "Deno tightens Node compat and event-loop plumbing"
excerpt: "Big Node-compat fixes, event-loop refactors, and a few resolver/CLI bug fixes landed alongside NAPI coverage and version bumps."
commits: 23
authors: [bartlomieju, denobot, dsherret]
commit_authors: {"5db85e4": bartlomieju, "bf581bc": bartlomieju, "357759f": bartlomieju, "34f7b23": bartlomieju, "8ae5320": bartlomieju, "29ce038": bartlomieju, "460cca9": bartlomieju, "b6f73d5": bartlomieju, "5a97b62": bartlomieju, "ffbe236": bartlomieju, "4fc7ee2": bartlomieju, "d54097a": bartlomieju, "ea9214c": bartlomieju, "ac6b68d": bartlomieju}
---

### **Event loop gets a shared Rust↔JS tick path** (5db85e4)
Deno consolidated timer processing, async op resolution, and nextTick draining into a single `__eventLoopTick()` path to cut JS↔Rust boundary crossings. This should improve runtime overhead and simplifies the event-loop plumbing while preserving Node ordering guarantees.

### **Node-API support expands with broader coverage** (34f7b23, ac6b68d, bf581bc)
The test suite gained substantial coverage for N-API utilities, data types, object operations, async work, worker termination, and edge cases like async cleanup hooks and recursive callbacks. This strengthens confidence in Deno's Node-API compatibility and makes regressions much easier to catch.

### **Compiled binaries now skip Node-to-Deno arg translation on self-spawn** (29ce038)
`child_process.spawn()` and `fork()` no longer translate Node CLI args when running inside a standalone compiled binary, avoiding Deno flags leaking into `process.argv`. This fixes self-relaunching compiled npm CLIs that previously misparsed their own startup arguments.

### **BYONM npm resolution now handles version mismatches and exact matches correctly** (8ae5320, b6f73d5)
The resolver now falls back to `node_modules/.deno/` when a physically installed package version doesn't satisfy the requested one, and it also prefers an exact match when the requested npm version is explicit. Together these fixes close real resolution bugs that could return the wrong package version in manual node_modules setups.

### **`child_process` now accepts raw file descriptors in stdio arrays** (ffbe236)
Node-style `stdio` arrays can now include numeric FDs, which are duplicated and wired into the child process instead of failing deserialization. That unlocks more existing Node patterns for process spawning on Unix and improves cross-compatibility for code that passes inherited descriptors.

### **HTTP/2 custom createConnection sockets work again** (6a9d927)
Deno added a path to open TCP handles from existing resources so `http2.connect({ createConnection })` can attach custom sockets properly. This restores compatibility for libraries like `@grpc/grpc-js` that rely on custom connection creation.

### **`.env` parsing now handles inner quotes correctly** (ea9214c)
The dotenv parser now finds the right closing quote in double-quoted values even when inner quotes appear before the real terminator. This fixes truncated env values and brings Deno closer to npm `dotenv` behavior.

### **CLI and lockfile UX get several targeted fixes** (357759f, 4fc7ee2, d54097a, 5a97b62, 460cca9, 8f1c771)
These updates remove a panic for invalid certificate-ignore values, correctly parse `--frozen` for `deno update`/`outdated`, shorten huge frozen-lockfile diffs, fix interactive picker arrow keys on Windows, restore Temporal types in `deno types`, and improve `stripVTControlCharacters` so OSC 8 hyperlinks are stripped properly.

### **Other misc changes**
- Release/version bump to 2.7.8 and V8 147.0.0
- Added linting to block new `Deno.*` usage in Node polyfills
- Refactored `deno_npmrc` to use `sys_traits` more directly
- Updated deprecated-package warning styling in npm installer
- Marked unsupported Node compat tests as ignored
