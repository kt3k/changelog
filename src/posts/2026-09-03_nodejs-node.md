---
date: 2026-09-03
repo: nodejs/node
size: L
title: "Node gets benchmarks, SEA VFS, and faster writes"
excerpt: "Major additions land: a new benchmark runner, SEA VFS mounts, fs.writeFile round-trip reduction, plus several security and correctness fixes."
commits: 38
authors: [jasnell, mcollina, christianaurichzm, sxa, aduh95, juanarbol, TrevorBurnham, codebytere, watilde, o-, pimterry, abmusse, panva, yhay81, lazerg]
commit_authors: {"4d2f7a6": jasnell, "c8e5c96": TrevorBurnham, "e324419": codebytere, "84e3675": mcollina, "095fdd3": watilde, "4e207b1": mcollina, "6071f8b": mcollina, "e91db8b": panva, "0a1a37e": lazerg, "b53ddc0": christianaurichzm}
---

### **node:bench lands as a new benchmarking subsystem** (4d2f7a6)
Node now ships an experimental `node:bench` API with runner primitives, reporters, and a CLI mode for running benchmark files or glob patterns. The feature adds first-class support for structured benchmark output, explicit runners, and process-isolated execution, making Node capable of hosting serious benchmark tooling in-process.

### **SEA bundles can now mount a read-only virtual filesystem** (4e207b1)
Single-executable applications gain `useVfs`, letting bundled assets be mounted as a virtual filesystem and used through normal `fs` and module-loading APIs. That means packaged CJS/ESM entrypoints can resolve relative imports and asset paths from inside the bundle, while keeping the mount separate from the real filesystem.

### **fs.writeFile now avoids extra thread-pool round trips** (e324419)
`fs.writeFile()` and small `fs.promises.writeFile()` calls can now complete in a single libuv thread-pool trip instead of three. This should reduce overhead and contention for the many workloads that write small files, especially when the pool is also serving DNS, crypto, or other filesystem work.

### **SQLite APIs are hardened against re-entrancy and stale buffers** (c8e5c96)
The SQLite bindings now re-check database state after reading user-provided options, closing a race where getters could shut the database mid-call and trigger crashes or incorrect errors. The patch also validates function arity metadata more strictly and rejects a resized buffer during `deserialize()` to avoid leaking uninitialized memory into SQLite.

### **Recursive fs.watch handling is made more robust** (e91db8b)
Recursive watchers now arm directory watches earlier, discard stale bookkeeping when paths disappear, and handle platform-specific disappearance races more carefully. The fix also preserves the expected AIX behavior around `ENODEV`, addressing a set of flaky watch regressions.

### **`domain` is now a runtime deprecation** (6071f8b)
Loading `node:domain` now emits a `DeprecationWarning` at runtime instead of only being documented as deprecated. That makes the deprecation visible to consumers immediately and aligns the docs with the stronger deprecation status.

### **`https` proxy CONNECT responses now respect header limits** (84e3675)
CONNECT responses from proxies now enforce the configured maximum header size while being read. The change also prevents listener/buffer growth during reads, tightening a potential resource-exhaustion path.

### **BlockList JSON round-trips now preserve IPv4-mapped IPv6 rules** (095fdd3)
`BlockList.fromJSON()` now correctly accepts the mixed dotted-quad form emitted by `toJSON()` for IPv4-mapped IPv6 addresses. This fixes silent corruption or dropping of rules during JSON round-trips.

### **Buffer aligned allocations get safer padding** (0a1a37e)
Aligned buffer allocations are now padded by a multiple of 8, reducing the chance of misalignment-related issues. The change touches the JS and C++ allocation paths and tightens alignment handling for consumers.

### **VFS rename semantics are fixed for non-empty directories** (b53ddc0)
The memory-backed virtual filesystem now rejects renaming a directory over a non-empty directory, matching real filesystem behavior. It also handles file replacement accounting and same-entry renames more correctly.

### Other misc changes
- Dependency bumps and workflow updates across CodeQL, checkout, setup-node, harden-runner, install-nix-action, and eslint tooling.
- Build tweaks for riscv64 and IBM i.
- Test fixes and deflakes for bench, coverage, HTTP/2, filesystem glob/watch, and addon build coverage.
- Documentation updates for changelog tooling and benchmark/SEA APIs.
- Minor primordials/lint cleanups and a V8 backport enabling `Float16Array` cleanup.
