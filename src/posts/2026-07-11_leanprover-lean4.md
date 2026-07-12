---
date: 2026-07-11
repo: leanprover/lean4
size: L
title: "Lake gets safer init; Lean gets faster inference"
excerpt: "Lake fixes exe-template file generation and adds new dependency facets, while Lean trims costly instance checking and inlines unsafe terms better."
commits: 7
authors: [tydeu, hargoniX, Kha, leodemoura]
commit_authors: {"12c859a": tydeu, "49a89d6": tydeu, "164a94b": tydeu, "630f130": hargoniX, "2aaf675": leodemoura}
---

### **Lake init no longer emits library files for exe templates** (12c859a)
`lake new` and `lake init` now avoid generating library files when using the `exe` template, and they also stop overwriting library files for existing packages in the related edge case. The init test coverage was tightened to verify the exact file layout per template, closing a regression introduced in v4.10.

### **Lake adds presetup and dependency-trace facets** (49a89d6)
Lake now exposes `presetup`, `depTrace`, and `depHash` facets to give finer-grained views of a module’s dependency state. The `setup` facet also now includes transitive import artifacts in `setup.json`, fixing missing data for `lake lean` users and separating pre-setup dependency computation from the existing setup step.

### **Lean adds `getLakeSharedDynlib` to the Lake API** (164a94b)
A small convenience API now returns the shared Lake dynamic library path from the detected installation. This makes it easier for tooling to locate the runtime artifact without re-deriving it from install metadata.

### **Unsafe terms are now forced inline more reliably** (630f130)
Lean marks generated unsafe helper declarations as `alwaysInline`, fixing cases where `unsafe t` would be split into an auxiliary declaration that failed to inline. That reduces overhead and preserves the intended low-level code shape during compilation.

### **`applyAbstractResult?` skips redundant checks more often** (2aaf675)
Instance synthesis now tries to avoid a costly `check` when the result and all reachable free-variable types/values are already free of metavariables. This keeps universe-constraint propagation when needed, but cuts unnecessary work in the common safe case.

### Other misc changes
- Stage0 updated
- Internal import tweak in `Std.Data.DHashMap.Internal.RawLemmas` (1 commit)
