---
date: 2026-10-29
repo: oven-sh/bun
size: L
title: "Massive safety and API cleanup lands"
excerpt: "Bun removes hundreds of unsafe blocks, tightens core APIs, adds fs windowsHandle support, and fixes TextDecoder OOM behavior."
commits: 13
authors: [dylan-conway, Jarred-Sumner, ig-ant]
commit_authors: {"f7607a3": dylan-conway, "9fe1cd6": dylan-conway, "73a2043": ig-ant, "69f4077": dylan-conway, "e084c83": dylan-conway, "da867c6": dylan-conway, "000ef50": Jarred-Sumner, "377e942": dylan-conway, "57f4f19": dylan-conway, "e64b59d": Jarred-Sumner, "3a9ea00": Jarred-Sumner, "bf80135": dylan-conway}
---

### **fs: add `windowsHandle` support to file streams** (73a2043)
`fs.createReadStream` and `fs.createWriteStream` now accept a raw Win32 `HANDLE`, matching Node's newer behavior. Bun previously ignored the option and could mis-handle empty paths; this change adds native binding support, type overrides, and integration coverage.

### **TextDecoder now throws on allocation failure or oversized output** (69f4077)
`new TextDecoder().decode(bytes)` no longer silently returns an empty string or aborts in edge cases where the decoded result cannot be allocated or exceeds string limits. That makes failure modes consistent for ASCII and non-ASCII input and prevents data loss or process death.

### **AOT/compiler work expands release/build coverage and hardened-test handling** (3a9ea00)
The AOT toolchain and CI layout were reshaped to account for hardened builds as a first-class test target, while non-shipping profiles are excluded from release-specific checks. The commit also updates docs and build plumbing around the compiler feature set, so the AOT path and its CI surface are now more explicit and better separated.

### **Core runtime APIs and internal pointers are simplified across Bun** (f7607a3)
This removes a large batch of `unsafe` from the dev server and several `Bun.*` APIs by switching pointer-heavy code to typed borrows and ownership. The practical effect is less manual memory juggling in transpilation, bundling, and the bake dev server, which reduces the chance of UB in core developer-facing APIs.

### **Test runner and CLI internals shed more raw-pointer code** (9fe1cd6)
The CLI and test runner were similarly refactored away from raw pointers and `unsafe` ownership patterns, cutting a substantial amount of low-level code. This improves maintainability in commands like `run`, `create`, `test`, and completion generation without changing user-facing behavior.

### **Shell, syscall wrappers, CSS parser, bundler, and JS parser continue the unsafe purge** (e084c83, da867c6, bf80135, 57f4f19)
These follow-on safety cleanups remove more `unsafe` blocks and a handful of `unsafe fn`/`unsafe impl`s across low-level subsystems. They also include a dependency/platform update pass, with mimalloc and ICU upgraded and several internal invariants rewritten in safer forms.

### Other misc changes
- ICU semver floor test fix for multi-part ICU versions (000ef50)
- False-positive scan fix in executable capability test helper (377e942)
- Build fix for `bun_bundler` with `test_support` feature (e64b59d)
- Minor type/API borrow cleanups across internal structs and FFI wrappers
