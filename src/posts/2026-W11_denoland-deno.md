---
date: 2026-03-15
repo: denoland/deno
period: weekly
slug: 2026-W11
period_label: "Mar 9–15, 2026"
size: L
title: "Deno sharpens Node compat, adds profiling, and speeds installs"
excerpt: "Big Node-compat upgrades landed across http2, crypto, child_process, npm resolution, plus new CPU profiling/flamegraph tooling."
commits: 107
---

### **Major Node compatibility work across core APIs**
This week brought a broad wave of Node parity fixes: a full `http2` rewrite, better `http` CONNECT/upgrade handling, improved `child_process.spawn()`/`spawnSync()` semantics, `worker_threads` eval behavior that matches Node, and tighter `dns`, `dgram`, `net`, `fs`, `console`, `readline`, and TTY compatibility. Crypto also saw major progress with `generatePrime()`, `generateKeyPair()`, PEM export, `X509Certificate`, `CryptoKey`/`KeyObject` interop, and more Node-like error handling.

### **Profiling and diagnostics got much better**
Deno added `--cpu-prof` controls, `--cpu-prof-flamegraph` SVG output, and source-mapped CPU profiles that point back to original TypeScript locations. Coverage and exit handling were also improved so profiling/coverage data survives `Deno.exit()`, and tracing/logging now better follows OpenTelemetry conventions.

### **npm installs and resolution became faster and more reliable**
The npm resolver got important fixes for large peer dependency trees, bundled dependencies outside `node_modules`, and email-based `.npmrc` auth. Lifecycle scripts now run in parallel, `.bin` setup handles read-only executables, and `deno doc` can now follow npm package dependencies in mixed Deno/npm projects.

### **Runtime stability and performance improvements**
Fetch retries stale pooled connections, V8 wakeups are handled more reliably, worker teardown releases memory sooner on Linux, and base64 Buffer operations were optimized. There were also targeted fixes for `napi_queue_async_work`, async handle lifetime, telemetry teardown, FreeBSD signals, and structured cloning for `DOMException` and `CryptoKey`.

### **Developer experience and tooling updates**
A new `./x` helper script landed for common repo workflows, Node compat test harnesses got simpler ignore/list handling, and several LSP/editor behaviors were aligned with `tsgo`.

### **Other misc changes**
- `deno compile`/`--env-file` path handling fixes
- `console.log` gained `%j` JSON formatting
- `napi_sys` cleanup and more in-tree N-API refactoring
- Small fs consolidation and export cleanup
- Version/workflow, CI, and dependency updates
