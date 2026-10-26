---
date: 2026-10-25
repo: oven-sh/bun
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: L
title: "Bun hardens core runtime while refactoring bindings and TLS"
excerpt: "Crash fixes, TLS/security updates, and a bindgen overhaul landed alongside Bake, install, and HTTP compatibility improvements."
commits: 71
---

### Runtime stability and compatibility hardening
**Broad crash hardening** — A major pass across the runtime, bundler, dev server, shell, and CLI converted many fatal paths into clean errors or exits, cutting down segfaults, panics, and aborts.

**HTTP, fetch, streams, and ws fixes** — Bun tightened Node-compat parsing, fixed keepalive handling, repaired request-body draining and TLS reconnect behavior, and addressed several stream and AsyncLocalStorage regressions.

**Database and core API correctness** — PostgreSQL `Bun.SQL` now waits for `RowDescription` before reusing parameterless queries, `structuredClone` rejects malformed `CryptoKey` data, and a `console.groupCollapsed()` indentation bug was fixed at the end of the week.

### Security, TLS, and supply-chain updates
**Certificate and trust-store changes** — Bun refreshed bundled root CAs, removed outdated roots, updated system trust-store checks, and fixed `--use-openssl-ca` so it no longer silently appends Bun’s bundled roots.

**Security-sensitive dependency bumps** — The week included a c-ares security update, a new WebKit/JSC upstream refresh, and TLS validation hardening that now rejects revoked public keys.

**Opt-in binary hardening** — Linux x64 glibc release builds gained `--hardened=on`, enabling stack protection, fortified libc checks, stack clash protection, and zeroed locals for supported builds.

### Bindgen and native codegen overhaul
**Schema-driven bindings expanded** — Bun moved more native JS-facing APIs onto typed `*.bind.ts` schemas, including core classes, stream sinks, and many Rust-callable entry points, replacing older handwritten host-function plumbing.

**Cleaner native ownership and generated APIs** — The refactor removed older generators in favor of bindgen-backed declarations, while also fixing ownership bugs in zlib and other Rust/native interop paths.

### Developer tooling and framework work
**Bake framework pages got richer data hooks** — `bun bake` added `getServerSideProps`, `getStaticProps`, and `getStaticPaths`, and router-defined server-only exports replaced hardcoded Next.js-style assumptions.

**Typechecking and build tooling improved** — `bun check` and `bun lint` got faster and more accurate, with fixes for missed diagnostics and false positives, while source positions and coverage mappings became more consistent.

**Package management and `bunx` fixes** — Install/update behavior was corrected around overrides, lockfiles, and package caching, and `bunx` now runs the real platform binary instead of a stub for native packages.

### Performance and misc
**Notable performance fixes** — `Bun.stringWidth` was restored to linear behavior on certain multi-line non-ASCII text, and `bun check` saw additional speedups on large projects.

### Other misc changes
- Dev overlay redesign, error grouping, scrolling fixes, and better CSS error spans.
- CI/build image repins, Windows/Darwin bootstrap tweaks, and test-flake cleanup.
- Documentation updates across bindgen, TLS/CA flags, linting, FFI, profiling, and Bun package workflows.
