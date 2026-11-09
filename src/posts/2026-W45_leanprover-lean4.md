---
date: 2026-11-08
repo: leanprover/lean4
period: weekly
slug: 2026-W45
period_label: "Nov 2–8, 2026"
size: L
title: "Lean4 tightens automation, VCGen, and runtime correctness"
excerpt: "This week brought faster and safer theorem automation, deeper VCGen support, and significant kernel/runtime fixes plus HTTP and tooling improvements."
commits: 88
---

### Automation gets broader and safer
**`grind`/`Sym` now handle more casts, literals, and match structure** — Arithmetic normalization was extended to push `Nat`/`Int` casts through more operations, relate mixed `NatCast`/`IntCast` terms, and avoid bad behavior on degenerate rings. `Sym.simp`, `grind`, and related tactics also learned to reduce literal `match`es, see through assigned metavariables, and handle negative/float literals more reliably.

**`lia`/`grind` proof terms are faster and more robust** — Kernel checking for linear arithmetic certificates was made much cheaper, while several soundness and stability bugs were fixed around backtracking variables, congruence-table checks, and match-condition proof generation.

### VCGen becomes a much stronger pipeline
**`vcgen` gained new simplification and introduction power** — The tactic now has a dedicated `@[vcgen_simp]` set, can step through `have`/`let` bindings more effectively, reduces assigned metavariables in goal heads, and supports `@[vcgen_rintro]` for binder destructuring. Related work also preserved sharing and kept generated terms smaller to avoid blowups.

**Equation-lemma generation was tightened** — Root `have`/`let` bindings are preserved when possible, and constants created during equation-type computation are now retained, fixing kernel issues and reducing duplicated intermediate expressions.

### Core runtime, kernel, and compiler correctness improved
**Kernel/runtime sizes are now full-width** — Counts, indices, task priorities, and inductive parameter counts no longer truncate to 32 bits, closing a correctness gap for very large values.

**Safer sharing and copying primitives landed** — New safe wrappers for `withPtrEq` and `withIsExclusive` enable optimized pointer/sharing checks without breaking soundness, and `Runtime.deepCopy` copies object graphs while preserving sharing.

**FFI and 32-bit target behavior were fixed** — CLI exit codes now behave properly on 32-bit targets, and several runtime FFI signatures were aligned with generated C to avoid traps and mismatches.

### HTTP, Lake, and IDE tooling saw major updates
**`Std.Http` got a broad correctness and performance pass** — HTTP/1.1 parsing, framing, incremental chunk handling, request-target length handling, and header storage/encoding were all improved, with a new faster path for encoding request/response bodies.

**Lake cache services are now configurable from packages** — Cache services can be declared in package config and resolved with dependency-aware precedence, making cache setup more flexible.

**Lean added a `#html` display command** — HTML values can now render in the infoview via widget messages.

### Other misc changes
- `bv_decide` added incremental CEGAR solving, boolean-layer caching, and related performance work.
- `Std.Time` formatting/parsing became much more round-trippable.
- Typeclass resolution caching was improved for larger builds.
- Deriving `Repr`/`BEq`/`Hashable` now scales better on mutual blocks.
- Various CI, staging, documentation, and regression-test updates.
