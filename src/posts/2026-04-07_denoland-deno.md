---
date: 2026-04-07
repo: denoland/deno
size: L
title: "Native pipes land; REPL race gets fixed"
excerpt: "Deno moves pipe I/O into native Rust for broader Node compatibility, while the REPL gains better CDP error reporting and a race fix."
commits: 2
authors: [bartlomieju]
commit_authors: {"daeaf3c": bartlomieju, "b9434ee": bartlomieju}
---

### **Native uv_pipe_t plumbing replaces JS pipe I/O** (daeaf3c)
Deno now routes pipe operations through native Rust on both Unix and Windows, covering open/bind/listen/connect/accept/read/write/shutdown/close plus ref/unref and pipe-specific behaviors like `fchmod` and `setPendingInstances`. This is a major compatibility and architecture shift that should make Node-style pipe handling more consistent and less dependent on JS-side shims.

### **REPL/CDP response handling is made more reliable** (b9434ee)
The REPL now surfaces CDP protocol errors instead of silently turning them into `null`, which should make failures much easier to diagnose in CI and during local debugging. It also fixes a race in response waiting and adds a microtask checkpoint / `await_promise` adjustment to avoid losing REPL-evaluated promises under explicit microtask policy.

### Other misc changes
- Node/internal polyfill and binding cleanup related to the pipe refactor
- Test/config updates for node compat and Windows named pipe coverage
- Small fd/process/runtime support adjustments and lint rule tweak
