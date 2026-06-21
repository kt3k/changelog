---
date: 2026-06-20
repo: biomejs/biome
size: S
title: "HTML a11y tests expanded; dead code removed"
excerpt: "Biome broadened accessibility coverage across HTML-like syntaxes and cleaned a stray dead line from the ESLint TypeScript migrator."
commits: 2
authors: [Conaclos, Netail]
commit_authors: {"af39586": Conaclos, "3e0cc45": Netail}
---

### **HTML accessibility test coverage expanded** (3e0cc45)
Biome refactored the `noAccessKey` and `noAmbiguousAnchorText` spec fixtures to cover more syntaxes, including Astro, Svelte, and Vue, while preserving the existing HTML cases. This strengthens lint rule coverage across frameworks and helps prevent regressions in markup parsing and diagnostics.

### **Dead code removed from the migrator** (af39586)
A leftover `private`-modifier check was deleted from `eslint_typescript.rs`. The change appears to be a small cleanup with no visible behavior change, reducing dead code in the migration path.

### Other misc changes
- Test fixture reshuffle for `noAmbiguousAnchorText`
- New/updated snapshot files for accessibility specs
