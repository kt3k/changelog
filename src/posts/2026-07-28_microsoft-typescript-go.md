---
date: 2026-07-28
repo: microsoft/typescript-go
size: M
title: "Flaky diagnostics tracking lands in LSP"
excerpt: "Adds an experimental init flag for flaky diagnostic tracking and trims redundant watch-triggered refreshes."
commits: 3
authors: [weswigham, jakebailey, ibesuperv]
commit_authors: {"70420d4": weswigham, "83ef4c1": jakebailey, "c529c56": ibesuperv}
---

### **Experimental flaky diagnostics tracking via LSP init** (70420d4)
Adds a new `js/ts.server.trackFlakyDiagnostics` setting and wires it through VS Code startup into LSP initialization. The server now receives a `trackFlakyDiagnostics` init option with log/panic/disabled behavior, enabling flaky diagnostic detection to be turned on selectively, especially in Insiders.

### **Avoid diagnostics refreshes on irrelevant file watches** (c529c56)
Watch notifications now trigger diagnostic refreshes only when the changed path can actually affect the TypeScript program, such as relevant source/config files or directories. This cuts unnecessary re-checks from unrelated file events and should reduce background churn in larger workspaces.

### **Remove unused classifiable-name tracking** (83ef4c1)
The binder and AST no longer maintain the `ClassifiableNames`/`Classifiable` tracking path. This is a cleanup of dead state and enum plumbing with no expected behavior change.

### Other misc changes
- Internal enum/codegen cleanup related to symbol flags
- Generated LSP protocol updates
- Native preview enum sync cleanup
