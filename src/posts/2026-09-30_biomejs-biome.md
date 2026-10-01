---
date: 2026-09-30
repo: biomejs/biome
size: L
title: "Biome hardens linting and HTML formatting"
excerpt: "Fixes a lint autofix bug, a type-inference stack overflow, and an HTML whitespace regression, plus docs and CI polish."
commits: 6
authors: [dyc3, ematipico, ff1451]
commit_authors: {"f5af193": dyc3, "0c4757e": dyc3, "c73fb91": dyc3, "5e14509": ematipico, "48cdbb8": ff1451}
---

### **Fix noUselessReturn autofix for unbraced bodies** (48cdbb8)
The `noUselessReturn` rule now avoids unsafe fixes when `return;` is the direct body of an unbraced `if`, `else`, or label, which previously could produce invalid code. It also preserves comments around removed returns more carefully.

### **Prevent type-aware lint stack overflows in import cycles** (5e14509)
Type-aware lint rules such as `noMisusedPromises` and `noFloatingPromises` no longer overflow the stack when mutually importing generic types reference each other in their type parameters. This closes a correctness and stability bug in the type inference path for cyclical module graphs.

### **Keep spaces when HTML formatter joins inline elements** (c73fb91)
The HTML formatter now preserves the space that a newline represents when it joins text with an inline element on the next line. This fixes formatting that could silently change rendered text spacing.

### Other misc changes
- CI issue template/message clarity update for the needs-repro bot (f5af193)
- Release chore removed published changesets (0b4c11f)
- Documentation lint/checker updates and markup typo fix (0c4757e)
