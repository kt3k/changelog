---
date: 2026-04-24
repo: microsoft/typescript-go
size: L
title: "Trace logging, ATA toggle, and auto-import fixes"
excerpt: "Tracing was added across the checker and compiler, VS Code gains ATA controls, and auto-import symlink races were fixed and retested."
commits: 9
authors: [jakebailey, RyanCavanaugh, andrewbranch, ericnorris]
commit_authors: {"eb04840": andrewbranch}
---

### **Add --generateTrace support across checker/compiler** (7abf963)
Tracing is now wired through core checker, compiler, and tsc paths so runs can record phase-level events and type activity. This should make it much easier to diagnose performance hotspots and correctness issues in the compiler pipeline.

### **Restore JS/TS ATA settings handling in the VS Code extension** (e391e41)
The extension now reads both the unified `js/ts` ATA setting and the older `typescript.disableAutomaticTypeAcquisition` flag, with the unified setting taking precedence. This keeps automatic type acquisition behavior aligned with VS Code configuration and avoids surprising regressions for inferred projects.

### **Fix auto-import cache races for symlinked workspace packages** (eb04840)
Auto-import indexing and program updates were hardened against race conditions, and a regression test was added for editing a symlinked package source file and immediately seeing the new export in completions. This matters for monorepos because stale or racy auto-import state can hide newly added symbols.

### **Other misc changes**
- Accepted/triaged baseline updates for JSX factory-call output, `let` declaration emit, and several `.js`/`.d.ts` diffs.
- Reverted the previous symlinked-package auto-import cache invalidation change after the follow-up fix.
- Added VS Code extension settings for extra tsdk locations and server debug info.
- Misc test/baseline churn around auto-import and JSX acceptance.
