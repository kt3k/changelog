---
date: 2026-06-06
repo: leanprover/lean4
size: M
title: "Lean switches to faster refcount cleanup"
excerpt: "A small performance tweak replaces a heavier object destructor with a more precise free path in refcount teardown."
commits: 1
authors: [hargoniX]
commit_authors: {"8391b96": hargoniX}
---

### **Faster refcount cleanup in `dec_ref_known`** (8391b96)
`lean_dec_ref_known` now calls `lean_free_object` instead of `lean_del_object` when dropping a constructor with known children. This is a targeted performance improvement in the runtime’s reference-counting path, shaving overhead from object teardown.

### Other misc changes
- None
