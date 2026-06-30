---
date: 2026-06-29
repo: microsoft/typescript-go
size: L
title: "Build checks, AST dispatch, and type fixes"
excerpt: "Conditional type recursion is capped, build up-to-date checks now track package.jsons, and AST traversal/signature help bugs were fixed."
commits: 6
authors: [jakebailey, ahejlsberg]
commit_authors: {"288f23d": ahejlsberg, "042a471": jakebailey, "e190472": jakebailey, "04c7848": jakebailey}
---

### **Build up-to-date checks now track package.json inputs** (042a471)
The incremental/build pipeline now consults package.json cache entries when deciding whether outputs are stale, so dependency/package metadata changes can trigger the right rebuilds. This tightens up up-to-date detection around project references and dependency updates.

### **Conditional type base-constraint recursion is capped** (288f23d)
`computeBaseConstraint` now routes conditional types through a dedicated constraint path with a recursion-depth guard, preventing runaway base-constraint expansion on distributive conditionals. This addresses a real compiler correctness/stability issue around deeply recursive conditional types.

### **AST child iteration is devirtualized for speed** (e190472)
`Node.ForEachChild` is now generated as a kind-switch dispatch to concrete node implementations, and `IterChildren` is implemented directly on `Node` to avoid interface-based escape-analysis penalties. The change is explicitly aimed at keeping visitors/closures on the stack and making child traversal cheaper.

### **Internal symbol names are no longer leaked in help/printing** (04c7848)
Signature help and symbol rendering now suppress internal marker prefixes like `\xFEtype` and escape internal names more consistently, so anonymous/contextual types and synthetic symbols show cleaner user-facing labels. This fixes confusing output in signature help and node printing.

### **RemoteNode child traversal no longer double-visits arrays** (f7acbad)
The native-preview `RemoteNode.forEachChild` logic was fixed so array children aren’t visited twice when a `visitList` callback is supplied. That prevents duplicate traversal in editor/API consumers and is covered by new async/sync tests.

### Other misc changes
- Submodule update for bundled TypeScript and lib definition refreshes (1 commit)
- JSDoc wording/signature cleanup in bundled lib files
- Test baseline updates for the above behavior changes
