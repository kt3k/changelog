---
date: 2026-09-02
repo: oven-sh/bun
size: L
title: "Bun tightens bundling, preload, and file handling"
excerpt: "Major bundler fixes land for lifted CommonJS, modulepreload, and chunk splitting, alongside compile-size and file streaming bug fixes."
commits: 20
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"8025074": robobun, "696ce5a": robobun, "84e2bb2": robobun, "9c3683f": Jarred-Sumner, "1564c1e": robobun, "7c18e0d": Jarred-Sumner, "a28f829": robobun}
---

### **Bundler lifts CommonJS exports more accurately** (696ce5a)
Bun now recognizes `module.exports = require(...)` patterns in unwrapped packages and lifts them into ESM exports even when side effects come first. This fixes React 19 production builds and other CommonJS-to-ESM interop cases where the bundler previously missed export lifting.

### **Writes through lifted CommonJS namespace objects now stick** (84e2bb2)
A write to the namespace object of a lifted CommonJS module now updates the underlying lifted bindings, matching Bun/Node expectations. This fixes cases like `config.debug = true` and React’s namespace-style assignment patterns where reads and writes had diverged.

### **Browser splitting gets automatic `modulepreload`** (7c18e0d)
Bun now emits `<link rel="modulepreload">` for browser splits so `import()` dependency chains download in parallel instead of round-tripping one layer at a time. This is a meaningful performance win for lazy-loaded browser apps, especially deep route trees.

### **`--min-chunk-size` now folds React apps more effectively** (9c3683f)
The chunk-merging pass was expanded to cover more real-world browser dependency shapes, including lifted CommonJS modules already initialized elsewhere. That makes the option practical on React apps and avoids the static import cycle/crash it could create.

### **`bun build --compile` now errors on oversized embedded graphs** (1564c1e, 8025074)
Compile-time bundling now fails cleanly instead of producing broken executables when the embedded graph would exceed 4 GiB on Linux/FreeBSD or when Mach-O offsets overflow on macOS. This closes a correctness hole that previously surfaced as startup failures or panics.

### **File routes and unread file streams preserve slice bounds** (a28f829)
`Bun.file(...).slice(...).stream()` and file-serving paths now respect the original offset/length when converting unread streams back into blobs or HTTP responses. That fixes incorrect full-file reads and makes range/file route behavior consistent.

### **Other misc changes**
- CI lanes now run all test files on darwin PR builds.
- Removed `mitata` from the root devDependencies.
- Bumped `@types/node` and `@lezer/cpp`.
- Fixed `bun:test` pretty-format handling for non-numeric `size`.
- Stabilized a flaky CompressionStream HTTP sink test.
- Fixed `bun init` when existing dependency fields aren’t objects.
- Fixed auto-install logging during sleep/wait.
- Improved entry-point handling for builtins and anonymous export-default classes.
- Updated bundler/docs/tests around CommonJS interop, chunking, and preload behavior.
