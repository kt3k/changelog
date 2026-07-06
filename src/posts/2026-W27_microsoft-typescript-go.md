---
date: 2026-07-05
repo: microsoft/typescript-go
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "Native preview matures with timing, API, and compiler fixes"
excerpt: "A busy week for typescript-go: expanded native-preview APIs, request timing, stronger emit/resolution correctness, and faster AST traversal."
commits: 39
---

### **Native preview API expands and gets more observable**
The preview surface grew in several directions: `CompilerOptions` is now a real typed API object, JSDoc tag helpers were ported over, and enum/string-enum generation was broadened to better mirror Go-side definitions. The API also gained request timing collection with round-trip, transport, and server processing metrics, plus reset support for profiling client/server behavior.

### **Compiler correctness improved across emit, types, and diagnostics**
Several fixes tightened core compiler behavior. Conditional type base-constraint recursion now has a guard to prevent runaway expansion, declaration emit prefers `typeof` for function-valued aliases, and merged symbol handling no longer leaks `ConstEnumOnlyModule` in bad cases. The week also brought safer JSDoc node reuse, more precise isolated-declarations diagnostics, and a reenabled consistency check pass around pre/post-emit diagnostics.

### **Resolution and filesystem watching became more robust**
Module resolution and watching saw important stability work: project-reference redirection now works through symlinked subpaths, peer dependency resolution avoids nil `package.json` dereferences, and `fswatch` coalescing/state handling was tightened to reduce missed or stale events. Build invalidation also became more accurate by tracking `package.json` inputs in up-to-date checks.

### **AST traversal and editor-facing behavior were optimized**
Child traversal was devirtualized for speed, keeping visitor closures and iterators cheaper in hot paths. Remote-node traversal also fixed a double-visit bug for array children, while completion symbol lookups now stay bound to the API checker to avoid crashes when symbols are re-queried after a request. Signature help and symbol printing were cleaned up to stop leaking internal marker names.

### **LSP, formatting, and tests were tightened up**
The LS protocol layer was simplified by moving fourslash transport to JSON round-tripping, and document-symbol handling now dedupes by value rather than pointer identity. Formatting was corrected for dotted JSX tag names with hyphens, lone-surrogate strings now survive round-tripping via WTF-8 decoding, and snapshot responses were hardened to skip unloaded placeholders.

### Other misc changes
Minor API/session refactors, baseline updates, Windows fswatch fixes, JSDoc whitespace cleanup, quick info churn, and assorted test harness and generator tweaks.
