---
date: 2026-10-31
repo: nodejs/node
size: L
title: "Node API crash fix, FFI GC safety, HTTP2 cleanup"
excerpt: "Shutdown crash fix for TSFN, safer FFI callback lifetimes, and an HTTP/2 memory accounting bugfix; plus a few doc and test updates."
commits: 6
authors: [legendecas, UlisesGascon, inoway46, christianaurichzm, joyeecheung, trivikr]
commit_authors: {"e97c75e": legendecas, "4c234f6": UlisesGascon, "80a74e1": inoway46, "d242f3d": christianaurichzm, "fe91868": joyeecheung, "d44625a": trivikr}
---

### **Fix TSFN shutdown reentrance crashes** (e97c75e)
`napi_threadsafe_function` shutdown could crash if finalization re-entered release logic while resources were being torn down. The fix changes the delete path to mark the TSFN closed before deletion and release resources in a safer order, backed by new shutdown coverage for concurrent and re-entrant release scenarios.

### **Keep registered FFI callbacks alive with their library** (d44625a)
Callback pointers returned by `registerCallback()` were just raw addresses, so dropping the JS `DynamicLibrary` could leave native code calling into freed trampoline memory after GC. The new ownership model keeps the library alive while callbacks are registered and adds tests/docs to ensure callbacks stay valid until explicitly unregistered or the library is closed.

### **Release queued HTTP/2 memory on stream cancellation** (80a74e1)
Canceled streams were still counted against the session's outbound memory budget, which could block later requests from using available capacity. This change frees that queued-data accounting during stream teardown so canceled uploads stop holding the session back.

### Other misc changes
- Deflake worker FileHandle transfer test for fd 0 by making the setup deterministic (d242f3d)
- Update release/security docs to remove obsolete CI lockdown steps (4c234f6)
- Clarify V8 major upgrade guidance for stable releases (fe91868)
