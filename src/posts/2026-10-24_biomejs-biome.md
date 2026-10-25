---
date: 2026-10-24
repo: biomejs/biome
size: L
title: "Biome adds several new lint rules"
excerpt: "Major lint expansion across JS, Vue, and Svelte, plus a few formatter and analyzer improvements."
commits: 14
authors: [dyc3, JamBalaya56562, vidigoat]
commit_authors: {"5699601": vidigoat, "92c9e81": dyc3, "8c836eb": dyc3, "343c8ca": JamBalaya56562, "707f832": dyc3, "efd16bd": dyc3, "7bd38b7": dyc3, "807e616": dyc3, "407604d": dyc3, "f748ec0": dyc3, "f26d2a4": dyc3, "ab2eb9e": dyc3, "bf1a55a": dyc3}
---

### **New nursery rules for null usage and loop conditions** (92c9e81, efd16bd)
Biome added two new nursery lint rules: `noNull`, which discourages `null` in favor of `undefined` while allowing strict null checks, and `useWhileLoopCondition`, which rewrites loop patterns like `while (true) { if (...) break; }` into a clearer condition on the loop itself. Both rules ship with autofix support, config/schema wiring, diagnostics links, and ESLint migration mappings.

### **More new nursery rules for array sorting, IIFEs, Vue, and Svelte** (807e616, ab2eb9e, bf1a55a, 407604d, 7bd38b7, f748ec0)
The day also adds `noArraySortForMinMax`, `useBlockStatementOverIife`, `useVueComponentIs`, `useVueVOnExact`, `noSvelteInternal`, and `noVueWatchAfterAwait`. These expand Biome’s coverage for performance, readability, and framework-specific correctness issues, with fixes and rule metadata added throughout the CLI, configuration, diagnostics, and test suites.

### **Analyzer group rule-count limit removed** (707f832)
The analyzer no longer enforces a rule-count cap on analyzer groups, and the codegen path was updated accordingly. This is an internal refactor, but it removes an artificial limit that could constrain future rule growth.

### **Markdown formatter preserves blank lines in more cases** (8c836eb)
Formatting now keeps the newline between a block quote and a following list, and also addresses similar spacing around tables. This is a user-visible formatting fix for Markdown output.

### **Prettier migration preserves bracket spacing in overrides** (343c8ca)
The Prettier migration now carries `bracketSpacing` through overrides, so generated Biome config better matches the source Prettier settings. That makes migration output more faithful and reduces manual cleanup.

### **JS formatter fixes import-call parenthesization** (5699601)
The JS/TS formatter now wraps a new callee containing an `import()` call in parentheses. This avoids generating invalid or misleading code in nested expression cases.

### **Performance tweak in Rowan parent traversal** (f26d2a4)
`grand_parent()` was refactored to avoid allocating a red node for the parent, improving a low-level tree traversal hot path. It’s a focused performance improvement in the syntax layer.

### Other misc changes
- Release/changeset maintenance (1 commit)
- Cargo.lock / dependency tweak in HTML analyzer (1 commit)
