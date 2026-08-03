---
date: 2026-08-02
repo: denoland/std
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "Std ships stability upgrades, perf fixes, and API cleanup"
excerpt: "A week of breaking cleanup plus new stable utilities: streams, zip, async pooling, stronger XML/YAML errors, and faster text streaming."
commits: 28
---

### **API cleanup continues with breaking XML and YAML changes**
XML’s public surface was reshaped in a breaking cleanup, tightening exported types and improving error reporting when position tracking is off. YAML also got a more structured `YamlSyntaxError` with line/column/offset data, plus single-document enforcement and re-exports for the new types.

### **New and improved error-handling and async primitives**
`@std/http` gained a new unstable `HttpError` class for status-coded handler failures with `cause` and response init support. On the async side, `@std/async/unstable-pool` added abort-aware `pooledMap`, letting queued work be canceled while in-flight tasks finish.

### **Performance and correctness fixes land in core utilities**
`TextLineStream` was reworked to buffer incrementally instead of repeatedly re-slicing accumulated text, removing quadratic behavior on long streamed lines. Tree cloning was fixed so `BinarySearchTree.from()` and `RedBlackTree.from()` deep-copy nodes correctly, and CBOR encoding now ignores inherited enumerable properties to avoid leaking unexpected keys into output.

### **Several unstable APIs graduated to stable**
`BatchStream` moved to a stable `@std/streams` entrypoint, and `zip()` was stabilized for iterable inputs in collections. These promotions make both utilities available as supported public APIs without unstable prefixes.

### **Other misc changes**
- Publish workflow pinned to stable Deno to avoid canary breakage during releases
- Testing, dotenv, and docs deprecations/cleanup continued
- CI matrix, workflow, and contributor-guide updates
- Minor refactors, type cleanup, and doc example enablement
