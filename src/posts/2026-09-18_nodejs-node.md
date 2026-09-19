---
date: 2026-09-18
repo: nodejs/node
size: M
title: "Stream, fs, sqlite fixes land across Node core"
excerpt: "A mix of bug fixes tightened stream cleanup, cpSync symlink handling, sqlite URL validation, and inspector/trace-events behavior."
commits: 32
authors: [aduh95, araujogui, panva, isheludko, codebytere, inoway46, almuzahidseyam, IlyasShabi, pimterry, richardlau, haramj, zeexzeex, mcollina, kishore280, xia-chao, ac-mmi, christianaurichzm]
commit_authors: {"c636b05": codebytere, "0c8441f": pimterry, "37305e1": zeexzeex, "795585e": mcollina, "b691724": kishore280, "32597d3": xia-chao, "0bf9e9f": ac-mmi, "cb736cf": christianaurichzm, "25b205b": araujogui}
---

### **cpSync now dereferences nested symlinks correctly** (cb736cf)
`fs.cpSync()` now follows symlinks found inside copied directory trees when `dereference` is enabled, instead of only dereferencing a symlink passed as the top-level source. The fix also aligns destination handling for symlinked entries with the JS walk, including force/error-on-exist behavior.

### **Trace events now fail cleanly when no V8 platform agent exists** (c636b05)
`node:trace_events` no longer aborts or dereferences null when Node is embedded on a platform it doesn't own. The module now checks for an available tracing agent up front and reports `ERR_TRACE_EVENTS_UNAVAILABLE` with updated docs.

### **Inspector DOM storage reports real unavailability as an error** (37305e1)
`DOMStorage.getDOMStorageItems()` now returns a server error when the backing web storage can't be read, instead of pretending the store is just empty. Related storage-key resolution was also hardened to avoid throwing on unresolved paths.

### **Async iteration on half-open streams restores default destruction** (795585e)
Readable async iteration once again destroys half-open duplex/socket streams by default when iteration ends. Callers that want to keep the writable side open must now opt in with `iterator({ destroyOnReturn: false })`.

### **Child process spawn timeouts are cleared on spawn errors** (b691724)
`spawn()` now clears its timeout timer on `'close'`, not just `'exit'`, so spawn-time failures like `ENOENT` no longer keep the event loop alive until the timeout expires. This fixes a real cleanup leak after early OS-level spawn errors.

### **sqlite rejects unparsable URL-like paths instead of aborting** (25b205b)
`DatabaseSync()` and `backup()` now throw `ERR_INVALID_URL` when given an object whose `href` is not a valid URL string. That turns a process-aborting CHECK into a normal API error.

### **`FileHandle.read()` now coerces `length` like `fs.read()`** (32597d3)
Promise-based file reads now coerce non-number `length` values with `| 0`, matching the callback-based fs APIs. This prevents invalid inputs like `'1'` from reaching a native CHECK and aborting the process.

### **QUIC HTTP/3 stream internals get bug fixes** (0c8441f)
Two small HTTP/3 stream issues were fixed in the QUIC implementation, with a new regression test covering a uni-stream limit start failure. This tightens correctness around stream lifecycle edge cases.

### **`net.Socket` async iteration now destroys half-open sockets again** (795585e)
Readable async iteration on half-open duplex sockets once again tears down the socket after EOF, preventing a live handle from being retained after the peer disconnects. A targeted test covers the leak fix.

### **`stream.Duplex.from()` now cleans up on early return** (0bf9e9f)
When an async function passed to `Duplex.from()` resolves without consuming input, the duplex is now destroyed so pipelines can finish cleanly. This fixes a stuck-upstream teardown bug.

### Other misc changes
- Dependency bumps and vendored tool updates, including V8 and ESLint-related changes
- Build/tooling tweaks for shared libs, SIMDUTF, OpenSSL asm warnings, and CI/security workflows
- Test deflakes and small documentation/comment fixes
- Collaborator roster update
