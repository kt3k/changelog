---
date: 2026-05-05
repo: microsoft/typescript-go
size: L
title: "Inference and declaration emit fixes land"
excerpt: "Several bug fixes improve type inference, isolatedDeclarations, and declaration emit correctness; one printer panic fix rounds out the day."
commits: 7
authors: [jakebailey]
commit_authors: {"3fef754": jakebailey}
---

### **Fix inference from `never` into union targets** (ee4225a)
Type inference now handles union sources and targets more precisely, including cases where the source is `never` or another union. This fixes a misinference bug that could choose the wrong `const` generic branch and produce incorrect results for APIs relying on union matching.

### **Fix isolatedDeclarations for arrow functions with default params** (eca51a3)
The pseudochecker now tracks required parameter positions more accurately when emitting parameter types, especially for defaults and optional/rest combinations. That closes an `isolatedDeclarations` gap where arrow functions with default parameters could be reported incorrectly.

### **Preserve trailing commas in declaration-emitted array binding patterns** (23ec44f)
Declaration emit now keeps trailing commas in array binding patterns when transforming destructuring signatures. This is a small but important correctness fix for `.d.ts` output, avoiding churn and preserving the intended shape of tuple-binding declarations.

### **Fix nested signature scoping in return type serialization** (3fef754)
Return-type serialization now enters a dedicated signature scope before building the output node. That prevents type parameter shadowing/renaming mistakes in nested generic declarations, which showed up in several declaration-emit baselines.

### **Do not treat typed `{}` initializers as expando objects** (fdfe96e)
The binder and AST utility logic now require an empty object literal to be untyped before it is treated as an expando initializer in JS files. This avoids incorrectly attaching expando members to variables or properties that already have an explicit type annotation.

### **Fix multi-byte rune handling in change tracking** (2a41760)
The printer’s trailing-whitespace trim logic now uses `utf8.DecodeLastRuneInString`, so `setLastNonTriviaPosition` no longer miscomputes offsets on multi-byte text. This is a correctness fix for emitted text position tracking.

### **Fix JSX whitespace-only text panic in change tracking** (3b78168)
Whitespace-only JSX text no longer triggers an index-out-of-range panic while emitting tracked changes. The added fourslash test locks in the regression fix for `isolatedDeclarations`/declaration workflows.

### Other misc changes
- No-op test baseline updates for the above fixes
- Minor internal refactorings in declaration emit and printer code
