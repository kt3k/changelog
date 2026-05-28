---
date: 2026-04-27
repo: denoland/deno
size: L
title: "Node compat gets big HTTP/TLS/DNS work"
excerpt: "Major Node.js compatibility fixes landed across http2, TLS, DNS, cluster, and IPC, plus CI changes and test enables."
commits: 32
authors: [bartlomieju, divybot, nathanwhitbot, nathanwhit, lunadogbot]
commit_authors: {"1287800": bartlomieju, "134f7d7": bartlomieju, "51f7f57": bartlomieju, "b7a3fff": nathanwhitbot, "9f06363": bartlomieju, "8e5e2ec": bartlomieju, "0ad03b5": divybot, "c91c783": divybot, "a643fb7": bartlomieju, "f2d875d": divybot, "446377e": divybot, "eeda732": bartlomieju, "3a187c1": divybot, "cb2e06e": divybot, "7c77e1b": nathanwhitbot}
---

**http2 compatibility gets a major overhaul** (446377e, f2d875d, c91c783, 3a187c1, cb2e06e)
Several http2 paths were fixed or added: createConnection now accepts JS Duplexes, custom settings and SETTINGS ACKs are tracked, GOAWAY is flushed before socket teardown, and pending PING callbacks are canceled on destroy. These changes unblock a cluster of Node compat tests and bring Deno closer to Node's http2 session semantics.

**TLS behavior now matches Node more closely** (9f06363, 134f7d7, 1287800, b7a3fff)
TLS socket handling was tightened around handshake/error ordering, app-data leakage before identity verification, timeout internals, and API naming. Together these fixes improve Node compat for HTTPS/TLS flows and enable several previously failing tests.

**DNS lookup/reverse support improved** (8e5e2ec, a643fb7)
`dns.reverse()`/`dnsPromises.reverse()` were implemented, `dns.lookup({ family: 6 })` was fixed to honor the family hint, and SRV targets now have trailing dots stripped. This closes a notable gap in Node's DNS surface area and unlocks more compat coverage.

**Cluster support is now wired up** (0ad03b5)
`node:cluster` can now detect worker state and fork workers via Node-style environment plumbing. This is a substantial compatibility addition because it moves cluster from a stubbed path to a functional implementation for real Node workloads.

**IPC writes were backed out and reworked** (51f7f57, eeda732)
The fully synchronous IPC write approach was reverted because it could stall the event loop on large or slow messages. The repo then restored the sync-write ops, signaling the team is iterating on a safer hybrid design rather than shipping the earlier behavior.

**`util.styleText()` now matches Node output and validation** (7c77e1b)
Style nesting order, `validateStream` behavior, and the `'none'` identity case were aligned with Node. This affects observable formatting output and error behavior, so it's a meaningful compat fix for tooling and console-like consumers.

### Other misc changes
- CI now shards `node_compat` into 3 jobs and several flaky/passing compat tests were enabled or ignored.
- `spawnSync` monkey-patching and `killSignal` handling were fixed.
- `Readable.toWeb()` cancel behavior, `rmdir({ recursive })`, `AbortSignal.addEventListener`, proto-pollution guards, and `perf_hooks.timerify` received smaller compat fixes.
- Minor internal/test updates across webidl, task matching, and node compat config.
