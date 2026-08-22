---
date: 2026-08-21
repo: biomejs/biome
size: L
title: "Plugin TS support leads a busy day"
excerpt: "Biome added TypeScript plugin loading, tightened parser recovery, and shipped several lint/type-inference performance and correctness fixes."
commits: 10
authors: [dyc3, ematipico, siketyan, Princesseuh]
commit_authors: {"db9aa2a": dyc3, "48add87": ematipico, "d0b67c8": siketyan, "a713b56": dyc3, "00317c3": dyc3, "8d45229": ematipico, "3133ffa": Princesseuh, "7e1ab4b": ematipico, "006e3a6": siketyan}
---

### **TypeScript plugins are now supported** (d0b67c8)
Biome’s JS plugin runtime can now load TypeScript plugins, with the loader and analyzer updated to accept `.ts` plugin sources and reject unsupported TS syntax more explicitly. This expands plugin authoring options and closes a gap that previously limited plugins to plain JavaScript.

### **Type inference now stays local for dependent class members** (8d45229)
The inference engine was changed to use local inference for constructor-dependent members, reducing unnecessary type work in `noFloatingPromises` and related query paths. That improves both correctness and performance when analyzing non-generic class instances.

### **Parser recovery for incomplete Svelte declarations is more robust** (a713b56)
Svelte declaration parsing now preserves a bogus declaration node when recovery is needed, instead of losing structure after malformed input. The new snapshots show better AST/CST output for several incomplete declaration forms, which should improve downstream diagnostics and formatting resilience.

### **Astro comment-only expressions are no longer parse errors** (3133ffa)
Astro expressions containing only comments now parse cleanly, so files like `<div>{/* a note */}</div>` no longer cause the CLI to skip formatting the whole document. This fixes a user-visible parser/formatter failure for a common embedded-language edge case.

### **Selected lint rules got faster by narrowing their queries** (00317c3)
`useNamedCaptureGroup` and `noMisplacedAssertion` were refactored to query narrower AST node types instead of broader expressions, trimming work in hot lint paths. The change should reduce overhead for projects that run these rules frequently.

### **`no-this-in-static` fixes are now marked unsafe** (db9aa2a)
A lint rule fix was reclassified as unsafe, which means Biome will be more conservative about automatically applying it. That matters because the transformation can affect semantics, so the fixer now better reflects the risk.

### Other misc changes
- Release housekeeping and changeset cleanup (05797b1)
- Coverage checkout refactor for xtask test suites (7e1ab4b)
- JS runtime clock/source plumbing for Boa and related internal cleanup (006e3a6)
- Large internal skill/docs reorganization for Claude helper files (48add87)
