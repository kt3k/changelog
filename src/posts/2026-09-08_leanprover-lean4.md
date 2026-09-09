---
date: 2026-09-08
repo: leanprover/lean4
size: L
title: "Lean4 tightens runtime, ranges, and HTTP checks"
excerpt: "Major runtime/compiler fixes plus new linearity and range-syntax features, with an HTTP keep-alive bug fix and stronger kernel checking."
commits: 15
authors: [hargoniX, TwoFX, sgraf812, Kha, counter2015, Garmelon, mhuisi]
commit_authors: {"9e3f6c6": hargoniX, "541b047": hargoniX, "0ec0b26": Kha, "0b8b096": sgraf812, "00e8d4f": hargoniX, "9bf5dc0": counter2015, "d359ee1": hargoniX, "b3a2723": TwoFX, "b6c90c7": sgraf812, "d3e5469": Garmelon, "9a8e2b0": TwoFX, "52a0b49": mhuisi, "a89213b": TwoFX, "628e089": hargoniX}
---

### **Fix constructor layout size checks and move validation earlier** (9e3f6c6)
Lean now checks constructor field and scalar-size limits with the correct comparison, fixing an off-by-one bug that could let oversized layouts slip through or reject valid ones. The validation logic was also centralized in `CtorInfo.checkValid`, making constructor-layout handling in the compiler more consistent.

### **Add linearity markers for Array, ByteArray, FloatArray, String, and Vector** (00e8d4f, 541b047)
These commits add runtime-backed `markLinear`/`propagateMark` primitives so values can be forced unique and then tracked for non-linear use, with optional panics via `LEAN_ABORT_ON_NONLINEAR`. This is a significant runtime feature for catching accidental sharing bugs, and `Vector` gained the same API on top of the existing array support.

### **Teach `for` loops to infer range element types from context** (b3a2723)
Range iterators are now default instances, which lets the loop variable determine the type of literal or otherwise unconstrained ranges. That makes patterns like `for (i : Int) in 1...3` and `for (i : Fin 3) in *...*` work without extra annotations.

### **Fix range syntax precedence** (a89213b)
The range notations were given explicit precedence so they bind looser than arithmetic but tighter than relations and membership. This fixes cases like `1 + 2...3` and `a...b |>.toList`, which previously parsed in surprising ways.

### **Close idle HTTP connections after keep-alive timeout** (9bf5dc0)
`Std.Http.Server` now closes idle connections that have exceeded the keep-alive timeout, preventing stalled servers from holding connection slots indefinitely. The regression tests cover idling before the first request, idling between requests, and handlers that outlive the timeout.

### **Switch `lake check`/`challenge` to an external Lean checker** (628e089)
Lake now runs the default kernel in a separate `leanchecker` process instead of inside the main process, adding privilege separation for `check` and `challenge`. The change is framed as hardening rather than a functional fix, but it materially improves isolation for kernel verification.

### Other misc changes
- Added `ext`/`ext_iff` theorems for `ULift`, `PULift`, `PLift`, and `MProd` (0b8b096)
- Added `DecidableRel (Option.le r)` (52a0b49)
- Fixed `vcgen` to report missing specs more cleanly for unsteppable heads (b6c90c7)
- Passed extra Lean options to `moreGlobalServerArgs` to match CLI/server behavior (9a8e2b0)
- Fixed LF line endings for `lean.export` (d359ee1)
- CI and adaptation workflow tweaks, plus stage0 and CODEOWNERS updates (0ec0b26, d3e5469, 235b759)
