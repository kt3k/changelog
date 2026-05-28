---
date: 2026-05-27
repo: nodejs/node
size: M
title: "Stream iterators, encoding, and a few fixes"
excerpt: "Notable bug fixes landed in streams, encoding, VM interception, FFI, and webstorage, alongside doc and CI cleanup."
commits: 12
---

### **Encoding fast path avoids duplicate UTF-8 validation** (4639dcb)
`TextDecoder` in fatal mode now uses a new `EncodeValidUtf8()` path instead of re-validating already-validated UTF-8 in `StringBytes::Encode()`. The change also broadens the benchmark to cover more input shapes, which should help measure the win more accurately.

### **Stream push iterators now settle pending reads on cancel/error** (7dbded2)
Pending `next()` promises on push-based async iterators are no longer left hanging when the consumer calls `return()` or `throw()`. This fixes a real cancellation bug by resolving reads with `done: true` on return and rejecting them with the thrown error on failure.

### **vm property definition interception now reports success correctly** (8257091)
`ContextifyContext` now returns the actual result of defining properties on the sandbox instead of always falling through to `kNo`. This brings interception behavior closer to expected `[[DefineOwnProperty]]` semantics and adds coverage for getter/setter and data-property cases.

### **FFI rejects `void` as an argument type** (31c40f0)
`node:ffi` now throws `ERR_INVALID_ARG_VALUE` if a function signature uses `'void'` as a parameter type, steering users toward an empty argument list for no-arg functions. That replaces a confusing internal assertion failure with a clear user-facing error.

### **Storage `length` getter now enforces its receiver** (fda667a)
The Web Storage `length` accessor is now bound with a signature so it throws a `TypeError` when called with an invalid `this` value. This fixes a crashy edge case and aligns the getter with normal built-in accessor behavior.

### Other misc changes
- FS `StatFs` docs clarified and expanded
- Scheduled GitHub workflows skipped on forks
- Stream lint fix
- ESM loader comment typo fixes
- Dependabot doc-kit bump
- Debugger probe timeout flake fix
