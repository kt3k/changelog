---
date: 2026-06-03
repo: biomejs/biome
size: L
title: "Biome adds a new linter rule and parser fixes"
excerpt: "New `useIncludes` lint, RDJSON now reports real fix text, and HTML/Svelte parsing gets two correctness fixes."
commits: 4
authors: [Mokto, Dotify71, mangod12, dyc3]
commit_authors: {"96ef9a4": Mokto, "0f29b83": Dotify71, "c394fae": mangod12, "c3f07f7": dyc3}
---

### **New `useIncludes` lint rule for clearer membership checks** (0f29b83)
Biome adds a nursery rule that flags `indexOf(...) !== -1`-style comparisons and suggests `includes()` or `!includes()` instead. It also wires the rule into config/schema generation and ESLint migration so it can be enabled and discovered like other built-in rules.

### **RDJSON reporter now emits replacement text for fix suggestions** (c394fae)
The RDJSON reporter was sending the human-readable fix description instead of the actual code replacement text. This fixes structured reporter output so downstream tools get the real suggested edit, not just a summary.

### **Svelte `{#each}` parsing now accepts TypeScript `as const`** (96ef9a4)
Biome’s HTML/Svelte parser now distinguishes a TypeScript `as const` assertion inside the iterable expression from the Svelte binding `as`. That prevents valid `{#each}` expressions from being rejected and makes Svelte parsing more compatible with TypeScript syntax.

### **HTML parser stops rejecting literal `\u` attribute text** (c3f07f7)
Quoted HTML attribute values no longer treat raw `\u` sequences as invalid escape handling. This removes an unnecessary parser restriction and lets literal backslash-u text pass through normally.

### Other misc changes
- RDJSON snapshot/test updates and diagnostics serialization tweaks
- HTML parser lexer cleanup related to string-literal handling
- Linter config/schema generation updates for the new rule
