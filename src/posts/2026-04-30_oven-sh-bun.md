---
date: 2026-04-30
repo: oven-sh/bun
size: L
title: "Bun hardens watchers, sockets, SQL and ELF"
excerpt: "Big refactors and several security-grade fixes land across fs.watch, sockets, compile output, and SQL. "
commits: 23
authors: [robobun, Jarred-Sumner]
commit_authors: {"42fa83c": robobun, "2b4c02f": robobun, "0ba4032": Jarred-Sumner, "6228e35": robobun, "6bcdf83": robobun}
---

### **Socket internals get a major lifetime/layout rewrite** (0ba4032)
Bun’s socket stack was reworked to replace the old heap-allocated `us_socket_context_t` with embedded socket groups plus explicit kind-based dispatch. This is a broad internal refactor that cuts indirection and changes ownership/lifetime rules across uSockets, uWS, TLS, and VM integration.

### **fs.watch is decoupled from the bundler watcher** (6228e35)
The POSIX `fs.watch()` backend was rewritten to talk directly to inotify, FSEvents, and kqueue instead of routing through `bun.Watcher`. That’s a major architecture change that should improve correctness and makes the watcher stack fit the API’s simpler semantics better.

### **Compiled binaries now load on WSL1 again** (42fa83c)
`bun build --compile` now extends the existing writable `PT_LOAD` segment instead of repurposing `PT_GNU_STACK`, avoiding the `ENOEXEC` failure on WSL1. This fixes a user-visible breakage in Bun’s compile output and preserves the executable’s mmap-at-startup behavior.

### **MessagePort/BroadcastChannel are simplified around a new primitive** (6bcdf83)
Bun replaced the older MessagePort/BroadcastChannel registry stack with a new `MessagePortPipe` concurrency primitive. This is a large refactor of web messaging internals that reduces complexity and changes how cross-thread message lifetimes are handled.

### **WebSocket TLS config is now safely freed on error paths** (2b4c02f)
The WebSocket constructor now wraps the Zig-allocated SSL config in an RAII owner so exceptions and early returns don’t leak it. That closes a memory-management hole across option parsing and connect() failure paths.

### **fs.watch no longer inherits a shared watcher model** (6228e35)
The new backend also includes a substantial rewrite of path-watcher state management and deduping behavior. It’s the kind of internal change that tends to surface as correctness fixes for edge cases rather than just a cleanup.

### **Other misc changes**
- SQL bug fixes: MySQL parameter bounds checks, column-slice cleanup on realloc OOM, and error-path OOM handling (3 commits)
- Web/DOM and process lifetime fixes: DNS dual-direction polling, MessagePort close draining, stdio exception cleanup, stale CSS background clip pointer, Blob/FormData leak cleanup
- GC/concurrency safety fixes: VM CommonJS/module registry locking, NAPI re-entrant registration handling
- Filesystem and string safety fixes: recursive `cp()` ENAMETOOLONG, hex decode OOB read, truncated UTF-8 iterator bounds, UTF-16 sentinel write fix
- Bake/dev-server and server plugin crash/hang fixes (4 commits)
- Test-only updates and GitHub rate-limit workaround (2 commits)
