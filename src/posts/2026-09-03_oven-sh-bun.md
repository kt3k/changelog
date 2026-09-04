---
date: 2026-09-03
repo: oven-sh/bun
size: L
title: "Bundler fixes dominate, with runtime and install work"
excerpt: "Major bundler correctness fixes landed alongside http2, AsyncLocalStorage, fs/macOS, and installer hardlink/self-contained workspace fixes."
commits: 42
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"6c06195": Jarred-Sumner, "43f4c8c": robobun, "9fac6f1": robobun, "b36143a": robobun, "ef61900": robobun, "77ac31a": robobun, "97c1096": robobun, "e0a2b82": robobun, "eaee5c6": robobun, "497069e": robobun, "14ab660": robobun, "dfa2b12": robobun, "2ce05ce": robobun, "f4840f6": Jarred-Sumner, "79f50ae": Jarred-Sumner, "ebc90be": dylan-conway, "30f8159": robobun, "f31440d": robobun, "685180a": Jarred-Sumner, "8f9aece": robobun, "c2a2b28": robobun, "e9367be": robobun, "473335d": robobun, "1d1f431": robobun, "e62f2e8": robobun, "4b540e6": robobun, "c34a1a5": robobun, "5d6dc96": robobun, "ee7af8b": robobun, "50731fc": robobun, "467e741": robobun, "e8c8d81": robobun, "b0cf0f4": Jarred-Sumner, "1b315c2": robobun, "fd10aef": robobun, "36fc0d9": robobun}
---

### **Bundler preserves CommonJS/ESM behavior across lifted, split, and dynamic imports** (b0cf0f4, fd10aef, 473335d, 50731fc, 5d6dc96, f31440d, 43f4c8c, eaee5c6, f4840f6, 8f9aece, 467e741, c34a1a5, 36fc0d9, e8c8d81)
A large set of bundler fixes tightened how Bun rewrites CommonJS into ESM and how split chunks and dynamic imports are printed. The day’s changes fix missing or wrong defaults, preserve wrappers when `module` is used, keep namespace/default semantics aligned with Node, and correct property access/tree-shaking edge cases that could previously throw or silently return the wrong export.

### **node:http2 now matches peer expectations for flow control and headers** (9fac6f1, b36143a)
Bun fixed SETTINGS ACK ordering so unblocked DATA no longer races ahead of the ACK, avoiding flow-control resets from gRPC/ nghttp2 peers. It also corrected how oversized numeric session options are handled and how latin-1 header values are encoded, closing interoperability bugs against Node servers and proxies.

### **AsyncLocalStorage was reworked for correctness and lower overhead** (685180a)
`AsyncLocalStorage` moved from copying arrays to a persistent frame chain, dropping `enterWith()` frames at the event-loop boundary and removing per-`await`/`then` allocations. That fixes context leakage across unrelated callbacks and should reduce overhead in async-heavy code.

### **Bun.serve and fs/macOS got race and EINTR fixes** (1b315c2, c2a2b28, e0a2b82)
`Bun.serve` now pauses file readers under backpressure, preventing unbounded buffering and a use-after-free when a stream disconnects mid-read. On macOS, `fs` and directory iteration now retry `EINTR` in the syscall wrappers instead of surfacing it to JS, matching Node/libuv behavior.

### **Install now avoids corrupting hardlinked caches and self-contained workspaces** (30f8159, ebc90be, ee7af8b, 4b540e6)
The installer fixed a hardlink/copy path that could zero out files in package trees and cache entries, and it now preserves self-contained workspace packages during `update`, `dedupe`, and `audit fix`. It also stops writing `hoistingLimits: "workspaces"` into frozen lockfiles and accepts the Yarn-default `hoistingLimits: "none"` without warning.

### **Build/runtime plumbing improvements landed across compile and bundler internals** (497069e, 14ab660, 2ce05ce, 6c06195, 1d1f431, e62f2e8, ef61900, 77ac31a, 97c1096, 79f50ae, dfa2b12, e9367be, eec90be)
The compile/splitting pipeline now names the entry chunk after the outfile so other chunks can import it, and entry-point chunking/output ordering were cleaned up for multi-entry builds. The repo also picked up a mix of infra/runtime work: HTML import manifests now include dynamic-import-reached assets, WebKit/mimalloc were bumped, codegen scripts were made runnable under Node, CPU feature detection and stack checks were optimized, and CI retries were narrowed to the explicitly flaky list.

### Other misc changes
- Docs update for `Bun.serve` error-page behavior.
- Test coverage added or expanded for the above fixes.
- Misc internal refactors and plumbing changes across bundler, runtime, and install code.
