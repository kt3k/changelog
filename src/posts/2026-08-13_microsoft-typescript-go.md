---
date: 2026-08-13
repo: microsoft/typescript-go
size: L
title: "API expansion and compiler fixes land"
excerpt: "Native preview gains config parsing and symbol-scope APIs, while compiler and language server fixes improve emit, diagnostics, and stability."
commits: 11
authors: [jakebailey, johnfav03, andrewbranch, Ijtihed]
commit_authors: {"d07495d": jakebailey, "a35bda0": johnfav03, "c2d16ec": andrewbranch, "dcfc50b": jakebailey, "df11150": johnfav03}
---

### **Compiler emit noEmit semantics restored** (bbdf7a2)
`tsgo` now matches `tsc` more closely when `--noEmit` and `--noEmitOnError` interact. The emit pipeline was reworked to route through a unified no-emit handler, fixing exit-status behavior and the `emitSkipped` results seen in preview tests.

### **Native preview adds config parsing APIs** (df11150)
The async/sync native-preview APIs now expose `parseCommandLine`, `readConfigFile`, and `parseJsonConfigFileContent`, along with the needed protocol plumbing and tests. This broadens the public surface for config tooling and makes the preview layer able to mirror more of TypeScript's configuration workflow.

### **Checker API gains `getSymbolsInScope`** (87f191a)
A new `checker.getSymbolsInScope(...)` method was added to the native-preview API, with support for querying by AST node or document position. That gives consumers a direct way to ask what symbols are visible at a location, which is useful for completions, navigation, and analysis features.

### **Checker scheduling is rebalanced for import affinity** (dcfc50b)
The compiler's checker pool now uses a much more sophisticated file-assignment policy based on import affinity and weighted partitioning. The change is aimed at reducing duplicated cache work while keeping checker load balanced, which can meaningfully improve parallel type-checking throughput on large projects.

### **Language service methods move under a dedicated namespace** (c2d16ec)
Several language-service-oriented operations were split out of `Project` into a new `LanguageService` wrapper, with the old entry points kept as deprecated pass-throughs. This is a structural API cleanup that sharpens the boundary between project state and language-service queries.

### **LSP selection ranges and server resilience improve** (a35bda0)
Selection-range generation was refactored to cap nesting depth and retain the most relevant ranges near the cursor, instead of building an unbounded chain. The server also now stays alive after response marshaling failures, which should prevent one bad payload from taking down the LSP process.

### **Diagnostics now key off source paths, not file objects** (d07495d)
Diagnostics collection now deduplicates and retrieves entries by source path, so equivalent `SourceFile` instances resolve to the same diagnostics bucket. This fixes lookup failures across source-file replacements and makes diagnostic tracking more robust during re-parsing.

### Other misc changes
- Fixed malformed `tsconfig` parsing to avoid panics and duplicate diagnostics.
- Added `--clientProcessId` support to the LSP server.
- Unicode-regex set parsing now allows a lone `&`.
- Updated the TypeScript submodule.
- Several new/updated baseline and test cases.
