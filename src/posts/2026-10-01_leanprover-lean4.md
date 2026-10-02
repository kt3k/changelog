---
date: 2026-10-01
repo: leanprover/lean4
size: L
title: "New HTML AST, BV solver boost, order APIs"
excerpt: "Lean gained an HTML forest type, a UF-capable bv_decide CEGAR path, and several new order/automation utilities."
commits: 13
authors: [hargoniX, TwoFX, Rob23oba, Vtec234, david-christiansen, sgraf812]
commit_authors: {"001a6b6": Vtec234, "e70fdc7": hargoniX, "300eaca": hargoniX, "023b7c4": hargoniX, "481c47a": TwoFX, "13f0cbd": Rob23oba, "7050b7b": david-christiansen, "c346b48": sgraf812}
---

### **Add a first-class HTML AST and renderer** (001a6b6)
Lean now has `Lean.Data.Html`, an HTML-forest type designed for authoring documents, plus a string renderer. It brings in escaping, raw text handling, concatenation/collection helpers, and tests, making HTML generation a supported part of the core data layer.

### **Upgrade `bv_decide` with a CEGAR solver and UF support** (023b7c4)
`bv_decide` now has an incremental CEGAR/Lemmas-on-Demand pipeline that can reason about uninterpreted functions behind `bv_decide +uf`. This is a substantial tactic refactor that should make bitvector automation more capable and better integrated with reflection and proof production.

### **Make `Decidable` for `And`/`Or` short-circuit again** (e70fdc7)
The `Decidable` instances for conjunction and disjunction are back to `@[macro_inline]`, restoring proper short-circuiting in all situations. That fixes a real performance regression and closes the reported issue.

### **Add `ByteArray` order instances and lexicographic comparison support** (481c47a)
`ByteArray` now has efficient `LT`, `LE`, and `Ord` instances derived from its underlying data, plus the supporting order plumbing needed across the stdlib and runtime. This unblocks more generic ordered-container code and improves reuse of byte arrays in comparison-heavy paths.

### **Expose `Expr.hasAnyMVar` / `Expr.containsMVar`** (13f0cbd)
Lean’s `Expr` API now includes metavariable checks parallel to the existing free-variable helpers. This is a small but useful public API addition for metaprograms that inspect expressions.

### **Restore compiler support for mutually recursive `macro_inline`/`csimp`** (300eaca)
The LCNF lowering pipeline was reworked so `macro_inline` and `csimp` can recurse through each other again, instead of relying on the earlier one-pass inlining flow. That’s an important compiler/codegen fix for definitions that mix these attributes.

### **Expand `grind` lattice automation** (c346b48)
Std’s order automation now registers many lattice/`Prop`/predicate-transformer lemmas with `simp` and `grind norm`, improving `grind`’s ability to normalize goals involving complete lattices and separation logic. This should make `vcgen ... with finish` and related workflows noticeably more reliable on order-heavy proofs.

### **Fix blockquote parsing error locations in Verso docs** (7050b7b)
The docstring parser no longer wraps blockquotes in an extra `atomic`, which fixes misreported errors in nested block structures. The added regression tests show the parser now stops at the right point and reports the right span.

### Other misc changes
- Added Grove order tables for sequential containers and string-related types (1 commit).
- Added missing order instances for `List`, `Array`, and `Vector` (1 commit).
- Fixed `Array.compareLex` / `Vector.compareLex` specialization behavior (1 commit).
- Updated stage0 (1 commit).
- Small order-API refactors and support lemmas (1 commit).
