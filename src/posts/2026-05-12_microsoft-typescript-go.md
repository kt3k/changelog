---
date: 2026-05-12
repo: microsoft/typescript-go
size: L
title: "Declaration emit and tracing get sharper"
excerpt: "Fixes for CJS export declaration emit, static class name conflicts, JSX runtime imports, and trace metadata."
commits: 9
authors: [jakebailey]
commit_authors: {"2879671": jakebailey}
---

### **Declaration emit now prefers identifiers for CJS export names** (01cc069)
When transforming CommonJS export assignments into declaration emit, the compiler now prefers identifier names over string literals where possible, while still falling back to strings when needed. It also skips the ES2015/ES2020 string-literal export-name error for declaration files, which helps accepted declaration output line up with real module shapes.

### **Static class members now error on reserved Function names** (35e8f91)
The checker now reports conflicts for static `name`, `length`, `caller`, and `arguments` members on classes when `useDefineForClassFields` is off. This closes a gap where these built-in `Function` properties could slip through without the expected diagnostic.

### **Declaration emit preserves shadowed generic type parameters correctly** (adb2ab4)
Type resolution in declaration emit now handles methods that shadow an outer class type parameter, so the generated `.d.ts` keeps the right generic names and doesn’t lose the outer type relationship. This is a correctness fix for public API shape in emitted typings.

### **JSX runtimes are always synthesized for tsx/jsx files** (e3ea2a8)
The file loader now creates the implicit JSX runtime import for JSX/TSX files even when other import-helper logic doesn’t run. That prevents missing `react/jsx-runtime` or `react/jsx-dev-runtime` diagnostics from being skipped and fixes JSX reference tracking for runtime imports.

### **Trace events now carry checker IDs reliably** (2879671)
`--generateTrace` was tightened so checker events consistently include a `checkerId`, including separate begin/end spans and instantaneous events. The trace plumbing and tests were expanded to keep downstream trace analysis tools working reliably.

### **Declaration printer options are aligned with Strada** (507c80e)
The declaration emitter’s printer configuration was updated to match the newer Strada behavior, including source map handling and other emit flags. This is mostly an emit-consistency fix, but it affects declaration map output and source map metadata.

### **JSDoc type name resolution was widened for shadowed type params** (adb2ab4)
Binder name resolution now treats JSDoc type references more permissively around type-parameter scope, so comment types can resolve correctly even when they appear outside the usual parameter-list boundaries. This reduces wrong symbol binding in declaration-related flows.

### Other misc changes
- Added a local VS Code launch configuration entry.
- Accepted several baseline diffs for CJS export pattern and declaration emit tests.
- Updated test baselines for JSX comment preservation and declaration map output.
- Test-only additions for package-exports declaration emit coverage.
