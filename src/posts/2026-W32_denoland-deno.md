---
date: 2026-08-09
repo: denoland/deno
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "Deno ships QuickJS, hardens security, and cleans up CLI stack"
excerpt: "Experimental QuickJS support, several security fixes, a CLI parser migration, and runtime/crypto robustness improvements landed this week."
commits: 36
---

### Runtime and platform expansion
**Experimental QuickJS backend lands across compile and desktop** — Deno adds a selectable `quickjs` engine alongside V8 for `deno compile` and `deno desktop`, with release CI now packaging QuickJS artifacts.
**Desktop HMR dev servers now run inside the desktop runtime** — `deno desktop --hmr` now executes framework dev servers in the desktop runtime itself, restoring access to desktop globals and fixing deep-graph stack crashes.

### Security hardening
**CLI output now escapes terminal control characters** — Registry and package metadata are sanitized before being printed, preventing terminal output-injection in approvals, advisories, and error messages.
**npm bin targets are validated more strictly** — Invalid `bin` entries that are empty, absolute, or escape the package directory are now rejected on install.
**Inspector and bundle permissions are tightened** — Inspector routing now validates `Host`/origin headers, `Inspector.open` requires sys permission, and `Deno.bundle()` correctly respects filesystem permissions.

### CLI and release tooling cleanup
**The CLI finishes its clap removal** — The legacy clap parser stack is gone in favor of `deno_cli_parser`, with dynamic completions migrated too and supporting helpers simplified.
**Release automation gets more robust** — Version bumping now handles renamed crates correctly, dependency crates publish with `--no-verify`, and provenance rejection is reported clearly during `deno publish`.

### Performance and correctness fixes
**Base64url moves to native Rust ops** — `node:buffer` base64url encode/decode now runs through Rust and simdutf, improving speed and matching Node behavior more closely.
**Node and crypto compatibility improves** — `fs.readdir` now returns sorted entries like Node, UDP skips DNS for literal IPs, OAEP label bytes are preserved, and Diffie-Hellman named-group exponents use the right bit sizes.
**Stability fixes land in networking and bundling** — DNS record formatting now safely handles malformed input, TLS rejects mismatched cert/key pairs without panicking, `serve` handles bad async `onError` paths safely, and esbuild deadlocks in bundling are fixed.

### Other misc changes
- `Blob` and fetch `Body` gained streaming `textStream()` readers.
- `task --members` was added for workspace-scoped task runs.
- Node compat tests were refreshed to Node.js 26.5.1.
- Misc CI, docs, and dependency updates.
