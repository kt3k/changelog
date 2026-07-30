---
date: 2026-07-29
repo: biomejs/biome
size: L
title: "Markdown, YAML, and linting get smarter"
excerpt: "Major formatter upgrades land for Markdown, YAML, CSS, plus new lint and CLI fixes around nullish coalescing and stdin paths."
commits: 13
authors: [dyc3, ematipico, denbezrukov, minseong0324, subotac, cormacrelf, pkallos, johncarmack1984, dreyfus92]
commit_authors: {"635d591": ematipico, "d890b39": denbezrukov, "a882bd9": dyc3, "5060aa0": dyc3, "67798d7": dyc3, "cba196d": dyc3, "bd845ac": minseong0324, "01f7ef5": subotac, "a519f9d": cormacrelf, "8c8779d": ematipico, "c171b3b": pkallos, "5c07dc4": johncarmack1984, "9e5c373": dreyfus92}
---

### **Markdown prose wrapping lands** (635d591)
Biome now supports configurable prose wrapping for Markdown paragraphs, adding a new `prose_wrap` formatter option with schema/config plumbing. The formatter changes are substantial and also touch inline code, links, quotes, list alignment, and service handling, so Markdown formatting should be noticeably more consistent across prose-heavy docs.

### **Markdown code and inline formatting get a major cleanup** (8c8779d)
This pass expands the Markdown formatter to dedent code blocks, normalize string-like content, and fix a range of indentation edge cases in blockquotes, lists, inline code, and link titles. It’s a broad behavioral improvement that should reduce noisy diffs and make Markdown output more spec-aligned.

### **CSS comments keep their original indentation** (d890b39)
Line comments between a property colon and value now preserve their source indentation instead of being reflowed to the formatter’s preferred padding. That fixes a subtle but visible formatting regression in both CSS and SCSS property values.

### **YAML formatting gains better scalar and collection handling** (5060aa0, 67798d7, cba196d, a882bd9)
YAML formatting picked up several related correctness fixes: document separation, trailing newlines, explicit-form mapping keys, flow collection spacing/blank lines, and trailing comment handling in block scalars. Together, these changes make the YAML formatter much more reliable on real-world documents with complex scalar and collection layouts.

### **`useNullishCoalescing` learns to ignore `if` assignments** (c171b3b)
The lint rule now detects `if` statements that only assign a fallback value to a nullish variable and can rewrite them to `??=`. A new `ignoreIfStatements` option lets users opt out of that reporting when they want to keep the `if` form.

### **`--stdin-file-path` now respects nested config** (a519f9d)
Biome’s CLI now handles stdin formatting/linting more correctly when the provided file path lives under nested configuration. This fixes a long-standing path-resolution bug that could cause stdin runs to ignore the intended local config and ignore rules.

### **Tailwind class sorting resolves bare functional utilities** (5c07dc4)
`useSortedClasses` now resolves bare functional utilities with defaults in `sort_v4`, improving sorting accuracy for Tailwind v4-style configs. That should reduce misordered class suggestions in projects relying on the newer preset behavior.

### **`noDelete` allows computed `process.env` deletion** (01f7ef5)
The performance lint was relaxed to allow deleting computed `process.env` expressions where it previously complained. This is a narrow but user-facing correctness fix for code that intentionally manipulates environment access.

### Other misc changes
- Migrated the `Date` global type codegen path in xtask and JS type info (bd845ac)
- Trimmed published crate sizes with cargo diet across multiple crates (9e5c373)
