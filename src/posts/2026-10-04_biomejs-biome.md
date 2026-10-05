---
date: 2026-10-04
repo: biomejs/biome
size: L
title: "CSS supports parsing and new lint rules"
excerpt: "Biome added two nursery lint rules, expanded CSS `@supports` parsing/formatting, and improved `useButtonType` and docs."
commits: 6
authors: [dyc3, denbezrukov, ff1451, ematipico]
commit_authors: {"9bd4104": dyc3, "74af6b1": denbezrukov, "f9977d9": ff1451, "d87ecd3": dyc3, "21fb018": dyc3}
---

### **CSS now supports dynamic `@supports` heads** (74af6b1)
Biome added parser, syntax, and formatter support for SCSS/CSS `@supports` heads that use dynamic feature declarations. This unlocks previously invalid cases and updates the generated syntax nodes and tests so the new forms round-trip correctly.

### **New nursery rule: `noProcessExit`** (d87ecd3)
This lint rule flags `process.exit()` usage, including ESLint migration mappings and config/schema wiring so it can be enabled like other Biome rules. It helps catch abrupt process termination that can hide cleanup bugs or make libraries harder to integrate.

### **New nursery rule: `noSvelteInspect`** (21fb018)
Biome added a Svelte-specific nursery rule that reports leftover `$inspect` debugging uses. The rule is wired through configuration, diagnostics, and ESLint migration support so it behaves like the rest of the linter.

### **`useButtonType` docs were expanded and clarified** (9bd4104)
The `useButtonType` rule documentation now explains the HTML default button behavior, framework pitfalls, and which `type` values are valid. The examples were also improved to show real form-submission cases and valid reset/submit buttons.

### **`noUselessReturn` now documents a TypeScript caveat** (f9977d9)
The rule docs now warn that removing a trailing `return;` can conflict with TypeScript's `noImplicitReturns`/`checkJs` behavior. That gives users a clearer path to either suppress the warning or disable the fix when the return is intentional.

### Other misc changes
- Moved AI-agent skill files from `.claude/` to `.agents/` and updated repo guidance
- Updated Biome's ESLint migration mappings for the new rules
