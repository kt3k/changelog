---
date: 2026-08-11
repo: oven-sh/bun
size: L
title: "Spawn cgroups and fetch keep-alive fixes"
excerpt: "Linux subprocesses can now join cgroups, while fetch/http/tls fixes tighten connection reuse and proxy/WebSocket behavior."
commits: 52
authors: [robobun, alii, Jarred-Sumner, cirospaciari]
commit_authors: {"ce67711": robobun, "d9e2751": robobun, "97e21e5": Jarred-Sumner, "020e2fe": robobun, "da3851e": robobun, "886dba4": robobun}
---

**Bun.spawn gains Linux cgroup placement** (97e21e5)
`Bun.spawn` and `Bun.spawnSync` now accept a `cgroup` option to start the child inside an existing control group before it begins executing. That makes memory, pids, and CPU limits apply from the first instruction and to any subprocesses it spawns, which is a meaningful runtime capability for sandboxing and resource isolation.

**fetch/http connection pooling is corrected for HTTP/1.0 and redirect cases** (ce67711, da3851e, ce67711)
Bun now distinguishes HTTP/1.0 persistence rules from HTTP/1.1, only pooling 1.0 responses when they explicitly say `Connection: keep-alive`, and it better handles redirects and keep-alive decisions when a request has fully drained. This closes several classes of bad socket reuse that could route a follow-up request into a still-active body or a dying connection.

**TLS/WebSocket proxy tunneling no longer re-enters callbacks mid-read** (020e2fe, d9e2751)
The TLS wrapper now guards against decrypting recursively from inside its own callbacks, which prevents the 64 KiB burst misparse seen in `wss://` proxy tunnels. A related WebSocket fix switches the tunnel into forwarding mode before dispatching `open`, avoiding a race where user code could spin the event loop before the client was ready.

**`bun test --parallel` now reports bailouts distinctly from worker panics** (886dba4)
The parallel test coordinator now separates “stopped because of `--bail`” from “stopped because a worker crashed,” so aborted siblings are no longer mislabeled as panics. That improves failure reporting when a long-running worker exits after the suite has already bailed.

### Other misc changes
- WebKit bumped with inspector/debugger fixes for Bun-transpiled modules.
- Multiple internal refactors replaced raw pointers/sentinels with owned enums, `Option`, or private fields across install, bundler, SQL/MySQL, dotenv, test runner, sourcemaps, and webcore.
- HTTP2 push stream headers now preserve array-valued fields as separate headers.
- FS write/position handling was tightened around bigint and offset parsing.
- Build/CI and test-only updates, plus dead-code removals and comment/visibility cleanups.
