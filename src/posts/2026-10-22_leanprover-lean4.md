---
date: 2026-10-22
repo: leanprover/lean4
size: L
title: "Grind gets safer and smarter"
excerpt: "Lean4 adds Nat-subtraction cancellation and fixes several grind/quotation/deprecation edge cases, plus a benchmark speedup."
commits: 16
authors: [leodemoura, TwoFX, Kha, Rob23oba, nomeata]
commit_authors: {"3230759": leodemoura, "f37a027": leodemoura, "db5c132": Kha, "54fc167": TwoFX, "148495b": TwoFX, "32c68d6": TwoFX, "61cf293": TwoFX, "17b8fd4": Rob23oba, "94e0a0e": nomeata, "1e072a5": leodemoura, "32db147": leodemoura, "30466c9": leodemoura, "7b9a131": leodemoura, "68119e0": leodemoura}
---

### **Nat subtraction cancellation lands in `grind`** (f37a027)
`grind`'s symbolic arithmetic normalizer now cancels common terms on both sides of `Nat` subtraction, e.g. `n + 1 - 1` reduces to `n` and `x*y + 3 - (x*y + z + 1)` to `2 - z`. This closes a real gap versus the legacy normalizer and helps `grind` simplify goals that previously stayed awkwardly shaped.

### **`grind` no longer misinterprets some literals** (3230759)
Literal handling in `grind` now only treats values as interpreted when their type is in normal form, avoiding kernel-invalid proofs from cases like `BitVec w` vs `BitVec 32`. This fixes a soundness issue where definitionally equal-but-syntactically different literal types could be conflated.

### **`grind` avoids stale and invalid homomorphism rewrites** (1e072a5, 32db147, 7b9a131, 68119e0)
Several fixes tighten the homomorphism extension: it now preserves updated congruence information after merging equivalence classes, attaches the right expected type to ground-evaluation steps, and skips rewriting `HEq` facts and raw `Nat` literals. Together these address internal errors and proof-checking failures in common arithmetic and proof-transport scenarios.

### **Deprecation warnings now reach more user-facing code paths** (61cf293, 54fc167, 32c68d6)
Quotation precheck and deprecated-syntax reporting now catch more cases: deprecated constants inside checked quotations are reported where they are defined, field notation on bound quotation variables is accepted, and deprecated constants/syntax inside deprecated tactic expansions are still surfaced when they come from user-written syntax. This makes the deprecation tooling both stricter and less noisy in macro-heavy code.

### **Typeclass retries no longer spin on unchanged stuck goals** (30466c9)
Elaboration now remembers stuck typeclass problems and skips retrying them until the underlying metavariables change. This turns some previously quadratic elaboration patterns into linear-time behavior, with a reported drop from seconds to milliseconds on large arithmetic examples.

### Other misc changes
- Stage0 refreshes (2 commits)
- `Kernel.Environment.replay` now orders `String.ofList`/`Char.ofNat` first (94e0a0e)
- `LocalInstance` erasure handling was generalized for non-free-variable instances (17b8fd4)
- `DeprecatedSyntax.lean` moved to `DeprecatedSyntax/Basic.lean` (148495b)
- Benchmark/test updates for the above fixes (db5c132)
