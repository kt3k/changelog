---
date: 2026-05-31
repo: denoland/deno
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: L
title: "Deno adds PQ crypto, faster startup, and stronger Node compat"
excerpt: "This week brought post-quantum WebCrypto, leaner Node startup, safer compile/bundle paths, and a wave of compat and runtime fixes."
commits: 161
---

### Major crypto and security upgrades
**Post-quantum WebCrypto lands** — Deno added ML-DSA signatures and ML-KEM key encapsulation, plus broader modern hash/AEAD support like SHAKE/cSHAKE/TurboSHAKE and SHA-3 HMAC variants.
**TLS and permissions hardened** — PKCS#12/PFX loading now works with real cert/key extraction and SHA-2 MACs, while net permission checks now happen after DNS resolution to close a bypass.
**Safer prime checking** — `crypto.checkPrime` now enforces minimum Miller-Rabin rounds even when callers pass `checks: 0`.

### Faster startup, smaller binaries, and better bundling
**Node startup gets leaner** — more `node:*` polyfills are now lazy-loaded, reducing snapshot size and startup cost for common apps.
**Bundle and compile improve** — `deno bundle --platform browser` now respects object-form `browser` maps and `sideEffects`, the HTML bundler was rewritten around a custom scanner, and `deno compile --bundle` now ships an experimental smaller entrypoint.
**Streams and HTTP hot paths sped up** — stream queues moved to O(1) implementations, HTTP header parsing/building was optimized, and perf timing is skipped when nobody observes it.

### Node and runtime compatibility expands
**More Node APIs and behaviors match upstream** — Deno added several `node:module` and `node:util` APIs, improved `node:test` reporters, supported more `node:vm` dynamic import cases, and fixed CJS re-export detection and `.node` addon error handling.
**TLS, fs, net, and process fixes** — array forms for secure context options work, `fs.exists` stops throwing, `fs.promises` wrappers ignore stray args, `fs.watch` error handling and cleanup were improved, and transparent HTTP retries now keep socket state accurate.
**Runtime and serve stability** — `Deno.serve`, `Deno.watchFs`, `deno test`, Jupyter kernels, and lazy-loaded ESM all got fixes for hangs, teardown issues, or race conditions.

### Other misc changes
**Packaging, install, and resolver fixes** — `deno pack` no longer auto-injects `@deno/shim-deno`, recursive `deno task` runs now execute workspace siblings in parallel, npm hoisting respects direct deps, and several compile/install/cache resolution bugs were fixed.
**Developer tooling and UX** — the LSP stopped flagging CSS side-effect imports, `util.inspect` avoids proxy traps, `deno transpile` preserves JSDoc newlines, and `node:test`/REPL behavior was polished.
**Misc cleanup** — dependency bumps, release metadata updates, and a wide set of regression tests and platform-specific fixes.
