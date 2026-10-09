---
date: 2026-10-08
repo: leanprover/lean4
size: L
title: "Lean4 tightens IR init and fixes equation lemmas"
excerpt: "Performance wins for postponed codegen, plus fixes for equation-lemma determinism and a few correctness bugs in compiler/doc handling."
commits: 6
authors: [Kha, Garmelon, marcelolynch]
commit_authors: {"0bb12a8": Kha, "7afad6f": Kha, "64942e1": marcelolynch, "c00732e": Kha}
---

### **Postponed codegen startup is faster and safer** (7afad6f)
`leanir` now uses a minimal runtime initializer instead of bringing up all of `Lean`, cutting startup cost by about a quarter. The supporting changes also make sure the modules `leanir` actually depends on are still initialized, avoiding missing-export issues.

### **Equation lemmas no longer depend on caller options** (64942e1)
Generated equation lemma statements are now computed in a way that's independent of the options active at the point where equations are first requested. This fixes a parallel-elaboration nondeterminism that could make the same file succeed or fail depending on thread count or on earlier local `set_option`s.

### **Fix postponed-compile edge cases in compiler metadata and docs** (0bb12a8)
This fixes a `leanir` panic when re-seeding imported extension state, makes `isDeclMeta` consult local state as well as imported module entries, and ensures `[inherit_doc]` from a private declaration copies the resolved docstring for public targets. Together, these close several correctness gaps exposed by enabling `compiler.postponeCompile` on core.

### **Import loading avoids allocating empty IR entry arrays** (c00732e)
`finalizeImport` now only sizes `importedEntries` for extensions that actually have IR data, instead of allocating per-module arrays for every persistent extension. That trims import-time overhead and avoids pointless empty arrays on the hot path.

### Other misc changes
- Release script updates (1 commit)
- Stage0 refresh (1 commit)
