---
date: 2026-05-01
repo: nodejs/node
size: M
title: "Node refactors profiling, debugger, and Temporal"
excerpt: "A mix of internal refactors and a few bug fixes: FFI lifetime handling, Temporal intrinsics, and build/workflow cleanup."
commits: 8
authors: [aduh95, Renegade334, IlyasShabi, joyeecheung, semimikoh]
commit_authors: {"9ab960a": IlyasShabi, "6a94957": joyeecheung, "9c01018": semimikoh, "637a98a": Renegade334}
---

### **FFI dynamic libraries now stay alive with generated functions** (9c01018)
Fixes a lifetime bug where a `DynamicLibrary` could be garbage-collected while a function obtained from it was still in use. The new test covers the regression by forcing GC and verifying calls still work until the library is explicitly closed.

### **Temporal is included in frozen intrinsics** (637a98a)
Adds `Temporal` and its prototype objects to the frozen intrinsics list when Temporal support is enabled. This keeps the intrinsic snapshot consistent with other built-ins and avoids leaving Temporal objects mutable when the runtime freezes intrinsics.

### **Profiling helpers split out of `util`** (9ab960a)
Moves heap profiling serialization logic into new dedicated `src/node_profiling.*` files and updates the build to compile them. This is a substantial internal refactor that improves separation of concerns without changing public behavior.

### **Debugger probe logic moved into separate files** (6a94957)
Extracts probe/session helper code from `lib/internal/debugger/inspect.js` into new internal modules. The main inspector file shrinks dramatically, making the debugger code easier to maintain and reducing the coupling between startup logic and probe helpers.

### Other misc changes
- Tools and CI workflow cleanup, including OpenSSL matrix generation migration to Nix and skipping unrelated `test-linux` runs on tools-only changes.
- Temporal tests now use a shared `hasTemporal` helper instead of the V8 flag.
- Web Streams promise-handling utility simplified.
