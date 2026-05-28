---
date: 2026-05-21
repo: nodejs/node
size: L
title: "QUIC gets faster, safer, and more capable"
excerpt: "Node.js adds DTLS experimentally, expands QUIC APIs, and lands major QUIC performance and safety work."
commits: 41
authors: [jasnell, MoLow, richardlau, watilde, inoway46, legendecas, nodejs-github-bot, nadalaba, joyeecheung]
commit_authors: {"9968679": jasnell, "2f56cd2": jasnell, "4aea61d": jasnell, "1776f3f": jasnell, "320a3a2": jasnell, "3c42f78": jasnell, "0163847": jasnell, "5d1ea79": jasnell, "b621fb3": jasnell, "5b3c053": jasnell, "fdbfb68": jasnell, "fcddd35": jasnell, "b6c6a83": jasnell, "ff8aa78": jasnell, "f835cc4": jasnell, "067d2a2": jasnell, "436748f": jasnell}
---

### **Experimental DTLS lands in Node.js** (436748f)
Node.js now ships a new experimental `node:dtls` module, gated behind both build-time and runtime `--experimental-dtls` flags. The API is documented as unstable and integrates with the permission model via `--allow-net`, making DTLS available for UDP-based secure transports like WebRTC or CoAP.

### **QUIC session API grows application and transport introspection** (2f56cd2, 4aea61d)
QUIC sessions now expose `applicationOptions`, plus getters for local and remote transport parameters. This makes negotiated protocol settings observable from JavaScript and gives users better visibility into handshake state and connection configuration.

### **QUIC gets a major performance pass** (ff8aa78, 9968679, 3c42f78, 1776f3f, 320a3a2, b6c6a83, fdbfb68)
Multiple QUIC internals were reworked to cut allocations, batch packet sending, coalesce received data/buffers, and improve stream-header collection. The changes also add shared aliased arenas for stats/state, which should reduce per-connection memory overhead and improve latency and throughput.

### **QUIC fixes several use-after-free and handshake crash bugs** (b621fb3, 5b3c053, 5d1ea79, fcddd35, 0163847)
Several lifetime bugs were fixed across QUIC bindings, streams, sessions, endpoints, and handshake failure paths. These are the kinds of changes that matter most for a networking stack: they reduce crash risk and close off memory-safety issues.

### **QUIC stream stats become more detailed** (3c42f78)
Stream stats now track receive-buffer accumulation and peak accumulation, and the docs explain how to use them to diagnose backpressure. That gives operators a much clearer picture of when applications are falling behind incoming data.

### **DTLS gains stats and interoperability coverage** (067d2a2, f835cc4)
The new DTLS work picked up stats surfaces and OpenSSL interop tests, fleshing out the experimental API beyond the initial implementation. That improves confidence in the protocol implementation before wider use.

### Other misc changes
- QUIC: session/session-stream bookkeeping, RTT defaults, connection limits, ECN prep, version-nego rate limiting, and other incremental API/internal tweaks (11 commits)
- test: assorted QUIC test fixes and cleanup, including serverEndpoint close handling and recv-coalescing adjustments (5 commits)
- test_runner: parentId/replay-duration/spec-reporter refinements (3 commits)
- src: expose `node::RegisterContext` for managed contexts
- doc/meta: release/toolchain/docs updates, typo fix, gitignore and gypfile churn, snapshot test unskip
