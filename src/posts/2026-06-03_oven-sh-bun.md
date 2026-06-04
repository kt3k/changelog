---
date: 2026-06-03
repo: oven-sh/bun
size: L
title: "Bun fixes DNS, fetch, Windows paths, and GC safety"
excerpt: "A mixed day of crash fixes and minifier polish: Windows path overflow, DNS UTF-16 handling, empty compressed fetch bodies, and setter type safety."
commits: 8
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"bf70cc7": Jarred-Sumner, "43fff14": robobun, "40d8c4e": robobun, "d2a6506": robobun, "79b5471": alii, "800c0e5": robobun, "5d9b84a": robobun, "a587949": robobun}
---

### **Fix Windows over-long path conversion to UTF-16** (43fff14)
Bun now guards UTF-8→UTF-16 conversion buffers instead of assuming they fit, preventing a crash when extremely long Windows paths are converted for `node:fs`. The fix adds checked conversion paths and regression coverage for the 49k+ character range that previously panicked.

### **Harden DNS lookup/resolve for UTF-16 strings** (d2a6506)
`Bun.dns.lookupService` and `Bun.dns.resolve` now convert string inputs through the UTF-16-safe slice path, avoiding a debug assertion when JS strings are backed by 16-bit storage. This closes a fuzzing crash and makes DNS argument handling work with strings from APIs like `TextDecoder("utf-16le")`.

### **Treat empty compressed fetch bodies as empty** (79b5471)
Fetch no longer tries to decompress a response that advertises gzip but sends zero body bytes, which previously surfaced as `ZlibError`. Empty compressed responses now resolve to an empty body, matching Node and fixing a real interoperability bug.

### **Collapse single-return arrow bodies during minification** (800c0e5)
The bundler now rewrites arrows like `{ return a + b }` into expression bodies when minifying syntax, producing shorter output that matches other tooling. The change is gated so runtime transpilation and `Function.prototype.toString()` behavior stay unchanged.

### **Fix type confusion in generated class custom setters** (5d9b84a)
Generated DOM-style setter wrappers now verify the receiver type before downcasting, instead of blindly assuming the `this` value is the expected class instance. That prevents heap corruption when setters are invoked through proxies, prototype tricks, or extracted accessor functions.

### **Stub `process.execve` inside the Fuzzilli REPRL wrapper** (40d8c4e)
The fuzzing REPRL harness now replaces `process.execve` with a no-op so fuzz cases can’t terminate the child process by design. That keeps deterministic fuzz runs from being misclassified as crashes while still testing the wrapper logic.

### **Fix resolver filename-store overflow under `--bun`** (a587949)
Bun’s resolver intern pool and related overflow list sizing were adjusted to avoid a panic once the filename store grows past the old hard limit. This removes a `--bun`-specific crash path that could be triggered by heavy resolution workloads.

### Other misc changes
- Removed stale `TODO(port)` comments and dead code across AST, bundler, and core modules (bf70cc7).
- Misc internal cleanup and test-only adjustments around the high-impact fixes above.
