---
date: 2026-09-22
repo: leanprover/lean4
size: L
title: "Arithmetic normalizer lands; async bugs fixed"
excerpt: "Lean4 adds a reflected polynomial normalizer, fixes async cancellation/races, and tightens float and bitvector semantics."
commits: 17
authors: [leodemoura, hargoniX, TwoFX, algebraic-dev, Kha, Rob23oba, thorimur, gasparattila, Chessing234, kim-em]
commit_authors: {"095a077": leodemoura, "bb25f8f": leodemoura, "81da73b": algebraic-dev, "f03441b": Kha, "55c3cb0": hargoniX, "a14a87f": TwoFX, "8648bf7": algebraic-dev, "1d056ee": Rob23oba, "3def45e": thorimur, "0888335": gasparattila, "7dee48a": Chessing234, "35e1c9a": hargoniX, "fbb1eef": TwoFX, "5371d44": TwoFX, "99ef90d": leodemoura, "362101e": kim-em}
---

### **Polynomial normalization for ring and semiring terms** (bb25f8f)
Lean now has `Sym.Arith.normalize?`, a reflected normalizer that rewrites `CommRing` and `CommSemiring` terms into polynomial normal form and produces a proof by reflection. This is a major new arithmetic foundation for `Sym.simp`/grind-style automation, with new support code for denotation and safe polynomial handling.

### **Async cancellation and wakeup handling fixed** (81da73b)
`ContextAsync`, `Notify`, `Channel`, and `Broadcast` now cancel more reliably and avoid wasting wakeups on stale waiters. The race helpers were also tightened so losing computations are cancelled more aggressively, reducing hangs and leaked background work.

### **TCP/UDP socket races, leaks, and selector behavior fixed** (8648bf7)
The TCP/UDP stack got a broad correctness pass: accept/wait paths were reworked, cancellation-related leaks and races were fixed, and keep-alive delay handling now validates size limits before passing values down to C. The changes also remove some blocking assumptions and make socket operations safer under concurrent use.

### **Float `min`/`max` now use IEEE-754 minimum/maximum** (5371d44, fbb1eef)
`Min Float`/`Max Float` were replaced with explicit IEEE-754 `minimum`/`maximum` operations, and `Float.minimumNumber`/`maximumNumber` plus the `Float32` variants were added. The follow-up commit gives these operations logical models, which matters because they now reduce in the kernel and can be reasoned about in proofs.

### **Lean exposes more arithmetic and character internals** (362101e, 095a077, 0888335, 3def45e)
`Char.ordinal`/`succ?`/`succMany?` were made reducible across module boundaries, `inferInstanceAs` learned to reuse instances for non-exposed definitions, and `Lean.toolchain` now uses the release-style `v` prefix. The semiring polynomial normalizer also fixed its `x ^ 0` case to normalize to `1`, improving arithmetic simplification fidelity.

### **LCNF simplification and `bv_decide` get smarter** (55c3cb0, 35e1c9a)
LCNF simplification now uses a faster heuristic for choosing default alternatives, cutting down unnecessary alpha-equivalence checks. `bv_decide` also gained extra reduction power for matches and projections, fixing regressions around structured terms.

### **Other misc changes**
- Removed a large amount of unreachable C++ code across `src/` (f03441b)
- Added missing `BitVec` order instances and updated Grove metadata (a14a87f)
- Fixed `cbv` on trivial `ite`/`dite` conditions (1d056ee)
- Rejected invalid `←` modifiers for simprocs/simp extensions (7dee48a)
- Moved order-instance classification into `Sym.Arith` for reuse (99ef90d)
