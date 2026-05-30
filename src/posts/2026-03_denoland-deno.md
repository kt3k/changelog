---
date: 2026-03-31
repo: denoland/deno
period: monthly
slug: 2026-03
period_label: "March 2026"
size: L
title: "March brought major Node, npm, and runtime parity gains"
excerpt: "Big Node-compat upgrades, faster npm installs, better profiling/coverage, and a few breaking doc/release changes."
commits: 389
---

### **Node compatibility made a big leap across crypto, process, tty, and networking**
March was dominated by Node parity work. Deno filled in major gaps in `node:crypto` (X.509 inspection, P-521, RSA-PSS, ChaCha20-Poly1305, Triple DES, constant-time secret-key/GCM checks, better key import/export and equality), `node:process` (argv/execPath, title, exit codes, unhandled rejections, `process.unref()`, thread CPU usage), `node:tty` (Windows/raw mode behavior, indestructible streams, synchronous writes), and `child_process`, `dgram`, `dns`, `net`, `http`, `http2`, and `worker_threads`. Several real-world edge cases were fixed too, including Windows named pipes, CONNECT/h2c handling, `--inspect-brk`, `AbortSignal.any()` leaks, and legacy `node:domain` behavior.

### **npm installs, resolution, and publishing got faster and more correct**
The npm resolver was heavily reworked: peer dependency handling was split into more reliable phases, parallel metadata fetching and dedup fixes reduced hangs on large graphs, and BYONM/manual node_modules behavior was tightened for exact matches, version mismatches, and built-in shadowing. Install performance improved through abbreviated packument fetches, parallel lifecycle scripts, faster tarball extraction, and less blocking decompression. On the tooling side, `deno install -g npm:...` and `npm install -g deno` gained better bin shim handling, registry overrides and auth precedence were fixed, `deno outdated` now uses npm dist-tags correctly, and `deno audit` respects overrides more accurately.

### **Core runtime ordering, workers, and event loop behavior were refined**
Multiple changes focused on matching Node/libuv timing semantics more closely: V8 microtasks now follow Node ordering, nextTick/immediate handling was consolidated, the event loop tick path was simplified, and libuv compatibility was repeatedly cleaned up. Worker behavior also improved with correct resource limits, cleaner shutdown/interrupt handling, synchronous TTY writes, better wakeups for foreground tasks, and safer async work handling across N-API and FFI. These changes reduce subtle timing bugs and improve stability under load.

### **Developer tooling got more useful: profiling, coverage, docs, and LSP**
`deno coverage` gained function metrics and more accurate line accounting, while `--cpu-prof` got original-TypeScript source maps and new `--cpu-prof-flamegraph` SVG output for easier performance analysis. `deno doc` now understands npm dependencies, but also shipped a breaking JSON schema v2 overhaul. The LSP saw fixes for tsgo root syncing, organize-imports parity, JSX import-source caching removal, auto-import alias preservation, and notebook URI normalization. The node compat test harness also became easier to run and filter.

### **Telemetry, permissions, and safety fixes matured**
OpenTelemetry support expanded with a built-in console exporter, stdout/stderr log tagging, array-valued attributes, better HTTP span semantics, and metric/error handling fixes. Permission auditing can now stream to OTEL, and several stability/security issues were addressed, including a nonblocking FFI use-after-free hazard, dynamic-import crash paths, Buffer length truncation, secret-key timing comparisons, and safer crypto validation.

### **Other misc changes**
- Added prerelease channels and upgrade flow for `alpha` and `beta` builds.
- `deno compile`/standalone binaries got argv and env-file behavior fixes.
- `fs` polyfills were further consolidated into internal modules.
- CI/release workflows, cache keys, and version bumps were updated throughout the month.
- Smaller correctness fixes landed for readline, console formatting, Web APIs, SQLite, WebTransport, and import-map auto-imports.
