---
date: 2026-06-10
repo: leanprover/lean4
size: L
title: "Lean4 adds mvcgen until patterns"
excerpt: "New `mvcgen'` syntax and VC flow control, plus a compacted-region refactor and a Bool constant-folding fix."
commits: 8
authors: [hargoniX, sgraf812, Kha, Garmelon, algebraic-dev]
commit_authors: {"f0ef737": algebraic-dev, "5f9b669": sgraf812, "d757be5": sgraf812, "118ed15": Kha, "ccfc89f": hargoniX}
---

### **`mvcgen'` gains an `until` clause** (5f9b669)
`mvcgen'` can now stop VC generation when the current program matches a conv-style pattern, leaving the goal as a VC instead of applying a spec. The pattern is elaborated lazily against the first program monad it sees, which helps overloaded heads resolve correctly and keeps editor hovers working.

### **`mvcgen'` syntax is consolidated across tactic and grind modes** (d757be5)
The tactic and `sym =>` forms now share a more consistent syntax model, and the old grind-mode `with` clause is removed in favor of `<;>`. The tactic entry point was also reshaped so leftover `Grind.Goal`s flow back out as tactic goals, changing how unsolved VCs are surfaced.

### **`CompactedRegion` is now serializable** (118ed15)
`CompactedRegion` was converted from a bare pointer into a Lean structure carrying ordinary metadata plus private pointer fields, making it embeddable in compacted data. The runtime and module-loading code were updated to reconstruct region views from that structured representation, which is a substantial change to Lean's compacted-object machinery.

### **Bool constant folding now handles `false` correctly** (ccfc89f)
The compiler's LCNF constant folder no longer treats every foldable 0-ary Bool value as `true`; it now distinguishes `Bool.true` and `Bool.false` explicitly. This fixes a real miscompile and adds a regression test.

### **OpenSSL initialization is made lazier** (f0ef737)
`OPENSSL_init_ssl` was removed from Lean's OpenSSL initialization path. That reduces eager side effects and should make lazy loading of OpenSSL work more reliably.

### Other misc changes
- CI workflow action updates and sha pinning (1 commit)
- Dev-release preset no longer enables `WFAIL` (1 commit)
- Claude workflow docs/skills cleanup (1 commit)
