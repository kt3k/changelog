---
date: 2026-03-27
repo: denoland/deno
size: L
title: "Deno Node compat gets sharper, release 2.7.9"
excerpt: "Node process argv0 and libuv compatibility were tightened, while a breaking child_process stdio change was reverted and 2.7.9 shipped."
commits: 4
authors: [bartlomieju, littledivy, denobot]
commit_authors: {"a57d32c": littledivy, "f065b07": denobot, "0a8cce4": bartlomieju, "47b20af": bartlomieju}
---

### **Node `process.argv[0]` now matches `execPath`** (a57d32c)
Deno’s Node polyfill now sets `process.argv[0]` to `Deno.execPath()`, aligning with Node.js expectations. The new test covers both `argv[0]` and `argv[1]`, which helps avoid subtle CLI compatibility bugs.

### **Libuv compatibility improvements land independently** (47b20af)
This refactor advances the core libuv shim with cached loop time, better socket lifecycle behavior, and stricter handle-state validation. It also adds `UV_EALREADY` and makes polling/write paths behave more like libuv, which should reduce edge-case divergences in runtime and network behavior.

### **Revert of numeric `child_process` stdio FDs** (0a8cce4)
The repo backs out support for numeric file descriptors in `child_process` stdio arrays, because those values were being interpreted as raw OS FDs instead of Deno resource IDs. That change was breaking Deno’s current `fs.openSync`-based compatibility path, so reverting it restores the previous behavior.

### **Release 2.7.9 version bump** (f065b07)
Version metadata and CI cache keys were updated for the 2.7.9 release. This is mostly release bookkeeping, but it touches a broad swath of Cargo manifests and workflows.

### Other misc changes
- Removed obsolete compile/test coverage for `npm:cowsay@1.5.0/cowthink`.
- Dropped stale task/byonm and npm run test fixtures tied to that removed coverage.
- CI cache version/key refreshes and release manifest/version-file updates.
