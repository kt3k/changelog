---
date: 2026-09-05
repo: biomejs/biome
size: L
title: "Biome adds a new lint rule and two speedups"
excerpt: "New XOR-vs-exponentiation linting lands alongside formatter and inference optimizations, plus Svelte HTML formatting fixes."
commits: 5
authors: [dyc3, ematipico, denbezrukov]
commit_authors: {"62e1fc5": dyc3, "00dbd3a": ematipico, "45a19bb": denbezrukov, "a2f8ff7": dyc3}
---

### **New nursery lint catches `^` used like exponentiation** (a2f8ff7)
Biome adds `noXorAsExponentiation`, a new nursery rule that warns when decimal integer literals use bitwise XOR where `**` was likely intended. The change also wires the rule into ESLint migration, config/schema generation, diagnostics categories, and adds full valid/invalid test coverage.

### **HTML formatter preserves adjacent Svelte expressions** (62e1fc5)
The HTML formatter no longer inserts whitespace between back-to-back Svelte expressions when line breaking would otherwise split them. This fixes a real formatting regression for compact expression chains in Svelte templates.

### **Reduce unnecessary type inference work for namespace imports** (00dbd3a)
Type inference now avoids some eager declaration resolution and treats `default` as unavailable from blanket re-exports, which prevents extra work and fixes incorrect exposure of default exports. That matters for type-aware lint rules and libraries with heavy namespace usage, such as Zod.

### **Specialize first/last token traversal in `rowan`** (45a19bb)
`SyntaxNode::first_token` and `last_token` were rewritten around a dedicated edge-token traversal instead of broader descendant walks. This should speed up token-edge lookups and also tightens correctness around tokenless subtrees and zero-length tokens.

### **Other misc changes**
- YAML formatter performance work (1 commit)
- Formatter internals and test updates related to comment/skipped-trivia handling
- Minor rule/config plumbing for the new lint
