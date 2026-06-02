---
date: 2026-05-04
repo: biomejs/biome
size: L
title: "New lint rules and parser upgrades land"
excerpt: "Biome adds two nursery lint rules, improves type inference-aware linting, and expands YAML/Markdown parsing behavior."
commits: 13
authors: [dyc3, ematipico, minseong0324, l0ngvh, jfmcdowell]
commit_authors: {"83f7385": dyc3, "64aee45": dyc3, "56798a7": minseong0324, "09401d3": l0ngvh, "cc0f1bd": jfmcdowell}
---

### **Add `noBaseToString` for unsafe stringification** (83f7385)
Biome now flags stringification sites that would fall back to Object’s default `"[object Object]"` output, with an `ignoredTypeNames` option for exemptions. The migration and schema wiring were updated too, so ESLint config conversion and workspace support can recognize the new rule.

### **Add Vue `noVueVOnNumberValues`** (64aee45)
A new nursery rule disallows deprecated numeric modifiers on Vue `v-on` directives, such as `@keyup.13`. This extends the HTML analyzer and config/migration plumbing so the rule is available in linting and in ESLint-to-Biome migration.

### **Type-aware linting now respects `as const` object properties** (56798a7)
Several existing TypeScript rules were made smarter about object-literal properties initialized with `as const`, reducing false negatives in `noMisleadingReturnType`, `noUselessTypeConversion`, `useExhaustiveSwitchCases`, and `useStringStartsEndsWith`. Under the hood, the type-info and instance-shape logic also changed, which broadens how Biome infers and compares these values.

### **YAML lexer now handles properties and block tags/anchors** (09401d3)
The YAML parser gained support for lexing property prefixes like tags and anchors, plus better disambiguation between explicit mapping keys, plain scalars, and block mappings. This is a substantial parser expansion that should unlock correct parsing for more real-world YAML documents.

### **Markdown fenced-code diagnostics are stricter** (cc0f1bd)
Backtick fences with backticks in the info string now produce a parse error instead of being treated as valid code blocks. That tightens Markdown parsing around an ambiguous edge case and updates the formatter snapshots accordingly.

### Other misc changes
- Rust 1.95.0 bump and related compatibility edits
- Dependency updates: rust docker tag, indexmap, insta, tombi, pnpm, GitHub Actions
- fmt/clippy and small internal refactors
