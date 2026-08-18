---
date: 2026-08-17
repo: microsoft/typescript-go
size: L
title: "New checker APIs and better extension resolution"
excerpt: "Added symbol and file-scoped diagnostics APIs, plus fixes for JSDoc parsing, tuple optionality, and extension TSDK resolution."
commits: 13
authors: [dragomirtitian, Andarist, mrazauskas, jakebailey, piotrtomiak, WinterYukky, mds-ant, andrewbranch, a-tarasyuk]
commit_authors: {"2320011": Andarist, "e8359e7": dragomirtitian, "42c632e": dragomirtitian, "72787a4": Andarist, "072dc1f": piotrtomiak, "e70c360": WinterYukky, "e8cf1cc": mds-ant, "6924fef": andrewbranch, "a97ee9c": jakebailey, "bc520f5": a-tarasyuk, "500d396": jakebailey}
---

### **Checker can now get a source file’s symbol** (e8359e7)
`Checker.getSymbolOfSourceFile()` was added with both single-file and batched overloads, returning module symbols for source files and `undefined` for non-modules. This is a useful new public API for consumers that need to inspect source-file symbols directly.

### **Diagnostics APIs now accept file arrays** (42c632e)
The various `get*Diagnostics()` methods were extended to accept either one file or a list of files, and the underlying request payload now sends `files` instead of a single `file`. That makes it cheaper and more flexible to ask for diagnostics across a targeted subset of the program.

### **Checker exposes fully qualified symbol names** (e70c360)
`Checker.getFullyQualifiedName()` was added so callers can retrieve the dotted, module-qualified name for any symbol. This fills a common gap in symbol inspection workflows and mirrors information the compiler already knows internally.

### **Internal formatting API for synthesized nodes** (6924fef)
`Snapshot.internal.formatNodeForInsertion()` was introduced to format synthesized AST nodes with the right indentation for a specific insertion point in a file. This is a practical new internal capability for code actions and completions that need to emit text matching local file context.

### **JSDoc type-source handling and declaration emit fix** (bc520f5)
Parser/scanner work fixed how multiline JSDoc literal types preserve and normalize their source text, including reparsed nodes and constructed reparse nodes. That also addresses a declaration-emit bug for multiline JSDoc literal types, which previously could lose the right shape or formatting.

### **Tuple optionality stripping fixed under EOPT** (2320011)
Mapped-type instantiation now strips missing/undefined more correctly when removing optionality from tuple members under `exactOptionalPropertyTypes`. This is a real type-system correctness fix that changes the results of `Required`-style transformations in edge cases.

### **Hover JSDoc for mapped type properties fixed** (72787a4)
Mapped-type property hover now aggregates and surfaces the right JSDoc, instead of dropping or misattributing it. This improves editor UX for type-heavy code.

### **Checker cache key hashing optimized** (e8cf1cc)
The checker’s cache-key builder was refactored to use an inline byte buffer and one-shot hashing instead of incremental hasher writes. That is a performance-oriented internal change meant to reduce allocation and hashing overhead.

### **Inferred projects are kept up to date** (072dc1f)
The API now always updates an inferred project when one is open, tightening project-state consistency. This is a meaningful correctness fix for editor/API consumers working with open inferred projects.

### **macOS extension temp paths fixed** (a97ee9c)
A small path fix addresses extension temp-path handling on macOS.

### **TSDK resolution now handles npm aliases** (500d396)
The VS Code extension’s TSDK lookup was updated to resolve package executables through a helper that works with npm aliases, and the extension test suite was wired up to cover it.

### Other misc changes
- Added API support for `StructuredType` and `.getNonPrimitiveType()`.
- Added `formatNodeForInsertion` plumbing in the internal API and related completion/tracker changes.
- Dependency/build/test updates, including a new extension test task and package script.
- Additional API/session/proto test coverage for the new checker and diagnostics methods.
