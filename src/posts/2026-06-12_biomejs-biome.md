---
date: 2026-06-12
repo: biomejs/biome
size: L
title: "Biome adds React lint rule and CSS/parser work"
excerpt: "New React function-component rule, SCSS `supports()` interpolation parsing, CSS formatter fixes, and a formatter perf boost."
commits: 8
authors: [denbezrukov, ematipico, dfedoryshchev, citadelgrad]
commit_authors: {"c1dfb43": ematipico, "76671f3": dfedoryshchev, "e06eaad": ematipico, "995c1ff": citadelgrad, "2be0264": denbezrukov, "174b21b": denbezrukov, "c8cf440": denbezrukov}
---

### **New React rule enforces function component definitions** (995c1ff)
Biome adds the nursery `useReactFunctionComponentDefinition` lint rule for React components, with config and migration support wired through the CLI and rule registry. This gives teams a new way to standardize component declarations and keep React codebases consistent.

### **SCSS `@supports` interpolation is now parsed and formatted** (c8cf440)
The CSS parser gained support for interpolated SCSS conditions inside `@supports`, along with new syntax nodes, factories, formatter hooks, and test coverage. This expands Biome’s SCSS support for real-world stylesheets that generate conditions dynamically.

### **Formatter now preserves CSS grid row alignment around comments** (174b21b)
Biome fixes `grid-template-areas` formatting when comments appear before multiline values, avoiding an extra indent at the declaration boundary. This keeps grid rows aligned as expected and prevents churn in formatted CSS/SCSS.

### **Formatter performance improved in some cases** (2be0264)
A formatter refactor landed with a noted speedup of up to ~20% on some files. The change also updates the internal source-position handling used across formatter backends, which should reduce overhead in formatting pipelines.

### **Added `biome_languages` crate and shifted source-file types** (c1dfb43)
The repo introduces a new `biome_languages` crate and moves several file-source imports in the CLI and tests to it. This looks like an internal consolidation step toward shared language/file abstractions across Biome’s tooling.

### **Other misc changes**
- Release housekeeping removed accumulated changeset files (c0b9832)
- TOML CI now uses the installed tombi from the toolchain (e06eaad)
- Fixed a duplicated word in CLI test comments (76671f3)
