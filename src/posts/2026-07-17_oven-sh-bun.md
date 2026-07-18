---
date: 2026-07-17
repo: oven-sh/bun
size: L
title: "SQLite lands, HTTP and parser fixes follow"
excerpt: "Big day: Bun ships node:sqlite, fixes several HTTP edge cases, hardens Postgres parsing, and patches runtime leaks and hangs."
commits: 27
authors: [robobun, cirospaciari, Jarred-Sumner, dylan-conway]
commit_authors: {"3219883": robobun, "8cac538": robobun, "1fbfe1d": robobun, "39c70a3": robobun, "12fd4f8": robobun, "b5f2d0a": robobun, "2acc042": robobun, "dd21594": robobun, "a215285": cirospaciari, "1b2bb4e": cirospaciari, "6618e7f": dylan-conway, "ea81736": dylan-conway, "6352b79": robobun, "73411ad": robobun, "78aa080": robobun, "bf9927f": robobun, "3655b03": robobun, "e835899": robobun, "3eaadbe": Jarred-Sumner, "8adb8de": robobun, "9d9fe3b": robobun, "8df2aa5": cirospaciari, "1d8b514": Jarred-Sumner}
---

### **node:sqlite is now fully implemented** (8df2aa5)
Bun adds the `node:sqlite` module and wires it into the build, shutdown path, and compat docs. The implementation brings the Node v26.3.0 test suite along with native backup/session-related APIs and macOS runtime gating, making SQLite a first-class Node compatibility surface.

### **Postgres row parsing now rejects malformed message overruns** (6352b79)
`DataRow`, `RowDescription`, and `ParameterDescription` decoding now bounds every read by the enclosing message length instead of treating overruns as a recoverable short read. This closes a protocol bug that could stall queries indefinitely or misparse later wire bytes.

### **HTTP and S3 close-delimited responses keep their metadata intact** (3655b03, 8adb8de)
The HTTP client now treats close-delimited responses more carefully, avoiding progress callbacks that expose partial bodies before terminal metadata arrives. The S3 response path also preserves response headers across later EOF callbacks, fixing a crashy class of responses without `Content-Length` or `Transfer-Encoding`.

### **HTTP/1.0 no longer gets broken chunked responses** (9d9fe3b)
When `Content-Length` is removed, Bun now falls back to close-delimited responses for HTTP/1.0 clients instead of advertising chunked encoding it cannot actually frame. That fixes a real interoperability bug with proxies like nginx.

### **`node:test` gets real `mock` access on `TestContext`** (1b2bb4e)
The test runner’s `TestContext.mock` now returns the shared mock tracker instead of throwing, unlocking more upstream Node test coverage. This is part of the larger push to match Node’s in-process test API.

### Other misc changes
- TLS half-close handling and TCP FIN behavior in `usockets` (8cac538)
- Human-readable `bunfig` type mismatch errors (1fbfe1d)
- `sliceAnsi` ellipsis fallback fix for zero-width-only ranges (12fd4f8)
- macOS ASAN dyld shim compatibility fix (b5f2d0a)
- Threading `WaitGroup` race fix on shutdown (2acc042)
- GC leak fix for `http.ClientRequest` once-wrappers (dd21594)
- Test runner log grouping improvement (6618e7f)
- macOS `recvmsg_x`/`sendmsg_x` version gate tightened (ea81736)
- macOS DNS `FilePoll` slot leak fix (c9d3c6e)
- Chunk-extension size cap enforced uniformly and related parser cleanup (39c70a3)
- Multipart form-data parsing compatibility fix (bf9927f)
- JSX tsconfig automatic-runtime selection fix (e835899)
- Worker stdout/stderr hang fix when streams are never consumed (3219883)
- JSCTaskScheduler deferred-work cleanup fix (73411ad)
- usockets allocator routing under non-ASAN builds (78aa080)
- `node:http` compatibility fix for malformed chunked responses on HTTP/1.0 (9d9fe3b)
- Node compatibility test coverage expansion and assorted doc/review updates (a215285, 3eaadbe, 1d8b514)
