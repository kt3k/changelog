---
date: 2026-10-29
repo: leanprover/lean4
size: L
title: "Lean4 lands VCGen, IO, and perf upgrades"
excerpt: "Major VCGen simplifications, a new atomic rename API, faster elaboration and grind, plus a new internal union-find."
commits: 14
authors: [hargoniX, tydeu, sgraf812, TwoFX, nomeata, Garmelon, david-christiansen, leodemoura]
commit_authors: {"b3a4ec6": hargoniX, "da4ff23": hargoniX, "ece9cbd": tydeu, "5fe62b1": TwoFX, "400f83a": sgraf812, "ea7b811": sgraf812, "7500f3e": hargoniX, "18bf9ee": hargoniX, "526b5fd": nomeata, "acc2b3b": Garmelon, "c3bb4fa": david-christiansen, "aca24b1": leodemoura, "9c789e6": tydeu}
---

### **Lean gets a new internal union-find structure** (7500f3e)
`Lean.Data.UnionFind` is now part of the compiler internals, with rank-based unions, path splitting, and member tracking via cyclic pointers. This gives Lean a dedicated union-find implementation for future elaboration and compiler work.

### **`IO.FS.renameIfNew` adds atomic rename-with-no-overwrite** (ece9cbd)
A new `IO.FS.renameIfNew` primitive was added, backed by platform-specific implementations on Windows, macOS, and Linux. It enables atomic file moves that fail if the destination already exists, which is important for safe cache updates and other race-sensitive writes.

### **VCGen now drops dead equations after substitution** (400f83a)
`vcgen` now detects when a substituted equality is no longer needed and omits it from the resulting verification condition. That makes generated goals smaller and clearer, especially when the equation carries no remaining information after substitution.

### **Frame conditions can now be discharged by a `frameproc` theorem** (ea7b811)
Framed calls in `vcgen` can now use a theorem supplied by `@[frameproc]` to prove the frame condition directly. This keeps frame obligations out of the generated verification conditions and makes the mechanism fit better with frame-closure style WPs.

### **`try?` keeps going after recursion-depth failures** (526b5fd)
`try?` now treats maximum-recursion-depth failures like other resource-limit failures and moves on to the next candidate instead of aborting. This makes tactic search more robust when one candidate blows the recursion budget.

### **Long list literals elaborate faster** (b3a4ec6)
The long-list path was ported from a macro to a term elaborator that preserves the same behavior but runs faster. This should improve elaboration time for code that relies on large list literals.

### **Numeric literals now use a known expected type directly** (18bf9ee)
When a numeral’s expected type is already known, Lean no longer introduces an extra metavariable just to rediscover it. That simplifies elaboration and trims some overhead from literal handling.

### **`grind`’s order solver avoids unnecessary quadratic work** (aca24b1)
The shortest-path update in the order solver now only visits source/target pairs whose distances can actually improve. This reduces the blowup from adding many related numerals and makes `grind` substantially faster on those workloads.

### **More bug fixes in docstrings, instances, and release tooling**

### Other misc changes
- Removed redundant arrow inhabitation instances and updated the related test (`5fe62b1`)
- Fixed Verso docstring scoping for well-founded recursion (`c3bb4fa`)
- Added a stage0 update (`bdf58cf`)
- Updated release scripts (`acc2b3b`)
- Misc test/CI cleanup, including Lake test fixes and IO/test expectation updates (`9c789e6`, `da4ff23`, `bdf58cf`, `18bf9ee`, `5fe62b1`, `c3bb4fa`, `aca24b1`, `b3a4ec6`)
