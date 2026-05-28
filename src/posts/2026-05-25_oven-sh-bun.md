---
date: 2026-05-25
repo: oven-sh/bun
size: L
title: "Cross-compiled macOS builds and hardening land"
excerpt: "macOS binaries now cross-compile from Linux, while the day also brings performance work, crash fixes, and broad input hardening."
commits: 11
authors: [robobun, Jarred-Sumner]
commit_authors: {"e262c99": robobun, "984bc1e": robobun, "cd1ad59": Jarred-Sumner, "fc26825": robobun, "8e6eefd": robobun, "1c6597b": robobun, "1950a3a": robobun, "7bd0861": robobun}
---

### **Cross-compiling macOS binaries from Linux** (8e6eefd)
Bun’s darwin build lanes now run on Linux hosts and produce the release macOS binaries via cross-compilation for both arm64 and x64. That shifts the build fleet model, updates CI agent selection, and keeps the macOS fleet focused on tests.

### **Broad hardening pass tightens validation across 36 subsystems** (cd1ad59)
Another large security-oriented sweep adds input validation, bounds checks, and lifetime tightening across install, networking, TLS, HTTP, shell, SQL, and several Node/web APIs. The change also introduces regression coverage for many of the fixes, reducing the chance of unsafe inputs turning into crashes or memory issues.

### **Port Bun.stringWidth to C++ with explicit SIMD** (1c6597b)
`Bun.stringWidth` moves out of Rust and into a new C++ implementation with explicit SIMD and generated grapheme-width tables. This is a major internals refactor that should improve maintainability around string-width handling while preserving Unicode-aware behavior.

### **Speed up FormData multipart serialization** (fc26825)
Multipart `FormData` serialization gets a focused performance pass: the boundary/content-type path now avoids repeated formatting and the joiner pre-reserves capacity. That directly targets the reported regression in `new Response(formData).formData()` and `.text()`.

### **Fix native helpers being registered as constructors** (e262c99)
Several internal Node and performance functions were incorrectly exposed as constructible and could crash when called with `new` or `Reflect.construct`. They now throw `TypeError` instead, matching expected JS behavior and closing a fuzzer-found crash.

### **Prevent shell glob aborts on missing directory prefixes** (7bd0861)
`Bun.$` no longer aborts the process when a glob’s directory prefix doesn’t exist; it now surfaces a normal no-matches error instead. The fix also preserves the real permission error for unreadable directories.

### **Fix quadratic transpiler hangs on duplicate-binding parse errors** (1950a3a)
The transpiler’s error-position tracking no longer degenerates on pathological duplicate-binding inputs, avoiding 20+ second hangs. This is a meaningful parser robustness fix with new coverage for interleaved diagnostic streams.

### **CSS custom pseudo names are re-escaped on print** (984bc1e)
Custom pseudo-class and pseudo-element names now serialize as escaped identifiers instead of being emitted raw. That fixes minify round-tripping for escaped names and prevents invalid CSS output.

### Other misc changes
- Blob ownership/drop and multipart body cleanup improvements
- TLS trust-store semantics and assorted hardening tweaks
- Keep-alive proxy test fix
- Windows transpiler fixture deepening for stack-overflow coverage
- Additional shell and module tests for the crash fixes
