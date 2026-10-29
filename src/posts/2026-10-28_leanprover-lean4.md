---
date: 2026-10-28
repo: leanprover/lean4
size: L
title: "Lean4 speeds up inference and tightens `grind`"
excerpt: "Major `grind` UX fixes, a new cache to cut quadratic inference costs, and several performance improvements landed today."
commits: 20
authors: [leodemoura, hargoniX, Garmelon, Vtec234, algebraic-dev]
commit_authors: {"cd8c4eb": hargoniX, "7156ffe": leodemoura, "583131b": leodemoura, "fc8ffa0": leodemoura, "536c8c6": leodemoura, "ba64bc9": leodemoura, "85b462f": leodemoura, "e32bd1f": leodemoura, "7376eb8": leodemoura, "16524a7": leodemoura, "69ea912": leodemoura, "f4856ef": leodemoura}
---

### **Type inference gets a new budgeted cache** (f4856ef)
Lean now uses a budgeted expression cache to avoid repeatedly re-comparing large expressions during type inference. This targets quadratic behavior on cases like large string-literal equalities, and should noticeably improve elaboration speed on big terms.

### **`grind?` suggestions are now much more reliable** (ba64bc9, 85b462f, e32bd1f, 7376eb8, 16524a7, 536c8c6, fc8ffa0)
A cluster of fixes makes generated `grind?`/`finish?` scripts more stable: they now better preserve useful solver steps, respect theorem modifiers, keep needed case-splits, and anchor locals more robustly. The suggestion pipeline also validates candidate tactics before showing them, so users are less likely to get replay-breaking `grind only` scripts.

### **`grind` failure messages are shorter and more informative** (583131b, 7156ffe)
Failure reporting was rewritten to name the invoked tactic and omit the giant goal dump unless `+verbose` is enabled. Without verbosity, the message now also reports which configured thresholds were actually reached, making it easier to tell why search stopped.

### **List-literal elaboration gets a performance boost** (cd8c4eb, 69ea912)
Lean improves the elaboration path for long list literals, and separately indexes IR declaration batches to avoid quadratic lookup work. Together these changes reduce overhead in large generated terms and other workloads that stress declaration lookup during compilation.

### Other misc changes
- Bench/test additions for list literals, HTTP hot paths, IR lookup, and `grind` regressions.
- `grind` internal refactors for anchor handling, result identity tracking, and trace/message plumbing.
- JSON encoding tweak for `ModuleRefs`/`RefIdent` to avoid escaping overhead.
- Stage0 and build/test suite maintenance, including async test reorganization and benchmark rebalance.
