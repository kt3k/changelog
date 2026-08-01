---
date: 2026-07-31
repo: denoland/deno
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "Deno’s July: desktop maturity, native tsc, and security hardening"
excerpt: "A major month of desktop/runtime polish, native TypeScript check work, security fixes, and broad Node/Web compatibility gains."
commits: 308
---

### **Desktop runtime moved from polishing to capability expansion**
Deno Desktop picked up opacity/transparent windows, framework HMR, React Router support, better page-load events, and cleaner packaging/startup behavior. It also fixed project discovery, black-flash startup issues, tray handling, backend naming, and a security bug where desktop error reports could be redirected by JS.

### **TypeScript checking was fundamentally reworked**
The big internal story was the shift away from Deno’s TypeScript fork. July added `deno sync-types` for stock TypeScript tooling, then brought up native `deno check` with a pinned compiler and diagnostic remapping, including support for root-based discovery, global-cache mode, and local wasm imports. Type-checking behavior was also aligned with upstream TS through stricter `export =` handling, better `@types/node` resolution, and UTF-16-correct diagnostics.

### **Node compatibility widened across core APIs**
Compatibility work landed in `node:test` (test context APIs, hooks, tag filters), `node:tls`/`node:net`/`node:http2` (write-path fixes, inherited fds, SNI behavior, backpressure, teardown cleanup), `node:v8` (promise hooks, heap snapshots near OOM, `util.diff`, `Buffer` search bounds), and `node:fs`/`node:sqlite`/`node:crypto` (cp fast path, sqlite hot-path tuning, raw ChaCha20). Deno also added pieces like `worker_threads.locks`, `Cache.keys()`, and `process.getActiveResourcesInfo()` parity improvements.

### **Security and permission boundaries were tightened**
Several changes hardened runtime boundaries: internal `ext:`/`node:` modules are harder to import from user code, Unix sockets now require net permission, `Deno.umask()` moved under sys permission, native addon extraction and temp `node_modules` handling were made symlink-safe, and permission prompts now escape bidi/invisible control characters. Redirect handling for fetch/http client auth headers was also corrected to avoid leaking credentials across origins.

### **Performance, startup, and memory use improved noticeably**
The month included a lot of hot-path work: faster Web Streams, zero-copy TLS/net writes, cheaper `fetch`/worker messaging, faster npm/glob resolution, lazy Node builtin loading at startup, batch `randomUUID()`, startup-order optimization for release builds, and more efficient pack/tar handling. Memory leaks and lifetime bugs were also fixed in sockets, watch mode, npm resolver state, QUIC cleanup, and native addon / TSFN paths.

### **Other misc changes**
- `deno add` gained `--no-save`, `--save-optional`, and `--unscoped`; `deno uninstall -g` can remove multiple packages.
- `deno serve`, `deno desktop`, `deno deploy`, `deno fmt`, `deno pack`, and `deno check` all saw smaller correctness and UX fixes.
- OpenTelemetry was upgraded to 0.32 with API migration and attribute-length limiting support.
- Release/tooling work included V8 150.2.0, a Linux artifact slimming pass, CI/release workflow updates, and various dependency bumps.
