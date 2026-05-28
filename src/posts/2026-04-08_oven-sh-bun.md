---
date: 2026-04-08
repo: oven-sh/bun
size: L
title: "Threading races, stats fixes, and web socket safety"
excerpt: "Bun fixed a lost-wakeup threadpool bug, corrected fs Stats behavior, and patched several crashes and data-corruption edge cases."
commits: 18
authors: [dylan-conway, robobun, alii, Jarred-Sumner]
commit_authors: {"8417664": dylan-conway, "94d1253": alii, "fd75aa4": robobun, "a3b22b3": alii, "d63aa71": robobun, "05c966a": robobun, "42f462e": Jarred-Sumner, "329ea9d": dylan-conway, "5c97292": dylan-conway, "fb92d63": dylan-conway, "1afabdd": dylan-conway, "b6a45f9": dylan-conway, "c98509b": dylan-conway, "479d29f": dylan-conway, "770893d": dylan-conway, "1b009ee": Jarred-Sumner, "10a573c": dylan-conway}
---

### **ThreadPool lost-wakeup and warmup bugs fixed** (770893d, 10a573c)
Bun tightened the threadpool synchronization so notifications participate in the proper modification order, closing a race that could strand queued work and hang callers on aarch64. It also fixed `warm()` so it actually spawns the requested threads instead of incrementing a phantom counter and stopping early.

### **fs.Stats constructor and prototype behavior corrected** (fb92d63, 5c97292)
The `Stats`/`BigIntStats` bindings now write fields in Node's expected slot order and share the right prototype, which fixes scrambled constructor output and `instanceof Stats` failures. In the same area, inode and other stat fields now preserve full `u64` values instead of collapsing high inode numbers to `INT64_MAX`.

### **WebSocket upgrade inputs now preserve UTF-8 correctly** (05c966a)
The WebSocket HTTP upgrade path now materializes strings through `BunString` wrappers instead of slicing raw `ZigString` views, so non-ASCII Latin1 and UTF-16 inputs are encoded correctly before request construction. This avoids malformed upgrade requests when headers, paths, or proxy settings contain non-ASCII text.

### **`bun build --compile` normalizes Nix interpreter paths** (42f462e)
Compiled binaries on NixOS now rewrite `/nix/store` or `/gnu/store` PT_INTERP values back to the standard FHS loader path. That makes `bun build --compile` artifacts portable across Nix generations instead of tying them to the exact build environment.

### **HTTP body streaming no longer delivers empty terminal races** (479d29f)
Fetch now guards against a stale body task delivering a zero-length non-terminal chunk after JS has already drained the buffered bytes. This fixes a pipeline stall/hang scenario where `Readable.fromWeb(res.body)` could get stuck and spin.

### **CLI and DNS edge cases fixed** (a3b22b3, fd75aa4, 1b009ee)
`--elide-lines` no longer errors outside a terminal, `Bun.dns.setServers()` stops asserting on non-int32 values, and a flaky HTMLRewriter error was patched. These are targeted correctness fixes that remove surprising failures in scripting and networking paths.

### **Buildkite CI reliability improved** (329ea9d, 8417664, 1afabdd, b6a45f9, c98509b)
CI now fails loudly on artifact download timeouts, retries flaky `annotate` calls instead of posting bogus errors, and fixes the binary-size job’s agent/image selection. Binary-size reporting also shows sub-megabyte deltas in KB for readability.

### **Environment loading now preserves inherited vars under EACCES** (d63aa71)
`runEnvLoader()` now loads process environment variables before directory traversal, so unreadable parent directories no longer wipe out `process.env`. This fixes a nasty case where inherited env vars vanished entirely when the current directory couldn’t be read.

### Other misc changes
- Docs: added a Claude code-review self-check section (94d1253)
- Minor CI/build/test updates around binary-size and workspace run filtering (a3b22b3, 329ea9d, 8417664, 1afabdd, b6a45f9, c98509b)
