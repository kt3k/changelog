---
date: 2026-05-11
repo: microsoft/typescript-go
size: M
title: "Helper checks and call-hierarchy crash fixes"
excerpt: "Adds emit-helper validation for async/import cases, fixes JSX hover and call hierarchy bugs, and removes an overflow assertion that could fail spuriously."
commits: 7
---

### **Emit helper checks expanded for async functions and imports** (3cfb531)
The checker now proactively requests the right external emit helpers for async generators, async functions, `for await...of`, default imports, and namespace imports in CommonJS output. This tightens correctness around helper availability and catches missing `tslib`-style support earlier, with broad baseline updates covering the new diagnostics.

### **Fix JSX intrinsic tag name lookup after hover** (6eb79f4)
`getTypeAtLocation` no longer treats JSX tag names, JSX attributes, or namespaced JSX names like ordinary identifiers for narrowing. This prevents a hover pass over an intrinsic element from poisoning the next diagnostic pull with a bogus “Cannot find name” error.

### **Fix call hierarchy crashes for computed property containers** (8259006)
Call hierarchy item naming was refactored to better handle computed property names in object literals, avoiding crashes when incoming calls are requested from methods nested under computed keys. The new fourslash coverage locks down identifier, string-literal, and expression-based computed property cases.

### **Remove an invalid assertion after stack-depth overflow** (803dcde)
The type relation overflow path now just returns false without asserting about generalized literal assignability. That makes relation failure behavior well-defined even when recursion depth is exceeded, which is important for robustness in pathological type graphs.

### Other misc changes
- Accepted baseline changes: late-bound computed property emit, symbol declaration emit, and declaration simplification for class extends Array (3 commits).
