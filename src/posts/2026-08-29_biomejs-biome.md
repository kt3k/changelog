---
date: 2026-08-29
repo: biomejs/biome
size: L
title: "Svelte, parsing, and perf fixes land"
excerpt: "Parser, formatter, analyzer, and workspace-scanner fixes improve correctness and speed across HTML, JS, and TypeScript."
commits: 6
authors: [dyc3, santichausis, HarperZ9, jakeleventhal, ematipico]
commit_authors: {"7d54688": dyc3, "040f867": dyc3, "f2a07aa": santichausis, "ac58958": jakeleventhal, "97e76c0": ematipico}
---

### **Workspace scanner no longer re-analyzes dependencies** (97e76c0)
Biome fixed a scanner bug that could repeatedly re-run dependency analysis, causing long, unresponsive sessions. The workspace scan now uses an epoch-based path that queues writes instead of retrying traversal, which should make large projects behave much more predictably.

### **Type inference skips unused object members** (ac58958)
Call-return inference now avoids resolving irrelevant nested members for plain object arguments when they can't affect the result type. This is a targeted performance win for module graph/type inference work, and the added benchmarks/tests suggest it meaningfully trims unnecessary resolution overhead.

### **Biome now flags HTML comments inside Svelte tags** (7d54688)
The HTML parser emits a diagnostic when it encounters `<!-- ... -->` inside a tag's attribute list, instead of silently accepting it. That closes a parsing gap for Svelte templates and gives users a clearer fix-it hint for using JS-style comments in attributes.

### **Svelte render comments are no longer duplicated** (040f867)
Formatting a Svelte `{@render ...}` block followed by a comment no longer prints the comment twice. This is a user-visible formatter correctness fix for Svelte code, removing an annoying and potentially destructive rewrite.

### **`noMisplacedAssertion` recognizes `fast-check`'s `test.prop`** (f2a07aa)
The linter now treats `@fast-check/vitest`'s curried `test.prop(...)` variants as test functions, matching existing support for `test.each`. The formatter follows the same recognition, so these calls now use the expected breakable layout instead of being formatted like ordinary `test` calls.

### Other misc changes
- Modifier ordering tweak for `declare` vs accessibility modifiers; formatter output now matches canonical TypeScript order.
- Dependency/changelog/test updates across the affected fixes.
