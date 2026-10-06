---
date: 2026-10-05
repo: leanprover/lean4
size: L
title: "Lean adds HTML syntax and core fixes"
excerpt: "New HTML-like syntax lands alongside docstring parsing, grind, vcgen, and runtime/interpreter fixes."
commits: 15
authors: [hargoniX, sgraf812, Vtec234, leodemoura, david-christiansen, algebraic-dev, Kha, TwoFX]
commit_authors: {"c1ac28d": Vtec234, "967598c": Vtec234, "eff552d": david-christiansen, "7537fb9": hargoniX, "fcf20f7": sgraf812, "1a151a2": algebraic-dev, "dde01e0": sgraf812, "1e15c3f": sgraf812, "c96933c": hargoniX, "0540257": hargoniX, "c464586": hargoniX, "eb7bc1e": Kha, "c3286a4": TwoFX, "80b09c3": leodemoura, "a883741": leodemoura}
---

### **HTML-like syntax and elaborator added** (967598c)
Lean now has `Lean.Data.Html.Syntax` plus an elaborator into `Lean.Data.Html`, with character-reference decoding and parser views for parsed content. This is a substantial new API that makes HTML snippets first-class in Lean and comes with parser, printer, and test coverage.

### **`vcgen` recognizes more conjunctive preconditions** (dde01e0)
`vcgen` now treats more `@[spec]` preconditions as conjunctive in the schematic postcondition, so they can be applied directly without frame inference. That broadens the class of specs that generate simpler verification conditions and should make proofs faster and more robust.

### **IR interpreter becomes branch-free on variable access** (7537fb9)
The IR interpreter now sizes argument and join-point stacks up front from lowering metadata instead of resizing on each access. That removes a branch from variable lookup and should improve interpreter performance.

### **Runtime and libuv error handling tightened** (1a151a2)
Lean now rejects oversized `System.random` requests before allocating huge buffers, and `Loop.configure`/`Loop.alive` documentation and signatures were aligned with current behavior. The runtime also stops asserting on missing filenames for certain libuv errors, improving robustness around IO error translation.

### **`grind` learns large-coefficient modular normalization** (a883741)
A new homomorphism simproc rewrites large modular coefficients to their small complements, which helps `grind` handle goals like `-1 * a` over `UIntN`/`BitVec` without blowing the `lia` budget. This is a targeted performance/automation win for bitvector-heavy proofs.

### **`debug.synthInstance.checkCacheHits` is fixed** (eb7bc1e)
Cache-hit validation for typeclass search now recomputes under isolated state and heartbeat accounting, and compares results after the same normalization the cache uses. That fixes false mismatches and avoids the checker itself perturbing elaboration.

### **Docstring parser recovery is more stable** (eff552d)
Verso docstring recovery no longer swallows newlines in the wrong places, which prevents unrelated blocks from merging during error recovery. Error reporting for unterminated roles and inline code is also more specific, making parse failures less noisy and more predictable.

### **`grind` and `Sym.simp` handle more numeral forms** (80b09c3, 1e15c3f)
`Sym.simp` now folds orphan raw `Nat` literals into canonical numeral form, fixing a class of normalization failures in `grind`. Separately, `vcgen` now splits a pointwise `∧` in entailment preconditions like a lattice meet, matching the behavior users already get from `⊓`.

### **`Loop.configure` leak and random bounds fixed** (1a151a2)
The UV loop and random APIs got targeted fixes around resource handling and argument validation, including better behavior for invalid priorities and oversized random requests. These are practical runtime safety improvements rather than surface API changes.

### **`vcgen` precondition splitting improved** (1e15c3f)
A conjunctive precondition on the right-hand side of a `vcgen` entailment now gets split more reliably, so specs written with `∧` behave like the equivalent `⊓` form. This removes a surprising proof gap for verification-condition generation.

### Other misc changes
- Lattice lemmas reorganized into topic files (fcf20f7)
- `Loop.configure`/`Loop.alive` docs and signatures adjusted (1a151a2)
- `checker` and IR compiler internal cleanup (0540257, c464586)
- Stage0 refresh (c96933c)
- Linter behavior changed for invalid commands and matching interactive test updates (c3286a4)
- Additional `grind`/`vcgen` test and normalization tweaks (80b09c3, 1e15c3f, dde01e0)
- HTML syntax registration fix after landing the new syntax (c1ac28d)
