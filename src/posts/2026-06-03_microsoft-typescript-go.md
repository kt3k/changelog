---
date: 2026-06-03
repo: microsoft/typescript-go
size: L
title: "LSP overhaul and several crash fixes"
excerpt: "Major API and LSP protocol changes landed alongside fixes for declaration emit, parser edge cases, and several compiler panics."
commits: 22
authors: [andrewbranch, a-tarasyuk, ahejlsberg, weswigham, jakebailey]
commit_authors: {"84a8751": andrewbranch, "3a693d2": andrewbranch, "2058ba3": weswigham}
---

### **Use integer snapshot IDs and add profiling APIs** (3a693d2)
The native preview API now uses numeric snapshot IDs instead of strings, updating release calls and the internal object wiring accordingly. It also adds internal CPU/heap profiling endpoints, which is a meaningful API shift for tooling built on this package.

### **Move experimental LSP capabilities under `experimental`** (221106c)
Client capability negotiation now follows the LSP spec by placing these custom flags under `capabilities.experimental`, and the server-side hover path now reads the new location. This affects multiple editor features and the generated protocol types, so it’s a real wire-format change.

### **Consolidate LSP logs into a single output pane** (84a8751)
Logging was reworked so the extension and server funnel output into one pane instead of scattered logging paths. That should make diagnostics and session debugging much easier for users and contributors.

### **Fix declaration emit skipping and diagnostics tracking** (2058ba3)
Declaration emit now keeps running long enough to record transform diagnostics, but still suppresses output when declaration errors are present. The incremental build path was updated in tandem so emit-diagnostic state is tracked consistently.

### **Handle more declaration-emit and checker crash cases**
Several fixes landed for real compiler failures: invalid decorator targets, broken set accessors, bad expando namespace emit, inferred object literals referencing `this`, and an infinite recursion path in control-flow analysis. Together these are substantial stability improvements for declaration emit and type checking.

### **Other misc changes**
- Fixed redirect ordering in module path ranking, tsconfig key diagnostics, JSX pragma scanning, source-map emit, wildcard pattern overlap panics, and a few other edge cases.
- Switched an LSP overlay fallback, adjusted hover/source-definition tests and generated protocol code, and removed one CI VM test matrix entry.
- Misc test/baseline updates and small internal refactors across parser, resolver, emitter, and build tooling.
