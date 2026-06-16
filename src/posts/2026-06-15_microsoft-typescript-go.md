---
date: 2026-06-15
repo: microsoft/typescript-go
size: L
title: "Unicode casing pinned; API and emitter fixes"
excerpt: "Adds native preview import commands, fixes declaration emit and auto-import cleanup, and pins casing tables to generated Unicode data."
commits: 7
authors: [andrewbranch, piotrtomiak, a-tarasyuk, johnfav03, jakebailey]
commit_authors: {"7eb731a": andrewbranch, "c90e1d4": piotrtomiak, "d42388b": a-tarasyuk, "b8e4490": johnfav03, "f315ef9": andrewbranch, "a7ae3a1": jakebailey}
---

### **Pin JS casing to generated Unicode data** (a7ae3a1)
The JS casing tables now include simple one-rune mappings in the generated data, so casing behavior stays tied to the Unicode version shipped with the repo instead of drifting with the Go toolchain. This reduces version skew and keeps casing results predictable across environments.

### **Fix class expression naming in declaration emit** (b8e4490)
Declaration emit now handles CJS class expression exports with anonymous constructor types correctly, including name resolution for class-expression self-references during accessibility checks. This is a substantial correctness fix for `.d.ts` output around class expressions and export shapes.

### **Store API node tables on SourceFile for cached snapshots** (7eb731a)
API node tables are now stored on `SourceFile` via the data bag, letting cached source files carry their API metadata into later snapshots. That makes node handles from reused source files remain valid across snapshot updates, which is important for the native preview's incremental behavior.

### **Add native preview Sort Imports / Remove Unused Imports commands** (59ae7d0)
The VS Code extension now exposes commands for sorting imports and removing unused imports, wired through `editor.action.sourceAction` with the matching source code action kinds. This gives native preview users parity on common import-organizing actions.

### **Preserve modifier order for private JS methods in declaration emit** (d42388b)
The declaration emitter now avoids reordering modifiers when emitting private JS methods, preserving the original modifier order in generated declarations. This fixes a specific `.d.ts` emit mismatch for private static methods.

### **Fix empty string literal values in API type responses** (c90e1d4)
`TypeResponse.Value` now always serializes its `value` field, even when it is an empty string, so empty-string literal types are reported correctly over the API. This removes an ambiguity that could make literal-type data look unset.

### **Auto-import cleanup for removed node_modules buckets** (f315ef9)
The auto-import registry now drops `node_modules` buckets when they disappear, instead of leaving stale entries behind. That keeps import suggestions in sync with the actual filesystem after package directories are removed.

### Other misc changes
- API test coverage updates for snapshot caching and empty-string literals
- Declaration-emitter test baselines refreshed
- Auto-import registry tests and snapshot FS tests expanded
- Unicode casing generator and test updates
