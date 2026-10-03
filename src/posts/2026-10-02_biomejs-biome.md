---
date: 2026-10-02
repo: biomejs/biome
size: L
title: "Biome adds 3 new lint rules"
excerpt: "Three new JS/Vue lint rules landed, plus fixes for CSS duplicate fonts, React 19 transition events, and Svelte snippet formatting."
commits: 7
authors: [dyc3, GreedyC, ternaus, yanthomasdev]
commit_authors: {"dd96b11": GreedyC, "241b861": dyc3, "dba2a37": ternaus, "6e2ee70": dyc3, "1a6fb41": dyc3, "8cfb219": yanthomasdev}
---

### **New JS rule: `useBigintLiterals`** (241b861)
Biome now flags `BigInt()` calls with literal arguments and suggests bigint literals like `1n` or `0xFFn` instead. This is a new nursery rule with autofix support and migration/configuration updates, so it expands lint coverage in a meaningful way.

### **New JS rule: `noZeroFractions`** (241b861)
This rule disallows redundant numeric forms such as `1.0` and `1.`, simplifying them to shorter equivalents. It also ships with migration wiring and rule/schema registration, making it broadly usable in existing configs.

### **New Vue rule: `noVueBooleanDefault`** (1a6fb41)
Biome added a Vue-specific nursery rule that forbids default values for Boolean props, since Vue already treats missing Boolean props as `false`. The same change also updates Vue prop detection so rules like `noVueReservedProps` can see props declared inside `withDefaults()`.

### **`noUnknownAttribute` now accepts React 19 transition events** (dba2a37)
The JSX attribute checker now recognizes `onTransitionCancel`, `onTransitionRun`, `onTransitionStart`, and their capture variants when the React dependency range allows React 19 or later. That removes false positives for newer React apps without weakening the rule for older projects.

### **`noDuplicateFontNames` exempts `monospace, monospace`** (dd96b11)
The CSS linter now allows the specific `font-family: monospace, monospace` pattern because it preserves the inherited font size in browsers. This is a targeted bug fix that prevents a legitimate font stack from being flagged as a duplicate.

### **Svelte snippet formatting is less noisy** (6e2ee70)
The formatter now keeps `{#snippet}` parameters on one line when they fit, instead of forcing unnecessary line breaks. This improves readability for small snippets while still wrapping long parameter lists appropriately.

### Other misc changes
- Documentation/configuration rework for the linter/assist settings (8cfb219)
- Dependency/migration/schema updates for the new rules
- Minor test and snapshot additions across CSS, JS, Vue, and HTML formatters
