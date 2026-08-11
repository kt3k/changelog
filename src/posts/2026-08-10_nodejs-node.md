---
date: 2026-08-10
repo: nodejs/node
size: M
title: "SQLite fix, stable tracing, and teardown hardening"
excerpt: "Notable runtime and API updates landed: SQLite error handling was fixed, TracingChannel was stabilized, and stream/proxy teardown flakiness was reduced."
commits: 11
authors: [pimterry, trivikr, agape1225, nektro, legendecas, aduh95, logaretm]
commit_authors: {"2f65b90": agape1225, "536aca7": nektro, "4a4cc1e": legendecas, "5f1ef0a": aduh95, "404b0cf": pimterry, "64a762b": pimterry, "780229b": trivikr, "ab95309": trivikr, "d512d2d": logaretm}
---

### **SQLite changeset filter errors stay isolated** (ab95309)
`applyChangeset()` now tracks filter callback failures per invocation instead of leaving a database-wide suppression flag behind. That prevents one failed `xFilter` call from masking the next real SQLite error, and the added test confirms the error state is preserved correctly.

### **TracingChannel is now stable** (d512d2d)
`diagnostics_channel.tracingChannel()` and the `TracingChannel` class were promoted from experimental to stable in the public API docs. This signals that the interface is now considered ready for broader production use across tracing and observability tooling.

### **Stream pipe teardown is more robust** (64a762b)
`StreamPipe` now guards against source teardown races and handles destroy paths without re-entering stream interactions after the source is gone. This should reduce flaky destroy behavior and teardown-related edge cases, especially in HTTP/2-adjacent code paths.

### **CONNECT tunnel sockets can drain half-open** (780229b)
Proxy CONNECT handling now keeps the upstream socket half-open so both directions of the tunnel can finish draining cleanly. The corresponding test was tightened to separate real request logs from transport errors, avoiding spurious EPIPE/ECONNRESET noise during teardown.

### **`--enable-static` is deprecated** (4a4cc1e)
The build flag is now a no-op/deprecated option since `libnode.a` is produced by default unless building shared. `configure.py` now warns on the flag and rejects combining it with `--shared`, clarifying the supported build matrix.

### **Other misc changes**
- DNS TXT parsing allocates vector capacity up front for a small performance win (2f65b90)
- Fixed a hidden assertion issue in `test-http-server-stale-close.js` (536aca7)
- Dependency bumps for `js-yaml` in two tooling packages (ad34321, 3c46dbd)
- CI/workflow permission tweak for the commit-queue job (5f1ef0a)
- Test-only flakiness adjustment in HTTP/2 pipeline coverage (404b0cf)
