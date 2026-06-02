---
date: 2026-03-05
repo: denoland/deno
size: L
title: "Node compat, fs, and runtime fixes land"
excerpt: "Major Node-compat refactors, microtask ordering fixes, heap APIs, and a couple of security/stability patches."
commits: 16
authors: [bartlomieju, dsherret, kajukitli, denobot, crowlKats, CertainLach]
commit_authors: {"6c740b6": bartlomieju, "f19102c": bartlomieju, "f020655": bartlomieju, "0c84694": bartlomieju, "f1d7d0c": kajukitli, "9d90318": bartlomieju, "888568c": dsherret}
---

### **Node fs polyfills consolidated into internal/fs** (6c740b6)
Deno’s Node-compatible fs implementation was reorganized to mirror Node more closely: several small callback/sync helpers were inlined into `fs.ts`, promises logic moved into a new `internal/fs/promises.ts`, and stream internals now import `node:fs` directly. This is a sizable maintainability refactor that also reshapes the fs polyfill surface and updates the corresponding unit tests.

### **V8 microtask policy switched to match Node ordering** (f19102c)
Deno core now uses V8’s Explicit microtask policy so `process.nextTick()` runs before `Promise.then()`, matching Node behavior. The change also adds guards and manual checkpoints around module evaluation, dynamic import resolution, and FFI callbacks to preserve correct async ordering across the runtime.

### **Node compat test runner got a major overhaul** (f020655)
The `node_compat` runner was modernized to allow direct filtering of any Node test, even if it is not listed in config, and to generate clearer reporting. This should make it easier to run and diagnose individual Node-suite tests without maintaining extra config entries.

### **`node:v8` heap inspection APIs are now implemented** (0c84694)
Deno now exposes `v8.getHeapSpaceStatistics()`, `v8.getHeapCodeStatistics()`, `v8.getHeapSnapshot()`, and `v8.writeHeapSnapshot()` in the Node compatibility layer. That unlocks additional heapdump and V8 stats tests and fills a notable API gap for tooling that inspects memory usage.

### **Dynamic import panic on non-string error names fixed** (f1d7d0c)
A crash path was removed where a rejected dynamic import could panic if the thrown Error’s `name` property was not a string. This is a security/stability fix that prevents a user-controlled error object from terminating the Deno process.

### **TTY stdout/stderr writes are made synchronous** (9d90318)
`process.stdout` and `process.stderr` now use synchronous writes when backed by a TTY, avoiding races with `console.log()` output. The fix addresses output corruption in real-world CLI tools that mix async stream writes with synchronous console printing.

### **npm global install now points at the native binary** (888568c)
The npm install path was adjusted so `npm install -g deno` resolves the global bin entry directly to the native binary instead of `bin.cjs`. The publish workflow now verifies that behavior on both Windows and Unix-like runners.

### Other misc changes
- Docs: added GitHub Copilot instructions (.github/copilot-instructions.md)
- Release: bumped Deno to 2.7.4
- Cargo dependency updates, including aws-lc and rusty_v8 hash refreshes
- Deploy version lookup fix and env file watcher restart tweak
- Added GHA automation for daily issue/PR insights
- Updated deno_std submodule
