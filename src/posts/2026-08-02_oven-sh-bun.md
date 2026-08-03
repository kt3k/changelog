---
date: 2026-08-02
repo: oven-sh/bun
size: L
title: "Bun fixes sockets, sqlite, parser semantics"
excerpt: "Notable fixes landed for Windows net errors, SQLite close/query behavior, stream/socket lifetimes, and tsconfig class-field semantics."
commits: 42
authors: [robobun, Jarred-Sumner]
commit_authors: {"506945e": robobun, "f5689a2": robobun, "2309a18": robobun, "7ff33c3": robobun, "5c239c7": Jarred-Sumner, "2882c6c": robobun, "2acf291": Jarred-Sumner, "6ec38a7": robobun, "81a68d3": robobun}
---

### **Windows net.connect now reports the real failure code** (2309a18)
Bun now maps the underlying Winsock error instead of collapsing every failed `connect()` into `ECONNREFUSED`/`ENOENT`. That fixes incorrect error matching on Windows and unblocks tests that expect the specific socket failure, like `EADDRINUSE` and `ECONNRESET`.

### **Bun.serve no longer use-after-frees retained ServerWebSocket objects** (7ff33c3)
A retained `ServerWebSocket` can now outlive a stopped server without later calls like `publish()` hitting freed memory. This closes an ASAN-detected lifetime bug in WebSocket server shutdown.

### **SQLite close(false) keeps prepared statements alive, and query() becomes LRU-cached** (5c239c7)
`Database.close(false)` is restored as a graceful close mode for `db.prepare()` statements, while `close(true)` remains the “finalize everything now” path. The patch also adds a documented `MAX_QUERY_CACHE_SIZE` and makes `db.query()` use an LRU cache, which changes how statement eviction and reuse behave.

### **HTTP now parses token-list headers correctly** (2acf291)
`Connection`, `Transfer-Encoding`, `Content-Encoding`, and `Upgrade` are now treated as comma-separated token lists instead of whole-string comparisons. This fixes keep-alive pooling bugs and improves websocket/fetch header handling when multiple values appear.

### **tsconfig `useDefineForClassFields` is honored in the parser/transpiler** (6ec38a7)
Bun now threads `useDefineForClassFields` from tsconfig through parsing and transpilation instead of defaulting class-field semantics. This fixes long-standing TypeScript compatibility bugs where field initialization behaved incorrectly under `useDefineForClassFields: false`.

### **React compiler preserves `delete` and `typeof` semantics** (81a68d3)
The React compiler now carries `UnaryFlags` through HIR/codegen so `delete obj.prop` and `typeof undeclaredGlobal` keep their original runtime meaning. Without this, generated code could wrap expressions in a way that changed behavior.

### **Stream direct controllers stop throwing after close/cancel** (2882c6c)
After a direct readable stream is closed or cancelled, its controller methods now no-op instead of throwing `TypeError` from late producer callbacks. That makes terminal-barrier behavior consistent with user expectations and avoids post-close crashes in in-flight `pull()` logic.

### **Node `module._nodeModulePaths()` trims stray separators** (f5689a2)
Bun now strips trailing path separators before building Node module lookup paths. This fixes a CI flake where `_nodeModulePaths("")` could produce duplicated `...//node_modules` entries.

### **JSSink closes release native backing correctly** (506945e)
Prototype `close()` paths for JSSink wrappers now release the native backing instead of only detaching the JS shell. That prevents resource leaks for sinks like `ArrayBufferSink` and `FileSink` when the wrapper is later collected.

### Other misc changes
- Dead-code / refactor sweeps across C++, Rust, and JS internals
- Test flake fixes and expectation updates for spawn, fetch, install, VM, and websocket suites
- CLI/bundler/parser refactors collapsing dependent bools into enums
- macOS DNS resolver overhaul to use `DNSServiceGetAddrInfo`
- Minor docs and type-definition updates for SQLite and internal APIs
