---
date: 2026-07-17
repo: microsoft/typescript-go
size: M
title: "Declaration emit fix and checker cleanup"
excerpt: "Fixed a declaration-emit import specifier bug, reduced false diagnostics in checker paths, and updated baseline triage grouping."
commits: 4
authors: [weswigham, RyanCavanaugh]
commit_authors: {"61aabc2": weswigham, "2d3f632": RyanCavanaugh, "26b9eb1": weswigham}
---

### **Fix declaration emit for extensionless import() specifiers** (2d3f632)
TypeScript now falls back to the file’s default resolution mode when no syntax-implied mode is present, which fixes declaration emit under `allowImportingTsExtensions` + `nodenext`. The new baseline shows `import("mylib/lib/Box.js")` being emitted correctly for a relative `.ts` import chain.

### **Reduce spurious checker diagnostics and reference resolution work** (26b9eb1)
This commit adds more bailout cases in `markLinkedReferences` for identifiers inside grammar-error contexts like invalid computed property names, non-usable `extends` clauses, export assignments, and return statements. It also factors out a couple of helper checks in `checker.go`, which should prevent “Cannot find name” noise and make linked-reference handling more consistent.

### **Fix TS2871 false positive in nullish-coalescing analysis** (da487ee)
The nullishness semantics for `??` / `??=` now account for both the left and right paths instead of treating them like simple right-controlled operators. That addresses a false positive on expressions like `(a ? b ?? null : null) ?? 0` and `x ??= null`.

### Other misc changes
- Moved a few baselines from triaged to accepted (61aabc2)
