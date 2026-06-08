---
date: 2026-06-07
repo: microsoft/typescript-go
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "TypeScript Go lands LSP overhaul, fswatch, and crash fixes"
excerpt: "A big week for editor/server plumbing, file watching, and compiler correctness, with several emit, parser, and diagnostic fixes."
commits: 69
---

### Major platform and editor/server changes
**LSP plumbing got a major concurrency cleanup** — The server switched to a dynamic, cancellable message queue and also added fire-and-forget request paths to reduce deadlocks and shutdown races. Experimental capabilities were moved under `capabilities.experimental`, logs now funnel into a single pane, and the generated protocol types were simplified for VS clients.

**A new file-watching subsystem landed** — The new `internal/fswatch` package arrived with tests, docs, support code, and cross-OS CI coverage, marking a substantial step toward more robust watch-mode behavior.

**native-preview and extension integration expanded** — Snapshot IDs moved to integers, profiling APIs were added, and WebStorm-facing checker/type APIs were filled in. The VS Code extension also improved `tsdk` selection/persistence and workspace handling.

### Compiler correctness and emit fixes
**Declaration emit and checker stability improved across several crash paths** — Fixes landed for constructor-type declaration emit, internal expando stripping, skipped diagnostics during declaration emit, `this`-parameter comparison in pseudotype signatures, and multiple crash cases in declaration emit, inference, and control-flow analysis.

**Parser and transform bugs were tightened up** — The parser now stops on uneraseable `as`/`satisfies` chains, JSDoc `@template` and constructor modifiers are handled more reliably, async `super` in default parameters is emitted correctly, and `in`/`out` variance modifiers are stripped from JS output.

**Resolution and config handling got more robust** — The week fixed a concurrent module-resolution cache mismatch, a nil dereference in `node_modules` lookup, empty `tsconfig.json` handling, invalid `include` patterns, and command-line reset crashes in project rebuilding.

### Diagnostics and language-service improvements
**Better error messages and suggestions** — Exact-optional-property diagnostics are clearer, Unicode spelling suggestions now handle multibyte identifiers properly, and computed-name errors point at the correct late-bound symbol.

**Navigation and quick info got a few useful fixes** — Go-to-implementation now finds typed object-literal implementations, hover can use contextual JSDoc, and JSDoc-related parsing and quick-info scenarios were expanded with new tests.

### Other misc changes
**Smaller fixes and housekeeping** — Included assorted baseline updates, dependency bumps, CI workflow tweaks, JSX/entity and emit edge cases, source-map and formatting fixes, and various test additions across parser, resolver, and LSP internals.
