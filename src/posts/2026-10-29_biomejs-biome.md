---
date: 2026-10-29
repo: biomejs/biome
size: L
title: "Big linting push: panic handling, YAML, new rules"
excerpt: "Biome adds panic diagnostics, YAML config parsing, new lint rules, and broader rule-doc generation support."
commits: 7
authors: [ematipico, xgbtxy, nhedger, Th3S4mur41, dyc3]
commit_authors: {"162ed76": xgbtxy, "2ebd7b6": ematipico, "658b439": ematipico, "c16b978": ematipico, "5127af1": Th3S4mur41, "2a16d59": dyc3}
---

### **Analyzer panics now surface as diagnostics** (2ebd7b6)
Biome now catches rule panics and reports them as internal diagnostics with the active rule, rule category, source range, and a suggested workaround to disable the rule. This should make analyzer crashes much easier to triage in the CLI and service layer.

### **Biome can now deserialize YAML config** (658b439)
The deserialization layer was extended to support YAML, with corresponding updates across configuration handling and migration code. That broad plumbing change means Biome can accept and inspect YAML-based configuration inputs instead of being JSON-only in these paths.

### **New Vue rule enforces consistent `defineEmits` declarations** (2a16d59)
A new nursery lint rule, `useVueConsistentDefineEmitsDeclaration`, was added for Vue `<script setup lang="ts">` code. It enforces a single declaration style for `defineEmits`, with options to require typed events or array-style declarations.

### **`useLogicalProperties` now catches more CSS shorthand cases** (5127af1)
The CSS lint rule was expanded to report multi-value physical shorthands and logical longhand pairs that can be merged, including dynamic shorthand cases that still warrant a diagnostic. That widens coverage for real-world CSS cleanup and makes the fixer more useful on mixed logical/physical declarations.

### **`useMathMinMax` skips nonnumeric reductions more accurately** (162ed76)
The JS analyzer now recognizes more cases where `reduce()` callbacks operate on nonnumeric values, including direct literals, `Date` values, and certain local constant arrays. This reduces false positives when the code is clearly not a `Math.min`/`Math.max` candidate.

### **Rule docs generation now uses Biome’s own parser** (c16b978)
Rule documentation generation was refactored to parse docs with Biome’s markdown/rule-doc machinery instead of ad hoc pulldown-cmark handling. This is a substantial internal cleanup that also broadens the workflow triggers needed to keep docs generation correct.

### Other misc changes
- Dependency bump for `libz-sys` to address RUSTSEC-2026-0418.
