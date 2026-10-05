---
date: 2026-10-04
repo: leanprover/lean4
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: L
title: "Lean4 hardens grind while expanding arithmetic and ground eval"
excerpt: "This week brought major grind upgrades, new ground evaluation for chars, fins, and strings, plus a persistent typeclass cache."
commits: 66
---

### **grind becomes much stronger on arithmetic and normalization**
Lean’s `grind` saw the biggest changes of the week: it learned better linear arithmetic handling, modular inversion over nonzero characteristic rings, more robust `Fin` reasoning, and broader homomorphism rules. The normalizer also gained control-flow handling closer to `simp`, plus fixes for negation pushing, quantified goals, let-unfolding in literals, and several soundness issues that were triggering kernel rejections.

### **New `Sym.simp`/`Sym.dsimp` path gets safer and more complete**
The new `Sym`-based normalizer picked up a `dsimp` pass, better theorem handling, and a switchable `backward.grind.normalizer` option so users can fall back to legacy behavior. It also fixed binder sharing violations, improved treatment of implementation-detail binders, and expanded ground evaluation substantially for `Char`, `Fin`, `String`, and some integer forms.

### **Typeclass search caching is now persistent**
Typeclass resolution now uses a persistent cache across commands, with stricter invalidation and dependency tracking to avoid stale hits. Structural queries can share entries more reliably thanks to free-variable normalization, but unsafe cache reads now fail loudly instead of silently reusing bad state.

### **Bitvector automation and codegen got a notable boost**
`bv_decide` moved forward with a CEGAR / lemmas-on-demand solver that can handle uninterpreted functions, along with safer preprocessing and enum realization fixes. On the codegen side, `ctorIdx` is now O(1) in the common case, and mutually recursive `macro_inline`/`csimp` definitions are supported again.

### **New core data and API additions**
Lean gained a first-class HTML AST and renderer, `ByteArray` order instances, and public `Expr` metavariable queries. Order/lattice automation was also expanded so `grind` and `simp` can do more with complete lattices, predicate transformers, and `vcgen`-style proofs.

### Other misc changes
- Library suggestions now build their indexes in one parallel pass for faster first queries.
- Verso blockquote parsing error locations were fixed.
- Several tests, docs, and stage0 refreshes landed across the week.
