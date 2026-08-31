---
date: 2026-08-30
repo: biomejs/biome
size: M
title: "Bug fixes and a size trim"
excerpt: "Two lint fixes improved correctness in JS and CSS, alongside a refactor aimed at shrinking binary size."
commits: 3
authors: [dyc3, ematipico, siketyan]
commit_authors: {"7ceb0ee": dyc3, "0fca643": ematipico, "44a41a6": siketyan}
---

### **noFloatingPromises now handles awaited Promise values correctly** (7ceb0ee)
`noFloatingPromises` no longer flags statement-level `await` expressions that actually consume Promise values, including overloaded calls that resolve through Promise aliases. The fix also tightens the type-inference path so arrays of Promises are still reported, while awaited Promise-bearing expressions are ignored as intended.

### **noDescendingSpecificity catches more selector ordering bugs** (0fca643)
`noDescendingSpecificity` now compares selector specificity more accurately and no longer misses lower-specificity selectors that appear after a later higher-specificity selector with the same tail. The rule also gained coverage for at-rule contexts like `@media`, so descending specificity is detected more reliably inside nested CSS blocks.

### **Refactor reduces generic instantiations to shrink binaries** (44a41a6)
This refactor pushes rule and group matching through string-based helpers and simplifies registry insertion paths to reduce the number of generic functions per rule. The goal is to cut code size without changing behavior, especially in analyzer and configuration-related code paths.

### Other misc changes
- Changeset/release note updates (2 commits)
- Expanded rule tests and snapshots for JS/CSS lint fixes
- Analyzer, CLI SARIF, configuration, and codegen plumbing updates to support the refactor
