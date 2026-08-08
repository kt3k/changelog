---
date: 2026-08-07
repo: leanprover/lean4
size: L
title: "bv_decide learns grind context; cache tests get CI-safe"
excerpt: "Big Lean4 tooling update: bv_decide now integrates with grind, grind canonicalizes beta in types, and Lake cache tests were hardened for CI."
commits: 4
authors: [hargoniX, leodemoura, wkrozowski, tydeu]
commit_authors: {"87e7204": hargoniX, "10d40ba": leodemoura, "0dfa5c0": wkrozowski, "bd97ed8": tydeu}
---

### **bv_decide now reuses `grind` state in sym mode** (87e7204)
`bv_decide` can now consume relevant equivalence classes from `grind`/`sym`, encode them into the SAT problem, and solve goals that depended on congruence information discovered upstream. This broadens what the tactic can close in interactive workflows, and the refactor also introduces `bv_normalize` as a preprocessing-only entry point.

### **`grind` now beta-reduces canonicalized types** (10d40ba)
Type canonicalization now applies beta reduction inside types, not just eta reduction, so definitional equalities like applied type-level lambdas collapse to the same structural form. That fixes cases where `grind` previously missed matches because equivalent types were left syntactically different.

### **Lake cache tests and curl handling were hardened for CI** (bd97ed8)
Lake now resolves `curl` via a configurable environment lookup, which helps on Windows and in test environments where the system `curl` would otherwise win. The cache test suite also gains a mock remote cache transfer server, reducing reliance on secrets and external network access.

### Other misc changes
- Added `cbv_eval` annotations to several `HashMap`/`HashSet` lemmas to improve reduction support for `cbv`-style reasoning (0dfa5c0).
