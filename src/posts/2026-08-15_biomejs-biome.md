---
date: 2026-08-15
repo: biomejs/biome
size: L
title: "Tailwind sorting and HTML formatting sharpen up"
excerpt: "New Tailwind rules and parser support landed, plus HTML whitespace preservation and several analyzer bug fixes."
commits: 8
authors: [johncarmack1984, Jayllyz, dyc3, ematipico, santichausis]
commit_authors: {"6cd3263": johncarmack1984, "b51d8b1": Jayllyz, "b63987a": ematipico, "ba8aa18": dyc3, "6771cf5": dyc3, "674f5f4": Jayllyz, "3e8c488": santichausis}
---

### **Tailwind class sorting now handles bare modifiers and variant ties** (6cd3263)
Biome’s Tailwind sorter was expanded to understand modifiers on bare utilities like `@container/sidebar` and `shadow/50`, and to order variant ties the same way Tailwind does. This closes sorting gaps for newer Tailwind syntax and reduces false reordering in real class lists.

### **New `useTailwindShorthandClasses` lint rule** (ba8aa18)
A new nursery rule suggests shorter Tailwind utility shorthands, such as replacing `w-4 h-4` with `size-4`. The change also wires the rule into configuration, migration support, and HTML analysis so it can report across relevant file types.

### **HTML formatter preserves meaningful blank lines** (6771cf5)
The HTML formatter now keeps user-authored blank lines and better distinguishes between a single newline and a real empty line in child content. That makes formatted HTML/Svelte/Vue output less lossy when comments or spacing are intentional.

### **`noComponentHookFactories` avoids false positives on non-functions** (674f5f4)
This rule now only flags `use*` variables when the binding is actually assigned a function, instead of reporting any `use`-prefixed value. It fixes noisy diagnostics for cases like boolean or store values while still catching hook-like factories.

### **Embedded script exports are recognized across Svelte/Vue blocks** (3e8c488)
Biome now treats exported declarations in one embedded script block as visible bindings to sibling blocks, fixing undeclared-variable and unused-variable reports in Svelte and Vue. This aligns analysis with how those frameworks share top-level script scope.

### **Promise inference skips problematic return-argument lookups** (b63987a)
Type inference for promise classification got more conservative around returned calls, generic type parameters, and `instanceof` cases. That should prevent incorrect promise/non-promise classification in trickier generic code paths.

### **`noUnnecessaryConditions` regression coverage added** (b51d8b1)
Added a test fixture for issue #10704 to lock in behavior for a previously problematic conditional-analysis case. No rule logic changed in this commit.

### Other misc changes
- Tailwind parser support expanded for combinator selectors, variant modifiers, and arbitrary container-query sizes; included supporting factory/parser updates and new snapshots.
- Bench harnesses and fixtures added for Tailwind class sorting.
- Small internal API/plumbing updates in analyzer, embeds, and migration code.
