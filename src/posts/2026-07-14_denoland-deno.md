---
date: 2026-07-14
repo: denoland/deno
size: L
title: "Node, core, and web harden edge cases"
excerpt: "A broad day of safety fixes: tighter module boundaries, safer buffer handling, and several Node runtime crash/UAF fixes."
commits: 13
authors: [nathanwhit, bartlomieju]
commit_authors: {"ca368e2": nathanwhit, "fcfcfd2": nathanwhit, "744f06b": nathanwhit, "feac406": nathanwhit, "5154d79": nathanwhit, "ee133a4": nathanwhit, "34e7d74": nathanwhit, "25f763b": nathanwhit, "f8d8cff": bartlomieju, "44a4373": bartlomieju, "6a9d607": nathanwhit}
---

### **Lock down internal ext loaders from user-visible core** (ca368e2)
`Deno[Deno.internal].core` no longer exposes `createLazyLoader` and `loadExtScript`, which are capabilities meant only for internal extension modules. The internal core surface is now a frozen, null-prototype copy, preserving compatibility while keeping extension-loading hooks out of user reach.

### **Block user imports of internal ext modules after resolution** (25f763b)
The module map now rejects resolved `ext:`, `node:`, and `checkin:` specifiers when they are requested from ordinary file modules, even if loader resolution would otherwise allow them. This closes a boundary gap that also affected `node:vm` default-loader paths with caller-controlled filenames.

### **Support the Windows arm64 compile target** (f8d8cff)
`deno compile --target aarch64-pc-windows-msvc` is now accepted by the CLI allowlist. That unblocks a target that CI was already producing, so users can request it directly.

### **Harden SQLite against reentrant callbacks and conversion failures** (744f06b, 6a9d607)
`DatabaseSync.deserialize()` now returns `ERR_INVALID_STATE` if called while a user callback is active, preventing it from invalidating SQLite state mid-execution. Separate changes make `node:sqlite` treat JavaScript/property-conversion failures as normal catchable errors instead of assuming those conversions always succeed.

### **Fix several buffer/encoding range bugs in Node and web APIs** (fcfcfd2, ee133a4, 34e7d74)
Base64 encode/decode paths now validate offsets, lengths, and destination spans before writing, preventing out-of-bounds reads/writes and returning ordinary errors for undersized buffers. The fallback `encodeInto` result writer also rejects too-small output buffers before storing `read`/`written` counts.

### **Handle V8/serde deserialization exceptions safely** (feac406)
`serde_v8` now converts throwing getters, proxy traps, and failed string/property conversions into normal conversion errors instead of letting exceptions leak through unsafe unwraps. This makes deserialization paths more robust across maps, enums, and string handling.

### **Keep slow-op string coercions rooted through dispatch** (5154d79)
Generated slow-path ops now keep coerced strings alive for the full argument-conversion and call path, instead of relying on a shorter-lived scope. That prevents handles from going stale during coercion-heavy ops.

### **Prevent `napi_threadsafe_function` abort from double-freeing** (44a4373)
Abort now only marks the threadsafe function closing and wakes waiters; the actual free happens once the last thread releases its reference. This fixes a use-after-free/double-free hazard when aborting while other threads still hold the function.

### Other misc changes
- Guarded runtime usage-op output buffers against undersized slices.
- Protected `node:assert` source slicing against UTF-16/UTF-8 boundary bugs.
- Prevented worker bootstrap from retaining imported ops inconsistently.
- Added tests and small internal refactors across core, web, Node, SQLite, and N-API.
