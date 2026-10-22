---
date: 2026-10-21
repo: leanprover/lean4
size: L
title: "Lean4 grind gets a big solver refresh"
excerpt: "Major `grind`/`lia` fixes improve correctness, cut panic cases, and add smarter Cooper split handling plus a Cadical upgrade."
commits: 14
authors: [leodemoura, david-christiansen, hargoniX]
commit_authors: {"7352176": leodemoura, "a701b8a": leodemoura, "c4a5525": leodemoura, "60ea83a": leodemoura, "2207eac": leodemoura, "abbd3a4": leodemoura, "541dbdc": david-christiansen, "f4959a9": hargoniX, "7efee42": leodemoura, "ba91097": leodemoura, "9b72c40": leodemoura, "8f6540f": leodemoura, "c0521ef": leodemoura, "38fa11c": leodemoura}
---

### **`grind` now distinguishes hidden variables in anchors** (a701b8a)
`grind?` and generated scripts could confuse different hidden variables that shared the same base name, leading to bad `cases`/`only [...]` suggestions and broken proof scripts. Hidden locals are now hashed with an ordinal among same-named hidden variables, so anchors stay stable and unambiguous.

### **`grind` stops internalizing heterogeneous arithmetic applications** (c4a5525)
Arithmetic normalization and reification now treat mixed-type operators like `c * xs` as atoms instead of assuming the first type argument is the carrier. This fixes kernel-type errors in generated proofs for heterogeneous arithmetic expressions.

### **`grind` avoids stack overflows on cyclic `match` discriminants** (60ea83a)
The `match`-condition prover no longer recursively walks constructor fields through cyclic equivalence classes like `as = a :: as`. That removes a stack overflow on cyclic terms that `grind` cannot prove acyclic.

### **`grind` handles characteristic-1 rings correctly** (2207eac)
`grind` now closes disequalities directly in characteristic-1 rings, avoiding kernel-rejected proofs such as those arising in `Fin 1`. This fixes a soundness bug in the ring solver’s handling of normalized polynomials.

### **`grind` order solver no longer internalizes in-progress Nat casts** (abbd3a4)
The order solver now checks forbidden parents before translating `Nat` terms into `Int`, fixing an internalization error on casts like `((n - m : Nat) : Int)`. It also adds explicit Nat division/mod builders and a fallback path that recovers the original Nat term when only the translated Int form is present.

### **Verso docstring elaboration no longer mutates scoped env extensions** (541dbdc)
Module docstring elaboration no longer persists scoped extension state across docstrings, removing a race condition that could leak environment state between concurrently elaborated code. The fix simplifies the implementation and closes the reported bug.

### **Cadical updated to 3.0.1** (f4959a9)
The bundled SAT backend was bumped to Cadical 3.0.1. It’s a performance-oriented update with benchmark data suggesting a net-positive effect on SMT-LIB workloads.

### **`lia` learns exact elimination for non-unit equations** (7efee42)
`lia` can now eliminate equations whose coefficients are all non-unit without blowing them up into huge scaled forms. This should reduce massive Cooper splits and keep coefficient growth under control on division/modulo-heavy goals.

### **`lia` avoids a snapshot bounds panic and slowdown** (7352176)
A bounds-tightening bug could index the wrong decision-free snapshot after a later variable was introduced, causing a panic and repeated backtrace construction. The fix removes that out-of-bounds access and the associated performance hit.

### **`grind` now propagates solver equalities across heterogeneous classes** (ba91097)
When equivalence classes were merged via `HEq`, solvers could miss equalities or receive ill-typed disequalities because they only tracked one representative per class. The solver bookkeeping now tracks type-aware representatives, fixing both missed propagation and an internal `mkEqProof` type error.

### **`lia` can reorder variables before huge Cooper splits** (9b72c40)
The linear arithmetic search now backs off from enormous Cooper case splits, reorders variables, and restarts so the conflict can surface at a smaller coefficient. Two new configuration knobs control how often reordering happens and when it triggers.

### **`lia` prefers decision-free conflict explanations** (8f6540f)
Conflict handling now keeps both the best fully-tightened bound and the best decision-free bound, so refutations can sometimes explain every Cooper case at once. This reduces unnecessary case enumeration in situations where the untightened constraints already rule out the split.

### **`lia` counts conflict resolutions toward the step limit** (c0521ef)
Case enumeration and disequality splits now consume `liaSteps`, preventing long refutations from running past the configured limit and producing proofs the kernel would reject. This makes the step cap apply to more of the actual search work.

### **`lia` no longer panics when case splits create variables** (38fa11c)
Resetting the decision stack now truncates the assignment to match restored variable count, fixing a panic and infinite loop in model search. This closes a regression where nonlinear propagation could introduce variables mid-search and leave stale assignments behind.

### Other misc changes
- `grind`/`lia` test updates and new regressions
- Small internal refactors and comment/docstring adjustments
- Config/docs added for `liaReorders` and `liaReorderCases`
