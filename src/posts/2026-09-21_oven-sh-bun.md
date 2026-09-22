---
date: 2026-09-21
repo: oven-sh/bun
size: L
title: "Bun ships GC, streams, TLS, and build fixes"
excerpt: "Major runtime correctness fixes land alongside a big event-loop refactor and build/CI improvements."
commits: 27
authors: [robobun, dylan-conway, alii, eastlondoner, Jarred-Sumner]
commit_authors: {"b7ea95a": Jarred-Sumner, "36aad18": dylan-conway, "6cbf919": robobun, "30787eb": robobun, "effdc9a": robobun, "a65a98f": robobun, "d34421a": robobun, "6683f74": robobun, "c7e647f": dylan-conway}
---

**GC tick now backs off under idle timer chatter** (b7ea95a)
Bun’s idle GC cadence now scales its “has the heap really grown?” slack with the timer interval instead of using a fixed 2 MB threshold. That lets timer-heavy parked apps escape the 1 s tick and fall back to the slower cadence instead of burning CPU on pointless collections.

**Event loop tasks are split into per-callback types** (36aad18)
`ManagedTask` is removed and each of its 19 users now has its own `Taskable` type. The refactor trims allocations and indirect calls from event-loop dispatch, and it also changes ownership/lifetime handling for bundle parse results and similar callbacks.

**Fetch now surfaces abort reasons to native body readers** (6cbf919)
When a `fetch()` body is aborted, native consumers of `res.body` now receive the original `signal.reason` instead of a generic empty/late-abort outcome. The fix updates the stream plumbing for byte streams and file readers so aborted native readers fail consistently with JS readers and Node.

**Locked readable-stream errors regain `ERR_INVALID_STATE`** (30787eb)
`cancel()`, `pipeTo()` and `pipeThrough()` on locked streams now attach `code: 'ERR_INVALID_STATE'` again. This restores Node-compatible error shape after the C++ streams rewrite removed it.

**TLS clients reject bad chains before sending client certs** (effdc9a)
`fetch`, `Bun.SQL`, `Bun.RedisClient` and WebSocket clients now apply `rejectUnauthorized` during handshake setup instead of after the handshake completes. That prevents mTLS client certificates from being sent to servers whose chains fail verification.

**Accepted TLS sockets now close correctly after a reset** (d34421a)
`node:net` now fails a parked write when the socket is already closed, even if the native close arrived without an error. This fixes accepted sockets that could previously get stuck after a peer reset, with no `'close'` event and a server that never finished shutting down.

**WebSocket renegotiation uses the original verified hostname** (6683f74)
TLS WebSockets now remember the hostname verified during upgrade and re-check against that value on renegotiation. That fixes IP-address WebSocket connections being dropped on TLS 1.2 renegotiation because the later check was incorrectly using SNI-derived state.

**A crash in `spyOn` on non-function indexed props is fixed** (a65a98f)
The test suite now covers a case where `spyOn(obj, index)` corrupts indexed properties that are not functions. The fix prevents a segmentation fault and preserves the original property value.

**The build system now includes native timing instrumentation** (c7e647f)
`bun run build --timings` now emits a timing report and HTML chart for build phases, and CI gets the same visibility. The change also simplifies symbol-order file inheritance across builds, which the new timing path depends on.

### Other misc changes
- CI and mordant job churn: bumps, baseline refreshes, and workflow fixes (8 commits)
- Darwin CI script updates and Homebrew tap-trust fixes (2 commits)
- Build/target and test harness maintenance, including module-graph GC test stabilization and Rust target fixes (5 commits)
- Docs updates and small cleanup/refactor commits (5 commits)
