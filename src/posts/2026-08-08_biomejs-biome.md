---
date: 2026-08-08
repo: biomejs/biome
size: M
title: "CSS property validation lands"
excerpt: "Biome adds a new CSS nursery lint for invalid @property initial values and fixes parsing so registered custom properties validate correctly."
commits: 1
authors: [ematipico]
commit_authors: {"23c0369": ematipico}
---

### **New nursery lint for invalid @property initial values** (23c0369)
Biome now reports `@property` declarations whose `initial-value` does not match the declared `syntax` descriptor. That closes a real CSS correctness gap for registered custom properties and should catch authoring mistakes earlier.

### **Fix CSS parsing for registered custom properties** (23c0369)
The parser/semantic pipeline was updated so `@property` rules validate their `syntax` descriptor correctly. This is important because the new lint depends on accurate parsing, and it also fixes incorrect handling of registered custom properties in CSS analysis.

### Other misc changes
- Added config plumbing for the new `noInvalidPropertyInitValue` rule
- Updated generated linter option checks and rule-name enums
- Refactored CSS analyzer internals and snapshots to support the new rule
- Minor Cargo/workspace dependency cleanup
