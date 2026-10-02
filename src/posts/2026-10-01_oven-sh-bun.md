---
date: 2026-10-01
repo: oven-sh/bun
size: L
title: "Panic fixes across sockets, dev server, and CLI"
excerpt: "Bun fixes several crashers and UAFs in sockets/TLS, React Fast Refresh, file routing, dev server, and pm ls."
commits: 8
authors: [dylan-conway, robobun]
commit_authors: {"f4d755a": dylan-conway, "4b02e10": dylan-conway, "37471e5": robobun, "9d9fdbe": dylan-conway, "95690fc": dylan-conway, "2e677ef": dylan-conway, "2f1d7f6": robobun}
---

### **Socket lifecycle/UAF fixes in usockets** (f4d755a)
Fixes a use-after-free that could crash `bun test --isolate` and `--parallel`, plus related socket-close edge cases across TCP, TLS, SQL, Valkey, and websocket paths. The change makes close notifications happen exactly once and adds a forced raw close when graceful shutdown would otherwise leave embedding storage dangling.

### **TLS duplexes now handle pre-engine EOF/close correctly** (37471e5)
Fixes a race where `tls.connect({ socket })` / `new TLSSocket(duplex)` could lose EOF or close events before the TLS engine started, leading to hangs or UAFs. It also tightens how queued writes/ends and close handling are replayed once the engine is live.

### **`bun --hot` no longer reads a collected entry-point promise** (4b02e10)
Fixes a use-after-free in hot reload by storing the pending entry-point promise in protected VM state instead of a raw pointer plus ad hoc flags. This prevents stale reads that could misreport errors, stop reloads, or crash on reused heap cells.

### **React Fast Refresh skips hook signatures inside methods** (9d9fdbe)
Fixes a panic and bad transform output when a `use*` call appears in a class or object method during React Fast Refresh. Method bodies are now treated like Babel does here, avoiding invalid hook-signature injection and dev-server crashes.

### **FileSystemRouter now normalizes absolute `dir` paths safely** (95690fc)
Fixes a panic and wrong route names when the router is given an absolute directory containing `..` segments. Route naming now follows the normalized resolved path, matching what users expect from `import.meta.dir + "/../pages"` style inputs.

### **Dev server handles a broken import being re-imported** (2e677ef)
Fixes an out-of-bounds panic in the incremental graph when a file that failed to resolve is imported again through another path. This keeps the dev server stable while it tracks stale files across chained imports.

### **`bun pm ls --all` no longer panics on long resolution labels** (2f1d7f6)
Fixes a `buf_print: buffer too small` abort when package resolutions exceed 512 bytes, such as tarball URLs. The listing code now prints full labels directly instead of truncating them into a fixed-size buffer.

### **Other misc changes**
- `console.write` was reverted to its pre-#43649 behavior; tests for the newer multi-arg Promise behavior were marked todo.
- Added/updated regression tests for the socket, TLS, hot reload, React Fast Refresh, router, dev server, and package-manager fixes.
- Minor internal refactors and doc/comment updates in affected areas.
