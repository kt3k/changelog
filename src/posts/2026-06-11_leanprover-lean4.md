---
date: 2026-06-11
repo: leanprover/lean4
size: L
title: "Lean4 lands grind fixes and incr snapshots"
excerpt: "Major grind correctness fixes, new incremental snapshot CLI flags, and several performance and Std.Internal.Do refactors landed."
commits: 16
authors: [leodemoura, Kha, wkrozowski, kim-em, sgraf812, TwoFX, Garmelon, hargoniX, frangio]
commit_authors: {"f92bd6a": leodemoura, "ed0ad14": leodemoura, "6dbb96a": leodemoura, "45c6939": wkrozowski, "df63d6b": Kha, "b8b35fc": Kha, "c3cacf6": TwoFX, "d6ecb89": Kha, "3228e08": wkrozowski, "d11f9de": Garmelon, "7bb3fe8": kim-em, "5ada5e6": hargoniX, "aa2317a": sgraf812, "8ce8a63": kim-em, "9c18b08": frangio}
---

### **Fix grind’s generalized-pattern metavariable bug** (f92bd6a)
`grind` no longer trips an `unknown metavariable` error when instantiating delayed `match`-equation generalized patterns. The fix carefully internalizes and proves the equality while avoiding dangling metavariables from theorem parameters that are only assigned later.

### **Fix invalid proofs for `match` conditions in grind** (ed0ad14)
`grind` was sometimes constructing kernel-rejected proofs for `match` expressions with overlapping patterns and proof discriminants. The fix tightens which hypotheses get `MatchCond` annotations and uses `False` as the `noConfusion` target, matching the actual shape of `match` conditions.

### **Add `cbv` to `grind`’s `sym =>` mode** (45c6939)
`grind` can now use call-by-value reduction interactively via `sym => cbv`, including `at` locations like `cbv at h` and `cbv at *`. This makes it easier to simplify goals and hypotheses directly inside `grind`, and equation goals can close automatically with `refl` after reduction.

### **Add experimental disk-based elaboration resumption flags** (b8b35fc)
Lean now has `--incr-save`, `--incr-load`, and `--incr-header-save` for reusing elaboration state across runs. This is a big workflow and performance feature for large projects, enabling snapshot reuse when syntax and imports haven’t changed.

### **Speed up snapshot loading by deferring dep-region sorting** (df63d6b)
`--incr-load` gets a fast-path optimization that skips sorting dependency regions unless the slower structural fixup walk is actually needed. The change reportedly cuts import snapshot load time by about 5× on large headers.

### **Add `lake lint --record-exceptions`** (3228e08)
`lake lint` can now record lint exceptions back into the build output by inserting the appropriate `set_option`. That makes it easier to suppress known warnings at the source instead of managing them externally.

### **Add constant folding for `USize` and bitwise ops** (5ada5e6)
The compiler’s constant folder now handles more `USize` arithmetic and common bitwise operations. That should improve simplification opportunities in generated code and reduce runtime work in optimized paths.

### **Improve `grind`’s `cbv` support and printability fixes** (6dbb96a)
`mkSimpleThunkType` now uses `_` instead of `Name.anonymous`, avoiding accidental shadowing and misleading inaccessible names in pretty-printed output. This fixes a subtle compiler/tactic hygiene issue that could affect generated binder names.

### **Rework `Std.Internal.Do` order metatheory** (aa2317a)
The `Std.Internal.Do` proof infrastructure was reorganized into dedicated `Order/` modules, with many lemmas renamed and delaborators added for better pretty-printing. It’s a substantial internal refactor that should make the library easier to maintain and extend.

### **Separate `Std.Internal.Do` exception-post/order naming cleanup** (2686e08)
`Std.Internal.Do` got a broad naming and attribute cleanup, including renamed exception-postcondition and order lemmas. This is mostly mechanical, but it helps align the API with Lean’s naming conventions and reduces speculative `grind` annotations.

### **Add `Environment.hasExposedBody` helper** (8ce8a63)
Lean now exposes a dedicated helper for checking whether a declaration’s body is exported to downstream modules. This removes duplicated inline logic and gives both core Lean and downstream code a clearer API.

### Other misc changes
- Performance: avoid kernel env blocks in `replayKernel` (d6ecb89)
- Message/linter plumbing updates for persistent lint recording (3228e08)
- Trace emoji rendering moved out of stored trace headers (7bb3fe8)
- Float NaN normalization now uses a fixed bit pattern (c3cacf6)
- CI workflow pin fix for `potiuk/get-workflow-origin` (d11f9de)
- Added/updated tests for the above changes and a small `LawfulApplicative` simp lemma set (9c18b08)
