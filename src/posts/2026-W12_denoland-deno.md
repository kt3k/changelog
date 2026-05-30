---
date: 2026-03-22
repo: denoland/deno
period: weekly
slug: 2026-W12
period_label: "Mar 16–22, 2026"
size: L
title: "Deno tightens Node parity while landing major runtime wins"
excerpt: "A week of compatibility fixes, runtime refactors, and performance gains, plus a breaking doc JSON schema update."
commits: 80
---

### **Node compatibility kept moving forward across core APIs**
Deno landed a broad set of Node parity fixes in `buffer`, `tty`, `process`, `readline`, `child_process`, `events`, `dns`, `sqlite`, and `http`. Highlights include safer `Buffer.concat`, `markAsUntransferable()`, more correct child-process and signal semantics, `readline` behavior that matches Node off-TTY, improved keep-alive and h2c handling, and better `events`/`dns` edge-case support.

### **Runtime and performance work cut overhead in hot paths**
Several internal refactors improved throughput and reduced memory churn: V8-to-Rust string conversion got cheaper, async N-API work now reuses the threadpool, URLPattern and WebIDL conversion paths were streamlined, glibc arenas are trimmed after module loading on Linux, and `fs.cpSync`, timer handling, and buffered file writes all saw efficiency improvements.

### **Security and correctness fixes landed in FFI and crypto**
Nonblocking FFI now keeps ArrayBuffer backing stores alive until async work completes, removing a use-after-free risk. Crypto also got a constant-time AES-GCM tag check, fuller WebCrypto P-521 support, and tighter AES CBC/ECB key/IV validation.

### **Web, telemetry, and runtime behavior became more complete**
OpenTelemetry now supports array-valued attributes, HTTP metrics can inherit span metadata like `http.route`, and watch mode now raises SIGINT/SIGTERM to JS handlers for graceful shutdown. `deno eval` also auto-detects CJS vs ESM, and macOS TTY handling now falls back when kqueue can’t serve a device.

### **Breaking docs change and install/audit fixes**
`deno doc --json` switched to schema v2 with a new document structure, which is a breaking format change for consumers. On the package side, global npm installs now shim every bin entry, JSR lockfiles are supported for global installs, and `deno audit` now respects `package.json` overrides to avoid false positives.

### Other misc changes
Various test, CI, and release updates; `process.threadCpuUsage()` implementation; `util.MIMEType`/`MIMEParams`; `process.title`/`--title`; `ChildProcess[Symbol.dispose]()`; REPL and panic fixes; version bumps to 2.7.6 and 2.7.7.
