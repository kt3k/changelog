---
date: 2026-10-19
repo: biomejs/biome
size: L
title: "Performance, daemon, and lint fixes land"
excerpt: "Major CSS lint perf work, daemon behavior fixes, and several correctness updates across JS, CSS, and GritQL."
commits: 7
authors: [dyc3, ematipico, fe-dudu]
commit_authors: {"7bf9765": dyc3, "dd71def": dyc3, "75e7bc0": ematipico, "259a84e": ematipico, "c71fe6a": dyc3, "8cfb294": fe-dudu, "c4199d7": dyc3}
---

### **CSS lints get a major performance boost** (dd71def)
Biome removed a quadratic scan in `noUnknownFunction`, `noShorthandPropertyOverrides`, and `useSingleTopLevelHeading`. The CSS rules now lean on semantic data and indexed lookups instead of repeatedly walking the whole tree, which should make large stylesheets noticeably faster to analyze.

### **Daemon `--use-server` flow is faster and more reliable** (c4199d7)
The CLI daemon path now handles `--use-server` commands across all CPU cores instead of capping work at four files, and `biome stop` returns as soon as shutdown completes instead of waiting out a timeout. It also fixes cancelled-file handling so server-backed runs report the same diagnostics as non-server runs.

### **`noTsIgnore` now matches TypeScript directive rules** (c71fe6a)
The rule now only flags actual `@ts-ignore` directives at the start of a line comment, or the final line of a block comment, instead of any comment that merely mentions the text. That avoids false positives in prose and JSDoc, and the autofix now rewrites only the directive itself.

### **CSS irregular-whitespace lint skips strings and handles trivia more precisely** (8cfb294)
`noIrregularWhitespace` now treats whitespace inside CSS/SCSS strings as content and reports irregular whitespace in trivia separately from token bodies. This fixes duplicate or spurious diagnostics in nested rules and embedded snippets.

### **GritQL JSON patterns can bind object keys and values** (259a84e)
JSON parsing now accepts Grit metavariables where member names and values can appear, enabling patterns like `{ $key: $value }` to bind both sides. This expands GritQL’s reach for JSON matching and rewriting.

### Other misc changes
- Removed analyzer walk-every-node test scaffolding (7bf9765)
- Enabled unstable preview release builds and updated release docs/workflows (75e7bc0)
- Misc CSS parser/formatter and snapshot adjustments (75e7bc0)
