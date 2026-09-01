---
date: 2026-08-31
repo: leanprover/lean4
size: M
title: "Runtime crash fix and repr polish"
excerpt: "Fixes a closure over-application crash, speeds up transparency switching, and adds a nicer Vector repr plus a new Int division lemma."
commits: 5
authors: [Kha, bollu, Seasawher]
commit_authors: {"c8e19cc": Kha, "1e67d51": Kha, "138ca9f": bollu, "f0b9e56": Seasawher}
---

### **Fix crash in `lean_apply_m` over-application** (c8e19cc)
When more than 16 arguments were applied at once to a closure whose arity was still within the closure fast path, `lean_apply_m` used the wrong calling convention and could crash. The fix dispatches array-style calls only when the closure actually expects them, which closes a runtime bug in the applicator.

### **Add `Vector` literal-style `Repr` output** (f0b9e56)
`Vector` now prints as `#v[...]` instead of exposing its internal structure, making evaluated values much easier to read. This is a user-facing improvement to diagnostics and interactive output.

### **Avoid redundant transparency context rebuilds** (1e67d51)
`withTransparency` and `withAtLeastTransparency` now skip rebuilding meta-context state when the requested transparency is already active. That shaves allocation and elaboration overhead in hot meta-programming paths.

### **Add a simp lemma for zero T-division** (138ca9f)
A new lemma characterizes when `Int.tdiv` is zero in terms of `natAbs` and a zero denominator. This strengthens the integer division lemmas available to proofs and simplifies reasoning about `tdiv`-based arithmetic.

### Other misc changes
- Stage0 update (1 commit)
