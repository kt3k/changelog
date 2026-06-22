---
date: 2026-06-21
repo: nodejs/node
size: L
title: "Domain migrates to AsyncLocalStorage"
excerpt: "Node.js fixes Writable.toWeb sizing and Windows rimraf behavior, while porting domain to AsyncLocalStorage and hardening crypto deprecations."
commits: 6
authors: [mcollina, panva, trivikr, PickBas]
commit_authors: {"ca406b2": mcollina, "2c4356c": mcollina, "b116861": panva, "b734ff5": trivikr, "665daeb": PickBas}
---

### **Domain now uses AsyncLocalStorage and removes `AsyncResource.domain`** (2c4356c)
The long-standing `domain` module has been ported from `async_hooks.createHook()` to `AsyncLocalStorage`, with lazy initialization and behavior preserved via `enterWith()` so exception handling still matches the old `domain.run()` semantics. The change also makes `AsyncResource.domain` throw `ERR_ASYNC_RESOURCE_DOMAIN_REMOVED`, formally moves DEP0097 to End-of-Life, and updates a broad set of domain tests and docs.

### **SHAKE digests now require an explicit `outputLength`** (b116861)
Node now treats SHAKE-128/256 digests without `options.outputLength` as unsupported instead of just deprecated, moving DEP0198 to End-of-Life. The crypto hash implementation drops the old warning path, and the docs/tests were updated to reflect the stricter API requirement.

### **Fix `Writable.toWeb()` backpressure sizing for non-object streams** (ca406b2)
`Writable.toWeb()` now supplies a `size()` function for non-object-mode streams so the Web Streams queue measures chunks by actual byte/character length instead of counting every chunk as `1`. That corrects `desiredSize` and backpressure behavior for typed arrays, strings, and buffers.

### **Fix Windows `fs.rm()` handling for `EPERM`** (665daeb)
`rimraf` no longer treats Windows `EPERM` as equivalent to `ENOTEMPTY`, which prevented recursive deletion from descending into directories that should have failed at the parent level. The new test covers the permission-denied case and verifies children remain untouched when `rmdir` returns `EPERM`.

### Other misc changes
- Tolerate duplicate watch events in a file-watcher test (b734ff5)
- Bump `piscina` in `/tools/doc` (2e19033)
