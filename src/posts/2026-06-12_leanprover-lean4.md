---
date: 2026-06-12
repo: leanprover/lean4
size: L
title: "Lean 4 gets faster snapshots and smarter grind"
excerpt: "Parallel snapshot loading, new grind disambiguation, and a handful of performance and bug-fix upgrades landed today."
commits: 13
authors: [Kha, leodemoura, sgraf812, kim-em, wkrozowski]
commit_authors: {"8536263": Kha, "548f78b": sgraf812, "6271d8f": leodemoura, "b118504": wkrozowski, "75ece25": Kha, "36dc822": leodemoura, "60967a7": Kha, "75745ff": sgraf812, "f9f071a": Kha, "693e86e": Kha, "c2b551f": kim-em, "a450d91": kim-em, "64438dd": leodemoura}
---

### **Parallel incremental snapshot loading speeds up imports** (693e86e, 60967a7)
Lean now loads `--incr-load` snapshot dependencies in parallel, grouped by module, instead of serially walking every `.olean*` region. This cuts cold and warm load times dramatically for large snapshots like `import Mathlib`, and the loader now writes/reads a JSON `.deps` manifest that encodes module artifacts rather than plain file paths.

### **`grind?`/`cases` can now disambiguate duplicate anchors** (64438dd)
`grind?` now generates ordinal-qualified `cases` references like `#a56e/2` when multiple split candidates share the same anchor, avoiding replay failures caused by inaccessible-variable collisions. The tactic implementation also learned to select the Nth matching candidate directly, which should make suggestions reliable again in ambiguous goals.

### **`SymM` gains ground simprocs for bit-vector conversions** (6271d8f)
The symbolic simplifier can now reduce several bit-vector ground forms, including `Int{8,16,32,64}.toBitVec`, `UInt{8,16,32,64}.toBitVec`, `BitVec.ofNat`, `BitVec.toNat`, and `BitVec.setWidth`. That gives `SymM` a much better chance of normalizing concrete bit-vector expressions without falling back to general rewriting.

### **Task pool worker threads now expire after 5 seconds** (75ece25)
The runtime task manager no longer keeps idle standard workers alive forever: they detach on creation, time out after 5 seconds of inactivity, and exit to reclaim their stack memory. This is especially important now that worker stacks default to 1 GB, and the shutdown path was reworked to track worker counts and wake the right condition variables instead of joining stored thread objects.

### **`Sym.dsimp` fixes ill-typed binder telescope expansion** (36dc822)
`Sym.dsimp` now instantiates binder types and values before creating local declarations for `∀`, `λ`, and `let` telescopes. This fixes a kernel-rejection bug where loose bound variables could survive in the elaborated term and later get misinterpreted during zeta expansion.

### **`cbv`/`sym =>` no longer rewrites hypotheses, and projection transparency is fixed** (b118504)
The `cbv at`-style hypothesis rewriting path was removed from `sym =>` mode, simplifying its behavior and avoiding the old rewriting semantics there. The commit also adjusts the transparency level used when `cbv` encounters projections, which should make projection reduction behave correctly again.

### **Other misc changes**
- Do elaborator docs and parser comments cleaned up (548f78b)
- `DoElem`/`DoSeq` syntax abbreviations added and threaded through `do` elaboration (75745ff)
- Fix snapshot cleanup / `.deps` handling internals (f9f071a)
- Fix module loading to ignore stray file existence when choosing olean parts (8536263)
- Add `Nat.or_two_pow_eq_add_of_lt` lemma (c2b551f)
- Add `Array`/`Vector` `set!` convenience lemmas (a450d91)
