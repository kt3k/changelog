---
date: 2026-07-19
repo: oven-sh/bun
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "Bun adds sqlite and TOML overhaul while tightening Node parity"
excerpt: "Major Node-compat upgrades, new TOML/sqlite APIs, plus fixes for HTTP, N-API, streams, and GC/lifetime bugs."
commits: 210
---

### Major platform additions and compatibility jumps
**Bun.TOML rewrite** — Bun replaced its old TOML support with a spec-exact v1.1.0 parser and added `Bun.TOML.stringify()`, making config handling substantially more capable and standards-aligned.

**`node:sqlite` is now fully implemented** — Bun added the `node:sqlite` module, wired it into build/shutdown/docs, and brought in the Node v26.3.0 test suite plus backup/session APIs.

**Node-API parity expanded further** — The week brought a large batch of N-API fixes and new exports, including better pending-exception behavior, coercion semantics, and additional v26 experimental symbols.

### HTTP, streams, and server behavior got materially more Node-like
**HTTP server and client correctness fixes** — Bun fixed keep-alive detach/finish handling, close-delimited responses, HTTP/1.0 chunking, duplicate `Date` headers, and large `res.write()` buffering behavior to better match Node and avoid real server regressions.

**Web Streams, zlib, and `Readable.fromWeb()` compatibility** — Stream cancellation now propagates correctly, permessage-deflate recovers after stream end, and compression paths picked up dictionary support plus tighter reset behavior.

**`node:test` and process lifecycle behavior improved** — `TestContext.mock` now works, expectation diffs preserve literal text, and `beforeExit` no longer fires after fatal uncaught exceptions.

### Correctness, safety, and lifetime bugs were heavily hardened
**GC/UAF fixes across Redis, HTTP/2, TLS, and addons** — Several high-risk lifetime issues were closed, including a Redis refcount over-release, HTTP final-result double delivery, HTTP/2 callback lifetimes, TLS wrapper rooting, and a worker teardown TSFN use-after-free.

**Parser/resolver/compiler fixes** — Bun fixed TypeScript newline parsing, side-effect-preserving expression folding, resolver cache races, HTML entry chunk generation under code splitting, and a crashy Mach-O compile/template path.

**Socket, buffer, and path edge cases** — The week also fixed keep-alive semantics, long Unix socket paths, buffer size handling past 2^32, `mmap` offset correctness, and several router/query parsing edge cases.

### Other misc changes
**Miscellaneous compatibility and maintenance** — Additional fixes landed for MySQL/Postgres protocol validation, cron/date bounds, `bun install` tarball retries, `bun:test` and Node suite syncs, Windows/macOS-specific issues, docs updates, and assorted test hardening.
