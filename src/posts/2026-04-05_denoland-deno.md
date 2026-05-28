---
date: 2026-04-05
repo: denoland/deno
size: L
title: "Native TLSWrap lands for Node compat"
excerpt: "Deno’s Node layer gets a native TLSWrap foundation, plus prep work for TLS context handling and child_process stdio plumbing."
commits: 3
authors: [bartlomieju]
commit_authors: {"11db67a": bartlomieju, "bd2d76d": bartlomieju, "62dfdab": bartlomieju}
---

### **Native TLSWrap added to the Node extension** (11db67a)
Deno now registers a standalone Rust implementation of Node’s `TLSWrap`, intercepting TCP reads and moving data through rustls to produce cleartext for JS. It’s not wired into JS yet, but this lays the core foundation for native TLS support in the Node compat layer.

### **Node TLS context prep gets real validation** (bd2d76d)
`_tls_common.ts` grew from a stub into actual secure-context normalization, including protocol version validation, legacy `secureProtocol` mapping, and cert/key coercion. This matters because the upcoming native TLS path needs Node-compatible option handling before JS wiring can land.

### **Node child_process stdio now bypasses the resource table** (62dfdab)
The Node compat layer adds fd-based read/write ops and switches child_process stdio over to raw pipes/streams instead of resource-ID indirection. That’s a meaningful plumbing change for process I/O behavior and cancellation, especially when child pipes are closed asynchronously.

### Other misc changes
- Added `TlsWrap` to the handle-wrap provider enum.
- Exposed a cancel handle from `ReadCancelResource` for fd read cancellation.
- Misc Node/process/internal binding updates and lint/plugin adjustments.
