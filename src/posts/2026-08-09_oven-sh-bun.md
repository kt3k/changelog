---
date: 2026-08-09
repo: oven-sh/bun
size: L
title: "Bun hardens HTTP2, resolver, and S3 paths"
excerpt: "Key fixes land for HTTP/2 reentrancy, wildcard export resolution, S3 XML parsing, and several async/file-read lifetime bugs."
commits: 16
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"5938918": robobun, "bc82018": robobun, "5458f37": robobun, "fb84417": robobun, "6a50e86": robobun, "01dc506": robobun, "cbc209f": robobun, "93217e1": robobun, "d2f48c6": dylan-conway, "9008ae7": robobun, "0c35ccc": robobun, "b6482a6": robobun, "9554a36": dylan-conway, "2db9afc": dylan-conway, "d8c1ef5": Jarred-Sumner}
---

### **HTTP/2 stream start is now guarded against reentrancy** (bc82018)
Bun now arms the dispatch guard around the `streamStart` JS callback so a nested `read()` can’t free the just-created stream box at dispatch depth 0. This closes a use-after-free window in `node:http2` when JS closes the stream from inside the constructor path.

### **Wildcard exports/imports can auto-resolve missing extensions** (5938918)
The resolver now probes extension variants for wildcard `exports`/`imports` targets that expand to extensionless or directory-like paths, instead of stopping at a generic not-found. This fixes common package layouts like `./dist/esm/*` and makes Bun match Node’s resolution behavior more closely.

### **S3 responses now use the XML parser instead of string scraping** (d8c1ef5)
S3 list/error/multipart response handling was switched from substring scans to real XML parsing, so escaped keys, prefixes, tokens, and error text are decoded correctly. This also trims a bunch of brittle ad hoc parsing and makes malformed XML handling safer.

### **Async file reads now keep completion state alive until cancellation** (d2f48c6)
Blob-backed file reads were reworked so the completion handler stays attached for the whole async lifetime, with an explicit cancel path when the VM dies first. That fixes real leak/lifetime issues around `Bun.file(...).text()` and worker teardown, including the reported LSan leak.

### **NAPI buffer creation now materializes stable backing storage** (9008ae7)
`napi_create_buffer` and `napi_create_buffer_copy` now allocate a real `ArrayBuffer` up front and wrap it in a `Uint8Array`, instead of relying on fast-mode storage. This keeps the returned data pointer stable for addons and fixes dropped writes for small typed arrays.

### **Async cleanup hooks keep ownership until the addon removes them** (0c35ccc)
The async cleanup-hook handle lifecycle was changed so the addon owns and frees the handle via `napi_remove_async_cleanup_hook`, even if the hook has already fired. That closes a use-after-free in teardown/finalizer ordering and matches Node’s completion signaling model.

### **Worker-terminate no longer frees zero-length read results incorrectly** (cbc209f)
A lifetime bug in `fs.readFile` / `fs.promises.readFile` during worker termination was fixed so zero-byte results don’t trigger a wild free on the worker or fs thread pool. This is a real crash fix for in-flight reads that resolve to empty output.

### **`bun run --parallel` stops waiting on orphaned pipe EOF** (01dc506)
Parallel/sequential runs no longer stall after the script exits just because a background helper still holds stdout/stderr open. On exit, Bun now drains what’s already buffered and force-closes leftover pipes so later scripts can finish promptly.

### **Resolver locking prevents stale DirEntry races** (6a50e86)
Directory-entry probes are now snapshotted under the resolver’s `entries_mutex` instead of reading a map that can be rewritten in place by another concurrent resolver. This fixes a segmentation fault in reload/build concurrency scenarios.

### **`Bun.openInEditor` now throws when no editor exists** (2db9afc)
The editor lookup path now correctly errors out when Bun can’t find or auto-detect an editor, instead of trying to spawn an empty command. That makes the API behave as documented and avoids silent failures.

### **`Utf8Stream` no longer emits `drain` after reopen** (9554a36)
A reopen/write race in the fast UTF-8 stream implementation was fixed so `drain` isn’t emitted at the wrong time. That resolves a flaky node/fs test on Linux and macOS.

### **`fs.readFile` drain timing is fixed for worker termination** (cbc209f)
A subtle worker termination race around empty file/pipe reads was corrected to avoid freeing the result buffer twice or after ownership has moved. This is a targeted crash fix rather than a behavior change.

### Other misc changes
- Updated c-ares to v1.34.8 and added a compatibility patch/tests (2dd1e97)
- Deflated graceful-stop drain test flakes on darwin (5458f37)
- Reordered and trimmed XML docs; fixed a stray control character in installation docs (93217e1, b6482a6)
- Fixed a `--parallel` IPC backlog drain regression test (fb84417)
- Fixed a node:http2 stream rehash regression test (bc82018)
- Added/expanded NAPI and worker lifecycle tests (9008ae7, 0c35ccc, cbc209f, d2f48c6)
