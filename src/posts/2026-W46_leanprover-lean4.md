---
date: 2026-11-15
repo: leanprover/lean4
period: weekly
slug: 2026-W46
period_label: "Nov 9–15, 2026"
size: L
title: "Lean4 lands HTTP hardening, faster imports, and safer builds"
excerpt: "A week of major HTTP/runtime fixes, big compile-time wins in imports and match generation, plus Lake cache and build safety improvements."
commits: 85
---

### **HTTP and runtime behavior were hardened across the board**
Lean’s `Std.Http` stack picked up a round of RFC-oriented fixes: responses now handle framing and status codes more correctly, keep-alive timeout accounting was fixed after slow writes, and several edge cases around `CONNECT`, `Connection: close`, head-only rejections, and malformed bodies were tightened up. On the runtime side, process I/O was revamped for concurrent stdin/stdout/stderr handling, `Process.Child.kill` now matches its documented force semantics, `LEAN_STACK_SIZE_KB` is applied before runtime threads start, and `.olean` loading now reports memory/mmap failures much more clearly.

### **Compile-time performance improved in imports, recursion, and equation generation**
Module imports got substantially cheaper by storing simp sets and instances lazily, with additional wins from lazy parser evaluation and skipping native-symbol lookups for non-native modules. Large mutual recursion blocks are also less expensive to elaborate, while kernel/meta paths improved via faster `reduceRec` proof checks, full-bit hashing for `Nat` literals, and an occurs check in `Sym` unification. Match compilation saw several rounds of speedups too, especially for tricky value patterns, string literals, and `match h : e` cases.

### **Lake and CI became safer and less blocking**
Lake’s build store was refactored around mutex-based shared state, and cache/build handling got a series of correctness fixes: downloads now stage through temp files, artifact writes are atomic, stale traces and hashes are cleared more reliably, and concurrent source edits are now treated as build failures instead of store corruption. CI also got lighter-weight cache uploads, broader `lean-beam` coverage, and a few toolchain-checking adjustments for rebootstrapped packages.

### **Language tooling and deprecation diagnostics were expanded**
The deprecation linter now catches deprecated declarations used through automation attributes like `simp` and `grind`, with better removal hints and broader coverage across syntax and command forms. Parser support was extended so module headers can be parsed from arbitrary offsets, and `Std.Async.Watchdog` gained reusable deadline enforcement for async waits. Bitvector tactics also picked up substitution support and extra simplification power.

### **Other misc changes**
- `Substring.Raw.splitOn` now handles backtracking correctly.
- `Dyadic.toRat` was marked as a coercion, with related `norm_cast` lemmas.
- `VersionedTextDocumentIdentifier` was reverted to `version?` for compatibility.
- OpenSSL and libuv were bumped in build/runtime support.
- Stage0 snapshots and various tests, docs, and refactors were updated throughout the week.
