---
date: 2026-05-04
repo: oven-sh/bun
size: L
title: "Bun hardens sockets, resolver, and Windows paths"
excerpt: "Security fixes, crash fixes, resolver correctness, and a Windows binary-size optimization landed alongside a major src reorganization."
commits: 16
authors: [robobun, Jarred-Sumner]
commit_authors: {"e643d7b": Jarred-Sumner, "c8b4c36": Jarred-Sumner, "c18740d": robobun, "f116fbf": robobun, "7f22584": robobun, "f58cd4b": robobun, "f8fee8d": robobun, "191edc0": robobun, "b34c775": robobun, "bab007c": robobun, "4f13b9c": robobun, "31c4946": robobun, "a47ccff": robobun}
---

### **Fix heap overflows in Windows path normalization** (c18740d)
`normalizePathWindows` now checks buffer capacity before UTF-8/UTF-16 conversion and before every pooled-buffer copy/join path. This closes multiple out-of-bounds write sites on Windows and returns `ENAMETOOLONG` instead of overrunning fixed-size path buffers.

### **Retarget N-API globals during test isolation** (f8fee8d)
`bun test --isolate` now moves surviving `NapiEnv`s onto the new `JSGlobalObject` before the old one is unprotected, and also updates the test VM’s event-loop/global bookkeeping. This fixes crashes from deferred finalizers writing through stale global pointers during the next test file.

### **Fix accessor-indexed array crashes in process APIs** (7f22584)
`process.setgroups()` and `process.hrtime()` now handle sparse/accessor-backed arrays without segfaulting. The fix avoids assuming array elements are plain data slots, closing a crash class exposed by `Object.defineProperty` on array indices.

### **Resolver now accepts `@` inside wildcard export subpaths** (f58cd4b)
Package specifier parsing no longer treats every `@` in the full specifier as a version delimiter; it only scans the package-name portion. That restores resolution for wildcard `exports` targets whose matched subpath starts with or contains `@`, matching Node behavior.

### **Socket lifecycle fixes for client handlers and reconnects** (bab007c, a47ccff, 31c4946)
Several socket bugs were fixed together: Windows named-pipe `Bun.connect()` now marks standalone handlers as client-mode, closed client handlers are nulled after being freed, and synchronous connect failures now balance the earlier `ref()` even for reused sockets. These changes prevent use-after-free, heap overflows, and refcount leaks in net/socket teardown paths.

### **MySQL query strings are no longer double-ref’d** (f116fbf)
`MySQLQuery.init()` now takes ownership of an already-ref’d string instead of ref’ing again. That fixes a query-string leak that showed up with dynamically generated SQL and is covered by a new stress test using a mock MySQL server.

### **WebP now preserves ICC profiles end-to-end** (191edc0)
Bun’s image pipeline now carries ICC profiles through both WebP decode and encode, matching the earlier JPEG/PNG behavior. This prevents color shifts when converting images that rely on embedded color profiles.

### **`bun -p` returns the module completion value with top-level await** (4f13b9c)
`bun -p` now reports the final module completion value instead of the first yielded value from a top-level-await module. That fixes prints like `(await 1) + 1` evaluating to the wrong result.

### **Windows binaries get smaller with safer ICF/tail merging** (b34c775)
The Windows link flags now use safe identical-code folding plus string tail merging, and the thread-local path buffers were moved to lazy heap-backed storage. This trims the `.tls` bloat that was making `bun.exe` much larger than the Linux/macOS builds.

### **Build/repo restructuring and path fixups** (c8b4c36, e643d7b, 0a7bed5)
A large source-tree rename moved ~2,050 files into subject-area directories, followed by path/import/build-script fixups to keep the build green. This is mostly mechanical, but it’s a major internal layout change that improves long-term code organization and dependency boundaries.

### Other misc changes
- Build tooling and size-reporting scripts updated.
- Additional tests and fixture updates for the fixes above.
- Minor linker/build autofix and internal path cleanup.
