---
date: 2026-06-02
repo: microsoft/typescript-go
size: L
title: "Filesystem watcher lands, plus key fixes"
excerpt: "Major fswatch addition and a cluster of compiler/emit fixes across JSX, async super, metadata, and tsconfig parsing."
commits: 21
authors: [ahejlsberg, jakebailey, a-tarasyuk]
commit_authors: {"95a42cf": ahejlsberg, "6c88330": ahejlsberg, "503ea95": a-tarasyuk, "704847d": jakebailey, "c0b4c4e": jakebailey, "e5f8968": ahejlsberg, "9a48038": jakebailey}
---

**fswatch package added with cross-OS CI** (c0b4c4e)
A new `internal/fswatch` package was ported in with support code, tests, docs, and workflow plumbing to run it on BSD variants in CI. This is a substantial new subsystem for file watching and a big step toward more robust watch-mode behavior.

**Decorator metadata now falls back for BigInt below ES2020** (433bc1e)
`emitDecoratorMetadata` now emits a runtime-safe `BigInt` fallback when targeting pre-ES2020 instead of always assuming `BigInt` exists. That fixes invalid output for older targets and makes decorator metadata emission safer across more compile targets.

**Async `super` handling fixed in default parameters** (bef4582)
Downlevel async transform now correctly preserves and rewrites `super` references that appear in default parameter initializers, including inside async arrow functions. This closes a real emit bug that could generate incorrect code for inheritance-heavy async patterns.

**Expando property flow analysis now reaches function expressions** (e5f8968)
Control-flow analysis was extended so dotted-name assignments on function expressions and arrows are treated like expandos instead of stopping at the variable declaration. That improves narrowing and fixes false results in scenarios involving function-valued objects with assigned properties.

**tsconfig include validation now rejects `**/../` patterns** (40f6707)
Parsing now reports the parent-traversal-after-recursive-wildcard error for include specs like `**/../*.ts`, matching expected `tsconfig` rules. The fix also avoids crashing when attaching diagnostics to missing JSON array elements.

**Syntactic errors now suppress follow-on option diagnostics** (306f69d)
`GetDiagnosticsOfAnyProgram` now stops after syntactic diagnostics when errors are already present, instead of piling on unrelated option/global/semantic diagnostics. This makes `tsc` output cleaner and closer to expected behavior in broken files.

### Other misc changes
- JSX uppercase hex entities now match `tsc` behavior (2e3f36b)
- Auto-accessor type resolution fix (95a42cf)
- JSDoc from contextual type used in hover when available (6c88330)
- CommonJS shorthand destructuring rewrite fix (90c540a)
- Incompatible function type diagnostics now use tuple labels for parameter names (336f59c)
- Namespace imports elided when only used by type-only export aliases (c4cf203)
- Enum member emit fixed for escaped identifiers (244cda9)
- Null enum values handled in tsconfig parsing (9874733)
- Async arrow `this` capture fixed in static field emit (109f18b)
- `import.defer` preserved in CommonJS emit (503ea95)
- macOS `F_GETPATH` realpath fix (704847d)
- Format selection no longer deletes comments when selection ends in trivia (eb6de00)
- VS-prefixed type naming cleanup across LSP/LS internals (9a48038)
