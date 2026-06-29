---
date: 2026-06-28
repo: microsoft/typescript-go
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "TypeScript-Go expands native preview APIs and hardens watch/emit"
excerpt: "A week of API growth, watcher fixes, and emit correctness work, with native-preview packaging and release plumbing also moving forward."
commits: 39
---

### Native preview API keeps expanding
**Broader program/checker surface** — The native preview API gained a lot of new introspection and type-query entrypoints, including project/file open-close state, additional program diagnostics, source file name queries, checker helpers, conditional type accessors, and tighter literal/type guards.

**Stronger typing and better performance** — Several API types were narrowed for safety, `SourceFile.text` is now cached after first access, object registries became project-scoped, and object identity collisions across projects were fixed.

**CJS consumption and packaging got easier** — The package now ships a CommonJS root version entrypoint, and release tooling was refactored to support alternate native package flavors, version/tag overrides, and broader platform coverage checks in CI.

### Watcher and LSP behavior became more robust
**Symlinked and batched watch roots work better** — File watching was improved to follow symlink/reparse-point roots correctly while preserving logical paths, and the watch manager now supports batching plus shared FSEvents streams for multi-directory setups.

**Large watch graphs and diagnostics are more reliable** — FSEvents coalescing was fixed for heavy recursive watch workloads, and pull diagnostics now advertise identifier/label support to better match newer LSP clients.

### Compiler correctness and emit fixes landed
**Declaration and CommonJS emit were tightened** — Declaration output now skips redundant synthesized `this` properties when the base type already covers the member shape, and CommonJS destructuring emit was fixed for exported assignments.

**Inference, rename, and parsing got cleanup** — Type inference now prefers deeper covariant candidates, rename honors alias preferences more consistently, and several parser edge cases were fixed, including JSDoc modifier false positives and unsafe config-path handling.

**Unicode and duplicate-import edge cases were addressed** — Source-file non-ASCII detection and position mapping were corrected, and duplicate case-only imports no longer over-count and corrupt parse-cache lifetime.

### Other misc changes
- Config parsing diagnostics now surface earlier on project creation.
- `extends` config handling no longer panics on malformed array entries.
- Organize imports gained a collate-free sorting preference.
- A few small API additions, generated-code cleanups, dependency bumps, and baseline/test updates.
