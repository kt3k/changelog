---
date: 2026-05-21
repo: biomejs/biome
size: L
title: "Tailwind v4 sorting, SCSS fixes, and parser cleanup"
excerpt: "Biome improves Tailwind v4 arbitrary-value sorting, fixes SCSS formatting and query-feature parsing, plus a small preview CI adjustment."
commits: 6
authors: [denbezrukov, Dotify71, jiwon79, dyc3]
commit_authors: {"e3df60e": jiwon79, "f6c21f5": dyc3, "73ab389": denbezrukov, "d835303": Dotify71, "6c0e833": Dotify71, "e6fd39b": denbezrukov}
---

### **Tailwind v4 arbitrary values now sort correctly** (e3df60e)
Biome expands `useSortedClasses` to understand Tailwind v4 typed arbitrary values and sort them with the same precedence model Tailwind uses. This fixes mis-ordering in class lists that use bracketed values and should reduce false positives/incorrect auto-fixes for modern Tailwind setups.

### **SCSS formatter preserves blank lines in map pairs** (73ab389)
The SCSS formatter now keeps intentional blank lines between map entries, including in `@each` headers and map expressions. That makes formatted output much closer to source intent and prevents the formatter from collapsing visually separated blocks.

### **SCSS query-feature parsing handles interpolated ranges correctly** (e6fd39b)
The CSS/SCSS parser now classifies interpolated media/container query features more accurately, especially when interpolation appears in feature ranges. This fixes parse errors and bad AST classification for valid SCSS constructs like interpolated query feature names and values.

### Other misc changes
- CI preview workflow tweak to use `pnpm/action-setup` and normalize YAML quoting (f6c21f5)
- Docs/schema wording cleanup for `useConsistentObjectDefinitions` (d835303)
- Removed outdated `useImportExtensions` caveats text (6c0e833)
