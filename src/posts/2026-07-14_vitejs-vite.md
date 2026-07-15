---
date: 2026-07-14
repo: vitejs/vite
size: M
title: "SSR switch scopes and resolver edge fixed"
excerpt: "Vite fixes SSR scoping around switch cases and tightens browser:false resolution behavior, with a CSS manifest regression test added."
commits: 4
authors: [Dunqing, sapphi-red, shulaoda, dogledogle]
commit_authors: {"b59a73f": Dunqing, "4bfe8bb": sapphi-red, "378ace2": shulaoda, "b5f5247": dogledogle}
---

### **Fix SSR scope handling for switch-case declarations** (b59a73f)
Vite now treats `switch` discriminants and case blocks with the correct scoping rules during SSR transforms, so declarations inside a case no longer leak into the surrounding function scope. This fixes incorrect import shadowing behavior for `let`, `function`, and `class` declarations inside `switch` cases.

### **Preserve `browser: false` modules as undefined on property access** (4bfe8bb)
A resolve/playground regression test now covers the case where a `browser: false` mapped module is imported and a property is read from it. The change ensures the module behaves like production expectations instead of throwing when accessed.

### **Other misc changes**
- Added a CSS code-splitting regression test for stale manifest entries after asset deduplication (378ace2)
- Docs typo fix in the features guide (b5f5247)
