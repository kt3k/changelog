---
date: 2026-06-06
repo: microsoft/typescript-go
size: M
title: "Unicode suggestions and JSDoc constructor fix"
excerpt: "Improved spelling suggestions for Unicode identifiers and fixed JSDoc modifiers being misparsed on constructors."
commits: 2
authors: [ahejlsberg]
commit_authors: {"3e477ab": ahejlsberg, "f3c4190": ahejlsberg}
---

### **Unicode spelling suggestions now handle Unicode characters** (3e477ab)
The suggestion matcher now measures name length in runes instead of bytes, so identifiers with accented or other multi-byte characters get more accurate “Did you mean” results. This fixes incorrect spelling suggestions for Unicode-heavy names without changing the public API.

### **Fix reparsing of JSDoc modifiers on constructors** (f3c4190)
Constructor declarations are now included in the parser’s JSDoc modifier reparse path, and AST modifier storage gained a setter to support the fix. This resolves cases where tags like `@private` or `@readonly` were being applied or reported incorrectly on constructors.

### Other misc changes
- Updated test baselines for the new Unicode spelling suggestion cases.
- Updated test baselines for JSDoc constructor/private and readonly conformance cases.
