---
date: 2026-08-16
repo: microsoft/typescript-go
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "Native preview expands, editor UX improves, and watch mode hardens"
excerpt: "A busy week for TypeScript Go: new preview APIs, better LSP/editor behavior, several parser/emit fixes, and safer watch/incremental handling."
commits: 39
---

### Native preview grows into a fuller compiler surface
**Transpile and config APIs land** — The native preview added `transpileModule`, `transpileDeclaration`, and config/file parsing APIs (`parseCommandLine`, `readConfigFile`, `parseJsonConfigFileContent`), making it much more useful for tooling.

**Checker and language service capabilities expand** — `getSymbolsInScope` is now available, while several language-service operations were moved under a dedicated `LanguageService` namespace to clarify the API split.

**Safer AST and handle modeling** — Heritage clauses were split into expression vs. type forms, and native preview node handles were made more strongly typed with generic `NodeHandle` support and updated `is-*` helpers.

### Editor and LSP behavior got noticeably better
**Completions, hovers, and selection ranges improved** — Completion snippets were added for class members and auto-imports, hover now preserves JSDoc on mapped properties, and selection range generation was tightened to avoid runaway nesting.

**Rename and workspace indexing fixes** — File renames now update imports across unopened composite projects, and auto-import indexing no longer drops project-local files in symlink-heavy workspace topologies.

**Server resilience improved** — The LSP server now survives response marshaling failures instead of crashing, and it gained `--clientProcessId` support.

### Emit, parser, and diagnostic correctness fixes
**Emit and declaration generation were corrected** — `--noEmit` / `--noEmitOnError` behavior was brought back in line with `tsc`, nested declaration emit is now accounted for in incremental builds, and JSDoc function declaration emit was fixed.

**Parser edge cases and syntax validation tightened** — Changes landed for extensionless root files, `as`/`satisfies` around exponentiation, dotted private names in type queries, regex named-group duplication, and Unicode set validation.

**Diagnostics became more stable and accurate** — Diagnostics are now keyed and deduplicated by source path/location, fixing stale or duplicated results and reducing a memory regression around deprecated contextual property diagnostics.

### Watch mode and incremental compilation are more reliable
**Linux watch fallback is safer** — Fanotify failures now fall back to inotify instead of leaving the watcher stuck, with cleaner reporting for partial watch setup failures.

**Incremental watch diagnostics update correctly** — Global declaration removal now triggers downstream diagnostic refreshes, closing a stale-error gap in watch mode.

### Other misc changes
- macOS signing now adds entitlements before signing artifacts.
- Checker scheduling was rebalanced around import affinity for better parallel throughput.
- Added Android ARM64 release target.
- Various test, baseline, and internal refactor updates.
