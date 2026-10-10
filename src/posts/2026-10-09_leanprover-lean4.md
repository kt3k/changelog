---
date: 2026-10-09
repo: leanprover/lean4
size: L
title: "Lean fixes grind, vcgen, and export bugs"
excerpt: "A mix of important soundness, robustness, and performance fixes landed across grind, vcgen, async exports, and JSON handling."
commits: 15
authors: [Kha, sgraf812, leodemoura, nomeata, TwoFX, Vtec234]
commit_authors: {"7cd1032": leodemoura, "c1f2fc6": leodemoura, "b70afe0": sgraf812, "d10dc23": sgraf812, "7dcbd9f": Kha, "8fc4172": nomeata, "ea247fe": Vtec234, "00f086c": Kha, "27121e7": Kha}
---

### **Grind ring no longer invents equalities from nonzero differences** (7cd1032)
`grind ring` now checks that the difference `a - b` really reduces to `0` before propagating an implied equality. This fixes a panic and bogus proof-term path in rings like `BitVec n` where equal simplified multiples did not actually imply `a = b`.

### **`vcgen` frames are now guarded by the ambient precondition** (d10dc23)
`WP.Frames` now carries a guard, letting `vcgen` frame resources only in states where the precondition permits it. This removes a real limitation for state-dependent footprints and makes framed verification conditions precise enough for more programs.

### **Exported module data stops depending on proof-only realizations** (00f086c)
Constants realized only inside proofs are no longer exported into the module data, so they won’t spur unnecessary downstream rebuilds. Importers can still realize them on demand, but the exported `.olean` no longer bakes in proof-branch artifacts.

### **Async theorem exports become available before proof completion** (27121e7)
When an asynchronously elaborated theorem is exported as an axiom, Lean now records its exported info from the signature immediately instead of waiting for the proof task. That avoids export-time stalls on long-running proofs while keeping the exported view determined by the theorem’s type.

### **`grind` canonicalizer learns all builtin component instances** (c1f2fc6)
The builtin-instance bypass table now includes the component classes for arithmetic and order instances such as `Pow`, `NatPow`, `Add`, `Mul`, and `Neg` on `Int`/`Nat`. This prevents canonicalization mismatches that could surface as internal errors when a builtin instance was re-synthesized as a plain term.

### **`cbv` evaluates `cond` lazily** (b70afe0)
`cbv` now treats `cond` like `ite`/`dite` and reduces only the selected branch. That avoids wasted work and step-limit blowups when the untaken branch is expensive or non-terminating.

### **The Lean export parser rejects malformed JSON more strictly** (8fc4172)
The NDJSON reader used by `leanchecker --from-export` and `lake check` now rejects duplicate object keys, trailing junk after JSON objects, and repeated bindings for names/levels/expressions. This closes a class of silent parse acceptance bugs that could hide malformed export data.

### **`JsonNumber` comparison now handles zero correctly** (ea247fe)
The `LT JsonNumber` instance was fixed so comparisons involving `0` behave properly, including decimals in scientific notation. This corrects a real ordering bug in JSON number handling.

### **`LEAN_MAX_CTOR_FIELDS` naming and meaning clarified** (7dcbd9f)
This is a documentation-and-name cleanup for the large-constructor limit constant across compiler/runtime headers and checks. It helps align the public-facing wording with what the limit actually controls.

### **Other misc changes**
- Windows `libleanshared` DLL split rebalanced to avoid the export-symbol limit.
- Deprecation warning/code action now suggests adding a `since` date.
- Removed leftovers of the old code generator from `Environment`.
- Minor Lean doc/comment, attribute-export, and test updates.
