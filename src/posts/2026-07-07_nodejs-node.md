---
date: 2026-07-07
repo: nodejs/node
size: L
title: "HTTP/2 gets a speed and trailers sweep"
excerpt: "Big HTTP/2 hot-path optimizations land alongside a V8 backport, a QUIC crash fix, and several API and bugfix updates."
commits: 21
authors: [mcollina, legendecas, joyeecheung, nodejs-github-bot, MoLow, efekrskl, araujogui, martenrichter, pimterry, trivikr]
commit_authors: {"4ee2117": legendecas, "39d9e8c": legendecas, "f4c85d5": MoLow, "5e47f2b": mcollina, "351da9c": mcollina, "d3b20a7": mcollina, "702c553": mcollina, "ec8b9f4": mcollina, "03e7945": mcollina, "2e8f4d7": efekrskl, "47e332d": araujogui, "f91697a": mcollina, "309213f": mcollina, "d3be8ab": trivikr}
---

### **HTTP/2 hot path gets faster and leaner** (702c553, 351da9c, 5e47f2b, 03e7945, ec8b9f4, d3b20a7)
Node’s HTTP/2 internals were heavily optimized: fewer per-write closures and scheduled callbacks, less request allocation churn, and no extra options cloning in `respond()`. The compat layer also got a trailer fast path that skips pointless JS/C++ round trips and empty wire work when responses have no trailers, improving throughput and reducing overhead on the common case.

### **WHATWG byte-stream async iteration is sped up** (309213f, f91697a)
Async iteration over byte streams now avoids several reflective and buffering slow paths, making `for await` / `reader.read()` loops much closer to default streams. A matching benchmark variant was added to track the new byte-stream case.

### **V8 backport fixes restricted global property checks** (39d9e8c, 4ee2117)
Node backported a V8 change so restricted global-property lookups consult global interceptors when they can return non-configurable properties. Node’s `vm` integration and tests were updated to cover the corrected interception behavior.

### **QUIC stream handling avoids a no-handler crash** (2e8f4d7)
A QUIC stream could be destroyed immediately when no `onstream` handler existed, and the code path now checks for that case instead of crashing. The fix is covered by a new unidirectional-stream regression test.

### **SQLite statements now see schema changes correctly** (47e332d)
`StatementSync.all()` now reads the column count after stepping, which lets prepared statements reflect columns added or dropped after the statement was created. Tests now verify the same behavior for `get()`, `all()`, and `iterate()`.

### **Recursive virtual mkdir follows symlinks** (d3be8ab)
The in-memory VFS now resolves symlinked intermediate directories during recursive `mkdir`, matching native expectations instead of throwing `ENOTDIR`. The update preserves the caller-visible return path and adds coverage for dangling, file, and relative-target symlink cases.

### **Test runner streams now report entry files** (f4c85d5)
`TestStream` events now include `entryFile`, which makes it easier to identify which test entry point produced the event. The docs and runner tests were updated to reflect the new metadata.

### Other misc changes
- Removed obsolete `--napi-modules` docs entry.
- QUIC: fixed datagram stalling when no streams are pending; fixed an unobserved-closed crash.
- HTTP/2 compat/request timeout listener refactors and related cleanup.
- Updated zlib and nixpkgs.
- Added test-only fixes for spawnSync null stdio and worker stack-size determinism.
