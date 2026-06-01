---
date: 2026-04-21
repo: microsoft/typescript-go
size: L
title: "Crash fixes and hover/resolution polish"
excerpt: "Multiple crash fixes landed across hover, token lookup, module resolution, and LSP behavior, plus one Unicode bug fix."
commits: 10
authors: [jakebailey]
commit_authors: {"21b262e": jakebailey, "ef89a24": jakebailey}
---

### **Fix invalid UTF-8 line/character mapping** (2de4a3f)
`LineAndCharacterToPosition` now scans with `utf8.DecodeRuneInString`, so malformed UTF-8 advances by its real byte size instead of `utf8.RuneLen(RuneError)`'s 3-byte assumption. This fixes incorrect offsets for invalid sequences and tightens the LSP position conversion path.

### **Fix declaration-space crash for merged export assignments** (39c4ad2)
The checker now only treats export-assigned entity-name expressions as aliases when the symbol is actually marked alias. That avoids a crash while resolving declaration spaces for merged symbols that resolve to an export assignment.

### **Mark opened files changed when didOpen text differs from disk** (21b262e)
The project/session logic now detects when a `didOpen` payload doesn't match the on-disk contents and marks the file as changed. This prevents stale program state and fixes a crash path in semantic tokens when CRLF editor text diverges from LF-loaded source.

### **Fix hover type-argument preservation and related crashes** (6b8645e, ef89a24, 60169b3)
Hover/quickinfo generation was refactored to preserve type arguments for qualified names and instantiation-like expressions instead of silently dropping them. The day also includes crash fixes for hovering namespace/interface heritage cases and for empty-enum verbosity handling.

### **Fix token lookup on reparsed subtrees** (6b79498)
`getTokenAtPosition` now avoids using reparsed nodes as the previous subtree and skips reparsed list members when choosing a preceding token. That closes a crash when token navigation walks updated syntax trees.

### **Fix paths resolution for `.d.ts` via `.ts` extension** (9d97c2f)
Module resolution now tracks when an extension comes from config-driven paths/package resolution rather than the source specifier, preventing the checker from misclassifying it as a TS extension from the import text. This fixes a crash in `paths` mappings that point at declaration files through `.ts`-style substitutions.

### Other misc changes
- Baseline triage and accepted baseline moves.
- Semantic tokens temporarily disabled in the server.
- Added regression tests and baseline updates for hover/completion/resolution edge cases.
