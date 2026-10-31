---
date: 2026-10-30
repo: leanprover/lean4
size: L
title: "Lean gets faster bit ops, hashes, and Lake resilience"
excerpt: "Major perf wins for bitvectors, strings, and hashing; new modular UInt64 and Nat.extendedGcd APIs; several fixes to Lake, time, JSON, and grind."
commits: 23
authors: [kim-em, leodemoura, tydeu, hargoniX, matthiasgoergens, david-christiansen, marcelolynch, algebraic-dev, sgraf812]
commit_authors: {"09da21b": kim-em, "96437a4": kim-em, "40b2d02": kim-em, "ecc8dbc": tydeu, "b427f11": marcelolynch, "ceb41ee": tydeu, "3bf84a2": leodemoura, "b7beef9": algebraic-dev, "8acca15": hargoniX, "2d347a2": hargoniX, "8ac269c": matthiasgoergens, "22b4d4f": matthiasgoergens, "5f155ca": david-christiansen, "0f852cc": david-christiansen, "464c6ce": leodemoura, "02177fe": kim-em, "91ba22d": kim-em, "8c3c6e0": sgraf812, "f0fc2fc": leodemoura, "948a95d": leodemoura, "9e4ae23": leodemoura, "c1a8dfd": tydeu}
---

### **Faster bitvector zero counts and kernel-friendly semantics** (09da21b)
`BitVec.clz` and `BitVec.ctz` were reworked to use `Nat.log2` and `Nat.trailingZeros`-based implementations, with new lemmas preserving the old specifications for proofs and bitblasting. This should improve kernel reduction and compiled execution for zero-counting operations while keeping `bv_decide` support intact.

### **Arbitrary-precision trailing-zero counting for `Nat` and `Int`** (96437a4)
Lean now has an efficient `Nat.trailingZeros`, and `Int.trailingZeros` is implemented to work efficiently on arbitrary-precision integers too. That speeds up dyadic normalization and gives consistent zero-handling semantics across naturals and integers.

### **Add `Vector.modify` for functional element updates** (40b2d02)
A new `Vector.modify` API updates an element by function and leaves the vector unchanged when the index is out of bounds. It also adds the expected reduction and conversion lemmas, making nested updates easier to optimize through uniquely owned buffers.

### **Lake cache transfers now retry transient failures, and lock safely** (b427f11, ecc8dbc, ceb41ee)
Lake’s cache transfer machinery now retries transient download/upload failures up to three times, instead of failing the whole batch on a single dropped connection or corrupted transfer. The cache file write path was also fixed to truncate only after locking, and transitive artifact fetching now prefers a store snapshot to reduce contention.

### **`sym` now distinguishes `let`/`have` types when sharing terms** (3bf84a2)
The `sym` tactic no longer merges `have`/`let` expressions that differ only in their type, avoiding a kernel loose-bound-variable failure. This fixes a real proof soundness issue in shared-term construction.

### **Std.Time formatting/parsing round-trips improved, with scalar unit arithmetic** (b7beef9)
`Std.Time` patterns now better round-trip their own formatted output, and unit offsets/durations support `*` and `/` by `Nat` and `Int` scalars. The patch also fixes a 12-hour formatting bug and broadens accepted timezone pattern forms.

### **`bv_decide` now encodes propositional variables more reliably** (8acca15)
Propositional variables are now supported in `bv_decide` even when they are not wrapped in `decide p = true`. This improves coverage for proofs that mix bitvector reasoning with plain propositional atoms.

### **JSON parse/print edge cases hardened** (8ac269c, 22b4d4f)
`JsonNumber.toString` now prints zero mantissas as `0` in all exponent cases, fixing invalid JSON output and round-trip failures. `Json.parse` also now rejects inputs nested deeper than 10,000 levels instead of risking stack overflow.

### **Markdown parsing/tokenization got a large internal overhaul** (5f155ca, 0f852cc)
The Markdown punctuation table was replaced with code to reduce initializer overhead, and Markdown/Verso gained much richer semantic token support for editors. This is a substantial internal and tooling-facing change, but mostly affects parsing infrastructure and editor integration rather than user-facing syntax.

### **Kernel reduction of `String.toList` is now linear** (464c6ce)
`String.toList` now decodes directly from bytes with a structurally recursive model, avoiding the previous expensive array-based reduction path. That removes a major kernel slowdown for large string literals and prevents recursion-limit failures on long inputs.

### **New public `Nat.extendedGcd` API** (02177fe)
Lean adds a public extended Euclidean algorithm for natural numbers, returning both the gcd and Bézout coefficients with correctness lemmas. It comes with a GMP-backed extern and fallback path, making modular arithmetic and number-theory proofs easier to write and execute efficiently.

### **New modular arithmetic ops for `UInt64`** (91ba22d)
`UInt64.mulMod`, `UInt64.powMod`, and `UInt64.invMod?` are now available for fixed-width modular arithmetic without overflowing intermediate products. The implementation uses efficient runtime support where available and exposes a Lean-visible specification for proofs.

### **`vcgen` now discharges conditional simp hypotheses** (8c3c6e0)
`vcgen` simp sets can now automatically prove and discharge their own side conditions, improving automation on generated verification conditions. This lets ground facts like literal bounds simplify away more often at call sites.

### **`grind`/`lia` interaction and internalization fixes** (f0fc2fc, 948a95d)
Two `grind` bugs were fixed: one involving stale case-split depth in shared `lia` proofs after `cases_next`, and another involving structure eta equations being queued too early during internalization. Both changes eliminate hard-to-diagnose internal solver failures.

### **`Expr` hashing changed to avoid quadratic collisions** (9e4ae23)
Lean reworked `Expr`’s hash combinator to reduce collision patterns that caused quadratic behavior on long application chains. This is a core performance fix in the kernel and elaborator, especially for repeated nested applications.

### **Other misc changes**
- Added comparator documentation requirements. (2d347a2)
- Added a benchmark for Lake module setup computation. (c1a8dfd)
- Stage0 refresh. (ba9237e)
