---
date: 2026-07-30
repo: leanprover/lean4
size: L
title: "Lean4 tightens VCGen and kernel safety"
excerpt: "New do-notation assertions, faster vcgen framing, and multiple soundness fixes land alongside module export and contract syntax updates."
commits: 15
authors: [sgraf812, leodemoura, algebraic-dev, tydeu, wkrozowski, TwoFX]
commit_authors: {"d53dcb2": leodemoura, "41056da": leodemoura, "8be3650": tydeu, "fd1cec3": leodemoura, "a0acacb": sgraf812, "a97629d": sgraf812, "0a67f6b": sgraf812, "c7673e7": sgraf812, "103ef69": wkrozowski, "2d0879c": sgraf812, "d19a5e5": sgraf812, "f9541a7": algebraic-dev, "44d40a3": algebraic-dev, "55293f2": algebraic-dev, "5fe7f24": TwoFX}
---

### **VCGen framing is reworked for footprint-based inference** (d19a5e5)
`@[frameproc]` procedures can now discharge split verification conditions themselves, which lets frame inference handle operators like separating conjunction that the built-in lattice split could not decompose. This is a major vcgen overhaul that improves separation-logic support and makes framing more scalable.

### **`partial` export stubs are now marked unsafe** (d53dcb2)
A module-system soundness bug let exported stubs of `partial` definitions lose their unsafe marking, making them usable from safe declarations downstream. The fix ensures any non-`safe` exported definition stays unsafe, closing a meta-programming exploit path.

### **Kernel now rejects mutual blocks with mismatched universe params** (41056da)
Mutual definitions must now share the same universe level parameters, matching an invariant the elaborator already enforced. This plugs a kernel-level hole that meta-programming could bypass and avoids cache-related unsoundness.

### **Intrinsic verification gains `assert` in `do` blocks** (a0acacb)
`do` notation can now contain `assert P` and binder forms like `assert s => P s`, which vcgen reads as proof obligations while erasing them at runtime. This adds a new public verification-syntax feature for programs using intrinsic verification.

### **`requires`/`invariant` clauses can bind their own arguments** (0a67f6b)
Preconditions and loop invariants now accept binder forms such as `requires s => ...` and `invariant pref suff s => ...`, removing the need for extra `fun` wrappers. That makes contract and invariant syntax more expressive, especially for stateful specifications.

### **vcgen frame inference is optimized and decoupled from speculative applies** (a97629d)
Frame inference inputs are computed on demand again, restoring performance lost in an earlier change. The refactor also reshapes the frame-proc machinery around explicit split proofs and residual preconditions, reducing unnecessary work during spec application.

### **`for` invariants are simplified to prefix/suffix semantics** (c7673e7)
The loop-invariant representation for `Std.Internal.Do` was made non-dependent, with invariants now phrased directly over the consumed and remaining list segments. This is a broad internal refactor that simplifies the generated VCs and changes how `for ... invariant` is elaborated.

### **Code-quality benchmark frontend is added** (103ef69)
A new runner frontend for the upcoming code-quality checking framework was introduced. It lays the groundwork for future linting/quality automation rather than changing existing compiler behavior.

### **HTTP server benchmark added** (f9541a7)
New compile benchmarks exercise the HTTP server and TCP variants. This helps track performance regressions in the server stack over time.

### **HTTP `Builder.stream` overwrite bug fixed** (44d40a3)
The stream body builder no longer risks overwriting a known size in time-sensitive scenarios. That fixes a subtle correctness issue in HTTP body handling.

### **`requires` replaces `require` for def contracts** (2d0879c)
The contract precondition clause on `def` has been renamed from `require` to `requires`, aligning it with `ensures` and updating the parser/macro plumbing accordingly. This is a source-level syntax change for contract-bearing definitions.

### **Other misc changes**
- Untraced internal build flags in the core build trace (8be3650)
- Added a missing metavariable/free-variable check in inductive kernel code (fd1cec3)
- Deflaked an HTTP unknown-size stream test (55293f2)
- Simplified `bif`/`cond` handling and related lemmas/tests (5fe7f24)
