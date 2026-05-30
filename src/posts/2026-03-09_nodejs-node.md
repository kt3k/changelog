---
date: 2026-03-09
repo: nodejs/node
size: M
title: "REPL fix, webstreams tuning, docs cleanup"
excerpt: "Key fixes for REPL exception handling and webstreams pipeTo, plus a docs copyedit and ICU/V8 dependency updates."
commits: 6
authors: [richardlau, aduh95, addaleax, MattiasBuelens]
commit_authors: {"17c76c1": richardlau, "e39e1fd": aduh95, "bd3cba5": addaleax, "a0d8ea4": richardlau, "f82525e": MattiasBuelens}
---

### **REPL now keeps handling uncaught exceptions after input ends** (bd3cba5)
The REPL no longer drops back to process-level uncaught exception handling just because its input stream has already closed. This preserves the intended REPL behavior for async exceptions and avoids surprising crashes in closed-input scenarios.

### **webstreams `pipeTo` waits on backpressure more carefully** (f82525e)
`ReadableStream.prototype.pipeTo()` now checks destination backpressure before awaiting readiness, and it rechecks shutdown state at safer points. The batching logic was also tightened so it keeps pulling from the source consistently while avoiding extra work during closing/erroring transitions.

### **Addon docs were rewritten for clarity and modern usage** (e39e1fd)
The addons guide was copyedited to be less C++-centric, recommend Node-API more clearly, and add a simple non-node-gyp build example plus an ESM example. This is a substantial docs refresh for addon authors, but it does not change runtime behavior.

### **V8 wasm jump-table patch fixes PPC/S390 offsets** (a0d8ea4)
Node’s vendored V8 picked up a wasm jump-table fix that corrects target patching on PPC/S390 and masks the PPC64 branch offset properly. The embedder string was also bumped to reflect the additional non-official V8 patch.

### **resb crate patched for big-endian correctness** (17c76c1)
Node now carries a local patch of the `resb` crate to fix behavior on big-endian platforms. This keeps ICU4X-related dependency code working correctly where byte order previously broke deserialization.

### Other misc changes
- Timezone update workflow reverted to `ubuntu-latest` so `icupkg` is available.
