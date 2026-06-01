---
date: 2026-05-31
repo: microsoft/typescript-go
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: M
title: "TypeScript Go tightened emit, JSDoc, and VS references"
excerpt: "This week improved declaration emit accuracy, JSDoc parsing/diagnostics, path completions, and added structured VS reference output."
commits: 12
---

### **More precise declaration emit and type display**
Declaration emit got a few notable fixes: keyword-like property names such as `new` now round-trip correctly, computed members are preserved instead of collapsing into index signatures, and type-node expansion avoids stale cached output. Together these changes make `.d.ts` output and hover/type rendering more accurate.

### **JSDoc handling became more complete**
JSDoc support saw a cluster of fixes across parsing, hover, and diagnostics. Namespace-style declarations for `@typedef`/`@callback` names were restored, `@template` variance modifiers (`in`/`out`) no longer trigger spurious grammar errors, destructured bindings now pick up JSDoc from the underlying property declaration, and `@satisfies` errors are reported against the tag location users actually edit.

### **VS references output and alias resolution improved**
The language service now has structured VS-style Find All References output with classified text and stable ordering/renumbering, backed by new protocol plumbing and tests. In the checker, alias resolution now walks the full meaning chain so re-exports and CommonJS aliases resolve to the intended symbol instead of stopping too early.

### **Editor and extension fixes**
Import/path completions now strip already-typed prefixes before suggesting matches, improving results for relative and package subpaths. The extension also cleaned up configuration handling around `js/ts.experimental.useTsgo` and fixed the UI’s source-setting lookup.

### **Other misc changes**
- Fixed a checker panic for decorators on private identifiers.
- Updated baselines and added fourslash/conformance coverage for the new emit, hover, JSDoc, and references behaviors.
- Minor printer, LSP generation, and internal cleanup work.
