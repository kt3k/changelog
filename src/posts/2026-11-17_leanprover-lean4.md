---
date: 2026-11-17
repo: leanprover/lean4
size: L
title: "Lean tightens kernels, matches, and runtime safety"
excerpt: "Major fixes and performance wins landed across inductives, match compilation, bit-vectors, shifts, and file-descriptor handling."
commits: 26
authors: [leodemoura, hargoniX, arthur-adjedj, sgraf812, TwoFX, nomeata, Timeroot]
commit_authors: {"4270234": arthur-adjedj, "5490b16": nomeata, "090205b": leodemoura, "73534f4": sgraf812, "d36ae84": leodemoura, "8fe45ea": leodemoura, "ce54676": hargoniX, "7e1b870": sgraf812, "b0f629b": TwoFX, "9800ba0": Timeroot, "c2f3047": leodemoura, "4e8efcb": hargoniX, "16cfd26": hargoniX, "55069db": leodemoura, "d9016d8": leodemoura, "c62325b": leodemoura, "6fd3938": leodemoura, "130a561": leodemoura, "04e0897": leodemoura, "c3bc38c": leodemoura}
---

### **Fix inductive declarations with loose bound variables** (4270234)
The kernel now checks inductive declarations for loose bvars consistently, closing a soundness-adjacent validation gap. The change adds a regression test for the previously accepted malformed declaration.

### **Bump `.olean` format to v4 and merge closure-aware layouts** (5490b16)
Lean now writes a single v4 `.olean` header format instead of keeping separate v2/v3 paths. This also updates the bundled `leantar` dependency and matters for external tooling because stored `Expr` hashes changed.

### **Make `match` equation generation much faster on literal-heavy matches** (090205b, 8fe45ea, d9016d8, 130a561, 6fd3938, 55069db, c2f3047)
A cluster of compiler and elaborator changes substantially reduces the cost of generating and proving `match` equations, especially for many `String` or other literal alternatives. The new logic caches string-literal codes, skips impossible alternatives earlier, generates congruence equations on demand, and reuses proofs more aggressively; benchmarks report large wins such as ~37% faster big string matches and ~25% faster nested constant realization.

### **Make predicate transformers first-class and monotone by construction** (7e1b870)
`Std.Order.PredTrans` now bakes monotonicity into the type itself, changing the public API to `PredTrans.{mk,apply,apply_mono}` and updating `WP` and related lemmas accordingly. This is a notable library refactor with API fallout, but it should simplify downstream reasoning and improve kernel reduction behavior.

### **Harden evaluation against huge shifts and bit-vector widths** (04e0897, c62325b, 9800ba0)
Lean now refuses to eagerly evaluate dangerously large `Nat.shiftLeft`, `BitVec` widths, and related ground terms that previously could panic the process. These safeguards add thresholds and warnings in the evaluator, compiler constant folder, and simp/grind paths, preventing crashes on pathological inputs.

### **Fix runtime IO robustness and descriptor leaks** (ce54676, 4e8efcb)
`io.cpp` now closes file descriptors more safely and avoids a few leak cases, and Lean no longer segfaults when an uncaught `IO.Error.unexpectedEof` reaches `main`. These are concrete runtime stability fixes, including two closed issues.

### **Improve `grind` ring simplification and euclidean remainder handling** (d36ae84, c3bc38c)
The commutative ring solver now picks smaller basis equations for simplification, reducing intermediate polynomial size, and it gains extra euclidean-remainder power on rings without `NoNatZeroDivisors`. Together these changes improve solver effectiveness and modestly speed up benchmarks.

### **Make `vcgen` and related shift handling more efficient** (73534f4)
`vcgen` now zeta-reduces only the left side of unfold specs, avoiding a join-point explosion that made some programs dramatically slower. The benchmarked case drops from seconds to milliseconds, so this is a meaningful performance fix.

### **Pass thread-count settings through comparator children** (16cfd26)
Child Lean processes spawned by the comparator now receive `LEAN_NUM_THREADS`, fixing an environment propagation bug. This matters for reproducibility and performance in threaded runs.

### **Fix `bv_decide` missing-binary detection after process spawn changes** (b0f629b)
The missing-prover error path now detects failures from `IO.Process.spawn` instead of keying off an old exit-code convention. This keeps `bv_decide`’s user-facing error handling aligned with the newer process model.

### Other misc changes
- Stage0 updates (2 commits)
- Documentation clarifications around process spawning
- Benchmark/test additions and updates for Nat literals, shifts, and match equations
- Small internal refactors and API cleanup in runtime, kernel, and tactics
