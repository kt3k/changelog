---
date: 2026-08-14
repo: microsoft/typescript-go
size: L
title: "Feature push lands snippets, hovers, and parser fixes"
excerpt: "Completion snippets, richer hovers, safer parsing, regex diagnostics, and several rename/declaration-emit fixes shipped today."
commits: 16
authors: [a-tarasyuk, weswigham, ZhiyaoWen999, AMR5210, magic-akari, jakebailey, johnfav03, mds-ant]
commit_authors: {"9814139": magic-akari, "1bcfa18": a-tarasyuk, "2fbf6c3": a-tarasyuk, "01d9399": a-tarasyuk, "6d54602": AMR5210, "0f714a5": weswigham, "89194b2": johnfav03, "3e58dfc": weswigham}
---

### **Completion snippets for editor suggestions** (1bcfa18)
Adds completion snippets across class members and auto-import paths, with broad fourslash coverage. This should make IntelliSense more useful by inserting fuller code shapes instead of plain identifiers.

### **Generic node handles and safer AST APIs in native preview** (3e58dfc)
`NodeHandle` is now generic, and generated `is-*` helpers can carry `.Handle` members for guarding node handles in both sync and async APIs. The change tightens types around declarations and index signatures, reducing ambiguity for consumers of the native preview surface.

### **Declaration emit fix for JSDoc functions** (2fbf6c3)
Corrects declaration generation so JSDoc-defined functions emit the right shape. That matters for downstream consumers relying on `.d.ts` output, where bad declaration emit can break type checking.

### **Parser now handles `as`/`satisfies` between `**` operators** (9814139)
Adjusts binary-expression parsing so assertions between exponentiation operators are rejected or grouped correctly instead of being parsed inconsistently. This closes a real syntax edge case and improves error reporting for a tricky precedence interaction.

### **Private names in type queries are now parsed and rejected in emit** (0f714a5)
Extends parsing and declaration emit to recognize dotted private names in type queries, and adds a new diagnostic for invalid declaration emit cases. This is a correctness fix that prevents emitting invalid declarations from private-member references.

### **Hover preserves JSDoc on mapped type properties** (01d9399)
Fixes quick info so mapped type properties keep their JSDoc in hover output. That improves editor UX by showing the docs users actually expect on generated members.

### **Module-preserve now skips a false TS1293 on destructured require** (6d54602)
Stops reporting TS1293 for destructured `require` when `--module preserve` is used. This removes a configuration-specific false positive that could block otherwise valid code.

### **Regex scanner now catches nested duplicate named groups and negated Unicode-set issues** (8ffb4ef, 48f5834)
The regexp parser now tracks named groups across nested alternatives so duplicate names are flagged even when they appear inside groups or lookaheads. It also tightens Unicode-set validation in negated classes, reporting TS1518 when a union operand could match multiple characters.

### **Hover no longer crashes on self-reexported generic namespaces** (89194b2)
Fixes a crash in hover resolution when a namespace re-exports a generic type of the same name. The checker now avoids resolving away the instantiation context too early, preserving generic arguments in hover results.

### **File rename now updates imports in unopened composite projects** (d50e686)
File-rename workflows now load the project tree before computing edits, so unopened but referenced composite projects are included. This is a notable LSP behavior fix: renaming a file can now update imports across the whole solution, not just already-open projects.

### Other misc changes
- Added Android ARM64 release target
- Fixed computed enum member stack overflow
- Fixed override-modifier diagnostics and related hover/completion snippets
- Improved declaration/hover behavior for merged namespace exports
- Inlined AST flag helpers
- Minor test and baseline updates
