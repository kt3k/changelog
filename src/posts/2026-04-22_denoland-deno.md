---
date: 2026-04-22
repo: denoland/deno
size: L
title: "NAPI fixes and Node perf wins land"
excerpt: "Deno fixed crashy NAPI scope behavior, added async context support, and shipped several Node-path performance and correctness improvements."
commits: 9
authors: [nathanwhit, bartlomieju, denobot]
commit_authors: {"8913828": nathanwhit, "9680445": nathanwhit, "e48bec8": bartlomieju, "a6e4c53": bartlomieju, "eea9126": denobot, "ea1be68": nathanwhit, "b3568ec": nathanwhit, "15004ce": nathanwhit, "6a8c080": nathanwhit}
---

**Revert real V8 handle scopes for NAPI callbacks** (e48bec8)
Deno backed out the change that made NAPI handle/callback scopes real V8 scopes, because native addons were creating handles and using them after the scope closed, which could crash the process. This restores the previous behavior to keep common addons like `@parcel/watcher` working safely.

**Implement `napi_async_init` / `napi_async_destroy`** (a6e4c53)
NAPI async context creation/destruction now allocates and frees real state instead of being a no-op / assertion trap. That unblocks native modules that use async contexts and prevents crashes in addons that rely on this API.

**Speed up the Node event loop polling path** (8913828)
The core UV compatibility loop was reworked to poll only ready handles and to yield between I/O batches instead of scanning every live handle repeatedly. The change aims to reduce tail latency under load while also improving throughput.

**Keep HTTP parser fast paths closer to Node** (ea1be68, b3568ec)
Two HTTP parser fixes landed: one restores the `consume` fast path for more stream types and makes parse errors propagate as proper JS `Error` objects, and another skips the header-flush JS call when all headers fit in a single batch. Together these fix correctness gaps in the consume path and shave overhead from common request parsing.

**Trim Node stream write overhead** (6a8c080)
`writev` now pre-sizes its buffer and parses encoding names without allocating extra Rust strings, reducing per-request allocations on chunked write paths. That should lower overhead in hot stream writes, especially for HTTP-heavy workloads.

### Other misc changes
- perf(ext/node): elide async_hooks timer work when no hooks are registered (9680445)
- fix(ext/node): free `uv_write`/`uv_shutdown` requests on all exit paths (15004ce)
- Release/version bump to 2.7.13 and CI cache key updates (eea9126)
