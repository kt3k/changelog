---
date: 2026-06-22
repo: leanprover/lean4
size: L
title: "VCGen rename, perf work, and compiler fix"
excerpt: "Lean4 renamed `mvcgen'` to `vcgen`, sped up VC/spec matching, and fixed codegen visibility handling for private constructors."
commits: 12
authors: [sgraf812, Kha, datokrat, volodeyka]
commit_authors: {"2d9e8d8": sgraf812, "07a2c35": sgraf812, "0591aed": Kha, "9bc3b69": sgraf812, "38b4c63": sgraf812, "428d4ea": Kha, "237b854": datokrat, "2e72131": volodeyka, "6e6a59b": sgraf812}
---

### **Rename experimental `mvcgen'` to `vcgen` (9bc3b69)**
The experimental Sym-based tactic was renamed across the surface syntax, parser/elaborator names, docs, diagnostics, and benchmarks. This is a user-visible API rename for the proof automation entrypoint, though the original `mvcgen` tactic remains unchanged.

### **Speed up VC/spec matching by internalizing patterns (38b4c63)**
Spec lookup now internalizes matched patterns into the `SymM` share table on first use and threads the updated database back, so later matches can reuse pointer-equal instances instead of re-internalizing them. This should reduce repeated matching overhead in `vcgen`, especially when many specs are tried.

### **Fix codegen visibility for private constructors and private field types (428d4ea)**
The compiler now treats private constructors more carefully when deciding trivial-structure optimizations, returning `none` when the result would not be stable across modules. Related changes make codegen mark bodies transparent only when needed and adjust tests to cover public types whose fields mention privately imported types.

### **Incremental `leanir` compilation now tracks `.ir.sig` separately (0591aed)**
Lean’s incremental module loading gained a separate `.ir.sig` path so `leanir` can rebuild less often, and the compiler/environment plumbing was updated to carry that extra artifact through. This is a meaningful build-system/compiler change that should improve rebuild avoidance for IR consumers.

### **Hoare-triple notation now takes a single exceptional postcondition (2d9e8d8)**
The `⦃ … ⦄` notation was changed so the exceptional postcondition is a single `EPred` slot instead of a semicolon-separated list wrapped in `epost⟨…⟩`. That makes the notation more flexible, since it can now accept an `epost` variable or any exceptional postcondition directly.

### **Internalize matched spec patterns once during lookup (6e6a59b)**
Backward-rule patterns are now cached in the matching table in internalized form, avoiding repeated work when unifying instance arguments against goals. This is another performance improvement for `vcgen`’s matching pipeline.

### **Improve the `mvcgen' with <tac>` error path (2e72131)**
The frontend now uses a dedicated syntax category for the discharging tactic clause, so confusing parse errors like “expected grind” are avoided. This is mostly a usability fix, but it makes a common failure mode much clearer.

### **Other misc changes**
- Calibrated `vcgen` benchmark input sizes to target ~1–2s runs (07a2c35)
- Updated stage0 artifacts and flags in several follow-up commits (79bd437, 6bfd50c, 48ea259)
- Added extra tracing to the PR release workflow (237b854)
