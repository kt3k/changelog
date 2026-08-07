---
date: 2026-08-06
repo: nodejs/node
size: L
title: "Node adds aligned buffers, BlockList boost"
excerpt: "New Buffer alignment support, a fast/expanded net.BlockList, Windows HANDLE file streams, and several fixes across zip, dns, streams, sqlite, and zlib."
commits: 14
authors: [aduh95, araujogui, hyemimi, standard-Chan, joyeecheung, PickBas, jasnell, mcollina, lazerg, ronag, mike-git374, ndossche]
commit_authors: {"6c862f4": standard-Chan, "d9d4446": PickBas, "27d6cfa": jasnell, "295e4cd": mcollina, "ee64033": lazerg, "85d4755": ronag, "51c0d94": araujogui, "04c104a": araujogui}
---

### **Buffer.allocUnsafe gets alignment support (85d4755)**
`Buffer.allocUnsafe()` and `Buffer.allocUnsafeSlow()` now accept an optional `alignment` argument, letting callers request buffers whose backing memory starts on a chosen power-of-two boundary. This is useful for direct I/O and other native interfaces that require aligned memory, and the implementation adds new docs and coverage for the API.

### **net.BlockList gets a major performance and API expansion (27d6cfa)**
`net.BlockList` was substantially reworked for faster reads and writes, with shared-lock reads, bulk address insertion, storage/layout changes, and fast-path checks. The update also adds new capabilities like `clear()`, CIDR parsing, remove-range/subnet support, improved rule ordering, and benchmarking/tests to validate the new behavior.

### **File streams can now wrap raw Windows HANDLEs (d9d4446)**
`fs.ReadStream` and `fs.WriteStream` now accept a `windowsHandle` option, allowing Node to work with raw Win32 HANDLEs instead of CRT file descriptors on Windows. That opens the door to scenarios like inherited pipe handles from other processes, while enforcing platform and option-compatibility checks.

### **ZIP archive end detection is hardened against ambiguity (295e4cd)**
The ZIP reader now inspects all plausible EOCD candidates in the tail window and rejects archives with ambiguous endings instead of guessing based on trailing padding. This tightens validation for malformed or crafted archives and closes off a class of parsing ambiguity in `zlib`'s ZIP handling.

### **WritableStream abort now follows the spec more closely (6c862f4)**
Abort handling now re-checks stream state after signaling the controller, which fixes recursive abort behavior and makes the related WPT pass. Promise rejection logic was also narrowed so only still-pending close/closed caches are rejected, avoiding incorrectly touching already-settled promises.

### **SQLite StatementSync gains explicit close/dispose support (51c0d94, 04c104a)**
Prepared statements now have an explicit `close()` method and `Symbol.dispose()` support, making statement finalization deterministic and compatible with `using` declarations. The API update is backed by tests that verify finalized statements reject further use and that repeated disposal is safe.

### **DNS `setServers()` no longer crashes on port 0 (ee64033)**
`dns.setServers()` now handles `:0` server entries correctly instead of crashing when validating the port. The fix also adds coverage showing that port 0 is normalized to the default-port form returned by `getServers()`.

### **Other misc changes**
- Grammar/link/doc fixes in `worker_threads.md` and `buffer.md` (2 commits)
- Test timeout adjustment for a debugger probe race (1 commit)
- SQLite data-type and undefined-behavior fixes (2 commits)
- `pkcs11-store-test` workflow check fix (1 commit)
