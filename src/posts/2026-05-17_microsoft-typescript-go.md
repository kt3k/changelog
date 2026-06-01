---
date: 2026-05-17
repo: microsoft/typescript-go
size: L
title: "Four crash fixes in the checker and printer"
excerpt: "Patches harden JSDoc handling, tuple inference, and JSX printing to avoid panics during recovery and type checking."
commits: 4
---

### **Fix tuple-rest inference crash** (d846405)
The checker now guards against `getElementTypeOfSliceOfTupleType` returning nil when variadic tuple inference consumes the entire source tuple. This prevents a crash in patterns like `[..., rest, ...T]` and `[..., T, ...rest]` when `T` is constrained to a fixed-length tuple.

### **Fix panic on invalid JSX attribute recovery** (d0382ab)
The printer no longer panics when it encounters an unexpected JSX attribute value during error recovery; it falls back to emitting the expression instead. That makes malformed JSX more robust to parse/print instead of crashing the compiler.

### **Fix JSDoc `@augments`/`@extends` crash on empty extends clauses** (bb0fabc)
Grammar checking now skips JSDoc inheritance validation when a class has no `extends` type node, avoiding a nil dereference on `extends {}`. This keeps `@augments`/`@extends` comments from turning a syntax error into a compiler panic.

### **Fix `@this` inside `@typedef` JSDoc crash** (6a088fb)
JSDoc node copying and reparsing now ignore non-`@property`/`@param` tags while rebuilding `JSDocTypeLiteral` members. That prevents `@this` tags embedded in `@typedef` comments from tripping recovery logic and crashing the compiler.

### Other misc changes
- Added regression tests and baseline updates for the four crash fixes.
