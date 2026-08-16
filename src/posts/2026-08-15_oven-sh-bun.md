---
date: 2026-08-15
repo: oven-sh/bun
size: L
title: "Parser, XML, install, and streams fixes"
excerpt: "Big day of API cleanup, security fixes, and behavior corrections across XML, install, compression streams, and server I/O."
commits: 106
authors: [robobun, alii, Jarred-Sumner, dylan-conway]
commit_authors: {"f816432": robobun, "95cb693": robobun, "c1ae5ca": robobun, "cf93e6d": robobun, "a5c86ae": robobun, "4bf3f36": dylan-conway}
---

### **Compression streams now honor `highWaterMark` and stop OOMing on huge output** (cf93e6d)
`CompressionStream` and `DecompressionStream` gained an optional `strategy` argument with a Bun-specific `highWaterMark`, and the native codec path was reworked to step through output in bounded chunks. This closes a serious memory-safety/DoS class where one input chunk could expand into an enormous single `read()` result and overwhelm consumers.

### **Bun.XML contract is now explicit and complete** (4bf3f36)
`Bun.XML.parse` and `Bun.XML.stringify` were clarified and fixed around compact vs tree shapes, comments/processing instructions, whitespace, error cases, and supported input types. This is a significant public API stabilization for a feature that had not shipped yet, and it removes ambiguity around how XML data is represented and serialized.

### **Registry credentials embedded in bunfig/registry URLs now work** (95cb693)
Registry URLs with `user:pass@host` or token-style credentials are now parsed and preserved across the bunfig and npmrc config paths, instead of silently dropping auth. That fixes authenticated registry access for common config forms and closes a correctness gap that affected installs and publish flows.

### **Install now fails correctly on unresolved dependency manifests** (c1ae5ca)
`bun outdated` and `bun update -i` now return failure when a dependency manifest cannot be fetched, instead of pretending everything is up to date. That makes registry outages and missing packages visible to users and aligns Bun with expected package-manager behavior.

### **HTTP/2 fetch is capped against infinite continuation frames** (a5c86ae)
The HTTP/2 client now limits CONTINUATION frames per header block, preventing a hostile peer from pinning `fetch()` forever with empty frame spam. This is a security fix for a CPU-bound denial-of-service class.

### **Server response/body handling was consolidated to remove duplicate pointer and protection logic** (f816432)
`RequestContext` now centralizes `AnyResponse` pointer erasure and body-protection logic instead of repeating the same matches in multiple places. The change reduces maintenance risk in one of the runtime’s most sensitive code paths and makes the render/protect flow harder to get out of sync.

### **Streams, socket, install, and parser correctness fixes across the runtime**
Several other high-impact fixes landed too: `bun install`/lockfile handling was tightened in multiple places, `bun prune`/workspace behavior was corrected, `bun test` spawn/timeout/isolation edge cases were fixed, and the HTTP/socket stack got shutdown/backpressure and close-delimited framing fixes. On the parsing side, there were important crash guards for oversized sources and large native error messages.

### Other misc changes
- Mostly refactors to replace positional bools with enums/structs across parser, CSS, SQL, CLI, and runtime internals.
- CI/build tweaks: darwin lane scheduling, Miri parallelization, rustc annotation handling, cargo locking, and mordant pin/baseline updates.
- Documentation rewrites and clarifications, plus smaller test-only updates.
