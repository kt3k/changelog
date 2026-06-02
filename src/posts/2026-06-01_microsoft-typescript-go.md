---
date: 2026-06-01
repo: microsoft/typescript-go
size: L
title: "LSP queue refactor and several bug fixes"
excerpt: "Dynamic queueing for LSP messages plus fixes in tsdk selection, declaration emit, JSDoc parsing, and module resolution."
commits: 13
authors: [jakebailey, Zelys-DFKH, andrewbranch, weswigham, a-tarasyuk, ahejlsberg, gabritto]
commit_authors: {"fe932f6": jakebailey, "1a5292b": jakebailey, "43a7d80": Zelys-DFKH, "994be66": andrewbranch, "fae2403": weswigham, "b3f6abf": a-tarasyuk, "1f19a57": ahejlsberg, "375d2b9": gabritto}
---

### **Use an expanding dynamic queue for LSP messages** (fe932f6)
Replaced the LSP message queue with a context-aware dynamic queue that can grow and be safely waited on or canceled. This should reduce shutdown/race issues in message handling, and the new tests cover FIFO behavior and cancellation.

### **Fix tsdk selection and persistence in the VS Code extension** (994be66)
The extension now tracks workspace versions by folder, resolves the active executable more accurately, and persists `tsdk` relative to the workspace config when possible. It also avoids unnecessary config churn and changes the prompt logic so workspace-installed `@typescript/native-preview` is handled more reliably.

### **Revise JSDoc `@template` parsing and callback/typedef handling** (1f19a57)
JSDoc template gathering was tightened up so template tags are handled in the right places for typedefs, callbacks, and nested type literals. The change updates parser logic and diagnostics, and it fixes several overload/inference cases for JS files and callback templates.

### **Fix a concurrent module-resolution cache mismatch** (82d34b6)
Package.json cache entries now normalize the returned package directory to the caller’s candidate path, avoiding stale first-writer-wins mismatches when paths differ only by trailing slashes. This addresses an intermittent resolution bug in concurrent builds, especially around `paths` aliases conflicting with `@types/*`.

### **Treat zero-byte `tsconfig.json` as empty** (c9968e6)
`tsc -p` now accepts an empty `tsconfig.json` instead of treating it like a read failure. That aligns command-line parsing with the expectation that an empty config behaves like an empty config, not a missing file.

### **Fix declaration emit for constructor types** (b3f6abf)
Declaration emit now computes modifier flags directly from the parsed node, which corrects how constructor-type declarations are preserved. This fixes a case where `new () => number` inside a namespace needed to round-trip cleanly into `.d.ts` output.

### **Strip synthesized namespaces from internal expando declarations** (43a7d80)
Declaration transform now strips synthesized namespaces for `@internal` expando functions. This changes the emitted declaration shape for internal expandos so they’re removed more cleanly from public output.

### **Check `this` params when comparing pseudotype signatures** (fae2403)
The checker now compares `this` parameters when matching pseudotype signatures to real type signatures. That matters for isolated declarations involving captured generics, where `this` mismatches could previously slip through.

### **Elide `in`/`out` variance modifiers from emitted JS** (a980d86)
The JS transformer now drops `in`/`out` variance modifiers so they don’t leak into runtime output, while still preserving the `in` binary operator. This also adds coverage for invalid class-member uses of the modifiers.

### **Switch VS-specific discriminator handling to string literals** (1a5292b)
The generated LSP protocol types now use string-literal `_vs_type` fields instead of a separate discriminator property on the schema. This simplifies VS client-side deserialization and removes extra type metadata from several display-text paths.

### **Use fire-and-forget LSP requests to avoid deadlocks** (375d2b9)
The LSP server now avoids waiting on a client request in one progress path, reducing the chance of request cycles deadlocking the session. It’s a small change, but it addresses a concurrency hazard in the server.

### **Other misc changes**
- Dependency bumps and generated-file updates (2 commits)
- CI workflow updates (1 commit)
