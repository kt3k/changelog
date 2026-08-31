---
date: 2026-08-30
repo: denoland/deno
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "Deno tightens core performance, desktop runtime, and release flows"
excerpt: "This week brought async/runtime perf wins, desktop API and packaging fixes, safer publish/LSP behavior, and a few command-line corrections."
commits: 34
---

### Core runtime performance and memory use improved
**Async borrows and op futures got cheaper** — `AsyncRefCell` now fast-paths uncontended borrows, while the op driver’s future arena grows on demand and recycles chunks. WebSocket op futures were also slimmed down by boxing handshake state, reducing hot-path overhead.

**Snapshot rehydration and HTTP keep-alive were tightened up** — Snapshot startup now avoids bincode during rehydration with a custom zero-copy path, and raw HTTP/1 keep-alive handling was fixed so fully consumed request bodies can reuse connections more reliably.

**Blocking work and diagnostics improved** — Concurrent flock operations now avoid starving Tokio’s blocking pool, N-API addon load failures surface the OS cause and path, coverage mapping was fixed for UTF-16 offsets, and DNS `ANY` responses now skip unsupported record types.

### Desktop runtime got a wave of API and packaging fixes
**Clipboard and richer desktop bindings landed** — `deno desktop` now exposes `navigator.clipboard.readText()`/`writeText()`, and desktop bind transport preserves binary values like `Uint8Array` instead of forcing JSON round-trips.

**Menus, errors, window closing, and packaging were corrected** — Menu items now forward `checked`, `icon`, and `tooltip`; unhandled desktop errors no longer block the JS thread; window close behavior works again on Linux; and macOS bundles keep valid signatures.

**Release/install artifacts were polished** — Desktop installers now inherit version and license metadata from `deno.json`, dotted app names are preserved, and launcher/library path handling and other packaging edge cases were fixed.

### CLI, publish, and LSP behavior became safer and more correct
**Publish and registry flows were hardened** — `deno publish` now authenticates private-package existence checks, validates package names earlier, and preserves base paths/query encoding when building registry URLs.

**Bundling and sandbox/deploy arg handling were corrected** — `deno bundle` restored the expected optional `--sourcemap` behavior, while `deno deploy` and `deno sandbox` stopped duplicating trailing passthrough args.

**LSP resolution got more accurate** — Registry endpoint handling now rejects non-HTTP schemes, and prerelease-only JSR packages can resolve to the newest prerelease when no stable release exists, matching `deno_graph` semantics.

### Other misc changes
- Core modules were refactored into smaller submodules, with assorted dependency and feature cleanup.
- Snapshot and module-map internals were refactored; tests and lockfiles were refreshed.
- Release automation gained a manual post-publish rerun path with explicit version input.
- Node type snapshots were updated for `@types/node` 26.4.0.
