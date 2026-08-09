---
date: 2026-08-08
repo: nodejs/node
size: M
title: "SQLite, TLS, QUIC, and WebCrypto fixes"
excerpt: "A busy day of correctness fixes across core APIs, plus docs and tooling updates."
commits: 17
authors: [panva, araujogui, pimterry, trivikr, Anshikakalpana, efekrskl, leah-1ee, theSnackOverflow, thisalihassan, Archkon, skdas20]
commit_authors: {"114e356": araujogui, "a876a12": pimterry, "52db874": panva, "862d994": araujogui, "98fd6cb": Anshikakalpana, "c59cd6b": pimterry, "f538f11": trivikr, "606356c": skdas20}
---

### **TLS client cert resumption now preserves auth state** (c59cd6b)
TLS 1.3 session resumption could incorrectly report `authorized: true` when a client certificate was omitted and `rejectUnauthorized: false` was set. The fix explicitly handles the no-peer-cert case during secure socket setup and adds a matrix test to keep resumed sessions aligned with the original handshake state.

### **QUIC stops buffering after STOP_SENDING** (a876a12)
A peer `STOP_SENDING` could leave buffered outbound data scheduled, creating an infinite loop on a buffering stream. This update unschedules the stream when write side shutdown is observed and adds coverage for the failure mode.

### **WebCrypto now enforces range checks on dictionary members** (52db874)
Several WebCrypto integer dictionary fields now use `[EnforceRange]`, matching WebIDL expectations and rejecting out-of-range values instead of coercing them. The added tests lock in the stricter behavior for both `deriveBits()` and the broader WebCrypto parameter surface.

### **SQLite backup and tag store input validation tightened** (f538f11, 98fd6cb)
`backup()` now rejects non-positive `rate` values, preventing zero-work jobs that could reschedule forever, and `createTagStore()` validates `maxSize` as a positive integer. These changes close correctness gaps at the API boundary and make bad inputs fail fast.

### **SQLite parameter binding docs were expanded** (114e356, 862d994, 606356c)
The SQLite API reference gained much more detail on parameter binding, finalized example statements, and clarified the bare-parameter default. This should make the module easier to use correctly, especially for users learning the tagged-template API.

### **Other misc changes**
- ESM text-format import handling adjusted to register the format only when enabled, with loader test coverage.
- Zstd pledged source size validation and error reporting improved for sync compression.
- Internal SQLite refactors for error creation and callback ownership.
- Misc test/doc/tooling updates, including commit-queue workflow tweaks and timer/libuv clock test cleanup.
