---
date: 2026-07-24
repo: nodejs/node
size: L
title: "Perfetto tracing lands; net BoundSocket grows paths"
excerpt: "Node adds Perfetto-backed tracing support and expands net.BoundSocket to Unix domain/pipe paths, alongside readline and stream fixes."
commits: 19
authors: [legendecas, nodejs-github-bot, trivikr, guybedford, aduh95, mcollina, StefanStojanovic, davidje13, Javonne-liu, jasnell, liuxingbaoyu]
commit_authors: {"b420cb6": guybedford, "9041ad0": mcollina, "5bdc82d": legendecas, "7bee754": trivikr, "e383a1d": trivikr}
---

### **net.BoundSocket now supports Unix domain and named pipe paths** (b420cb6)
`BoundSocket` can now bind via `path` instead of only TCP host/port pairs, including Linux abstract namespace sockets via a leading `\0`. The API docs and tests spell out the new `isPipe`/`address()` behavior and synchronous path reservation semantics, making it possible to adopt pre-bound pipe sockets with clearer error handling.

### **Perfetto tracing support is wired into Node** (5bdc82d)
Node now has a Perfetto-backed tracing agent, new perfetto-specific trace event plumbing, and build/configuration support to enable it with `--with-perfetto`. This is a major tracing architecture change that adds a new tracing backend while preserving legacy behavior behind build-time switches.

### **readline.createInterface() is cheaper to construct** (9041ad0)
Interface creation now avoids per-instance closure/descriptor churn, stops mutating the user-provided input stream with history options, and only checks `TERM` in terminal mode. The new benchmark and refactor target hot-path overhead, so this should translate into lower allocation pressure and faster startup for readline-heavy code.

### **Stream iterators handle aborts and overflow more predictably** (7bee754, e383a1d)
The merge-read path now correctly rejects pending reads on cancellation, and broadcast backpressure overflow is now reported as a `RangeError`. These are focused correctness fixes that make async iterator stream behavior more consistent and easier to handle.

### Other misc changes
- DNS tests updated to codify `ENODATA` behavior for empty-record lookups and CNAME chains.
- Docs cleanup for unsupported `stream_iter` syntax.
- Dependency bumps and backports: googletest, histogram, amaro, and V8.
- Minor internal cleanup and trace macro compatibility fixes.
- Windows/libuv assertion fix when stopping delayed tasks.
