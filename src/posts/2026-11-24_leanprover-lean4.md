---
date: 2026-11-24
repo: leanprover/lean4
size: L
title: "Kernel safety, formatter fixes, and perf win"
excerpt: "Lean4 tightens replay validation, fixes doc/module comment formatting, improves smart unfolding, and ships a performance-oriented eta-expansion update."
commits: 13
authors: [TwoFX, mhuisi, nomeata, arthur-adjedj, Kha, leodemoura]
commit_authors: {"b8d1987": mhuisi, "e6e2521": nomeata, "01c5259": TwoFX, "206dc7a": TwoFX, "5e85b47": TwoFX, "ca9edcd": mhuisi, "4949ea9": TwoFX, "be78f9e": arthur-adjedj, "fd51f59": TwoFX, "59cbe22": TwoFX, "7f06bb6": leodemoura}
---

### **Replay now rejects malformed inductive metadata** (e6e2521)
`Kernel.Environment.replay` no longer panics or silently accepts bad inductive entries: it validates that the inductive appears in its own `all` field, that `all`/`ctors` only name stored inductives and constructors, and that stored inductive metadata matches what the kernel derives. This makes `leanchecker` fail safely on malformed inputs instead of crashing or replaying inconsistent declarations.

### **Smart unfolding avoids exponential traversal** (7f06bb6)
Smart unfolding now caches intermediate expressions and reuses caller arguments, which fixes an exponential-time blowup on shared subterms. The added regression tests show the slowdown is gone, and the change should make tricky elaboration cases much more predictable.

### **Eta-expand partial recursor apps for structures and K-like types** (be78f9e)
The definitional equality checker now eta-expands certain partial recursor applications when the major premise is missing, but only for eta-expandable structures and K-like types. This widens the set of terms that can be proven definitionally equal without user intervention, which should unblock some proofs and reduce brittle elaboration behavior.

### **Doc comments and module docs now format like real comments** (b8d1987)
Doc comments are now formatted through `free` layout handling so their width and height no longer perturb surrounding code, and module docs are formatted with the same machinery instead of being treated as raw source. The formatter also now recognizes module-doc openers explicitly, which fixes several comment-ordering and long-doc-comment cases.

### **`Nat.iterate` switches to the mathlib-friendly direction** (206dc7a)
`Nat.iterate` has been redefined so its definitional equality matches what mathlib expects, and the old tail-recursive variant is now the deprecated compatibility wrapper. The supporting lemmas and `csimp` bridge were adjusted accordingly, so this is a semantics-level change for core recursion behavior rather than just a refactor.

### Other misc changes
- Refactor: move `ShareCommon` internals under `Legacy`/`Internal` and clean up its public API (4949ea9, 01c5259, 5e85b47)
- Refactor: move formatter utilities into core and drop `Lean.Fmt.Util.Basic` (ca9edcd)
- CI/workflow tweak: fix PR toolchain re-releases (c784f9e)
- Test suite updates: enable deprecation linter and move deprecated tests aside (fd51f59, 59cbe22)
