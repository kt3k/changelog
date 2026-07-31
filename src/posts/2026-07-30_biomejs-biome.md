---
date: 2026-07-30
repo: biomejs/biome
size: L
title: "Tailwind rule lands; CSS/YAML fixes"
excerpt: "Biome adds a new Tailwind arbitrary-value lint rule and fixes crashes plus YAML/CSS parsing edge cases."
commits: 3
authors: [denbezrukov, dyc3, THEjacob1000]
commit_authors: {"dd9158a": denbezrukov, "f399d3a": dyc3, "e007143": THEjacob1000}
---

### **New Tailwind arbitrary-value lint rule** (e007143)
Biome adds `noTailwindArbitraryValue`, a nursery rule that flags Tailwind CSS arbitrary values like `w-[400px]`. It applies across HTML/JSX class attributes, supported utility functions, and tagged templates, and also wires the rule into config, diagnostics, and ESLint migration support.

### **CSS analysis no longer crashes on incomplete property values** (dd9158a)
Biome now handles incomplete CSS declarations during editing without panicking, fixing a crash in semantic analysis for partially typed property values. This is an important stability fix for live editor workflows where code is frequently invalid mid-edit.

### **YAML formatter/parser better attaches properties across lines** (f399d3a)
The YAML parser and formatter were updated to correctly associate properties that span lines in block mappings, improving handling of anchors, tags, and comments in tricky multiline cases. This reduces formatting mismatches and parse errors on real-world YAML inputs.

### Other misc changes
- Rule metadata/migration plumbing for the new Tailwind rule
- YAML snapshot churn and test updates
- Small AST pointer behavior refactor and roundtrip test
