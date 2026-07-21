---
date: 2026-07-20
repo: oven-sh/bun
size: L
title: "Windows fixes, Node compat, and cleanup"
excerpt: "Big day for Bun on Windows and HTTP compatibility: AppContainer/no-orphans support, timer precision, path/FS fixes, plus several security/compat fixes."
commits: 42
authors: [robobun, cirospaciari, dylan-conway, Jarred-Sumner]
commit_authors: {"6062448": robobun, "a4c1ddd": robobun, "432ee31": cirospaciari, "cb1e825": robobun, "7b1fb7f": robobun, "3979cbe": dylan-conway, "9f4682d": robobun, "1f71ec3": robobun, "f6c9474": robobun, "0278471": robobun, "86fc072": robobun, "a3b82c4": robobun, "84452b8": robobun, "02fde87": robobun, "f64cade": Jarred-Sumner, "0b0d17a": robobun}
---

### **Run Bun inside Windows AppContainer** (3979cbe)
Bun can now run inside Windows AppContainer / lowbox sandboxes, which is important for packaged apps and embedders that launch workers under restricted tokens. The change wires in the required Windows-side process, filesystem, resolver, and terminal handling plus a large test matrix.

### **Implement `--no-orphans` on Windows** (f6c9474)
`--no-orphans` / `BUN_FEATURE_FLAG_NO_ORPHANS` now works on Windows instead of being a stub. It uses a kill-on-close Job Object for descendants and a parent-process wait to exit when the launcher dies, matching the POSIX behavior closely enough to matter in supervisors and CI.

### **Fix HTTP/2 request header validation** (6062448)
Bun now rejects malformed HTTP/2 request blocks that Node/nghttp2 rejects, including empty `:path`, missing required pseudo-headers, and invalid CONNECT shapes. This closes a compat gap that could previously let invalid requests reach the handler.

### **Reject forbidden trailer headers in `node:http`** (7b1fb7f)
Request trailers can no longer smuggle `Content-Length` or `Transfer-Encoding` through Bun's HTTP parser. That brings Bun in line with Node's hard 400/clientError behavior and avoids accepting framed requests Node would reject.

### **Windows path, file, and timer correctness fixes** (0278471, 86fc072, 84452b8)
Several Windows-specific bugs were fixed: `path.resolve("C:foo")` now resolves drive-relative paths correctly, `NtCreateFile` disposition is derived from `O_TRUNC` instead of access mode, and timers now use a monotonic clock so wall-clock adjustments don't skew deadlines. Together these remove real cross-platform correctness issues in core APIs.

### **Windows and Node compatibility polish** (a4c1ddd, 432ee31, cb1e825, 9f4682d, 02fde87, a3b82c4, f64cade, 1f71ec3, 0b0d17a)
Bun picked up a batch of user-visible compatibility fixes: better `which` behavior for Windows reparse points, per-stream `console.inspectOptions`, Node-style `connect` error suffixes, `cd` semantics in shell, safer `process.dlopen` errors on Windows, and FFI support on Windows ARM64. Crash reports now record the running CLI command, and HTTP/3 client resets no longer trigger a use-after-free.

### Other misc changes
- High-resolution Windows event-loop timer accuracy via libuv update
- Redis timer lifetime refactor to prevent UAFs
- Multiple dead-code / redundant-guard cleanups across bundler, parser, HTTP, SQL, semver, shell, server, and JSC bindings
- CI/build annotation improvements for early-failing steps
- Dependency bumps and repo scaffolding cleanup (libuv, WebKit, TinyCC)
