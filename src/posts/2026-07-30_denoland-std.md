---
date: 2026-07-30
repo: denoland/std
size: L
title: "API cleanup, deprecations, and perf fixes"
excerpt: "Major XML API cleanup, YAML structured errors, a new HttpError, plus faster line streaming and tree cloning fixes."
commits: 18
authors: [tomas-zijdemans, bartlomieju, piscisaureus, denobot, iuioiua, LeSingh1]
commit_authors: {"c09b948": iuioiua, "07a05eb": bartlomieju, "02e05a4": bartlomieju, "fbe3870": LeSingh1, "5e7c0b9": tomas-zijdemans, "7a0239f": tomas-zijdemans, "6861a2b": tomas-zijdemans, "0d820d1": tomas-zijdemans}
---

**XML public API cleanup lands as breaking change** (7a0239f)
The XML module tightens and reshapes its exported surface, including type changes around declarations and tokenizer callbacks. It also improves error reporting when position tracking is disabled, and the API cleanup is explicitly breaking.

**YAML parsing now exposes structured `YamlSyntaxError`** (6861a2b)
YAML errors now carry line, column, and offset data in a dedicated error type instead of stringified `SyntaxError` messages, and the main module re-exports the new types. The parser also adds single-document enforcement support, making failures easier to inspect and downstream handling more precise.

**`HttpError` adds a typed unstable HTTP error API** (c09b948)
A new unstable `HttpError` class gives HTTP handlers a standard way to represent status-coded failures, with optional response init and cause support. This is a meaningful addition for route/error handling patterns in `@std/http`.

**Text line streaming is fixed to avoid quadratic buffering** (5e7c0b9)
`TextLineStream` now buffers chunks incrementally instead of repeatedly re-slicing accumulated text, eliminating quadratic behavior for long lines split across many chunks. That’s a real performance fix for streamed text processing.

**Tree cloning now deep-copies nodes correctly** (fbe3870)
`BinarySearchTree.from()` and `RedBlackTree.from()` now copy node structure instead of reusing nodes from the source tree, so mutations on the clone no longer affect the original. This fixes correctness bugs when cloning and then mutating trees.

**Testing and dotenv deprecations broaden API cleanup** (07a05eb, 02e05a4, 0d820d1)
The day also marks several APIs as deprecated, including snapshot helpers, BDD testing modules, and dotenv `load()`/`loadSync()` entry points. These signal upcoming removals and help steer users toward newer APIs.

### Other misc changes
- Release 2026.07.30
- CI/workflow dependency bumps and Node test matrix tweaks
- Docs cleanup removing the deprecated coverage explorer link
- Minor refactors and type annotation cleanup
