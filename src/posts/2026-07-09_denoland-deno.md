---
date: 2026-07-09
repo: denoland/deno
size: L
title: "Node hot paths and GC fixes land"
excerpt: "Major perf gains in Node polyfills and sqlite, plus fixes for socket leaks, Event subclasses, and TTY shutdown behavior."
commits: 17
authors: [bartlomieju, nathanwhit, nathanwhitbot, pieh]
commit_authors: {"d279878": nathanwhit, "c3d9d44": nathanwhit, "7f8b903": nathanwhitbot, "fd8bf48": nathanwhit, "7002a81": pieh, "c35cef0": bartlomieju, "5e48ef4": bartlomieju, "bc58c2a": nathanwhit}
---

### **Node fs.cp gets a native fast path** (fd8bf48)
Deno now routes default-equivalent async `node:fs.cp` / `fs.promises.cp` calls through a Rust op instead of the JS walker. That should materially cut copy overhead for the common no-filter path while preserving the existing JS implementation for non-default options.

### **Socket destroy now stops active reads to prevent leaks** (7f8b903)
Closing `node:net` and `node:tls` sockets now explicitly stops any in-flight read before clearing the JS handle, breaking the retention chain that kept `Socket`/`TCPWrap` objects alive. This fixes an unbounded per-connection heap leak for code that churns TCP connections.

### **SQLite StatementSync hot paths are faster** (c35cef0)
`sqlite.StatementSync.run()` now uses direct data-property creation for its result object, and `all()` hoists column names out of the row loop so they’re built once and reused. These changes reduce repeated FFI/string work and should improve the common insert/select paths that were profiling notably slower than Node.

### **`Event` subclasses with read-only `toStringTag` no longer throw** (d279878)
`Event.prototype[Symbol.toStringTag]` is now defined on the prototype with the standard descriptor instead of being assigned per instance. This avoids construction-time failures for subclasses that inherit or define a non-writable `Symbol.toStringTag`, such as `MessageEvent`-style cases.

### **`Deno.createHttpClient` accepts `http2MaxHeaderListSize`** (7002a81)
A new client option lets callers cap the HTTP/2 header list size, wired through to the underlying HTTP client builder and surfaced in the type definitions. This is a public API expansion for users needing tighter HTTP/2 behavior control.

### **`--min-dep-age` is now a CLI alias** (c3d9d44)
The dependency-age policy flag now accepts the shorter `--min-dep-age` spelling alongside the existing long form. The hint text was updated too, making the policy easier to discover and use.

### **`atob` avoids a large-path memcpy** (5e48ef4)
Large base64 decodes now return the freshly decoded buffer directly instead of copying back into the input string buffer first. That trims a full-size memory copy from the hot path and improves throughput for big payloads.

### **TTY writes now let the process exit when idle** (bc58c2a)
Idle TTY handles are now deactivated once reads/writes/shutdown work is done, so a completed stdio write no longer keeps the event loop alive unnecessarily. This fixes a real shutdown/exit behavior issue for PTY-backed stderr writes.

### Other misc changes
- Release workflow tweaks: version bump prerelease handling, promoted-archive upload filtering, Mach-O signature stripping order/conditions, and disabling minimum-dependency-age in promote-to-release.
- `deno_ast` bump to 0.53.3, which collapses oversized lint diagnostic snippets.
- Node compat runner cleanup: removed redundant unstable flags.
