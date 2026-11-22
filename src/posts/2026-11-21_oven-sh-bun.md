---
date: 2026-11-21
repo: oven-sh/bun
size: L
title: "Bun lands URLPattern and deeper runtime fixes"
excerpt: "A big day: URLPattern moves to Rust, deep equality and object back-refs are fixed, plus server, blob, and HTTP/2/3 safety work."
commits: 5
authors: [dylan-conway, alii]
commit_authors: {"24e5faf": dylan-conway, "feccae1": dylan-conway, "b15f513": dylan-conway, "98eae32": dylan-conway, "74d8f30": alii}
---

**URLPattern is ported from C++ to Rust** (feccae1)
Bun’s `URLPattern` implementation now lives in Rust, replacing a much larger C++ surface and being marked `#[forbid(unsafe_code)]`. The port also updates bindgen and WebIDL handling so JavaScript sees the same behavior while the implementation is safer and more maintainable.

**Deep equality now matches properties by name** (b15f513)
`Bun.deepEquals` no longer treats inherited or out-of-order properties as equivalent by position; it now pairs keys by name across objects, Errors, and array symbols. This closes a correctness hole where different objects could compare equal depending on argument order.

**Native JS back-references are now owned by the wrapper** (24e5faf)
Classes that need to point back to their JS object now declare a `thisValue` field in `.bind.ts`, and codegen generates the cleanup/fill logic instead of requiring manual `finalize()` wiring. That removes a lot of error-prone ref bookkeeping and makes the ownership model explicit across JSC-backed classes.

**HTTP/2 and HTTP/3 callbacks keep their ref guard in release builds** (98eae32)
uWebSockets callback thunks now pass raw pointers instead of `&mut`, preventing LLVM from optimizing away the ref that keeps requests alive during writable/data/timeout/abort callbacks. This fixes a release-only lifetime bug that could free requests while their callbacks were still executing.

**Blob file-descriptor waiting gets three correctness fixes** (74d8f30)
The I/O loop and blob descriptor job logic were tightened up to avoid stale epoll tickets, a potential use-after-free, and a regular-file read path that could spin forever on `EAGAIN`. These are low-level fixes that make descriptor waits more reliable across platforms.

### Other misc changes
- Docs and internal skill guides updated for bindgen, WebIDL, and class ownership patterns
- I/O polling refactors and platform-specific `Pollable` cleanup
- Dependency/metadata tweaks and test updates around the above changes
