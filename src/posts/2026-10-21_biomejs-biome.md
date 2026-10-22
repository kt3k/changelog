---
date: 2026-10-21
repo: biomejs/biome
size: L
title: "Biome lands a wave of new lint rules"
excerpt: "A big day of new nursery rules across JS, CSS, React Native, Vue, and TanStack Query, plus Vue semantic-model plumbing and a formatter fix."
commits: 29
authors: [dyc3, ematipico, vidigoat]
---

### **Major lint expansion across JS and CSS**
Biome added a large batch of new nursery rules, including `useMathTrunc`, `useMathAbs`, `useIteratorZip`, `noPathConcat`, `noDanglingUnderscore`, `noEagerArrayMethodsInLoops`, and more. These tighten correctness and performance guidance across JavaScript and CSS, and several of them come with new migration mappings from ESLint/Stylelint to help users adopt Biome faster.

### **Framework-aware linting grows for Vue, React Native, and TanStack Query**
The repo now has dedicated rules for Vue emit declarations, Vue typed refs, React Native platform colors, and TanStack Query rest destructuring. That work is paired with a new `tanstackQuery` domain and broader framework metadata, which makes the linter smarter about library-specific patterns instead of treating them as generic JS.

### **Vue semantic model lands and powers Vue rule refactors**
Biome introduced a new Vue semantic model and wired HTML analysis into it, with follow-up changes in Vue lint rules to use semantic symbols instead of older declaration queries. This is a notable internal foundation shift that should make Vue analysis more precise and easier to extend going forward.

### **Formatter fix preserves parens for instantiation expressions**
The JS formatter now keeps parentheses around looser operands of instantiation expressions when needed. This is a targeted correctness fix that prevents Biome from emitting code with altered meaning in TypeScript-heavy codebases.

### Other misc changes
- Docs updated to point agents at newer optimized APIs.
- Release/changelog maintenance and package version bumps.
- Dependency/security housekeeping, including a TLS advisory lockfile bump.
