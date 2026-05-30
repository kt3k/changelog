---
date: 2026-03-08
repo: nodejs/node
period: weekly
slug: 2026-W10
period_label: "Mar 2–8, 2026"
size: L
title: "Node tightens security, fixes races, and ships 25.8.0"
excerpt: "Weekly release with HTTP hardening, stream/REPL/parser race fixes, per-env CA handling, and Node 25.8.0/22.22.1 releases."
commits: 58
---

### Security and HTTP hardening
**HTTP validation got stricter** — `ClientRequest.path` is now revalidated on reassignment, and `writeEarlyHints()` validates both `Link` and extra headers before serialization, closing injection and TOCTOU-style gaps.

### Streams, compression, and parser race fixes
**Compression streams now match spec behavior more closely** — trailing garbage is rejected, brotli decode failures surface as `TypeError`, and synchronous write errors properly tear down the underlying stream so reads don’t hang.

**Race and lifetime bugs were fixed across core** — TransformStream cancel/write races no longer leak internal errors, pipelined HTTP parsing avoids a use-after-free during synchronous close, and async context frames are released on destroy to reduce ALS leaks.

**UTF-8 partial writes are preserved** — `Utf8Stream` now backs up to character boundaries so multi-byte text isn’t split or dropped during partial writes.

### Runtime and API behavior changes
**Module and URL behavior was tightened** — `require.resolve()` now honors `module.registerHooks()` resolve hooks, while `url.parse()` warnings are suppressed inside `node_modules` to reduce dependency noise.

**SQLite and compression APIs got safer** — SQLite iterators now detect statement invalidation after reuse, and CompressionStream/DecompressionStream accept `ArrayBuffer` input correctly.

**Crypto CA handling is now per environment** — `--use-system-ca` no longer behaves as a process-global setting, improving correctness for workers and other isolated environments.

### Releases and platform updates
**Node 25.8.0 and 22.22.1 were published** — 25.8.0 landed with the cycle’s main fixes and feature work, and 22.22.1 picked up the UTF-8 stream fix plus LTS release-note updates.

**Build and ABI maintenance continued** — the ABI map reserved NMV 146 for Electron 42, non-bundled-V8 builds stopped pulling in V8-only deps, and `--max-heap-size` was added as a new memory cap option.

### Other misc changes
- Updated bundled Undici to 7.22.0.
- Documented `syncHooks.deregister()` and clarified several util/doc behaviors.
- Expanded `SECURITY.md`, refreshed WPT fixtures/status data, and made assorted tooling, CI, and build-script fixes.
