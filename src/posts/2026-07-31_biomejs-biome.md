---
date: 2026-07-31
repo: biomejs/biome
size: M
title: "CLI docs polish and linter fixes"
excerpt: "Biome clarified CLI help/reporting docs and fixed `noUnnecessaryConditions` regressions around optional chains and overload selection."
commits: 2
authors: [yanthomasdev, ematipico]
commit_authors: {"2fa0a62": yanthomasdev, "8c2c6bd": ematipico}
---

### **`noUnnecessaryConditions` stops misreporting optional-chain cases and overloads** (8c2c6bd)
Biome fixed a regression where the rule could flag optional chains/nullish coalescing even when the receiver could actually be nullish, and it now matches TypeScript’s overload selection more closely for callback-style calls. This should reduce false positives in real-world type-heavy code.

### **CLI help and reporter docs were reworked** (2fa0a62)
The CLI’s option descriptions, reporter help text, and snapshot output were cleaned up and clarified, including better wording for colors, diagnostics limits, and reporter destinations. The changes are mostly documentation-facing, but they improve discoverability and make the command-line UX easier to understand.

### Other misc changes
- Dependency/changelog updates for the above fixes
- Test snapshot refreshes for CLI help and JSON reporter output
