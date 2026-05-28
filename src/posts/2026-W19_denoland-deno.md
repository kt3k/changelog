---
date: 2026-05-10
repo: denoland/deno
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: L
title: "Deno pushes Node parity, startup speed, and packaging forward"
excerpt: "A big week for Node compatibility, lazy-loading startup wins, faster HTTP, plus new `deno pack` and hoisted npm installs."
commits: 105
---

### **Node compatibility took a major leap**
Deno landed a broad set of Node parity fixes across `cluster`, `module.register()`/`registerHooks()`, `node:tls`, `node:crypto`, `node:repl`, `node:test`, `node:module` SourceMap, and `child_process`/IPC behavior. It also tightened `require()` error semantics, honored `NODE_EXTRA_CA_CERTS`, improved loader hook handling for compiled binaries, and fixed several edge cases around sockets, backpressure, TLS callbacks, and module cycles.

### **Packaging and dependency management got new capabilities**
`deno pack` is now available for producing npm-compatible tarballs from Deno/JSR projects. Deno also added a new `--node-modules-linker=hoisted` mode for flat npm installs, with end-to-end CLI/config/resolver plumbing to make the linker usable in real projects.

### **Startup, memory, and HTTP performance improved**
A major theme of the week was moving core Node/polyfill and runtime modules to lazy-loaded JS, cutting eager startup cost, snapshot size, and memory use. On the network side, HTTP handling got faster with a direct dispatch path for requests, a buffered-body fast path for `req.json()`/`.text()`/`.bytes()`, and a clearer HTTP/1 autodetect path that avoids unnecessary HTTP/2 allocation.

### **Testing, tooling, and developer ergonomics improved**
`Deno.test()` now supports per-test timeouts, `deno task` can prefix parallel output by task name, and `deno compile` shows progress during builds. The week also added better diagnostics_channel emission for HTTP, fixed watcher exclude behavior, improved `spawn()` cwd handling, and expanded compile/runtime support for custom module hooks.

### Other misc changes
- Fixed various Node compat edge cases in headers, timers, nested `package.json` resolution, and `diagnostics_channel`/TCP observer behavior.
- Refreshed TypeScript to 6.0.3, bumped dprint-plugin-typescript, and updated several dependencies including OpenSSL and aws-lc.
- Addressed a handful of flaky tests and internal build/config issues.
