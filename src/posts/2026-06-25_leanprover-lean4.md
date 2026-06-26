---
date: 2026-06-25
repo: leanprover/lean4
size: L
title: "Lean4 adds parser option propagation, float patterns"
excerpt: "Major day for Lean4: doc rendering extensibility, `set_option in` parsing, float matching/equality, VCGen frames, and grind/perf fixes."
commits: 17
authors: [nomeata, david-christiansen, hargoniX, algebraic-dev, ia0, Kha, TwoFX, sgraf812, brettkoonce, pevogam, Seasawher]
commit_authors: {"3061104": david-christiansen, "28c2e86": david-christiansen, "9d0f28f": hargoniX, "c60dff6": Kha, "29db757": nomeata, "4c59d1c": algebraic-dev, "dde9f3e": nomeata, "943e02c": TwoFX, "95176b3": hargoniX, "afe0cec": nomeata, "d96beb4": algebraic-dev, "08c8b6a": sgraf812, "72b149d": brettkoonce, "5a9514e": ia0, "8d50f53": ia0, "e6bfa44": pevogam, "0758b1d": Seasawher}
---

### **Propagate `set_option ... in ...` into parsing** (28c2e86)
`set_option` now affects the parser for the scoped body in commands, terms, and tactics, bringing it in line with `open ... in`. This is important for things like enabling/disabling syntax extensions such as Verso exactly where they’re needed.

### **Extend Verso docstrings with custom Markdown rendering** (3061104)
Docstring lookup now has a Markdown-aware path and supports extensible Markdown rendering for custom inline/block elements instead of falling back to alternate text. This is a sizable LSP/docs upgrade: custom Verso elements can now render cleanly in hover and legacy Markdown clients, with a corresponding simplification of the saved element representation.

### **Add `Float`/`Float32` literals to `match` patterns** (dde9f3e)
`match` can now use floating-point literals directly as patterns, including negative literals, and it recognizes both `Float` and `Float32` forms. The compiler uses the types’ `DecidableEq` instances, so bit-pattern distinctions like `0.0` vs `-0.0` matter.

### **Introduce `DecidableEq` for `Float` and `Float32`** (943e02c)
Lean now has propositional equality for floats based on underlying bit patterns, distinct from `BEq`. That unlocks pattern matching on floats and gives users a precise equality notion for `Float`/`Float32`.

### **Add `frames` support to `vcgen`** (08c8b6a)
`vcgen` gains a new `frames` clause for preserving state assertions across matched programs, along with a frame database and lazy elaboration machinery. This expands the tactic’s expressive power for verified do-notation and introduces a new framing side-goal (`WP.Frames`) when a frame is attached.

### **Teach `grind` about more locals without blocking** (afe0cec)
`grind`, `exact?`, `apply?`, and `rw?` now iterate local constants via a non-blocking environment API instead of waiting on unrelated async theorem bodies. That should remove editor latency/hangs in long files, while also making local theorem collection more selective and robust.

### **Refine `Std.Time` week types and APIs** (4c59d1c)
The `Std.Time` week naming/types were reshuffled so month/year ordinals line up more consistently, and the API now distinguishes aligned month weeks from year weeks more clearly. This is a source-level cleanup with some real type-signature impact for downstream time code.

### **Make `Selectable.combine` avoid deadlocks** (d96beb4)
Async selection was reworked to remove the deadlock around `Selectable.combine` and fix a recursive-mutex issue in `Selectable.one`. This is a meaningful runtime fix for anyone composing async selectors.

### Other misc changes
- Performance tweak for `Array`/`List.findIdx` e-matching (9d0f28f)
- Make test snapshots opt-in (c60dff6)
- Fix tests for #13705 (29db757)
- Teach `grind` more about `{Array,Vector,List}.count` and membership (95176b3)
- Docstring typo/wording fixes in `decide`, `Format.nest`, `Format.bracketFill`, `List.foldr`, and time parsing docs (72b149d, 5a9514e, 8d50f53, e6bfa44, 0758b1d)
