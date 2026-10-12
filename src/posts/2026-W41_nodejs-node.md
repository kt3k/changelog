---
date: 2026-10-11
repo: nodejs/node
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: L
title: "Node ships sync ESM loads, stream fixes, and V8 15.5"
excerpt: "A week of startup wins, major stream/Utf8Stream fixes, safer config/permission propagation, and a V8/ABI bump."
commits: 128
---

### Startup, module loading, and core APIs
**Synchronous ES module loading landed for many entry points** — Node can now evaluate ESM entry points synchronously when there’s no top-level await, cutting startup overhead while preserving the async path when needed.

**Core HTTP got native WebSocket masking helpers** — `http.websocketMask()` and `http.websocketUnmask()` expose RFC 6455 masking in core for Buffer/TypedArray/DataView inputs, giving userland WebSocket stacks a faster native primitive.

**The built-in test runner became more capable** — `t.assert` gained mock-call matchers like `called()`, `callCount()`, `nthCalledWith()`, and `lastCalledWith()`, making behavior assertions much richer.

### Streams, Utf8Stream, and async iteration were heavily corrected
**`stream/iter` gained new draining and resilience fixes** — `dump()` / `dumpSync()` now consume iterable streams without retaining chunks, and several correctness issues were fixed around `pipeToSync()`, `from()` / `fromSync()`, abort handling, re-entrancy, and writer error propagation.

**`Utf8Stream` got safer flush and retry behavior** — bounded write retries, better flush draining, and fixed concurrent flush handling make retry and output semantics more predictable, including avoiding corruption when async writes are still in flight.

### Runtime, crypto, and storage reliability improvements
**Node upgraded to V8 15.5 with a NODE_MODULE_VERSION bump** — the runtime picked up V8 15.5.35.20 and ABI version 152, a meaningful compatibility update for native addons and platform support.

**Crypto and QUIC state handling was hardened** — multiple crypto paths reduced locking and fixed state-sharing races, while QUIC tightened session close validation and fixed allocator ownership/thread-safety issues.

**SQLite and buffer-copy paths were made safer and faster** — oversized SQLite text now fails cleanly instead of aborting, `aggregate()` validates arguments earlier, and `copyArrayBuffer()` switched to V8’s fast-copy primitive.

### Config, permissions, and process behavior got stricter
**`--config-file` stabilized and child permission propagation improved** — config files are now stable, the parser is more robust around script boundaries, and spawned processes inherit permission flags from config-file-based setups as well as `process.execArgv`.

**Watch mode and child NODE_OPTIONS handling were fixed** — underscore watch-flag aliases are now stripped correctly, and quoted `NODE_OPTIONS` values preserve escaping when child processes are spawned.

**Network and benchmark tooling saw race fixes** — auto-family TCP connection selection now keeps competing attempts alive until one wins, and the bench CLI fixed an ACK sequencing race.

### Security, supply chain, and build updates
**ICU update tooling now verifies signatures and SHA-256** — the updater now checks PGP signatures with a bundled keyring and records SHA-256 digests, reducing supply-chain risk.

**Build and CI compatibility was refreshed** — simdjson was updated, gtest was removed from the main node link line, Python 3.15 support was added, and assorted V8/build/tooling fixes landed.

### Other misc changes
- `process.finalization` marked release candidate.
- `diagnostics_channel` tracing context allocation fixed.
- CommonJS package-map resolution corrected for `#` imports.
- Documentation refreshed for the new release schedule, HTTP keep-alive guidance, QUIC close codes, and permissions.
- Root certificates, CodeQL, Nix, and assorted test/benchmark fixtures updated.
