---
date: 2026-06-26
repo: leanprover/lean4
size: M
title: "Lean tunes grind, adds doc parsing and order tools"
excerpt: "Multiple grind performance tweaks land alongside a Verso docstring fix, new complete-lattice notation, and a C FFI flag export."
commits: 9
authors: [hargoniX, david-christiansen, Kha, sgraf812, tydeu]
commit_authors: {"5f7c1de": david-christiansen, "9d518d9": david-christiansen, "578dd48": sgraf812, "c500da3": tydeu}
---

### **New `⨆`/`⨅` notation and complete-lattice instances** (578dd48)
Lean now supports Mathlib-style indexed supremum/infimum notation with multiple binders, and `Std.Internal.Do` gains algebraic instances for complete lattices. This makes the `Std.Internal.Do` verification framework easier to express over order-theoretic code and exposes more structure to generic `Std` typeclasses.

### **`lean_set_initializing` exported for C/Python FFI users** (c500da3)
Lean exports a new `lean_set_initializing` symbol to toggle the importing flag from C code. This is meant for embedders that need to emulate repeated `withImporting` behavior, such as Python FFI initialization under a mutex.

### **Verso docstrings now preserve escaped line-start content** (5f7c1de)
The docstring parser now skips only actual spaces at line start, instead of treating escaped content as whitespace. That fixes block-opening parsing for cases like escaped brackets or bullets at the start of a line and updates the parser tests accordingly.

### **Parser only propagates `doc.verso` options** (9d518d9)
Parser option propagation is now restricted to options whose names start with `doc.verso`. This avoids unrelated `set_option ... in` state from affecting parsing, improving parser performance and reducing unnecessary context churn.

### Other misc changes
- Multiple `grind`/e-matching performance tweaks for `List`, `Array`, `Vector`, and `eraseIdx`.
- `addEMatchAttr` avoids an unnecessary wait by using async constant info.
- Stage0 was updated.
