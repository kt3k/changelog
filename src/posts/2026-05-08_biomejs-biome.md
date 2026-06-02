---
date: 2026-05-08
repo: biomejs/biome
size: L
title: "Tailwind arbitrary CSS parsing lands"
excerpt: "Biome adds a new Vue v-for validity lint, a Tailwind parser expansion for arbitrary CSS values, and a CSS selector dedupe perf win."
commits: 6
authors: [dfedoryshchev, dyc3, ematipico]
commit_authors: {"e4f8d83": dfedoryshchev, "6f9483f": dfedoryshchev, "4dbd88e": dyc3, "7b8d4e1": dyc3, "cceb45b": ematipico, "a6683b4": ematipico}
---

### **Tailwind arbitrary values now parse as CSS** (4dbd88e)
Biome’s Tailwind parser was expanded to treat arbitrary values as CSS, adding support for CSS functions, math functions, URLs, numbers, percentages, ratios, and parenthesized expressions inside brackets. The change includes substantial lexer/syntax/factory updates and new snapshot coverage for both valid and error cases, so it should close a whole class of Tailwind parsing gaps.

### **New Vue rule: `useVueValidVFor`** (7b8d4e1)
A new nursery lint rule validates Vue `v-for` directives, flagging invalid aliases, missing component keys, and keys that don’t use iteration variables. It’s wired into rule configuration, ESLint migration, the JSON schema/backend, and ships with docs plus invalid/valid tests, making it a user-facing lint addition.

### **CSS duplicate-selector detection gets faster** (cceb45b)
The `no_duplicate_selectors` rule was refactored to deduplicate rule context tracking with hashed at-rule nesting instead of cloning full context vectors. That lowers bookkeeping overhead while preserving duplicate detection behavior, which matters in larger stylesheets.

### Other misc changes
- Docs/comment wording cleanup across analyze, formatter, HTML, filesystem, and Tailwind files (e4f8d83, 6f9483f)
- Agent guidance updates in `AGENTS.md` (a6683b4)
