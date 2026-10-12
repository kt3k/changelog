---
date: 2026-10-11
repo: denoland/deno
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: M
title: "Deno speeds npm installs and hardens Node/N-API behavior"
excerpt: "This week Deno trimmed npm metadata fetches, improved completion and hot-path allocations, and fixed several Node/N-API compatibility and safety bugs."
commits: 9
---

### **Faster installs and leaner npm resolution**
Deno now fetches abbreviated npm packuments more selectively during install and resolution flows, including when `minimumDependencyAge` is enabled. That reduces registry payloads and should improve install latency without weakening age-based safety checks.

### **Node and N-API compatibility gets tighter**
Several runtime edge cases were fixed to better match Node behavior. `assert.*` now handles lazy message functions and variadic formatting more faithfully, while N-API calls now ignore addon return values once an exception is pending. The `napi_create_dataview` path was also hardened with overflow checks and stricter out-of-range handling so invalid inputs return the expected pending-exception state.

### **Runtime hot paths and core primitives get cleaned up**
A shared frozen empty options object now replaces repeated null-prototype allocations across common JS APIs, cutting avoidable overhead on hot paths in filesystem, networking, fetch, and Node polyfills. In parallel, `SharedArrayBuffer` was added to core primordials so internal code can rely on consistent primitive access in streams, buffers, and helpers.

### **Developer ergonomics and networking fixes**
Zsh completion was improved so bare `deno run <script>` invocations complete script paths and expose default subcommand flags like `-A`. On the networking side, `hyper`/`hyper-util` were updated to fix an idle-connection cleanup issue in fetch's connection pool handling.

### **Other misc changes**
- npm metadata/cache plumbing refactor to support packument format selection
- Added and expanded tests for abbreviated packuments, assert compatibility, N-API edge cases, and completion behavior
- Minor registry/LSP installer wiring updates
- `xxhash-rust` dependency bump
