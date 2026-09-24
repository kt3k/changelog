---
date: 2026-09-23
repo: leanprover/lean4
size: L
title: "Lean gets an arithmetic simproc and safer RC runtime"
excerpt: "Big math automation lands alongside RC overflow fixes, a DiscrTree refactor, and a few smaller ergonomics tweaks."
commits: 10
authors: [leodemoura, Kha, sgraf812, TwoFX, vincentqb, robsimmons, cppio, kim-em, alok]
commit_authors: {"8546083": vincentqb, "33bb0aa": leodemoura, "2b21d8b": Kha, "3baf820": sgraf812, "0a25df2": TwoFX, "fbfa241": robsimmons, "28fb510": cppio, "3fd252f": kim-em, "033def3": alok}
---

### **Arithmetic normalization now handles relations and `Sym.simp`** (33bb0aa)
`Sym.Arith.normalize?` now normalizes `=`, `≤`, and `<` over commutative rings and semirings, moving terms to one side and simplifying to polynomial normal form. That lets the `arith` simproc close goals when both sides reduce to the same polynomial, and extends `Sym.simp` with an opt-in arithmetic pre-simproc.

### **Runtime RC overflow handling is hardened** (2b21d8b, 8546083)
The runtime now distinguishes ordinary sticky counts from counts that overflowed out of the single-threaded range, and treats both as unshared where appropriate. This closes a potential undefined-behavior hole in sharing/deletion cascades by ensuring children of overflowed objects are also marked thread-shared or preserved correctly.

### **Discrimination trees gain a single-child chain form** (fbfa241)
`DiscrTree` now represents no-value single-child nodes with a dedicated `.chain` branch instead of a full node. This is a memory-optimized refactor that also touches insertion, matching, and pretty-printing, so it should reduce overhead in common trie-heavy uses like simplification.

### **Deprecated tactic warnings are deduplicated per call** (3baf820)
Deprecated tactics now warn at most once per invocation, even if the tactic expands into multiple deprecated uses internally. This cuts noisy repeated warnings for expansions like `mintro a b c` while preserving the deprecation signal.

### Other misc changes
- Grove data regenerated and invalidated facts updated (0a25df2)
- `instSMulOfMul` priority adjusted (3fd252f)
- Error/messages switched to backtick quoting in elaborator tactics (033def3)
- Removed several redundant instances (28fb510)
