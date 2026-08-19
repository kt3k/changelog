---
date: 2026-08-18
repo: microsoft/typescript-go
size: L
title: "Regex gating, fixes, and emit tweaks"
excerpt: "Several parser/checker fixes landed, including ES2025 regex gating, crash/diagnostic fixes, and enum declaration emit preservation."
commits: 7
authors: [jakebailey, ahejlsberg, Andarist, dayongkr]
commit_authors: {"d67cb6e": jakebailey, "12548e2": ahejlsberg, "ad56f89": Andarist, "32125ef": dayongkr}
---

### **Gate ES2025 regex syntax behind target** (32125ef)
The scanner now errors on regex pattern modifiers and duplicate named capturing groups unless the target is ES2025 or newer. This tightens syntax gating and adds clearer diagnostics for code that uses newer regex features too early.

### **Preserve enum computed property names in declarations** (d67cb6e)
Declaration emit now keeps computed enum property names instead of flattening them away, which matters for preserving accurate public typings and symbol names. The change also updates related builder logic and adds coverage across enum and computed-name scenarios.

### **Use semantic type identity for JSDoc augments checks** (5252589)
JSDoc `@augments` validation now compares the referenced type semantically against the `extends` base type, rather than relying on alias/text matching. That reduces false mismatches when aliases or equivalent types are involved.

### **Preserve nested module resolution diagnostics in concurrent mode** (5bc7cc0)
When module declarations appear in invalid block scopes, the checker now still resolves their external module names so diagnostics don’t get lost in concurrent checking. This improves error reporting for misplaced imports/exports without changing the underlying grammar errors.

### **Fix false unreachable diagnostics in `try/finally` with `||=`** (86a326d)
The flow analyzer now avoids a bad reachability cache hit when reduce-label state is active, preventing spurious implicit-return and unreachable-code diagnostics around `finally` blocks using logical assignment. This is a targeted correctness fix for control-flow analysis.

### **Fix crash in CFA when for-loop initializer throws** (ad56f89)
Binder flow handling now bails out early if a `for` initializer makes the current flow unreachable, avoiding a cycle that could crash reachability analysis. This is a direct stability fix for throwing loop headers.

### **Improve recursion identities and `isDeeplyNestedType`** (12548e2)
The checker’s recursion-identity logic was reworked to better handle deeply nested and mapped/intersection types, and the old stack-depth overflow path was removed in favor of a unified complexity overflow diagnostic. This changes how very deep relations are detected and reported, which is significant for pathological type cases.

### Other misc changes
- Diagnostic additions for newer regex errors (2 commits)
- JSDoc/module/concurrency test baseline updates
- Small internal checker/binder/flow refactors
