---
date: 2026-08-16
repo: oven-sh/bun
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "Bun adds cgroups, SQL pub/sub, and hardens core protocols"
excerpt: "A busy week of runtime and platform fixes: process spawning, HTTP/TLS correctness, SQL LISTEN/NOTIFY, XML/TOML, and safer streams/installs."
commits: 302
---

### Major runtime and platform additions
**Bun.spawn now supports Linux cgroup placement** — `Bun.spawn`/`Bun.spawnSync` can launch children inside an existing cgroup, so limits apply from the first instruction and to subprocess trees.

**SQL gains PostgreSQL LISTEN/NOTIFY** — Bun’s SQL client now supports `sql.listen()` and `sql.notify()` with dedicated shared listen connections, reconnect/resubscribe handling, and async-disposable subscriptions.

**Bun.XML is now a defined public API** — `Bun.XML.parse()` and `Bun.XML.stringify()` were fleshed out around shapes, comments, whitespace, errors, and supported inputs, stabilizing the feature’s contract.

**TOML now round-trips Temporal-backed dates and times** — TOML parse/stringify maps date and time forms to the matching `Temporal` types, making date handling lossless and more consistent with modern JS.

### Protocol, networking, and security fixes
**HTTP/1.0, HTTP/2, and keep-alive behavior tightened** — Bun corrected pooling rules for HTTP/1.0, fixed redirect/connection reuse edge cases, capped HTTP/2 CONTINUATION abuse, and rejected `Transfer-Encoding` on HTTP/1.0 requests to close a smuggling-style hole.

**TLS, WebSocket, and socket lifetimes were hardened** — Several fixes removed reentrancy and teardown races in TLS/WebSocket proxy tunnels, adopted sockets, worker shutdown, and connection cleanup, reducing UAF and misparse risks.

**`fetch()`/streams now behave more predictably** — Direct streams no longer drop buffered bytes, `AbortSignal.timeout()` no longer leaks or stalls in edge cases, and HTMLRewriter now respects downstream demand instead of over-reading.

### Node compatibility and runtime correctness
**Cluster, workers, and process semantics got closer to Node** — `node:cluster` now supports real handle passing and round-robin sharing, process warnings register at startup, worker stdout/stderr flush correctly on sync exit, and test bailout reporting is more accurate.

**Buffer, URL, and `node:http` edge cases were fixed** — Detached buffers now behave like Node and return 0 on write, URL/IDNA handling now relies on bundled ICU and a faster parser path, and server wrappers stay alive long enough for late connection events.

**Install and package resolution were tightened** — Auth credentials in registry URLs now survive config parsing, shared git repos and workspace-targeted updates behave correctly, unresolved dependency manifests fail as they should, and isolated store paths no longer leak credentials.

### Other misc changes
- `bun test` diff output was replaced with a new Myers-based engine for more deterministic failures.
- `Bun.serve` and stream/buffer readers got multiple correctness and safety fixes, including EOF clamping for sliced inputs.
- `sql.unsafe()` now supports named parameters in SQLite, plus assorted MySQL/Postgres context and auth-message improvements.
- WebKit was bumped several times for URL parsing, N-API, and inspector/debugger fixes.
- CI, docs, dead-code cleanup, and a large number of internal refactors and platform-specific fixes landed throughout the week.
