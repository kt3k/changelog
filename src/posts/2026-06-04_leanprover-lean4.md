---
date: 2026-06-04
repo: leanprover/lean4
size: L
title: "Lean adds module linters and builtin linter sets"
excerpt: "New whole-module syntax linters, builtin linter sets, Lake cache env overrides, plus deprecations and macOS test fixes."
commits: 6
authors: [wkrozowski, Garmelon, kim-em, marcelolynch, tydeu]
commit_authors: {"7882604": tydeu, "03db94e": wkrozowski, "2e1167d": wkrozowski, "fe3480e": Garmelon, "8949f82": kim-em, "dffdd5a": marcelolynch}
---

### **Module syntax linters land** (2e1167d)
Lean now has `ModuleLinter` support, letting tools run checks once per module with access to the full array of top-level command syntax. That opens the door to whole-module syntactic policies that are awkward or impossible to enforce command-by-command.

### **Builtin linter sets make `linter.extra` first-class** (03db94e)
The linter system now supports sets registered from core Lean initialization, and `linter.extra` is wired up as one of them. In practice, enabling `linter.extra` now activates its extra linters through the same set-membership path as other linter sets, tightening integration with `set_option` and `lake lint --extra`.

### **Lake gains `LAKE_RESTORE_ARTIFACTS` override** (7882604)
Lake can now override `restoreAllArtifacts` from the environment via `LAKE_RESTORE_ARTIFACTS`, matching the existing artifact-cache override pattern. This affects config resolution, propagated environment variables, and test coverage for cache restoration behavior.

### **RBMap/RBTree are officially deprecated** (8949f82)
`Lean.Data.RBMap` and `Lean.Data.RBTree` now emit deprecation warnings steering users to `Std.TreeMap` and `Std.TreeSet`. The change removes Lean’s remaining internal dependence on these containers and nudges downstream code toward the newer `Std` API.

### **Async tests are marked serial to reduce flakiness** (fe3480e)
Several timeout-sensitive async tests now run serially instead of competing with the rest of the suite. This should reduce sporadic failures under load without changing test logic.

### **Lake macOS test harness stops using process substitution** (dffdd5a)
The Lake target/noRelease shell tests now write expected output to temporary files instead of relying on `<(...)`, which was failing on macOS with bad `/dev/fd` descriptors. This is a test-only portability fix.

### Other misc changes
- Deprecation import shims and compile tests updated for RBMap/RBTree.
- Module-linter test package and supporting frontend/elaboration plumbing.
- Lake cache/env schema and test updates for the new restore-artifacts override.
- Async test expectations and cleanup script adjustments.
