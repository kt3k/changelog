---
date: 2026-04-22
repo: microsoft/typescript-go
size: L
title: "Checker fixes and native preview packaging"
excerpt: "Major type-checker and language-service fixes landed alongside a native-preview packaging move and cache/hover refinements."
commits: 12
authors: [jakebailey, andrewbranch, RyanCavanaugh]
commit_authors: {"e7283bb": jakebailey, "c4663ad": jakebailey, "88b5b78": RyanCavanaugh, "effd0f8": andrewbranch, "d128e3d": andrewbranch}
---

### **Improve recursion identity for direct type instantiations** (33b9297)
This tightens how the checker identifies recursive instantiations originating from type nodes, so directly-instantiated references don’t get mistaken for the same recursion path as symbol-based types. It also updates deep tuple/array recursion baselines, indicating a correctness fix for previously problematic nested types.

### **Move @typescript/api and @typescript/ast into @typescript/native-preview** (effd0f8)
The publishing layout is being consolidated around `@typescript/native-preview`, with the API/AST packages moved under that package’s source tree and build/test tasks retargeted accordingly. This is a notable packaging and build-system change that affects how the JS-facing native preview artifacts are generated and published.

### **Fix auto-imports inserting `import` in CJS files when `moduleDetection` is `force`** (8eb3c6c)
Auto-import code actions now choose `require()`-style inserts in CommonJS contexts even when module detection and Node module kinds are involved. That prevents invalid or surprising ES import insertion in JS/CJS files and broadens the test coverage around module-format detection.

### **Reenable semantic tokens** (c4663ad)
Semantic tokens support is turned back on in the LSP server. This should restore richer editor highlighting/semantic coloring where it had been disabled.

### **Include member resolution status in `getLiteralTypeFromProperties` cache key** (967095e)
The checker now tracks whether object members are still unresolved when caching literal types from properties, avoiding stale cache hits during member resolution. That addresses a subtle correctness bug around `keyof`/property-based type computation on unresolved base members.

### **Cancel auto-import cache warming when file changes arrive** (d128e3d)
The project session now keeps a cancellable handle for auto-import cache warming and aborts that work on open/change/close/watch events. This reduces wasted background work and avoids warming results that are immediately invalidated by edits.

### **Fix hover crash on classes with anonymous base class** (ae8ae79)
Hover rendering now handles anonymous class heritage more safely by falling back to a written identifier for internal class symbols. That prevents crashes in quick info for classes extending anonymous bases and improves the generated hover baselines.

### **Fix conditional instantiation cache key mismatch for unresolved conditional types** (5f57ade)
Conditional-type instantiations now use the conditional-type cache key instead of a plain type-list key when seeding the instantiation cache. This prevents incorrect reuse of unresolved conditional types and fixes a subtle type-resolution bug.

### **Avoid crash in getReferencedSymbolsForNode on export assignments in malformed sources** (3f37555)
Reference खोज now bails out when `export =` symbols have no parent, instead of walking into malformed module structure. This hardens document-highlighting/reference lookup against broken `.d.ts` input.

### Other misc changes
- tsconfig number parsing fix and baseline update (e7283bb)
- Hover code-block language changed from `tsx` to `typescript` plus baseline updates (e006950)
- Submodule diff triage/relocation updates (88b5b78)
