---
date: 2026-07-25
repo: biomejs/biome
size: L
title: "Analyzer refactor and HTML parser fixes"
excerpt: "Biomes analyzer got faster and more accurate type inference, plus Tailwind class sorting and HTML doctype parsing improvements."
commits: 4
authors: [dyc3, johncarmack1984, ematipico]
commit_authors: {"5a36427": johncarmack1984, "15047a2": dyc3, "2c36626": ematipico}
---

### **Tailwind v4 class sorting now orders by name** (5a36427)
The `useSortedClasses` sorter was updated to compare utility names directly, including dashed statics and negative prefixes, instead of relying on registration order for ties. This makes Biome’s ordering line up more closely with Tailwind’s own class ordering and improves sorting correctness for several utility patterns.

### **HTML parser accepts mixed-case doctypes** (15047a2)
The HTML lexer now normalizes `doctype`/`html` keyword matching case-insensitively, so inputs like `<!DoCtYpE hTmL>` are recognized correctly. This fixes parsing/formatting for a real-world HTML edge case that previously failed or behaved inconsistently.

### **Type-aware JavaScript linting now resolves more inferred types, faster** (2c36626)
Biome refactored the analyzer’s inferred-type consumers to request only the type information they need, and to memoize export resolution. That improves performance across type-aware rules while also making rules like `noFloatingPromises` catch more cases, such as aliased async callbacks and arrays of promises from async mapping.

### Other misc changes
- Enabled prettier Vue snapshot coverage in HTML formatter tests (1 commit)
- Added changeset/release notes for the above fixes (3 commits)
