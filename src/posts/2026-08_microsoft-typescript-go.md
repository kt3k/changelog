---
date: 2026-08-31
repo: microsoft/typescript-go
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Native preview expands while compiler and LSP get steadier"
excerpt: "August brought major native-preview API growth, broader editor tooling, and a wave of correctness and crash fixes across emit, watch, and type checking."
commits: 70
---

### **Native preview/API surface grows substantially**
The month’s biggest thread was a broad expansion of the native preview and checker APIs. New entry points covered transpilation, config parsing, symbol lookup in scope, fully qualified names, source-file symbols, diagnostics over file arrays, and internal node formatting helpers. A separate pass moved several language-service operations under a dedicated namespace, and the repo began generating the TypeScript API directly from Go source to reduce drift between internals and the exposed surface.

### **Editor/LSP workflows got materially better**
Several user-facing language server fixes landed together: workspace symbol requests are now scoped to the active project, selection ranges are capped and made more relevant, and the server survives marshaling failures instead of dying. Rename and hover behavior improved too, including import updates across unopened composite projects, better JSDoc preservation in hovers, and a crash fix for self-reexported generic namespaces. The VS Code extension also gained content-mapper support and improved TSDK resolution for npm aliases.

### **Compiler correctness and emit fixes piled up**
Emit and declaration generation saw a steady set of correctness fixes: false symlink mapping in declaration emit, better handling of JSDoc-defined functions and multiline JSDoc literal types, preservation of computed enum names, and safer treatment of private names in type queries. `--noEmit`/`--noEmitOnError` behavior was restored to match `tsc` more closely, arrow-body downleveling stopped dropping comments, and nested declaration emit was accounted for in incremental builds.

### **Type checking and flow analysis became more robust**
The checker picked up several nontrivial fixes around circular and deeply nested types, optionality stripping under `exactOptionalPropertyTypes`, and diagnostics keyed by source path instead of file object identity. Variance computation now handles circularity more safely, recursion identity handling was tightened, and deprecated-property diagnostics were deduplicated to address a memory regression. JSDoc `@augments` checks also switched to semantic type comparison to reduce false mismatches.

### **Watch mode, parsing, and runtime stability improved**
Watch mode got a set of resilience fixes: Linux fanotify now falls back to inotify, watcher shutdown races no longer panic, and diagnostics refresh when global declarations disappear. Parsing was hardened for extensionless roots, tricky `await` context cases, `as`/`satisfies` around exponentiation, and regex feature gating by target. The compiler also fixed a crash in flow analysis when a `for` initializer throws.

### Other misc changes
- macOS signing now adds entitlements before signing; a few macOS path/signing fixes followed.
- Added Android ARM64 release target.
- Small protocol, test, baseline, and generated-code updates throughout.
- Closure notice added to the README near month-end.
