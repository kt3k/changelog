---
date: 2026-06-18
repo: microsoft/typescript-go
size: M
title: "Declaration emit fixes for nested CJS and methods"
excerpt: "Two declaration-emit fixes landed: nested CommonJS export assignments are allowed again, and this-assigned methods now dedupe correctly."
commits: 2
authors: [weswigham]
commit_authors: {"e578159": weswigham, "3af952d": weswigham}
---

### **Re-allow nested CJS export assignments in declaration emit** (e578159)
Declaration emit now recognizes assignment and comma expressions as outer expressions, letting it correctly skip through nested CommonJS export assignment patterns instead of dropping them. The binder/checker/transformer changes and updated baselines indicate this fixes a regression in declaration generation for expando-style and nested export forms.

### **Deduplicate this-assigned methods in declaration emit** (3af952d)
Declaration emit now treats `this` property assignments by a richer key that includes name, static/private state, and fallback node identity, preventing duplicate synthesized declarations for methods assigned on `this`. The checker also adjusts symbol flag handling so replaceable-by-method members are merged and re-flattened more safely.

### Other misc changes
- Native preview enum updates for new outer-expression kinds
- Declaration-emit test baseline refreshes and new regression cases
