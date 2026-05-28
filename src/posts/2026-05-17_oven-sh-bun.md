---
date: 2026-05-17
repo: oven-sh/bun
size: L
title: "Bun gains Miri, fixes install dedupe, and tightens UB"
excerpt: "New Miri support and several UB/perf fixes landed, plus install now reuses existing folder/tarball entries instead of duplicating package.json keys."
commits: 7
---

### **Add cargo-miri support and fix HiveArray aliasing UB** (80a06a8)
Bun now has a `bun run rust:miri` workflow that runs `cargo miri test` over a curated set of pure-Rust crates, using Tree Borrows to better match the project’s aliasing patterns. The same change also fixes a serious `HiveArray` aliasing issue and updates a number of nearby collections/runtime paths to be Miri-safe.

### **Install now reuses existing folder/tarball entries** (035add3)
`bun add -g` no longer appends duplicate `package.json` entries when the same local folder/tarball-style dependency is installed again. This closes a real install-idempotency bug, including the aliasing case where the user explicitly wants a separate package name.

### **Fix utf16le fs.readFile layout UB** (655398c)
The UTF-16/ucs2 `fs.readFile` path no longer reinterprets a `Vec<u8>` as a `Vec<u16>` with mismatched allocator layout. It now copies into a properly aligned `Vec<u16>`, removing undefined behavior in a public file-reading code path.

### **Collapse dead bundler generic and gate cpuid correctly** (c7a7579)
`ThreadPool::init` drops an obsolete generic left over from the Zig-to-Rust port, simplifying the API now that the duplicate `BundleV2` path is gone. The hardware timer cpuid helpers are also gated out on macOS and FreeBSD x86_64, avoiding platform-specific misuse.

### **Bundler/transpiler hot paths were optimized** (945b894)
This day includes a broad performance pass across bundling, parsing, printing, renaming, and sourcemap generation. It also adds a benchmark fixture, suggesting the changes were aimed at real hot-path wins rather than just cleanup.

### **Miscellaneous refactors and safety cleanup** (172afa5, 112f305)
- Replaced Bun-specific assert helpers with Rust `assert!` macros across many files.
- Removed unnecessary `unsafe` string conversions for static literals.
