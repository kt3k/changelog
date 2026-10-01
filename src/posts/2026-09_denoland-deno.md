---
date: 2026-09-30
repo: denoland/deno
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Deno hardens permissions, Node compat, and runtime perf"
excerpt: "September focused on security fixes, Node compatibility polish, better tracing/coverage correctness, and lower memory overhead in core."
commits: 35
---

### Runtime memory and loading got leaner
**Static op tables and borrowed op context storage** — Core op declaration and initialization were refactored to avoid rebuilding and copying extension tables per runtime, reducing memory pressure and setting up cleaner internal ownership.

**Module graph retention was trimmed** — Graph loading now avoids holding onto unnecessary decoded inline source maps and reduces repeated module-name work, lowering retained memory in graph-heavy workloads.

### Permissions, storage, and cache handling were tightened
**Stricter path and origin validation** — Unix `--allow-net` path parsing was fixed for POSIX-style socket paths, npm tarball origins are now validated against expected registries, and HTTP cache filenames were made unambiguous to avoid collisions.

**SQLite path traversal defenses improved** — SQLite-backed KV and Node SQLite paths now reject symlink/junction tricks before opening databases.

**Audit and system permissions were corrected** — Audit flows now respect configured CA stores, and CLI system permission descriptors accept the full valid descriptor set.

### Node compatibility kept moving forward
**Child process, async context, and crypto fixes** — Child-process signaling and IPC close behavior were tightened, AsyncLocalStorage now distinguishes explicit `undefined` from exit state, and tiny Diffie-Hellman generation now surfaces a JS error instead of panicking.

**Process, networking, and mock behavior aligned better with Node** — `resourceUsage().maxRSS` is normalized on macOS, TCP bind permission checks inspect resolved IPs, `mock.reset()` now restores `mock.method()` implementations, and `@types/node` materialization became atomic.

**Node typing and registry handling improved** — `deno check` now downloads a pinned `@types/node` version through the configured npm registry instead of hardcoded npmjs.org/latest behavior.

### Tracing, coverage, and CLI behavior were corrected
**Telemetry context propagation fixed** — Top-level fetch and cron spans now exit cleanly without leaking context, and HTTP/1 request headers are normalized for trace propagation so mixed-case `Traceparent` works.

**Coverage and CLI parsing got edge-case fixes** — Coverage collection now disables V8 code cache to avoid inflated results, and `deno run -- ...` preserves literal entrypoint args and forwarded double-dashes correctly.

### Other misc changes
**Schema and tooling updates** — JSON schema IDs were switched to the maintained raw GitHub endpoint, `desktop.app.identifier` was added to config schema, bash completions now emit real newlines, and `rolldown` was pinned to preserve stack traces.

**Release and platform maintenance** — Main was synced with v2.9.7, Android TTY errno lookup was fixed, pnpm lockfile import was hardened for real-world formats, and CI/workflow cleanup removed obsolete gcloud auth steps and refreshed generated outputs.
