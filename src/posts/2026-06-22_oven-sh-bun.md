---
date: 2026-06-22
repo: oven-sh/bun
size: L
title: "vm and sourcemap work land, APIs improve"
excerpt: "Bun adds standalone-executable detection, expands node:vm parity, speeds sourcemap parsing, and tightens fs.cp/macOS behavior."
commits: 9
authors: [robobun, cirospaciari]
commit_authors: {"0672e7d": cirospaciari, "8d32bd4": robobun, "c1da139": robobun, "765cad0": cirospaciari, "452139e": robobun, "85559eb": robobun, "fca03d9": robobun, "7dd427e": robobun}
---

**Standalone binaries can now identify themselves** (7dd427e)
Bun now exposes `Bun.isStandaloneExecutable`, a read-only boolean that's `true` for `bun build --compile` outputs and `false` otherwise. The new API avoids forcing embedded files into `Blob`s, making it safe to check at startup in binaries with large bundled assets.

**node:vm gets much closer to Node v26 parity** (0672e7d)
This commit vendors and fixes a large chunk of the `node:vm` test suite, pushing coverage to 97% (98/101). It also adds `vm.measureMemory` behavior, context tracking, and a batch of binding/runtime changes needed to match Node's semantics more closely.

**JSX auto-imports no longer collide with local bindings** (8d32bd4)
The parser now avoids aliasing automatic JSX runtime imports to a user's own local names like `jsx`, `jsxs`, `jsxDEV`, or `Fragment`. That fixes a runtime bug where Bun's injected import could shadow or be shadowed by a local variable and crash compiled output.

**Source-map parsing gets a SIMD-backed fast path** (c1da139)
Bun adds a Highway-based VLQ decoder for source-map mappings, along with benchmarks and platform allowlist updates. This should improve `SourceMap` parse throughput on large, bundler-shaped maps.

**Recursive fs.cp regains the macOS clonefile fast path** (765cad0)
Recursive `fs.cp`/`cpSync`/`promises.cp` now use a native whole-tree `clonefile()` path again on macOS when the tree only contains regular files and directories. Bun still falls back to the JS walker for symlinks and special files, preserving Node-compatible behavior while restoring speed for the common safe case.

**CLI errors are now more actionable** (fca03d9)
Several confusing CLI failures now print the bad value and better usage hints, including `--linker`, `bun patch`, `bun patch-commit`, `--format`, `--define`, `--loader`, and workspace filtering errors. These are quality-of-life fixes, but they make common mistakes much easier to recover from.

### Other misc changes
- `fs.watchFile` initial-stat callback termination handling fixed (85559eb)
- Docs clarified that the security scanner package name is a placeholder (452139e)
- Added/updated tests, benches, and internal refactors across the day
