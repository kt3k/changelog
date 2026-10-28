---
date: 2026-10-27
repo: oven-sh/bun
size: L
title: "AOT compiler lands; core Rust safety refactors"
excerpt: "Bun adds ahead-of-time compilation and major Rust lifetime/ownership and dependency refactors, alongside CSS parser consolidation and WebKit upgrades."
commits: 9
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"7942008": Jarred-Sumner, "8d5672c": Jarred-Sumner, "9b8347a": dylan-conway, "92e819d": dylan-conway, "c643ea8": dylan-conway, "a0cc096": dylan-conway, "99ee03e": dylan-conway, "8a0e49e": dylan-conway, "98a4365": dylan-conway}
---

### **Ahead-of-time compilation for `bun build --compile`** (8d5672c)
Bun now supports `bun build --compile --aot`, compiling TypeScript and JavaScript to machine code at build time so the executable starts as machine code and ships without a JIT. The change also wires up dedicated AOT test lanes and hardened build handling, making this a major new runtime/build feature.

### **CSS parser fixes consolidated into one pass** (7942008)
This rolls a large set of CSS parser/minifier/lowering/printing fixes into a single release. The goal is correctness against browser behavior, with changes spanning parsing, media queries, properties, CSS modules, and printer logic after broad validation against real stylesheets.

### **Bun’s WebKit engine is upgraded twice, including a hot follow-up** (a0cc096, 9b8347a)
The repo first moves to WebKit `982277c9dd3e`, then immediately advances again to `191c6a41380b`. These updates adjust Bun’s build flags, prebuilt naming, and engine compatibility tests, keeping the embedded JavaScriptCore snapshot current.

### **`bytemuck` is replaced with an in-tree POD crate** (92e819d)
Bun removes the external `bytemuck` dependency in favor of a new `bun_pod` crate, re-exported through `bun_core`. That shifts byte/value casting into repo-owned, compiler-checked traits and APIs, reducing dependency surface and tightening the safety model around raw byte conversions.

### **Safe Rust tar/gzip implementation replaces libarchive** (c643ea8)
`libarchive` is removed and replaced with native Rust tar and gzip handling. This is a substantial maintenance and safety win: Bun now owns the archive logic directly instead of relying on a large C dependency and its patch stack.

### **Core lifetime fixes close use-after-free bugs** (8a0e49e, 98a4365)
These commits make string and source lifetimes real in the type system, fixing use-after-free issues in error printing and `BuildMessage.position.file`. They’re high-impact correctness fixes because they turn previously latent memory bugs into compile-time errors across the AST, bundler, and string layers.

### **Histograms move to safe Rust and Node semantics are corrected** (99ee03e)
Bun drops HdrHistogram and replaces `perf_hooks` histogram tracking with a new safe Rust implementation. The change also aligns `createHistogram()` and `monitorEventLoopDelay()` behavior with modern Node semantics, which matters for observability and API compatibility.

### Other misc changes
- Removed obsolete scheduled dependency-update workflows for libarchive and HdrHistogram.
- Documentation updates for CSS bundling, Windows build paths, AOT compatibility, and Rust ownership guidance.
- Build/script tweaks for WebKit packaging, hardened builds, and Rust lint/miri coverage.
- Small refactors in Bun string handling, builtin codegen, and WebKit build flags.
