---
date: 2026-11-15
repo: leanprover/lean4
size: L
title: "Lean gets faster parsing and safer Lake"
excerpt: "Major parser, matcher, and Lake fixes land alongside several string-proof and interpreter speedups."
commits: 13
authors: [tydeu, leodemoura, Kha, ejgallego]
commit_authors: {"1617621": tydeu, "6650592": Kha, "9180032": Kha, "38a5743": ejgallego, "1ded69e": leodemoura, "4f60629": leodemoura, "4b6cc39": tydeu, "bba62c2": tydeu, "4add57c": leodemoura, "d3ba418": tydeu, "23a047a": tydeu}
---

### **Module headers can now be parsed from an offset** (38a5743)
`Lean.Parser.parseHeader` now accepts a starting byte position, so tools can parse headers inside larger source buffers while preserving source locations and leading whitespace. This removes a workaround for embedded regions like Verso and adds regression coverage for UTF-8 offsets.

### **Equation generation for `match h : e` is much faster** (1ded69e)
The match compiler now strips discriminant equality proofs before proving conditional equations, avoiding expensive work when value-pattern matches are applied to `Eq.refl` proofs. This cuts heartbeat use dramatically for large `String` pattern matches and makes equation generation scale much better.

### **String literal disequality proofs got cheaper** (4add57c, 4f60629)
Lean now builds and checks `String`-inequality proofs with lighter-weight kernel terms, first by simplifying the proof construction and then by traversing both strings in one pass when checking character differences. These changes speed up `simp`, `cbv`, and generated match equations that rely on `String` patterns.

### **Imported parsers are evaluated lazily on first use** (6650592)
Parser declarations imported from other modules are no longer fully evaluated during import; they’re wrapped in thunks and compiled only when actually needed. That reduces import overhead and build instructions, especially for large dependency graphs.

### **Interpreter skips native-symbol lookups for non-native modules** (9180032)
Lean now avoids probing native initializers and symbols for modules that have no native code, which speeds up module import and interpretation. On large builds like Mathlib, this trims a measurable chunk of build work.

### **Lake cache writes and downloads are now safer** (d3ba418, 4b6cc39, 23a047a, 1617621, bba62c2)
Lake gained multiple correctness fixes around caching and builds: downloads now stage to temporary files before publishing, artifact writes are made atomic, stale traces are cleared before builds, concurrent source edits can now fail the build instead of poisoning the store, and unpacking `.ltar` archives now clears stale `.hash` files too. These changes close several race conditions and cache-corruption paths.

### **Other misc changes**
- Refactored shared discrimination-tree lookup code.
- Updated stage0.
- Misc Lake job-wrapping/logging fixes.
