---
date: 2026-06-14
repo: microsoft/typescript-go
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "TypeScript-Go adds completion APIs, watcher backend, and Unicode fixes"
excerpt: "A big week of API growth, stronger declaration emit, better file watching, and multiple parser/checker crash fixes."
commits: 41
---

### Major API expansion for editors and tooling
**New native-preview language service endpoints** — Added find references, signature usage, and completions APIs, along with the supporting client types and symbol-handle plumbing. This is the week’s biggest surface-area expansion and makes the preview compiler much more useful for editor integrations.

**Diagnostics now return UTF-16 positions** — Diagnostic locations are now converted to editor-friendly UTF-16 offsets before being returned, fixing misreported spans around Unicode text.

### Reliability and correctness fixes across parser, checker, and config loading
**Unicode semantics now match JavaScript more closely** — The scanner and checker switched to JS-compatible casing and identifier tables, fixing non-ASCII identifier classification, intrinsic string mappings, and surrogate-pair behavior.

**Several crashers and recursion bugs were fixed** — Addressed panics and stack overflows in rename across solution configs, `extends: null`, invalid JSDoc names, recursive type resolution, `TypeToString`, and speculative parse-cache updates.

**tsconfig validation is stricter and clearer** — Missing entries under `files` are now reported, inherited config parse errors surface properly, and malformed `extends` chains no longer fail silently.

### Declaration emit got a broad cleanup pass
**More complete `.d.ts` output** — Declaration emit now preserves more JSDoc text, dedupes CommonJS export assignments, follows triple-slash references across referenced projects, and handles additional expando/class-property cases correctly.

**Better diagnostics during emit** — New declaration paths now set up symbol-accessibility diagnostics for additional JS patterns like `object.defineProperty` and expando assignments.

### Watch mode and language service performance improved
**New watcher backend powers LSP and CLI watch mode** — The server can use native recursive watchers on Windows and macOS, and CLI watch mode was rebuilt on the new fswatch layer with proper cancellation support.

**Checker and scanner hot paths were optimized** — Scanner ASCII fast paths and tighter token scanning improve common-case performance, while checker allocations are deferred and idle language-service checkers now time out when unused.

### Other misc changes
- API enum emission switched away from `const enum` for the native preview package
- Added `Program.GetCheckerPool()` and `IndexInfo.declaration` to the public API
- Auto-imports no longer suggest non-identifiers
- LSP `initializationOptions` now accepts `null`
- Various CI, workflow, baseline, and test updates
