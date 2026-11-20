---
date: 2026-11-19
repo: leanprover/lean4
size: L
title: "Lean gets faster VCs, safer runtime fixes"
excerpt: "Major VCGen and do-elaboration performance work lands alongside HTTP, UDP, and array panic fixes."
commits: 25
authors: [sgraf812, hargoniX, Garmelon, algebraic-dev, arthur-adjedj, Kha, eric-wieser, leodemoura, nomeata]
commit_authors: {"e35bfaf": sgraf812, "2b60ee4": sgraf812, "e03729b": sgraf812, "71017ea": algebraic-dev, "87e3155": sgraf812, "4f5982e": sgraf812, "f9f99fa": sgraf812, "86b17ea": sgraf812, "1779fe3": algebraic-dev, "6a57139": hargoniX, "bb2aa32": sgraf812, "2eb82fe": hargoniX, "0c0183e": sgraf812, "0171678": Kha, "b92817b": sgraf812, "8009d0a": leodemoura, "9eba756": nomeata}
---

### **`do` elaboration gets much faster on large blocks** (e35bfaf)
Lean now abstracts continuations lazily when they still contain metavariables, cutting `do` elaboration from cubic behavior toward much better scaling on large blocks. The new `debug.do.eagerAbstraction` option preserves the old eager path for debugging.

### **`do` join points stop redoing work for shared continuations** (f9f99fa, 0c0183e, b92817b)
Several related optimizations reduce repeated control-flow analysis and abstraction in `do` blocks, including caching `ControlInfo`, memoizing `do` sequence control data, and instantiating continuations before abstracting them. Together these target the big slow paths in long `if`/`match`/`for` chains and nested `let mut` code.

### **`vcgen` gets broader join-point support and better specs** (87e3155, 4f5982e, 86b17ea, bb2aa32, 2b60ee4, e03729b)
VC generation can now share and recognize more join-point shapes, including numbered `__vcgen_jp`/`__do_jp` names, and it proves shared post-`if` code once instead of per branch. The day also improves user-facing contract ergonomics: triple notation now reports missing `Std.WP` imports/opens, invariant holes elaborate more cleanly, and Variant-based measures rewrite through a dedicated simp set.

### **`vcgen` and `simp` performance regressions are trimmed** (8009d0a, 2eb82fe, 0171678)
The `split` discharger is made well-behaved to avoid exponential blowups on long `else if` chains, and the universe linter no longer has quadratic behavior. A runtime cleanup also skips the mutex for already-finished tasks in `deactivate_task`.

### **HTTP body reads now respect cancellation correctly** (1779fe3)
`Body.Stream.readAll` no longer treats a cancelled `ContextAsync` read as a successful partial body if the stream has not actually ended. Cancellation now raises unless the stream has already finished, aligning `readAll` and `drain` with the intended stream semantics.

### **UDP ephemeral ports are fixed to avoid collisions** (71017ea)
Binding a UDP socket to port 0 on Linux now guarantees a port that no other live socket already holds. This closes a subtle correctness hole where packets could be delivered to the wrong socket.

### **Scalar-array out-of-bounds accesses now panic** (6a57139)
Out-of-bounds access on `ByteArray` and `FloatArray` is changed from silent failure to a proper panic path in the runtime and C API. This makes scalar array indexing behave like other invalid memory accesses instead of returning a bogus default value.

### **Mutual structural recursion induction is fixed** (9eba756)
The functional induction principle no longer leaks induction hypotheses across cases of mutual structural recursion. That removes spurious hypotheses and the resulting kernel/free-variable errors in nested pattern-match situations.

### Other misc changes
- CI workflow fixes for adaptation PRs and nightly-tag handling (2 commits)
- Extra tests/benchmarks and doc/comment updates
- A few small internal/runtime cleanups and benchmark additions
