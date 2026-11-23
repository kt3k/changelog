---
date: 2026-11-22
repo: oven-sh/bun
size: L
title: "Big runtime and build refactors land"
excerpt: "Major path, ICU, threading, and bindgen changes shipped alongside build/LTO updates and a Blob copy-file refactor."
commits: 8
authors: [dylan-conway, alii, sosukesuzuki]
commit_authors: {"a28f3a4": alii, "b6d1433": dylan-conway, "77c8fbd": sosukesuzuki, "25c4fca": dylan-conway, "e6da418": dylan-conway, "90ae36b": dylan-conway, "f9c5726": dylan-conway, "4ba1e77": dylan-conway}
---

### **Threading: fix futex condition lost wake-ups** (4ba1e77)
A deadlock in the futex-based condition variable was fixed so `notify_one`/`notify_all` can no longer leave waiters asleep forever on non-Windows platforms. The wait path was simplified to avoid re-sleeping after a wake race, and the wake logic was tightened to preserve the signal/epoch ordering.

### **Paths: unify path handling across backends and platforms** (f9c5726)
Bun now standardizes on a single `Path`/`OSPath` model with inline `StackPath` support, replacing several older path helpers. This is a breaking behavior change on POSIX: backslashes are treated as literal path characters in more places, matching Node-style semantics.

### **ICU: replace bundled C++ ICU pieces with Rust-backed code** (90ae36b)
Bun added a new `src/icu` crate and now replaces the ICU4C code it uses on Linux, Windows, FreeBSD, and Android with Rust implementations for the C APIs JavaScriptCore, WTF, and Bun actually call. This is a major internal rewrite that should reduce surface area and make the ICU integration more explicit and maintainable.

### **Bindgen callbacks now enter through `RefPtr`** (25c4fca)
Refcounted callback receivers now use `self: RefPtr<Self>` instead of a raw `ThisPtr`, making ownership explicit in generated bindings and runtime code. That tightens lifetime/refcount safety across HTTP, WebSocket, and install-related codepaths.

### **Scoped state helper added, removing lots of manual undo logic** (e6da418)
A new `bun_core::scoped` module introduces reusable scope guards for restoring fields and cells on drop. This removes a large amount of hand-written cleanup code across resolver, install, JSC, and threading code, lowering the chance of future state-restoration bugs.

### **Build: enable LTO everywhere and simplify platform-specific config** (b6d1433)
Release builds now enable LTO on the previously excluded platforms, and the build scripts/docs were updated to reflect that change. The build pipeline also picked up Windows arm64 linker support tweaks and a libuv patch, so this is a substantial packaging and performance-oriented build update.

### **WebKit AOT pin updated for RegExp and string fixes** (77c8fbd)
Bun pinned a newer WebKit revision that includes ahead-of-time compilation fixes for RegExp and String handling. That should improve correctness for AOT-compiled programs, especially around string-rope behavior and a Windows `vi.stubEnv()` edge case.

### **Blob copy-file refactor removes duplicate POSIX logic** (a28f3a4)
`CopyFile` was refactored into a single POSIX copy loop with shared settle/path helpers, deleting older retry and mkdir helper abstractions. The commit is explicitly behavior-preserving, but it trims code size and simplifies the blob runtime implementation.

### Other misc changes
- Miri test list updated for the new scoped helper.
- Documentation refreshed for build, paths, ICU, and package-manager backslash/path behavior.
- WebKit and build metadata hashes/pins updated.
- Minor lint/baseline inventory adjustments and small build-script tweaks.
