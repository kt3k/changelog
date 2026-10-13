---
date: 2026-10-12
repo: leanprover/lean4
size: L
title: "Lean4 adds big constructor and runtime wins"
excerpt: "Constructor fields over 255 now spill cleanly, JSON rejects duplicate keys, and release builds switch to stage2 binaries."
commits: 10
authors: [TwoFX, Kha, hargoniX, Garmelon, nomeata, leodemoura]
commit_authors: {"6216cc1": Garmelon, "a6eb9d4": Kha, "4b4ede5": TwoFX, "157bd5b": nomeata, "db7f10e": leodemoura}
---

### **Structures now support constructors with more than 255 object fields** (a6eb9d4)
Lean’s compiler can now lower constructors with arbitrarily many object fields by spilling overflow fields into a linked chain of spill objects. This removes a long-standing constructor size limit and preserves runtime/later-pass behavior without forcing changes in user code.

### **Release builds switch to stage2 binaries** (6216cc1)
Normal and nightly releases now use stage2 binaries instead of stage1, which means shipped oleans are no longer built by stage0. The build/release plumbing is simplified as a result, and the change should also improve cache behavior for release packaging.

### **`Lean.Json.parse` now rejects duplicate object keys** (157bd5b)
JSON parsing now fails on objects with repeated keys instead of silently keeping the last one. That tightens correctness for consumers of `Lean.Json.parse` and lets LeanExport reuse the shared parser again instead of carrying a separate strict copy.

### **`String.push` gets an inline fast path** (4b4ede5)
The runtime now handles the common exclusive-string append case directly in the hot path, avoiding a call into the cold fallback when there is spare capacity. This is a targeted performance improvement for UTF-8 string construction.

### **`BitVec.ofNat w k` normalizes better under symbolic widths** (db7f10e)
`grind`’s symbolic normalizer now canonicalizes `BitVec.ofNat` literals even when the width is not a literal. This makes bitvector theorems and AC reasoning work more reliably on terms like `0#w` and `x.sdiv 0`.

### Other misc changes
- Enabled `linter.redundantVisibility` in the core build and removed many redundant visibility modifiers.
- Exposed `UInt8.isUTF8ContinuationByte` as public API and renamed the old UTF-8 continuation-byte helper.
- Improved simplification of repeated `cases`/`let` patterns in the LCNF compiler.
- Marked `Char.utf8Size` inline for a small performance gain.
- Fixed `bv_decide` imports under the module system.
