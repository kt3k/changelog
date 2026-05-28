---
date: 2026-05-27
repo: denoland/deno
size: L
title: "Crypto XOFs, bundle fixes, and net permission hardening"
excerpt: "Major crypto API expansion plus security and compatibility fixes across fetch, websocket, pack, bundle, and node compat."
commits: 16
---

### **WebCrypto gets modern hash and AEAD support** (2a4d1ba)
Deno’s `ext/crypto` now supports ChaCha20-Poly1305 and a first pass of the WICG “Modern Algorithms” additions: SHAKE, cSHAKE, TurboSHAKE, and SHA-3 HMAC variants. The implementation adds the new parameter dictionaries, wiring for XOF digesting, and a substantial test update, expanding the public WebCrypto surface in a meaningful way.

### **Browser-field package maps now work in bundling** (57853cb)
`deno bundle --platform browser` now honors object-form `package.json#browser` maps, including path remaps and `false`-disabled modules. That closes a long-standing gap where mapped entries were silently ignored, improving compatibility with browser-targeted npm packages.

### **Net permissions are enforced after DNS resolution** (3d6c614)
`fetch()` and `WebSocket` now check every resolved IP against the net deny list instead of relying only on the pre-resolution URL check. This closes a bypass where denied hosts like `localhost` could still connect after DNS returned a blocked address.

### **`pack` no longer injects `@deno/shim-deno` automatically** (fb6dc11)
`deno pack` stops silently adding the unmaintained shim dependency, removing the auto-detection path, the opt-out flag, and the generated `package.json` injection. This is a breaking behavior change for packed npm artifacts, but a safer one for users who do not want hidden runtime dependencies.

### **`package.json#sideEffects` is now respected in bundling** (f202457)
The bundler now consults the nearest package’s `sideEffects` field to decide whether a module can be tree-shaken. This should produce smaller bundles for packages that correctly mark side-effect-free files.

### **Node HTTP perf timing is skipped when nobody observes it** (6783347)
`node:http` server request paths no longer pay `performance.now()` overhead unless there’s a Node `PerformanceObserver` listening for `http` entries. That trims hot-path work while preserving observable performance entries when they’re actually needed.

### Other misc changes
- Deno 2.8.1 version bump and release metadata update (3e2030b)
- `fs.watch` now reports open failures via `'error'` instead of synchronous throws (e805fcd)
- `fs.watch`/`node:net` compatibility fixes for async ID handling and watch errors (f746b76, 12a12f2)
- `process.loadEnvFile()` now requires env permission (044bed8)
- `deno task` BYONM bin lookup now walks ancestor `node_modules/.bin` (1115186)
- Lazy-loaded globals now shadow correctly on inherited assignment (3cdfe7e)
- Regression test added for empty-buffer TLS write panic (a3c4b40)
- Minor perf/build/docs/test cleanup, including dropping an unused `deno_ast` bundler feature and a canvas README (2e016f4, e4be93c, 2a4d1ba-related support updates)
