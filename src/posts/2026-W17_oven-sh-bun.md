---
date: 2026-04-26
repo: oven-sh/bun
period: weekly
slug: 2026-W17
period_label: "Apr 20–26, 2026"
size: L
title: "Bun ships major Windows, install, and build-system gains"
excerpt: "Windows PTYs, faster installs/builds, a WebKit bump, and a long list of runtime leak/crash fixes landed this week."
commits: 91
---

### **Big cross-platform features and tooling improvements**
- **Windows Terminal support via ConPTY**: `Bun.Terminal` and `Bun.spawn({ terminal })` now work on Windows, bringing PTY-style child process support with docs and tests.
- **Isolated installs get a global virtual store**: warm installs now symlink from a shared store by default, making repeated installs and multi-checkout workflows much faster.
- **FreeBSD and Android cross-target publishing expands**: the release pipeline now supports new x86_64/aarch64 FreeBSD targets alongside Android, widening Bun’s build and artifact matrix.

### **Builds and CI got significantly faster**
- **Build graph and C++ compilation were streamlined**: vendored C/C++ deps now build as first-class ninja edges, POSIX stops compiling libuv unnecessarily, and Windows gets unified C++ wrappers plus stronger PCH wiring.
- **Zig/ASAN and CI throughput improved**: the Zig shard merge step was removed for large builds, ASAN stack handling was tightened, and CI gained macOS rebalancing plus image prefetch caches.
- **Binary-size and release packaging got cleaner**: release and canary comparisons were adjusted to reduce noise, Linux release binaries strip more debug data, and build scripts/docs were updated around the new workflows.

### **Runtime correctness and crash fixes across core APIs**
- **Spawn/file-descriptor handling was hardened**: extra stdio fds now preserve caller ownership, child stdin pipes are closed on early exit, and shell/subprocess cleanup fixed multiple fd/memory leaks.
- **Install and module resolution bugs were fixed**: tarball failures no longer hang the installer, auto-install no longer reads dangling dependency state, and `bunx` avoids accidentally resolving unrelated system binaries for scoped packages.
- **Networking and process APIs improved**: WebSocket clients now honor `perMessageDeflate: false`, client response timeouts no longer keep the event loop alive, and Windows error translation no longer panics on unmapped libuv codes.
- **Hot reload and source handling were made more robust**: macOS watcher re-registration was fixed, rejected-module reload races no longer use stale sourcemaps, and `Bun.pathToFileURL()` now handles very long relative paths safely.
- **Terminal/TTY and GC-sensitive crashes were fixed**: exit-time TTY restoration no longer clobbers downstream raw mode, and immediate callbacks/spawn cleanup no longer crash or leak after GC.

### **Engine and language/runtime updates**
- **WebKit was upgraded to a newer upstream snapshot**: Bun absorbed a major engine sync that required broad `jsCast`/`jsDynamicCast` migration and updated baseline allowlists.
- **`using` syntax is preserved when targeting Bun**: explicit resource management is no longer lowered unnecessarily because JSC supports it natively.
- **SQL and TLS behavior were corrected**: MySQL prepared queries now wait for all result sets, and `getCACertificates('system')` reliably returns the OS trust store.
- **Safer low-level conversions and memory handling**: several double-to-int paths now use defined truncation helpers, and standalone binaries free embedded source pages after startup to reduce memory pressure.

### **Other misc changes**
- `mock.module()` now validates its callback before resolver side effects.
- `bun test --changed` now respects tsconfig path aliases.
- SQLite was bumped to 3.53.0.
- Various docs, tests, flaky-test deflakes, symbol/baseline updates, and internal cleanup landed throughout the week.
