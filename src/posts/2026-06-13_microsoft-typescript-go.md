---
date: 2026-06-13
repo: microsoft/typescript-go
size: M
title: "Declaration emit and diagnostics tightened"
excerpt: "Fixes declaration emit diagnostics, UTF-16 diagnostic positions, and a checker bug around instantiated symbols."
commits: 4
authors: [jakebailey, weswigham]
commit_authors: {"551b02d": jakebailey, "c78d39e": weswigham}
---

### **Declaration emit now handles newer JS cases correctly** (c78d39e)
The declaration transformer now sets up diagnostic context for additional expression shapes, including `object.defineProperty` calls and expando-style assignments. This improves error reporting and keeps newer JS declaration emit paths from missing symbol-accessibility diagnostics.

### **Checker avoids unstable symbol identity for instantiated members** (551b02d)
The checker simplifies how it compares symbols from instantiated types and moves `this`-only instantiation handling into the symbol instantiation path itself. This should make “same reference” checks more deterministic and fix cases where `this`-substituted symbols were compared inconsistently.

### **Diagnostics API now returns UTF-16 offsets** (0751b19)
Diagnostic responses are converted from file offsets to UTF-16 positions before being returned, matching editor-facing position semantics. This prevents misreported locations for Unicode text and aligns the API with consumer expectations.

### Other misc changes
- Reclassified `nodeModulesAllowJsImportAssignment` JS emit diffs as accepted baselines (1 commit)
