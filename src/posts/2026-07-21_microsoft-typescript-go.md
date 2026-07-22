---
date: 2026-07-21
repo: microsoft/typescript-go
size: L
title: "API expansion and checker fixes land"
excerpt: "Major checker correctness and API surface updates, plus a handful of LSP/JSX fixes."
commits: 9
authors: [ahejlsberg, KlyneChrysler, andrewbranch, mrazauskas]
commit_authors: {"dc8e6a8": ahejlsberg, "cc49daf": KlyneChrysler, "90b40e8": ahejlsberg, "ee860ff": ahejlsberg, "351840b": andrewbranch, "e583b96": mrazauskas}
---

### **API surface grows with type helpers and config references** (351840b)
The native-preview API now exposes `CheckFlags` and adds convenience methods for fetching properties, signatures, index infos, and type parameters without re-implementing the protocol plumbing. It also caches more consistently, which should reduce repeated lookups and make the API more ergonomic for clients.

### **Inference now orders candidates by type depth more safely** (90b40e8)
Inference was reworked to sort matching types by depth instead of tracking per-candidate depth state, simplifying the algorithm and changing how candidates are accumulated. This should improve correctness in nested generic inference and avoid the previous depth bookkeeping pitfalls.

### **Union construction is optimized for large type sets** (ee860ff)
Union building was refactored to collect, sort, and deduplicate types more efficiently, rather than inserting incrementally. The change should reduce overhead in hot checker paths while preserving union semantics.

### **Crash fix for JS type aliases during CJS declaration emit** (01cbcdd)
`hasTypeAnnotation` now excludes type alias declarations, including `JSTypeAliasDeclaration`, so they won't be misidentified as value annotations. This fixes a crash during CommonJS declaration emit when JS typedefs merge with module export properties.

### **JSX importSource resolution now works in checked JavaScript** (42bb833)
The compiler now treats checked JavaScript files like JSX files when deciding whether to inject the JSX runtime import. That unblocks `jsxImportSource`-based JSX in `// @checkJs` projects.

### **Control-flow constructor matching catches more valid accesses** (dc8e6a8)
Constructor-reference matching now recognizes both property access and string-literal element access for `.constructor`. This tightens control-flow narrowing and fixes an over-eager mismatch in circularity-related analysis.

### **Semantic tokens use canonical library paths** (cc49daf)
Default-library detection for semantic tokens now uses canonical source-file paths instead of raw filenames. That fixes missed `defaultLibrary` modifiers on case-insensitive filesystems.

### **Native-preview config parsing now includes project references** (e583b96)
Parsed config responses now surface `projectReferences`, including normalized and original paths plus circularity markers. The async and sync API tests were updated to assert the new data comes through correctly.

### **Other misc changes**
- Native-preview enum generation updated to include `CheckFlags`.
- Native-preview API/proto plumbing expanded for the new config fields and exports.
- Native-preview tests added for the new config parsing behavior.
- Symlink handling for native-preview tsdk resolution improved in extension utilities.
