---
date: 2026-11-01
repo: leanprover/lean4
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: L
title: "Lean4 adds VCGen defaults, big grind speedups, and core APIs"
excerpt: "This week Lean sharpened proof automation, sped up elaboration/kernel hotspots, and added new IO, arithmetic, and tooling APIs."
commits: 125
---

### **Proof automation got faster and more capable**
`grind`, `Sym.simp`, `lia`, `rw`, and `kabstract` saw the biggest investment this week. Lean reduced exponential and quadratic slow paths, improved universe matching and level unification, made `grind?` suggestions and failure messages more reliable, and added better branching/disjunction handling plus a new global branch budget. `Sym.simp` also learned more arithmetic rewrites and ground-term evaluation, while `rw` and `kabstract` now avoid unnecessary whole-goal and repeated shared-subterm work.

### **VCGen now does more by default**
Verification-condition generation picked up several usability improvements: generated VCs are simplified by default using a dedicated `@[vcgen_simp]` collection, dead equations are dropped after substitution, side conditions can be discharged automatically, and frame conditions can be handled directly by `@[frameproc]` theorems. This makes VCGen output smaller and more automation-friendly out of the box.

### **Elaboration, kernel, and runtime performance improved across hot paths**
Lean landed broad core-speed work, including a budgeted expression cache for type inference, faster list-literal elaboration, cheaper numeral handling, a linear `String.toList` reduction path, better `Expr` hashing, and leaner typeclass search via delayed universe instantiation. The interpreter also picked up in-place primitive evaluation and new caches, shaving build time in larger developments.

### **New core and library APIs broaden what Lean can do**
The week added a reusable `Lean.Data.UnionFind`, atomic `IO.FS.renameIfNew`, `Vector.modify`, `Nat.extendedGcd`, and fixed-width modular arithmetic ops for `UInt64`. Bitvector and integer zero-counting APIs were also reworked for better performance and kernel-friendly semantics.

### **Tooling, Lake, and editor integration got sharper**
Lake gained machine-readable JSON output for `check` and `comparator`, more resilient cache transfers, safer atomic cache writes, and toolchain handling fixes. On the editor side, Markdown/Verso semantic tokens were expanded and proof folding now exposes theorem/proof bodies more precisely.

### **Other misc changes**
- Syntax deprecations now apply directly to `syntax`/`macro`/`elab`/`notation` declarations, with fewer false positives.
- Safer runtime cleanup removed an unsafe UTF-8 length helper and obsolete string-data declarations.
- `Char` and related order-instance coverage was filled out, instance naming was centralized, and several docstring, release, stage0, and test updates landed.
