---
date: 2026-11-18
repo: nodejs/node
size: L
title: "QUIC, TLS and test runner fixes land"
excerpt: "Notable QUIC and TLS behavior changes, a new SEA source-map feature, and several test runner and fs bug fixes."
commits: 21
authors: [aduh95, Ethan-Arrowood, mcollina, MoLow, pimterry, Renegade334, christianaurichzm, lazerg, ravi-arnan, sxa, jasnell, MarcelCoding, gurgunday, efekrskl, sboettch, yohannesjoya]
commit_authors: {"9305353": mcollina, "b7df44b": pimterry, "d15ad82": christianaurichzm, "273f217": mcollina, "20a93ab": MoLow, "3e797cb": efekrskl, "1fb0cd6": yohannesjoya}
---

### **TLS renegotiation is now deprecated and opt-in** (b7df44b)
Node.js now documents TLS renegotiation as deprecated, with a new `allowRenegotiation` option to explicitly keep it enabled for clients and servers. The API docs and error text were updated, and tests cover the pending deprecation path and the new opt-in behavior.

### **QUIC now rejects invalid payload sizes up front** (d15ad82)
`maxPayloadSize` is now validated before a QUIC session is created, preventing invalid values from reaching ngtcp2 and causing runtime failures in release builds. The docs now spell out the supported range, and tests verify both boundaries and rejection of out-of-range values.

### **SEA with VFS can now load source maps** (273f217)
Single-executable apps using the virtual file system can now resolve bundled source maps, remap stack traces, and show original source lines from assets or the VFS archive. This adds a substantial documentation update plus new end-to-end tests for both inline-assets and zip-archive VFS paths.

### **QUIC stream close handling now distinguishes real errors better** (3e797cb)
QUIC stream/session close behavior was tightened so “no error” cases like idle timeout and some reset/stop-sending flows are handled more precisely, while true application and transport errors still reject as expected. The patch also updates the JS/native error plumbing and expands the QUIC error-code test coverage.

### **ReadableStream pipeTo keeps async context across resumption** (9305353)
`pipeTo()` now preserves the async context of the original call when the pump resumes after backpressure or queued chunks. This fixes context-sensitive behavior for downstream writes and pulls, with a dedicated regression test covering multiple resumption paths.

### **fs.opendir now validates `bufferSize` before opening** (1fb0cd6)
Invalid `bufferSize` values are now rejected synchronously before the native open call starts, so callers can catch the error and `fs.promises.opendir()` rejects cleanly instead of failing from an internal callback. The fix also adds coverage for getter-based option objects and non-enumerable properties.

### **`test_runner --rerun-failures` now scopes shared-helper IDs correctly** (20a93ab)
Rerun identifiers are now prefixed with the entry file when a test originates from shared helper code under process isolation, preventing failures from being replayed against the wrong file. The change updates the harness, reporter, utility helpers, docs, and adds regression fixtures for cross-file shared tests.

### Other misc changes
- `fs.existsSync()` now throws `ERR_INVALID_ARG_TYPE` for invalid argument types instead of returning `false`/warninging; DEP0187 moved to end-of-life.
- A new daily workflow triggers the devcontainer repo build from successful daily runs.
- AIX shared library export generation was fixed.
- Several test-only stability fixes: zlib zip interop, worker memory flakiness, GC net timeout, zfs host handling.
- Tooling/lint/build tweaks: coverage-windows env fix, HTTP lint rule update, duplicate shell variable cleanup.
- Minor docs updates for zlib output limits and test runner behavior.
