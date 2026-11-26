---
date: 2026-11-25
repo: leanprover/lean4
size: M
title: "Lean fixes inductives and speeds LRAT"
excerpt: "Kernel inductive checking is fixed, LRAT RAT-step checks are faster, and iterator internals and an Option docstring were cleaned up."
commits: 4
authors: [TwoFX, arthur-adjedj, hargoniX]
commit_authors: {"e1228b8": arthur-adjedj, "451d44e": hargoniX, "077a654": TwoFX, "82ef3a8": TwoFX}
---

### **Fix inductive registration order to close a kernel hole** (e1228b8)
`add_inductive` now type-checks nested inductive applications after rechecking parameters, instead of before constructors are added to the environment. This fixes a non-critical acceptance bug where a constructor could leak into a nested occurrence’s parameters; the new regression test shows the bad declaration is now rejected.

### **Speed up RAT-step checking in the LRAT checker** (451d44e)
The LRAT checker’s RAT path now uses cheaper `contains` checks instead of the previous membership formulation, trimming overhead in a hot verification loop. The result is faster proof checking on RAT-heavy inputs without changing the checker’s behavior.

### **Hide iterator helper definitions from the public API** (077a654)
Several iterator construction lemmas and relations were marked `private`, narrowing what the modules export. This is mostly an API hygiene change for internal finiteness/productivity proofs, with little user-facing impact.

### Other misc changes
- Fixed the `Option.or`/`orElse` docstrings (82ef3a8)
