---
date: 2026-07-31
repo: denoland/std
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "std adds breaking API cleanup and stream/tree fixes"
excerpt: "July brought breaking XML/YAML API cleanup, a new typed HTTP error, and major fixes for text streaming and tree cloning."
commits: 26
---

### **API cleanup reshapes XML, YAML, and HTTP**
The biggest change this month was a broad surface-area cleanup across core modules. XML exports were tightened in a breaking way, with type adjustments around declarations and tokenizer callbacks, while error reporting improved when position tracking is disabled. YAML now exposes a structured `YamlSyntaxError` with line, column, and offset data, plus single-document enforcement support for clearer downstream handling. On the HTTP side, `@std/http` gained a new unstable `HttpError` class for status-coded failures with optional response init and cause support.

### **Performance and correctness fixes land in streaming and trees**
`TextLineStream` was fixed to buffer incrementally instead of repeatedly re-slicing accumulated text, removing quadratic behavior on long streamed lines. Tree cloning was also corrected: `BinarySearchTree.from()` and `RedBlackTree.from()` now deep-copy node structure so mutations on clones no longer affect the source tree.

### **Repo config and CI were simplified**
The import-map setup was consolidated into `deno.json`, removing the standalone `import_map.json` and its validator/lint task. Redundant `@std/*` self-maps were dropped in favor of workspace resolution, and CI was adjusted accordingly. The nightly workflow is now gated to upstream-only runs, while the main matrix retired canary Deno and moved some jobs to v2.x.

### **Deprecations signal upcoming API removals**
Several existing APIs were marked deprecated to guide future cleanup, including snapshot helpers, BDD testing modules, and dotenv `load()`/`loadSync()` entry points.

### **Other misc changes**
- `promptSelect()` now always renders at least one item in tiny terminals
- `no-import-prefix` linting was enabled with a few inline-specifier cleanups
- Misc release bookkeeping, dependency bumps, docs cleanup, and minor refactors
