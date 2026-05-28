---
date: 2026-04-24
repo: denoland/deno
size: L
title: "Node compat gets faster, safer, and more correct"
excerpt: "Big node:compat and runtime fixes landed, including net/socket APIs, HTTP/2/TLS regressions, crypto OAEP validation, and a buffer pooling perf win."
commits: 26
authors: [nathanwhitbot, bartlomieju, Jah-yee, fibibot, nikicat, nathanwhit, ry]
commit_authors: {"4667850": nathanwhitbot, "6546151": bartlomieju, "ebb4cd9": fibibot, "e593ead": nathanwhitbot, "bca2fa2": bartlomieju, "b4bf672": nathanwhitbot, "d94dcc8": bartlomieju, "914afbd": nathanwhitbot, "63d0d8a": nathanwhitbot, "c166131": nathanwhitbot, "adc14d5": nathanwhitbot, "42e9ebc": nathanwhitbot, "44b0e04": bartlomieju}
---

### **Socket.resetAndDestroy and net option support land** (6546151)
Adds `Socket.resetAndDestroy()`/`_reset()` with a TCP RST path, plus support for `BlockList`, `AbortSignal`, `keepAlive`, `noDelay`, and stricter constructor validation in `node:net`. This closes major compatibility gaps for code that relies on Node’s socket lifecycle and connection filtering behavior.

### **HTTP/2 keepalive and allowHTTP1 regressions fixed** (44b0e04, ebb4cd9)
Fixes an HTTP/2 client deadlock by explicitly flushing the client preface and initial SETTINGS frame, and restores `allowHTTP1` fallback by importing the missing server symbols. Together these unblock real-world HTTP/2 usage patterns, including pre-created sockets and HTTP/1.1 clients hitting secure servers with `allowHTTP1: true`.

### **TLS large-body writes no longer stall on reused connections** (d94dcc8)
`enc_write_cb` now drains any leftover cleartext after a rate-limited chunk, so large HTTPS request bodies continue flowing instead of hanging with a “socket hang up.” A regression test covers keepalive-reused connections with 1KB, 64KB, and 256KB bodies.

### **RSA OAEP parameters are validated and normalized** (bca2fa2)
`publicEncrypt`/`privateDecrypt`/`privateEncrypt` now pass OAEP hash and label data through to the Rust crypto backend, normalizing WebCrypto-style hash names like `SHA-256` to Node-compatible forms. Invalid digests now fail cleanly instead of being accepted incorrectly.

### **fs.stat/lstat now honor throwIfNoEntry, and fs.Stats is deprecated** (e593ead)
Async `fs.stat` and `fs.lstat` now suppress `ENOENT` when `throwIfNoEntry: false`, matching Node’s callback behavior. The public `fs.Stats` export is also wrapped in a deprecation warning to align with Node’s DEP0180 behavior.

### **process.debugPort and process.env edge cases align with Node** (b4bf672, c166131, 914afbd, 63d0d8a, adc14d5)
Several API edges were tightened: `process.debugPort` now uses ToInt32 coercion, `process.env` rejects `Symbol` keys/values, invalid file URL path errors include the input URL, custom-promisified functions keep their original names, and `AggregateError` stacks hide an internal helper frame. These are mostly compatibility fixes, but they collectively reduce Node divergence.

### **Unicode/path and builtins behavior match Node more closely** (4667850, 42e9ebc)
`pathToFileURL()` now encodes more characters and handles Windows extended paths correctly, and builtin-module reporting was aligned for `module.builtinModules` / `getBuiltinModule`. This improves correctness for path conversion and module introspection across platforms.

### Other misc changes
- CI/reporting fixes and node_compat sharding updates (3 commits)
- Flaky test exclusions on Windows (2 commits)
- `fs.mkdir` string-mode acceptance
- `ERR_INVALID_CHAR` and `OutgoingMessage.prototype.write` fixes
- `http2` allowHTTP1 socket symbol import test coverage
- `tokio-eld` dependency bump
- `rusty_v8` version bump with upstream performance improvements
- `fs.writeFileSync` non-ArrayBufferView validation
- `node:buffer` transcode panic fix
- Misc error/message polish and internal cleanup
