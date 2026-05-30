---
date: 2026-03-14
repo: nodejs/node
size: M
title: "Web Locks tracing and WebCrypto hardening"
excerpt: "Adds diagnostics for Web Locks, expands Wasm string-constant imports, and hardens WebCrypto against prototype pollution."
commits: 5
authors: [panva, IlyasShabi, nodejs-github-bot, guybedford]
commit_authors: {"1989f4d": IlyasShabi, "a936d89": guybedford, "65b521f": panva, "3e5a2f0": panva}
---

### **Diagnostics channels added for Web Locks** (1989f4d)
Node now emits `diagnostics_channel` events around `locks.request()` lifecycle points: start, grant, miss, and end. This gives observability into lock contention and failures without changing lock behavior.

### **WebAssembly ESM can import static string constants** (a936d89)
The Wasm ESM integration now supports the special `wasm:js/string-constants` import URL for defining static JS string globals. This extends string-builtins support and lets modules expose compile-time string constants directly.

### **WebCrypto hardened against Promise pollution** (3e5a2f0, 65b521f)
WebCrypto internals were updated to use safer primordials and `PromiseWithResolvers`, reducing reliance on mutable globals during async crypto jobs. A regression test now verifies subtle operations still work even if `Promise.prototype.then` is polluted, closing a prototype-pollution vector.

### Other misc changes
- Vendored googletest update (1 commit)
