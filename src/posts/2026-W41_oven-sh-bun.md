---
date: 2026-10-11
repo: oven-sh/bun
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: L
title: "Bun lands built-in type checking and hardens runtime edges"
excerpt: "`bun check` debuts and rapidly matures, while Bun patches TLS, stream teardown, bundling, SQL, and memory leak bugs."
commits: 26
---

### **`bun check` becomes a first-class TypeScript workflow**
Bun introduced a built-in `bun check` command and spent the rest of the week aligning it with `tsc`: union/JSX behavior, project/reference rules, false positives, flow-state handling, and complex-type inference all saw fixes. It also got a big performance pass, including linear-time handling for deep interface chains and reduced work across shared declarations, making type checking both more compatible and much faster on large codebases.

### **Runtime and server behavior got several important correctness fixes**
Bun tightened a cluster of edge cases across async streams, `spawnSync`, SQL, and bundler splitting. Async iterable responses now shut down with `return()` so disconnects and write failures clean up properly, `spawnSync` no longer interferes with the VM loop, MySQL/Postgres pipelining stays aligned on failures, and splitting avoids invalid shared chunks when entrypoints need different module evaluation order.

### **TLS and fetch handling were hardened across the stack**
A set of TLS fixes landed in `fetch`, `node:tls`, `node:https`, WebSocket, and SQL, alongside docs/type updates for certificate files, CRLs, mTLS options, SNI, and SSL-mode precedence. Bun also stopped reapplying TLS config on every request, fixing a pooled TLS renegotiation crash, and added source-build flags to disable string codegen or WebAssembly at build time.

### **Memory, streaming, and dev-experience bugs were cleaned up**
Blob string ownership was fixed so dropped request/body paths no longer leak memory, and native byte streams now preserve partial buffered output when producers fail instead of collapsing or panicking. React Fast Refresh also now hashes hook bindings correctly, preventing stale state collisions during editing.

### Other misc changes
- Upgraded the embedded WebKit snapshot and adjusted bindings/tests for upstream API changes
- Added docs, completions, licensing notes, and build/config plumbing for new commands and flags
- Miscellaneous regression tests, refactors, and release-script updates
