---
date: 2026-05-12
repo: biomejs/biome
size: L
title: "Biomes sharpen lints and parser support"
excerpt: "New destructuring options, SCSS interpolated selector support, React Native rule fixes, and a Markdown tab-handling bugfix landed."
commits: 6
authors: [MeGaNeKoS, denbezrukov, dyc3, ematipico, jfmcdowell, siketyan]
commit_authors: {"e71f584": MeGaNeKoS, "24b3947": denbezrukov, "42190a1": jfmcdowell, "b30208c": siketyan}
---

### **useDestructuring now matches ESLint's configurable contexts** (e71f584)
`useDestructuring` gained separate `variableDeclarator` and `assignmentExpression` options, each defaulting to `{array: true, object: true}`. The rule also improves its assignment diagnostic so object destructuring suggestions tell users to wrap the assignment in parentheses.

### **CSS parser and lints now handle SCSS interpolated pseudo selectors** (24b3947)
The CSS analyzer was updated to recognize SCSS interpolated pseudo-class/pseudo-element forms instead of flagging them as unknown before interpolation is resolved. Supporting formatter and factory changes landed alongside new SCSS selector formatting paths, so the parser/linter can safely accept these selectors end to end.

### **Markdown block parsing fixes tab-indented containers** (42190a1)
The Markdown parser now tracks column positions more accurately around block containers, fixing cases where tabs changed how blockquotes, lists, and fenced code were nested. That closes a class of correctness bugs in both parsing and HTML output for tab-indented content.

### **React Native rule source mapping was corrected** (b30208c)
Biome now points `noReactNativeDeepImports` at the proper upstream React Native plugin source, and the migration logic recognizes the `@react-native/no-deep-imports` rule name. This fixes ESLint migration for users coming from the modern React Native plugin, while preserving the older Intellicode-backed source for other rules.

### Other misc changes
- Renovate and dependency-management config updates (2 commits)
- pnpm and CI workflow updates
