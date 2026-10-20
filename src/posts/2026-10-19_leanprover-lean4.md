---
date: 2026-10-19
repo: leanprover/lean4
size: L
title: "Lean4 strengthens grind and vcgen"
excerpt: "Key proof automation fixes land for subtype facts, funext candidates, and VC generation, alongside smaller Sym.simp and Lake improvements."
commits: 17
authors: [TwoFX, leodemoura, sgraf812, hargoniX, nomeata]
commit_authors: {"40b1e71": leodemoura, "f608c1a": leodemoura, "7aeab83": sgraf812, "793fe95": TwoFX, "f2531e6": hargoniX, "222b9dd": nomeata, "5c83f21": leodemoura, "626dc06": leodemoura, "aa10863": leodemoura}
---

### **grind learns subtype facts from `Subtype.mk` and records funext parents** (f608c1a, 40b1e71)
`grind` now asserts the predicate of a `Subtype.mk` term even when the stored proof is only definitionally equal to the subtype condition, unlocking cases that previously got stuck on subtypes. It also records lambda split candidates for every parent application, fixing missed function extensionality splits when the same lambda appears under multiple parents.

### **`vcgen` now substitutes pure equality preconditions into later goals** (7aeab83)
A new VC generation step substitutes a pure precondition of the form `x = t` through the rest of the goal while keeping the hypothesis in context. This makes generated obligations more canonical and is important for workflows like Iris/HeapLang.

### **`Sym.simp` gets multiple correctness and termination fixes** (5c83f21, 626dc06, aa10863)
The normalizer now re-synthesizes instances when a rewritten class changes, evaluates `USize.toNat` for numerals in the supported range, and zeta-reduces `let` binders at the head of applications. Together these fixes improve both robustness and parity with the legacy normalizer.

### **`MonadMacroAdapter CoreM` is now available** (793fe95)
Lean adds a `MonadMacroAdapter CoreM` instance, enabling macro-adapter code to work in `CoreM` now that macro scope info lives in core state. This expands where macro-related infrastructure can be reused.

### **Lake comparator gets stricter about challenge holes and axiom reporting** (f2531e6, 222b9dd)
`lake check` now reports unpermitted axioms before invoking external checkers, avoiding obscure downstream failures and surfacing the real issue earlier. Comparator challenges also now require definition holes to actually be `sorry`, making challenge definitions canonical.

### Other misc changes
- LLVM upgraded to 23.1.3.
- Refactors in `macro_rules`/`elab_rules` kind checking, parser syntax categories, `aux_def` naming, and quote-scope erasure.
- Small Grove lakefile syntax fix.
- `grind` termination fix for `List.findIdx`/`min` patterns.
- Misc test coverage added for the above changes.
