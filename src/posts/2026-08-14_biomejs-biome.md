---
date: 2026-08-14
repo: biomejs/biome
size: L
title: "Tailwind support expands; markdown parser refactored"
excerpt: "Tailwind container-query variants landed in CSS/JS tooling, alongside a markdown inline-HTML fix and a big salsa DB refactor."
commits: 8
authors: [ematipico, johncarmack1984, zkasuran, yanthomasdev, kkkhs]
commit_authors: {"76059e9": johncarmack1984, "7ffb677": ematipico, "9b98211": johncarmack1984, "17dafba": ematipico, "3634fee": ematipico, "c87c46a": zkasuran, "9f8b97e": yanthomasdev, "715e0cd": kkkhs}
---

### **Tailwind parser and sorter now handle container-query/child variants** (76059e9)
Biome can now parse Tailwind container-query variants like `@sm:`/`@max-lg:` and child/descendant variants like `*:` and `**:`. The class sorter was updated to order these new variant forms correctly, which improves Tailwind v4 ergonomics and avoids mis-sorting supported class strings.

### **CSS `@variant` accepts Tailwind container-query names** (9b98211)
The CSS lexer now treats `@xl`, `@max-xl`, and similar Tailwind container-query names as a single identifier inside `@variant`, rather than splitting off the `@`. That fixes false parse errors and spurious `noUnknownAtRules` diagnostics for valid Tailwind CSS.

### **Projects were moved into the salsa DB** (17dafba)
This refactor relocates project storage into the salsa-backed service database and renames the embed-handling crate to `biome_embeds`. It’s a broad internal architecture change that touches service, LSP, module graph, and analyzer plumbing, with the main payoff being cleaner ownership and tighter integration around embedded-language handling.

### **Markdown inline HTML no longer becomes an inline node** (3634fee)
Inline HTML comments are now represented as a token rather than an inline item list node, which required parser, syntax, and formatter updates. This corrects markdown parsing/formatting behavior across many edge cases and substantially changes how inline HTML is modeled.

### **`noSvgWithoutTitle` now permits boolean `aria-hidden`** (c87c46a)
The accessibility rule now recognizes JSX shorthand `aria-hidden` as equivalent to `aria-hidden={true}`, so hidden SVGs no longer need a title. This removes a false positive and aligns the rule with how React boolean attributes behave.

### **`noMisusedPromises` performance regression fixed** (7ffb677)
This change restores performance for `noMisusedPromises` and `noFloatingPromises` when deep imported type paths are involved. It also adds testing and benchmark coverage around query execution counts and the affected promise-classification paths.

### **`useExpect` now recognizes Vitest `expect.element()`** (715e0cd)
The linter now treats Vitest Browser Mode’s `expect.element()` as a real assertion, preventing `useExpect` from flagging it incorrectly. That broadens framework support for test code without changing rule intent.

### **CLI help/docs wording was refreshed** (9f8b97e)
Command help text was rewritten to better describe `--staged`, `--changed`, `--profile-rules`, stdin path handling, and default path behavior. This is documentation-only and doesn’t alter runtime behavior.

### Other misc changes
- Dependency/package metadata updates from the `biome_workspace_db` → `biome_embeds` rename.
- Added or updated snapshots/tests for Tailwind, markdown, accessibility, and promise-analysis changes.
