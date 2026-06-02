---
date: 2026-03-13
repo: denoland/deno
size: L
title: "Node compat, watch, and env-file fixes"
excerpt: "A day of significant Deno compatibility fixes: N-API coercion, env-file handling, Node crypto/X509 cloning, watch restarts, and npm resolution."
commits: 13
authors: [bartlomieju, nayeemrmn, dsherret, KnorpelSenf]
commit_authors: {"7607cb2": bartlomieju, "8ac8de1": bartlomieju, "975db92": bartlomieju, "d3aaa24": nayeemrmn, "9ab5c0c": dsherret, "6c5ef85": bartlomieju, "ae8a10d": bartlomieju, "4da9f0b": bartlomieju, "5b7680f": bartlomieju, "653c3c5": bartlomieju, "7fa991e": bartlomieju, "7e58228": KnorpelSenf, "92ca1fe": bartlomieju}
---

### **Fix N-API object coercion on null/undefined** (7607cb2)
`napi_coerce_to_object()` now returns `napi_invalid_arg` for `null`/`undefined` before V8 can create a pending `TypeError`. That prevents the spurious unhandled-rejection behavior that was masking real N-API errors in downstream modules.

### **Restore `--env-file` parent traversal and make missing files non-fatal in `deno compile`** (8ac8de1)
The env-file path lookup now searches the expected candidate locations relative to the initial cwd again, instead of only using a single joined path. The compile path also handles missing/unreadable env files more gracefully, fixing regressions around embedded env vars and watch-related path resolution.

### **Improve Node `X509Certificate` compatibility and structured cloning** (975db92)
`X509Certificate` picked up Node-facing API additions like `signatureAlgorithm`, `signatureAlgorithmOid`, a corrected legacy object shape, and structured-clone support via the cloneable resource registry. This closes several gaps with Node’s crypto test suite and makes certificates safer to pass across `MessagePort`.

### **Align organize-imports output with `tsgo`** (d3aaa24)
The LSP’s import-organization behavior was adjusted to match `tsgo` more closely. This reduces editor/tooling drift for users relying on Deno’s organize-imports actions.

### **Fix bundled npm dependency resolution outside `node_modules`** (9ab5c0c)
Bundled dependencies are now resolved proactively instead of only after a failed lookup, which avoids cases where resolution silently picked the wrong package graph. This matters for package layouts that don’t use a conventional `node_modules` directory.

### **Add `%j` support to `console.log` formatting** (6c5ef85)
Console formatting now recognizes `%j` and JSON-stringifies the argument like Node.js does. Circular references are rendered as `[Circular]` instead of throwing, making logging behavior more compatible and less fragile.

### **Fire unload and process-exit hooks on watch restarts** (ae8a10d)
Watch-mode restarts now dispatch both `unload` and Node `process.on("exit")` handlers even when a script is interrupted mid-evaluation by top-level await. That closes a lifecycle bug where restart cleanup could be skipped entirely.

### **Consolidate more of `node:fs`** (4da9f0b)
Another chunk of the Node `fs` polyfill was folded into the main module, removing separate internal files and updating imports accordingly. This continues the larger fs consolidation effort and simplifies the module layout.

### **Enable structured cloning for `DOMException`** (5b7680f)
`DOMException` can now be cloned and sent through `postMessage()` by serializing its core fields and reconstructing it on the other side. That brings it in line with other structured-cloneable web platform objects.

### **Implement `crypto.generatePrime()` options and fix bigint prime checks** (653c3c5)
The previously stubbed `safe`, `add`, and `rem` options are now implemented for `generatePrime()`/`generatePrimeSync()`, and oversized candidates are rejected with proper OpenSSL-style validation. The patch also fixes bigint truncation in prime checking, which could otherwise produce incorrect results for large values.

### **Enable structured cloning for `CryptoKey`** (7fa991e)
`CryptoKey` objects now participate in structured clone and `postMessage()`, including non-extractable keys and multiple key types. The implementation clones the internal key material directly, avoiding dependence on public export APIs.

### **Speed up file diffing** (7e58228)
The formatter’s diff display switched from `dissimilar` to `imara-diff`, a faster algorithm for string diffs. This is a performance-oriented refactor aimed at making formatting output generation significantly quicker.

### **Remove extra `node:fs` exports** (92ca1fe)
Top-level `node:fs` exports were pared back to better match Node.js, removing constants and helpers that shouldn’t be surfaced there. This is a compatibility cleanup rather than a user-facing feature.

### Other misc changes
- Dependency bumps and lockfile updates
- Node resolver/cache plumbing refactors
- Test updates and expectation changes across N-API, watcher, npm, crypto, and WPT suites
- Internal cleanup around path handling, env loading, and fs helpers
