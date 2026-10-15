---
date: 2026-10-14
repo: biomejs/biome
size: L
title: "Biome ships new rules, GraphQL polish, and perf wins"
excerpt: "New Svelte and GraphQL capabilities landed, diagnostics got clearer, and several hot paths were sped up."
commits: 15
authors: [dyc3, denbezrukov, Netail, ematipico, maroKanatani]
commit_authors: {"cb88f07": dyc3, "9a44363": dyc3, "0e59d67": denbezrukov, "2266df2": dyc3, "39d22db": dyc3, "8fa3b1a": dyc3, "774b5b5": Netail, "97c51a8": Netail, "edbe9d7": maroKanatani, "24915b5": denbezrukov, "9a0c7c2": denbezrukov}
---

### **Add `noSvelteClassDirective` for Svelte `class:` usage** (cb88f07)
Biome now lints Svelte’s `class:` directive, steering users toward `class` objects and arrays introduced in newer Svelte versions. The rule was wired into configuration, diagnostics, and editor/backend metadata, so it’s available consistently across the toolchain.

### **Speed up embedded-content and suppression handling** (9a44363, 8fa3b1a, 2266df2, 39d22db)
Several performance-focused changes landed across analysis and CLI paths: skipping embedded lookups in files that don’t contain embedded content, reading suppression comments from borrowed tokens, avoiding workspace teardown on exit, and tightening Rowan slot reads. Together, these reduce overhead in common linting and file-analysis workflows.

### **Add GraphQL definition sorting assist** (774b5b5)
Biome gained a new GraphQL assist that sorts named definitions in a document, including types, directives, fragments, and operations. It also integrates with rule/action config and ships with examples and tests, making the new refactoring available to users immediately.

### **Improve GraphQL duplicate-name diagnostics** (97c51a8)
GraphQL duplicate-name rules now produce richer diagnostics with clearer primary messages and per-duplicate detail notes. This should make it easier to locate and fix repeated names in arguments, fields, enum values, variables, and operations.

### **Support `@at-root` inside keyframes and better SCSS parity** (0e59d67)
The CSS parser/formatter/linter were updated to understand SCSS `@at-root` statements inside keyframes, with extensive parser, formatter, and rule parity coverage added. This closes a real syntax gap and improves correctness for SCSS files that use nested keyframe patterns.

### **Broaden Sass identifier support for non-ASCII characters** (24915b5)
Sass/CSS parsing and formatting now accept non-ASCII identifier characters more broadly, including in values and function-like contexts. This is a parser-level compatibility improvement that helps Biome handle more real-world SCSS/CSS code without false errors.

### **Fix React Compiler analysis for exported type declarations** (edbe9d7)
The React Compiler analysis now correctly handles files that export type, interface, and enum declarations. That avoids missing analysis on valid modules that previously tripped the compiler conversion path.

### **Preserve single-element SCSS list commas** (9a0c7c2)
The SCSS formatter was adjusted so single-element lists keep their commas when they matter for semantics and formatting parity. This prevents the formatter from rewriting valid SCSS in ways that change intent or reduce fidelity.

### Other misc changes
- Dependency bumps: rustls and tokio
- Lint diagnostics improved across multiple JS/CSS/HTML rules
- Minor GraphQL/Svelte configuration and snapshot updates
