---
date: 2026-10-11
repo: biomejs/biome
size: L
title: "Big nursery lint drop, plus a few fixes"
excerpt: "Biomes adds eight new nursery lint rules, improves ESLint/Prettier migration handling, and fixes a control-flow edge case."
commits: 16
authors: [dyc3, JamBalaya56562, latent-9]
commit_authors: {"3743a53": dyc3, "33fef85": JamBalaya56562, "e26a76b": latent-9}
---

### **Eight new nursery lint rules land across JS, Vue, HTML, and Svelte**
Biome added a wave of new lint rules, including `noUselessAssignment`, `noDoubleComparison`, `noUselessDateGetTime`, `noPromiseExecutorReturn`, `noAccidentalBitwiseOperators`, `useMatchingFunctionName`, `useNamedFunction`, and `noSvelteUselessDerivedBy`. Several also came with ESLint migration mappings and config/schema updates, which makes them immediately usable and easier to adopt.

### **`arguments.caller` / `arguments.callee` are now flagged** (3743a53)
The new `noArgumentsCallerOrCallee` nursery rule reports deprecated `arguments.caller` and `arguments.callee` usage, nudging code toward named recursion instead. This closes off a long-discouraged JavaScript pattern and adds coverage to the formatter/linter integration.

### **`for` loops with truthy literal tests are treated as infinite** (e26a76b)
Biome’s JS control-flow analysis now recognizes `for` loops whose test is a truthy literal as infinite. That fixes unreachable-code diagnostics and related checks so they no longer miss dead code after such loops.

### **Prettier migration now keeps default `semi` and `singleQuote` behavior** (33fef85)
The Prettier migration path was adjusted to use Prettier’s defaults for `semi` and `singleQuote` instead of over-specifying them. This should produce cleaner, more accurate migrated configs and fewer surprising diffs.

### Other misc changes
- Added a TanStack Query rule source.
- Updated ESLint-to-Biome migration mappings for newly added rules.
- Minor test/snapshot and generated metadata updates.
