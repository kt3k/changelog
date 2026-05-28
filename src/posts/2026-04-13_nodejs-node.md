---
date: 2026-04-13
repo: nodejs/node
size: L
title: "Temporal lands, QUIC and WebStreams expand"
excerpt: "Temporal becomes the default build path, with Windows support fixes plus QUIC, WebStreams, and test runner improvements."
commits: 11
authors: [omghante, richardlau, StefanStojanovic, Renegade334, MoLow, robertsLando, aduh95, Rohan5commit, legendecas, pimterry, MikeMcC399]
commit_authors: {"fc4b334": richardlau, "79c9149": StefanStojanovic, "9cae819": Renegade334, "c7d05fc": MoLow, "f01905a": pimterry}
---

### **Temporal support is now enabled by default** (fc4b334)
Node’s build now auto-detects `cargo` and `rustc` and turns Temporal on unless you explicitly opt out with `--v8-disable-temporal-support`. On platforms or configs where the Rust toolchain or ICU constraints make Temporal unavailable, configure now warns and disables it instead of failing immediately.

### **Windows Temporal builds are fixed** (79c9149)
This updates the Windows build plumbing so Rust crates are compiled with the correct MSVC target and then copied into the MSBuild-expected output path. It addresses a build failure for Temporal on Windows, especially around x64/arm64 cross-targeting.

### **QUIC gains stream destruction and endpoint listening state** (f01905a)
`QuicStream.destroy()` is now implemented and documented, and `QuicEndpoint` exposes a read-only `listening` property. The new lifecycle test coverage helps lock down the endpoint and stream behavior that was already expected by the API.

### **WebStreams now accepts SharedArrayBuffer sources in writable adapters** (9cae819)
The writable stream adapter now treats `SharedArrayBuffer` sources correctly in non-object mode, and compression chunk validation was tightened to reject SharedArrayBuffer-backed sources in the right cases. This fixes a real interop gap for buffer-source writes and adds coverage for both `Writable` and `Duplex` adapters.

### **test_runner now emits tracing events for OTel instrumentation** (c7d05fc)
The test runner now publishes to `TracingChannel`, enabling OpenTelemetry-style instrumentation to observe test execution. The change is accompanied by new docs and tests, making the diagnostics-channel integration visible and supported.

### Other misc changes
- Build cleanup: fix a stray LIEF define string, remove redundant GCC LTO linker-plugin flag.
- Test/CI tweaks: add a clean git-tree check after tests; generate `localstorage.db` in a temp dir.
- Docs/typos: clarify backport metadata behavior and fix a devcontainer guide typo.
