---
date: 2026-07-27
repo: microsoft/typescript-go
size: M
title: "TS fixes span dynamic imports, tsconfig, rename perf"
excerpt: "A mix of compiler correctness fixes, formatting stability work, faster file rename handling, and AST/parser refactors."
commits: 10
authors: [jakebailey, johnfav03, Andarist, camc314]
commit_authors: {"7815442": johnfav03, "70c2f5e": jakebailey, "2b0fe1c": jakebailey, "1515af7": johnfav03, "19b6d56": Andarist, "c3a0059": jakebailey, "f209df3": camc314}
---

### **Dynamic import specifiers now get rewritten in CJS** (70c2f5e)
The CJS module transformer now visits the first argument to `import()`, so relative specifiers produced by expressions can be rewritten alongside static imports. This fixes a correctness gap in `rewriteRelativeImportExtensions` for dynamic imports in CommonJS output.

### **File rename avoids quadratic work on repeated unresolved imports** (1515af7)
`GetEditsForFileRename` now precomputes moved files and passes that context through import updating, avoiding rescanning every file once per duplicate unresolved import. That removes a pathological O(imports × files) slowdown on large projects.

### **Formatter is more robust on parser-recovered member lists** (19b6d56)
The formatter now treats error-bearing member list elements specially instead of trying to re-derive indentation from grammar-error nodes. This fixes a crash when formatting interfaces that contain recovered template literals or other malformed syntax.

### **Unknown tsconfig options regain spelling suggestions** (e0e361b)
Unknown-option diagnostics now consult spelling suggestions and can emit a “did you mean” message for both command-line and config-file parsing. The change restores friendlier guidance for misspelled compiler options.

### **Top-level compiler options in tsconfig are reported explicitly** (7a36206)
If a compiler option appears at the root of `tsconfig.json` instead of under `compilerOptions`, the parser now emits a dedicated diagnostic for it. That makes a common config mistake easier to spot and correct.

### **TS5092 source locations are preserved again** (6a6b8f3)
The tsconfig parser now points TS5092 at the right location when the config root isn’t an object. This is a diagnostic-quality fix, but it improves the usefulness of the error significantly.

### **TS7059 is emitted for reserved type-assertion syntax in .mts/.cts** (f209df3)
The checker now reports the reserved-syntax diagnostic when type assertions appear in `.mts` or `.cts` files, matching the intended module-format restrictions. The updated baselines show the compiler now surfaces the additional errors in all affected scenarios.

### **AST layout was reorganized to remove duplicate fields** (c3a0059)
The generated AST type definitions were reshuffled to separate declaration branding from other base interfaces and eliminate duplicated fields. This is a structural refactor that keeps the Go and preview AST models aligned, but it doesn’t appear to change user-facing behavior directly.

### Other misc changes
- AST/parser/printer internal refactors to support lazy source-file identifier collection (`2b0fe1c`)
- README watcher status update (`7815442`)
- Formatting/manual test baseline adjustments for a parser-recovered template-literal crash (`19b6d56`)
- Tsconfig parsing and tsc test coverage updates for the new diagnostics (`e0e361b`, `7a36206`, `6a6b8f3`)
- Minor baseline/test maintenance around the TS7059 and rename fixes (`f209df3`, `1515af7`)
