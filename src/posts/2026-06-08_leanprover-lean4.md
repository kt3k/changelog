---
date: 2026-06-08
repo: leanprover/lean4
size: L
title: "Lean adds do-notation and linting upgrades"
excerpt: "Major do-notation semantics changed, env linters became option-driven, and the compiler gained USize constant folding."
commits: 9
authors: [hargoniX, Kha, Garmelon, wkrozowski, volodeyka, sgraf812]
commit_authors: {"3696103": sgraf812, "6b63f7d": Garmelon, "b6682da": hargoniX, "5b6365d": wkrozowski, "50e5bb3": volodeyka, "d265d1c": Kha}
---

### **Do-notation now accepts arbitrary `doElem`s after `←`** (3696103)
`nestedAction` now parses a full `doElem` after `←`, not just a term, and the new elaborator handles the richer syntax. This is a breaking change for code that relied on `return` inside nested actions to return from the inner block; the legacy elaborator still preserves the old restriction behind `set_option backward.do.legacy true`.

### **Environment linters are now controlled by Lean options** (5b6365d)
Builtin environment linters can now be toggled per declaration with `set_option linter.X false in ...` and at the CLI with `lake lint --linters=...`. The implementation also snapshots linter options into the environment so declaration-level lint behavior is tracked consistently across elaboration and lint runs.

### **Compiler folds `USize` equality and ordering** (b6682da)
The constant folder now evaluates `USize.decEq`, `USize.decLt`, and `USize.decLe` in both 32-bit and 64-bit interpretations and only folds when they agree. That makes platform-dependent `USize` comparisons more optimizable without risking incorrect cross-platform behavior.

### **`@[spec]` gains a new internal WP-based path** (50e5bb3)
`@[spec]` was refactored to support both legacy `Std.Do.Triple` specs and a new internal weakest-precondition-based spec database. This is a substantial preparatory change for `mvcgen`, preserving backward compatibility while adding a dispatcher that can register either spec style.

### **Lean release scripts and CI were tightened up** (6b63f7d, d265d1c)
Release tooling got more robust around toolchain lookup and workflow handling, and macOS aarch64 CI was demoted out of the PR path to save time. These changes reduce friction in release automation and shorten the feedback loop for contributors.

### Other misc changes
- Fixed an incorrect debug assertion in `lean.h`.
- Updated stage0 artifacts.
- Added a Claude skill note for retrying stage2 olean-related test failures.
