---
date: 2026-05-24
repo: denoland/deno
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: L
title: "Deno sharpens Node compat, inspectors, and install flows"
excerpt: "Node compatibility and DevTools observability improved, while `deno ci`, `deno check --watch`, and size reductions landed."
commits: 56
---

### **Node compat filled in several big gaps**
Hooks and module-loader support were tightened again, including restoring `Module.register`/`registerHooks` behavior, improving `nextLoad()`/`createRequire()` edge cases, and fixing builtin redirects. Crypto, DNS, WASI preview1, `node:test`, `node:trace_events`, `worker_threads`, `node:https`, and `diagnostics_channel` also picked up targeted compatibility fixes.

### **Inspector and DevTools networking got much more useful**
Network event plumbing was expanded so `fetch()`, WebSocket traffic, and `node:http` requests now surface in CDP even under plain `--inspect`. Deno also added response-body/post-data retrieval, correct disconnect notifications, hostname-based inspector binding, and `process.debugPort` reporting for a more Node-like debugging experience.

### **CLI and test workflows improved**
`deno ci` landed as a frozen, lockfile-required install path for reproducible environments. `deno check --watch` now reruns on graph changes, `deno install -g` defaults bare package names to npm, and `deno audit fix` is accepted as a shorthand. On the testing side, `Deno.test()` now defaults sanitizers off, `node:test` gained watch-mode events and a Node-compatible TAP reporter, and JUnit output was rewritten locally.

### **Startup and binary size were trimmed**
The startup snapshot was cut by about 27%, ICU data duplication was removed after the V8 upgrade, release builds switched to `panic=abort`, and networking/install paths shed a few dependencies and extra provider code. These changes should help cold-start cost and shipped binary size.

### Other misc changes
- TypeScript libs now expose newer runtime APIs like `Math.sumPrecise` and `Intl.Locale.variants`.
- `createImageBitmap` was fixed for wide raw buffers.
- Several dependency cleanups and small refactors landed across the workspace.
