---
date: 2026-05-09
repo: microsoft/typescript-go
size: M
title: "JSDoc host alignment and crash fix"
excerpt: "Tightened JSDoc attachment and function-like host detection, plus a regression test for shorthand property assignment crashes."
commits: 1
authors: [ahejlsberg]
commit_authors: {"092b34f": ahejlsberg}
---

### **Align JSDoc host lookup and parser reparsing** (092b34f)
The repo now uses more consistent rules for finding the JSDoc attachment host and the function-like node used during reparse. This reduces mismatches between `@param` diagnostics and parser behavior, especially around variable declarations, expression statements, and `satisfies` expressions.

### **Prevent a shorthand property assignment crash** (092b34f)
The commit also adds a regression test for `shorthandPropertyAssignmentNoCrash`, indicating a real parser/checker crash was fixed. The new baselines show the compiler can now process the case without blowing up, which makes this a meaningful bug fix.

### Other misc changes
- Internal JSDoc and parser refactors to simplify host selection logic
- Test baseline additions for the regression case
