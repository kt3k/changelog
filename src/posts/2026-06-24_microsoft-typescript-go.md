---
date: 2026-06-24
repo: microsoft/typescript-go
size: L
title: "API expansion, organize-imports tweaks, and bug fixes"
excerpt: "Several new checker/program APIs landed alongside organize-imports sorting, rename behavior fixes, and a few correctness patches."
commits: 13
authors: [andrewbranch, jakebailey, weswigham, ahejlsberg]
commit_authors: {"0664d52": andrewbranch, "f455841": andrewbranch, "10923b4": jakebailey, "fd5dbc6": jakebailey, "1fcdf07": jakebailey, "359c5b4": andrewbranch, "fb92769": weswigham, "6d68dd6": ahejlsberg}
---

### **New program and checker APIs exposed** (0664d52)
The native preview API grew a batch of new entrypoints, including `program.getSourceFileNames`, `checker.getApparentType`, `checker.getImmediateAliasedSymbol`, `checker.getMemberInModuleExports`, plus `Type` type guards and related helpers. This meaningfully broadens what clients can query without dropping down to internals.

### **Organize-imports now supports collate-free sorting** (10923b4)
Import sorting was extended with a new `organizeImportsSort` preference and updated Unicode-focused tests/baselines. That changes the user-facing ordering behavior for organize imports, especially in projects that care about locale/collation-free ordering.

### **CommonJS destructuring emit fixed for exported values** (1fcdf07)
The CommonJS transformer now preserves the correct node context when lowering destructuring assignments, fixing broken emit for exported destructuring patterns. This addresses a real codegen bug that could produce incorrect runtime behavior.

### **Rename respects alias preference in more cases** (aa3f666)
Rename/edit generation was updated to honor `useAliasesForRenames`, with baseline updates covering re-exports and import-type scenarios. This improves refactor accuracy when symbols are exposed through aliases or re-exports.

### **Inference prefers deeper covariant candidates** (6d68dd6)
Type inference was adjusted to track candidate depth and prefer deeper covariant inferences, which changes how nested generic arguments are resolved. This should improve correctness in tricky generic inference cases and reduce surprising inference results.

### **Source-file non-ASCII detection and position mapping fixed** (750701f)
Source files now compute non-ASCII status directly from text creation, and position mapping uses JS-string rune decoding to handle lone surrogate sentinels correctly. This fixes Unicode edge cases that could affect source mapping, parsing fast paths, and API encoding behavior.

### **A handful of API and language-service bugs were fixed** (359c5b4, 496afe9, 8f38985, 3c20d1f)
Missing checker APIs were added, `js/ts.reportStyleChecksAsWarnings` is now read correctly from VS Code config, `getBaseTypes` no longer panics on type reference instantiations, and `${configDir}` resolution in extended configs was corrected. These are all correctness fixes that unblock real-world tooling scenarios.

### Other misc changes
- Staged npm package release output updated for the new release flow (fd5dbc6)
- Added a CHANGES.md note for `arguments` inference removal (fb92769)
- Generated/maintained tests and baselines for the above changes
- Minor internal API/test cleanups around source-file handling and caching (f455841)
