---
date: 2026-08-30
repo: leanprover/lean4
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "Lean sharpens automation, SAT tooling, and runtime performance"
excerpt: "This week adds new proof commands, expands bv_decide and SAT APIs, hardens challenge/checker flows, and trims runtime overhead."
commits: 55
---

### **Automation and proof ergonomics got a broad upgrade**
Lean added checked restatement commands `recall`/`recall?`, a more predictable `rwa`, richer recursor printing, and better ambiguous-elaboration context in the infoview. The simplifier also became more robust, avoiding stale simproc matches and adding ground reduction for `Nat.log2`.

### **Fixpoint and inductive tooling became more expressive**
Coinductive and lattice-fixpoint machinery now accepts explicit `monotonicity_by` proofs and generates stronger induction principles, improving escape hatches when automatic monotonicity search fails. Projections for proposition-like inductives also now build `casesOn`/`recOn` in a way that avoids opacity-related elaboration regressions.

### **Bitvector and arithmetic automation expanded**
`BitVec.ofNatClamp` introduced a saturating conversion API, and `bv_decide` gained support for symbolic shifts, `min`/`max` across `BitVec`/`UIntX`/`IntX`, and related normalization improvements. These changes broaden the range of arithmetic goals that can be discharged automatically, while some BitVec matching paths were also tuned for performance.

### **SAT/CNF infrastructure and checker tooling were overhauled**
Lean’s SAT APIs gained a more capable public CNF interface plus a rewritten, faster LRAT checker that supports bounded variable addition. In parallel, the new `leanchecker-paranoid` target was introduced and then slimmed down to initialize only the modules it needs, with release CI and allocator-hardening support wired in.

### **Lake and challenge workflows got safer and more reliable**
`lake challenge` now resolves dependencies inside the sandbox, closing an unsandboxed config-evaluation gap and making git-based challenge projects work better. Lake also fixed `meta import`/`import all` reachability, improved code-quality log persistence and reporting, and tightened primitive coverage for `lake check`.

### **Performance and runtime footprint improved**
Lean reduced reference-count churn by splitting `Core.Context`, switched mimalloc to a smaller max alignment, made `Fin.foldl` keep kernel-friendly reduction while compiling efficiently, and adjusted `cbv` so it no longer eagerly unfolds partially applied constants. Static linking for executables depending on Lake was fixed as well.

### **Other misc changes**
- `Sum` now has lawful derived `BEq`/`ReflBEq`/`LawfulBEq` instances.
- `DiscrTree.Trie` gained stable node accessors for downstream code.
- Deprecated-target warnings and `deprecated_syntax` diagnostics now surface better replacement/context hints.
- `leanchecker`/CI/build plumbing saw multiple cleanup and regression-test updates, plus a stage0 refresh.
