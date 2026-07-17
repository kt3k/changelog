---
date: 2026-07-16
repo: nodejs/node
size: L
title: "QUIC cert compression lands, streams and net polished"
excerpt: "Node.js adds TLS certificate compression for QUIC, tightens stream iterator validation, and fixes several stream/fs edge cases."
commits: 9
authors: [trivikr, Y1D7NG, sxa, bjohansebas, mcollina, PickBas, Renegade334, guybedford]
commit_authors: {"a27fe21": Y1D7NG, "cc8594a": bjohansebas, "cf882a7": mcollina, "874e96e": trivikr, "608112a": trivikr, "39ed68c": guybedford}
---

### **QUIC now supports TLS certificate compression** (cc8594a)
Node.js can now enable RFC 8879 certificate compression via the new `certificateCompression` TLS option, including for QUIC sessions. The change can reduce handshake size and avoid an extra round trip, which is especially valuable under QUIC's anti-amplification limits.

### **Stream iterators now validate `signal` and reject `throw()` properly** (874e96e, 608112a)
The stream iterator APIs now validate `options.signal` across push, broadcast, classic, and fromWritable paths, instead of silently ignoring bad inputs. Separately, `iterator.throw()` now rejects with the supplied error rather than resolving `{ done: true }`, bringing the behavior in line with consumer cancellation semantics.

### **`net.Socket` from `BoundSocket` now connects synchronously** (39ed68c)
Connecting a socket built from an adopted `BoundSocket` to a numeric IP literal now issues `connect(2)` synchronously, so `localAddress` and `localPort` are available as soon as `connect()` returns. That makes the new `BoundSocket` path behave more predictably while still surfacing failures asynchronously.

### **VFS read streams no longer race async iteration** (a27fe21)
`VirtualReadStream` now uses `_construct()` to open the file and emit `open`/`ready`, fixing a race that could break `for await...of` consumption. The accompanying tests cover explicit file descriptors and pipeline/iteration flows.

### **WHATWG writable backpressure update is cheaper** (cf882a7)
Backpressure is now derived directly inside the update helper instead of being precomputed and passed around, and a couple of redundant assertions/helpers were removed. This trims overhead on hot write paths and improves write-loop and `pipe-to` throughput.

### Other misc changes
- Windows `fs.cp` symlink/EEXIST handling fixes (1 commit)
- Merge script wording tweak for PR-URL errors
- Temporal C API crate path extracted into a gyp variable
