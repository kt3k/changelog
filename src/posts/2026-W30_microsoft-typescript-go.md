---
date: 2026-07-26
repo: microsoft/typescript-go
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "TypeScript-Go adds emit/config APIs and deep checker fixes"
excerpt: "Native-preview API grew emit and config introspection, while the checker got correctness, stability, and performance improvements."
commits: 25
---

### **Native-preview API expands into emit and project/config introspection**
The biggest shift this week was a broad native-preview API expansion. Tooling can now query type-parameter constraint/default accessors, fetch config source files and contents, inspect parsed command lines, and read project references. Emit is now first-class too, with support for emitting to disk or string and forcing JS/declaration output for selected files.

### **Checker correctness and stability improved across several edge cases**
A number of focused checker fixes landed: better inference ordering for nested generics, safer union construction, improved variadic tuple relation checks, and more accurate constructor matching. The checker also stopped emitting noisy diagnostics for context-sensitive parameter lookups, avoided circularity issues in dependent destructuring narrowing, and fixed a crash during CommonJS declaration emit involving JS type aliases.

### **Language service behavior is more editor- and locale-aware**
Selection ranges now behave more naturally inside mapped types, and organize-imports/remove-unused respects the editor’s tab and spacing preferences. The language server also now honors configured diagnostic locale settings instead of sticking to the initialize-time locale, and JSX runtime importSource resolution was fixed for checked JavaScript projects.

### **Performance and rebuild behavior were tightened**
Internal checker work included paging link storage for denser memory layout, faster union construction, and a cheaper union-assignability shortcut in CFA. Incremental rebuilds were also fixed so globally affected files are fully reported, preventing stale batched rebuild results.

### **Release/build and diagnostics polish**
Release packaging gained a mode to build VSIXes from published platform packages, and readable build-info output now includes repopulation details to aid debugging. Semantic tokens now detect default-library files via canonical paths, and changelog notes were updated around skipLibCheck-related declaration conflicts.

### Other misc changes
- Native-preview enum/proto/plumbing updates and symlink handling improvements
- Additional tests and baseline updates across API, checker, selection, and incremental scenarios
