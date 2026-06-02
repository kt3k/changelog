---
date: 2026-05-07
repo: biomejs/biome
size: L
title: "YAML parsing and formatter fixes land"
excerpt: "YAML support expands with property parsing and formatter wiring, while CSS, markdown, and formatter edge cases get notable fixes and a few perf wins."
commits: 8
authors: [ematipico, dyc3, denbezrukov, siketyan, l0ngvh]
commit_authors: {"feb4301": denbezrukov, "d7ab318": siketyan, "4d43fdf": ematipico, "e7b18f7": ematipico, "ba3480e": dyc3, "df96a57": l0ngvh}
---

### **YAML parser learns properties in mappings and flows** (df96a57)
The YAML parser now recognizes property nodes in both block and flow positions, including previously tricky empty-key/property combinations. This closes parsing gaps across mappings, sequences, and error recovery, with a substantial new test matrix to lock in the behavior.

### **SCSS URL and interpolation handling gets stricter support** (feb4301)
Biome’s CSS parser/formatter now handles SCSS expressions inside `url()` values and improves interpolation formatting around concatenation cases. That matters for real-world SCSS code that previously snapped incorrectly or failed to round-trip cleanly.

### **Formatter indentation no longer leaks past align blocks** (4d43fdf)
The core printer now flushes pending indentation when `EndAlign` closes, preventing stale alignment state from affecting subsequent text. This fixes a subtle but user-visible formatting bug, especially in nested or line-broken aligned output.

### **New `useTestHooksInOrder` lint rule for test lifecycle hooks** (ba3480e)
A new nursery rule enforces the execution order of Jest/Vitest test hooks, helping teams keep setup and teardown declarations consistent and easier to reason about. The change also wires the rule into config schemas and ESLint migration paths so it can be adopted more smoothly.

### **Linter queries are narrowed for better performance** (e7b18f7)
Several JS and CSS lint rules now query less broadly, reducing unnecessary evaluation work during analysis. The result is a targeted performance improvement across a wide set of rules without changing their user-facing behavior.

### **YAML formatter is wired into Prettier-style test coverage** (d7ab318)
The YAML formatter is added to service wiring and populated with a broad set of Prettier fixtures and harness support. This is mostly enablement and test infrastructure, but it meaningfully expands YAML formatting coverage.

### Other misc changes
- Markdown formatter no longer leaves trailing spaces in lists.
- Reverted the mimalloc crate bump.
