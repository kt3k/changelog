---
date: 2026-03-31
repo: oven-sh/bun
period: monthly
slug: 2026-03
period_label: "March 2026"
size: L
title: "Bun adds WebView, cron, and a major build-system overhaul"
excerpt: "March brought new runtime APIs, a TS-based build pipeline, and broad hardening across networking, crypto, filesystems, and parsers."
commits: 175
---

### **Major runtime additions: cron jobs and WebView**
Bun shipped two notable APIs this month. `Bun.cron` adds first-class OS-level cron registration, removal, and cron-expression parsing. `Bun.WebView` landed as a built-in browser automation surface with WebKit and Chrome backends, later growing `EventTarget` support, richer screenshots, and a raw `cdp()` escape hatch.

### **Build system overhaul: CMake out, TypeScript in**
The repository’s build pipeline was replaced with a TypeScript-based ninja generator, and the legacy CMake path was removed near month-end. This touched CI, dependency handling, compile/link steps, and related tooling, making it the biggest infrastructure shift of the month.

### **Security and memory-safety hardening across the runtime**
A large early-month push closed multiple crash and exploit-class issues: path resolution buffer overflows, TLS handshake and certificate-verification crashes, `writeEarlyHints()` header injection, WebSocket handshake validation, zlib bounds checks, shell interpolation edge cases, and several invalid-`this`/detached-buffer crash paths in crypto, FFI, streams, and other native bindings. Later fixes also covered abort-related leaks, GC cycles, and a MySQL query leak.

### **Networking and HTTP got materially more correct and resilient**
HTTP and socket handling saw broad fixes: chunked-transfer parsing across split CRLF boundaries, HTTP/2 settings compatibility, proxy-tunnel 304 handling, HTTPS proxy tunnel pooling, Linux `TCP_DEFER_ACCEPT`, signal listener cleanup, dgram reuse-port behavior on macOS, WebSocket protocol/ping-pong correctness, and safer `fs.watch()`/watcher path handling. Bun also improved TLS hostname verification with custom DNS lookup and refreshed its root CA bundle.

### **Bundler, transpiler, and packaging behavior improved**
Bundling grew a new `--allow-unresolved` path for non-literal imports/requires, fixed several barrel-export and dynamic-import propagation bugs, and stopped dropping HTML-referenced assets from manifests. The transpiler and package pipeline also got fixes for cache hashing, TS config lifetime, decorator parsing, `String.raw` null-byte preservation, and pack/publish metadata refresh after lifecycle scripts.

### **Platform-specific correctness fixes**
Windows and Linux both saw important repair work: Windows async file reads, UTF-8 path handling, numeric `fs.open` flags, `realpath`/`readlink` null-pointer guards, ARM64 shims, dynamic CRT leakage, and `fs.watch` retry crashes; Linux got safer stdin/blob sizing, watcher CPU-spin fixes, and faster accept handling. Standalone Linux binaries now use an ELF section for embedded graphs instead of `/proc/self/exe`.

### **Other misc changes**
Docs expanded for TOML, CSRF, and cron; test infrastructure was deflaked and upgraded in several spots; SQL got better parameter-limit handling and MySQL capability negotiation; URLPattern, globbing, and `buffer` search methods were optimized; and a number of small CI, baseline, and fixture updates landed.
