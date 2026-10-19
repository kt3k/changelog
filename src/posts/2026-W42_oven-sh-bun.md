---
date: 2026-10-18
repo: oven-sh/bun
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: L
title: "Bun adds native tooling, Bake expansion, and big runtime fixes"
excerpt: "Native lint/format, broader Bake pages/frameworks, SQL/WebSocket work, and many checker, install, and runtime correctness fixes landed this week."
commits: 111
---

### Native developer tooling lands in Bun
**`bun lint` and `bun format` go native** — Bun now ships first-class linting and formatting commands with config discovery, plugin loading, Svelte formatting, and tighter parity with ESLint/Prettier-style workflows.
**Type-aware lint and checker parity improve** — `bun lint --type-aware` reduced duplicate diagnostics and gained broader rule parity, while `bun check` fixed several TypeScript mismatches, hangs, and generics/loop edge cases.
**Formatter internals were overhauled** — Comment ownership was rewritten to match Prettier’s model, and CSS minification/formatting correctness improved along the way.

### Bake, install, and package-manager behavior evolve
**Bake expanded from simple app pages to frameworks and routes** — `bun bake` now supports `.tsx`/`.jsx` pages, `bake.config.ts`, framework plugins, hot reload, and config-driven routing, making it much closer to a real app framework layer.
**Install compatibility improved across ecosystems** — Bun added Yarn Berry lockfile migration, better frozen-lockfile semantics, and pnpm-style symlink handling, while also clarifying peer dependency and lockfile behavior.
**Package-manager work was consolidated for Bun 1.5** — A large merge pulled hundreds of open PM changes into a single reviewed update, tightening docs, completions, and lockfile plumbing.

### Runtime correctness and performance got a broad pass
**Network and event-loop bugs were fixed** — TLS/HTTPS send-path issues, socket fairness starvation, HTTP/2 hangs, WebSocket proxy renegotiation, and DOM constructor side-effect ordering were all addressed.
**Core APIs became safer and more Node-compatible** — Fixes landed for `Bun.JSONL`, `Bun.YAML.parse`, `TextEncoder.encode`, `fs.realpath`, `diagnostics_channel`, `util.inspect`, `Headers` iteration, and Windows env inheritance.
**Performance work trimmed overhead** — Native stream readers allocate more precisely, `bun check` sped up Windows directory listing, headers iteration got cheaper, and compile-cache writes dropped a bytecode optimizer pass.

### SQL, WebSocket, and bindgen saw major consolidation
**SQL APIs were unified and hardened** — `Bun.sql`, `bun:sqlite`, and `node:sqlite` were consolidated, with better transaction/error handling and a new `DATABASE_URL` default.
**WebSocket support was overhauled** — Global WebSocket, `Bun.serve({ websocket })`, and the `ws` package were aligned around a native transport with updated docs and closing-handshake behavior.
**Bindgen became the default path for more native APIs** — A unified generator now handles more functions, classes, argument models, and schema-driven bindings, reducing manual parsing across core.

### Other misc changes
- Linux arm64 startup crash fixed when kernels misreport SVE2.
- `--disallow-code-generation-from-strings=strict` was tightened and documented.
- CI image inputs are now pinned by checksum.
- Numerous docs, completion updates, flaky-test fixes, and internal refactors across lint, check, fmt, Bake, and install.
