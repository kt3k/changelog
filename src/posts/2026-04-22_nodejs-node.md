---
date: 2026-04-22
repo: nodejs/node
size: M
title: "FFI tightens up; WebIDL and test_runner evolve"
excerpt: "FFI got safer and more consistent, WebIDL buffer checks sped up, and test_runner gained AbortSignal.timeout mocking."
commits: 16
authors: [joyeecheung, addaleax, abmusse, richardlau, DeveloperViraj, mcollina, aduh95, ShogunPanda, bengl, panva]
commit_authors: {"d1ac02f": DeveloperViraj, "fe41105": addaleax, "c69c6f1": addaleax, "3a53447": bengl, "f5808ed": panva}
---

### **FFI internals are hardened and aligned** (fe41105)
The FFI implementation was refactored to follow Node’s standard error-handling patterns, replacing several ad hoc validation helpers with `Maybe`-based flows. This is a meaningful internal cleanup that reduces inconsistency and should make the code easier to maintain safely.

### **FFI ArrayBuffer access is simplified and safer** (c69c6f1)
`ffi` now treats `ArrayBuffer`, `SharedArrayBuffer`, and views through a more unified path, and it explicitly forces backing-store access for small typed arrays before reading raw memory. That closes off a subtle unsafe-memory path and makes pointer/export handling more robust.

### **Mock timers now cover `AbortSignal.timeout`** (d1ac02f)
The test runner’s mock timers gained support for faking `AbortSignal.timeout`, so tests using timeout-based abort signals can now run under mocked time. This expands timer mocking coverage for modern async code.

### **WebIDL buffer-source checks were optimized** (f5808ed)
`internal/webidl` now uses a faster short-circuit path for rejecting `SharedArrayBuffer`-backed views, plus a new benchmark and broader tests. This is a performance-oriented internal change that should reduce overhead in WebIDL conversion hot paths.

### **FFI docs now warn about read-only memory** (3a53447)
The FFI docs were updated to explicitly call out that memory protection must be respected when exposing native memory as a `Buffer`. The accompanying test verifies that writing through an FFI-created buffer backed by read-only memory fails as expected.

### Other misc changes
- Build/V8 platform patches and a revert pair for AIX/ppc64 support.
- Restored undocumented fs patchability in the ESM loader for downstream compatibility.
- Added an FFI memory-protection docs/test follow-up.
- Moved a meta contributor entry to emeritus.
- Tooling workflow bumps and authoring tweaks.
- Added dependency update PR workflow bumps.
- Build/doc workflow changes to make addon verification dependency-free.
- Small docs/README and security wording updates.
