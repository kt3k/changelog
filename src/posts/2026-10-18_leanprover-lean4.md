---
date: 2026-10-18
repo: leanprover/lean4
size: L
title: "grind arithmetic normalizers get safer"
excerpt: "Multiple fixes tighten `simp +arith` and `grind` normalization, preventing kernel loops and bad certificates around numerals, inverses, and forall binders."
commits: 6
authors: [leodemoura]
commit_authors: {"a89be97": leodemoura, "8f4ba6b": leodemoura, "b0acea7": leodemoura, "a6f3073": leodemoura, "ac6478c": leodemoura}
---

### **Safer arithmetic normalization across `simp` and `grind`** (a6f3073)
`sim​p +arith` now treats negative integer literals canonically, avoiding false “changes” on already-normal `Int` terms and spurious `e = e` certificates. The same commit also fixes equation orientation in both `grind` normalizers so forms like `x + -1 * y = 0` and `x + k = 0` normalize to `x = y` and `x = -k` as intended.

### **Keep inverse atoms from bypassing field normalization** (8f4ba6b)
`Sym.Arith` no longer leaves equations involving inverse atoms unsolved, which previously let terms like `a = 1 * 2⁻¹` slip through in a form the certificate logic could not justify. Those equations now go through the field normalization path instead.

### **Preserve `-0` as a negation in `Sym.Arith`** (b0acea7)
The `grind` Sym normalizer now reifies `-0` as `-.(0)` rather than collapsing it to the numeral `0`, which matters in general rings where `-0` is not definitionally equal to `0`. This prevents mismatched certificates on terms involving division or inversion by `-0`.

### **Keep canonical numerals when `grind` retains `x = k`** (a89be97)
When `Sym.Arith` keeps a numeral equation, it now preserves the canonical literal instead of re-rendering it through the structure’s written type, which had created duplicate literal nodes in the E-graph. That closes a kernel-error bug in goals like `i ≠ 0` for `BitVec (id 32)`.

### **Avoid looping `simp` on dependent foralls over `Prop`** (ac6478c)
`sim​p` now drops a proof of `p = p` in the dependent-forall `Prop`-domain path, instead of threading a useless cast back into the binder. This fixes a `maxRecDepth` loop that could be triggered by `simp +arith` and downstream tactics like `grind` and `lia`.

### Other misc changes
- Dependency/test-style fixes and new regression tests for arithmetic normalization (`grind`/`simp +arith`).
- Additional coverage for `grind` on canonical numerals, inverse atoms, and `-0` edge cases.
