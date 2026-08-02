---
date: 2026-08-01
repo: leanprover/lean4
size: M
title: "Lean tightens kernel and lake update checks"
excerpt: "Selective `lake update` now rejects unknown packages, while kernel invariants were hardened and projection equality made stricter."
commits: 5
authors: [leodemoura, sankalpsthakur, Rob23oba]
commit_authors: {"05a6ddf": sankalpsthakur, "5fa71c9": leodemoura, "393d38a": leodemoura, "4b7a61d": leodemoura, "ea9fad0": Rob23oba}
---

### **Reject unknown package names in `lake update`** (05a6ddf)
`lake update <pkg>...` now errors out when any requested package name isn't present in the current root dependencies or existing manifest. This closes a confusing silent-ignore behavior for typos and case mismatches, while still allowing selective updates to work for packages that were removed from `require` but remain recorded in the manifest.

### **Harden kernel checks around projections, binders, and invariants** (393d38a, 5fa71c9, 4b7a61d)
The kernel now checks more assumptions locally instead of relying on asserts: binder types/values are validated before extending the local context, projection equality includes the structure name, and several nested-inductive/quotient/mutual-definition paths now fail with explicit kernel errors instead of unsafe assumptions. That reduces the chance of hard-to-debug crashes or miscompilations when neighboring code violates an invariant.

### **Remove the deprecated `toCtorIdx` alias** (ea9fad0)
The long-deprecated `toCtorIdx` compatibility alias was deleted from `CtorIdx.lean`, and the corresponding test coverage was updated. This is a cleanup-only API removal after the replacement `ctorIdx` has been available for a long time.

### Other misc changes
- Kernel hardening and projection-equality refinements across `environment`, `inductive`, `quot`, `equiv_manager`, and `type_checker`.
- New regression tests for duplicate mutual names, projection comparisons, quotient name collisions, and `lake update` unknown-package failures.
