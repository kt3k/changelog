---
date: 2026-06-19
repo: oven-sh/bun
size: L
title: "AST gets slimmer; fs bugs get fixed"
excerpt: "Big AST memory reduction lands alongside fs.open flag parity and a Node v8 snapshot API fix, plus a large fs test/behavior port."
commits: 4
authors: [robobun, Jarred-Sumner, cirospaciari]
commit_authors: {"25e32c1": Jarred-Sumner, "e11be56": robobun, "4261a46": robobun, "dae2e87": cirospaciari}
---

### **AST primitives shrink to 16 bytes (25e32c1)**
Bun repacks core AST node types with `#[repr(C, packed(4))]`, dropping `Expr`/`Stmt`/`Binding` from 24 to 16 bytes and reducing alignments across the hot path. The change also boxes a couple of rarely used fields to keep linker and AST data smaller, which should improve memory footprint and cache behavior.

### **fs.open now accepts integer-valued doubles (e11be56)**
`fs.open`/`openSync`/`promises.open` now accept numeric flags even when JSC boxes them as doubles, as long as they’re valid int32 integers. This fixes real wasm/Go compatibility issues where `syscall/js` passes values like `578` as a float, while still rejecting non-integer numbers.

### **node:v8 startupSnapshot.isBuildingSnapshot() returns false (4261a46)**
Bun now matches Node by reporting `false` for `startupSnapshot.isBuildingSnapshot()` instead of throwing `ERR_NOT_IMPLEMENTED`. That unblocks modules like `bson`/`mongodb` that probe the API during import time.

### **fs compatibility jumps forward with Node v26.3.0 test ports (dae2e87)**
A large `node:fs` compatibility sweep ports upstream Node tests and fixes the behaviors they exposed: copy semantics, watcher delivery, `glob`, `opendir`, `mkdtempDisposable`, recursive `rmdir` end-of-life handling, and more. This is a broad correctness pass that materially improves Bun’s `fs` parity and raises coverage significantly.

### Other misc changes
- Dependency/tooling and internal test fixture updates around the fs work
- Small AST/bundler/internal refactors to support the layout changes
- Added/updated tests for the v8 startup snapshot stub
