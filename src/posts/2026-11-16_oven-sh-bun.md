---
date: 2026-11-16
repo: oven-sh/bun
size: L
title: "Bun leans harder into safe Rust"
excerpt: "Major refactors tightened ownership across HTTP, bindings, I/O, and codecs, plus a big WebP rewrite and dev-server HMR fixes."
commits: 44
authors: [dylan-conway, alii, Jarred-Sumner]
commit_authors: {"8b22022": alii, "0bb8b9f": dylan-conway, "3f5423c": dylan-conway, "0b01976": alii, "0377a7f": dylan-conway, "85d2b59": dylan-conway}
---

### **Bun.Image now uses a safe-Rust WebP codec** (3f5423c)
Bun replaced libwebp with its own `src/webp` implementation, including new encoder/decoder bindings, Highway kernels, and build-system updates. This removes the external WebP dependency while preserving Bun.Image WebP support and adds a dedicated benchmark to track it.

### **HTTP request ownership and proxy tunnel handling were refactored** (0377a7f)
The HTTP stack now models in-flight requests and proxy tunnels with explicit ownership instead of ad hoc lifetime juggling. That reduces UAF risk in the request path and changes how pooled CONNECT tunnels are stored and released.

### **AOT/dev-server watcher state was moved behind shared ownership** (85d2b59)
The bundler/dev-server AOT path now shares the watcher via `Arc`, rather than a raw backref, and related hot-reload wiring was adjusted accordingly. This makes cross-thread watcher state safer and simplifies the HMR plumbing.

### **Rust bindings and runtime objects got a broad ownership overhaul** (0bb8b9f)
JS wrappers now take native objects as `RefPtr`, removing a large amount of manual ref counting and leak-by-hand handoff code. This is a broad API-shape change across codegen and bindings, and it changes how many native resources are transferred between C++ and JS.

### **Image, HTTP, I/O, sockets, DNS, SQLite, crypto, and uSockets were all converted toward owned resources**
A large cluster of commits replaced raw pointers and manual frees with owned handles, borrowed buffers, or typed wrappers across core subsystems: I/O writers/readers, socket addresses, DNS/c-ares, SQLite, crypto/BoringSSL, uSockets, and more. These are mostly internal refactors, but together they substantially reduce unsafe code and the chance of lifetime bugs.

### **Dev server HMR fixes for saved CJS/JSON updates and import cycles** (8b22022, 0b01976)
Hot-reload handling now correctly invalidates saved CommonJS/JSON views for ES module importers, and dispose callbacks no longer run twice in the self-accepting case. A separate fix prevents the dev server from hanging when walking failure paths through an import cycle.

### Other misc changes
- WebView/CLI/event-loop/crash-handler ownership refactors
- More Rust nightly cleanup and toolchain bump
- win32 shim / Windows install changes
- Image build fix for `create_buffer`
- Various compile/test/benchmark/docs updates
