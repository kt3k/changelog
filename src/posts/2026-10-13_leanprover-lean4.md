---
date: 2026-10-13
repo: leanprover/lean4
size: L
title: "Strings, grind, and lake shake expand"
excerpt: "UTF-8 string semantics and lossy decoding improved, `grind` got a distrib option, and `lake shake` can enforce downstream imports."
commits: 10
authors: [TwoFX, Kha, leodemoura]
commit_authors: {"1d110a8": TwoFX, "97c029d": TwoFX, "a0777ef": TwoFX, "0841b0f": Kha, "b7725c3": leodemoura}
---

### **Proper UTF-8 string comparison and a lossy decoder** (97c029d, a0777ef, 1d110a8)
Lean now compares `String`s by the lexicographic order of their UTF-8 encodings, aligning the logical order with runtime behavior. The same area also adds `String.fromUTF8Lossy` for well-defined recovery from invalid UTF-8, and fixes a long-standing `String.toByteArray`/`String.toUTF8` memory leak.

### **`lake shake` can now inject downstream imports** (0841b0f)
Two new options, `--add-downstream` and `--add-public-downstream`, let `lake shake` enforce that a chosen module is imported throughout the checked dependency closure when possible. This is useful for project-wide tooling modules like linters or code actions that need to be in effect everywhere.

### **`grind` gets a distributivity switch** (b7725c3)
The `grind` arithmetic normalizer now has a `distrib` option to control whether products and powers are expanded or kept atomic. That matters for preserving useful nonlinear facts during linear reasoning, and it changes a core normalization path rather than just a tactic hint.

### **Other misc changes**
- Reverted the earlier change to stop exporting realizations triggered only from proofs, restoring prior export behavior until downstream is updated.
- Exported lemmas from `Init.Data.Int.DivMod.Pow`.
- Added missing simprocs for bitwise ops on `UIntX`/`IntX`.
- Updated stage0.
- Trimmed the `ctor_many_fields` compile test.
- Minor internal refactors and cleanup around string/array orderings and attribute/export plumbing.
