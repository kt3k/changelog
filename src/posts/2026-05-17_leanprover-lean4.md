---
date: 2026-05-17
repo: leanprover/lean4
size: M
title: "MePo fix, hover API, and pp.universes cleanup"
excerpt: "Fixes a MePo ranking bug, adds expression hover message helpers, and restores correct pretty-printing under `pp.universes`."
commits: 4
authors: [kmill, kim-em, thorimur]
commit_authors: {"385efbb": kim-em, "ce58140": kmill, "43ef70d": kmill}
---

### **MePo was returning the worst premises** (385efbb)
`mepoSelector` had a stale `.reverse`, so after MePo started returning suggestions in score-descending order it was accidentally taking the lowest-scoring premises instead of the best ones. This fixes the selector and adds a regression test to lock in the intended ordering.

### **New `MessageData.withExprHover` helpers** (ce58140)
Lean now has a dedicated API for building message data that shows expression info on hover, plus a monadic variant that fills in the current local context automatically. This is a useful primitive for richer editor/documentation tooling and replaces ad hoc hover construction in tactic docs.

### **`pp.universes` no longer blocks non-universe constants** (43ef70d)
Pretty-printing now only disables unexpansion/dot-notation for constants when universe parameters are actually present, instead of treating all constants as affected by `pp.universes`. That restores expected output for things like `↔` and `Nat.succ`, and the added tests capture the regression.

### Other misc changes
- Removed the `addInfo` flag from `elabSetOption` and updated linter callers.
- Added/adjusted tests for `set_option` info-tree handling.
