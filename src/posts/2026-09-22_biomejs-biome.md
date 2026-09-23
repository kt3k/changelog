---
date: 2026-09-22
repo: biomejs/biome
size: L
title: "Biome deepens type lowering and fixes lints"
excerpt: "A busy day of codegen/type-inference expansion plus two important lint correctness fixes."
commits: 11
authors: [dyc3, mikehasa]
commit_authors: {"3926011": dyc3, "f74eb30": dyc3, "515e931": dyc3, "28c817d": mikehasa, "84d1b3b": dyc3, "5a53b2c": dyc3, "6e4c17d": dyc3, "172026b": dyc3, "5a9440e": dyc3, "7235fd7": dyc3}
---

### **Type lowering now handles indexed access types** (f74eb30)
Biome's codegen can now lower `T[K]`-style indexed access types into generated global type data. This expands the type model used by downstream analysis and unlocks more precise representation of declaration shapes.

### **Type lowering now understands `keyof` in generic operands** (515e931)
The code generator gained support for lowering `keyof` type operators as part of generic/type operands. That lets the lowered global type graph preserve more of the source declaration structure instead of collapsing it away.

### **`noOctalEscape` no longer changes string values when auto-fixing** (28c817d)
The fix for legacy octal escapes now respects the shorter escape length when the leading digit is `4`-`7`, avoiding accidental value corruption. This is a correctness bugfix in a fixer that could silently rewrite a string to a different value.

### **`Array.from` declarations now lower correctly for exhaustiveness analysis** (84d1b3b)
Codegen was extended to lower `Array.from`-related declarations, with corresponding type-info and module-graph updates. This improves exhaustiveness checking for values produced through mapping overloads, including imported arrays.

### **RegExp declarations are lowered with nullable `exec()` results preserved** (5a53b2c)
Biome now models `RegExp` declarations more accurately, including the nullable `RegExpExecArray | null` return from `exec()`. That fixes false positives from `noUnnecessaryConditions` and preserves valid optional chaining on regex capture access.

### **Predefined types can be resolved with generic arguments** (6e4c17d)
The codegen lowerer now resolves predefined types even when they carry generic arguments. This is a broader type-system capability that helps preserve richer declaration information during lowering.

### **Builtin constructors and `Iterable` are now represented in global types** (172026b)
The generated global type data now includes builtin constructors plus `Iterable`, and the module graph gained matching inference support. This is a sizable type-model expansion that should improve how built-in JS shapes are understood across analysis.

### **Readonly types and const generics are now inferred** (3926011)
Biome extended its type inference and formatting to support readonly types and const generic parameters. This is a substantial type-system improvement that affects both inferred output and how generic signatures are represented.

### **Generic construct signatures are now lowered** (5a9440e)
The code generator now preserves generic constructor signatures instead of dropping their type parameters. That improves fidelity for classes and constructor-like declarations with generic constraints.

### **Function types and overloaded call signatures are now lowered** (7235fd7)
Lowering was expanded from methods to function types and overloaded call signatures, with shared handling for signature-local type parameters. This is a major codegen refactor that broadens the set of declaration syntax Biome can faithfully represent.

### Other misc changes
- Dependency/docs/test cleanup and fixture updates across codegen and lint specs
- Minor internal refactors and snapshot churn around declaration lowering
- Test-only cleanup of obsolete codegen cases
