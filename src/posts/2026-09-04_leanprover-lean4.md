---
date: 2026-09-04
repo: leanprover/lean4
size: M
title: "Parser, linter, and elaboration get sharper"
excerpt: "Lean4 adds new parser/linter helpers, a missing `Decidable` instance, and a performance-oriented `Core.Context` refactor."
commits: 8
authors: [Garmelon, mhuisi, marcusrossel, Kha]
commit_authors: {"9de8600": mhuisi, "3dfca7a": marcusrossel, "d54b02f": mhuisi, "caeb31a": Kha, "a7a7089": Garmelon, "1f2b22b": Garmelon, "dc3f80b": Garmelon}
---

### **New linter source attribution helpers** (67526ae)
`Lean.Linter.Util` now exposes `findMatchingDecl?`, `findCodeQualitySource?`, and `findCodeQualitySource` so linters can map syntax back to the declaration it belongs to. This improves code-quality diagnostics by letting them attribute issues to the right declaration instead of falling back blindly to the module.

### **Core elaboration context gets a cold subobject** (caeb31a)
More rarely-updated `Core.Context` fields were moved into `Context.Cold`, reducing reference-count traffic on hot elaboration paths like recursion-depth updates and `withRef`. The PR reports a measurable speedup in elaboration-heavy workloads, so this is a meaningful runtime optimization.

### **Missing `Decidable` for `bif` expressions** (3dfca7a)
Lean now has a `Decidable (bif c then t else e)` instance, analogous to the existing `if`/`ite` support. This fills a gap in the core API and makes conditional propositions work more smoothly in elaboration and proof automation.

### **Parser registers previously missing builtin node kinds** (9de8600)
Three builtin node kinds — `fieldIdxKind`, `hexnumKind`, and `interpolatedStrKind` — are now registered in `Parser.Extension`. This closes a parser infrastructure gap for syntax nodes that were already part of the language machinery.

### Other misc changes
- Parser layout tweak for `macro`/`elab` bodies to avoid extra `withPosition` constraints (d54b02f)
- Test harness now measures userspace-only perf counters and supports `--allow-failure` (1f2b22b)
- Downstream adaptation workflow label handling fixes and force-label support (dc3f80b, a7a7089)
