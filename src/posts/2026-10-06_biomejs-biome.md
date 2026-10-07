---
date: 2026-10-06
repo: biomejs/biome
size: L
title: "Tailwind parser fix and new switch lint"
excerpt: "Biome adds a nursery noNestedSwitch rule and fixes Tailwind arbitrary-value parsing for parenthesized/unary expressions."
commits: 13
authors: [dyc3, ematipico]
commit_authors: {"bee1e54": dyc3, "271d9b2": dyc3, "dc2c81d": dyc3, "25eb10c": dyc3, "f0f8242": dyc3, "6359a9b": ematipico, "07a576a": ematipico, "2ebfdd3": ematipico, "45aed7c": ematipico}
---

### **Tailwind arbitrary values now parse parenthesized and unary expressions correctly** (bee1e54)
Biome fixed a parser bug that produced invalid syntax trees for Tailwind arbitrary values containing nested parentheses or unary operators, such as `w-[calc(1px+(2px))]` and `w-[calc(1px*-(2px))]`. This also required updating generated Tailwind syntax factories and related tests, so downstream class analysis now sees the right AST shape.

### **New nursery rule rejects nested `switch` statements** (25eb10c)
Biome added `noNestedSwitch`, a new nursery lint rule that flags `switch` statements nested inside other `switch` statements. The rule is wired into config schemas, diagnostics metadata, and ESLint migration support, so it can be enabled and migrated consistently across the toolchain.

### Other misc changes
- Refactored shared `has_inner_comments` handling into a common helper (271d9b2).
- Reverted an earlier Tailwind parser change after the follow-up fix landed (dc2c81d).
- Merge/chore commits and automated fixes, including syncs from `main`/`next` and small config/test updates (f0f8242, 6359a9b, 07a576a, 2ebfdd3, 98140cd, fda255b, 45aed7c).
