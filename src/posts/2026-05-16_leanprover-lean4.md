---
date: 2026-05-16
repo: leanprover/lean4
size: L
title: "Lean gets faster, richer serialization, and new APIs"
excerpt: "Performance and API work landed across elaboration, dyadic arithmetic, byte arrays, and module serialization, plus CI and build preset cleanup."
commits: 7
authors: [Kha, kim-em, kmill, tydeu]
commit_authors: {"5dea214": kmill, "ef2dc0f": Kha, "d64eaf4": tydeu, "895752d": Kha, "1b8f1f1": kim-em, "c993d3f": kim-em, "d5bcec2": Kha}
---

### **Faster beta-instantiation in elaboration** (5dea214)
`Expr.instantiateBetaRevRange` now skips the beta-reduction path when the arguments contain no lambdas, falling back to `instantiateRevRange` for the common case. That should reduce elaboration overhead in higher-order applications while preserving the existing beta-reducing behavior when it is actually needed.

### **New compacted-region save/read API for cross-file sharing** (895752d)
Lean now exposes `CompactedRegion.save` and `CompactedRegion.read` as first-class primitives for saving/loading one module at a time with explicit sharing across dependency regions and chained saves. This is a substantial serialization refactor that should improve `.olean` handling and enable more reuse of shared objects across files and sessions.

### **Dyadic division at precision added** (c993d3f)
`Dyadic.divAtPrec` now rounds `a / b` down at a requested precision, with `0` for division by zero, and comes with the key correctness lemmas needed to use it in proofs. This makes dyadic arithmetic more direct and avoids forcing callers to compose inversion and multiplication themselves.

### **ByteArray indexing and mutation lemmas added** (1b8f1f1)
Lean’s `ByteArray` proof API now includes the missing lemmas for `push` and `set!`, covering both `getElem!` and indexed `getElem` behavior. This fills a common downstream gap and makes reasoning about byte-array updates much smoother.

### Other misc changes
- CI now verifies the uploaded Lake cache can actually be restored and used (d64eaf4)
- CI build config cleanup: stop special-casing `USE_LAKE=OFF` for `prepare-llvm` in the matrix generator (ef2dc0f)
- Renamed the development CMake preset to `dev-release` and point it at the release build directory (d5bcec2)
