---
date: 2026-05-28
repo: leanprover/lean4
size: M
title: "Lean gains smarter lints and mvcgen projection support"
excerpt: "mvcgen' now handles typeclass method projections, lints were promoted into Lean.Linter, and parser/error polish landed too."
commits: 9
authors: [Kha, wkrozowski, david-christiansen, sgraf812, Garmelon, hargoniX]
commit_authors: {"3757160": sgraf812, "bd92658": Kha, "feb408a": Garmelon, "cc503a5": wkrozowski, "4e59cdf": wkrozowski, "f6d1212": Kha, "6de1d62": hargoniX, "c47a0c7": david-christiansen, "7f406ea": david-christiansen}
---

### **mvcgen' can now reduce typeclass-method projections** (3757160)
`mvcgen'` can now decompose programs headed by a typeclass method projection like `Add.add inst a b` by reducing through the kernel projection to the instance body. That broadens VC generation coverage for code using typeclass-backed operations and makes those proofs solvable without manual workarounds.

### **`checkUnivs` becomes a first-class linter** (cc503a5)
The universe-parameter checker was moved into `Lean.Linter`, with its own implementation and builtin option. This makes it available through the standard linter machinery and tightens the repo’s linting surface for suspicious `max u v` universe usage.

### **`defLemma` is renamed to `defProp` and promoted into `Lean.Linter`** (4e59cdf)
The old def/lemma checker is now a `Lean.Linter` linter under the clearer name `defProp`, with updated messaging and a new helper exposed for reuse. The change is mostly structural, but it improves lint organization and makes the warning easier to interpret.

### **BitVec `grind` annotations are trimmed for fewer false instantiations** (6de1d62)
Several `BitVec` lemmas were re-annotated and supplemented so `grind` doesn’t eagerly bridge between `getMsbD` and `getLsbD` theory everywhere. This should cut useless e-matching churn while preserving the lemmas needed for proofs.

### **Parser now flags escaped identifiers after decimal points** (c47a0c7)
The decimal-literal error path now catches escaped identifiers like `31.«succ»` after a bare dot, not just normal identifier starts. This improves the quality and consistency of an existing parse error.

### Other misc changes
- AI contribution policy added to `CONTRIBUTING.md` (f6d1212)
- Commit-message line-wrapping guidance added to Claude instructions (bd92658)
- Error-message typo fix for unknown Verso docstring extensions (7f406ea)
- Development cycle version bump prep for v4.32.0 (feb408a)
