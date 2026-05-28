---
date: 2026-04-22
repo: oven-sh/bun
size: L
title: "Bun hardens spawn and supercharges builds"
excerpt: "Spawn no longer closes caller-owned fds, Windows PCH/unified builds land, and a real UAF in auto-install is fixed."
commits: 8
authors: [Jarred-Sumner, robobun, cirospaciari, dylan-conway]
commit_authors: {"890ef5a": cirospaciari, "3453c22": dylan-conway, "dd6f468": Jarred-Sumner, "f344121": robobun, "7a4e667": robobun, "2cf54bf": Jarred-Sumner}
---

### **Spawn keeps caller-owned extra fds open** (890ef5a)
Passing a raw fd in `stdio[N]` now preserves ownership with the caller instead of letting `Bun.spawn` close it during subprocess finalization. This fixes fd reuse bugs after GC and updates the type surface/tests to reflect that extra stdio slots can be `null` when the fd isn't owned by Bun.

### **Auto-install fixes a dangling dependency pointer** (7a4e667)
The runtime auto-install path now copies dependency records to the stack before enqueueing work that can grow the lockfile buffer. That avoids reading freed/reallocated memory when a cached manifest triggers `Lockfile.Package.fromNPM`, closing a fuzz-found use-after-poison in package install resolution.

### **Windows build gets PCH and unified C++ compilation** (3453c22, 2cf54bf, f344121)
The build system adds WebKit-style unified C++ wrappers plus expanded precompiled headers, cutting translation units and speeding up C++ builds substantially. Windows now uses clang-cl-compatible PCH wiring, and one source is kept out of unification to preserve `fs.constants` parity on Windows.

### **POSIX builds stop compiling libuv unnecessarily** (dd6f468)
Vendored libuv is now Windows-only at build time; POSIX uses Bun's stubs/polyfills instead. This removes a redundant dependency build and link step from Unix builds without changing runtime behavior.

### Other misc changes
- More test files converted to concurrent/batched execution to reduce wall-clock time.
- Build script docs/configuration updated for unified sources and PCH changes.
- Spawn type/test coverage adjusted for extra stdio and IPC edge cases.
