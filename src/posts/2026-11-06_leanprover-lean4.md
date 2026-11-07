---
date: 2026-11-06
repo: leanprover/lean4
size: L
title: "Lean4 adds HTTP fixes and new vcgen power"
excerpt: "HTTP/1.1 parsing got corrected, vcgen gained binder rules and sharing fixes, and Lake can now use package-defined cache services."
commits: 8
authors: [sgraf812, Kha, algebraic-dev, tydeu, eumemic, Vtec234]
commit_authors: {"a2f1a64": Kha, "07f5e96": algebraic-dev, "19c079d": sgraf812, "d85fd7c": sgraf812, "b6ee2a0": sgraf812, "8c25dfb": tydeu, "d4cada4": eumemic, "f415870": Vtec234}
---

**Std.Http HTTP/1.1 parsing and framing fixed** (07f5e96)
The HTTP client/server code got a broad correctness pass: parsing, framing, connection handling, and some `Std.Http` API details were fixed. This is a high-impact networking change, with new regression tests covering chunked bodies, framing mismatches, incremental parsing, and RFC compliance.

**`vcgen` now supports `@[vcgen_rintro]` binder destructuring** (d85fd7c)
A new `@[vcgen_rintro]` attribute lets `vcgen` apply fixed binder-destructuring patterns while introducing quantifiers, similar to an `rintro` template per binder type. That expands the tactic’s expressiveness for verification-condition generation and comes with a substantial new test suite.

**Lake can load cache services from package configuration** (8c25dfb)
Packages can now declare cache services in TOML or Lean DSL, and `lake cache get --service` will resolve them with package/dependency precedence rules. This changes Lake’s cache configuration model in a user-visible way and adds validation around upload support, default services, and error reporting.

**`vcgen` keeps terms maximally shared and `let` values as written** (19c079d, b6ee2a0)
`vcgen` was adjusted to preserve sharing in generated goals and to keep program `let`/`have` values in their original form where needed, improving both soundness around `SymM` invariants and performance of `vcgen +jp`. The sharing/perf work reduces regressions in tactic-generated proof terms and is backed by multiple updated tests.

**Lean now has a `#html` display command** (f415870)
`#html` evaluates HTML values and renders them in the infoview as widget messages, extending the existing evaluation pipeline. It’s a user-facing REPL/IDE feature and introduces a new widget-backed display path for HTML output.

**HTTP request-target length handling is now consistent across reads** (d4cada4)
The HTTP/1.1 server now returns `414 URI Too Long` even when an overlong request line is split across reads, instead of sometimes surfacing `400 Bad Request`. That removes a parsing edge case that depended on read boundaries.

**`findOLean` cache survives `withImportModules`** (a2f1a64)
Lean deep-copies cached package-name keys before storing them in the root cache, preventing use-after-free when `withImportModules` releases imported `.olean` regions. This fixes a segfault regression in repeated import workflows.

### Other misc changes
- Minor HTTP API/documentation adjustments in `Std.Http`.
- Small internal `vcgen` refactors and test updates beyond the new binder-rule feature.
- Lake CLI/config cleanups around cache-service lookup and error messages.
