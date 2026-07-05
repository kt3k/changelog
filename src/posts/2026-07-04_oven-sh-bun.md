---
date: 2026-07-04
repo: oven-sh/bun
size: L
title: "Bun hardens streams, install, and runtime edges"
excerpt: "Major fixes span Web Streams, fs.watch, install linking, crypto, and process.execve, plus several crash and correctness patches."
commits: 19
authors: [robobun, Jarred-Sumner, brunorodmoreira]
commit_authors: {"a6ed1a9": robobun, "800a66b": robobun, "be4f649": robobun, "cd2f702": robobun, "51074e3": Jarred-Sumner, "d6c952d": Jarred-Sumner, "39b4d34": robobun, "08c5bc9": brunorodmoreira, "c7ae04c": robobun, "92459cd": Jarred-Sumner, "4e3eeb5": robobun, "05d859c": robobun, "0f15244": robobun, "b28cf5b": robobun}
---

### **Web Streams rewritten in C++ and kept in lockstep** (92459cd)
Bun replaced its WHATWG Streams implementation with a pure-C++ version, removing the old JS builtin machinery and moving stream state into native code. This is a major internal refactor that should improve maintainability and performance while preserving the public streams API.

### **fs.watch on macOS no longer risks a shutdown crash** (51074e3)
A real macOS segfault in `fs.watch` was fixed by making the FSEvents loop synchronization-safe and retaining the CoreFoundation run loop during shutdown. This closes a crash path observed in CI when a watcher is closed from inside its own callback and the process exits.

### **process.execve now throws on failure instead of aborting** (800a66b)
`process.execve()` now surfaces syscall failures back to JavaScript as a catchable error instead of printing to stderr and aborting the process. That makes missing binaries, permission failures, and similar conditions recoverable and matches Node’s behavior.

### **install fixes stale isolated-store links and peer drift** (d8c375d)
The isolated installer now correctly rewires or removes global-store links when `globalStore` is toggled, instead of leaving `node_modules/.bun` pointing at stale shared-store paths. It also addresses peer-edge drift when loading `bun.lock`, preventing the second install from silently disagreeing with the first.

### **Bun.color fixes invalid round-trips for multiple formats** (be4f649)
Several `Bun.color` output modes were producing strings that could not be parsed back, including ansi-16, ansi-256, and HSL/LAB paths. Fixing this restores round-trip correctness for color serialization and avoids generating unusable output.

### **Readable.fromWeb() preserves chunk order** (cd2f702)
The stream adapter composition `Readable.fromWeb(Readable.toWeb(src))` no longer permutes chunks under load. This fixes a correctness bug in the Node stream interop path where chunk ordering could become unstable.

### **pipeTo() reduces per-chunk overhead and drains queued chunks in place** (d6c952d)
The Web Streams `pipeTo` hot path now avoids allocating a promise and reaction objects for every chunk, and it can drain already-queued chunks directly while the destination still has capacity. That should improve throughput and lower per-chunk overhead in common streaming workloads.

### **X509Certificate.checkHost() returns the actual matching SAN** (a6ed1a9)
`X509Certificate.checkHost()` now returns the certificate subject name that matched, rather than echoing the caller’s input. This matters for wildcard SANs and other ambiguous matches, where the return value is supposed to identify which entry was used.

### **spawnSync maxBuffer enforcement is now clamped correctly** (39b4d34)
Subprocess reads now stop at the remaining `maxBuffer` budget instead of overshooting it. This fixes a correctness gap where Bun could collect more output than allowed in `spawnSync` before killing the child.

### **CSS modules now scope animation-name references correctly** (08c5bc9)
CSS modules now rewrite `animation`/`animation-name` references to the hashed `@keyframes` name, matching the scoped definition. This fixes silent animation breakage when the declaration and keyframes no longer agree after CSS module hashing.

### **HTTP treats zero-length close responses as complete** (0f15244)
A `Content-Length: 0` response with `Connection: close` now completes cleanly instead of being treated as a failure or hanging. This also fixes S3 client writes through connection-closing endpoints and load balancers.

### **TLS loop buffer allocation now fails safely instead of crashing** (c7ae04c)
The TLS/socket stack now reports out-of-memory when the loop’s shared TLS buffer or related allocations fail, instead of later dereferencing null and segfaulting. The change also adds fault-injection coverage for this previously hard-to-hit path.

### **FileReader keeps its source pinned through on_reader_done** (4e3eeb5)
`FileReader::on_reader_done` now pins the source across user JS and its own tail cleanup, closing a use-after-free window similar to earlier fixes in sibling callbacks. This hardens a callback path that could otherwise free the backing object while still in use.

### **fetch aborts the request when the body reader is cancelled** (85300c)
Cancelling the response body reader now correctly aborts the underlying request. That restores the expected backpressure/abort behavior for streamed responses and fixes a regression previously tracked in issue #33227.

### **process.hrtime() now coerces tuple items with ToNumber** (05d859c)
Tuple elements passed to `process.hrtime()` are now converted with normal number coercion instead of being raw-cast to `int64_t`. This avoids assertion failures and bad numeric output for non-number inputs, bringing Bun in line with Node semantics.

### **shell pipe re-registration no longer risks a use-after-free** (b28cf5b)
A shell-side poll re-registration failure path was fixed so a failed `epoll_ctl(MOD)` during chunk reads no longer leaves a dangling object behind. This closes a fuzz-found heap use-after-free in the shell subprocess reader.

### **Other misc changes**
- Hardening round 11: broad input validation and bounds/lifetime fixes across the runtime.
- Deep-equality test matrix added for `assert`, `util`, and `Bun.deepEquals`.
- `bun install` message cleanup to remove pretty-markup tags from user-facing errors.
- `fs.watch`/stream/tls/install regression and fault-injection tests expanded.
- Bash/Zsh completion fixes and a vendor-update workflow tweak.
