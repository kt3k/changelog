---
date: 2026-03-21
repo: denoland/deno
size: L
title: "Doc JSON overhaul and npm install fix"
excerpt: "Deno Doc switched to a v2 schema and global npm installs now create shims for every bin entry; audit and CI got targeted fixes."
commits: 7
authors: [bartlomieju, crowlKats]
commit_authors: {"eb108d2": crowlKats, "8b14d5a": bartlomieju}
---

### **Deno Doc JSON schema v2 and structural rewrite** (eb108d2)
`deno doc` now emits the new `deno_doc` v2 data model, with JSON schema version bumped to 2 and `nodes` changing from a flattened `DocNode[]` to a `Record<string, Document>`. That’s a breaking output-format change for tools consuming `deno doc --json`, but it aligns Deno with the crate’s new symbol-based documentation model and updates the CLI’s builtin/markdown handling accordingly.

### **Global npm installs now shim every bin entry** (38186cc)
`deno install -g npm:...` now handles packages with multiple `bin` entries instead of only creating the first shim. This fixes missing executables for real-world packages like `pyright`, and the resolver now exposes all bin entries so install/uninstall behavior stays consistent.

### **`deno audit` now respects package.json overrides** (8b14d5a)
Audit filtering now cross-checks advisories against the actually installed versions from the lock/snapshot, so an override that pins a transitive dependency to a patched release no longer shows a false vulnerability. This removes a noisy false positive and makes audit results match the resolved dependency graph.

### Other misc changes
- Copilot code review instructions added
- Dependency bumps: `aws-lc-sys` and `tar`
- Skip flaky Windows node-compat test for `process.threadCpuUsage`
