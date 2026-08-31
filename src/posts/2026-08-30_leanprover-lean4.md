---
date: 2026-08-30
repo: leanprover/lean4
size: M
title: "Lean fixes ambiguity context and primitive checks"
excerpt: "App elaboration now preserves info trees and context for ambiguous syntax, while Lake’s primitive checker recognizes more builtins."
commits: 2
authors: [hargoniX, kmill]
commit_authors: {"2a5b1a2": hargoniX, "ac0f56e": kmill}
---

### **Ambiguous app elaboration now keeps full info context** (ac0f56e)
Lean’s app elaborator now wraps ambiguous elaboration results in choice info trees that preserve command context and partial term info. That fixes missing metavariable/context data in the infoview for ambiguous syntax and closes #8108.

### **Lake primitive target list expanded** (2a5b1a2)
`lake check` now treats several more names as primitives, including `Nat`, `String`, `Char`, and the parameter-related builtins `optParam`, `autoParam`, `semiOutParam`, and `outParam`. This makes the primitive coverage more complete for challenge/check workflows.

### Other misc changes
- None
