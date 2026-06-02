---
date: 2026-05-28
repo: microsoft/typescript-go
size: M
title: "Computed-name emit and JSDoc hover fixes"
excerpt: "TypeScript-Go now emits serialized computed property names more faithfully and improves hover docs for destructured binding elements."
commits: 2
authors: [weswigham, ahejlsberg]
commit_authors: {"0970dc4": weswigham, "2a26cbd": ahejlsberg}
---

### **Emit computed property names instead of index signatures** (0970dc4)
When an index info comes from actual computed members and the names are safely serializable, declaration emit now preserves those computed names rather than collapsing them into a generic index signature. This makes emitted types more precise, especially for object literals, class members, and JS object-literal index signature scenarios.

### **Simplify JSDoc lookup for destructured bindings** (2a26cbd)
Hover documentation for binding elements now pulls JSDoc directly from the underlying property declaration in object binding patterns, which fixes cases where destructured parameters or variables were missing the expected description. The hover code was also simplified by removing the special-case path from the main documentation flow.

### Other misc changes
- Updated baseline outputs across checker/conformance tests for the computed-name emit change.
- Added fourslash coverage for destructured-intersection JSDoc hovers.
