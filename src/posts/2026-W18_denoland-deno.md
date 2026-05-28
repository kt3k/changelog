---
date: 2026-05-03
repo: denoland/deno
period: weekly
slug: 2026-W18
period_label: "Apr 27 – May 3, 2026"
size: L
title: "Deno ships new CLI tools, smoother installs, and deeper Node parity"
excerpt: "New versioning, transpile, why, and audit commands landed alongside install/workspace improvements, lazy-loading refactors, and major Node compat gains."
commits: 190
---

### **New CLI workflows expand Deno’s package/tooling story**
Deno added several developer-facing commands: `deno bump-version` for semver version bumps, `deno transpile` for standalone TS/JSX/TSX-to-JS output, `deno why` for tracing why a dependency is present, and `deno audit --fix` to auto-upgrade vulnerable direct deps. These make Deno more useful as a full project maintenance tool, not just a runtime.

### **Install, publish, and workspace ergonomics improved**
`deno install` gained cross-platform targeting via `--os`/`--arch`, plus `--prod` and `--skip-types` for leaner installs, while unprefixed package names now default to npm. Workspaces also picked up `catalog:` support for centralized dependency versions, and `deno publish` was hardened so non-GitHub CI no longer panics during provenance handling.

### **Major runtime additions broaden platform coverage**
OffscreenCanvas landed in core, `node:module.registerHooks()` support was implemented, and `node:test` became much more complete with context fields, suite hooks, assertion planning, and better mock support. `node:http` also gained proper WebSocket upgrade reuse, unlocking more Node framework compatibility.

### **Node compatibility made a large jump across HTTP/2, TLS, crypto, DNS, and fs**
The week saw sustained parity work across the Node surface: HTTP/2 session/flow-control/ping/GOAWAY handling, TLS certificate and handshake behavior, DNS reverse lookup and resolver support, crypto key/DH edge cases, `fs.watch` validation, and child-process IPC/socket handles. Together these fixes unblocked a large batch of node_compat tests and tightened behavior toward Node.js.

### **Performance and startup work focused on lazy loading**
Deno converted more core JS extensions to lazy-loaded scripts, trimming startup/snapshot overhead and reducing ESM resolution work across web, fetch, canvas, crypto, fs, ffi, cron, and related internals. Separate hot-path optimizations also improved module loading, `fetch`, `TextDecoder`, `TextEncoder.encodeInto`, `DOMMatrix`/WebIDL handling, and `node:http` write performance.

### Other misc changes
- Geometry Interfaces Module Level 1 shipped in unstable mode.
- `deno upgrade` gained delta patch downloads.
- `Deno.listenDatagram()` now defaults to `0.0.0.0`.
- Inspector REPL promise GC handling was fixed.
- Several CI/test/config updates and additional node_compat tests were enabled or adjusted.
