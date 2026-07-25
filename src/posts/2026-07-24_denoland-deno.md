---
date: 2026-07-24
repo: denoland/deno
size: L
title: "Startup-order perf work lands across release CI"
excerpt: "Release builds now trace, relink, and verify startup function order on supported targets, plus several Node/WebCrypto compat fixes."
commits: 6
authors: [bartlomieju, nathanwhit]
commit_authors: {"150f9cf": nathanwhit, "9dcb61d": bartlomieju, "111ca9b": bartlomieju, "04dcb7e": bartlomieju, "89e420c": bartlomieju, "84c5999": bartlomieju}
---

### **Release builds now optimize startup function order** (150f9cf)
Deno’s release pipeline now does a two-pass build on supported Linux/macOS targets: it traces startup execution from an unstripped binary, generates a function order file, then relinks the release binary with that order and verifies the result. This is a substantial startup-performance change that should improve binary cold-start behavior while keeping the order artifact reproducible and checked in CI.

### **AbortSignal.any() now matches Node’s validation behavior** (9dcb61d)
`AbortSignal.any()` now tags its argument-validation failures with Node-compatible error codes and validates array members up front to produce the expected `signals[i] is not of type AbortSignal.` error. That tightens Node compatibility for a commonly used API.

### **WebIDL and TextDecoder errors now carry Node-style codes** (111ca9b)
Several WHATWG validation errors now attach Node error codes like `ERR_INVALID_ARG_VALUE`, `ERR_INVALID_ARG_TYPE`, `ERR_MISSING_ARGS`, and `ERR_ENCODING_NOT_SUPPORTED`. This makes `node:*` consumers see the same `err.code` values they would get on Node instead of generic TypeErrors.

### **util.diff is now implemented for Node compat** (04dcb7e)
Deno’s Node polyfills now include `util.diff`, backed by Myers diff logic. That fills in a missing public API used by Node-compatible packages and tests.

### **WebCrypto deriveBits(…, 0) now returns an empty buffer** (89e420c)
`SubtleCrypto.deriveBits()` now correctly treats a requested length of 0 as an empty result for PBKDF2 and HKDF instead of throwing `OperationError`. This fixes a WebCrypto spec compliance gap and avoids a crash path in the underlying derivation code.

### **Upgrade output test tolerates delta-upgrade logging** (84c5999)
The stable upgrade spec now accepts the extra line printed during delta upgrades. This is a test-only adjustment to keep the upgrade flow stable as the release process changes.

### Other misc changes
- Node/WebCrypto compat test expectations updated for a number of existing message/code differences.
- CI/test config updates to ignore or add several Node compat cases.
- Startup-order tooling, docs, and workflow scaffolding added for the new perf pipeline.
