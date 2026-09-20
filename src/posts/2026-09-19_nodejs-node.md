---
date: 2026-09-19
repo: nodejs/node
size: L
title: "Big wins for perf, HTTP, TLS and APIs"
excerpt: "New Buffer and SEA capabilities landed alongside perf_hooks bigint metrics, HTTP allocation cuts, and an OpenSSL 4.1 TLS fix."
commits: 12
authors: [jasnell, mcollina, pimterry, marcopiraccini, soulee-dev, codebytere, panva, ayush23chaudhary]
commit_authors: {"97af3d7": jasnell, "01a7ef6": jasnell, "adc26bc": jasnell, "bca9bbe": pimterry, "c90c3dd": marcopiraccini, "1b2629d": mcollina, "78bb403": soulee-dev, "357ba2f": mcollina, "e98208b": codebytere, "4d1ab3e": panva, "22ab7d7": mcollina, "b125121": ayush23chaudhary}
---

### **Buffer gains `stringLength()`** (22ab7d7)
Adds `Buffer.stringLength(input[, encoding])`, the inverse companion to `Buffer.byteLength()`, returning the UTF-16 length a decode would produce without actually decoding. That’s useful for sizing streamed input and checking `MAX_STRING_LENGTH` up front, and UTF-8 handling matches the decoder’s invalid-sequence replacement behavior.

### **SEA can now mount a ZIP archive directly** (1b2629d)
Single Executable Applications gain `vfsArchive`, letting `--build-sea` embed a prebuilt ZIP as one reserved asset and mount it at runtime with a zero-copy VFS view. This makes packaging large, compressible asset sets more efficient and simplifies builds that already ship assets as an archive.

### **`performance.nodeTiming` now exposes bigint UV metrics** (97af3d7)
`uvMetricsInfoBigInt` was added so libuv’s 64-bit event-loop counters can be read without losing precision beyond `Number.MAX_SAFE_INTEGER`. The native path now fills both number and bigint views in one call, preserving the old numeric API while adding an exact one for long-running processes.

### **HTTP server response handling sheds per-request work** (357ba2f)
The server now caches repeated header/validation logic and reuses closures/listeners to cut allocations on every request. It also avoids rebuilding common header values and scans `rawHeaders` for key fields, which should reduce overhead on busy servers.

### **TLS hostname constraints stay correct on OpenSSL 4.1** (4d1ab3e)
Node now preserves CN-based name-constraint enforcement when OpenSSL 4.1 would otherwise skip it unless a DNS SAN is present. This keeps `tls.checkServerIdentity()` behavior aligned with prior hostname verification semantics and avoids a security regression.

### **QUIC sessions are torn down cleanly on worker termination** (bca9bbe)
QUIC binding data is now registered as cleanable so live sessions are destroyed before worker teardown reaches native cleanup. That fixes a shutdown path that could leave QUIC sessions dangling when `worker.terminate()` interrupts JavaScript close handling.

### Other misc changes
- Documented `node:ffi` call-path selection and internals (78bb403)
- Inspector now throws `ERR_INSPECTOR_NOT_AVAILABLE` instead of aborting when a worker connects without a parent inspector (e98208b)
- Deflated a flaky WPT timer guard to avoid late uncaught exceptions (c90c3dd)
- Fixed docs wording for `performanceNodeTiming.uvMetricsInfo` and added benchmark/test coverage for UV metrics bigint support (01a7ef6, adc26bc)
- Replaced `using` with `try-finally` in `diagnostics_channel` (b125121)
