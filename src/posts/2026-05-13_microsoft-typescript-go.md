---
date: 2026-05-13
repo: microsoft/typescript-go
size: L
title: "Auto-import, rootDir, and enum fixes land"
excerpt: "Major auto-import scanning changes plus rootDir validation, enum NaN handling, and several crash/overflow fixes."
commits: 7
authors: [a-tarasyuk, andrewbranch, weswigham, jakebailey, iisaduan]
commit_authors: {"47ca648": andrewbranch, "d686a16": a-tarasyuk, "49f210f": weswigham, "ff5823b": jakebailey, "a697eb3": iisaduan, "9f1f2da": a-tarasyuk}
---

### **Auto-import scanning now respects package exports** (47ca648)
A new experimental preference, `js/ts.preferences.autoImportEntrypointDirectorySearch`, controls whether auto-import recursively scans packages without `exports` entries. The compiler and language service now track “deep import” packages separately so they can avoid expensive directory walks unless explicitly enabled, which should reduce false-positive auto-imports and improve performance in large dependency trees.

### **Files outside `rootDir` are now diagnosed earlier** (a697eb3)
TypeScript now checks that files matched by `tsconfig.json` `include` actually live under `rootDir`, instead of discovering the mismatch later during emit/output-path calculation. This tightens project validation and surfaces a clearer error when source files are outside the expected tree.

### **Enum auto-increment after `NaN` now errors correctly** (d686a16)
The checker now treats a `NaN`-producing enum initializer as a missing numeric value for subsequent members, matching TS 6.0 behavior. That fixes a case where `enum` members after `0 / 0` could silently inherit `NaN` instead of producing the expected initializer diagnostic.

### **Type-to-string stack overflows are cached away** (49f210f)
NodeBuilder serialization now reuses a single cached instance for potentially circular internal operations, with an extra guard around cached type expansion. This prevents a stack overflow in `typeToString`-style paths for self-referential types and makes circular type rendering more robust.

### **`realpath` and symlink-aware VFS matching are faster** (ff5823b)
The virtual filesystem now records which entries were originally symlinks/reparse points so callers can avoid re-checking them repeatedly. `vfsmatch` also avoids repeated `realpath` work, which should help globbing and directory traversal on symlink-heavy trees.

### **Document highlights no longer assert on merged namespaces** (5b70f41)
A debug assertion in reference gathering was replaced with a safe skip for merged symbols, fixing a crash for `export =` inside a namespace merged with a class. This restores document highlights on that pattern and removes an invalid assumption about module-symbol shape.

### **Decorated static accessors stop crashing diagnostics** (9f1f2da)
The accessor-decoration path now null-checks the second accessor before inspecting decorators, preventing a diagnostics crash on decorated classes with static getters. This is a targeted correctness fix for decorator-heavy code.

### Other misc changes
- Fourslash/script updates and test maintenance
- Auto-import and import-codefix regression tests added/relocated
- Minor internal resolver and user-preference adjustments
