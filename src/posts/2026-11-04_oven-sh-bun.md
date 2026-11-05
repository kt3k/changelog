---
date: 2026-11-04
repo: oven-sh/bun
size: L
title: "Bun tightens FFI safety and fixes tarball auth"
excerpt: "A broad safety refactor removes unsafe from core internals, while installs now send configured credentials to project-owned tarball URLs."
commits: 6
authors: [dylan-conway]
commit_authors: {"e57d89b": dylan-conway, "05a0ec9": dylan-conway, "b9f2ec3": dylan-conway, "e0953f4": dylan-conway, "cdfa19b": dylan-conway, "9365e0c": dylan-conway}
---

### **Install now sends configured creds to project tarball URLs** (e0953f4)
Bun’s package manager now applies `.npmrc`/configured credentials when the project itself names a tarball URL, instead of treating all tarballs the same. That closes a real auth gap for workspace, root, and config-driven dependency references, and the change is backed by a new end-to-end install test.

### **Several low-level FFI and event-loop calls are no longer safe by default** (e57d89b)
This commit reclassifies a handful of imports and callbacks as unsafe-to-call, including `epoll_ctl`, `kevent`, uSockets loop imports, and `Bun__FFI__closeFunctions`. The signatures now better match the actual preconditions, reducing the chance that callers treat unchecked native interfaces as safe Rust APIs.

### **More unsafe blocks are removed from the VM, DNS, timers, and server code** (9365e0c)
A large internal refactor keeps chipping away at manual `unsafe` by replacing raw-pointer patterns with borrow-checked ownership and narrower invariants. The biggest visible effect is in core runtime areas like the virtual machine, DNS, timers, and socket/server paths, which should make future maintenance and audits easier.

### **Unsafe blocks are removed from event-loop, spawn, JSC, and fs paths** (cdfa19b)
This is another broad safety cleanup across event-loop and runtime internals, including `bun_jsc`, `node:fs`, and `fs.watch` neighbors. The work continues Bun’s effort to encode invariants in types and signatures instead of relying on hand-written pointer discipline.

### **Blob, fetch, Response, and file-writing internals shed unsafe code** (b9f2ec3)
This commit applies the same safety sweep to web/runtime APIs: `Blob`, `Bun.write`, `FileSink`, `fetch`, `Response`, and the S3 client. It trims a large amount of low-level `unsafe` plumbing from hot API surfaces, which lowers the risk of subtle memory-safety regressions.

### **HTTP stream buffer ownership is made more explicit** (05a0ec9)
`ThreadSafeStreamBuffer` and related HTTP code are refactored to use clearer shared-state handling instead of a mutable buffer-centric API. The change also removes a large number of `unsafe` blocks in bundler/transpiler code and deletes an obsolete allocator, continuing the repo-wide cleanup of unnecessary unsafe abstractions.

### Other misc changes
- Docs updated for tarball dependency credential behavior.
- Minor allocator, event-loop, and lint/config cleanup.
- Misc internal refactors in networking, spawn, and runtime helpers.
