---
date: 2026-07-26
repo: biomejs/biome
size: L
title: "YAML formatter gets major behavior upgrades"
excerpt: "Biome added several YAML formatting fixes, plus new Svelte declaration-tag support and Symbol global type migration."
commits: 6
authors: [dyc3, minseong0324, Mokto]
commit_authors: {"5809875": Mokto, "762c8c1": minseong0324, "a79bb36": dyc3, "c91ce44": dyc3, "52283b6": dyc3, "903b177": dyc3}
---

### **Svelte declaration tags with `let`/`const` now parse, format, and lint** (903b177)
Biome now supports Svelte declaration tags, including formatting and linting bindings declared with `{let ...}` and `{const ...}`. This expands HTML/Svelte coverage and closes a notable language-support gap for real-world component files.

### **YAML formatting gets cleaner handling for comments, scalars, and node properties** (c91ce44, a79bb36, 52283b6)
Biome’s YAML formatter picked up three substantial behavior changes: comments are now indented according to block structure, flow scalar content is normalized more accurately, and node properties stay on the entry line where appropriate. Together these improve readability and reduce surprising rewrites across mappings, sequences, anchors, tags, and multiline scalars.

### **HTML/Svelte embedded code no longer reindents verbatim regions** (5809875)
`biome check --write` is now idempotent for Svelte files in the cases covered here: multiline template literals in `<script>` blocks and block comments in `<style>` blocks stop gaining extra indentation on repeated runs. That fixes a concrete formatting bug that could otherwise churn files on every autofix pass.

### **Symbol global types were migrated into generated type data** (762c8c1)
The JS type-info generator now owns `Symbol`, `Symbol.dispose`, and `Symbol.asyncDispose` type definitions, instead of keeping them as manual globals. This tightens the global-type model and preserves the expected static members on `Symbol` while aligning the generated metadata with the rest of the predefined globals.

### Other misc changes
- YAML formatter test coverage expanded across many multiline/comment/anchor fixtures.
- Svelte formatter/analyzer test updates and snapshot additions.
- HTML service/parser internals adjusted to support the embedded formatting fix.
- Added changeset entries for the released patch-level behavior changes.
