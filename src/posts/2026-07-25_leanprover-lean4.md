---
date: 2026-07-25
repo: leanprover/lean4
size: M
title: "Lean4 adds Linux SONAME support"
excerpt: "Linux shared libraries now ship SONAMEs, with Lake loading adjusted to keep precompiled imports working; CI also tightens one cache step."
commits: 2
authors: [Vtec234, tydeu]
commit_authors: {"b4fb9a7": Vtec234, "fed67d9": tydeu}
---

### **Linux shared libraries now have SONAMEs** (b4fb9a7)
Lean now sets `DT_SONAME` for its Linux shared libraries (`libInit_shared`, `libleanshared*`, and `libLake_shared`), aligning Linux behavior with macOS `install_name` handling. This should make runtime linking for Lean/Lake artifacts more robust and fixes an existing Linux loader issue.

### **Lake precompiled-module loading was updated for Linux** (b4fb9a7)
Lake’s module dependency resolution now eagerly loads `libLake_shared.so` on Linux when plugins/dynlibs are present, because transitive runtime lookup can miss it otherwise. The commit also adds Linux platform detection/printing and updates `extern_lib` syntax docs/examples to recognize Linux explicitly.

### Other misc changes
- CI: remove `continue-on-error` from “Upload Lake Cache” so failures now fail the job (fed67d9)
