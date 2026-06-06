---
date: 2026-06-05
repo: biomejs/biome
size: L
title: "Biome promotes 73 rules and fixes Vue/SCSS linting"
excerpt: "Major rule promotion lands alongside Vue lint fixes and a SCSS formatter spacing overhaul."
commits: 5
authors: [dyc3, ematipico, Netail, denbezrukov]
commit_authors: {"6642895": ematipico, "a4a294c": dyc3, "72ccf3b": dyc3, "9a5855e": Netail, "03274b9": denbezrukov}
---

### **Rule promotion v2.5 brings 73 nursery rules stable** (6642895)
Biome moved 73 nursery rules into stable groups, including several renames such as `noFloatingClasses` → `noUnusedInstantiation`, `useFind` → `useArrayFind`, and `useSpread` → `useSpreadOverApply`. This reshapes rule availability and defaults across the CLI and config surface, so it’s a significant release for users upgrading lint presets or rule names.

### **Added `noRestrictedDependencies` for banned package usage** (9a5855e)
A new nursery rule now flags restricted imports and `package.json` dependency entries using e18e’s module replacement data. That gives teams a way to steer away from deprecated or suboptimal packages directly in Biome linting.

### **`useVueHyphenatedAttributes` now stays inside Vue, skips SVG** (a4a294c)
The rule was tightened so it only reports in Vue files and ignores SVG elements and descendants. This avoids false positives on real SVG markup while keeping the Vue-specific attribute style check intact.

### **`useVueConsistentVBindStyle` no longer flags argument-less `v-bind`** (72ccf3b)
Biome fixed a false positive where shorthand-style guidance was being applied to `v-bind` directives without arguments. Those directives can’t be converted to shorthand, so the rule now leaves them alone.

### **SCSS formatter now normalizes binary-expression spacing** (03274b9)
The SCSS formatter was refactored to emit more consistent `left <op> right` spacing, replacing a lot of operator-specific special handling. This changes formatting output for several SCSS cases and reduces weird source-tight edge cases.

### Other misc changes
- Rule migration support updated for `e18e/ban-dependencies`
- Configuration/generated rule tables refreshed for new and promoted rules
- Minor test and snapshot updates across HTML, CSS, CLI, and lint specs
