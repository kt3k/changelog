---
date: 2026-07-09
repo: oven-sh/bun
size: L
title: "Bun tightens streams, fetch, and serve behavior"
excerpt: "Major web streams perf work landed alongside fetch proxy fixes and several Bun.serve correctness fixes."
commits: 16
authors: [robobun]
commit_authors: {"5d673d9": robobun, "fc865b3": robobun, "0b489d0": robobun, "dbe00e3": robobun, "423fb8b": robobun, "4bfcc0f": robobun, "539d6c4": robobun, "b05b4fa": robobun, "3981e9b": robobun, "124d52c": robobun, "e96a4d4": robobun, "280dfbe": robobun}
---

**Web Streams got a big performance pass on write, pump, and BYOB paths** (5d673d9, 539d6c4, 280dfbe, 423fb8b)
These commits reduce per-chunk allocations, add a sync-pull fast path, and serialize `type:"direct"` pulls on the JS reader path to avoid overlapping async `pull()` calls. They also improve heap snapshot labeling for stream internals, making stream-related memory leaks and retainer paths much easier to diagnose.

**fetch() now re-evaluates proxy settings per redirect hop and accepts `URL` instances for `proxy`** (b05b4fa, 3981e9b)
Redirects now re-check `http_proxy` / `https_proxy` / `NO_PROXY` at each hop instead of freezing the original decision, which fixes incorrect proxying across redirected URLs. The proxy option also now properly handles a `URL` instance in both `fetch()` and `WebSocket`, matching the docs and type definitions.

**fetch() now rejects on option-conversion errors instead of throwing synchronously** (e96a4d4)
If URL/init coercion or option getters throw, Bun now returns a rejected promise per WHATWG fetch semantics instead of escaping synchronously. This closes a compatibility gap with Node/undici and makes error handling around `fetch()` much more predictable.

**Bun.serve fixed several response-stream and error-handler edge cases** (0b489d0, dbe00e3, 4bfcc0f, 124d52c)
`error()` now receives a pending-promise rejection reason of `null` verbatim, isn’t re-run after the status line is already committed, and can safely return a streaming body. HEAD requests to streaming responses now cancel the body correctly so underlying resources are released instead of leaking.

**socket and net writes now treat transient ENOBUFS/ENOMEM as would-block** (fc865b3)
Transient kernel send failures no longer become fatal connection errors; Bun keeps buffered bytes and retries later. That brings `node:net` behavior closer to expectations under resource pressure and fixes a class of flaky write failures.

### Other misc changes
- `child_process.stdin` stays `null` after exit for non-পiped stdio configs.
- `util.parseArgs()` now treats null top-level boolean flags as absent.
- Build script `--help` TDZ ReferenceError fix.
- GC/heap-analysis plumbing and stream internal refactors.
- Socket callback lifetime/GC refactor and related internal cleanup.
