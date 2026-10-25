---
date: 2026-10-24
repo: leanprover/lean4
size: L
title: "Lean4 speeds up arithmetic and fixes grind"
excerpt: "Several performance wins for `lia`/`grind`, plus bug fixes for match conditions, process/syscall wrappers, and annotation cleanup."
commits: 14
authors: [leodemoura, algebraic-dev, ejgallego]
commit_authors: {"9e118e9": leodemoura, "ea5194e": algebraic-dev, "1047ef4": leodemoura, "a76406d": leodemoura, "a81eb85": leodemoura, "d0129c2": leodemoura, "d94d06d": leodemoura, "3fcf10b": ejgallego, "f68d6e9": leodemoura, "e3b2337": leodemoura, "128ed81": leodemoura, "ca5d8ec": leodemoura, "44c734a": leodemoura, "8a66367": leodemoura}
---

### **`lia` now asserts div/mod facts directly into cutsat** (9e118e9)
`lia` skips the E-graph for linear facts derived from `a / k` and `a % k`, pushing them straight into cutsat instead. That should reduce overhead on divisibility-heavy goals; the change is routed via a new `grind` identity field so other tactics can keep using the E-graph path.

### **System and process APIs now reject out-of-range ids correctly** (ea5194e)
Several libuv-backed functions now throw instead of silently truncating process/group ids that do not fit the OS type, and `Std.Async.System.getGroup` now exposes the more precise `Nat`-based API. The patch also tightens process-title handling and updates the runtime bindings across network/system code.

### **`lia` and `grind` stop paying for typeclass resolution on common arithmetic instances** (1047ef4)
Builtin synthesis now reuses core `OfNat` and comparison decidability instances for `Nat` and `Int` during canonicalization. This trims a recurring typeclass-resolution cost in arithmetic tactics.

### **`Expr.consumeTypeAnnotations` and `cleanupAnnotations` are faster** (a76406d, a81eb85)
Both helpers now inspect the expression root directly instead of repeatedly peeling annotations until a fixpoint. The result is less elaborator overhead on every application argument, and the doc tests were updated to match the revised semantics.

### **Kernel checking for `lia` certificates got a major speedup path** (ca5d8ec, d94d06d)
A new `Init.Data.Int.Kernel` module adds recursor-based `Int` operations so the kernel can evaluate `lia` certificates without unfolding slow recursive definitions. The supporting `Int.Linear` refactor covers more certificate forms, including divisibility, Cooper-resolution, and constant-folding cases.

### **`grind` and `lia` avoid extra preprocessing and instance checks** (f68d6e9, 44c734a, e3b2337)
These commits shave off overhead in the cutsat/arith pipeline by skipping `simp` preprocessing for div/mod facts, checking comparison types before probing instances, and reusing cached instantiated constant types in nested-subsingleton marking. Small individually, but together they target hot paths.

### **`grind` match conditions are now revisited when nested subterms change** (8a66367, 128ed81)
`grind` now detects more cases where a `match`-condition becomes decidable after a nested subterm merges with a constructor, fixing order-dependent failures like the `issue15697` regression. It also avoids misclassifying hypotheses as match conditions unless their equation right-hand sides are actual patterns, preserving E-matching for the rest.

### Other misc changes
- Added `lia` benchmark files for performance tracking (d0129c2).
- CI tweak: skip the rebootstrap check for release builds (3fcf10b).
