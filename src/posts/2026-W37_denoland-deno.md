---
date: 2026-09-13
repo: denoland/deno
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "Deno hardens permissions, storage paths, and Node compat"
excerpt: "This week brought security fixes, permission parsing improvements, memory/perf refactors, and a handful of Node compatibility tweaks."
commits: 16
---

### Security and correctness hardening
**SQLite path handling was locked down** — SQLite-backed KV and Node SQLite paths now reject symlink/junction traversal and handle path aliasing more safely before opening databases.

**npm lockfile tarball origins are validated** — Resolution now errors on malformed or unexpected tarball URLs, reducing origin confusion and lockfile tampering risk.

**Net and permission checks were tightened** — Unix `--allow-net` rules now parse absolute POSIX paths correctly, CLI system permission descriptors accept more valid forms, and Node TCP bind checks now evaluate the resolved IP against deny rules.

### Memory and runtime performance work
**Op tables and op context storage were restructured** — Core op declaration tables can now live in static memory, and `OpCtx` was split into shared plus borrowed storage to reduce copying and runtime memory pressure.

**Module graph retention was trimmed** — Inline source maps and internal-module state are handled more efficiently, lowering retained memory and repeated parsing work during module loading.

**HTTP cache authority paths are safer** — Cache filenames now escape underscores, use a clearer port separator, and hash oversized authorities to avoid collisions and filesystem issues.

### Node and registry compatibility
**Node crypto and process behavior were aligned** — Tiny Diffie-Hellman prime generation now fails with a JS error instead of panicking, `resourceUsage().maxRSS` is normalized on macOS, and the embedded Node version was bumped to 26.5.1.

**Audit and npm install flows got more robust** — Audit now respects configured CA stores for private/corporate TLS setups, and `@types/node` materialization was made atomic to reduce CI and partial-write flakiness.

### Other misc changes
**Config schema documentation was updated** — `desktop.app.identifier` is now included in the JSON schema.

**Test and cleanup work** — Permission, SQLite, cache, npm, audit, and Node-compat regression coverage was expanded, along with small dependency and test-data refreshes.
