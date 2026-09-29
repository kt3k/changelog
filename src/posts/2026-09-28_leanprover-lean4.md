---
date: 2026-09-28
repo: leanprover/lean4
size: L
title: "Lean4 adds grind arithmetic and hom tweaks"
excerpt: "Security-ish? no; but a major day for `grind`: new arithmetic normalizers, Nat relation simplification, hom fallback rules, and a binder-sharing fix."
commits: 10
authors: [leodemoura]
commit_authors: {"8dd5d44": leodemoura, "327439d": leodemoura, "9f66b6c": leodemoura, "076b0b7": leodemoura, "fabf217": leodemoura, "c46507e": leodemoura, "16df84b": leodemoura, "86941be": leodemoura, "b45f250": leodemoura}
---

### **Fix `Sym.dsimp` binder sharing violations** (8dd5d44)
`Sym.dsimp` now preserves maximal sharing when descending into `fun`, `∀`, and `let` binders, avoiding the `assertShared` panic seen under `sym.debug`. The fix adds shared binder helpers and a regression test for telescopes where bound variables appear later in the body or binder types.

### **Extend `grind` with arithmetic normalizer controls** (b45f250, 076b0b7, fabf217, 9f66b6c)
The arithmetic normalizer gained a `lhsOnly` mode, canonicalization of cast prefixes for all arguments, and new `Nat` post-processing that closes trivial `Nat` relations after simplification. On `Int`, it now also normalizes by gcd, tightens inequalities, and handles divisibility/certificate checks, making `grind` substantially stronger on linear arithmetic.

### **Add `[grind hom fallback]` for low-priority image rules** (327439d)
Homomorphism rules can now be marked as fallback, so they only fire when no more specific `[grind hom]` rule applies. This prevents broad bridge lemmas from shadowing specialized image rules and gives authors a way to express “last resort” rewrites explicitly.

### **Fix `grind` negation pushing into implications and `∀`** (16df84b)
`grind` now correctly rewrites `¬(p → q)` to `p ∧ ¬q` and `¬∀ x, p x` to `∃ x, ¬p x` again. The bug came from a stale pattern match and an overly syntactic proposition check, so this restores dead-code rewrites and improves finished goals and trace output.

### **Document homomorphism rewriter stop behavior** (c46507e)
The `[grind hom]` docs now explain when rewriting stops at an E-graph term, why that does not lose equalities, and which parent rules are skipped. This clarifies a subtle but important part of `grind`’s traversal model for rule authors.

### Other misc changes
- Stage0 refresh (56b48d8)
- Dropped duplicate E-matching copies of several `[grind hom]` image lemmas (86941be)
