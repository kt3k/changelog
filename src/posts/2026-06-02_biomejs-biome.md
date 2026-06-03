---
date: 2026-06-02
repo: biomejs/biome
size: L
title: "CSS, Svelte, YAML and Tailwind land"
excerpt: "Parser, formatter, and lint fixes plus a new Svelte rule; YAML formatting and Tailwind variants also expanded."
commits: 12
authors: [Mokto, siketyan, tim-we, dyc3, jiwon79, denbezrukov, Conaclos]
commit_authors: {"99bc7df": Mokto, "935c59a": dyc3, "c656679": Mokto, "a1b5834": Mokto, "44c22e9": jiwon79, "d150071": siketyan, "46d4ee6": siketyan, "1da3c75": denbezrukov, "e8e1e6a": Conaclos, "39ae9d5": siketyan}
---

### **Fix CSS selector lists inside `:global()`/`:local()` (99bc7df)**
Biome’s CSS parser now accepts comma-separated selector lists in CSS Modules/Svelte-style pseudo-class functions like `:global(.foo, .bar)`. This closes a real parsing gap that previously turned valid selectors into bogus pseudo-classes.

### **Truncate overly long diagnostics (935c59a)**
Diagnostic rendering now trims extremely long lines and spans with ellipses so error output stays readable instead of sprawling across the terminal. This is a user-facing quality-of-life fix for pathological inputs.

### **Add `useSvelteRequireEachKey` nursery rule (c656679)**
Biome adds a new Svelte lint rule that flags `{#each}` blocks missing keys, bringing coverage for a common correctness/performance footgun in Svelte apps. The change also wires the rule into config, migration, docs metadata, and the backend schema.

### **Parse destructuring rename bindings in Svelte `each` blocks (a1b5834)**
The Svelte parser and formatter now support rename bindings like `{#each items as { id, component: Filter }}`. This fixes a syntax case that was previously rejected and required broad syntax/formatter/codegen updates.

### **Parse Tailwind variant expressions (44c22e9)**
Tailwind parsing now understands variant expressions, expanding support for more of the framework’s class syntax. The lexer and syntax tree were updated alongside a large batch of parser snapshots, indicating a substantial grammar expansion.

### **Implement YAML file handling (39ae9d5)**
Biome adds a YAML file handler in the service layer, making YAML part of the core file-processing pipeline. This is the plumbing needed for YAML support to be discovered and routed correctly.

### **Preserve CSS declaration comment boundaries (1da3c75)**
CSS and SCSS formatting now keeps spacing around comments that sit between a declaration name and `:` or after `!important`. That avoids reformats that can visually merge comments into syntax in a way that changes readability.

### **Fix `useImportType` separated-type behavior (e8e1e6a)**
`useImportType` now handles the `separatedType` style correctly when a default import is present and all named imports are types. The fix also tightens the code that extracts combined specifiers into a new import statement.

### **Initial YAML formatter support for simple block mappings (46d4ee6)**
Biome’s YAML formatter gets an initial pass at formatting simple block mappings instead of treating them purely verbatim. This is an important step toward real YAML pretty-printing, and the commit also updates comment handling and defaults around YAML formatting.

### **Initial YAML formatter support for block sequences (d150071)**
Block sequences are now formatted explicitly, along with supporting work in scalars and flow nodes. Together with the mapping work, this substantially broadens the formatter’s YAML coverage.

### Other misc changes
- Dependency/workflow bump: GitHub Actions major update (1 commit)
