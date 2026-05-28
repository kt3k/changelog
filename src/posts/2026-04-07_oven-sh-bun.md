---
date: 2026-04-07
repo: oven-sh/bun
size: L
title: "Bun hardens HTTP, DNS, and globbing"
excerpt: "Security and correctness fixes land alongside a DNS API exposure and a bigger test/CI concurrency sweep."
commits: 6
authors: [dylan-conway, robobun]
commit_authors: {"49221ca": dylan-conway, "7e142ca": dylan-conway, "c99fd9d": robobun, "0ff0065": dylan-conway, "e9b094c": dylan-conway, "196ed8a": dylan-conway}
---

### **HTTP parser now rejects conflicting Content-Length headers** (196ed8a)
Bun now walks all `Content-Length` headers and returns `400` when duplicates disagree, instead of trusting only the first value. That closes an ambiguity that can enable request smuggling and aligns the parser with RFC 9112.

### **`node:dns/promises` now exposes `getDefaultResultOrder()` correctly** (c99fd9d)
The DNS promises API now exports `getDefaultResultOrder`, and the underlying implementation returns the order string instead of the function object. This fixes a real compatibility break for tooling like Vite 8 that expects the Node API to be present on `node:dns/promises`.

### **GlobWalker is now bounded against path-buffer overflows** (e9b094c)
`GlobWalker` adds length checks before copying paths into fixed-size `PathBuffer` scratch space and converts previous panic-on-overflow paths into `NAMETOOLONG` errors. That turns a potential out-of-bounds write on deep trees or symlink-heavy scans into a clean failure.

### **Deprecated file-descriptor aliases are removed** (0ff0065)
The codebase finishes the `bun.FileDescriptor` / `bun.StoredFileDescriptorType` rename to `bun.FD`, reducing type alias churn across runtime and Zig sources. It also deletes a dead `StreamTag` enum surfaced during review.

### **Proxy and syntax tests run concurrently** (49221ca)
Several already-isolated test blocks were marked concurrent, including proxy matrix cases, redirect coverage, and the proxy-object header tests. This should shave per-platform test wall time without changing behavior.

### **Valkey TLS fixture certificate refreshed** (7e142ca)
The expired self-signed certificate used by the Valkey Docker TLS test was regenerated with a long validity window. That restores the TLS-backed Redis client tests on Linux CI.

### Other misc changes
- Added a `bun run pr:comments` helper plus docs for fetching full GitHub PR feedback.
- Small test refactors and fixture reshaping in syntax/proxy coverage.
- CLAUDE/docs and internal type updates from the FD rename.
