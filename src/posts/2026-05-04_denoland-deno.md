---
date: 2026-05-04
repo: denoland/deno
size: L
title: "Deno deepens Node compat and speeds HTTP"
excerpt: "Major Node.js compatibility gains landed alongside an HTTP request-body fast path and broader runtime perf work."
commits: 30
authors: [divybot, bartlomieju, nathanwhit, littledivy, hunnyboy1217, mhrstmnn]
commit_authors: {"6cf098d": nathanwhit, "04e5db2": nathanwhit, "bfc3c88": bartlomieju, "05f52c3": bartlomieju, "19bd3d8": hunnyboy1217, "e84fc15": bartlomieju, "fa01b38": divybot, "8ec2df3": divybot, "5197c79": mhrstmnn, "ce3598e": bartlomieju, "a317222": bartlomieju, "bf42857": bartlomieju, "c86f92b": divybot, "1f0b5c8": divybot, "509eb54": divybot}
---

### **Node cluster support lands on Unix** (04e5db2)
Deno now implements `node:cluster` on Unix, wiring up IPC handle passing and the cluster worker/primary polyfills. This unlocks 68 additional Node compatibility tests and is a meaningful step toward fuller Node runtime parity.

### **HTTP request bodies skip the stream wrapper when already buffered** (6cf098d)
`req.json()`/`.text()`/`.bytes()` can now take a fast path when Hyper has already buffered the whole body, avoiding `ReadableStream` setup and related resource churn. The change also adds a new Rust op to drain buffered bodies non-blockingly, which should improve common small-request server performance.

### **Node crypto gains more Node-compatible key handling** (19bd3d8, c86f92b, fa01b38, 509eb54, 8ec2df3, 1f0b5c8)
A cluster of crypto fixes brought `node:crypto` closer to Node.js semantics: `CryptoKey` inputs are now accepted in key-creation APIs, JWK input paths are handled more consistently, and several PEM/PKCS#8/cipher edge cases were corrected. These changes unlock multiple compat tests and fix real interoperability gaps around key import/export and signing.

### **Node type/runtime defaults now include Node built-ins** (05f52c3, bfc3c88)
Type checking now includes the Node lib by default, and timer APIs return `NodeJS.Timeout` instead of `number`. That better matches Deno's runtime behavior and should reduce friction for codebases that rely on Node globals and timer typings.

### **Node module resolution now handles nested package.json safely** (5197c79)
The CommonJS resolver was adjusted to treat nested `package.json` files inside `node_modules` as part of the package root, while still preserving traversal protection. This fixes resolution for packages with subpath layouts and closes a module-resolution edge case.

### **More Node polyfills and lazy-loading perf work** (e84fc15, ce3598e, bf42857, a317222)
Large parts of the Node polyfill layer were converted to lazy-loaded scripts, reducing eager startup cost and breaking up some dependency cycles. Separate perf work also moved `ext/http`, `ext/process`, `ext/kv`, and `ext/webgpu` sources onto the same lazy-loading path.

### Other misc changes
- Reverted a flaky AES-128-ECB crypto fix.
- Added HTTP header/socket behavior fixes for specific Node compat tests.
- Tweaked update/lockfile behavior so `deno update --lockfile-only` preserves config.
- Minor CI/test config updates and one flaky Node compat test disablement.
