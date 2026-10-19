---
date: 2026-10-18
repo: nodejs/node
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: L
title: "Node unflags VFS, rolls V8 15.6, and tightens core APIs"
excerpt: "Major engine and runtime updates landed, plus performance fixes across streams, HTTP, WebStreams, and async/permission handling."
commits: 90
---

### Runtime and engine upgrades
**VFS is now enabled by default** — `node:vfs` was unflagged, replacing `--experimental-vfs` with `--no-experimental-vfs` for opt-out. Docs and worker loading behavior were updated alongside it.

**V8 15.6 and addon ABI bump** — Node rolled to V8 15.6.75.13 and bumped `NODE_MODULE_VERSION` to 153, so native addons will need rebuilds for this runtime line.

**Embedded dependencies refreshed** — SQLite moved to 3.54.0 and Acorn to 8.19.0, while Undici was updated to 8.12.2. These bring upstream fixes, parser improvements, and dependency syncs into the release.

### Performance and correctness across core subsystems
**Streams and WebStreams got leaner** — Multiple changes reduced allocation churn in `pipeTo()`/`tee()`, `TransformStream` construction, and stream/iter pipelines. The week also fixed a `fromWritable()` drain race and improved `pipeToSync()` handling.

**HTTP, URL, and query parsing were optimized** — `getRawHeaderNames()` now avoids an extra allocation, `URLSearchParams.sort()` uses one less scratch buffer, and URL/query decoding avoids redundant rescans and value corruption with encoded keys.

**Async context and finalization fixes** — `AsyncResource::MakeCallback()` now preserves `AsyncLocalStorage` state correctly, and `process.finalization.register()`/`registerBeforeExit()` now return unregister functions that actually detach registry entries.

**Security and validation hardening** — QUIC now validates stream error codes, `net.BlockList` fails closed when peer lookup fails, permissions no longer drop narrower fs grants, and `AbortSignal.any()` cleanup no longer leaks nested composites.

### Worker, SEA, and loader behavior
**SEA VFS and worker loading were reworked** — `vfsArchive`/`--vfs-load` behavior was adjusted for worker compatibility and audit mode, with docs and validations updated. A related worker loading regression was fixed so `require(esm)` works again on the `module.register()` hooks thread.

**Addon, crypto, and X509 fixes** — `crypto.randomInt()` no longer reuses stale cache bytes, and X509 curve lookup now handles non-NIST curves without crashing.

### Other misc changes
- Test runner mocks gained `mockReturnValue()`, `mockResolvedValue()`, and `mockRejectedValue()` helpers.
- Several worker/inspector/reporting tests were hardened against timing flakiness.
- Legacy `_http_*` internals were deprecated in favor of public HTTP APIs.
- Docs, CI, and release metadata were updated across VFS, QUIC, permissions, OpenSSL, and workflow tooling.
