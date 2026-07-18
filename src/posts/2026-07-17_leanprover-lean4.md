---
date: 2026-07-17
repo: leanprover/lean4
size: L
title: "Lean4 tightens vcgen, grind, and instance export"
excerpt: "Major vcgen and grind fixes land alongside a security-ish olean flush fix and a public exposure bug fix for inferInstanceAs."
commits: 13
authors: [sgraf812, leodemoura, Kha, eric-wieser]
commit_authors: {"b9c9129": Kha, "42de364": sgraf812, "51b8e4a": sgraf812, "7d38b3b": eric-wieser, "4f53dd7": leodemoura, "0313a67": leodemoura, "1b89aaf": leodemoura}
---

### **vcgen now handles conjunctive specs directly** (51b8e4a)
`vcgen` can now apply specs with conjunctive preconditions without frame inference, keeping the full precondition available to the postcondition. The new `conjunctivePre` flag is detected syntactically at `@[spec]` registration, which removes a whole class of unnecessary framing obligations.

### **grind can discharge `Sym.simp` side conditions** (1b89aaf)
`Sym.simp` now accepts a `grind` discharger, letting conditional rewrite rules prove their own side conditions via `grind`. This makes `Sym.simp` more powerful in interactive and tactic-generated proof workflows, especially for hypotheses introduced under binders.

### **vcgen equality specs stay generic across cache hits** (42de364)
The backward-rule cache no longer over-specializes equality specs to the first program they match. This fixes failures where the same cached rule had to apply to multiple concrete programs in one run, such as recursive equations reused at different call sites.

### **inferInstanceAs no longer exposes ill-typed wrapper aux defs** (b9c9129)
Auxiliary wrapper definitions created during `inferInstanceAs` are now exposed only when their bodies remain well-typed in the exported environment. This fixes public instances for types whose bodies are private/non-exposed, preventing import-time ill-typed declarations.

### **module save now notices flush failures** (7d38b3b)
Saving compacted `.olean` files now checks for failures after closing the output stream, catching cases where disk-space or flush errors previously caused silent truncation. That’s a real correctness fix for module writes.

### **`grind` filter syntax no longer swallows `match` bars** (4f53dd7)
The parser now keeps the `|` in `grind => ... | ...` from being eaten by surrounding `match` or `first` syntax. This restores nested tactic parsing in common control-flow patterns.

### **grind preserves theorems with multiple attributes correctly** (0313a67)
`grind` theorem lookup now scans all theorem buckets so partially activated theorems can’t shadow others with the same symbol. This fixes custom attribute setups where a later theorem could accidentally hide an earlier usable one.

### Other misc changes
- Refactored lattice-op saturation in vcgen to use `Sym.simp` rewriting instead of a manual rewrite loop.
- Dropped the structural-combinator fast path in vcgen spec application.
- Generalized parser forbidden-token tracking to support multiple nested tokens.
- Moved a CI job from RelWithAssert to Namespace runners.
- Updated stage0 snapshots and generated artifacts (3 commits).
