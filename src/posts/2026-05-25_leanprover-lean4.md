---
date: 2026-05-25
repo: leanprover/lean4
size: L
title: "Lean4 adds `impossible` and tweaks `simpa`"
excerpt: "New `impossible` tactic combinator lands, `simpa using` gets stricter transparency, and `using!` is introduced as the opt-in escape hatch."
commits: 5
authors: [kim-em, algebraic-dev, nomeata]
commit_authors: {"37da6b4": kim-em, "2cd9863": nomeata}
---

### **Add `impossible` tactic combinator** (2cd9863)
Lean now has `impossible by t`, a new tactic combinator that proves the current goal is uninhabited by flipping it into a negated form for the inner tactic. It also integrates with `try?` suggestions and supports a `+levels` option for abstracting universe parameters when needed.

### **Restrict `simpa using h` to reducible transparency** (37da6b4)
`simpa using h` now closes goals with reducible transparency instead of the previous ambient default/semireducible behavior, making it less sensitive to unrelated simp-set changes. The old behavior remains available via the new `simpa using! h` syntax, so code that depends on the more permissive close can opt in explicitly.

### Other misc changes
- Removed the flaky `async_sleep` test.
- Updated stage0 artifacts.
- Small follow-up call-site updates to use `simpa using!` where the old behavior was required.
