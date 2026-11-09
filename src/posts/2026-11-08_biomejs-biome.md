---
date: 2026-11-08
repo: biomejs/biome
size: L
title: "React lint expands, fixes land for loops and Grit"
excerpt: "A new React state-mutation rule ships, useWhile now catches infinite for-loops, and GritQL matching handles trailing separators."
commits: 3
authors: [dyc3, jelly, arendjr]
commit_authors: {"7f971ed": dyc3, "90e7cbc": jelly, "81d0187": arendjr}
---

### **New React rule catches direct state mutation** (90e7cbc)
Biome adds `noReactDirectStateMutation` in the nursery, targeting direct mutation of React component state. The rule is wired into config, diagnostics, the React rule selectors, and ESLint migration support, so it can be enabled and auto-migrated from several existing rule names.

### **useWhile now reports `for (;;)` and fixes it to `while (true)`** (7f971ed)
The `useWhile` lint now detects infinite `for` loops with no condition and rewrites them to `while (true)`. The fixer was also tightened to preserve loop trivia correctly, and the rule is now marked as inspired rather than a direct ESLint equivalent.

### **GritQL patterns now match trailing list separators** (81d0187)
Grit matching was updated so patterns like `` `a, b` `` can match lists with a trailing comma or semicolon, such as `function(a, b,)`. This removes a subtle mismatch between selector syntax and real-world code formatting.

### Other misc changes
- Added changelog entries for the three user-facing fixes.
- Updated tests and snapshots for the new lint rule and the `useWhile` behavior.
- Small migration/config plumbing updates to expose the new React rule.
- Minor supporting changes in React component helpers and rule option generation.
