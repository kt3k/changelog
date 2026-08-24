---
date: 2026-08-23
repo: microsoft/typescript-go
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "API surface grows, with fixes for emit, flow, and extensions"
excerpt: "New checker and diagnostics APIs, generated protocol/API plumbing, content mappers, and a batch of correctness and crash fixes landed this week."
commits: 27
---

### **Public API expansion and generated protocol plumbing**
The native-preview API grew several useful checker and diagnostics entry points, including source-file symbol lookup, fully qualified symbol names, and diagnostics over file arrays. In parallel, the repo now generates the TS API and protocol output from Go source, reducing hand-maintained drift and wiring builds/tests to the generated artifacts.

### **Editor and extension capabilities improved**
The VS Code extension gained experimental external content mapper support, plus better TSDK resolution for npm aliases and a macOS temp-path fix. There were also UX fixes for hover JSDoc on mapped properties and go-to-definition at the edge of JSX tag names.

### **Type system, checker, and flow analysis fixes**
Several correctness fixes landed in the checker and flow engine: tuple optionality stripping now behaves correctly under `exactOptionalPropertyTypes`, deep type recursion handling was reworked, and inferred projects are kept in sync when open. The week also fixed false unreachable diagnostics around `try/finally`, a crash in flow analysis from throwing `for` initializers, and JSDoc `@augments` validation based on semantic type identity.

### **Emit, parser, and syntax gating updates**
Declaration emit now preserves computed enum property names, multiline JSDoc literal types are handled more faithfully, and downlevel arrow-body transforms keep comments attached. The scanner also tightened regex syntax gating so ES2025-only pattern modifiers and duplicate named groups error on older targets.

### **Performance and internal cleanup**
Checker cache-key hashing was optimized to cut allocation and hashing overhead, and internal formatting support for synthesized nodes was added to improve insertion-aware code actions and completions.

### Other misc changes
- New and expanded test coverage across API, diagnostics, module resolution, concurrency, and extension paths.
- Small build/script updates, generated-file churn, and a README closure notice pointing users back to the original TypeScript repository.
