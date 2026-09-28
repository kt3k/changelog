---
date: 2026-09-27
repo: oven-sh/bun
size: L
title: "S3 server lands; build and exit fixes"
excerpt: "Bun replaces MinIO for S3 tests, tightens Windows toolchain rules, and fixes process.exit() error behavior."
commits: 5
authors: [robobun, dylan-conway]
commit_authors: {"a4f1429": dylan-conway, "a7c73fd": dylan-conway, "1313ca6": robobun, "91c3182": robobun, "5de3ba4": robobun}
---

### **S3 tests move off MinIO to an in-repo Bun server** (5de3ba4)
Bun now runs the S3 suite against `test/packages/s3-server`, a dependency-free `Bun.serve` implementation that verifies signatures and emulates S3 behavior in memory. This removes the broken MinIO container dependency, restores coverage across platforms, and makes the test setup self-contained.

### **Build now requires matching LLVM major versions** (a4f1429)
Configure now fails early if clang’s LLVM and rustc’s LLVM are not the same major version, instead of carrying compatibility workarounds. That simplifies the build pipeline and prevents subtle cross-language LTO/tooling mismatches.

### **process.exit() now matches Node’s TypeError behavior** (1313ca6)
If `process.reallyExit` isn’t callable, Bun now throws a `TypeError` with the Node-compatible message `process.reallyExit is not a function`. The call also invokes `reallyExit` with `process` as `this`, fixing observable semantics for code that overrides or wraps it.

### **macOS console-write test accepts ENOTCONN** (91c3182)
The console write regression test now allows `ENOTCONN` on macOS when the reader hangs up mid-write. That reflects the kernel’s actual behavior and keeps the test from being flaky on Darwin.

### Other misc changes
- Rust platform-guard cleanup and dead-code/lint simplifications (a7c73fd)
- Build doc/comment updates and script refactors around the LLVM/toolchain change (a4f1429)
- Minor test harness/config updates related to the S3 server migration (5de3ba4)
