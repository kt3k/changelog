---
date: 2026-08-29
repo: oven-sh/bun
size: L
title: "Bun tightens build, compile, and runtime behavior"
excerpt: "Major fixes span TLS startup performance, compiled executable startup, Windows errno handling, shell expansion, and bundled type compatibility."
commits: 14
authors: [dylan-conway, robobun, Jarred-Sumner]
commit_authors: {"ed950b8": dylan-conway, "f189103": dylan-conway, "7ad2d6e": dylan-conway, "1ab272b": robobun, "141df3e": dylan-conway, "85de256": Jarred-Sumner, "b49398c": dylan-conway, "0fbdf0d": robobun, "13c02e1": robobun, "c89fc95": robobun, "17e16cf": robobun, "d696a7a": Jarred-Sumner, "5fba7bd": dylan-conway, "2b3f660": dylan-conway}
---

### **TLS startup gets much faster with lazy root CAs** (85de256)
Bun now embeds Mozilla root certificates as DER and parses them lazily, instead of decoding and sorting 121 PEM roots on the first TLS connection. The change also adds SIMD-accelerated base64 for certificate PEM handling and bumps BoringSSL, cutting cold-start TLS overhead by milliseconds.

### **Compiled executables load embedded modules more consistently** (b49398c)
`bun build --compile` now resolves `Worker`, `import()`, and `require()` specifiers against embedded modules in a unified way, including Windows. This fixes cases where the same embedded file was found or missed depending on path spelling or API, which matters for standalone apps that rely on bundled workers or dynamic imports.

### **Windows error handling stops turning real failures into success** (2b3f660)
Windows errno mapping was overhauled so unmapped Win32 error codes no longer collapse to `SUCCESS`; they now surface as `EUNKNOWN` instead of making APIs like `fs.copyFile` report success after a failed operation. A follow-up refines `Win32Error::get()` to unwrap `FACILITY_WIN32` HRESULTs correctly rather than saturating them away. 

### **Shell command substitution no longer splits assignment values** (0fbdf0d)
The shell now treats command-substitution output in assignment contexts like `NAME=$(...)` and `export NAME=$(...)` as an assignment value instead of field-splitting it into multiple argv words. This brings Bun’s shell behavior in line with bash/dash for common environment assignment patterns.

### **TypeScript DOM globals now defer to lib.dom when present** (1ab272b)
`bun-types` stops forcing its own `Event` and `EventTarget` shapes when `lib.dom.d.ts` is loaded, avoiding conflicts like the `composedPath()` return type mismatch. That fixes type errors for projects using DOM libs while preserving Bun’s Node-flavored globals when DOM types are absent.

### **Standalone compiled apps avoid GC churn during graph load** (d696a7a)
Bun now tells JSC to raise the initial allocation budget while a standalone executable is loading its embedded module graph, preventing unnecessary early garbage collections. That should make large compiled apps start more smoothly, especially when the graph load is heavy but fully live.

### **`bun sqlite` now throws on empty SQL instead of crashing** (f189103)
`db.prepare()` now handles whitespace/comment-only SQL correctly when a params array is supplied, avoiding a null-statement crash path and the misleading “Statement has finalized” error. This is a real safety fix for malformed or empty prepares.

### Other misc changes
- Build toolchain override support for explicit LLVM/Rust dirs, including Windows `.exe` handling and cargo/rustc passthrough (141df3e, 7ad2d6e, ed950b8)
- Windows errno follow-up cleanup and API plumbing changes (5fba7bd)
- Git dependency/package-lock sorting and duplicate-key fixes in install (13c02e1, c89fc95)
- Bun bundler test harness/Windows path normalization fixes and restored `itBundled` coverage (17e16cf)
