---
date: 2026-04-23
repo: oven-sh/bun
size: L
title: "Bun fixes installs, watchers, and build speed"
excerpt: "Installer hangs, macOS hot reload, Windows errors, and build system changes dominate a substantial day for Bun."
commits: 25
authors: [robobun, Jarred-Sumner, dylan-conway, alii, coleleavitt, cirospaciari]
commit_authors: {"f0498b7": dylan-conway, "892042c": robobun, "6cecf48": robobun, "249d76a": robobun, "a4876cd": alii, "cdd540b": dylan-conway, "e194566": robobun}
---

### **Build system shifts vendored deps into the main graph** (cdd540b)
Bun’s build now compiles 12 vendored C/C++ dependencies as first-class ninja edges by default instead of routing them through nested CMake. That should improve parallelism, reduce configure overhead, and let LTO optimize across the dep boundary.

### **Installer no longer hangs on tarball download/extract failures** (a4876cd, 249d76a)
`bun install` now cleans up dedupe/task-queue state when tarball downloads or extraction fail, so later retries can schedule a fresh network task instead of waiting forever. This fixes both HTTP error hangs and integrity-mismatch hangs in the isolated installer path.

### **macOS hot reload keeps propagating after file swaps** (6cecf48)
Watcher eviction now re-registers kqueue entries after `swapRemove`, fixing stale `udata` that could break subsequent updates to other imported files. The hot reloader also ignores out-of-range stale events, closing the loop on the macOS-only regression.

### **Windows libuv error translation stops panicking** (892042c, f0498b7)
Bun hardened two Windows error paths: unmapped libuv codes now fall back to `UNKNOWN`, and `Error.name()` now passes the correctly negated errno into the translator. Together these fixes prevent `invalid enum value`/overflow panics when surfacing Windows filesystem errors.

### **`Bun.serve()` drops the undocumented `inspector` option** (e194566)
The internal `inspector: true` server option and its WebSocket plumbing were removed from the public server config and implementation. This is a cleanup with API impact: debugger attachment should go through the CLI inspector flags instead.

### Other misc changes
- Bumped mimalloc to upstream v3.3.1 with fork-safety fixes.
- Fixed `bun test --changed` to respect tsconfig path aliases over externalized packages.
- Spawn `stdio[N]` now returns caller-supplied fds on POSIX, with updated typings.
- Blob/FormData/expect/resolve/readable stream bug fixes.
- Linux release binaries now strip `.eh_frame_hdr` too.
- CI tweaks: cancel abandoned BuildKite builds, raise Linux link box, add slowest-test skill.
- Misc test deflake / build cleanup / dependency version bumps.
