---
date: 2026-07-14
repo: nodejs/node
size: M
title: "TLS deprecations go end-of-life"
excerpt: "Node drops the legacy _tls_* public shims, widens fsPromises append/ write docs and tests, and picks up a V8 wasm fix plus toolchain deps."
commits: 11
authors: [nodejs-github-bot, bjohansebas, watilde, hkleungai, LiviaMedeiros, Renegade334, PickBas]
commit_authors: {"7a11a9b": bjohansebas, "3ac95f2": hkleungai, "7b2c63c": Renegade334, "ed6c3ac": nodejs-github-bot}
---

### **Legacy `_tls_*` modules reach end-of-life** (7a11a9b)
Node now treats `node:_tls_common` and `node:_tls_wrap` as end-of-life rather than runtime-deprecated, and the public shims are removed from the builtin/module exposure lists. This is a breaking API cleanup for anyone still requiring those internal-facing entry points; use `node:tls` instead.

### **`fsPromises.appendFile()` now accepts the same broader input types as `writeFile()`** (3ac95f2)
The docs were updated to reflect that `appendFile()` supports `TypedArray`, `DataView`, `AsyncIterable`, and `Iterable` inputs, matching the underlying `writeFile()` wrapper behavior. The accompanying test expansion significantly strengthens coverage for append/write parity across buffers, strings, streams, iterables, cancellation, and large writes.

### **V8 wasm jump-table emission fixes CET/x64 overflow** (7b2c63c)
This cherry-pick fixes a jump-table slot overflow in the x64 CET path by checking displacement before emitting any instructions and accounting for the CET entry marker size. It prevents a bad second emission attempt from starting at the wrong offset, which matters for correctness on CET-enabled builds.

### **libffi gets 3.7.1 with AArch64 and i386 closure fixes** (ed6c3ac)
Node updates bundled libffi to 3.7.1, including fixes for AArch64 large by-value struct handling and i386 THISCALL/FASTCALL closure stack-pop accounting. The diff is substantial and also carries new/expanded tests, making this a meaningful runtime correctness update for native addons and FFI users.

### Other misc changes
- `googletest` update with help/flag support changes.
- WPT syncs for `urlpattern` and `WebCryptoAPI`.
- Nixpkgs pin updates.
- ESLint rule addition and related function renames.
- Stale test status cleanup and a TLS doc typo fix.
