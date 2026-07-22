---
date: 2026-07-21
repo: leanprover/lean4
size: L
title: "HTTP replayability, float API, and parser fixes"
excerpt: "Lean4 added replayable HTTP bodies, expanded Float/Float32 APIs, and fixed several correctness bugs in tactics, parsing, replay, and runtime threads."
commits: 10
authors: [eric-wieser, algebraic-dev, hargoniX, Rob23oba, TwoFX, ia0, hanwenzhu, nomeata, sgraf812]
commit_authors: {"943e616": algebraic-dev, "87843ad": Rob23oba, "0e8a9eb": eric-wieser, "e695749": TwoFX, "ac2a7e7": hanwenzhu, "be66a44": nomeata, "aacd612": sgraf812}
---

### **Add replayable HTTP bodies for redirects** (943e616)
Lean’s HTTP body abstractions now include a `Replayable` type class plus reset support on `Body.Any`, letting bodies be safely re-read after consumption. The `Full` body implementation was refactored around explicit replay state, and the connection layer can now preserve replayability for redirect handling.

### **Expand Float/Float32 with NaN, Inf, and Int conversions** (87843ad)
`Float` and `Float32` gained first-class `nan`/`inf` constants, along with matching logical-model values and new `Int.toFloat` / `Int.toFloat32` abbreviations. This makes the floating-point API more complete and easier to use when modeling IEEE-754 edge cases.

### **Fix `replay` to operate on `Kernel.Environment`** (ac2a7e7)
`Lean.Environment.replay` was moved to `Lean.Kernel.Environment.replay`, so replay now works directly on kernel environments instead of converting through the unstable `Environment.ofKernelEnv`. That removes a brittle layer in environment replay and closes the underlying issue.

### **Allow `fun_induction` to name let-bound hypotheses correctly** (be66a44)
The induction elaborator now counts nameable fields the same way `introN` does, fixing a spurious “Too many variable names provided” error when alternatives contain `let` bindings and `generalizing` is used. This restores expected naming behavior for `fun_induction`, `induction`, and `cases` in those patterns.

### **Let `withForbidden` stop on bare non-reserved identifiers** (aacd612)
Parser forbidden-token handling now treats bare identifiers like `invariant` as term terminators when they are explicitly forbidden, while still allowing them everywhere else as normal identifiers. This makes parser combinators like `withForbidden` behave more predictably for clause-like keywords that are not reserved.

### **Rename Nat div/mod lemmas to `*_ite` and keep deprecations** (e695749)
Core natural-number division and modulus lemmas were renamed from `Nat.div_eq` / `Nat.mod_eq` to `Nat.div_eq_ite` / `Nat.mod_eq_ite`, with deprecated aliases left in place. This frees up the old names for future lemmas without immediately breaking existing code.

### **Include OS errors when thread creation fails** (0e8a9eb)
Runtime thread startup now reports the underlying OS error message when thread creation or stack-size setup fails, instead of a generic failure string. The patch also cleans up ownership of the runnable object to avoid leaks on failure paths.

### Other misc changes
- Added more `bv_decide` stress benchmarks (1 commit)
- Fixed `omega` docstring formatting (1 commit)
- Fixed sanitizer issue in `run_init` world initialization (1 commit)
