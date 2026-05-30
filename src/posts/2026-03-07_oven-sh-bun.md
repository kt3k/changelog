---
date: 2026-03-07
repo: oven-sh/bun
size: L
title: "Bun hardens Windows, SQL, and bundling"
excerpt: "Adds dynamic-import gating, fixes stdin/blob sizing and Windows crashes, and prevents SQL parameter overflows from panicking."
commits: 6
authors: [robobun]
commit_authors: {"e2b0d24": robobun, "d5d842d": robobun, "8d32227": robobun, "f70cca3": robobun, "b2e657e": robobun, "a6fe20e": robobun}
---

### **Dynamic imports can now be gated with `--allow-unresolved` (8d32227)**
Bun’s bundler now has a new `allowUnresolved` option and matching CLI flag to control which non-literal `import()`, `require()`, and `require.resolve()` calls are allowed through. It extracts template-literal “shapes” and matches them against glob patterns, making dynamic import behavior explicit instead of all-or-nothing.

### **HTML-referenced assets are now included in bundle manifests (a6fe20e)**
Assets referenced directly from HTML tags like `<link rel="icon">` and `<img>` were being emitted but omitted from the manifest’s `files` array, which could make `Bun.serve()` return 404s for them. This fix makes HTML asset tracking follow all import records so referenced files stay live and appear in the manifest.

### **SQL queries now error cleanly past PostgreSQL’s 65,535-parameter limit (d5d842d)**
Large batch inserts no longer crash with a Zig cast panic when they exceed the wire protocol’s 16-bit parameter limit. Bun now validates counts up front and returns a descriptive `ERR_POSTGRES_TOO_MANY_PARAMETERS` instead, which is much easier to diagnose and recover from.

### **Blob sizing no longer breaks pipe-backed stdin reads on Linux (e2b0d24)**
`Bun.stdin.exists()` and `Bun.stdin.size` were causing non-seekable stdin streams to be treated like empty files because `resolveSize()` fell through to `size = 0`. The fix preserves the unknown-size sentinel for pipes and FIFOs, restoring `Bun.stdin.stream()`/`text()` behavior.

### **Windows path resolution and exit handling are safer (f70cca3, b2e657e)**
Bun now returns `ENOENT` instead of panicking when Windows `realpath`/`readlink` unexpectedly yield a null pointer. It also switches process termination to `TerminateProcess()` to avoid NAPI addon crashes during `DLL_PROCESS_DETACH` cleanup.

### Other misc changes
- Windows null-pointer guards in `realpath`/`readlink` and safer process exit handling.
- Regression tests added for stdin/blob sizing, SQL parameter overflow, HTML manifest assets, and dynamic unresolved specifiers.
- Minor internal refactors and type/API plumbing for the new bundler option.
