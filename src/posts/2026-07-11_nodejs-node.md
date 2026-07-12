---
date: 2026-07-11
repo: nodejs/node
size: M
title: "Streams, QUIC deps, and docs refreshed"
excerpt: "A QUIC dependency update, stream performance and correctness fixes, plus clearer test event docs landed today."
commits: 5
authors: [efekrskl, nodejs-github-bot, mcollina, MoLow, trivikr]
commit_authors: {"abe2545": efekrskl, "8a3b11c": nodejs-github-bot, "9f1ae22": mcollina, "8f5fda2": MoLow, "6eff679": trivikr}
---

### **Stream reads and iteration got faster** (9f1ae22)
Node trimmed extra pull checks in default WHATWG stream paths and skipped default size-algorithm overhead when enqueueing chunks. The change should improve read and async-iteration performance, with the commit noting measurable wins across several benchmarks.

### **SAB-backed stream iterator chunks now copy to ArrayBuffer** (6eff679)
Stream iter consumers now copy SharedArrayBuffer-backed bytes into real ArrayBuffer instances so `bytes()` and `arrayBuffer()` match the spec more closely. This fixes a correctness issue that could leak SAB-backed results to APIs that promise `ArrayBuffer` output.

### **QUIC dependency updated to ngtcp2 1.24.0** (8a3b11c)
Node refreshed its bundled `ngtcp2` dependency and adjusted the surrounding QUIC glue to match the upstream API and file layout changes. The update also adds an OpenSSL cleanup hook, which helps avoid leaks and keeps the embedded QUIC stack aligned with upstream.

### **HTTP IncomingMessage no longer takes an unused read argument** (abe2545)
`IncomingMessage.prototype._read` dropped its unused `n` parameter. This removes dead code and the old V8 adaptor-frame workaround comment, reflecting that the historical engine limitation is no longer relevant.

### **Other misc changes**
- Added a test API doc table grouping `TestsStream` events by scope and emission order (8f5fda2)
- Test coverage updates for the SAB stream iterator fix (6eff679)
- Minor internal cleanup in `lib/_http_incoming.js` related to the removed `_read` parameter (abe2545)
