---
date: 2026-07-31
repo: microsoft/typescript-go
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "TypeScript 7 preview hardens APIs, watch mode, and emit"
excerpt: "July focused on expanding the native preview API, stabilizing watch/editing paths, and fixing compiler crashes, diagnostics, and emit edge cases."
commits: 116
---

### **Native preview API expands significantly**
The month added a lot of surface area to the native preview / TypeScript 7 API: typed `CompilerOptions`, timing collection, source-file line/character mapping, import-adder edits, temporary file updates, type-parameter accessors, parsed config and project-reference data, and first-class emit/config discovery methods. Several checker and AST helpers were also ported over, making the preview much more complete and safer for tooling consumers.

### **Extension rebrand and release pipeline overhaul**
The VS Code extension was renamed and reorganized around “TypeScript 7,” with updated docs, settings, packaging layout, nightly/stable split scaffolding, and release-build support for using published platform packages. Locale handling and failure-notification settings were also improved, along with a new experimental flaky-diagnostics tracking option.

### **Watch mode, project refs, and incremental rebuilds were hardened**
A large part of the month went into watch/session correctness: coalesced file watchers were tightened, no-op watch events were filtered out, irrelevant watch notifications stopped triggering diagnostics refreshes, config diagnostics now republish on file changes, and incremental rebuilds were fixed to include all affected files. Project-reference handling also got safer with symlinked subpaths, dropped-config cleanup, invalid reference validation, and stale retained-config crash fixes.

### **Compiler correctness and crash fixes across emit, checking, and editing**
The compiler saw many targeted bug fixes in declaration emit, JSX, signature help, formatting, nullish-coalescing analysis, tuple relations, self-referential symbols, and computed-name handling. Notable stability work included guarding against stack overflows and nil dereferences in hover, quick info, and signature help, plus better handling of recovered syntax and error contexts.

### **Performance and memory improvements in hot paths**
Several hot paths were optimized: `RemoteNodeList` traversal became linear, union construction and assignability checks were streamlined, checker link storage switched to a paged representation, go-to-implementation stopped retaining quadratic amounts of memory, and composite mapper allocations were trimmed. Watch/build orchestration also became more efficient under large solutions and heavy event storms.

### **Other misc changes**
- More precise isolated-declarations diagnostics and baseline cleanup
- Better JSDoc tag parsing, completions, hover rendering, and namespace JSX behavior
- Smarter selection ranges, organize-imports formatting respect, and deprecated contextual prop reporting
- Miscellaneous protocol, AST/codegen, test, and baseline updates
