---
date: 2026-05-02
repo: biomejs/biome
size: L
title: "SCSS `@each`, imports, and markdown parser fix"
excerpt: "Notable fixes for organizeImports and markdown parsing, plus a major SCSS `@each` formatter refactor."
commits: 5
authors: [jfmcdowell, Conaclos, denbezrukov, dfedoryshchev]
commit_authors: {"a704a6c": Conaclos, "5e046b2": jfmcdowell, "3fbaa08": jfmcdowell, "dc0c877": denbezrukov, "1a2d354": dfedoryshchev}
---

### **SCSS `@each` formatting now uses a dedicated header node** (dc0c877)
Biome refactored SCSS `@each` handling to split the rule into a new `ScssEachHeader` structure, with parser/factory/formatter updates and expanded tests. This should make `@each` formatting more accurate and robust, especially around iterable/header layout and related SCSS constructs.

### **organizeImports now rejects unknown predefined groups** (a704a6c)
`organizeImports` now errors when config references an unknown predefined group like `:INEXISTENT:` instead of silently accepting it. That tightens validation and helps users catch misconfigured import grouping earlier.

### **Markdown parser keeps loose lazy continuations** (5e046b2)
The markdown parser’s line-continuation logic was relaxed so certain nested lazy continuations are preserved instead of being broken apart. This fixes real-world list/paragraph parsing edge cases and improves AST fidelity.

### **Other misc changes**
- Added markdown parser coverage for quoted ordered sublists (3fbaa08)
- Fixed a typo in CONTRIBUTING.md (1a2d354)
