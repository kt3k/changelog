---
date: 2026-08-10
repo: leanprover/lean4
size: L
title: "Lake cache gets package-aware; CNF/strings speed up"
excerpt: "Major updates span bv_decide CNF lowering, Lake cache/package handling, string extraction fixes, and a match elaboration optimization."
commits: 16
authors: [Kha, Rob23oba, TwoFX, tydeu, Garmelon, SamuelLess, georgerennie, hargoniX, plp127, kim-em]
commit_authors: {"786de00": Rob23oba, "b1814ca": TwoFX, "8e7324b": georgerennie, "e17fa1c": TwoFX, "2315eae": hargoniX, "2e43dfe": plp127, "f7f5b4c": Rob23oba, "294cedf": tydeu, "9b857eb": tydeu, "c2d403d": kim-em}
---

### **bv_decide now lowers ITE/XOR patterns more efficiently** (8e7324b)
`Std.Sat.AIG.CNF` now recognizes if-then-else, XOR, and XNOR-shaped gates during AIG-to-CNF lowering and emits a 4-clause encoding instead of the older 12-clause fallback. That should materially shrink CNFs and speed up `bv_decide` on affected formulas.

### **Lake cache commands gain package-aware behavior and clearer scope/rev semantics** (9b857eb)
`lake cache get` can now fetch outputs for a specific workspace package via `--package`, and the help text clarifies how `--rev`, `--repo`, and `--scope` interact. `cache put` also drops the old `--rev` footgun in favor of a more stable `put-staged` flow, which should make cache transfers less surprising.

### **String extraction now has a fast path and fixes a runtime/model mismatch** (f7f5b4c)
`String.extract` was retargeted to a new fast runtime primitive, while `String.Pos.Raw.extract` keeps the safe legacy implementation for invalid positions. The runtime change also fixes a mismatch/UAF-adjacent issue and adds regression tests, so this is both a correctness and performance improvement.

### **Match elaboration avoids unnecessary `mkNotAlt` work** (786de00)
`Lean.Meta.Match.withAlts` now only builds `mkNotAlt` when its result is actually needed. This trims redundant definitional-equality checks in elaboration, with a reported win on `Init.Data.Nat.ToString`.

### **Lake build can use a configurable macOS deployment target** (294cedf)
Lake's shared-library/executable build path now threads an optional `MACOSX_DEPLOYMENT_TARGET` through to the linker instead of always relying on the old fixed behavior. That makes macOS builds more reproducible across environments and lets the configured target participate in rebuild tracing.

### **Deprecated theorem warnings now flag type changes accurately** (b1814ca)
The deprecation machinery now marks several aliases as `+typeChanged`, so users get a warning when the replacement theorem is not merely a name change but a statement change too. The change also cleans up a large batch of deprecated aliases across core `Init` files.

### **`Nat.div_lt_div_right` is generalized** (2e43dfe)
The theorem no longer requires `a ∣ b` in its assumptions. That broadens the lemma's applicability and should make division-order reasoning easier in proofs.

### **`String.Pos.Raw.extract` gets corrected and sped up** (f7f5b4c)
The runtime implementation now splits into a fast internal extractor for trusted positions and a slower checked version for the legacy API, matching the Lean-side declarations. This also resolves the existing model/runtime mismatch and adds targeted tests around invalid and out-of-bounds positions.

### **`Expr.getUsedConstants` now records projection type names** (2315eae)
Constant folding over expressions now includes the `typeName` from projections, so the used-constants list is complete for directly referenced projection types. That fixes hidden misses in downstream analyses that depend on this utility.

### **Iterator loops now work for tree-map iterators** (e17fa1c)
`IteratorLoop` instances were added for the tree-map zipper and related iterators, making them consumable by Lean `for` loops. This fills a gap that mainly affected dependent maps and is backed by new elaboration tests.

### **`List.dropLast_take` now has the right boundary condition** (c2d403d)
The lemma's hypothesis was weakened from `i < l.length` to `i ≤ l.length`, matching the fact that the statement also holds at the endpoint. This is a small but useful proof-correctness fix.

### Other misc changes
- CI/build tweaks: skip missing cache uploads on release builds, exclude `bench/` from fsanitize, and bump the development cycle/stage0.
- `ExtDHashMap` simp lemmas were corrected from `DHashMap` to `ExtDHashMap`.
- Minor cleanup in array/bitvec/list lemmas and docs/tests around the above changes.
