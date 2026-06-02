---
date: 2026-05-18
repo: biomejs/biome
size: M
title: "SCSS interpolation spacing and CLI transport shift"
excerpt: "A CSS formatter fix and a CLI pending-request refactor headline a day otherwise dominated by dependency and debug-build cleanup."
commits: 9
authors: [dyc3, denbezrukov, ematipico]
commit_authors: {"cb40ee0": dyc3, "bbcb3f5": denbezrukov, "ddcb445": ematipico}
---

### **Preserve SCSS identifier interpolation spacing** (bbcb3f5)
The CSS formatter now preserves source gaps inside selector and property-name interpolations, so inputs like `.icon-#{ $name}` and `#{$name }` keep their spacing instead of being normalized away. This is a behavior fix for SCSS formatting that better matches existing source intent and reduces surprising churn.

### **Replace dashmap in CLI pending request tracking** (ddcb445)
The CLI transport layer swaps out `dashmap` for `papaya::HashMap` and wraps each pending sender in a `Mutex<Option<_>>` to coordinate removal and delivery more explicitly. That’s a meaningful internal refactor around request bookkeeping and shutdown behavior, and it removes `dashmap` from the project’s direct dependency set.

### **Tighten HTML formatter debug-only helpers** (cb40ee0)
Unused-code warnings in release builds were cleaned up by gating HTML child display/debug helpers behind `cfg(debug_assertions)`. This keeps the formatter internals leaner in release builds without changing formatting behavior.

### Other misc changes
- Dependency bumps: pnpm, `@types/node`, `tombi`.
- Rust crate bumps: `dashmap`, `filetime`, `bpaf`.
