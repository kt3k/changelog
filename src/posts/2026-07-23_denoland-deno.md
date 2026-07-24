---
date: 2026-07-23
repo: denoland/deno
size: L
title: "Telemetry, resolver, and core snapshot fixes"
excerpt: "Reentrant telemetry attrs, safer resolver hints, nonblocking FFI hardening, and snapshot size optimizations landed alongside several API/permission fixes."
commits: 10
authors: [nathanwhit, crowlKats, petamoriken]
commit_authors: {"922b951": nathanwhit, "562ff5c": nathanwhit, "39c22a2": nathanwhit, "0e01f14": crowlKats, "5b55d08": petamoriken, "b23cb76": nathanwhit, "18f5fe1": nathanwhit, "09994b3": nathanwhit, "8bf9ed4": nathanwhit, "c61f151": nathanwhit}
---

### **Telemetry now handles reentrant attribute conversion** (922b951)
The telemetry attribute converter was reworked to avoid holding mutable borrows while converting array-valued attributes, which fixes cases where getters recursively emit more telemetry. It also now keeps event/link targets stable and propagates JavaScript array getter errors instead of silently continuing.

### **Resolver stops showing sloppy-import hints for unrelated runtime roots** (b23cb76)
Sloppy-import suggestions are now scoped to modules that were actually part of the prepared graph, instead of probing the filesystem for runtime-created roots. That makes diagnostics consistent with how Deno prepares modules and avoids misleading hints for computed dynamic imports.

### **Nonblocking FFI rejects resizable buffers** (39c22a2)
Async FFI calls now validate backing stores up front and fail when arguments or out buffers are resizable by user JavaScript. This closes a race where a retained backing store could still move its data pointer after dispatch.

### **`Deno.umask()` now requires `allow-sys="umask"`** (09994b3)
The umask API moved under sys permissions for both read and set operations, and the permission model/docs were updated accordingly. This is a public behavior change for callers using `Deno.umask()` or the Node polyfill without the new permission.

### **Lazy ESM snapshot sources are no longer duplicated** (c61f151)
Snapshot serialization now tracks lazy ESM sources alongside lazy JS sources and preserves empty external-string slots for unconsumed entries. This trims snapshot sidecar size by avoiding duplicated bytes already present in the residual source table.

### **Resizable HTTP stream wrapper stays alive until unconsume** (562ff5c)
The Node HTTP parser now keeps the consumed stream wrapper reachable while it owns the read interceptor, then releases it when `unconsume()` removes that interceptor. This prevents the parser from holding a native pointer whose JS owner has already been collected.

### **Desktop browser window bindings are now properly typeable** (0e01f14)
The desktop `BrowserWindow` typings were substantially redesigned so binding arguments and return values are checked against serializable shapes instead of a looser JSON-oriented type. This should improve editor feedback and catch invalid handler return values at the call site.

### Other misc changes
- FFI nonblocking out-buffer handling now returns errors when backing-store validation fails.
- Snapshot source mangling enabled for release builds to shrink residual source tables (8bf9ed4).
- Internal linting migrated to Deno lint and `prefer-primordials` became an internal plugin (5b55d08).
- Cancellation-resource cleanup improved for early errors in DNS and TCP connect paths, with leak regression tests (18f5fe1).
- Small permission/type/test updates around umask and other unit coverage (09994b3).
