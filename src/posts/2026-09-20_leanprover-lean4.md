---
date: 2026-09-20
repo: leanprover/lean4
size: L
title: "Lean4 gets a big perf and linter shake-up"
excerpt: "Elaboration and compiler replay are faster, proof quick-checking improves for recursors, and module linter handling moves earlier in the pipeline."
commits: 7
authors: [leodemoura, Kha, tydeu]
commit_authors: {"377e119": leodemoura, "322d497": leodemoura, "9db9c60": leodemoura, "26b7fd1": leodemoura, "d3fdb90": Kha, "4199bb3": tydeu, "72f4cf5": leodemoura}
---

### **Elaboration and compiler replay get faster** (72f4cf5)
Lean now replays environment extension changes proportionally to the number of new entries, rather than the size of the whole map. This addresses quadratic slowdowns in files with many `realizeConst`-driven realizations and makes constant realization cost effectively independent of file size.

### **`isProofQuick` now handles recursor/motive applications** (322d497)
`Meta.isProofQuick` can now decide applications whose result is a motive applied to arguments, including `match` auxiliaries, `casesOn`, `brecOn`, and recursors. That avoids the slow fallback that re-inferrs and reduces the type, and the new test covers both definite answers and the remaining `undef` case.

### **Structural recursion elaboration avoids redundant work** (377e119)
The elaborator now skips repeated `isTypeCorrect` checks when structural-recursion tracing is off, and it constructs `brecOn`/matcher arguments more directly instead of going through extra telescope machinery. This trims overhead in recursive-definition elaboration without changing the generated terms.

### **Module linter execution moves into the language processor** (d3fdb90)
The language processor now runs module linters itself and collects their code-quality entries from command snapshots, instead of relying on command elaboration bookkeeping. This also fixes linter code-quality entries disappearing under `Elab.async`.

### Other misc changes
- Avoid redundant nested-proof abstraction for smart unfolding definitions (9db9c60)
- Reduce per-declaration bookkeeping in LCNF extension replay (26b7fd1)
- Add Lake benchmarks for `precompileLibrary` and rename benchmark modes (4199bb3)
