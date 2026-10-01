---
date: 2026-09-30
repo: oven-sh/bun
size: L
title: "Bun patches HTTP, SQL, and VM edge cases"
excerpt: "A busy day of correctness fixes: HTTP proxying and response lifetimes, SQL transaction/TLS behavior, range handling, and crash fixes."
commits: 12
authors: [robobun, dylan-conway]
commit_authors: {"2722608": robobun, "6212450": robobun, "7fe13e1": dylan-conway, "5a183c1": robobun, "3b7ee8e": robobun, "bf42a52": dylan-conway, "7903ab6": robobun, "d115f54": robobun, "11c41c6": robobun, "a2bfbe4": robobun, "e70cca7": robobun, "2213a72": robobun}
---

### **node:http: prevent displaced responses from using freed sockets** (7903ab6)
Bun now tracks when a pipelined or replaced response is no longer the socket’s current owner, and cleans up handlers/socket state accordingly. This closes a use-after-free/segfault path and fixes response lifetime management in the server stack.

### **node:http: make proxy-tunnel failures behave like Node** (e70cca7)
Proxy CONNECT failures now stop handing a dead socket to the request path, matching Node’s error propagation more closely. The update also expands coverage around proxy URL behavior and error ordering.

### **sql: reject `begin()` when COMMIT is actually rolled back** (5a183c1)
`sql.begin()` now checks the server’s command tag instead of assuming the transaction committed successfully. That prevents callers from getting a success result for a transaction PostgreSQL already rolled back after an inner failure.

### **sql: treat `BunFile` TLS input as a CA certificate** (3b7ee8e)
Passing `tls: Bun.file("ca.pem")` now uses that file as the CA bundle for server verification instead of silently negotiating TLS without verification. This fixes an API mismatch that previously accepted invalid or missing CA material.

### **Bun.serve: honor `If-Range` for file and directory responses** (d115f54)
Range handling now respects `If-Range` across file, directory, and sendfile paths, falling back to a full response when the validator does not match. That prevents clients from stitching together bytes from different versions of a resource.

### **fix `import()`/hot reload races when a module is still loading** (7fe13e1, bf42a52)
The WebKit bump lands a crash fix for removing a module while its `import()` is still in flight, and the VM scheduler now cancels deferred work for dead realms. Together these harden Bun against a class of isolate, `vm`, and hot-reload lifetime bugs that were causing segfaults.

### **require(): stop asserting when cache entries disappear mid-failure** (2722608)
Bun no longer assumes a failing CommonJS load’s cache entry is still present when cleaning up. That makes `require()` errors catchable again in cases where the module or one of its children deleted the cache entry first.

### **FileSink and ANSI helpers stop aborting on edge cases** (2213a72, 11c41c6)
`FileSink` now runs the microtask checkpoint needed to finish piped JS streams, preventing truncated writes and hung promises. Separately, `sliceAnsi` and `stripANSI` now avoid aborts on large or adversarial inputs by handling allocation limits safely.

### Other misc changes
- CSS duplicate-rule merge fix and test coverage (6212450)
- `node:http` half-close refactor for `socket.end()` (a2bfbe4)
- WebKit version bump plus related typing/test updates (7fe13e1)
- SQL docs/tests and TLS precedence coverage (5a183c1, 3b7ee8e)
- Additional HTTP/runtime test expansion around the above fixes
