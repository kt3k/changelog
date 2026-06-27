---
date: 2026-06-26
repo: microsoft/typescript-go
size: L
title: "TypeScript-Go tightens declarations and watchers"
excerpt: "Declaration emit, watch behavior, API typing, and LSP parsing all saw meaningful fixes; dependencies were also refreshed."
commits: 9
authors: [jakebailey, andrewbranch, piotrtomiak]
commit_authors: {"6237334": jakebailey, "efea2d8": andrewbranch, "fb246e8": jakebailey, "b55309c": jakebailey, "83743e9": jakebailey, "ba6e20b": andrewbranch, "582e066": piotrtomiak}
---

### **Declaration emit now skips redundant `this` expando properties** (5a4eb5e)
The compiler now mirrors `tsc` more closely when deciding whether a JS `this.foo = ...` assignment should appear in declaration output. If an `extends` base already provides the same member shape, or the base member is an accessor/method, the declaration emit skips the synthesized property to avoid redundant or misleading `.d.ts` output.

### **Watcher backend now supports batching and shared FSEvents streams** (fb246e8)
The watch manager gained multi-directory watch support, and the macOS FSEvents backend now reuses shared streams instead of creating redundant ones. This reduces overhead and lays the groundwork for more efficient watch setups, especially when many directories are being monitored.

### **FSEvents coalescing was fixed for large watch graphs** (b55309c)
Watch event coalescing was adjusted so FSEvents behaves correctly under heavy recursive watch workloads. That matters for large dependency trees, where missed or over-coalesced updates can otherwise cause flaky rebuild behavior.

### **JS doc modifier parsing no longer spuriously errors on object literals** (35704c2)
The parser now avoids treating JSDoc modifiers like `@override` and `@readonly` as class-member modifiers when reparsing object literal members. This removes false grammar errors while preserving semantic validation for real class members.

### **Duplicate source file tracking no longer over-counts case-only imports** (efea2d8)
The file parser now records case-only duplicate imports once per distinct casing instead of once per import site. That fixes a refcount bug that could delete a still-live parse-cache entry and panic later when the program tries to reuse it.

### **Native preview API typing was tightened and expanded** (ba6e20b, 582e066)
The async/sync TypeScript API now uses narrower subtype-specific parameters and return types, improving client-side safety. It also adds direct accessors for conditional type true/false branches, plus stricter caching around those lookups.

### **LSP pull diagnostics got identifier/label support** (83743e9)
The server now sets the pull diagnostic identifier name and enables `labelDetailsSupport`, aligning its LSP behavior with newer client expectations.

### Other misc changes
- Dependency bumps and regenerated outputs (6237334)
- Minor internal API and parser plumbing updates
