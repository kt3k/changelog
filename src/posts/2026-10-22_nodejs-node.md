---
date: 2026-10-22
repo: nodejs/node
size: L
title: "Node lands sqlite, blob, VFS, and FFI fixes"
excerpt: "Several high-impact bug fixes: sqlite error propagation, blob size correctness, VFS live views/watch aborts, and an FFI handle leak fix."
commits: 13
authors: [aduh95, trivikr, araujogui, RafaelGSS, christianaurichzm, efekrskl, tamird, mcollina]
commit_authors: {"1bffd1d": araujogui, "fcb1aa8": trivikr, "44d5d57": trivikr, "a7e06d9": RafaelGSS, "1c12ff1": christianaurichzm, "e0619bb": trivikr}
---

### **sqlite: propagate option getter errors in Database constructor** (1bffd1d)
The SQLite `Database` constructor now stops immediately if any optional boolean getter throws, instead of continuing and potentially opening a database after a failed option read. That fixes the lost-exception bug and prevents side effects from constructors that should have failed.

### **src: avoid truncating Blob sizes to 32 bits** (1c12ff1)
Blob lengths now travel between C++ and JavaScript as full-width numbers instead of `uint32`, fixing incorrect sizes for files larger than 4 GiB. This also updates slice/storage paths to accept the real 64-bit sizes, which matters for large file-backed blobs and related APIs.

### **vfs: keep open memory handles in sync with file** (44d5d57)
Open in-memory VFS handles now behave like live filesystem descriptors instead of stale snapshots. Reads, `fstat`, writes, and truncation all resync against replacement content so concurrent changes made through another handle or the provider stay visible.

### **vfs: match native abort behavior in promises.watch()** (fcb1aa8)
Pre-aborted VFS watch iterators now reject the first `next()` with `AbortError`, then become exhausted, matching native `fs.promises.watch()`. Pending concurrent `next()` calls are also resolved consistently after the abort rejection.

### **ffi: fix handle leak in fast buffer arguments** (e0619bb)
The fast FFI buffer helper now opens a `HandleScope` for the whole call instead of leaking handles into the caller’s scope on optimized paths. A new test verifies repeated optimized buffer calls do not retain backing stores.

### **permission: reject wildcard env drops** (a7e06d9)
Dropping individual environment variables can no longer use wildcard references like `APP_*` or `*`; those now throw `ERR_INVALID_ARG_VALUE`. The change closes an API ambiguity by requiring callers to drop the whole `env` scope if they want to remove everything.

### Other misc changes
- Test runner watch mode marked stable in docs.
- Build/Nix tweaks around shared library `libname` defaults and `--error-on-warn`.
- QUIC removed obsolete `setOutbound()`.
- Test-only updates for SNI handling and finalization fixtures.
