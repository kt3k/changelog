---
date: 2026-09-29
repo: oven-sh/bun
size: L
title: "Bun adds string-code lock and fixes HTTP edge cases"
excerpt: "New strict code-generation blocking lands, alongside key HTTP, pipe, TLS, and test-runner fixes."
commits: 14
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"ba3f27d": Jarred-Sumner, "dc3660d": robobun, "5e75689": robobun, "50c68ae": robobun, "2fae4ff": robobun, "6fe95ef": robobun, "8e6cc91": robobun, "542f52b": Jarred-Sumner, "b253e8a": dylan-conway}
---

**Add `--disallow-code-generation-from-strings`, including a Bun-only strict mode** (b253e8a)
Bun now supports Node-compatible blocking of `eval()`/`Function`, plus a stricter process-wide mode that refuses every string-to-code path Bun can reach. The new flag also covers workers, VM contexts, the inspector, native addons, and compiled executables, closing a major security-hardening gap.

**Fix `process.stdout`/`stderr` nonblocking behavior for spawned children** (ba3f27d)
POSIX child processes now clear inherited `O_NONBLOCK` where needed and Bun stops dropping console output on `EAGAIN`. This brings spawned stdio closer to Node/libuv semantics and fixes a class of lost-output bugs on pipes and sockets.

**Repair `node:http` close/listen and tunnel-body lifecycle bugs** (542f52b, 8e6cc91, 6fe95ef)
Several HTTP fixes landed together: second `listen()` now throws like Node, `closeIdleConnections()` uses the right idle window, split request heads are preserved correctly, and tunnel/request-body teardown no longer double-finishes or reads freed state. These changes tighten compatibility and fix hangs, leaks, and premature closes in edge-case server flows.

**Make paused TLS handshakes stay paused while parked** (5e75689)
Sockets paused while waiting in uSockets’ low-priority TLS handshake queue are no longer re-armed when the queue drains. That prevents `handshake`/`data` callbacks from firing on sockets the app explicitly paused.

**Fix pipe read/write error handling around `EAGAIN` and fatal reads** (dc3660d, ba3f27d)
Pipe readers now stop reading after a fatal error, so the error is surfaced in order instead of being read past. Combined with the writer-side nonblocking work, this makes stdio and pipe behavior more reliable under syscall failure and backpressure.

**Fix minifier symbol collisions and `bun:test` asymmetric matcher typing** (50c68ae, 2fae4ff)
The minifier no longer reuses pinned export names for locals/imports, avoiding invalid generated code like calling a non-function export as a function. `expect.any()` now preserves constructor typing through `.not`, `.resolvesTo`, and `.rejectsTo`, fixing both assertion crashes and wrong match results.

### Other misc changes
- Keep `FileSink` alive until `on_close` returns, preventing use-after-free on Windows.
- Fix empty-string `BunString` error construction debug assertions.
- Declare `undici-types` for `bun-types` and update related install tests.
- Allow zero-capacity `StringBuilder` views; simplify Postgres error-message extraction.
- Update docs and add coverage for the new code-generation flag.
