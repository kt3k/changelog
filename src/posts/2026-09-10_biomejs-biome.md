---
date: 2026-09-10
repo: biomejs/biome
size: L
title: "Biome ships new lint rules and formatter fixes"
excerpt: "New nursery lint rules for test titles, obsolete tags, and finally returns landed alongside several JS/CSS formatter and React 19.3 fixes."
commits: 15
authors: [dyc3, denbezrukov, m1handr, ternaus, ematipico, alexrudd2]
commit_authors: {"93dc615": dyc3, "5eb5f09": m1handr, "dea163f": dyc3, "a9a5e9a": dyc3, "76a302a": dyc3, "2107dae": ternaus, "0e9fe53": dyc3, "e19512a": dyc3, "0d49e24": dyc3, "c58dd37": denbezrukov, "4ef1978": denbezrukov}
---

### **New lint rule: `useValidTestTitle`** (5eb5f09)
Biome adds a nursery rule that validates unit test suite/case titles, with ESLint/Vitest migration support and config/schema wiring. This broadens lint coverage for test code and makes the rule easier to adopt in existing codebases.

### **New lint rule: `noObsoleteTags`** (0e9fe53)
A new HTML/JSX nursery rule flags obsolete HTML elements such as `<font>`. It ships with rule registration, diagnostics metadata, and HTML fixture coverage across HTML, Astro, Svelte, and Vue.

### **New lint rule: `noReturnInFinally`** (0d49e24)
Biome now warns on `return` inside `finally` blocks, a pattern that can hide exceptions or change control flow in subtle ways. The change includes rule configuration and editor/backend integration so it can be enabled and migrated like other rules.

### **React 19.3 support for `noUnknownAttribute`** (2107dae)
The JSX attribute rule now recognizes React 19.3+ DOM properties, including fullscreen handlers, `credentialless`, and `maskType`, with tag-specific restrictions where applicable. That reduces false positives for projects on newer React ranges while preserving checks for older setups.

### **Formatter fixes for tricky comments and unary expressions** (dea163f, a9a5e9a, 76a302a)
Several JS/TS formatting bugs were fixed around comments influencing layout: type arguments now break cleanly before the closing `>` when comments force multiline formatting, unary expressions stop gaining redundant parentheses, and comments are preserved correctly with `operatorLinebreak: before` in binary-like expressions. These are correctness fixes that improve output stability on real-world code.

### **CSS/SCSS parsing and formatting got sharper** (4ef1978, c58dd37)
The SCSS `@forward` parser now accepts valid underscore-prefixed export names, and the CSS formatter/parser test coverage was expanded accordingly. A smaller SCSS formatter tweak also improves include closing-comment handling and skips unnecessary include scans, tightening both correctness and performance.

### **Git ignore handling now respects nested negations** (e19512a)
Biome now correctly processes files re-included by negation patterns in nested `.gitignore` files, even when the file starts with `*`. That fixes a real workflow bug where nested project files could be incorrectly left unprocessed.

### Other misc changes
- GitHub reporter snapshot cleanup for nested directories (93dc615)
- JS formatter newline/comment fixes in type arguments and unary formatting tests
- `use strict` docs clarification and assorted lint/test snapshot updates
- Release/changeset housekeeping and dependency/config migration wiring
