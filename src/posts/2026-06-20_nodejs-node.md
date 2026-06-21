---
date: 2026-06-20
repo: nodejs/node
size: L
title: "WebCrypto, net and QUIC get major upgrades"
excerpt: "Big day for Node.js: new bound sockets, broader WebCrypto support, QUIC fixes, a stream refactor, and a child_process spawn fast path."
commits: 27
authors: [panva, mcollina, pimterry, anonrig, nodejs-github-bot, watilde, guybedford, targos, addaleax, aduh95, richardlau, avivkeller, legendecas, trivikr]
commit_authors: {"e3cdb14": guybedford, "c27921b": pimterry, "8ec37eb": panva, "68321ef": addaleax, "daecfc0": anonrig, "57a4932": mcollina, "fa2eaa5": mcollina, "83002d5": pimterry, "d1eaaf6": trivikr}
---

### **Bound sockets land for synchronous port binding** (e3cdb14)
Node now exposes a new `net.BoundSocket` that can reserve/bind a socket first, then be adopted later by `server.listen()` or `new net.Socket()`. This adds synchronous port reservation and source-port/IP control for outbound connections, while making adoption consume the handle so `address()` and `close()` no longer apply.

### **WebCrypto gains non-byte lengths and named cSHAKE variants** (8ec37eb)
WebCrypto now accepts bit-length operations beyond byte-aligned boundaries and supports named cSHAKE function names like `KMAC`, `TupleHash`, and `ParallelHash`, plus non-empty customization strings. The implementation was expanded across JS and C++ to preserve requested bit lengths, round storage correctly, and update the relevant WebCrypto docs and tests.

### **child_process.spawn() gets a lower-overhead binding path** (daecfc0)
`spawn()` now passes its hot-path options positionally into the native binding instead of repeatedly reading properties across the JS/C++ boundary. That should reduce per-spawn overhead, especially for workloads that create lots of child processes.

### **HTTP agent hardens idle sockets against response poisoning** (57a4932)
Idle keep-alive sockets now use a more robust data guard that watches for both buffered data and reads at the libuv layer, destroying poisoned sockets before they can be reused. This closes a queue-poisoning window and makes socket reuse safer under adversarial timing.

### **WHATWG streams reduce allocation churn on hot paths** (fa2eaa5)
Readable and writable web streams were refactored to cut per-chunk and per-construction allocations, including lazily materialized reader/writer promises and reused reaction closures. The change targets throughput and memory efficiency in stream-heavy code without observable behavior changes.

### **Broadcast stream iteration now handles overlapping reads correctly** (d1eaaf6)
Overlapping `next()` calls on broadcast iterators are now queued so chunks resolve in call order instead of racing each other. This fixes a correctness bug where later reads could interfere with earlier pending reads.

### **QUIC fixes data loss and backpressure deadlocks** (c27921b, 83002d5)
QUIC stream readers now avoid dropping data on FIN and no longer deadlock when backpressure meets idle connections. Together these fixes make stream reads more reliable at shutdown and under stalled consumption.

### **Misc cleanup-hook API behavior is made more robust** (68321ef)
Environment cleanup hooks now keep a global registry so `RemoveEnvironmentCleanupHook()` still works even when there is no active context or the context belongs elsewhere. This is a fairly internal API fix, but it addresses a real design flaw exposed by test flakiness.

### **Other misc changes**
- Updated `sccache` to v0.16.0 and `nixpkgs-unstable` to a newer snapshot.
- Bumped `js-yaml` in two tool lockfiles and updated Acorn to 8.17.0.
- Tweaked docs and tests, including the generated manpage workflow and several typo/flaky-test fixes.
- Minor crypto, stream, inspector, and build-header guard fixes.
