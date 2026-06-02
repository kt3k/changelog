---
date: 2026-06-01
repo: oven-sh/bun
size: L
title: "Bun fixes CSS DoS, HTTP decoding, and crashes"
excerpt: "Major stability and correctness work: security-minded CSS limits, HTTP/form parsing fixes, Blob slicing, base64url cleanup, and crash fixes."
commits: 11
authors: [robobun, alii, Jarred-Sumner, sosukesuzuki]
commit_authors: {"5836485": robobun, "90f334a": Jarred-Sumner, "593dbaa": robobun, "b687fb3": robobun, "1f76618": robobun, "0a20577": alii, "ba71f3f": alii, "ffe20f4": alii, "5ac120c": robobun}
---

### **CSS minifier now blocks vendor-prefix output explosions** (1f76618)
A fuzzed nesting pattern could amplify a ~1.5 KB stylesheet into hundreds of megabytes by re-serializing vendor-prefixed rules at each depth. Bun now tracks duplicate prefix-pass output and throws a dedicated limit error before the minifier can balloon into a DoS-scale allocation.

### **`node:vm` cyclic module linking now throws instead of crashing** (5836485)
Linking and evaluating cyclic `SourceTextModule`s from inside the linker callback could hit JSC with an incomplete module graph and segfault. Bun now pre-walks the graph and returns `ERR_VM_MODULE_LINK_FAILURE`, matching Node and turning a hard crash into a catchable exception.

### **`bun update` output keeps Unicode arrows intact** (90f334a)
The pretty-format runtime path was re-encoding UTF-8 template bytes one byte at a time, turning arrows into mojibake on TTYs. This moves const format strings to compile-time formatting and fixes the byte handling so update output renders correctly.

### **HTTP response decompression now honors case-insensitive codings** (ba71f3f)
`Content-Encoding` and `Transfer-Encoding` values like `GZIP`, `Gzip`, and `x-gzip` were previously missed, leaving compressed bodies visible to JS. Bun now compares codings case-insensitively, which fixes a spec violation and makes `fetch()`/client response decoding behave like browsers and Node.

### **`formData()` accepts case-insensitive multipart metadata** (ffe20f4)
Multipart parsing no longer rejects valid content types just because `Multipart/Form-Data` or `Boundary=` used different casing. This brings Bun in line with the RFCs and lets more real-world uploads parse successfully.

### **Blob slicing no longer widens to the whole backing store** (0a20577)
A sliced memory-backed Blob could read or advertise bytes past its own slice length when size resolution fell back to the store end. The fix preserves the slice’s authoritative size, correcting streamed output and `Content-Length` for fetch/HTTP use.

### **Workspace script spawning stops use-after-free crashes** (5ac120c)
`bun run --parallel` was keeping borrowed `package.json` script bytes after the source package metadata had been freed, causing corrupted shell execution in workspace runs. The code now deep-copies script maps and package names so matched workspace packages remain valid for the whole run.

### **Base64url encoding now calls simdutf directly** (b687fb3)
Bun removed an unnecessary C++ shim hop and now encodes URL-safe base64 through simdutf directly from Rust. This simplifies the path and keeps `base64url` aligned with the native implementation while preserving behavior.

### **Optional unresolved deps with empty names no longer abort installs** (593dbaa)
An unresolved optional dependency whose manifest key was empty could incorrectly fail the whole install with `Invalid dependency name ""`. Bun now treats empty names as a non-escaping no-op, matching the lockfile/isolated installer behavior.

### Other misc changes
- Shared datetime parsing between MySQL and Postgres SQL code (1 commit)
- Updated WebKit upgrade instructions for the current build system (1 commit)
- Added ASAN detection plumbing for tests and harnesses, plus related test tweaks (1 commit)
