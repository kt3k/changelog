---
date: 2026-10-25
repo: leanprover/lean4
size: L
title: "Lean 4 gets faster and safer on the edges"
excerpt: "Major kernel and grind performance work lands alongside a 32-bit static-data fix and broader literal support."
commits: 8
authors: [leodemoura, basvandijk, hargoniX]
commit_authors: {"2689bbd": basvandijk, "9f0f86c": hargoniX, "a2262c4": leodemoura, "c9a3ebf": leodemoura, "470a283": leodemoura, "c51792b": leodemoura, "fe5bd83": leodemoura, "6cffe2f": leodemoura}
---

**Kernel traversals get faster with new native caches and templated replace** (470a283, c51792b, fe5bd83, c9a3ebf)
Several hot expression traversals now avoid per-node overhead: `replace` is templated on its callback, `Expr.instantiateLevelParams` is implemented natively in C++, and kernel caches switch to small open-addressing tables. The kernel also reads `has_univ_param` and `get_loose_bvar_range` straight from stored expression data, cutting more Lean-side calls out of traversal-heavy paths.

**`grind` now respects solver configuration more precisely** (6cffe2f)
`grind` and related tactics compute the active solver set up front and only invoke extensions enabled by the current config. That avoids running disabled solvers just to have them immediately bail out, which should trim overhead and make solver selection behavior clearer.

**Literal classification is expanded and optimized** (a2262c4)
Lean's literal recognition got both faster and more capable: the classifier now uses cheaper boolean checks and adds support for scientific `Rat` literals plus signed fixed-width integers (`Int8`/`Int16`/`Int32`/`Int64`). The changes also tighten handling for aliased types and match-condition literals, with new tests covering boundaries and wrapping behavior.

**Static constructor scalar fields are fixed on 32-bit targets** (2689bbd)
`LEAN_SCALAR_PTR_LITERAL` is now chosen by pointer size instead of `LEAN_EMSCRIPTEN`, fixing static-object scalar fields on 32-bit targets such as wasm32-wasip1 and i686. This corrects emitted hashes and other compile-time scalar data that previously could be laid out incorrectly.

### Other misc changes
- CXXFLAGS are now passed when building CaDiCaL's `kitten` component (9f0f86c).
