---
date: 2026-05-27
repo: leanprover/lean4
size: L
title: "Lean hardens linting, VCGen, and runtime safety"
excerpt: "Public lint imports, linter tagging, a mvcgen kernel fix, and a build-time ban on HWASAN/MTE make up the day’s notable work."
commits: 7
authors: [wkrozowski, sgraf812, david-christiansen, eric-wieser]
commit_authors: {"c462e43": david-christiansen, "bf38e59": wkrozowski, "64268f4": wkrozowski, "a0d0777": wkrozowski, "2a2800e": sgraf812, "0aef989": sgraf812, "976439a": eric-wieser}
---

### **Built-in linting now sees public module-system imports** (bf38e59)
`lake lint --builtin-lint` now peeks at a module’s `.olean` header and imports module-system targets at the public/exported level when appropriate, instead of always using private imports. That makes environment linters evaluate the same public surface downstream users see, while preserving the old behavior for non-module targets.

### **Text linter diagnostics are grouped by source module** (64268f4)
`lake lint --builtin-lint` now prints saved text-linter output under separate `-- Text linter diagnostics in <module>:` headers for each contributing submodule. This makes multi-module lint output easier to attribute and matches the grouping already used for environment linters.

### **Persistent lint logs now record only real linter warnings** (a0d0777)
Lean now tags warnings emitted by `logLint` so `recordLints` can distinguish linter-produced messages from other tagged diagnostics like named errors or unknown-identifier messages. This fixes over-recording in the persistent lint log without changing the visible shape of linter warnings.

### **`mvcgen'` rebuilds goals after user pre-tactics** (2a2800e)
The `.tactic` pre-tactic path in VC generation now wraps returned metavariables in fresh `Grind.Goal`s instead of reusing the old parent goal state. That prevents kernel rejections when tactics like `clear` rewrite the local context but later VCGen steps still reference eliminated free variables.

### **Lean now refuses HWASAN/MTE builds** (976439a)
Lean adds an explicit compile-time check that rejects 64-bit builds under HWASAN or ARM MTE, where its pointer-packing runtime tricks would truncate tagged pointer bits. This turns a hard-to-debug segfault class into an immediate build failure.

### Other misc changes
- Docstring polish for `<|` and `|>` operators (c462e43)
- Minor VCGen simplification in backward-rule construction (0aef989)
