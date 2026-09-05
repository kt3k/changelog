---
date: 2026-09-04
repo: oven-sh/bun
size: L
title: "Bundler fixes headline a busy Bun day"
excerpt: "Big bundler and install fixes, plus worker, AsyncLocalStorage, I/O, and build-codegen updates."
commits: 23
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"814fa03": dylan-conway, "86b2e06": robobun, "5fb9ecb": robobun, "74326db": Jarred-Sumner, "3044dc6": robobun, "9fdcf5a": robobun, "4661e49": robobun, "f0bcb1a": Jarred-Sumner, "11fb51f": robobun, "f942cb0": dylan-conway, "2a64fab": Jarred-Sumner}
---

### **Bundler renamer stops collisions around hoisted vars** (2a64fab)
Bun's non-minified bundler now tracks where symbols are actually referenced, so nested bindings can keep their names unless an enclosing binding is truly used inside them. That fixes cases like a hoisted `var`, parameters, and catch bindings colliding with printed declarations and matches Node/Rollup behavior more closely.

### **Install lockfile string pooling no longer writes past counted bytes** (86b2e06)
`bun add` could panic while cleaning the lockfile because string insertion used a stored hash that didn't always match the bytes actually pooled. The fix keys insertion off the slice bytes themselves, and the lockfile loader recomputes package name hashes so reloads stay consistent.

### **Worker `online` now fires before user code starts** (9fdcf5a)
Bun now posts the worker's `online` event before running the entry point, matching Node's ordering and preventing listeners from missing early messages. This fixes hangs in code that waits for `online` before attaching `message` handlers.

### **`json()` now throws the buffered-path JSON.parse SyntaxError** (5fb9ecb)
The buffered stream-body path now preserves the same `JSON.parse` error shape as the non-buffered path instead of substituting a generic parse failure. That removes flaky test behavior and makes stream `json()` errors consistent across platforms.

### **AsyncLocalStorage no longer pins shadowed outer stores** (74326db)
Nested `run()`/`exit()` cases now replace an existing binding instead of leaving the outer store alive in the captured chain. This fixes a memory regression where timers, immediates, or promise reactions created inside nested scopes could retain large parent contexts longer than expected.

### **POSIX pipe writer errors leave the fd with the caller** (3044dc6)
When pipe writer startup fails, Bun now unregisters any poll it created without stealing ownership of the file descriptor. That prevents double-close/EBADF crashes in worker and spawn paths when startup registration fails.

### **`--filter` run now shows full output by default** (f0bcb1a)
`bun run --filter` no longer truncates each script to the last 10 lines unless `--elide-lines` is explicitly enabled. The change also sharpens missing-script reporting and improves multi-script terminal behavior.

### **Bundler no longer treats `#__PURE__` text inside `//` comments as an annotation** (4661e49)
Only real leading `__PURE__` markers in `//` comments now count, so quoted or later-in-comment text won't cause Bun to drop the next call. That avoids accidental code deletion in build output, including Angular-style comment text cases.

### **Workspace linking is centralized and lockfile reloads stay consistent** (f942cb0)
Workspace/package resolution now uses one shared rule for linking npm ranges to local workspaces, instead of deciding in multiple places. This tightens `bun install`, lockfile reloads, pruning, and workspace graph behavior so the same package links the same way everywhere.

### **Build codegen scripts can run under the configured JS runtime** (11fb51f)
Bun starts moving build-time codegen off a Bun-only assumption and onto the runtime selected during configure. That reduces the bootstrap dependency on Bun itself and fixes Node-compatible configure/codegen flows.

### **`require.extensions` leftovers are removed from JSCommonJSExtensions** (814fa03)
Bun deletes an old function-slot vector and its mutation/GC plumbing from `JSCommonJSExtensions`. The custom loader path has long since moved to Rust-side strong handles, so this trims dead machinery from the JSCore bridge.

### Other misc changes
- WebKit bumps/upgrades and related dependency pinning: 3 commits
- More build/codegen runtime-compatibility work: 5 commits
- CommonJS/bundler edge-case fixes and tests: 2 commits
- Misc internal/test/CLI tweaks across install, spawn, and workers: 1 commit
