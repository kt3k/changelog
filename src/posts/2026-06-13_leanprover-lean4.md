---
date: 2026-06-13
repo: leanprover/lean4
size: M
title: "BitVec flattening lands, docstring roles fixed"
excerpt: "Lean4 adds BitVec.flattenList with lemmas and improves builtin assert docstring highlighting and parsing."
commits: 2
authors: [david-christiansen, kim-em]
commit_authors: {"4e28544": david-christiansen, "67dffca": kim-em}
---

### **Add BitVec.flattenList with fast runtime implementation** (67dffca)
Lean4 now has `BitVec.flattenList`, which concatenates a list of fixed-width bitvectors into a single wider bitvector. The new lemmas pin down how individual bits and extracted ranges map back to list elements, and the implementation is swapped to a divide-and-conquer fast path at runtime for much better scaling on long lists.

### **Fix builtin assert docstring highlighting and roles** (4e28544)
The builtin `assert'` docstring role now accepts two or three code fragments instead of a single combined snippet, matching the intended “lhs = rhs [: type]” shape more robustly. It also fixes hover/highlight metadata for downstream rich-doc consumers, including proper styling for option values and previously private structure exposure.

### Other misc changes
- None.
