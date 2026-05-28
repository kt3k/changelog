---
date: 2026-05-15
repo: oven-sh/bun
size: L
title: "Build, FFI, and parser fixes land"
excerpt: "Notable fixes for compiled FFI loading, build option generation, JSON define auto-quoting, plus a major collections refactor and CI format shift."
commits: 5
authors: [dylan-conway, Jarred-Sumner, robobun]
commit_authors: {"4d443e5": dylan-conway, "bb1973e": dylan-conway, "314d044": Jarred-Sumner, "bbd3e62": robobun}
---

### **FFI can now extract embedded shared libs for `dlopen()`** (bbd3e62)
`bun:ffi` now resolves embedded `.so`/`.dylib`/`.dll` assets from a compiled Bun executable to a real temp file before calling `dlopen()`. This fixes `bun build --compile` regressions where `import ... with { type: "file" }` shared libraries could not be loaded from bunfs.

### **Build options are generated from config instead of env var plumbing** (bb1973e)
`bun_core::build_options` now comes from a generated `build_options.rs` written at configure time from `Config`, replacing the previous `BUN_*` env-var handshake. That removes duplicated naming, makes bare `cargo check`/rust-analyzer see real values, and keeps target-specific flags evaluated per-triple.

### **JSON lexer stops breaking `define` auto-quote recovery** (314d044)
The JSON lexer now tokenizes `?`, `*`, `(`, and `)` instead of erroring immediately, which lets Bun’s auto-quote fallback recover unquoted `define:` values that aren’t valid JSON. This fixes cases like raw minified CSS strings starting with `*{...}` that were aborting builds too early.

### **`multi_array_list` refactor funnels unsafe ops through small primitives** (4d443e5)
`bun_collections`’ `multi_array_list.rs` was heavily reworked to route raw SoA operations through a smaller audited primitive set, cutting the file’s unsafe surface while preserving the single-allocation layout. The refactor also centralizes column slicing/mutation behavior, which should make future maintenance and correctness audits easier.

### Other misc changes
- CI format workflow switched from Zig fmt to `cargo fmt --all`.
- Generated/formatting updates across Rust sources and workflow docs.
- Test coverage added for JSON define auto-quoting and compiled FFI loading.
