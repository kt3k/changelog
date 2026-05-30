---
date: 2026-03-28
repo: denoland/deno
size: S
title: "Node TTY shim removed, sys_traits bumped"
excerpt: "Deno drops an obsolete Node TTY op after a libuv rewrite, alongside a small sys_traits dependency upgrade."
commits: 2
authors: [bartlomieju]
commit_authors: {"5e9407a": bartlomieju, "26d17b9": bartlomieju}
---

### **Remove obsolete Node TTY op** (5e9407a)
Deno removed `op_node_is_tty` and its registration from the Node extension because it is no longer used after the `TTY.isTTY(fd)` rewrite. This trims dead code from `ext/node` and reduces maintenance surface without changing behavior.

### Other misc changes
- Dependency bump: `sys_traits` 0.1.25 → 0.1.27 (26d17b9)
