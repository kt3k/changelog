---
date: 2026-05-05
repo: leanprover/lean4
size: L
title: "Lean adds extra linters, plugin init control"
excerpt: "Renames `--clippy` to `--extra`, lets plugins declare init functions, and includes several fixes for termination errors, I/O, and crashes."
commits: 16
authors: [eric-wieser, nomeata, hargoniX, wkrozowski, tydeu, Kha, Garmelon, sgraf812, leodemoura]
commit_authors: {"ea6e767": wkrozowski, "ad5ec0e": tydeu, "03bd884": nomeata, "e4c0a5a": eric-wieser, "70098e4": eric-wieser, "c9855f5": eric-wieser, "8ebd294": leodemoura}
---

### **Rename `--clippy` to `--extra` and broaden its scope** (ea6e767)
`lake lint --clippy` is now `lake lint --extra`, and it no longer means only “non-default” linters: it runs the default builtin linters together with the extra ones. That changes the linter selection model and also renames the underlying option/namespace/attribute plumbing, so existing scripts and custom linters need to follow the new naming.

### **Plugin loading can now specify an explicit init function** (ad5ec0e)
`Lean.loadPlugin` now accepts an optional init-function name, and the CLI/JSON setup formats can pass `path:initFn` or `{path, initFn}`. This makes plugin loading more flexible for nonstandard shared-library names and aligns the frontend, setup, and import paths around a richer plugin descriptor.

### **Termination errors now point at the correct recursive call site** (03bd884)
Recursive applications now carry source byte position metadata in addition to syntax, preventing identical calls at different locations from being merged by hashconsing/simplification. That fixes misleading termination diagnostics where the reported failing call could come from the wrong branch.

### **`Sym.simp` no longer chokes on kernel projections in matches** (8ebd294)
The symbolic simplifier now folds kernel `Expr.proj` terms back into projection applications before continuing simplification. This avoids a panic triggered by struct-eta/iota combinations and makes `Sym.simp` more robust on `match`/`do`-heavy code.

### **Module loading handles interrupted reads and clearer I/O failures** (70098e4)
`readModuleDataParts` now retries `EINTR` and distinguishes interrupted reads, unexpected EOF, and other read failures with better errors. This fixes import loading on filesystems or runtimes where `read()` can return short or interrupted reads.

### **Severity overrides now affect the exit code before counting errors** (e4c0a5a)
Promoted diagnostics are now applied before Lean increments its error counter, so `lean --error=tag` correctly exits nonzero when a warning is upgraded to an error. This restores the intended behavior of the feature and closes a regression.

### **`mpz` allocation failures now abort instead of corrupting memory** (c9855f5)
When Lean is built without GMP, `mpz_alloc` now checks for `malloc`/`mi_malloc` failure and panics on OOM rather than continuing with a null pointer. That closes a memory-safety hole that could otherwise turn allocation failure into corruption.

### Other misc changes
- Updated stage0 snapshot.
- Benchmark/build tooling now uses lean-llvm and supports it in lake.
- CI workflow adjusted for external PRs.
- `wrapInstance` shake dependency tracking fixed.
- `grind` no longer uses `grind` in HTTP lowercasing.
- Added `trace.Meta.Tactic.simp.backwardDefEq`.
- `readModuleDataParts` now guards the empty-file case without `LEAN_MMAP`.
- Sym-based `mvcgen'` was expanded to match `mvcgen` more closely, with benchmark/test updates.
