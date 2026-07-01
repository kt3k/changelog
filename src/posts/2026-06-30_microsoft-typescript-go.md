---
date: 2026-06-30
repo: microsoft/typescript-go
size: L
title: "API, LSP, and compiler fixes land"
excerpt: "A mix of API additions, completion/language-service fixes, and compiler correctness patches, plus a few smaller regressions addressed."
commits: 9
authors: [jakebailey, andrewbranch, johnfav03, weswigham, TorinAsakura, Vorobey31415]
commit_authors: {"1262789": Vorobey31415, "7f50707": andrewbranch, "a143d98": johnfav03, "8457ea6": jakebailey, "fe14dff": weswigham, "caf5c23": jakebailey, "90c2724": TorinAsakura}
---

### **API surface grows with enum and transport updates** (7f50707)
This batch expands the native-preview API generation to cover additional enums and string-enum handling, including `ModuleKind` and `InternalSymbolName`, so generated TypeScript mirrors Go definitions more faithfully. It also adds tests and related API shape tweaks across async/sync paths, signaling a broader stabilization of the public preview surface.

### **Lone surrogate strings are preserved end-to-end** (90c2724)
The native preview now uses a WTF-8 decoder in places that previously relied on plain UTF-8, so string literals containing lone surrogates survive round-tripping instead of being mangled. That matters for correctness when encoding nodes, msgpack payloads, and API calls that need to preserve exact source text.

### **Completion symbol lookups now stay on the API checker** (1262789)
Completion requests that include symbol handles now switch to the API checker lifetime before running, so later re-queries like `GetTypeOfSymbol` resolve against the same checker instance. This fixes a real crash where completion-produced symbols could not be safely resolved after returning from the request.

### **Const-enum elision is fixed for merged symbols** (cb1910b)
Merged symbol handling now avoids incorrectly carrying the `ConstEnumOnlyModule` flag across merges unless the target already qualifies. That prevents bad emit for cases involving const-enum-only modules and import aliases, which previously produced incorrect output.

### **Peer dependency resolution no longer dereferences nil package.json contents** (1230cf2)
The resolver now checks that a peer package.json entry actually exists before reading its contents, closing a race that could leave a cached entry with nil contents. A regression test covers the concurrent resolution path that used to panic.

### **JSDoc type-node reuse is made safer** (fe14dff)
The checker’s node-reuse logic now gates JSDoc type-node reuse through a shared compatibility check, avoiding reuse when remapping or incomplete type arguments would make the existing node unsafe. This reduces incorrect declaration output in JS/JSDoc scenarios and updates several baselines accordingly.

### **Fourslash and LS proto handling become more robust** (8457ea6)
The LS protocol layer is significantly slimmed down by switching fourslash transport/tests to JSON round-tripping and trimming generated codec bloat. The change also improves document-symbol deduping so logically identical symbols compare by value instead of pointer identity, which avoids transport-dependent test failures.

### **Formatting now handles dotted JSX tag names with hyphens** (a143d98)
The formatter rescans the leftmost part of dotted JSX tag names as an identifier when needed, which fixes cases like `<a-b.c>` that used to format incorrectly. A targeted fourslash test locks in the behavior.

### **Symbol reuse in string enums and encoder generation** (7f50707)
The enum generator now understands string enums and value replacements, enabling correct emission for internal symbol names that use escaped sentinels. This keeps generated preview enums aligned with Go’s internal naming scheme and supports the broader API changes in the same batch.

### Other misc changes
- Fix fswatch on Windows (caf5c23)
- Formatting cleanup for dotted tag names (a143d98)
- Minor API/session and resolver tests
- Internal refactors and generator tweaks
