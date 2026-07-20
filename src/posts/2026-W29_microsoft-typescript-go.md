---
date: 2026-07-19
repo: microsoft/typescript-go
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "TypeScript-Go adds IPC APIs and tightens checker stability"
excerpt: "New IPC tooling APIs landed alongside multiple checker, emit, hover, and crash fixes, with watch mode skipping no-op rebuilds."
commits: 18
---

### **Tooling APIs expanded over IPC**
Native-preview clients can now request import edits directly via `getImportEditsForSymbols` / `getImportAdderEdits`, and a new `runWithTemporaryFileUpdate` API lets callers apply temporary snapshot edits for one-off analysis. Both changes were wired through async/sync clients and session/proto plumbing, making the server more useful for tooling and editor integrations.

### **Checker correctness improved across a broad set of edge cases**
Several fixes landed to reduce spurious diagnostics and missed reference tracking: `markLinkedReferences` now bails out in more grammar-error and intentionally-unresolved contexts, deferred checker diagnostics are always reported, and unused-reference accounting was corrected for self-referential enums and namespaces. The nullish-coalescing analyzer also got a TS2871 false-positive fix.

### **Emit and module-resolution issues were fixed**
Declaration emit no longer crashes for exported arrow/function expressions with external names, and it now handles extensionless `import()` specifiers correctly under `allowImportingTsExtensions` + `nodenext` by falling back to the default resolution mode. These changes close real `.d.ts` generation failures and improve compatibility with modern module setups.

### **Hover, signature help, and formatting became more robust**
Hover responses now support richer VS-specific content with symbols, icons, and colorized text. At the same time, a type-expansion recursion guard prevents hover stack overflows, signature help avoids a nil pointer on recovered parameter types, and range formatting no longer panics when selections start inside JSDoc.

### **Watch mode avoids unnecessary rebuilds**
File change events are now checked against on-disk content before dirtying the program, so no-op watch notifications won’t trigger rebuilds. That should cut down on churn without affecting real edits.

### Other misc changes
- Minor `RemoteNodeArray` performance tweak
- New helper for walking multiple ancestor predicates in one pass
- Updated baselines, fourslash coverage, and internal refactors
