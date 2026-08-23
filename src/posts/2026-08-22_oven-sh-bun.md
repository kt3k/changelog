---
date: 2026-08-22
repo: oven-sh/bun
size: L
title: "Bun lands install, ws, and runtime fixes"
excerpt: "Major install reliability work, new Argon2 support, several crash/UB fixes, and key websocket/stream runtime corrections."
commits: 50
authors: [robobun, Jarred-Sumner, dylan-conway, MarshallOfSound, alii]
commit_authors: {"01008f8": robobun, "469a7b4": Jarred-Sumner, "d9dae74": Jarred-Sumner, "d3e0769": robobun, "64092d4": robobun, "a4ed594": robobun, "5227f0c": robobun, "299bc9a": robobun, "b30c6ff": dylan-conway, "31e4479": robobun, "fe31fdc": Jarred-Sumner, "5ceb39d": Jarred-Sumner, "ae42135": Jarred-Sumner}
---

### **Install now treats cut-off downloads as failures** (469a7b4)
`bun install` now recognizes a tarball or manifest response that loses its connection before all `Content-Length` bytes arrive as a failed download, rather than misreporting it as a successful one. That closes a class of misleading errors and enables proper retry behavior across streaming extraction, buffered extraction, and manifest fetches.

### **Node crypto gains real Argon2 support** (31e4479)
`crypto.argon2` and `crypto.argon2Sync` are no longer stubs: Bun now validates Node-style parameters, marshals them through the native binding, and computes Argon2 outputs instead of always throwing `ERR_CRYPTO_ARGON2_NOT_SUPPORTED`. This is a major compatibility win for apps using modern password hashing APIs.

### **Bun.serve now aborts requests that die mid-dispatch** (a4ed594)
A request whose connection closes while its handler is still being dispatched now properly aborts instead of leaving `request.signal` silent and risking a later use-after-free. This fixes a serious server-side lifecycle bug that could leak pending requests and crash on delayed responses.

### **WebSocket proxy tunnel state is made borrow-safe** (ae42135)
The proxy-tunnel path for WebSocket clients was refactored to move mutable state into `Cell`/`JsCell` and use `ThisPtr`-based access instead of broad `&mut self` borrows. That reduces aliasing hazards in the TLS/proxy handshake path and makes re-entrant callbacks much safer.

### **Async iterator cleanup in web streams now propagates exceptions correctly** (b30c6ff)
The native web-streams implementation was reshaped so helpers propagate exceptions instead of catching and clearing them internally. This tightens error handling around iterator finalization, cleanup, and promise settlement, which should eliminate a class of swallowed errors and inconsistent stream teardown.

### **Cron jobs are rewritten around safer ownership** (fe31fdc)
`Bun.cron` job state was moved to `Cell`/`JsCell`, and the APIs that can free the underlying allocation now take `ThisPtr` instead of raw mutable pointers. That is a substantial internal safety refactor for subprocess-backed cron jobs and in-process timers.

### **Mach-O compile output now signs and truncates correctly on darwin-arm64** (5ceb39d)
The ad-hoc code signer now hashes the final partial page without zero-padding it and returns the byte count written so the caller can truncate the temporary executable to the signed length. This fixes a real macOS arm64 compile-and-sign failure that could invalidate the output binary.

### **node:net keeps the process alive during early unref’d connects** (d9dae74)
An `unref()`’d socket that is still connecting now keeps the process alive until the connection completes, matching Node behavior. This fixes silent premature exits in code that unrefs before `connect()`, including patterns used by test harnesses and containers.

### **bun test and bake get correctness fixes for async harnesses and coverage** (01008f8, 299bc9a)
The bake dev harness no longer pays a fixed one-second overlay poll per client action, and it now drains outstanding HMR acknowledgements before starting a new batch. Separately, parallel coverage aggregation no longer lets import-only workers mark executed functions as uncovered, fixing a misleading `--coverage --parallel` regression.

### **ws and stream/runtime compatibility improvements** (d3e0769, 64092d4, 5227f0c)
The built-in `ws` package now accepts `binaryType = "blob"` on server sockets, `handleUpgrade()` behaves correctly after an `await`, and iterator-result reads in stream internals now use structure access instead of generic property lookup. These are compatibility and performance wins that affect common websocket and stream-heavy code paths.

### Other misc changes
- CI workflow updates for linked-issue closing and the beta lane.
- Several install/package-manager output and behavior tweaks, including `--offline`, `--prefer-offline`, `--recursive` + `--global`, and workspace self-contained hoisting.
- Additional bug fixes in `ls`, `sql.close()`, `output` color selection, `fs.readdir` recursion, `import.meta.main`, `util.inspect`, `perf_hooks`, and terminal tests.
- Test-only updates, snapshot refreshes, docs, comment cleanups, and minor internal refactors.
