---
date: 2026-07-10
repo: leanprover/lean4
size: M
title: "Grind gets faster; benchmark lands"
excerpt: "Performance tweaks for grind and exporting, plus a new vcgen benchmark and a few test/doc cleanups."
commits: 6
authors: [leodemoura, Kha, sgraf812, berberman]
commit_authors: {"0aa1c39": leodemoura, "dd8e885": leodemoura, "8006bb0": Kha, "a586d13": Kha, "d387212": sgraf812, "02294f9": berberman}
---

### **Fast path for `grind`’s internal ring envelope** (0aa1c39)
`grind` now special-cases its internal `Ring.OfSemiring.Q` envelope when building commutative-ring instances. This should reduce instance-search overhead in arithmetic-heavy proofs, especially when `grind` repeatedly touches this wrapper type.

### **Avoid cache-wiping `modifyEnv` in `withExporting`** (dd8e885)
`withExporting` now skips toggling `Environment.isExporting` when it would be a no-op, and also avoids the `modifyEnv` round-trip on non-module environments. That matters because `modifyEnv` invalidates core/meta caches, so this trims overhead in hot paths such as `grind`’s equation-lemma lookup.

### **Add a large `vcgen`/`grind` benchmark over the Verina corpus** (d387212)
A new benchmark suite exercises `vcgen` and `grind` across 27 Verina verification programs, measuring the solver/decomposition workload rather than proof elaboration noise. This gives maintainers a broader performance signal for real verification-style inputs.

### Other misc changes
- FSANITIZE test exclusion cleanup and workflow adjustments (8006bb0)
- Revert Lake cache CMake change for `PREV_STAGE` usage (a586d13)
- Fix `RecursorVal` docstring examples for K-like reduction (02294f9)
