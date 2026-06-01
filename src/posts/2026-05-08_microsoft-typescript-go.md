---
date: 2026-05-08
repo: microsoft/typescript-go
size: M
title: "Module resolution, declaration emit, and LS fixes"
excerpt: "A mixed day of several notable bug fixes across module resolution, declaration emit, and language service behavior."
commits: 18
authors: [DanielRosenwasser, andrewbranch, RyanCavanaugh, jakebailey]
commit_authors: {"e1f8f97": andrewbranch, "5c67e17": RyanCavanaugh, "48e2953": jakebailey, "04b3256": DanielRosenwasser, "968d062": DanielRosenwasser}
---

### **Fix package exports fallback and self-name resolution edge cases** (e1f8f97)
The resolver now treats top-level `"exports": null` as allowing fallback resolution instead of blocking it, matching Node’s behavior. It also accepts certain self-name resolution errors when the project root is ambiguous, which clears a batch of related baseline failures.

### **Defer ambient module merging until globals are ready** (b6de67f)
Global ambient module declarations are now merged later in checker initialization, after the global symbol table has been set up. This avoids cases where ambient modules depend on other global symbols/types that were not yet resolved.

### **Tighten declaration emit for expando assignments** (88f5792, c872613, dcc16d9)
Declaration emit now avoids duplicating expando functions and skips emitting expandos that are already represented elsewhere, which reduces duplicate declarations and related errors. A separate fix also preserves the actual computed property name in expando export output, preventing incorrect aliases for element-access assignments.

### **Fix auto-import promotion for type-only JSX imports** (ea005f3)
The import-fix path no longer panics when a JSX tag completion needs to promote one or more `import type` specifiers to value imports. It now handles multiple candidate symbols more safely, including the case where both the JSX namespace and component import are type-only.

### **Fix JSDoc `@param` matching on class fields and similar hosts** (1fb728b)
JSDoc parameter validation now walks to the correct owning declaration for more function-like contexts, including class fields and other attachment points. That makes unmatched `@param` diagnostics appear where users expect instead of being dropped.

### **Fix crash in destructuring with `noUncheckedIndexedAccess` and `noLib`** (04b3256)
A nil check was added before including `undefined` in indexed access types, preventing a crash when destructuring arrays without lib definitions. The compiler now reports the underlying property error instead of failing internally.

### **Fix missing nil check in async return contextual typing** (968d062)
The checker now guards a contextual-type lookup used for return expressions, preventing another crash path in async function analysis. This keeps the checker stable on thenable-return cases that previously tripped a nil dereference.

### **Fix recursive constraint expansion in signature inference** (ed6cf5d)
The checker now avoids over-expanding recursive constraints while computing base signatures. That narrows type inference work and fixes bad behavior on generic function parameter cases.

### **Fix `isInitialized` state restoration after restart** (e070bc6)
The client now restores `isInitialized` correctly after a restart flow. This is a small but important state-machine fix for the extension client.

### **Fix process-alive probing on unsupported platforms** (48e2953)
The LSP now avoids starting process-liveness checks when the platform can’t support them. That removes unnecessary platform-specific work and avoids invalid probe setup.

### **Add a Copilot instruction template** (5c67e17)
Adds a new `.github/copilot-instructions.md` file to guide Copilot usage in the repo.

### Other misc changes
- Moved several baseline results from `submoduleTriaged` to `submoduleAccepted`.
- Added and updated test baselines for module resolution, expando emit, JSDoc param tags, and JS declaration emit cases.
- Minor language-service and checker test additions/adjustments.
