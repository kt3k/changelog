---
date: 2026-11-03
repo: leanprover/lean4
size: L
title: "Grind, vcgen, and defeq get sharper"
excerpt: "Major solver and elaborator improvements landed: float-literal defeq, better grind arithmetic, vcgen simp expansion, and Sym/join-point fixes."
commits: 25
authors: [hargoniX, TwoFX, sgraf812, leodemoura, nomeata, vincentqb, kim-em]
commit_authors: {"504e35a": hargoniX, "b2c8389": nomeata, "82728c3": hargoniX, "d5f8e7e": sgraf812, "f6a57e3": nomeata, "6c0f8a7": sgraf812, "fd47c53": sgraf812, "92f5808": nomeata, "398d162": leodemoura, "93edb8e": sgraf812, "317599b": leodemoura, "04c6814": leodemoura, "1aecdf2": leodemoura}
---

### **`grind` now relates Nat/Int casts in rings** (04c6814)
`grind` can now connect `NatCast` and `IntCast` terms in ring goals, which fixes proofs that mix `m : Int` and `k : Nat` after coercions. This closes a real soundness/automation gap for mixed-cast arithmetic in commutative rings.

### **Float literals are handled by value in defeq and matching** (b2c8389, 92f5808, f6a57e3)
`isDefEq` now compares `Float`/`Float32` literals by bit-pattern value instead of unfolding the float model, avoiding timeouts in definitional equality and match equation generation. The match compiler also normalizes and groups equal float literals more efficiently, and redundant/overlapping float patterns are now detected correctly.

### **`Sym` and `vcgen +jp` handle `let`/`have` structure better** (1aecdf2, d5f8e7e, fd47c53, 93edb8e, 317599b)
Backward rules in `Sym` now preserve `let`/`have` declarations in generated goals instead of copying their values everywhere, which improves sharing and avoids blowups. `vcgen +jp` also got more robust join-point handling, including nested join points and smaller hypotheses, making verification-condition generation both more reliable and less explosive.

### **`vcgen_simp` grows into a real simplification set** (6c0f8a7)
The order automation layer now registers a dedicated `@[vcgen_simp]` set with logical, lattice, and `Prop`-transport lemmas, plus index-elimination rules for `∃`/`⨆`. This gives `vcgen` a much stronger normalization story for verification conditions, especially when translating lattice-heavy specs into propositional form.

### **`bv_decide` gains a generic incremental CEGAR solver** (82728c3, 504e35a)
The bitvector prover now has a reusable incremental solver interface, with explicit push/pop state and a shared model structure for uninterpreted functions. CaDiCaL integration was also improved by using a terminator for incremental solves, removing the extra killer thread and making repeated solving cheaper.

### **Equation lemmas keep root `have`s/`let`s when possible** (398d162)
The equation-lemma generator now preserves root-level `have`/`let` bindings unless it must zeta-reduce them to expose a `match`. That avoids duplicating large intermediate expressions and keeps generated equations much smaller for definitions that don't actually split on a match.

### Other misc changes
- Made `Std.Notify` state types private.
- Renamed internal `Void` to `ST.Internal.Void` and updated staging prep.
- Fixed olean compactor allocation failure handling.
- Default thread stack size is now 8MB on all 32-bit targets.
- Added auto-attach/wf preprocessing lemmas for `Option`.
- Misc internal cleanup and test updates across `BVDecide`, `grind`, and compiler support.
