---
date: 2026-08-02
repo: microsoft/typescript-go
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "TypeScript sharpens watch mode, LS stability, and checker speed"
excerpt: "A week of performance work, crash fixes, and tsconfig/LSP polish across watching, narrowing, rename, and quick info."
commits: 31
---

### Watch mode and language service get noticeably leaner
**Watcher and diagnostics churn were reduced** — File watches now ignore irrelevant events, build watch tracks desired directories more directly, and config diagnostics republish correctly after on-disk changes. The LSP also gained experimental flaky-diagnostics tracking via startup init.

**Big editor operations use less memory** — Go-to-implementation no longer accumulates quadratic memory in large result sets, and file-rename handling avoids repeated rescans on unresolved imports. These changes target large-project responsiveness and OOM risk.

### Checker and quick info fixes improve correctness and stability
**Type narrowing and reuse got smarter** — Equality/switch narrowing was optimized, while program reuse now accounts for module-resolution mode changes so stale programs are less likely to be reused incorrectly.

**Several crashers were fixed** — Signature help no longer trips over recovered JSX, hover JSDoc lookup breaks cyclic inheritance safely, and self-referential `for...of` patterns no longer overflow recursion.

**Diagnostics are more accurate** — Deprecated contextual props now surface in JSX and object literals, and reserved type-assertion syntax in `.mts`/`.cts` now reliably reports TS7059.

### Config parsing, import rewriting, and formatting were tightened up
**tsconfig feedback is friendlier and more precise** — Unknown options now regain spelling suggestions, top-level compiler options are explicitly reported, and TS5092 points at the correct location again.

**Import rewriting and formatting edge cases were fixed** — Dynamic import specifiers are now rewritten in CJS output, and the formatter handles parser-recovered member lists without crashing.

### Other misc changes
**Internal refactors and maintenance** — AST/layout generation cleanups, removal of dead classifiable-name tracking, parse/bind work reductions, test baseline updates, and a small checker allocation optimization on composite mappers.
