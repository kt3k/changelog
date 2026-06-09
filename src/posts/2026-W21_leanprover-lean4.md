---
date: 2026-05-24
repo: leanprover/lean4
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: L
title: "Lean4 improves simplification, elaboration, and cache correctness"
excerpt: "This week brought indexed-monad do notation, a new Sym.dsimp pipeline, faster string/dec paths, and several important elaboration and cache fixes."
commits: 37
---

### Major simplification and symbolic API expansion
**Sym.dsimp grows into a full pipeline** — Lean now exposes a public `Lean.Meta.Sym.DSimp` API, can simplify under `lambda`/`forall`/`let` binders, and ships reusable reduction simprocs for beta, zeta, projections, and matches. This makes symbolic meta-programming more composable and much more useful on dependent terms.

### Elaboration gets broader and more correct
**Do notation now supports indexed monads** — `elabDoWith` no longer assumes plain `m α` monads; it can split and rebuild applications with instance arguments, enabling custom `do` elaboration for indexed monads.

**Application elaboration was refactored and fixed** — the app elaborator got a significant state/cache rewrite plus better handling of implicit and named arguments, improved tracing and dot-notation elaboration, and a fix for an eta-args bug that could misclassify explicit arguments.

**Several elaboration regressions were corrected** — `beforeElaboration` now runs for inductive/structure/coinductive commands, proof-mode tactics like `mconstructor`/`mleft`/`mright`/`mspecialize` no longer leak hypothesis metadata, and `#where` now reports module-scope state more faithfully.

### Performance and cache reliability
**Cache key collisions were fixed** — meta cache keys now account for `TransparencyMode` bits correctly and include `zetaUnused`, closing two subtle collision paths in `WHNF`/`isDefEq` results.

**Hot paths got faster** — Lean now specializes `dec` lowering for known constructor shapes, `String.compare` uses a dedicated runtime primitive, and structure instance elaboration avoids a quadratic-time pattern on large instances.

### Infrastructure and compatibility cleanup
**Builtin elaborators and deprecation cleanup continued** — config-eval command elaborators are now fully builtin, `@[ext]` no longer needs `liftCommandElabM`, and coinductive attribute attachment shed another `liftCommandElabM` use.

**Premise selection became more accurate** — MePo now prefers theorem candidates and preserves round ordering, while library suggestion collection instantiates metavariables before scanning goal types.

### Other misc changes
- `try?` was made extensible and info-tree based for suggestions, with related tracing tweaks
- `Unit` gained JSON codecs (`{}`)
- Lake CI/test stability fixes, including less flaky `noRelease` diffs and workflow/build template cleanup
- Various string/path/internal refactors and documentation updates
