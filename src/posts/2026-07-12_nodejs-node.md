---
date: 2026-07-12
repo: nodejs/node
size: L
title: "Worker-thread TCP transfers land"
excerpt: "Node.js adds transferable TCP sockets and servers for worker threads, plus fixes for HTTP perf_hooks, Blob line endings, MIME params, and streams."
commits: 13
authors: [aduh95, Archkon, watilde, pimterry, mcollina, stefanobaghino, MoLow, trivikr]
commit_authors: {"b4c7be3": watilde, "19a95f3": watilde, "47b6ef2": mcollina, "2d7fee0": stefanobaghino, "892976d": MoLow, "17163ea": Archkon, "14166a5": trivikr}
---

### **Transfer TCP sockets and servers across worker threads** (47b6ef2)
Node.js can now move freshly accepted TCP `net.Socket`s and listening `net.Server`s between worker threads via `postMessage()` transfer lists. This enables cluster-like connection dispatch on top of workers, with platform limits and new transferability errors documented for unsupported or already-active handles.

### **Fix HTTP perf_hooks URLs for proxies and non-default ports** (2d7fee0)
The `perf_hooks` HTTP client entry now preserves the request authority, including non-default ports and IPv6 brackets, instead of rebuilding it from the bare hostname. It also avoids duplicating protocol/authority when proxying rewrites the path to absolute-form, so reported URLs match the actual request.

### **Add `context.log()` and immediate `test:log` events** (892976d)
The test runner now exposes a live logging channel for tests and suites, emitted in execution order rather than declaration order. Reporters can use this to surface per-test logs reliably even under concurrency and process isolation.

### **Make MIME parameter accessors case-insensitive** (b4c7be3)
`MIMEParams.get()`, `has()`, `delete()`, and `set()` now normalize names to ASCII lowercase before lookup or mutation. That fixes unreachable parsed parameters and prevents duplicate case-colliding entries, aligning Node with the MIME spec and reference behavior.

### **Normalize lone `\r` in native Blob endings** (19a95f3)
`Blob` line-ending conversion now treats standalone `\r` the same as `\n` and `\r\n` when `endings: 'native'` is used. This fixes incorrect text output on platforms where native endings differ, especially for inputs containing mixed or repeated carriage returns.

### **Fix `socketErrorListener` after a complete HTTP response** (17163ea)
HTTP client socket teardown now stops emitting late socket errors once a response already exists, instead letting the response finalize cleanup. This avoids spurious errors after a complete response and preserves the historic behavior for explicit user-destroyed requests/responses.

### **Validate `writevSync()` chunks before queueing** (14166a5)
The stream iterator writer now checks every chunk before enqueuing a batch, so invalid chunks fail fast with `ERR_INVALID_ARG_TYPE`. That prevents partially queued data from leaking through after a synchronous writev validation failure.

### Other misc changes
- Nix tooling updates and a new Nix change-diff workflow.
- Benchmark workflow comment-posting option.
- Minor docs/test cleanup and typo fixes.
- Flaky blob test adjustment.
