---
date: 2026-08-26
repo: leanprover/lean4
size: L
title: "Lean4 adds paranoid checker, BVDecide upgrade, refactor"
excerpt: "New allocator-hardened leanchecker build, stronger symbolic Nat handling in bv_decide, and a major refactor of code-quality logging."
commits: 3
authors: [wkrozowski, Kha, hargoniX]
commit_authors: {"31aea96": wkrozowski, "ec5816f": Kha, "940c33d": hargoniX}
---

**Code quality logs now persist in the environment** (31aea96)
Lean’s linter/code-quality pipeline was refactored so entries are stored directly in an environment extension instead of being shuttled through silent messages. That makes the log capture more robust and lets command/module/stateful lint runs merge their results into the final environment before `.olean` output.

**`bv_decide` now handles more symbolic `Nat` shifts** (940c33d)
The bitvector normalizer can now reason about symbolic shift amounts and `extractLsb'` in more cases by rewriting them into interpreted shifts plus width adjustment, while keeping the shift amount as an uninterpreted bitvector atom. This should improve proof automation on goals where the shift count is not a concrete numeral, without claiming full arithmetic reasoning over the count itself.

**Lean adds a hardened `leanchecker-paranoid` binary** (ec5816f)
A new `leanchecker-paranoid` target is introduced, built with mimalloc mitigations at `MI_SECURE=3`. The build changes wire this into release CI and separate out the allocator-hardening runtime so the checker can run with stronger protection against stale-pointer memory corruption.

### Other misc changes
- Build system cleanup for linker flags and runtime target layout.
- New regression/bench/test coverage for code-quality logging and symbolic BVDecide shifts.
- Dependency/tooling and CI workflow adjustments for the new checker target.
