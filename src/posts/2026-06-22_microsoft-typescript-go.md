---
date: 2026-06-22
repo: microsoft/typescript-go
size: L
title: "TypeScript-Go fixes parsing, watchs, and APIs"
excerpt: "Big reliability and API cleanup day: tsconfig diagnostics, symlinked watches, safer config parsing, and richer literal type APIs."
commits: 8
authors: [oMatheusmol, DanielRosenwasser, mds-ant, jakebailey, a-tarasyuk]
commit_authors: {"9415beb": oMatheusmol, "481a4aa": DanielRosenwasser, "6a0ce63": mds-ant, "52ef010": jakebailey, "997b92a": a-tarasyuk}
---

### **Config parsing diagnostics now surface on project creation** (997b92a)
`GetProjectDiagnostics` now includes tsconfig parsing errors alongside program/global diagnostics, and the harness/test coverage was updated to expect them. This means invalid config options show up earlier in editor and project diagnostics instead of being dropped on the floor.

### **Watch roots follow symlinks without losing logical paths** (133d33a)
The file watcher stack was reworked to handle symlinked/reparse-point watch roots by subscribing to the physical target while reporting events under the caller’s path. That closes a real watch correctness gap for symlinked directories across backends and LSP integration.

### **Config extends no longer panic on non-string path entries** (9415beb)
`tsconfig` extends-handling now checks that `include`/`exclude`/`files` array entries are strings before treating them like paths, preventing crashes on malformed inherited configs. The fix also tightens coverage for mixed valid and invalid entries so the compiler reports an error instead of panicking.

### **Native Preview API now exposes concrete literal subtypes** (a844752)
The preview API adds `StringLiteralType`, `NumberLiteralType`, `BigIntLiteralType`, and `BooleanLiteralType`, and decodes bigint literal values back into real `bigint`s over the wire. This makes the type API more precise and fixes consumers that need to distinguish literal kinds without unsafe casting.

### **Extension warns when other extensions’ tsserver plugins will be ignored** (481a4aa)
When Native Preview is enabled globally, the VS Code extension now detects conflicting tsserver plugins from other extensions and warns the user, with options to disable Native Preview in the workspace or dismiss the warning. This helps explain “missing plugin” behavior and reduces configuration confusion.

### **Parser skips unnecessary speculative type-argument parsing** (6a0ce63)
`tryParseTypeArgumentsInExpression` now bails out early unless the current token could actually start a type-argument list, avoiding pointless mark/rewind work. It’s a small performance and clarity improvement in a hot parser path.

### **Generated `Is*` guards were fixed for type-parameter nodes** (52ef010)
AST code generation simplified the `Is*` switch generation and corrected the emitted guards for type-parameter-kinded nodes. The generated file shrank substantially, indicating a cleanup of overly verbose and potentially incorrect generated cases.

### **Other misc changes**
- Dependency bump: `actions/checkout` updated to v7.0.0 in GitHub workflows (1 commit)
