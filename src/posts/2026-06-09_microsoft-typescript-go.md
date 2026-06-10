---
date: 2026-06-09
repo: microsoft/typescript-go
size: L
title: "API expansion, emit fixes, and parser bugs"
excerpt: "New language-service APIs land alongside fixes for declaration emit, top-level await reparsing, missing tsconfig files, and more."
commits: 8
authors: [ahejlsberg, a-tarasyuk, andrewbranch, navya9singh, iisaduan]
commit_authors: {"f20e919": a-tarasyuk, "45ae270": ahejlsberg, "00960bf": andrewbranch, "f9eeee2": navya9singh, "2b66515": ahejlsberg, "2b9bd9c": iisaduan}
---

### **Find all references and signature usage APIs added** (f9eeee2)
The native preview API now exposes endpoints for finding references in a file, grouping referenced symbols for a node, and collecting signature usages. This is a substantial surface-area expansion for tooling built on the preview compiler, and it comes with new async/sync client methods plus tests.

### **Declaration emit now preserves more JSDoc descriptions** (f20e919)
Declaration transforms were updated to retain partial JSDoc text for reparsed property signatures, and hover comment extraction now uses a dedicated JSDoc comment reader. This improves emitted `.d.ts` quality and keeps descriptions attached to exported APIs more reliably.

### **Top-level await reparsing no longer trips on following `@typedef`** (45ae270)
The parser’s top-level await reparse logic was corrected to compare against the previous await span more carefully. This fixes a JS parsing edge case where a trailing `@typedef` could confuse reparsing and skew symbol/type information.

### **Triple-slash references are emitted for referenced-project sources** (660c4e8)
Declaration emit now follows resolved-module source lookup when expanding triple-slash references across project boundaries, so referenced TS sources are represented correctly in build output. The new regression test shows a referenced project building cleanly with the expected emitted declaration behavior.

### **Type stringification now has a recursion limiter** (2b66515)
The checker gained a serialization depth guard to prevent runaway `TypeToString` recursion, along with plumbing changes to route diagnostics through helper methods. This is a correctness and stability fix for pathological type shapes that could previously recurse too deeply.

### **`files` entries in tsconfig are now validated as existing files** (2b9bd9c)
Config file loading now reports missing inputs listed under `files`, including extensionless paths and extended config scenarios. That closes a long-standing gap where broken project references could slip through without a clear file-missing error.

### **Null `extends` in tsconfig no longer panics** (f05477a)
The config parser now handles `extends: null` by returning proper diagnostics instead of crashing. This turns a parser panic into a recoverable user-facing error.

### Other misc changes
- Darwin-only kqueue lint cleanup (00960bf)
