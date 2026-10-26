---
date: 2026-10-25
repo: leanprover/lean4
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: L
title: "Lean 4 sharpens arithmetic tactics and speeds up the kernel"
excerpt: "This week brings major `grind`/`lia` correctness and performance work, faster VC generation, cheaper imports, and kernel traversal optimizations."
commits: 104
---

### Arithmetic tactics got a major correctness and performance pass
**`grind` hardened across subtypes, binders, literals, and match conditions** — The prover learned to extract subtype predicates from `Subtype.mk`, keep hidden variables distinct in generated scripts, handle heterogeneous arithmetic more safely, avoid cyclic `match` overflows, and propagate equalities more reliably across `HEq` classes. It also picked up Nat subtraction cancellation, better anchor stability, refined solver configuration handling, and quieter default diagnostics.

**`lia` became much more robust on dependent and division-heavy goals** — Linear arithmetic now normalizes dependent integer constraints correctly, handles divisibility and non-unit equations better, reorders variables before huge Cooper splits, prefers decision-free conflicts, counts more search work against step limits, and avoids several panic/loop cases. It also gained a faster direct path for div/mod facts and a new kernel-evaluation path for certificates.

**Proof search and solver plumbing were sped up** — Cutsat proof sharing across `grind` case splits, reduced typeclass-resolution overhead for common arithmetic instances, cheaper preprocessing, and tighter instance checks all trim hot-path cost. Several fixes also removed stale or invalid homomorphism rewrites and improved literal classification.

### VC generation and elaboration got leaner
**`vcgen` now produces smaller, more canonical obligations** — Pure equality preconditions are substituted through later goals, and join points can be factored out so shared post-branch code is proved once instead of duplicated. A debug-trace panic in the substitution path was also fixed.

**Elaboration avoids repeated work** — Typeclass retries no longer spin on unchanged stuck goals, `collectFVars`/`collectMVars` now use pointer-based visitation, and annotation cleanup paths were streamlined. Deprecation reporting also reached more macro/quotation cases, with replacement code actions added for deprecated syntax.

### Kernel, imports, and runtime paths were optimized
**Kernel traversals and certificate checking are faster** — Native caches, templated `replace`, and a C++ implementation of `Expr.instantiateLevelParams` reduce traversal overhead, while `lia` certificate checking got a faster `Int` kernel evaluation path.

**Imports and heartbeat accounting improved** — Imported constants are now stored in per-module tries and merged lazily, cutting import-time work and memory use. Heartbeats for shared thunk evaluation are now deterministic across threads.

**System/runtime APIs tightened edge cases** — Out-of-range process/group ids are now rejected instead of truncated, and scalar field handling was fixed for 32-bit targets.

### Other misc changes
- Cadical was updated to 3.0.1.
- `MonadMacroAdapter CoreM` is now available.
- Several refactors landed in macro/elab plumbing, syntax handling, and docstring elaboration.
- Extra tests, benchmarks, and stage0 updates were added throughout the week.
