---
date: 2026-05-03
repo: nodejs/node
period: weekly
slug: 2026-W18
period_label: "Apr 27 – May 3, 2026"
size: L
title: "Node lands FFI, crypto, and protocol polish all week"
excerpt: "Major FFI and crypto refactors, HTTP/2 and URL fixes, plus faster startup snapshot handling and watch-mode improvements."
commits: 56
---

### **FFI gets faster and safer**
A big chunk of the week focused on the experimental FFI path: Node added a shared-buffer fast path for numeric and pointer-heavy calls, implemented `using` support for `DynamicLibrary`/`dlopen()` cleanup, and fixed a lifetime bug where libraries could be collected while generated functions were still in use. The internals were also tightened by turning `FFIFunctionInfo` into a `BaseObject` and moving callback ownership to `unique_ptr`, reducing memory-management risk.

### **Crypto is hardened and refactored**
Crypto saw both correctness fixes and a deeper internal split. Node fixed RSA publicExponent parsing for 4-byte values, rejected string input for raw key imports, and added compatibility guards for OpenSSL vs BoringSSL behavior. It also decoupled `KeyObject` and `CryptoKey`, moving `CryptoKey` implementation into `src` as groundwork for cleaner ownership and WebCrypto maintenance.

### **Protocol, URL, and watcher fixes**
HTTP/2 error handling was improved so session failures now surface correctly after GOAWAY, alongside a bundled nghttp2 upgrade and compat stream-state parity tweaks. On the web/platform side, `pathToFileURL()` now rejects malformed UNC hostnames instead of crashing, `--watch` now tracks worker entry files properly, and inspector network events stop duplicating absolute request URLs.

### **Startup, profiling, debugger, and config cleanup**
Startup snapshot callback handling was optimized to avoid quadratic `shift()` behavior, and profiling/debugger helpers were split out into dedicated internal modules to reduce coupling. `node.config.json` also became stricter by rejecting unknown fields, while `Temporal` was added to frozen intrinsics when enabled.

### **Other misc changes**
- llhttp updated to 9.4.1, adding relaxed header-value handling and packaging updates.
- V8 and npm were bumped, along with assorted CI/tooling dependencies and workflow cleanups.
- Rust cross-compile handling for macOS x64 was fixed.
- Minor docs, tests, and maintenance updates across the tree.
