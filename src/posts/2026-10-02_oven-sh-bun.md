---
date: 2026-10-02
repo: oven-sh/bun
size: L
title: "TLS fixes, fetch deflate, and Bun test crashes"
excerpt: "A strong day: multiple TLS correctness fixes, safer structured cloning, deflate decoding fixes, and several bun:test crash repairs."
commits: 12
authors: [robobun, dylan-conway]
commit_authors: {"a11362e": robobun, "c5a68b0": robobun, "ffe2f15": robobun, "369615c": robobun, "e29a7ca": robobun, "e196cd6": dylan-conway, "fa467dc": dylan-conway, "76cf78c": dylan-conway, "bc7a813": robobun, "49c076e": robobun, "468efac": robobun, "faac63e": robobun}
---

### **TLS client wrap now upgrades correctly and honors name checks** (ffe2f15)
Client-side `new tls.TLSSocket(socket)` now actually upgrades the wrapped socket instead of leaving it as a plain stream, fixing STARTTLS-style flows that previously threw or crashed. The follow-up handshake path also preserves the right server-name verification behavior when a handshake finishes after `end()`, closing a security/parity gap.

### **Handshake writes are dropped once the socket has already half-closed** (a11362e)
TLS handshake records that can no longer be written after our own FIN are now discarded instead of being parked forever in the SSL spill path. This unblocks socket teardown and prevents one stalled half-closed handshake from consuming the loop’s only spill slot.

### **Structured clone re-checks transfers after serialization** (49c076e)
`postMessage` now validates the transfer list again after user code runs during serialization, so a getter that detaches an `ArrayBuffer` or closes a `MessagePort` can no longer leave unrelated transfers partially applied. That fixes the atomicity bug where a throwing clone could still detach buffers or consume ports.

### **`fetch()` now distinguishes zlib-wrapped vs raw deflate more reliably** (faac63e)
Deflate decoding now uses the RFC 1950 header to decide whether to initialize zlib or raw deflate, instead of guessing from the first byte or trying the wrong fast path. This fixes valid `Content-Encoding: deflate` responses that previously failed depending on chunking.

### **`bun test` no longer segfaults on asymmetric matchers and deep prints** (e196cd6, fa467dc)
Two separate crashers in the test runner were fixed: one when asymmetric matchers hit missing array elements, and another when printing deeply nested values overflowed the stack. Together these make failing tests report diffs instead of taking down the process.

### **`Module.runMain` overrides now fail safely and report thrown errors** (76cf78c)
A preload that sets `Module.runMain` to a non-function now raises a normal `TypeError` instead of segfaulting, and errors thrown by an override are surfaced correctly. This brings Bun’s module entrypoint override behavior much closer to Node’s expected failure modes.

### **Blob slices stream only their slice, even after collection** (e29a7ca)
Consuming a sliced Blob through a stream now respects the slice bounds after the original Blob objects are garbage-collected. This fixes a data-leak bug where reading a slice could return parent bytes outside the requested range.

### **Glob matching now advances by valid Unicode codepoints** (bc7a813)
Glob traversal now validates UTF-8 continuation bytes when stepping across filenames, rather than blindly skipping based on the lead byte. That fixes incorrect matches and avoids path bytes being consumed across separators or past the end of a filename.

### Other misc changes
- Timer `util.promisify.custom` accessor fix (c5a68b0)
- Remove dead `bun build --dump-environment-variables` flag (468efac)
- TLS handshake certificate/name edge-case regression tests and cleanup (369615c)
- Test coverage expansions for sockets, workers, Blob streams, globbing, and module overrides
