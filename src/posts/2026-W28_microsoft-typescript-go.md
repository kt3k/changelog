---
date: 2026-07-12
repo: microsoft/typescript-go
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "VS Code extension overhaul, safer project handling, faster traversal"
excerpt: "TypeScript 7 branding lands alongside crash fixes, project-reference validation, JSX improvements, and a faster remote node walk."
commits: 18
---

### **VS Code extension rebrand and release layout overhaul**
The preview extension is being renamed and reorganized as **TypeScript 7**, with updated docs, settings keys, output channel names, package metadata, and build/release plumbing. Packaging now also supports extension packages from source directories, setting up stable/nightly split and VSIX flow changes.

### **Crash fixes and concurrency hardening across the language service**
Several stability fixes landed for project reference cleanup, bulk cache invalidation, inferred-project completions, and snapshot filesystem access. These changes eliminate stale retained configs, nil-commandLine crashes, a completion panic on inferred projects, and a data race in accessible-entry enumeration.

### **Project references and tsconfig validation got stricter**
Project reference handling now releases dropped configs properly and validates malformed reference entries, including bad or missing `path` and `circular` fields. This should surface invalid configs earlier instead of leaving the server in inconsistent state.

### **Performance improved for remote AST-like traversal**
`RemoteNodeList.at()` was optimized to reuse its previous position and walk the underlying buffer directly, turning sequential access from quadratic behavior into linear time. That should help larger editor features that repeatedly scan remote nodes.

### **API and emit improvements**
The native preview API added source-file line/character mapping helpers, and checker returns were tightened so unresolved results use sentinels instead of nullable types. Declaration emit was also fixed to preserve expando properties for functions that become visible only later in emit.

### **Editor/IntelliSense polish**
JSX completion and hover were fixed for namespaced intrinsic tags like `<foo:bar>`, and the extension gained a setting to suppress failed language-server request notifications.

### **Other misc changes**
- Nightly/stable packaging scaffolding and release-version updates
- dprint, CodeQL, build-script, and dependency updates
- Expanded tests and baselines for the new fixes
