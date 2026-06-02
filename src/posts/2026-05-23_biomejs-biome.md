---
date: 2026-05-23
repo: biomejs/biome
size: M
title: "SCSS map formatting gets smarter"
excerpt: "Biome’s CSS formatter refined SCSS map pair layout, fixing comment alignment and control-variable maps in nested expressions."
commits: 2
authors: [denbezrukov]
commit_authors: {"1621e86": denbezrukov, "458e8b2": denbezrukov}
---

### **SCSS formatter handles commented and control-variable map pairs better** (458e8b2)
Biome now formats SCSS map pairs more consistently when values are nested or commented, keeping grouped layouts intact instead of forcing awkward line breaks. It also adds special handling for control-variable maps inside `@if`, `@for`, `@each`, and `@while`, fixing cases where nested map expressions were previously misformatted.

### **SCSS map pair layout avoids breaking control-variable cases** (1621e86)
A follow-up fix narrows the formatter’s “keep together” behavior so control-variable maps don’t get grouped like ordinary scalar pairs. This addresses a nested SCSS map bug in conditional/loop contexts and improves correctness for formatter output on real-world Sass code.

### Other misc changes
- Updated SCSS formatter snapshots and regression tests for map pair layout/comment cases.
- Added coverage for nested map expressions in `@if`, `@for`, `@each`, and `@while` blocks.
