---
date: 2026-09-13
repo: leanprover/lean4
size: M
title: "Lake adds package-scoped output tracking"
excerpt: "Lake can now track and upload outputs for specific packages, comparator gets a default config path, and LRAT RUP accepts redundant hints."
commits: 5
authors: [hargoniX, Vtec234, tydeu]
commit_authors: {"d48866d": Vtec234, "d01ad55": tydeu, "a774e40": hargoniX, "3824dbf": hargoniX, "68867f3": hargoniX}
---

### **Lake build/cache now track package-specific outputs** (d01ad55)
`lake build` and `lake cache put` now support a `--package` option so output tracking can target a specific package instead of always the workspace root. `lake cache put-staged` also now requires `--rev` to be set explicitly, reducing the risk of uploading the wrong artifacts.

### **Lake comparator gets a default config file** (a774e40)
`lake comparator` now looks for `comparator.json` by default, and the help text reflects the new optional `--config` flag. That makes the comparator workflow less verbose for the common case while keeping explicit overrides available.

### **LRAT checker accepts redundant RUP hint clauses** (3824dbf)
The BVDecide LRAT checker’s RUP propagation logic was relaxed so hint clauses may themselves be redundant. This broadens what proofs the checker accepts without introducing the performance regression noted in the PR.

### Other misc changes
- Renamed the `lake challenge` command to `lake comparator` across CLI/help/tests (68867f3)
- PR body workflow now also triggers when the `labeled` label is removed (d48866d)
