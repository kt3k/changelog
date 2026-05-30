---
date: 2026-05-29
repo: denoland/deno
size: L
title: "Crypto PQ signatures, perf wins, key fixes"
excerpt: "Major new ML-DSA/ML-KEM support landed alongside startup, QUIC, npm, and test runner fixes."
commits: 44
authors: [divybot, bartlomieju, nathanwhitbot, nathanwhit, bddjr]
commit_authors: {"ff4275a": nathanwhitbot, "2da4f87": nathanwhit, "e27c380": divybot, "b5c0dbb": divybot, "2bef58a": bartlomieju, "cee0aeb": bartlomieju, "d1152a1": divybot, "2ad5e9e": divybot, "563357e": divybot, "f86cfef": divybot}
---

### **WebCrypto gains ML-DSA post-quantum signatures** (2ad5e9e)
Deno now supports ML-DSA-44/65/87 in `crypto.subtle`, including key generation, sign/verify, and import/export paths. This is a notable new public API surface aligned with the WICG modern algorithms proposal.

### **WebCrypto adds ML-KEM post-quantum KEM** (563357e)
The Web Crypto API now exposes ML-KEM-512/768/1024 for key encapsulation, backed by `aws-lc-rs::kem`. This brings post-quantum key exchange capability into Deno’s crypto stack.

### **Node startup gets leaner and faster** (2da4f87, ff4275a)
A large chunk of `node:*` polyfills was made lazy, especially stdio-, stream-, net-, tty-, and path-related modules, reducing the snapshot size and startup cost for programs that don’t touch them. Separately, trimming unused OpenTelemetry OTLP defaults shrinks the default dependency closure and binary size.

### **QUIC 0-RTT is re-enabled** (e27c380)
`Deno.connectQuic()` now caches the TLS client config per endpoint/config combination so rustls can safely reuse the verifier and client-cert resolver state required for session resumption. That restores client-side 0-RTT after the rustls upgrade disabled it.

### **npm hoisting now respects direct dependencies** (2bef58a)
The hoisted npm linker no longer lets higher transitive versions shadow packages the user requested directly. This fixes a correctness bug where `node_modules/<name>` could end up containing the wrong version under hoisted installs.

### **`deno run npm:<pkg>` can execute native package bins** (cee0aeb)
Deno now detects when an npm package’s `bin` entry points to a platform-native executable and runs it instead of handing the bytes to the JS loader. That unblocks CLI packages that ship compiled binaries rather than JavaScript entrypoints.

### **`deno test` handles `Deno.exit()` with buffered output safely** (d1152a1)
When `sanitizeExit` is disabled, tests no longer terminate the process immediately and risk dropping reporter output; instead the runner receives an exit event and can flush before exiting. This fixes a real flake source for exit-heavy tests.

### **Filesystem watchers now clean up shared watches** (f86cfef)
Closing a `Deno.watchFs()` watcher now unregisters its paths from the shared backend when the last interested resource goes away. This fixes leaking watches and duplicate events, especially on Windows.

### **`Deno.serve` rejects malformed Response-like returns** (b5c0dbb)
Serve handlers that return a Response-shaped object without Deno’s internal slot are now rejected instead of crashing the serve loop. That turns a runtime teardown into a normal user error.

### **Other misc changes**
- WSL-1 cache DB fallback no longer trips SQLite WAL protocol errors.
- `deno add` now errors cleanly if workspace discovery fails.
- `deno.json` workspace discovery now warns instead of hard-failing for non-member start dirs.
- `deno ci` now vendors type-only imports.
- Jupyter kernel path handling and nbclient compatibility fixes.
- Multiple regression tests added for LSP, REPL, watch mode, WebGPU, console, config resolution, and npm/type-check behavior.
- Smaller fixes in buffer, sqlite, resolver, bundle emit, doc linting, and `vm.Module.link()` cycle handling.
