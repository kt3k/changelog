---
date: 2026-06-25
repo: nodejs/node
size: M
title: "V8 promise cleanup and emulator support"
excerpt: "Node backports V8 promise API removals, improves promise GC behavior, and adds build-time emulator support for cross-platform tool runs."
commits: 10
authors: [bakkot, tniessen, aduh95, tie, trivikr]
commit_authors: {"74567b2": bakkot, "32ae06e": bakkot, "b0fa732": aduh95, "4f177f1": aduh95, "a811c34": tniessen, "652d033": tniessen, "6bda0ab": tniessen, "b087e92": tie, "c612f35": trivikr}
---

### **Promise resolvers no longer keep resolved Promises alive** (74567b2)
V8 now stores a single `Promise|Undefined` slot instead of separate promise/already-resolved fields for resolving functions. That lets the GC collect a resolved Promise even if its resolver callbacks are still reachable, reducing accidental retention.

### **V8 promise reject/resolve-after-resolved APIs are removed** (32ae06e)
This backport removes the deprecated runtime hooks and public V8 API entries for `PromiseRejectAfterResolved` / `PromiseResolveAfterResolved`, and updates internal callers to return `undefined` instead. It’s a cleanup ahead of full removal of these events, so embedders should stop relying on them.

### **Configure can now inject an emulator for build tools** (b087e92)
A new `--emulator` configure option threads an emulator command through GYP so host-built helpers like `mksnapshot`, `torque`, and other generated-action binaries can run under emulation during cross-platform builds. This addresses a real build constraint for targets whose helper binaries can’t execute natively on the build machine.

### **X.509 parser now handles large RSA exponents** (652d033)
`GetExponentString()` no longer truncates or returns `null` for RSA public exponents that don’t fit in a single machine word; it now prints the full big integer via OpenSSL. That fixes certificate parsing for unusual but valid keys.

### **DH generator validation fixes very large values** (6bda0ab)
The DH generator check is adjusted so very large generators aren’t misclassified by `std::optional` ordering quirks. This prevents valid large values from being rejected during crypto parameter validation.

### **Misc crypto cleanup and test/build updates**
- Shared GitHub Actions workflow conversion for `build-shared` (b0fa732)
- Libffi updater script refresh (4f177f1)
- Minor `std::get_if` simplification in crypto DH code (a811c34)
- Test fixture adjustment to keep a finalization object alive through exit (c612f35)
