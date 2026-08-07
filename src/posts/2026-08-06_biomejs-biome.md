---
date: 2026-08-06
repo: biomejs/biome
size: L
title: "Markdown linter lands; parser and CSS grow"
excerpt: "Major new markdown linting, a Markdown parser refactor, and several meaningful fixes across CSS, JS, Vue, and Grit."
commits: 9
authors: [dyc3, ematipico, vznh, Austin1serb, saberoueslati, denbezrukov, Turtle-Hwan]
commit_authors: {"ea9dd8a": dyc3, "c4a07bf": ematipico, "6be7be1": vznh, "481d008": Austin1serb, "4d603b0": saberoueslati, "51997e6": ematipico, "554e6e8": denbezrukov, "d5f5704": Turtle-Hwan, "52b44d6": dyc3}
---

### **Markdown linting support added** (51997e6)
Biome now ships a dedicated Markdown analyzer, including configuration plumbing, CLI/SARIF integration, and a first nursery rule: `useConsistentHeaderLevel`. This is a notable expansion of lint coverage into Markdown and makes the new language support usable end-to-end.

### **Markdown parser moved to a two-phase parse** (c4a07bf)
Markdown parsing was refactored to separate block parsing from inline resolution, so link references can be resolved after the full document is known. That’s a substantial internal change that should make the parser more correct around reference links and nested inline content, with accompanying invariant and formatter tests.

### **SCSS partial combinator selectors are now supported** (554e6e8)
The CSS parser, factory, formatter, semantic layer, and analyzer were updated to understand SCSS partial combinator selectors. This adds support for a real SCSS syntax feature and changes diagnostic behavior accordingly, which should unblock parsing/formatting of selectors like `.partial > {}`.

### **`noImportCycles` skips `node_modules` for better performance** (ea9dd8a)
The import-cycle lint now reuses a shared `node_modules` path check and explicitly excludes dependency trees from SCC work. That trims unnecessary graph work on large projects and improves performance without changing the rule’s core purpose.

### **`noUselessUndefined` respects explicit return types** (6be7be1)
The rule now avoids flagging `return undefined` when the enclosing function’s return type is explicitly something other than `undefined` or `void`. This fixes an annoying false positive in typed code and makes the lint smarter about intent.

### **`useAwait` recognizes `await using`** (d5f5704)
`useAwait` now treats `await using` as an async operation, so async functions using resource-disposal syntax are no longer incorrectly flagged. That keeps the rule aligned with newer JavaScript semantics.

### **Vue template globals are scoped correctly** (4d603b0)
`noUndeclaredVariables` was adjusted so Vue template globals like `$slots`, `$attrs`, and `$event` are handled in the right contexts. This removes false positives in templates while still reporting those names inside `<script setup>` where they’re actually undeclared.

### **Svelte legacy `{@const}` gets a new nursery rule** (52b44d6)
Biome added `noSvelteLegacyConst`, a new HTML/Svelte lint rule that discourages legacy `{@const}` tags in favor of declaration tags with `$derived()`. This adds another framework-specific correctness/style check and extends config/schema support for it.

### **Grit WASM snippets now use byte offsets** (481d008)
Grit pattern parsing in the JS API was fixed to use byte offsets for WASM snippets. That should eliminate offset mismatches when snippets include non-ASCII text and makes embedded pattern handling more reliable.

### Other misc changes
- Dependency and workspace updates for the new Markdown analyzer and related rule plumbing
- New/updated tests across CSS, JS, Markdown, Vue, Svelte, and Grit
- Minor configuration/schema and generated-code refreshes
