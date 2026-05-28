---
date: 2026-04-04
repo: denoland/deno
size: M
title: "Node TCP ref/unref fixed; fd table moved"
excerpt: "Deno's Node TCP wrapper now properly ref/unref's native handles, while fd ownership was centralized in ext/io and dead legacy accept code was removed."
commits: 3
authors: [bartlomieju]
commit_authors: {"3ec8514": bartlomieju, "00d46fe": bartlomieju, "ad725ee": bartlomieju}
---

**Native TCP `ref()` now keeps the event loop alive** (3ec8514)
`TCP.ref()` now calls through to the native libuv handle instead of being a no-op, matching `unref()` and restoring expected Node behavior for native TCP servers. The new tests verify that `unref()` lets the process exit and `ref()` prevents exit after re-refing.

**Fd ownership was centralized in `ext/io`** (ad725ee)
`FdTable` is now the single owner of fd-to-`File` mappings, replacing `NodeFsState.open_fds` in `ext/node`. This makes stdio and Node fd-based ops share the same underlying `Rc<dyn File>`, so closes are visible across both layers and fd handling is more consistent.

**Dead legacy TCP accept path was removed** (00d46fe)
The old `Deno.listen()`/`Deno.Listener.accept()` fallback in `tcp_wrap.ts` was deleted because it was unreachable once `bind()`/`bind6()` always select the native wrap path. This simplifies the TCP implementation and removes a large chunk of unused backoff/accept machinery.

### Other misc changes
- Internal binding cleanup in `tcp_wrap.ts` to drop legacy listener/ref bookkeeping
- Lint rule adjustment for the polyfill TCP wrapper
- Move of shared IO/fd code across `ext/io` and `ext/node`
