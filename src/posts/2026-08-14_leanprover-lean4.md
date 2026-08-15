---
date: 2026-08-14
repo: leanprover/lean4
size: L
title: "Lean4 adds VCGen, grind, and ST.Ref upgrades"
excerpt: "New VCGen splitting for `cond`, richer grind diagnostics, lower `bv_decide` latency, and an ST.Ref API/runtime fix landed today."
commits: 11
authors: [sgraf812, hargoniX, wkrozowski, Kha]
commit_authors: {"1239205": sgraf812, "639065a": hargoniX, "7669d90": hargoniX, "bb01f17": Kha, "b6ce7f0": hargoniX}
---

**`cond` programs now split into per-branch VCs** (1239205)
`mvcgen` and `vcgen` now treat `cond` like `if`/`match`, generating one verification condition per branch and keeping `c = true`/`c = false` in scope. This improves proof automation for boolean-branching programs and avoids lumping both branches into one obligation.

**`grind` gets e-matching graph cost diagnostics** (639065a)
A new diagnostics pass computes branching and transitive cost metrics for e-matching instances, gated by `set_option grind.ematch.diagnostics true`. This should make it much easier to spot runaway instantiation patterns and understand why `grind` is slowing down or blowing up.

**`bv_decide` now backs off faster while polling SAT** (7669d90)
The SAT-wait loop switches from a fixed 50ms sleep to exponential backoff starting at 1ms and capping at 64ms. That reduces latency for batches of small SAT problems without changing the solver behavior itself.

**`ST.Ref` is tightened into a true take/put protocol** (b6ce7f0)
The mutable-reference API now exposes `ST.Ref.put` and redefines `ST.Ref.set` as a simple `swap`, while `modify`-style code uses the new unsafe `put` after `take`. The runtime side now asserts the critical-section invariant instead of silently dropping overwritten values, which fixes the remaining soundness issues in the implementation.

**Kernel-built environments can now resolve local declarations correctly** (bb01f17)
`Environment.find?` and related lookup paths now search the kernel environment map produced by `ofKernelEnv`, not just imported elaboration state. That fixes incorrect misses and also improves some kernel error messages.

### Other misc changes
- Rename/refactor the weakest-precondition library from `Std.Internal.Do` to `Std.WP` and update `do`-notation elaboration to use the new namespace (2 commits).
- Add a clickable hint/code action to the `deprecated` linter.
- Update stage0 snapshots (2 commits).
- Restore direct assertion-library constant names in spec/conjunctive analysis after the namespace move.
