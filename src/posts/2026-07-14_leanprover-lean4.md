---
date: 2026-07-14
repo: leanprover/lean4
size: L
title: "Grind gets bounded LIA and a ring fix"
excerpt: "Lean4 adds a `liaSteps` cap for `grind`, fixes a completeness bug in ring simplification, and lands new trace postprocessing support."
commits: 11
authors: [TwoFX, leodemoura, Garmelon, datokrat, sgraf812, plp127, tydeu]
commit_authors: {"356a7e5": leodemoura, "d16f714": leodemoura, "af2bbc3": TwoFX, "fe3f1d3": TwoFX, "3506c49": Garmelon, "0fc9303": TwoFX, "3c080a4": datokrat, "501e4e8": sgraf812, "7847ce5": plp127, "db5c0cb": tydeu}
---

### **Bound `grind`’s LIA search with `liaSteps`** (356a7e5)
`grind` now has a new `liaSteps` configuration option to cap how many search steps the linear integer arithmetic solver will take. This prevents case-split blowups on hard goals, but makes the solver intentionally incomplete once the limit is hit.

### **Fix `grind ring` so coefficient rewrites don’t lose information** (d16f714)
The ring solver now avoids destructive simplifications that could weaken equations in rings without `[NoNatZeroDivisors]`, closing a completeness bug. The change also handles constant polynomials more carefully and keeps the basis consistent when coefficient divisibility blocks a rewrite.

### **Add experimental trace postprocessing for `postprocess_traces`** (3c080a4)
Lean gains a new `postprocess_traces post in cmd` command plus a supporting `Lean.PostprocessTraces` module. It lets users transform trace trees after a command runs, which is useful for filtering, hoisting, and reshaping large trace outputs in the editor.

### **Add `String.Internal.ugetUTF8Byte` for faster byte access** (af2bbc3)
A new internal UTF-8 byte accessor takes a `USize` index instead of `Nat`, reducing boxing overhead in tight loops. The runtime and tests were updated to exercise the new primitive.

### **Add frame inference via `@[frameproc]` to `vcgen`** (501e4e8)
`vcgen` now supports automatic frame inference through a `@[frameproc]` registry and a generalized framing model. This is a substantial extension to the do-notation verification pipeline, broadening framing beyond lattice meet to arbitrary join-preserving operators.

### **Move initializer-execution APIs to `BaseIO`** (db5c0cb)
`Lean.initializing`, `enableInitializersExecution`, and `isInitializerExecutionEnabled` were moved from `IO` to `BaseIO`, and the C entrypoint was adjusted accordingly. This is an API/runtime change with a documented breaking behavior change for `lean_enable_initializer_execution`.

### Other misc changes
- Slightly faster `UInt8.toAsciiLower` (fe3f1d3)
- Reduce namespace pollution across several Lean modules (0fc9303)
- Move `Ne.elim` out of a couple of small internals (7847ce5)
- Update stage0 artifacts (9b9ebcb)
- Bench tooling now reads the lakeprof upload URL from an env var (3506c49)
