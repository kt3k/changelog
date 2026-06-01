---
date: 2026-05-30
repo: microsoft/typescript-go
size: M
title: "JSDoc typing and grammar fixes land"
excerpt: "Restored JSDoc namespace handling and fixed `@template` modifier checks for `in`/`out` in templates."
commits: 2
---

### **Restore JSDoc namespace declarations** (804eb7a)
This updates the parser, AST, and emit pipeline so `@typedef`/`@callback` names can represent nested JSDoc names again instead of being flattened or dropped. It also restores generated output for JSDoc namespace declarations, which should improve `.d.ts` translation for these patterns.

### **Fix `@template` grammar checks for `in`/`out` modifiers** (73868c8)
Grammar validation now treats `in` and `out` modifiers in `@template` tags more accurately, removing spurious errors in JSDoc template declarations. The baseline update shows the checker no longer reports invalid-modifier diagnostics for the affected cases, so common variance annotations in JSDoc work as intended.

### Other misc changes
- Generated API/AST code updates to match the JSDoc node model
- Baseline/test adjustments for JSDoc template and namespace behavior
- Minor changelog and internal script cleanups
