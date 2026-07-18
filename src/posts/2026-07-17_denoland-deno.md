---
date: 2026-07-17
repo: denoland/deno
size: L
title: "Deno hardens pack, HTTP, and worker runtime"
excerpt: "Major fixes land across tarball packing, Node HTTP/2 teardown, multipart parsing, and worker stack sizing, plus a native tsc default."
commits: 13
authors: [nathanwhit, nathanwhitbot, bartlomieju]
commit_authors: {"7769013": nathanwhit, "c71e43a": nathanwhitbot, "10344fa": nathanwhit, "c38f394": nathanwhit, "14f8e5c": nathanwhit, "4294be5": nathanwhit, "369ddb7": nathanwhit, "0fd23e7": nathanwhit, "d859c22": nathanwhitbot, "50acfb1": nathanwhitbot, "f5ecd2e": bartlomieju, "7e036ea": bartlomieju, "fe70a4e": bartlomieju}
---

### **`deno check` now uses native tsc by default** (fe70a4e)
`deno check` switches from the forked in-isolate TypeScript path to the native compiler flow, including generated tsconfig materialization, dependency type syncing, compiler download, and diagnostic remapping. This is a major behavior change for type-checking and will affect both performance and the shape of check-related output.

### **Tarball packing now handles long paths safely** (c71e43a)
`deno pack` no longer fails when a packaged file path exceeds the tar header name field, and it now uses GNU long-link entries to preserve reproducible output. The patch also closes a traversal hole by validating normalized tar paths before writing them, so long and short paths are treated consistently.

### **Node HTTP/2 sessions are cleaned up correctly on destroy** (10344fa)
The Node-compatible HTTP/2 layer now releases native session state and avoids calling back into already-destroyed session objects. That prevents retained allocations and unsafe late-path behavior after teardown, which should improve stability under shutdown and error-heavy workloads.

### **Multipart form parsing is now bounded** (c38f394)
Multipart part headers are capped at 16 KiB and 128 headers per part, preventing unbounded buffering and parsing work on malformed inputs. This hardens `FormData` parsing against resource exhaustion without changing normal uploads.

### **Rejected dynamic imports stop before loader work** (7769013)
When import-attribute validation rejects a dynamic import, Deno now stops immediately instead of continuing into loader scheduling. This keeps a rejected promise terminal and avoids wasted module-loading work after a known failure.

### **WebTransport handshake buffering is capped** (0fd23e7)
Handshake frame accumulation for WebTransport now has a 64 KiB ceiling, with shared bounded decoding across the relevant request/response paths. This prevents incomplete frames from growing unbounded in memory and closes an easy resource-exhaustion vector.

### **Heap snapshots near the limit no longer leak empty files** (d859c22)
The Node V8 heap-limit callback now writes snapshots straight to disk, fixes the reentrant limit logic that could keep raising the heap ceiling, and avoids leaving behind 0-byte `.heapsnapshot` files. This addresses a serious OOM-path bug that could otherwise let memory growth continue until the machine itself became unstable.

### **Worker isolate threads now get the stack size Deno reports** (50acfb1)
Worker threads now use the default 4 MiB stack that Deno reports in `resourceLimits.stackSizeMb` unless an explicit override is provided. That aligns behavior with Node expectations and prevents stack overflows in workers that previously ran on Rust's smaller default.

### **V8 upgraded to 150.2.0** (7e036ea)
Deno bumps its embedded V8, adapting the fast-call plumbing to V8's new requirement that `CFunction`/`CFunctionInfo`-backed data outlive the function template. This is a core runtime dependency upgrade with API-shape implications for the FFI fast path.

### **CJS resolution now handles filesystem edge cases** (369ddb7)
Node-style CommonJS export analysis now copes with absolute/root paths, non-UTF-8 filenames, and path suffix probing without crashing on unusual filesystem shapes. It also returns structured translation errors instead of failing abruptly when wrapper paths can't be represented cleanly.

### **Windows subprocess pipe names are collision-resistant** (14f8e5c)
Subprocess stdio pipes on Windows now use a fresh 128-bit random suffix each time instead of a predictable incrementing pattern. That lowers the risk of named-pipe collisions in high-concurrency scenarios.

### **Native window handles now require FFI permission** (4294be5)
Canvas initialization checks FFI permission before accepting native window handles, closing a permission bypass in a consumer path. The same commit also trims an unused request-handle accessor and adds regression coverage.

### Other misc changes
- `node:sqlite` backup/deserialize argument validation tightened (f5ecd2e)
- Windows and worker stack-size/runtime configuration cleanup (50acfb1)
- CI/cache tweaks for native tsc preडाउनलोड and test jobs (fe70a4e)
- Dependency bumps and test expectation updates (7e036ea, 4294be5, 14f8e5c, 10344fa, c71e43a)
