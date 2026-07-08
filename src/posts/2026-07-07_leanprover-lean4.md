---
date: 2026-07-07
repo: leanprover/lean4
size: L
title: "Lean4 tightens kernel, grind, and do-notation"
excerpt: "Deterministic kernel recursion limits, SymM invariant enforcement, and a dependent do-`match` fix headline the day."
commits: 19
authors: [TwoFX, Kha, leodemoura, sgraf812, robsimmons, hargoniX, Rob23oba, eric-wieser]
commit_authors: {"85e209a": Kha, "1855cc9": sgraf812, "5be27a0": leodemoura}
---

### **Kernel recursion now follows `maxRecDepth`** (85e209a)
The kernel’s deep-recursion failure is now bounded by Lean’s existing `maxRecDepth` option instead of the native stack size, making the error deterministic across platforms and builds. The error message also tells users how to raise the limit, and the change is wired through declaration checking and tests.

### **`shareCommon` now preserves `SymM` invariants** (5be27a0)
`shareCommon` was upgraded to maintain the representation invariants used by `grind` and `Sym.simp`: reducible constants are unfolded, and kernel projections are folded back into projection applications. The new code also threads a cache through retries so failed invariant checks can resume without redoing already-processed subterms.

### **Bare `return` works in dependent `do`-`match` branches** (1855cc9)
A bare `return` inside a dependent `match` branch in a `do` block now targets the refined branch type, so patterns like `| 0 => return 0` type-check directly. This fixes a real elaboration gap and is covered by new regression tests, including nested and parenthesized `do` blocks.

### **`decide` now reports the original kernel error more reliably** (85e209a)
When elaboration of the diagnostic path itself fails, `decide` now falls back to the original kernel exception instead of losing the useful failure message. That should make interactive failures easier to debug when the elaborator and kernel disagree.

### Other misc changes
- Removed the custom small allocator and related runtime/CMake plumbing.
- Several public API cleanups: moved `ImportCompletion`, relocated `ExceptT` lemmas, removed dead `@[export]` attributes, and privatized builtin simproc helpers.
- `shareCommon` performance tweak at `SymM` and a vcgen benchmark adjustment.
- Minor namespace cleanup and spell-check typo fixes.
- CI dependency bumps for GitHub Actions and msys2.
