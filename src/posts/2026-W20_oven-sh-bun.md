---
date: 2026-05-17
repo: oven-sh/bun
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "Bun’s Rust rewrite hardens runtime, HTTP, and installs"
excerpt: "Security hardening, Miri/UB cleanup, HTTP correctness fixes, and Rust build pipeline work dominated the week."
commits: 41
---

### Major runtime, HTTP, and security fixes
**Security hardening across the stack** — Bun patched 36 reachable security issues spanning runtime, package manager, parsers, HTTP, and SQL drivers, with additional bounds and lifetime checks in hot paths.

**HTTP/fetch correctness and connection safety** — Several network fixes landed together: `http.request()` now streams responses earlier in duplex flows, fetch stops retrying non-idempotent requests after keep-alive resets, and TCP keepalive behavior was aligned with Node/undici semantics. HTTP pooling and H2 coalescing were also tightened to avoid unsafe reuse across trust boundaries.

**YAML round-tripping no longer mutates numeric-looking strings** — `YAML.stringify` now quotes values that would be parsed back as numbers, preventing silent data corruption on round-trip.

### Rust port and build pipeline progress
**Server and config naming were finished for HTTP/3** — Bun.serve’s experimental QUIC options were fully renamed from `h3`/`h1` to `http3`/`http1`, including internal Rust config, docs, tests, and validation.

**Rust cross-compilation became the new build path** — CI and build scripts were reworked around Rust builds, including native macOS support, Linux/ASAN sizing updates, and config-generated build options instead of env-var plumbing.

**Resolver internals were split out and cleaned up** — The port wrapper around the resolver was broken into real sibling files, tightening ownership and making the codebase easier to maintain.

### Safety, UB, and correctness cleanup
**Miri support now catches aliasing bugs** — A new `bun run rust:miri` workflow runs `cargo miri test` on selected crates, and the same work fixed a serious `HiveArray` aliasing issue plus nearby collection/runtime UB.

**More undefined behavior was removed** — Bun fixed a `fs.readFile` UTF-16 layout bug, cleaned up unsafe collection primitives, and removed dead unsafe APIs and conversions.

**Install and package resolution got sharper** — `bun add -g` now reuses existing folder/tarball entries instead of duplicating them, and Windows package-specifier resolution preserves forward slashes so imports resolve correctly.

### Other misc changes
**FFI and build tooling** — Compiled Bun executables can now extract embedded shared libraries to temp files before `dlopen()`, JSON lexer recovery for auto-quoted `define` values improved, Android was included in Linux-kernel cfg paths, and assorted CI/docs/lint/format updates landed.
