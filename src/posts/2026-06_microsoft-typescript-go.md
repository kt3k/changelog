---
date: 2026-06-30
repo: microsoft/typescript-go
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "June brought major watcher, API, and emit overhauls"
excerpt: "New filesystem watching, a broader native-preview API, and many compiler/declaration fixes improved correctness, performance, and editor integration."
commits: 180
---

### **Filesystem watching was rebuilt end-to-end**
June’s biggest theme was the new `fswatch` stack. A cross-platform watcher package landed and then became the basis for CLI watch mode, build watch mode, and LSP file watching, with support for native recursive watching on Windows/macOS, symlink-aware roots, batching, and better FSEvents behavior. These changes should make watch-mode behavior more reliable and scalable across large trees.

### **Native preview API surface expanded substantially**
The preview/compiler API gained a lot of new capabilities: completions, references, signature usage, project/file open-state tracking, richer diagnostics, source-file/name accessors, checker helpers, literal subtypes, signatures, and more. At the same time, the object registry and snapshot caching were tightened up to make multi-snapshot and multi-project use safer and faster, while release/package plumbing was updated for alternate package flavors and CJS entrypoints.

### **Declaration emit and checker correctness saw heavy focus**
A large share of the month went into `.d.ts` fidelity and type-checking stability. Fixes covered constructor types, class expressions, nested CommonJS and `this`-assigned members, expando declarations, duplicated exports, parameter comment preservation, JSDoc reuse, `this`-parameter comparison, and safer reuse/instantiation logic. Several crash and recursion bugs were also fixed in recursive types, control-flow analysis, and base-constraint computation.

### **Parser, config, and diagnostics behavior became stricter and clearer**
Config handling was hardened against empty files, null or malformed `extends`, invalid include/files entries, and missing inputs, with better diagnostics surfaced during project creation. Parsing also improved around JSDoc modifiers, `as`/`satisfies` chains, top-level await reparsing, JSX/type-argument spans, and Unicode-aware suggestions. Diagnostics and error reporting were refined to be more specific and editor-friendly, especially for optional-property and computed-name errors.

### **Performance and Unicode correctness improved**
The scanner, checker, and AST traversal paths got notable optimizations, including ASCII fast paths, deferred allocations, cached remote source text, and devirtualized child iteration. Unicode handling was also corrected across casing, identifier classification, string encoding, and UTF-16 position reporting, reducing cross-language and non-ASCII edge cases in both compiler and language-service behavior.

### Other misc changes
Dependency bumps, CI/workflow updates, packaging/license fixes, test/baseline refreshes, formatting tweaks, rename/import-organizing improvements, and assorted small resolver/LSP cleanup.
