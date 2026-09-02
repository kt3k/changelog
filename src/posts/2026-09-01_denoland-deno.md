---
date: 2026-09-01
repo: denoland/deno
size: M
title: "Node polyfills tighten child process and ALS behavior"
excerpt: "Fixes repeated signal handling for child processes and preserves AsyncLocalStorage’s exit/no-store semantics."
commits: 2
authors: [xz-dev, nathanwhit]
commit_authors: {"62a0d5d": xz-dev, "206e03b": nathanwhit}
---

### **Fix repeated child-process signals and IPC close handling** (62a0d5d)
The Node child-process polyfill now allows later signals after an initial successful kill, which fixes cases like `SIGSTOP` followed by `SIGCONT`. It also improves Windows signal tracking and ensures forked children close their IPC channel on exit so `close` can fire reliably.

### **Preserve AsyncLocalStorage exit vs. undefined store** (206e03b)
AsyncLocalStorage now distinguishes three states: no store, an explicit `undefined` store, and the special `exit()` state. That fixes `getStore()`/`exit()` interactions so `defaultValue` no longer leaks into exited contexts, matching Node’s expected behavior.

### Other misc changes
- Added and expanded unit coverage for child_process signal behavior.
- Added and expanded unit coverage for AsyncLocalStorage exit semantics.
