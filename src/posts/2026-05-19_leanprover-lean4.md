---
date: 2026-05-19
repo: leanprover/lean4
size: M
title: "Lean4 speeds up dec and stabilizes Lake tests"
excerpt: "Specialized `dec` lowering lands, config-eval bootstrapping is finished, and Lake/CI get reliability fixes."
commits: 9
authors: [kmill, tydeu, hargoniX, Garmelon, TwoFX]
commit_authors: {"727b4aa": tydeu, "1f23107": hargoniX, "29adf42": kmill, "3bb1493": kmill, "a0de902": kmill}
---

### **Specialized `dec` lowering for known shapes** (1f23107)
Lean now generates specialized code when calling `dec` on values with a known constructor shape, so the constructor choice can be compiled into the executable. That should reduce branch misprediction pressure in `lean_dec_ref_cold` and improve performance in code that decrements/reference-counts known forms.

### **Config-eval command elaborators moved fully to builtins** (29adf42)
This completes the transition of configuration-evaluation command elaborators into builtin elaborators, so stage1 no longer needs to invoke the interpreter while generating config evaluators. The change removes the temporary bootstrap glue and avoids the ABI/initialization issues that prompted the refactor.

### **Lean’s `ext` attribute now runs without `liftCommandElabM`** (a0de902)
The `@[ext]` machinery was rewritten to stay in `TermElabM` instead of hopping through `CommandElabM`. This continues the deprecation cleanup around `liftCommandElabM` and simplifies how ext theorems are realized.

### **Coinductive elaboration drops another `liftCommandElabM` use** (3bb1493)
The coinductive module no longer uses `liftCommandElabM` when attaching attributes to generated eliminators. This is another small step in the ongoing deprecation cleanup, with no visible user-facing behavior change.

### **Lake `noRelease` tests made less flaky** (727b4aa)
The test script was adjusted to normalize Lake’s output before diffing, which should stop harmless formatting differences from causing failures. This improves CI reliability for release-fetch behavior in Lake’s `noRelease` suite.

### Other misc changes
- CI build template fixed to copy stage1 into stage2/stage3 during LLVM release builds.
- String/URI handling cleanup and ASCII-length helper added.
- Stage0 updated.
- Dependency/internal refactors and string-processing cleanup.
