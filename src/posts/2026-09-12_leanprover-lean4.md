---
date: 2026-09-12
repo: leanprover/lean4
size: M
title: "Libuv bindings get refcount and error fixes"
excerpt: "Lean4 tightens libuv refcounting and shutdown semantics, fixing promise ownership bugs and improving error reporting."
commits: 1
authors: [algebraic-dev]
commit_authors: {"c6ef814": algebraic-dev}
---

**Fix refcounting in libuv signal/tcp/udp paths** (c6ef814)
The runtime now marks certain promises as multi-threaded and balances their ownership correctly when passing them between the event-loop thread and user callbacks. This addresses subtle lifetime bugs that could lead to use-after-free or leaks in async libuv bindings.

**Improve shutdown and error reporting for libuv sockets** (c6ef814)
`Std.Internal.UV.TCP.shutdown` now documents that repeated shutdown requests are rejected, matching the new runtime behavior. Related runtime changes also refine error messages and pending-shutdown handling so callers get clearer, more consistent failures instead of ambiguous state.

### Other misc changes
- Event-loop `alive` binding adjusted to return `Bool` in the C runtime stub.
- Additional libuv runtime cleanups across system, timer, and TCP internals.
- New regression tests for signal retry and TCP shutdown edge cases.
