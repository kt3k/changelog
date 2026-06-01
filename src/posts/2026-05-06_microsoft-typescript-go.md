---
date: 2026-05-06
repo: microsoft/typescript-go
size: M
title: "Diagnostics, watchers, and JS docs tightened"
excerpt: "Fixes a JSDoc mismatch diagnostic, removes an LSP hang, speeds scope cloning, and updates JS docs around constructor functions."
commits: 5
authors: [jakebailey, sandersn]
commit_authors: {"1e58c84": jakebailey, "763092d": jakebailey, "20d34b5": sandersn}
---

### **Fix JSDoc `@extends` mismatch diagnostics for property access bases** (18f93b8)
The checker now compares the identifier names extracted from `@extends` and the actual `extends` clause, instead of only handling plain identifiers. This makes the mismatch diagnostic fire correctly for property-access bases like `React.Component` vs `React.PureComponent`.

### **Fix server hang after scheduled diagnostics refresh** (095aa2f)
`RefreshDiagnostics` now sends the workspace diagnostic refresh request fire-and-forget, avoiding a wait on a client response that is expected to be null. The watch/session code also adds per-request timeouts and rollback handling so watch registration stays consistent even if a client call stalls or fails.

### **Optimize type variable scope map cloning with CoW** (1e58c84)
Type parameter bookkeeping in the node builder was converted from ad hoc mutable maps/sets to copy-on-write collections. This trims cloning overhead in scope-heavy paths and simplifies the state management used while generating names and tracking visited symbols.

### Other misc changes
- Fixed a flaky pnpm-style symlink test in auto-import registry coverage (763092d)
- Updated JavaScript documentation and CHANGES.md guidance around constructor functions and removed Closure-era examples (20d34b5)
