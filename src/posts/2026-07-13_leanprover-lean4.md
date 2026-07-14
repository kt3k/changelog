---
date: 2026-07-13
repo: leanprover/lean4
size: M
title: "Grind fixups and clearer reducibility warnings"
excerpt: "Bootstrapping fixes for grind and BitVec, a clearer class-instance reducibility warning, plus a syntax borrow-annotation perf tweak."
commits: 6
authors: [datokrat, hargoniX, leodemoura]
commit_authors: {"3dde021": datokrat, "2a2a479": hargoniX, "46cf2b9": leodemoura, "8bcd02e": datokrat, "0d2a484": datokrat}
---

### **Fix grind bootstrapping around BitVec normalization** (46cf2b9)
The `grind` normalizer now registers `BitVec.ofNatLT` normalization earlier, avoiding a bootstrap ordering bug that left patterns improperly normalized while processing `Init/Data/BitVec/Lemmas.lean`. This also moves the `[grind =]` attribute for `BitVec.toNat_ofNatLT` so the pattern is computed with the right normalization set.

### **Improve reducibility diagnostics for class definitions and instances** (0d2a484)
Warnings around class-type definitions and instances are now more precise: semireducible instances get a targeted message that suggests `@[instance_reducible]`, and users can opt out with `warn.classDefReducibility := false`. The change also avoids noisy warnings for `@[irreducible] instance` cases and clarifies the error when `@[semireducible]` is applied redundantly.

### **Add borrow annotations to `Syntax.structEq` for early bootstrapping** (2a2a479)
`Syntax.structEq` now takes borrowed arguments, which avoids routing through bootstrapping wrappers without borrow annotations. That matters because this function is reached transitively from `alphaEq`, so the change trims an early-core performance hazard.

### Other misc changes
- Re-enabled the previously disabled `grind_bitvec2.lean` benchmark after the underlying issue was fixed (3dde021).
- Updated stage0 artifacts (373c37e).
- Temporarily disabled the `grind_bitvec2.lean` benchmark in `tests/CMakeLists.txt` before it was re-enabled later (8bcd02e).
