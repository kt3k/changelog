---
date: 2026-08-03
repo: oven-sh/bun
size: L
title: "Bun lands N-API, bundler, and GC fixes"
excerpt: "Major N-API compatibility work, a bundler barrel fix, and several UAF/security-adjacent runtime repairs headline the day."
commits: 23
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"75ef319": robobun, "81dac41": robobun, "55e3461": robobun, "c126633": dylan-conway, "1f447a7": robobun, "9b99e7c": robobun, "e336819": robobun, "bb6a9d9": Jarred-Sumner, "2ed8ed6": robobun, "e71f6c3": robobun, "aaf5e8a": robobun, "eea2f7d": robobun, "804094f": robobun, "c8071f8": robobun, "dbd7e9a": robobun, "52af832": robobun}
---

### **Fix queued `Bun.serve` file EOF tasks to keep the stream alive** (75ef319)
`FileResponseStream` now takes and later adopts a reference for the deferred EOF task it enqueues after reading file slices. This closes a heap-use-after-free when a read error finishes the stream before the queued task runs, especially under transient disk/NFS/FUSE failures.

### **Propagate chained barrel namespace requests correctly** (9b99e7c)
The bundler now carries namespace requests through chained `sideEffects: false` barrels and explicitly seeds `export *` targets as full namespace requests. This fixes a nondeterministic build bug where output could claim success but emit chunks with unresolved exported bindings that fail at startup.

### **Make body/stream weak refs truly passive after GC** (aaf5e8a)
`ReadableStream` handling was reworked to use a real weak handle after the owning wrapper has taken over rooting, so aborted or collected streams no longer leave stale native pointers behind. This addresses a use-after-free class bug around fetch bodies and abort/cancel lifetimes.

### **Broaden Bun’s N-API compatibility with Node 26** (804094f, c8071f8, dbd7e9a, e336819, 55e3461, 81dac41)
A large N-API compatibility pass re-syncs the public headers from Node.js 26 and aligns validation/status behavior for several entry points. It also fixes edge cases around symbol creation, empty property names, primitive coercion in object operations, null checks, exception ordering, and threadsafe-function callbacks with no JS function supplied—important for addon compatibility.

### **Prevent worker/socket re-entry after termination** (52af832)
Worker and socket paths were tightened so JS is no longer re-entered once termination has already fired the trap. This avoids lifetime bugs where callbacks could run against objects that should already be considered shut down.

### **Stop a Windows `uv_spawn` abort on job-object failure** (c126633)
Bun’s vendored libuv bump changes `uv_spawn` so `AssignProcessToJobObject` failures return an error instead of aborting the whole process. That turns a hard crash on some Windows setups into a recoverable failure.

### **Upgrade WebKit and thread module type through analysis** (2ed8ed6)
Bun picks up a newer WebKit snapshot and updates its transpile/analyze pipeline to account for module type when tracking loaded modules. This is a substantial engine sync that fixes module-analysis correctness under `--isolate`-style flows.

### **Remove dead runtime and binding code** (bb6a9d9, eea2f7d, e71f6c3, 1f447a7)
Several large dead-code culls landed across runtime, bindings, and internal helpers, including Node error-code plumbing, iterator error types, inspector/webcore leftovers, and other unreachable symbols. These are mostly maintenance wins, but they also reduce complexity in areas that have had safety work recently.

### Other misc changes
- CI/workflow hardening and action version bumps
- Test refactors, deflakes, and concurrency/offline improvements
- Source-lint and expectations cleanup
- Minor internal comment/doc and import cleanup
