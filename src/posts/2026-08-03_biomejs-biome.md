---
date: 2026-08-03
repo: biomejs/biome
size: L
title: "CSS semantics, module graph, and lint fixes"
excerpt: "Big CSS/JS graph work landed alongside fixes for @property validation, HTML comment formatting, and Svelte/Vue lint accuracy."
commits: 16
authors: [dyc3, ematipico, subotac, saberoueslati]
commit_authors: {"60679db": dyc3, "d96d6dd": ematipico, "68a2cf8": ematipico, "dae56c7": ematipico, "a1d6b1f": dyc3, "135f476": subotac, "ed88b13": saberoueslati}
---

### **CSS `@property` syntax is now validated correctly** (d96d6dd)
Biome now properly checks the `syntax` descriptor on registered custom properties, catching invalid `@property` declarations that previously slipped through. The change also adds a new semantic query for effective property definitions and CLI coverage for the bad-syntax case.

### **Module graph traversal got faster and broader** (68a2cf8, dae56c7, a1d6b1f)
The module graph gained SCC-based pruning for `noImportCycles`, so the rule can skip traversals for imports that cannot participate in a cycle. In the same area, traversal support was extended to HTML-ish files and CSS/JS path handling was refactored to use a shared import-path map, source-order-aware traversal, and cached JS cycle data.

### **HTML formatter no longer duplicates a trailing EOF comment** (60679db)
The HTML formatter now avoids moving a comment to trailing placement when it already ends the last element's line, which prevented it from being printed twice. This fixes a visible formatting bug in documents whose final comment is attached to EOF trivia.

### **Svelte attachments are counted as real references** (ed88b13)
`noUnusedImports` and `noUnusedVariables` now recognize identifiers used only inside Svelte `{@attach ...}` expressions. That removes false positives for a common Svelte pattern, including inline callback attachments and typed attachment functions.

### **Vue `:deep()` is no longer flagged as unknown** (135f476)
The CSS unknown-pseudo-class rule now treats Vue embedded styles' `:deep()` selector as valid. This aligns Biome with Vue SFC semantics and avoids spurious diagnostics in `.vue` files.

### Other misc changes
- HTML formatter tests: enable `html_embeds` and add prettier-plugin-svelte coverage (2 commits)
- `noImportCycles` performance follow-up and SCC query plumbing (1 commit)
- Dependency bumps: pnpm, GitHub Actions, and Rust crates (6 commits)
- HTML analyzer test harness tweak for embedded scripts (1 commit)
