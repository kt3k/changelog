---
date: 2026-08-29
repo: leanprover/lean4
size: M
title: "Lean gets faster prints and leaner memory"
excerpt: "Recursor printing and completions improve, while memory/layout and link-time fixes reduce friction and overhead."
commits: 5
authors: [kmill, Kha, TwoFX]
commit_authors: {"e5b02e9": kmill, "1584f13": kmill, "80e859f": Kha, "696e847": Kha, "482150a": TwoFX}
---

### **Improved recursor printing with rule details** (1584f13)
`#print` now shows recursor signatures and richer metadata, including parameter/motive/minor/index counts, major premise position, and explicit reduction rules. This makes recursor output much more useful for understanding generated induction principles, especially for nested inductives.

### **Fixed static linking for executables that depend on Lake** (80e859f)
Lean’s toolchain link flags now include `-lLeanExport` alongside `-lLake`, fixing downstream executable link failures caused by missing LeanExport symbols. The new regression test exercises an executable importing `Lake.All` to ensure the full static link line stays complete.

### **Split `Core.Context` to reduce reference-count churn** (696e847)
`Core.Context` now stores rarely-updated pointer-heavy fields in a `Context.Cold` subobject, so common reader updates can share one reference-count increment instead of several. That’s a targeted performance refactor that shaved instruction count and wall-clock time in benchmarks.

### **Added completions for `@[delab app.*]` attributes** (e5b02e9)
The delaborator attribute handling now recognizes `app`-prefixed kinds for completion/info generation, improving editor support for `@[delab app.foo]` patterns. It also records const info using the synthesized identifier, so the displayed completion matches the user-facing name.

### **Made mimalloc use 8-byte max alignment** (482150a)
Lean now builds mimalloc with `MI_MAX_ALIGN_SIZE=8`, reducing object size overhead and improving cache behavior. The change is intended to save memory and give a modest speedup without affecting Lean’s object layout assumptions.

### Other misc changes
- `#print` test expectations updated for recursor output.
- New Lake static-link regression test files added.
- Minor CMake/comment tweaks around link/runtime configuration.
