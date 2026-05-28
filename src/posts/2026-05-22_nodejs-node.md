---
date: 2026-05-22
repo: nodejs/node
size: M
title: "Node.js tightens probes and stream adapters"
excerpt: "Probe failures now surface clearly, Writable.toWeb avoids a drain race, and npm 11.15.0 plus FFI and build docs were updated."
commits: 8
---

### **Debugger probe failures now surface reliably** (3553a34)
Node’s probe-mode debugger now reports inspector-side mid-session failures instead of silently dropping hits or timing out with ambiguous results. The new error reporting adds `probe_failure`/`probe_timeout` terminal events plus extra `error.details`, making probe output much more actionable when evaluation is interrupted.

### **Writable.toWeb() no longer hangs on synchronous drain** (7e7bde8)
The Web Streams adapter now resolves backpressure correctly even if the underlying Node Writable emits `drain` synchronously during `write()`. This fixes a real hang scenario, especially with `highWaterMark = 0`, and is backed by a regression test.

### **FFI disposal now lives in the native layer** (ca37665)
`DynamicLibrary` cleanup was moved from JavaScript to the C++ binding, wiring disposal directly to the native `close()` implementation. That makes the lifecycle more consistent and reduces JS-side shim logic.

### Other misc changes
- npm upgraded to 11.15.0, with refreshed bundled docs and config references.
- Build docs added Rust toolchain install guidance for Temporal support.
- Nix build tooling now mocks extra Python helpers to improve V8 build reuse.
- TLS docs fixed a wording typo.
- Test isolation improved for rerun-failures state handling.
