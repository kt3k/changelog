---
date: 2026-03-29
repo: denoland/deno
period: weekly
slug: 2026-W13
period_label: "Mar 23–29, 2026"
size: L
title: "Deno sharpens Node compat, runtime plumbing, and tooling"
excerpt: "This week focused on Node.js compatibility fixes, event-loop and libuv plumbing, plus a few notable runtime and DX improvements."
commits: 68
---

### Node compatibility keeps closing gaps
**Inspector, child_process, Buffer, and domain behavior improved** — Break-on-start now works correctly in the Node inspector flow, `child_process` got better IPC/argv0 handling and stdio compatibility, huge Buffer sizes no longer truncate, and legacy `node:domain` works more reliably across async boundaries.

**TTY, fs, HTTP/2, and URL-ish edge cases were tightened up** — Windows TTY behavior was rewritten to better match libuv, `fs.Dir` gained disposal support, `fs.cp` and `https.request()` upgrade paths were fixed, and HTTP/2 custom connection creation works again for libraries like gRPC.

**Node-API and native addon support hardened** — NAPI exception handling, escapable handle scopes, and threadsafe-function teardown were fixed, with expanded test coverage across async work, workers, object ops, and edge cases to catch regressions sooner.

### Runtime performance and correctness work
**Event-loop tick processing was consolidated** — Timer processing, async op resolution, and nextTick draining now share a single Rust↔JS tick path, reducing boundary crossings while preserving Node ordering semantics.

**Buffer base64 got faster and large values are safer** — Base64 encode/decode moved to V8’s bundled simdutf for better speed and memory behavior, and Buffer length calculations now handle very large allocations without 32-bit truncation.

**Security and crash fixes landed in core paths** — Secret-key comparison is now constant-time, `AbortSignal.any()` no longer leaks parent references over time, and an OTel HTTP error path no longer double-consumes an external handle.

### Tooling, LSP, and release polish
**Compiled binaries and CLI argv behavior were corrected** — Standalone binaries now preserve argv more consistently for self-spawning CLIs, `process.argv[0]` matches `execPath`, and related child-process spawn behavior was adjusted to avoid leaking Deno flags into user args.

**Import maps, publish typing, and auto-imports improved** — LSP auto-imports now keep alias mappings inside mapped directories, `deno publish` now respects `compilerOptions.types`, and `.env` parsing handles nested quotes more like npm `dotenv`.

**Telemetry and console UX got better** — Deno added a built-in console OpenTelemetry exporter, `console.log()` now survives throwing `toStringTag` getters, and `stripVTControlCharacters` handles OSC 8 hyperlinks correctly.

### Other misc changes
- Removed an obsolete Node TTY op after the `TTY.isTTY(fd)` rewrite.
- Refreshed release metadata to 2.7.8 and 2.7.9, plus a V8 bump.
- Updated npm/BYONM resolution, linting, and various compat test fixtures.
- Minor sys_traits bump and assorted CI/cache/version-file maintenance.
