---
date: 2026-04-28
repo: microsoft/typescript-go
size: M
title: "Type hints and quick info get sharper"
excerpt: "Several fixes improve widened assignments, hover/type display, and restart reliability, with one broader checker refactor restored."
commits: 6
authors: [ekazakov14, jakebailey]
commit_authors: {"2a3f6d2": ekazakov14, "de302e0": jakebailey}
---

### **Fix widened assignment declarations before reporting them** (85f9b3c)
The checker now widens the final type after collecting assignment-declaration candidates, rather than widening only one branch of the union logic. This corrects cases like `this` property assignments where the inferred result was too narrow.

### **Show generic type paths correctly in hover/quick info** (3499951)
Type-node serialization and printing now handle property access expressions such as `f<T>.C`, which appear in pseudo-types for generic type paths. That makes hover text for instantiated members much more accurate and avoids broken or incomplete quick info.

### **Improve hover output for missing generic parameters** (245ae95)
When the language service can’t resolve instantiated type-argument nodes, it now falls back to the type parameter declarations instead of dropping them. The printer was also adjusted so these parameters render in quick info, fixing missing generic details in class and interface hovers.

### **Recover from extension restart shutdown timeouts** (2a3f6d2)
The VS Code extension now falls back to a full client start if `restart()` fails during shutdown. That makes language-server restarts more resilient instead of failing outright on timeout-related shutdown issues.

### **Restore lost checker and auto-import PRs** (de302e0)
This brings back several previously lost fixes, including new `ObjectFlags.FromTypeNode` tracking and related checker/relater changes. It also revives auto-import and nested-type test coverage, so the restored behavior is exercised again.

### **Restore mapped-type indexing diagnostics** (14a12d0)
The checker’s `maybeMappedType` logic was corrected and now uses stricter assignability checks, which changes the emitted diagnostic for type-literal index misuse. The updated error now includes the mapped-type suggestion where appropriate.

### Other misc changes
- Fourslash skip list cleanup and test unskips
- Baseline updates for quick info and compiler submodule tests
