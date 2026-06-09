---
date: 2026-05-03
repo: leanprover/lean4
size: L
title: "Lean4 tightens `grind` and Lake artifact handling"
excerpt: "Lake now awaits extra deps before module headers and meta-import artifacts are fixed; `grind` gets several invariant and proof-hint fixes."
commits: 7
authors: [leodemoura, tydeu]
commit_authors: {"dae3257": tydeu, "326f43a": tydeu, "316c39f": leodemoura, "ee8acc1": leodemoura, "1b23b05": leodemoura, "2d79ec2": leodemoura, "fe3c739": leodemoura}
---

### **Lake now waits for extra deps before header processing** (dae3257)
Lake’s module setup build now awaits `extraDep` targets before fetching and processing module headers, so `needs`-style dependencies and cloud releases can actually influence header generation instead of racing it. This changes build ordering in a subtle but important way and closes a correctness gap in module setup construction.

### **Lake includes transitive `meta import` artifacts** (326f43a)
Lake now tracks when imports are reached through `meta import` and ensures their transitive IR artifacts are included in the setup passed to Lean. This fixes missing `.ir` data in artifact-cache setups, which could otherwise surface as “missing data file” errors.

### **`grind` fixes a congruence-table invariant around lazy `ite` branches** (316c39f)
When an `ite` branch is internalized lazily, `grind` now explicitly records the parent relation at the right moment so later equivalence-class merges don’t leave stale congruence-table entries behind. This prevents a panic-level invariant violation in a common propagation path.

### **`grind` now internalizes casts before emitting heq propagation** (ee8acc1)
A cast-related internal error was caused by `pushCastHEqs` running before the arguments it referenced had been internalized. The call moved later in `internalize`, avoiding heqs that point at unenoded terms.

### **`grind` adds missing proof hints for injectivity and projections** (1b23b05)
Projection and constructor injectivity propagators now wrap generated proofs with the expected proposition shape before pushing equalities. That makes the produced proofs robust enough for downstream checking and fixes proof-construction failures in these propagators.

### **`grind` tightens AC invariant checks for basis vs queue state** (fe3c739)
The AC invariant checker now distinguishes fully simplified basis entries from partially simplified queue entries, only enforcing the stricter neutral/idempotent checks where they actually apply. This aligns the invariant checker with how AC equations are staged internally and avoids false failures.

### **`grind` fixes another AC invariant edge case** (2d79ec2)
A follow-up AC invariant fix further narrows when neutral-element checks are enforced during invariant validation. It addresses another checker failure in the AC machinery, reinforcing the same queue-vs-basis distinction.

### Other misc changes
- New regression tests for the Lake module-setup cases and several `grind` fixes
- Small internal refactors in `grind` AC/congruence code
- Test updates for proof term shapes and module import behavior
