---
date: 2026-10-08
repo: oven-sh/bun
size: L
title: "Bun adds stricter builds and fixes check bugs"
excerpt: "New build knobs make codegen-from-strings and WebAssembly optional, while bun check lands several correctness and performance fixes."
commits: 5
authors: [Jarred-Sumner, robobun, alii]
commit_authors: {"9ed8d11": alii, "620b50f": Jarred-Sumner, "4c54c9b": Jarred-Sumner, "5749c31": robobun, "13b126f": robobun}
---

### **Build options add strict codegen and no-WebAssembly binaries** (9ed8d11)
Bun can now be built with `codeGenerationFromStrings` and `webAssembly` disabled, making `--disallow-code-generation-from-strings=strict` a compile-time constant and removing the `WebAssembly` global in that binary. The published builds stay unchanged, but source builds can now hard-enforce stricter runtime behavior or strip wasm support entirely.

### **bun check fixes conflicting exports and several false positives** (620b50f)
`bun check` now handles names exported by conflicting declarations more like TypeScript, avoiding the wrong error in generated `.d.ts` files. This is a correctness fix for a real edge case in declaration-heavy packages.

### **bun check fixes multiple type-analysis bugs and speeds up worst cases** (4c54c9b)
This release fixes a cluster of `bun check` mismatches with `tsc`, including missing/false errors around `NoInfer`, JSDoc, long `!` chains, and repeated package copies. It also includes performance work in union/intersection property checks and related type machinery, which should help pathological inputs that previously took minutes.

### **React Fast Refresh now hashes hook bindings correctly** (5749c31)
The React Fast Refresh signature now includes the hook binding itself, so renaming one `useState` binding no longer collides with another. That should prevent stale state from being incorrectly preserved across edits in dev workflows.

### **ByteStream now preserves buffered data when producers error** (13b126f)
Native byte streams no longer collapse to an empty successful read when the producer fails after partial output, and partial buffered data is preserved instead of triggering an out-of-bounds panic. This affects streamed fetch bodies, `Bun.serve`, S3 streaming, and HTMLRewriter output, so it fixes several user-visible error-path bugs.

### Other misc changes
- Documentation for the new build-time code generation flag
- Build/config plumbing for the new `codeGenerationFromStrings` and `webAssembly` options
- Stack-safety and hashing robustness fixes in AST/type serialization
- Miscellaneous test updates
