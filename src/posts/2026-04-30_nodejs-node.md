---
date: 2026-04-30
repo: nodejs/node
size: M
title: "URL crash fix and HTTP/2 compat gains"
excerpt: "Node hardens pathToFileURL(), exposes more HTTP/2 writable state, and updates build/ABI metadata."
commits: 5
authors: [rf-figma, NickNaso, richardlau, cookesan, ckerr]
commit_authors: {"fc192ee": rf-figma, "80e0f14": NickNaso, "66054cc": richardlau, "f625c4b": cookesan, "a7f487f": ckerr}
---

### **Fix malformed UNC hostnames in pathToFileURL()** (80e0f14)
`pathToFileURL()` now rejects malformed UNC hostnames instead of crashing the process. The fix returns `ERR_INVALID_URL` for bad input, closing a crash reported in issue #62546.

### **Expose more writable stream state on HTTP/2 compat responses** (f625c4b)
`http2` compat responses now surface `writableObjectMode` and `writableNeedDrain`, matching the underlying stream state more closely. This improves parity for code that inspects response backpressure and stream mode.

### **Ensure Rust uses the x64 macOS target during cross-compiles** (66054cc)
The build now passes an explicit Rust target for macOS x64 builds, including the Rosetta-based universal binary flow. This prevents Rust crates from being built for the wrong architecture during macOS package builds.

### **Other misc changes**
- Reserved NMV 148 for Electron 43 in the ABI registry (fc192ee)
- Added `<cstdlib>` and switched to `std::abort()` in `builtin_info.cc` for libc++ compatibility (a7f487f)
