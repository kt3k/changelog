---
date: 2026-08-23
repo: denoland/deno
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "Deno hardens multipart, npm resolution, and HTTP edge cases"
excerpt: "This week focused on correctness and safety across multipart parsing, Node/npm compatibility, HTTP serving, crypto, and native resource ownership."
commits: 25
---

### **Compatibility and correctness hardening across core APIs**
Deno spent the week tightening behavior around tricky edge cases in fetch, Node compatibility, and process spawning. Multipart form parsing now follows RFC 2046 boundary rules more closely, Windows subprocess arguments reject embedded NULs, outgoing `writeHead()` headers are validated for all supported input shapes, and `MessagePort` internals were made non-writable to prevent userland from mutating resource bookkeeping.

### **Node/npm resolution got smarter and less explosive**
Several fixes landed for npm graph handling. Bare `npm:` specifiers now fall back to the newest version allowed by the dependency date when `latest` is too new, peer-resolution caching now recognizes fallback-installed peers to avoid re-resolution loops, and package IDs are flattened when peer expansion is unambiguous so deep graphs don’t blow up into duplicated identifiers.

### **HTTP serving and fetch behavior became safer and more browser-like**
`Deno.serve()` got a series of streaming fixes: request bodies can keep being read after an early response, fixed-length streaming responses now truncate to `Content-Length` instead of erroring on oversized chunks, and fetch now advertises a larger HTTP/2 header-list limit to match browser behavior and avoid spurious protocol errors. Node proxy requests also now build absolute-form targets through the URL parser instead of string concatenation.

### **Crypto and decoding fixes close data-corruption and spec gaps**
Node crypto updates now size typed-array inputs by bytes instead of elements, X448 key derivation now follows RFC 7748, and V8 deserialization correctly preserves view offsets. `TextDecoder.decode()` now snapshots SharedArrayBuffer-backed input before decoding, fixing a race that could corrupt native memory under concurrent mutation.

### **Native resources and platform internals were cleaned up**
Native timer handling now wakes the event loop at the earliest deadline instead of waiting for unrelated activity, Unix pipe descriptors now have explicit ownership tracking across connect/accept/listen flows, and `node:sqlite` invalidates active sessions when the database closes. These changes reduce hangs, double-closes, and stale-handle bugs.

### Other misc changes
- `.gitignore` parsing now preserves valid rules after malformed lines and improves publish dry-run behavior.
- Process loader environment validation tightened for whitespace-only values.
- CI stability improved with shard timeouts, non-fail-fast behavior, and better shard assignment.
- Minor test updates and internal refactors.
