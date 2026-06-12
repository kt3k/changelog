---
date: 2026-06-11
repo: microsoft/typescript-go
size: L
title: "API expansion, parser fixes, scanner speedups"
excerpt: "Added completions API and broader language-service fixes, plus parser/emit correctness fixes and scanner performance work."
commits: 13
authors: [weswigham, piotrtomiak, mds-ant, DanielRosenwasser, iisaduan]
commit_authors: {"42eb4d4": DanielRosenwasser, "45df665": weswigham, "4a461b7": piotrtomiak, "a58d885": piotrtomiak, "f0113b7": weswigham, "0a1ff41": iisaduan, "6038f11": weswigham, "cd961a7": mds-ant, "3b59895": mds-ant}
---

### **Completions API lands in TS Go** (4a461b7)
Added `getCompletionsAtPosition` to the native preview API, along with `CompletionInfo`, `CompletionEntry`, `CompletionOptions`, and `CompletionItemKind` plumbing. The implementation now optionally includes symbol handles for symbol-based completions, which makes completion results usable for richer tooling and editor features.

### **Parser now repairs invalid JSDoc names instead of crashing or misparsing** (f0113b7)
Non-identifier JSDoc names are now reparsed when possible, with invalid cases surfaced as `Identifier expected` errors. This tightens parsing around malformed typedefs/callbacks and avoids a class of crashes and bad AST/source-map mismatches.

### **CommonJS export duplication is deduped** (45df665)
The declaration emitter now tracks witnessed CommonJS export names and avoids emitting the same export assignment multiple times. That fixes duplicated `exports.foo = ...` output and the downstream symbol/type noise it caused.

### **Declaration emit learns a new class-property path** (6038f11)
Declaration transform now walks into class children to find `this` property assignments beyond the top level, and it can consult base declarations before deciding whether to emit them. This improves `.d.ts` generation for class properties and reduces incorrect renaming/emission in inheritance-heavy code.

### **Speculative parse-cache acquisition now releases the right file** (79fe60a)
`Program.UpdateProgram` now returns the acquired `SourceFile`, letting project code release the exact speculative parse-cache entry when a rebuild happens. This fixes a subtle cache accounting bug that could leak refcounts or leave the cache in the wrong state after updates.

### **LSP accepts null initializationOptions** (de1bb2e)
`initialize.initializationOptions` is now modeled as nullable, matching the LSP spec and accepting clients that send `null`. This makes startup more tolerant of loose or legacy clients.

### **Scanner and checker get performance wins** (cd961a7, 3b59895)
The scanner hot path was optimized with ASCII fast paths and tighter token scanning, and the checker now defers an `orderedSet` map allocation until it grows beyond 16 elements. These are runtime improvements aimed at reducing overhead in common code paths.

### **Other misc changes**
- Auto-imports no longer offer non-identifiers (42eb4d4)
- JSDoc non-identifier reparsing test coverage and enum plumbing updates (f0113b7)
- Added `IndexInfo.declaration` to the public API (a58d885)
- Extension localization support and packaging/workflow updates (0a1ff41)
- Build/import handling tweak for included `tsconfig.json` files (c7f7cb8)
- Minor async downlevel renaming fix and related tests (f83eec5)
- Nop logger helper and session null-logger fallback (79fe60a)
- Small logging, CI, and test harness adjustments (de1bb2e)
