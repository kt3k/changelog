---
date: 2026-09-18
repo: leanprover/lean4
size: L
title: "Lean4 adds throws clauses and speeds recursion"
excerpt: "Major docstring, contract, and Lake changes landed, alongside a recursive-elaboration performance fix and several API renames."
commits: 13
authors: [sgraf812, david-christiansen, tydeu, hargoniX, leodemoura]
commit_authors: {"b318ba5": leodemoura, "1ae7988": sgraf812, "224f501": sgraf812, "70b4b72": sgraf812, "2165a36": david-christiansen, "92c86ba": david-christiansen, "44e28ae": tydeu, "1fae956": david-christiansen}
---

### **Recursive app annotations no longer retain the input string** (b318ba5)
Lean now detaches source info before storing syntax on recursive applications, preventing `share common exprs` from repeatedly hashing the whole input file. This fixes a quadratic slowdown when elaborating files with many recursive definitions.

### **`def` contracts can now specify exception postconditions** (1ae7988)
`def` contract syntax grows `throws e => R` clauses after `ensures`, and the generated spec theorem now includes exception postconditions in its weakest-precondition statement. This makes intrinsic verification expressive enough to state what happens when code throws, including state carried through a throw.

### **Lean/WP APIs were renamed for consistency** (224f501, 70b4b72)
The weakest-precondition stack gets a broad naming cleanup: `EPred` becomes `EPosts`, `WP.wpTrans` becomes `WP.trans`, and the `wp_consequence`/`wp_econs` family is renamed to `wp_monotone` variants. The old names are kept as deprecated aliases, so this is source-compatible for now but clearly heads toward a new API surface.

### **Lake splits `leanir` into a separate build job** (44e28ae)
`leanir` codegen is now built as its own Lake job/target, with `elabArts` and `irArts` replacing the older combined `leanArts` flow. That should make postponed compilation and module codegen more explicit, while preserving compatibility through delegation from old entry points.

### **Verso docstrings got a parser overhaul and bootstrapping cleanup** (1fae956, 92c86ba, 2165a36)
The docstring parser was rewritten to preserve accurate concrete syntax, which unblocks formatting and improves diagnostics; the bootstrap follow-up then migrates the compiler to the new representation and removes temporary compatibility helpers. The day also includes deletion of now-obsolete docstring bootstrapping code after the stage0 update.

### Other misc changes
- Recursive-annotation and docstring-related stage0 updates
- LLVM upgraded to 23.1.1
- Windows `moduleCodegen` test fix
- CI sanitizer test exclusions expanded
- Minor builtin docstring indentation handling tweak
