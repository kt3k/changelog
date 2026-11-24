---
date: 2026-11-23
repo: leanprover/lean4
size: L
title: "Formatter lands; smart unfolding and kernel fixes"
excerpt: "Major formatter infrastructure, smart-unfolding correctness fixes, kernel theorem opacity, and a Nat.iterate rename shipped today."
commits: 22
authors: [mhuisi, leodemoura, TwoFX, nomeata, Rob23oba, hargoniX, Kha]
commit_authors: {"3312359": nomeata, "29b3ea2": Rob23oba, "6e59fcc": nomeata, "da1fdb8": hargoniX, "0065ea0": mhuisi, "7b4d6ee": mhuisi, "b44c4db": mhuisi, "c3e2115": TwoFX, "7443c0b": Kha, "231ef9a": leodemoura, "9966abe": leodemoura, "f41f9c4": leodemoura}
---

### **Formatter infrastructure added across Lean** (b44c4db)
A large formatter subsystem landed in `Lean.Fmt`/`Lean.FmtM`, with new core formatting, layout, comments, primitives, and utility modules. This is a substantial new capability for pretty-printing and source-preserving formatting across the compiler and tools.

### **Core syntax formatter support** (0065ea0)
Formatter implementations were added for a wide range of core syntax forms, including arrays, bitvectors, `conv`, `by_cases`, ranges, lists, and more. This expands the formatter from infrastructure into actual coverage for Lean’s built-in syntax.

### **Missing-formatter linter added** (7b4d6ee)
Lean now has a linter and script to detect missing formatter coverage. That helps keep the new formatter subsystem complete as syntax evolves.

### **Smart unfolding fixed for nested matches and extra arguments** (f41f9c4, 9966abe, 231ef9a)
Smart unfolding was tightened so it only reduces when the relevant marked matches are actually safe to inspect, including nested discriminants, function-valued matches, and extra arguments to the resulting function. These fixes prevent elaboration from producing proofs the kernel later rejects, which directly improves soundness around `rfl` and `dsimp`.

### **Functional induction now handles harder matches** (3312359)
The functional induction principle generator can now refine goals through matches whose discriminants cannot all be abstracted, avoiding previous “failed to transform matcher” errors. This unblocks induction on structurally recursive definitions that use more complex dependent matches.

### **Theorem values are opaque to the kernel** (6e59fcc)
The kernel now treats theorems like opaque declarations for reduction and type checking, matching elaborator behavior. This removes import-order dependence from theorem values and closes a long-standing inconsistency in kernel reduction.

### **`Nat.repeat` renamed to `Nat.iterate`** (29b3ea2)
`Nat.repeat` was renamed and generalized to `Sort u`, with `repeat` kept as a deprecated alias. The runtime tail-recursive version was renamed too, and several core users and tests were updated accordingly.

### **`leanchecker` simplified to export-based checking** (7443c0b)
`leanchecker` now only supports `--from-export`, dropping the older `.olean` replay modes. This narrows the tool to the flow used by `lake check`/`lake compare` and removes a chunk of legacy code.

### **`UIntX`/`SIntX` decidable quantifier instances demoted** (c3e2115)
The `Decidable` instances for `∀`/`∃` over fixed-width signed and unsigned integers were changed from global instances to locally activatable defs. This reduces typeclass search noise while keeping the instances available when explicitly enabled.

### **`epr` ignores irrelevant elements** (da1fdb8)
`epr` now filters out elements that do not appear in the ground problem or quantified hypotheses. That makes the search space smaller without changing satisfiability, improving performance on these problems.

### Other misc changes
- Stage0 refreshes (3 commits)
- Formatter/test infrastructure and docs updates
- Misc `grind` test/output updates
- `Nat.iterate` compatibility/deprecation helpers and affected downstream tests
