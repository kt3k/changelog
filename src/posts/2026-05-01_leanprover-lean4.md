---
date: 2026-05-01
repo: leanprover/lean4
size: M
title: "Lean fixes docstring metavars and grind slowdown"
excerpt: "Docstring elaboration now rejects leaked metavariables consistently, and `grind`-based tactics stop wasting time on theory combination."
commits: 2
authors: [david-christiansen, leodemoura]
commit_authors: {"659249a": david-christiansen, "53db221": leodemoura}
---

### **Docstrings now fail on unresolved metavariables** (659249a)
Lean now checks for leaked metavariables introduced while elaborating Verso docstrings and module docstrings, and reports them before the term state is rolled back. This makes `{given}` and `{givenInstance}` behave more consistently and improves the resulting error messages when a hole slips through.

### **`grind` derived tactics stop enabling mbtc** (53db221)
The `NoopConfig` used by `lia`, `linarith`, `cutsat`, `order`, and `ring` now disables model-based theory combination. That should make these tactics fail fast on problems outside their intended scope instead of burning time in expensive reasoning or hitting deterministic timeouts.

### Other misc changes
- Docstring/Verso test coverage added for leaked metavariable handling
- Minor doc wording updates in range documentation
- New regression test for the `grind` timeout issue
