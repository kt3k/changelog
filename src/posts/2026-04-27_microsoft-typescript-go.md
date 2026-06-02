---
date: 2026-04-27
repo: microsoft/typescript-go
size: L
title: "JS declarations and IDE fixes land"
excerpt: "Large day for TypeScript-Go: declaration emit grows smarter, quick info improves for optional members, and several crash fixes land."
commits: 7
authors: [ahejlsberg, Andarist, a-tarasyuk, weswigham, gabritto]
commit_authors: {"6bf24cc": a-tarasyuk, "b5cece1": ahejlsberg, "34cf1ba": weswigham, "f549afa": ahejlsberg, "463a747": gabritto, "78b1ba1": Andarist, "c5039e6": Andarist}
---

### **JS declaration emit now tracks `this` assignments and `require()` forms** (34cf1ba)
Declaration emit was expanded to collect `this.x` assignments from constructors and static blocks, and to rewrite common `require()` patterns into equivalent TS declarations. This improves the fidelity of generated `.d.ts` output for JavaScript sources, especially around CommonJS interop and class member inference.

### **Quick info now shows optional member signatures correctly** (f549afa)
Hover/signature display for optional members was tightened up so getters, setters, overloaded members, and optional call signatures present more accurate information. The update also removes a set of previously failing quick-info cases, which should translate into fewer misleading hovers in editors.

### **Reparse JSDoc annotations on getter accessors** (b5cece1)
The parser now preserves JSDoc type annotations for `get` accessors during reparse, instead of dropping or misreading them. That fixes a class of JS declaration reuse bugs where accessor types were previously emitted incorrectly.

### **Prevent signature-help panic on `import.defer`** (6bf24cc)
Signature help now bails out to the untyped-call path for `import.defer(...)`, avoiding a panic in the checker. This is a targeted stability fix for an editor-facing feature that could otherwise crash on a valid call form.

### **Fix rename on unresolved reexports** (78b1ba1)
Rename handling no longer assumes the original symbol is always present when expanding reexported names. That closes a panic path and keeps rename working on unresolved reexports by preserving the needed `as` aliasing.

### **Fix go-to-implementation crashes on invalid CommonJS exports** (c5039e6)
Go-to-implementation now stops cleanly when it encounters a missing imported symbol while tracing exports, instead of crashing. The new tests cover several malformed or unreachable export/reexport shapes in both TS and JS.

### **Refresh diagnostics after folder deletions more reliably** (463a747)
File open/close/save no longer unconditionally cancel diagnostics refresh, which fixes a missed-refresh bug around deleting sibling folders. The session tests show diagnostics still get refreshed after folder removal, including when other files are opened afterward.

### Other misc changes
- Repaired a manual fourslash test list entry for quick-info coverage.
- Minor internal cleanup and baseline updates around JSDoc/hover tests.
