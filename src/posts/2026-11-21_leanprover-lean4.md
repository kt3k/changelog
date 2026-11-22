---
date: 2026-11-21
repo: leanprover/lean4
size: L
title: "Kernel fixes and smarter match compilation"
excerpt: "Lean fixes constructor checking, equation lemmas, and refuting-match analysis, plus a Lake server import-cache fix and a grind recovery bug."
commits: 6
authors: [leodemoura, arthur-adjedj, david-christiansen]
commit_authors: {"fcd90cf": arthur-adjedj, "6ee17d3": leodemoura, "5e8c9e7": david-christiansen, "ab8894f": leodemoura, "badf11f": leodemoura}
---

### **Check constructors in the right environment** (fcd90cf)
Lean now type-checks inductive constructors in an environment where the inductive types exist but are not yet known as inductives. This avoids kernel bugs where constructor checks could consult constructor metadata too early and misbehave on mutual inductives.

### **Fix equation lemmas for non-variable match discriminants** (6ee17d3)
Equation lemma generation now handles `match` branches where one discriminant is not a variable by resolving the `discr = pattern` / `discr ≍ pattern` hypotheses the same way `cases` does. That means contradictory branches are closed correctly, and the remaining ones properly instantiate pattern variables instead of failing to generate equational theorems.

### **Include transitive private imports in `lake setup-file`** (5e8c9e7)
Lake’s file setup now pulls in IR for modules that are only reachable through private imports, which fixes missing-data-file errors in the language server when using the artifact cache. This makes editor setup more robust for projects with private dependency chains.

### **Match compiler refutes inconsistent discriminants earlier** (ab8894f)
The match compiler now detects more refuting discriminants up front, including impossible constructor-index equalities and inconsistent inductive-family indices. In practice, this reduces unnecessary splitting and can make compilation of large pattern matches faster.

### **`tactic =>` now respects recovery in grind mode** (badf11f)
A failing nested `tactic =>` block inside `grind =>`/`sym =>` no longer gets silently admitted when recovery is off. The fix preserves the caller’s recovery setting so `first` can correctly fall through to later alternatives instead of masking failures.

### Other misc changes
- Stage0 updated (1 commit)
