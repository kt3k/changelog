---
date: 2026-09-17
repo: leanprover/lean4
size: L
title: "Lake gets path-copy deps, profilers land"
excerpt: "Major Lake dependency and profiling additions, plus AIG/CNF refactor and a BVDecide speedup."
commits: 6
authors: [Garmelon, tydeu, sgraf812, hargoniX, TwoFX, kim-em]
commit_authors: {"35485b8": Garmelon, "ec84559": tydeu, "b638e5a": sgraf812, "a282c02": hargoniX, "75c5f89": TwoFX, "e12fac8": kim-em}
---

### **Lake path dependencies can now be copied** (ec84559)
Lake’s dependency model now supports `copy` for path-based packages, both in TOML (`copy = true`) and Lean DSL (`require ... from copy ...`). When enabled, Lake materializes the dependency into `packages/` and loads from that copy, which changes workspace layout and makes local path deps behave more like cloned Git deps.

### **`lake samply` adds end-to-end profiling** (e12fac8)
A new `lake samply` command replaces the old Python profiling scripts with a single Lake workflow that records CPU profiles, symbolicates them, demangles Lean names, and serves them to Firefox Profiler. This is a notable developer-tooling upgrade for performance investigation and is backed by CI/test coverage.

### **BVDecide counterexample recovery now uses generic AIGs** (a282c02)
The AIG-to-CNF pipeline was refactored from `AIG Nat` to generic `AIG`, removing the `relabelNat` step and making the CNF representation more direct. The counterexample recovery path was updated accordingly, which should improve efficiency and sets up reuse of the new generic API.

### **Lean’s `erased` do-notation parsing is streamlined** (b638e5a)
The `erased` do-notation elab/macro code now parses with the compiled grammar instead of relying on the bootstrapping-era quotation option. This removes a temporary workaround and restores the build-instruction regression introduced earlier.

### Other misc changes
- Release script updates for accumulated release-process changes (35485b8)
- Grove documentation/data refresh and generated coverage tables (75c5f89)
