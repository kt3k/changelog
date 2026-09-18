---
date: 2026-09-17
repo: biomejs/biome
size: M
title: "Bug fixes and tailwind detection gains"
excerpt: "Several lint fixes landed, including Tailwind detection in class expressions and safer simplification logic, plus two analyzer performance tweaks."
commits: 5
authors: [dyc3, saberoueslati, dfedoryshchev]
commit_authors: {"a3462fe": saberoueslati, "7d1f37e": dyc3, "31bb662": dfedoryshchev}
---

### **Safer logical-expression simplification** (a3462fe)
`useSimplifiedLogicExpression` no longer drops `false`/`true` on the right-hand side unless the expression is in a pure truthiness context like an `if` condition or `!`. That avoids changing runtime results for expressions such as `x || false` outside boolean contexts.

### **Tailwind classes now detected in class expressions** (7d1f37e)
`useTailwindShorthandClasses` now recognizes Tailwind class strings inside Svelte, Vue, and Astro class attribute expressions when they aren't wrapped in a class-merging helper. This broadens coverage for embedded framework syntax so more shorthand opportunities are flagged correctly.

### **Naming convention ignores ambient namespaces** (31bb662)
`useNamingConvention` no longer reports namespaces declared inside `declare global` or external module declarations. This aligns the rule with its documented exclusions and prevents unsafe rename fixes on ambient namespaces.

### **Other misc changes**
- Optimized `noBeforeInteractiveScriptOutsideDocument` to defer filesystem path checks until after cheaper AST/semantic filtering.
- Optimized `useIndexOf` callback traversal by scanning once instead of repeatedly collecting descendant nodes.
