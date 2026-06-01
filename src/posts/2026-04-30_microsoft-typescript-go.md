---
date: 2026-04-30
repo: microsoft/typescript-go
size: M
title: "Accessor duplicate checks tightened"
excerpt: "Duplicate-declaration handling now treats properties and accessors correctly, and a JSX signature-help crash was fixed."
commits: 3
authors: [RyanCavanaugh]
commit_authors: {"c9f8677": RyanCavanaugh}
---

### **Fix property/accessor duplicate declaration checks** (25963e4)
The checker and symbol flag exclusions were updated so properties no longer collide incorrectly with accessors, and getters/setters are validated with the right merge rules. This fixes a class of duplicate-member diagnostics and aligns binder/checker behavior with the intended symbol semantics.

### **Fix signature help crash when typing `<` in JSX text** (1f20854)
Navigation token scanning now rescans ambiguous `<` tokens in JSX child text, preventing a crash during signature help on WIP JSX text. A regression test covers the trigger-character case to keep this from coming back.

### Other misc changes
- Copilot workflow: set `TS_GO_DEBUG_STACK_LIMIT` to avoid stack-overflow hangs (c9f8677)
