---
date: 2026-10-16
repo: leanprover/lean4
size: M
title: "Name resolution and recursion fixes land"
excerpt: "Lean improves auxiliary-name lookup and fixes structural recursion on match discriminants, alongside a stage0 refresh."
commits: 4
authors: [Kha, robsimmons, nomeata]
commit_authors: {"2f17203": Kha, "690baab": robsimmons, "136fe94": nomeata}
---

### **Auxiliary declarations now resolve like their globals** (2f17203)
Name resolution now treats auxiliary local declarations from `let rec` and `where` like the global names they stand for, competing by longest matching prefix and winning ties. This fixes subtle dotted-name misresolutions and makes lookup semantics more consistent and faster.

### **Structural recursion now handles recursive match discriminants** (136fe94)
Lean now translates recursive calls that appear in `match` discriminants as well as in alternatives, avoiding a kernel `unknown constant` failure and preserving structural recursion fallback behavior under async elaboration. A regression test was added for the affected pattern.

### Other misc changes
- Refactored internal error utilities to live under `Lean.Internal.ErrorUtils` and updated imports/open namespaces across elaborator modules (690baab).
- Updated stage0 artifacts and flipped the CI stage2/update-stage0 checkbox state (1e3f1c9).
